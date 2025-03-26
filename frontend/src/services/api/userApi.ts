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
        })
    })
});


export const { useFetchUserMutation } = userApi;