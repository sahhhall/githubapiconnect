import { myDataSource } from "../config/app-data-source";
import { Friend } from "../entities/friend.entity";
import { User } from "../entities/user.entity";



const friendsRepo = myDataSource.getRepository(Friend);


export const friendRepoById = async (id: number) => {
    return await friendsRepo.find({ where: { user: { id } } });
}

export const saveFriendsForUser = async (user: User, mutualFriends: string[]) => {
    const friendsData = mutualFriends.map(friendLogin => {
        return friendsRepo.create({
            user,
            friendLogin,
        });
    });

    return await friendsRepo.save(friendsData);
};