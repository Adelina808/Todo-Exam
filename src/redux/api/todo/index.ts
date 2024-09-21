import { api as index } from "..";
const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT;
const api = index.injectEndpoints({
    endpoints: (build) => ({
        getTodo: build.query<TODO.GetTodoRes, TODO.GetTodoReq>({
            query: () => ({
                url: `/${ENDPOINT}`,
                method: "GET",
            }),
            providesTags: ["todo"],
        }),
        postTodo: build.mutation<TODO.PostTodoRes, TODO.PostTodoReq>({
            query: (data) => ({
                url: `/${ENDPOINT}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["todo"],
        }),
        updateTodo: build.mutation<TODO.PatchTodoRes, TODO.PatchTodoReq>({
            query: ({ _id, data }) => ({
                url: `/${ENDPOINT}/${_id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["todo"],
        }),
        deleteTodo: build.mutation<TODO.DeleteTodoRes, TODO.DeleteTodoReq>({
            query: (_id) => ({
                url: `/${ENDPOINT}/${_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["todo"],
        }),
        deleteTodos: build.mutation<TODO.DeleteTodosRes, TODO.DeleteTodosReq>({
            query: () => ({
                url: `/${ENDPOINT}`,
                method: "DELETE",
            }),
            invalidatesTags: ["todo"],
        }),
    }),
});

export const {
    useGetTodoQuery,
    usePostTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
    useDeleteTodosMutation,
} = api;
