import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
type ThemeMode = "light" | "dark";

interface ThemeState {
    mode: ThemeMode;
    loading: boolean;
    hydrated: boolean; // Track if we've hydrated on client
}

// Initial state
const initialState: ThemeState = {
    mode: "light", // Default to light theme
    loading: false, // Start with false to prevent hydration mismatch
    hydrated: false, // Start with false
};

// Theme slice
const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        // Set theme mode (light/dark)
        setTheme: (state, action: PayloadAction<ThemeMode>) => {
            state.mode = action.payload;
            state.loading = false;

            // Apply theme to document if we're on the client
            if (typeof window !== "undefined") {
                localStorage.setItem("theme", action.payload);
                document.documentElement.classList.remove("light", "dark");
                document.documentElement.classList.add(action.payload);
            }
        },

        // Toggle between light and dark
        toggleTheme: (state) => {
            const newMode = state.mode === "light" ? "dark" : "light";
            state.mode = newMode;
            state.loading = false;

            // Apply theme to document if we're on the client
            if (typeof window !== "undefined") {
                localStorage.setItem("theme", newMode);
                document.documentElement.classList.remove("light", "dark");
                document.documentElement.classList.add(newMode);
            }
        },

        // Hydrate theme from localStorage on client (similar to auth hydration)
        hydrateTheme: (state) => {
            if (typeof window !== "undefined") {
                const savedTheme = localStorage.getItem(
                    "theme"
                ) as ThemeMode | null;

                if (savedTheme === "light" || savedTheme === "dark") {
                    state.mode = savedTheme;
                    // Apply theme class to document
                    document.documentElement.classList.remove("light", "dark");
                    document.documentElement.classList.add(savedTheme);
                } else {
                    // Check system preference
                    const prefersDark = window.matchMedia(
                        "(prefers-color-scheme: dark)"
                    ).matches;
                    const systemTheme = prefersDark ? "dark" : "light";
                    state.mode = systemTheme;
                    localStorage.setItem("theme", systemTheme);
                    // Apply theme class to document
                    document.documentElement.classList.remove("light", "dark");
                    document.documentElement.classList.add(systemTheme);
                }
            }
            state.hydrated = true;
            state.loading = false;
        },

        // Set loading state (for consistency with auth pattern)
        setThemeLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

// Export actions
export const { setTheme, toggleTheme, hydrateTheme, setThemeLoading } =
    themeSlice.actions;

// Export reducer
export default themeSlice.reducer;

// Export types
export type { ThemeMode, ThemeState };
