import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
interface User {
    id: string;
    name: string;
    email: string;
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

// Async thunk to check existing authentication
// This runs on app startup to check if user is already logged in
export const checkAuth = createAsyncThunk(
    "auth/checkAuth",
    async (_, { rejectWithValue }) => {
        try {
            const savedUser = localStorage.getItem("user");
            if (savedUser) {
                return JSON.parse(savedUser);
            }
            return null;
        } catch (error) {
            localStorage.removeItem("user"); // Clean up corrupted data
            return rejectWithValue("Invalid stored user data: " + error);
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
    },
});

// Export actions
export const { logout, clearError, updateUser, setHydrated } =
    authSlice.actions;

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
