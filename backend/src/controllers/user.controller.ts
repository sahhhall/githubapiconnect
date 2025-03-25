import { NextFunction, Request, Response } from "express";
import axios from "axios";
import { findUserByLogin, createUserInDB } from "../repositories/user.repositary";
import { GithubUserType } from "../types/user.types";
import { BadRequestError, NotFoundError } from "../utills/errors";
import { HttpStatusCodes } from "../constants/http-status-code";

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
