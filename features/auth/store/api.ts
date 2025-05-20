import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import type { Login, User } from "./types";

const mockBaseQuery =
  ({ baseUrl = "" }: { baseUrl?: string } = {}): BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
  > =>
  async (args) => {
    const {
      url,
      method = "GET",
      body,
    } = typeof args === "string" ? { url: args, method: "GET" } : args;

    const fullUrl = baseUrl + url;
    console.log("[MOCK API]", method, fullUrl);

    // Mock endpoints
    if (fullUrl === "/api/login" && method === "POST") {
      return {
        data: {
          id: 123,
          username: body.username,
        },
      };
    }

    return {
      error: {
        status: 404,
        data: `No mock found for ${method} ${fullUrl}`,
      },
    };
  };

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: mockBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    // example endpoint
    login: builder.mutation<User, Login>({
      query: ({ username, password }) => ({
        url: "/login",
        method: "POST",
        body: { username, password },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
