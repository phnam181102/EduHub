import { apiSlice } from '../features/api/apiSlice';

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateAvatar: builder.mutation({
            query: (avatar) => ({
                url: 'update-avatar',
                method: 'PUT',
                body: { avatar },
                credentials: 'include' as const,
            }),
        }),
        editProfile: builder.mutation({
            query: ({ name }) => ({
                url: 'update-info',
                method: 'PUT',
                body: { name },
                credentials: 'include' as const,
            }),
        }),
        updatePassword: builder.mutation({
            query: ({ currentPassword, newPassword }) => ({
                url: 'update-password',
                method: 'PUT',
                body: { currentPassword, newPassword },
                credentials: 'include' as const,
            }),
        }),
        getAllUser: builder.query({
            query: () => ({
                url: "get-users",
                method: 'GET',
                credentials: 'include' as const,
            })
        })
    }),
});

export const {
    useUpdateAvatarMutation,
    useEditProfileMutation,
    useUpdatePasswordMutation,
    useGetAllUserQuery
} = userApi;
