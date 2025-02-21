import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../lib/Auth0Config"

export const serviceApi = createApi({
    reducerPath: "serviceApi",
    baseQuery,
    tagTypes: ["Service"],
    endpoints: (builder) => ({
        
        getServices: builder.query({
            query: (params) => ({
                url: "/services",
                params: {
                    offset: params.offset || 0,
                    limit: params.limit || 10,
                },
            }),
            providesTags: ["Service"]
        }),

        getServiceById: builder.query({
            query: (id) => ({
                url: `/services/${id}`,
            }),
            providesTags: ["Service"]
        }),

        createService: builder.mutation({
            query: (service) => ({
                url: "/services",
                method: "POST",
                body: service,
            }),
            invalidatesTags: ["Service"]
        }),

        updateService: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `/services/${id}`,
                method: "PUT",
                body: patch,
            }),
            invalidatesTags: ["Service"]
        }),

        deleteService: builder.mutation({
            query: (id) => ({
                url: `/services/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Service"]
        }),
    })
})

export const {
    useGetServicesQuery,
    useGetServiceByIdQuery,
    useCreateServiceMutation,
    useUpdateServiceMutation,
    useDeleteServiceMutation,
} = serviceApi