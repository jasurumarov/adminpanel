import { api } from './index'

export const userApi = api.injectEndpoints({
    endpoints: (build) => ({
        loginUser: build.mutation({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body
            }),
            invalidatesTags: ["User"]
        }),
        registerUser: build.mutation({
            query: (body) => ({
                url: "/auth/registration",
                method: "POST",
                body
            }),
            invalidatesTags: ["User"]
        }),
    }),
})

export const {
    useRegisterUserMutation,
    useLoginUserMutation
} = userApi