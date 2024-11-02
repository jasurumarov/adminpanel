import { api } from './index'

export const blogApi = api.injectEndpoints({
    endpoints: (build) => ({
        getBlogs: build.query({
            query: (params) => ({
                url: '/blog/all',
                params
            }),
            providesTags: ["Blog"]
        }),
        createBlog: build.mutation({
            query: (body) => ({
                url: "/blog/create",
                method: "POST",
                body
            }),
            invalidatesTags: ["Blog"]
        }),
        deleteBlog: build.mutation({
            query: (id) => ({
                url: `/blog/delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Blog"]
        }),
        updateBlog: build.mutation({
            query: (body) => ({
                url: `/blog`,
                method: "PUT", // or "PATCH"
                body
            }),
            invalidatesTags: ["Blog"]
        })
    }),
})

export const {
    useCreateBlogMutation,
    useGetBlogsQuery,
    useDeleteBlogMutation,
    useUpdateBlogMutation
} = blogApi