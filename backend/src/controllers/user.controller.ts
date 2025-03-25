import { NextFunction, Request, Response } from "express";
import axios from "axios";
import { findUserByLogin, createUserInDB } from "../repositories/user.repositary";
import { GithubFollower, GithubUserType } from "../types/user.types";
import { BadRequestError, NotFoundError } from "../utills/errors";
import { HttpStatusCodes } from "../constants/http-status-code";
import { saveFriendsForUser } from "../repositories/friend.repositary";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username } = req.body;
        console.log(username)
        if (!username) {
            throw new BadRequestError("provide user name")
        }
        let existingUser = await findUserByLogin(username);

        if (!existingUser) {
            const { data } = await axios.get(`${process.env.GITHUB_API}/${username}`);
            const githubData = data as GithubUserType;
            existingUser = await createUserInDB(githubData);
        }
        if (!existingUser) {
            throw new NotFoundError('username not found')
        }
        /// it not ideal becasue trip size is large it will affect network 
        // requirement is Do not make API call again to get repositories details page.
        const repos = (await axios.get(`${process.env.GITHUB_API}/${username}/repos`)).data;
        console.log(existingUser, repos)
        res.status(HttpStatusCodes.CREATED).send({ user: existingUser, repos });
    } catch (error) {
        console.error("Error creating user:", error);
        next(error)
    }
};





// get friends controller

export const getFriends = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username } = req.params;

        const user = await findUserByLogin(username);
        if (!user) throw new NotFoundError("Username not found");

        console.log(`Fetching mutual friends for ${username} from GitHub...`);

        const { data } = await axios.get(`${process.env.GITHUB_API}/${username}`);
        const githubData = data as GithubUserType;

        // fetching followers and following 
        const [followersRes, followingRes] = await Promise.all([
            axios.get(githubData.followers_url as string),
            axios.get((githubData.following_url as string).replace("{/other_user}", ""))
        ]);


        const followersData = followersRes.data as GithubFollower[];
        const followingData = followingRes.data as GithubFollower[]
        const followers = new Set(followersData.map(user => user.login));
        const following = followingData.map(user => user.login);

        //for mutual Friends
        const mutualFriends = following.filter(user => followers.has(user));

        await saveFriendsForUser(user, mutualFriends);

        res.json({ friends: mutualFriends });
    } catch (error) {
        console.error("Error fetching friends:", error);
        next(error)
    }
};

