// src/features/api/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api', // ✅ Make sure backend runs here
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userInfo?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Resource', 'User', 'Homework'],
  endpoints: (builder) => ({

    // 🔐 Auth Endpoints
    login: builder.mutation({
      query: (credentials) => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/users',
        method: 'POST',
        body: userData,
      }),
    }),

    // 📚 Resource Endpoints
    getResources: builder.query({
      query: () => '/resources',
      providesTags: ['Resource'],
    }),
    createResource: builder.mutation({
      query: (newResource) => ({
        url: '/resources',
        method: 'POST',
        body: newResource,
      }),
      invalidatesTags: ['Resource'],
    }),
    updateResource: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/resources/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['Resource'],
    }),
    deleteResource: builder.mutation({
      query: (id) => ({
        url: `/resources/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Resource'],
    }),

    // 📝 Homework Endpoints
    getHomeworks: builder.query({
      query: () => '/homework',
      providesTags: ['Homework'],
    }),
    createHomework: builder.mutation({
      query: (newHomework) => ({
        url: '/homework', // ✅ FIXED: changed from '/homework' to '/homeworks'
        method: 'POST',
        body: newHomework,
      }),
      invalidatesTags: ['Homework'],
    }),

    // src/features/api/apiSlice.js
// ... (inside the endpoints builder) ...

// ... (after createResource)
updateResource: builder.mutation({
  // The query function receives an object with the id and the updated data
  query: ({ id, ...patch }) => ({
    url: `/resources/${id}`,
    method: 'PUT',
    body: patch,
  }),
  invalidatesTags: ['Resource'], // Re-fetch the list after an update
}),

deleteResource: builder.mutation({
  query: (id) => ({
    url: `/resources/${id}`,
    method: 'DELETE',
  }),
  invalidatesTags: ['Resource'], // Re-fetch the list after a delete
}),
// ... inside endpoints builder ...
getResourceById: builder.query({
  query: (id) => `/resources/${id}`,
  providesTags: (result, error, id) => [{ type: 'Resource', id }],
}),


getUsers: builder.query({
  query: () => '/users',
  providesTags: ['User'],
}),

getResourceById: builder.query({
    query: (id) => `/resources/${id}`,
    providesTags: (result, error, id) => [{ type: 'Resource', id }],
  }),

//... export the new hook: useGetResourceByIdQuery

// ... (rest of the endpoints)

// ... (update the exports at the bottom)

  }),
});

// Export the auto-generated hooks!
export const {
  useLoginMutation,
  useRegisterMutation,
  useGetResourcesQuery,
  useCreateResourceMutation,
  useGetHomeworksQuery,
  useGetResourceByIdQuery,
  useGetUsersQuery,
  useCreateHomeworkMutation,
  useUpdateResourceMutation,
  useDeleteResourceMutation
} = apiSlice;
