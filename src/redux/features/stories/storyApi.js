import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL, SOCKET_URL } from "@/apiConfig";

export const storyApi = createApi({
  reducerPath: "storyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getStory: builder.query({
      query: (id) => `${SOCKET_URL}/story/${id}`,
    }),
    getUsers: builder.query({
      query: () => `${API_URL}/users/users`,
    }),
  }),
});

export const { useGetStoryQuery, useGetUsersQuery } = storyApi;
