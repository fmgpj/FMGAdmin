import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import themeReducer from "./slices/themeSlice";

// Configure the Redux store
export const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
        // Add other slices here as you create them
        // products: productsReducer,
        // clients: clientsReducer,
    },
    // Middleware configuration
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // Customize middleware options
            serializableCheck: {
                // Ignore these action types for serializable check
                ignoredActions: ["persist/PERSIST"],
            },
        }),
    // Enable Redux DevTools in development
    devTools: process.env.NODE_ENV !== "production",
});

// Type definitions for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// These types help with TypeScript autocompletion and type safety
