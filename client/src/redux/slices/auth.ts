import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSession, signIn, signOut } from "next-auth/react";

interface User {
    id: string;
    name: string;
    email: string;
    image?: string | "";
    provider?: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    hydrated: boolean;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    hydrated: false,
};

export const loginWithOAuth = createAsyncThunk(
    "auth/loginWithOAuth",
    async (provider: "google" | "azure-ad", { rejectWithValue }) => {
        try {
            const result = await signIn(provider, {
                redirect: false,
                callbackUrl: "/",
            });

            if (result?.error)
                return rejectWithValue(`OAuth login failed: ${result.error}`);
            await new Promise((resolve) => setTimeout(resolve, 1000));

            let session = null;
            for (let i = 0; i < 5; i++) {
                session = await getSession();
                if (session?.user) break;
                await new Promise((resolve) => setTimeout(resolve, 500));
            }

            if (!session?.user)
                return rejectWithValue(
                    "Unable to establish session. Please try again!"
                );

            const user: User = {
                id: session.user.id || session.user.email || "",
                name: session.user.name || "",
                email: session.user.email || "",
                image: session.user.image || "",
                provider: session.provider,
            };

            return user;
        } catch (error) {
            return rejectWithValue("OAuth login error: " + error);
        }
    }
);

export const logoutWithOAuth = createAsyncThunk(
    "auth/logoutWithOAuth",
    async (_, { rejectWithValue }) => {
        try {
            await signOut({ redirect: false });
            return null;
        } catch (error) {
            return rejectWithValue("OAuth logout error: " + error);
        }
    }
);

export const checkAuth = createAsyncThunk(
    "auth/checkAuth",
    async (_, { rejectWithValue }) => {
        try {
            const session = await getSession();

            if (session?.user) {
                const user: User = {
                    id: session.user.id,
                    name: session.user.name || "",
                    email: session.user.email,
                    image: session.user.image || "",
                    provider: session.provider,
                };

                return user;
            }

            const sessionResponse = await fetch("/api/auth/session", {
                method: "GET",
                credentials: "include",
            });

            if (sessionResponse.ok) {
                const sessionData = await sessionResponse.json();
                if (sessionData.user) return sessionData.user;
            }

            return null;
        } catch (error) {
            return rejectWithValue("Auth check failed: " + error);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        setHydrated: (state) => {
            state.hydrated = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.user = action.payload;
                    state.isAuthenticated = true;
                } else {
                    state.user = null;
                    state.isAuthenticated = false;
                }
            })
            .addCase(checkAuth.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = null;
            });

        builder
            .addCase(loginWithOAuth.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginWithOAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginWithOAuth.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(logoutWithOAuth.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutWithOAuth.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = null;
            })
            .addCase(logoutWithOAuth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});
export const { logout, clearError, setHydrated } = authSlice.actions;
export default authSlice.reducer;
