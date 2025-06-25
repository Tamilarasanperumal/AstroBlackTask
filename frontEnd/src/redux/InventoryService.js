import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const BASE_URL = "http://192.168.1.19:5000/"
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const inventory = createApi({
    reducerPath: "inventory",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    tagTypes: ["Inventory"],
    endpoints: (builder) => ({
        getInventory: builder.query({
            query: () => {
                return {
                    url: "/inventory",
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },

                };
            },
            providesTags: ["Inventory"],
        }),
        getInventoryById: builder.query({
            query: (id) => {
                return {
                    url: `/inventory/${id}`,
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                };
            },
            providesTags: ["Inventory"],
        }),
        addInventory: builder.mutation({
            query: (payload) => ({
                url: `/inventory`,
                method: "POST",
                body: payload,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            }),
            invalidatesTags: ["Inventory"],
        }),
        updateInventory: builder.mutation({
            query: (payload) => {
                const { id, ...body } = payload;
                return {
                    url: `/inventory/${id}`,
                    method: "PUT",
                    body,
                };
            },
            invalidatesTags: ["Inventory"],
        }),
        deleteInventory: builder.mutation({
            query: (id) => ({
                url: `/inventory/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Inventory"],
        }),
    }),
});



export const {
    useGetInventoryQuery,
    useGetInventoryByIdQuery,
    useAddInventoryMutation,
    useUpdateInventoryMutation,
    useDeleteInventoryMutation,
} = inventory;


