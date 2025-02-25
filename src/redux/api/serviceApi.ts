import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../lib/Auth0Config"

type UpdateServiceData = Partial<
    Omit<any, "id">
>;

export const serviceApi = createApi({
    reducerPath: "serviceApi",
    baseQuery,
    tagTypes: ["Service"],
    endpoints: (builder) => ({

        getServices: builder.query({
            query: (params) => ({
                url: "services",
                params: {
                    offset: params.offset || 0,
                    limit: params.limit || 10,
                },
            }),
            providesTags: (result) =>
                result.data
                    ? [
                        ...result.data.map(({ id }: { id: string }) => ({
                            type: "Service",
                            id,
                        })),
                        { type: "Service", id: "LIST" },
                    ]
                    : [{ type: "Service", id: "LIST" }],
        }),

        getServiceById: builder.query({
            query: (id) => ({
                url: `services/${id}`,
            }),
            providesTags: ["Service"]
        }),

        createService: builder.mutation({
            query: (body) => ({
                url: "services",
                method: "POST",
                body,
            }),
            invalidatesTags: (result, error, id) => [
                { type: "Service", id: "LIST" },
            ],
        }),

        updateService: builder.mutation<
            any,
            { id: string; patch: UpdateServiceData }
        >({
            query: ({ id, patch }) => ({
                url: `services/${id}`,
                method: "PUT",
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Service", id }],
        }),

        deleteService: builder.mutation({
            query: (id) => ({
                url: `services/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Service"]
        }),

        switchServiceStatus: builder.mutation({
            query: (id) => ({
                url: `services/${id}/switch`,
                method: "PUT",
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Service", id }],
        })
    })
})

export const {
    useGetServicesQuery,
    useGetServiceByIdQuery,
    useCreateServiceMutation,
    useUpdateServiceMutation,
    useDeleteServiceMutation,
    useSwitchServiceStatusMutation
} = serviceApi