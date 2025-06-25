import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const BASE_URL = "http://192.168.1.19:5000/"

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const consumption = createApi({
    reducerPath: "consumption",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    tagTypes: ["Consumption"],
    endpoints: (builder) => ({
        getConsumption: builder.query({
            query: () => {
                return {
                    url: "/consumption",
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },

                };
            },
            providesTags: ["Consumption"],
        }),
        getConsumptionById: builder.query({
            query: (id) => {
                return {
                    url: `/consumption/${id}`,
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                };
            },
            providesTags: ["Consumption"],
        }),
        addConsumption: builder.mutation({
            query: (payload) => ({
                url: `/consumption`,
                method: "POST",
                body: payload,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            }),
            invalidatesTags: ["Consumption"],
        }),
        updateConsumption: builder.mutation({
            query: (payload) => {
                const { id, ...body } = payload;
                return {
                    url: `/consumption/${id}`,
                    method: "PUT",
                    body,
                };
            },
            invalidatesTags: ["Consumption"],
        }),
        deleteConsumption: builder.mutation({
            query: (id) => ({
                url: `/consumption/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Consumption"],
        }),
    }),
});



export const {
    useGetConsumptionQuery,
    useGetConsumptionByIdQuery,
    useAddConsumptionMutation,
    useUpdateConsumptionMutation,
    useDeleteConsumptionMutation,
} = consumption;


