import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseURL = import.meta.env.VITE_BASE_URL;
const baseQuery = fetchBaseQuery({
    baseUrl: baseURL,
});


export const apiSlice = createApi({
    baseQuery: baseQuery,
    endpoints: () => ({})
});