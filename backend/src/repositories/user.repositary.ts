import { ILike, IsNull, Like } from "typeorm";
import { myDataSource } from "../config/app-data-source";
import { User } from "../entities/user.entity";
import { GithubUserType } from "../types/user.types";
import { BadRequestError, NotFoundError } from "../utills/errors";

const userRepo = myDataSource.getRepository(User);

export const findUserByLogin = async (login: string) => {
    return await userRepo.findOne({
        where: { login: login }
    });

};

export const softDelelte = async (login: string) => {
    return await userRepo.softDelete({ login: login })
}

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

export const findOneAndUpdate = async (login: string, updates: unknown) => {
    const user = await userRepo.findOne({
        where: { login: login }
    })
    if (!user) {
        throw new NotFoundError("User not found");
    }
    Object.assign(user, updates);
    return await userRepo.save(user);
}


export const findUsersWithPagination = async (search: string, page: number = 1, limit: number = 10) => {
    const skip = (page - 1) * limit;

    const [users, total] = await userRepo.findAndCount({
        where: [
            { login: ILike(`%${search}%`) },
            { name: ILike(`%${search}%`) },
            { location: ILike(`%${search}%`) },
        ],
        skip,
        take: limit,
    });

    return { users, total, totalPages: Math.ceil(total / limit), page, limit };
};



export const getSortByCondition = async (sortBy: string, order: "ASC" | "DESC" = "DESC"): Promise<User[]> => {
    const allowedSortFields = ["public_gists", "followers", "following", "joined", "createdAt"];

    if (!allowedSortFields.includes(sortBy)) {
        throw new BadRequestError("Invalid sort field")
    }

    return await userRepo.find({
        where: { deletedAt: IsNull() },
        order: {
            [sortBy]: order
        }
    });
};


