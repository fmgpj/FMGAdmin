import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import themeReducer from "./slices/theme";
import breadcrumbReducer from "./slices/breadcrumbs";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
        breadcrumb: breadcrumbReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
