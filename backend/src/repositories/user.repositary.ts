import { myDataSource } from "../config/app-data-source";
import { User } from "../entities/user.entity";
import { GithubUserType } from "../types/user.types";

const userRepo = myDataSource.getRepository(User);

export const findUserByLogin = async (login: string) => {
    return await userRepo.findOne({ where: { login } });
};

export const createUserInDB = async (githubData: GithubUserType) => {
    const user = userRepo.create({
        githubId: githubData.id,
        login: githubData.login,
        name: githubData.name,
        location: githubData.location,
        blog: githubData.blog,
        bio: githubData.bio,
        publicRepos: githubData.public_repos,
        publicGists: githubData.public_gists,
        followers: githubData.followers,
        following: githubData.following,
        joined: githubData.created_at,
        createdAt: new Date(),
    });

    return await userRepo.save(user);
};
