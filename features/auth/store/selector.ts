import type { RootState } from "@/store";

import { authApi } from "./api";

export const selectAdsApi = (state: RootState) => state[authApi.reducerPath];
