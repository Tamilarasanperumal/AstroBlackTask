import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = "http://192.168.1.19:5000/"

export const uomMaster = createApi({
    reducerPath: "uomMaster",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    tagTypes: ["Uom"],
    endpoints: (builder) => ({
        getUom: builder.query({
            query: () => {
                return {
                    url: "/uom",
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },

                };
            },
            providesTags: ["Uom"],
        }),
        getUomById: builder.query({
            query: (id) => {
                return {
                    url: `/uom/${id}`,
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                };
            },
            providesTags: ["Uom"],
        }),
        addUom: builder.mutation({
            query: (payload) => ({
                url: `/uom`,
                method: "POST",
                body: payload,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            }),
            invalidatesTags: ["Uom"],
        }),
        updateUom: builder.mutation({
            query: (payload) => {
                const { id, ...body } = payload;
                return {
                    url: `/uom/${id}`,
                    method: "PUT",
                    body,
                };
            },
            invalidatesTags: ["Uom"],
        }),
        deleteUom: builder.mutation({
            query: (id) => ({
                url: `/uom/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Uom"],
        }),
    }),
});



export const {
    useGetUomQuery,
    useGetUomByIdQuery,
    useAddUomMutation,
    useUpdateUomMutation,
    useDeleteUomMutation,
} = uomMaster;


