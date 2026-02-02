import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSession, signIn, signOut } from "next-auth/react";

// Types
interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    image?: string; // Add profile picture
    provider?: string; // Add provider info
}

// Extended session user type for NextAuth
interface ExtendedSessionUser {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    firstName?: string;
    lastName?: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    hydrated: boolean; // Track if we've hydrated on client
}

// Initial state
const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false, // Start with false to prevent hydration mismatch
    error: null,
    hydrated: false, // Start with false
};

// Async thunk for login
// This handles the API call for authentication
export const loginUser = createAsyncThunk(
    "auth/login", // Action type
    async (
        credentials: { email: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await fetch("/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || "Login failed");
            }

            const data = await response.json();

            // Save to localStorage
            localStorage.setItem("user", JSON.stringify(data.user));

            return data.user;
        } catch (error) {
            return rejectWithValue("Network error occurred: " + error);
        }
    }
);

// Async thunk for OAuth login (Google/Microsoft)
export const loginWithOAuth = createAsyncThunk(
    "auth/loginWithOAuth",
    async (provider: "google" | "azure-ad", { rejectWithValue }) => {
        try {
            // Use NextAuth signIn
            const result = await signIn(provider, {
                redirect: false, // Don't redirect, handle in component
                callbackUrl: "/",
            });

            if (result?.error) {
                return rejectWithValue(`OAuth login failed: ${result.error}`);
            }

            // Wait a bit for session to be established
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Try to get session multiple times with backoff
            let session = null;
            for (let i = 0; i < 5; i++) {
                session = await getSession();
                if (session?.user) break;
                await new Promise((resolve) => setTimeout(resolve, 500));
            }

            if (!session?.user) {
                return rejectWithValue(
                    "Unable to establish session. Please try again."
                );
            }

            // Helper function to split full name into first and last name
            const splitName = (fullName: string) => {
                const nameParts = fullName.trim().split(" ");
                const firstName = nameParts[0] || "";
                const lastName = nameParts.slice(1).join(" ") || "";
                return { firstName, lastName };
            };

            // Define interface for legacy sessions that might have 'name' instead of firstName/lastName
            interface LegacySessionUser {
                id: string;
                name?: string;
                firstName?: string;
                lastName?: string;
                email: string;
                image?: string;
            }

            const sessionUser = session.user as LegacySessionUser;

            // Handle both old sessions (with name) and new sessions (with firstName/lastName)
            let firstName = "";
            let lastName = "";

            if (sessionUser.name && !sessionUser.firstName) {
                // Legacy session - split the name
                const nameData = splitName(sessionUser.name || "");
                firstName = nameData.firstName;
                lastName = nameData.lastName;
            } else {
                // New session format
                firstName = sessionUser.firstName || "";
                lastName = sessionUser.lastName || "";
            }

            const user: User = {
                id: session.user.id || session.user.email || "",
                firstName,
                lastName,
                email: session.user.email || "",
                image: (session.user as ExtendedSessionUser).image || "", // Include profile picture
                provider: session.provider,
            };

            // Save to localStorage for consistency with existing logic
            localStorage.setItem("user", JSON.stringify(user));

            return user;
        } catch (error) {
            return rejectWithValue("OAuth login error: " + error);
        }
    }
);

// Async thunk for OAuth logout
export const logoutWithOAuth = createAsyncThunk(
    "auth/logoutWithOAuth",
    async (_, { rejectWithValue }) => {
        try {
            // Use NextAuth signOut
            await signOut({ redirect: false });

            // Clear localStorage
            localStorage.removeItem("user");

            return null;
        } catch (error) {
            return rejectWithValue("OAuth logout error: " + error);
        }
    }
);

// Async thunk to check existing authentication
// Updated to check both localStorage and NextAuth session
export const checkAuth = createAsyncThunk(
    "auth/checkAuth",
    async (_, { rejectWithValue }) => {
        try {
            // First check NextAuth session (for OAuth users)
            const session = await getSession();

            if (session?.user) {
                // Helper function to split full name into first and last name
                const splitName = (fullName: string) => {
                    const nameParts = fullName.trim().split(" ");
                    const firstName = nameParts[0] || "";
                    const lastName = nameParts.slice(1).join(" ") || "";
                    return { firstName, lastName };
                };

                // Define interface for legacy sessions that might have 'name' instead of firstName/lastName
                interface LegacySessionUser {
                    id: string;
                    name?: string;
                    firstName?: string;
                    lastName?: string;
                    email: string;
                    image?: string;
                }

                const sessionUser = session.user as LegacySessionUser;

                // Handle both old sessions (with name) and new sessions (with firstName/lastName)+
                let firstName = "";
                let lastName = "";

                if (sessionUser.name && !sessionUser.firstName) {
                    // Legacy session - split the name
                    const nameData = splitName(sessionUser.name || "");
                    firstName = nameData.firstName;
                    lastName = nameData.lastName;
                } else {
                    // New session format
                    firstName = sessionUser.firstName || "";
                    lastName = sessionUser.lastName || "";
                }

                const user: User = {
                    id: session.user.id,
                    firstName,
                    lastName,
                    email: session.user.email,
                    image: (session.user as ExtendedSessionUser).image || "", // Include profile picture
                    provider: session.provider,
                };

                // Sync with localStorage
                localStorage.setItem("user", JSON.stringify(user));
                return user;
            }

            // For traditional login users, check server-side session
            const sessionResponse = await fetch("/api/auth/session", {
                method: "GET",
                credentials: "include", // Include cookies
            });

            if (sessionResponse.ok) {
                const sessionData = await sessionResponse.json();
                if (sessionData.user) {
                    return sessionData.user;
                }
            }

            return null;
        } catch (error) {
            return rejectWithValue("Auth check failed: " + error);
        }
    }
);

// The slice - contains reducers and actions
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Synchronous logout action
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem("user");
        },
        // Clear any error messages
        clearError: (state) => {
            state.error = null;
        },
        // Set hydrated status
        setHydrated: (state) => {
            state.hydrated = true;
        },
        // Manual user update (if needed)
        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
                localStorage.setItem("user", JSON.stringify(state.user));
            }
        },
    },
    extraReducers: (builder) => {
        // Handle loginUser async thunk
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload as string;
            });

        // Handle checkAuth async thunk
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
                state.error = null; // Don't show error for failed auth check
            });

        // Handle loginWithOAuth async thunk
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

        // Handle logoutWithOAuth async thunk
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

// Export actions
export const { logout, clearError, updateUser, setHydrated } =
    authSlice.actions;

// Export the new OAuth thunks
// Note: loginWithOAuth and logoutWithOAuth are already exported at their declaration

// Export reducer
export default authSlice.reducer;

// Selectors (these help components get specific data from the state)
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
    state.auth.isAuthenticated;
export const selectAuthLoading = (state: { auth: AuthState }) =>
    state.auth.loading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
export const selectHydrated = (state: { auth: AuthState }) =>
    state.auth.hydrated;
