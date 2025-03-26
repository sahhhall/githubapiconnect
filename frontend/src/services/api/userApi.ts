import { apiSlice } from '../../redux/slices/apiSlice';
import { UserGitHubData } from '../../types/types';



export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchUser: builder.mutation<UserGitHubData, { username: string }>({
            query: (body) => ({
                url: '',
                method: 'POST',
                body
            })
        }),
        fetchAllUsers: builder.query<any, any>({
            query: () => ({
                url: '/all'
            })
        }),
        softDeleteUser: builder.mutation<any, any>({
            query: (username) => ({
                url: `/${username}`,
                method: "DELETE",
            }),
        })
    })
});


export const { useFetchUserMutation, useFetchAllUsersQuery, useSoftDeleteUserMutation } = userApi;