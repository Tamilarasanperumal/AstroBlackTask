import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = "http://192.168.1.19:5000/"

export const itemMaster = createApi({
    reducerPath: "itemMaster",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    tagTypes: ["Item"],
    endpoints: (builder) => ({
        getItem: builder.query({
            query: () => {
                return {
                    url: "/item",
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },

                };
            },
            providesTags: ["Item"],
        }),
        getItemById: builder.query({
            query: (id) => {
                return {
                    url: `/item/${id}`,
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                };
            },
            providesTags: ["Item"],
        }),
        addItem: builder.mutation({
            query: (payload) => ({
                url: `/item`,
                method: "POST",
                body: payload,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            }),
            invalidatesTags: ["Item"],
        }),
        updateItem: builder.mutation({
            query: (payload) => {
                const { id, ...body } = payload;
                return {
                    url: `/item/${id}`,
                    method: "PUT",
                    body,
                };
            },
            invalidatesTags: ["Item"],
        }),
        deleteItem: builder.mutation({
            query: (id) => ({
                url: `/item/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Item"],
        }),
    }),
});



export const {
    useGetItemQuery,
    useGetItemByIdQuery,
    useAddItemMutation,
    useUpdateItemMutation,
    useDeleteItemMutation,
} = itemMaster;


