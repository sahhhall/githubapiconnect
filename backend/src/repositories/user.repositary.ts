import { ILike, IsNull, Like } from "typeorm";
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



export const findUsersWithPagination = async (search: string, page: number = 1, limit: number = 10) => {
    const skip = (page - 1) * limit;

    const [users, total] = await userRepo.findAndCount({
        where: [
            { login: ILike(`%${search}%`), deletedAt: IsNull() },
            { name: ILike(`%${search}%`), deletedAt: IsNull() },
            { location: ILike(`%${search}%`), deletedAt: IsNull() },
        ],
        skip,
        take: limit,
    });

    return { users, total, totalPages: Math.ceil(total / limit), page, limit };
};
