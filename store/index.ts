import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "@/features/auth/store/api";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    // other reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
