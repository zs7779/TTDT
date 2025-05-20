import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { User } from "./types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/auth" }),
  endpoints: (builder) => ({
    // example endpoint
    login: builder.query<User, void>({
      query: () => "/auth",
    }),
  }),
});

export const { useLoginQuery } = authApi;
