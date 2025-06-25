import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const BASE_URL = "http://192.168.1.19:5000/"
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => {
                return {
                    url: "/user",
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },

                };
            },
            providesTags: ["User"],
        }),
        getUserById: builder.query({
            query: (id) => {
                return {
                    url: `/user/${id}`,
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                };
            },
            providesTags: ["User"],
        }),
        addUser: builder.mutation({
            query: (payload) => ({
                url: `/user`,
                method: "POST",
                body: payload,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            }),
            invalidatesTags: ["User"],
        }),
        updateUser: builder.mutation({
            query: (payload) => {
                const { id, ...body } = payload;
                return {
                    url: `/user/${id}`,
                    method: "PUT",
                    body,
                };
            },
            invalidatesTags: ["User"],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/user/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["User"],
        }),
    }),
});



export const {
    useGetUserQuery,
    useGetUserByIdQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userApi;


