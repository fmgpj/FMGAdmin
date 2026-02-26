import { createSlice } from "@reduxjs/toolkit";

type Theme = "light" | "dark" | "system";

interface ThemeState {
    currentTheme: Theme;
    isDarkModeActivated: boolean;
}

const initialState: ThemeState = {
    currentTheme: "system",
    isDarkModeActivated: false,
};

const getSystemDarkMode = (): boolean => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setLightTheme: (state) => {
            state.currentTheme = "light";
            state.isDarkModeActivated = false;
        },
        setDarkTheme: (state) => {
            state.currentTheme = "dark";
            state.isDarkModeActivated = true;
        },
        setSystemTheme: (state) => {
            state.currentTheme = "system";
            state.isDarkModeActivated = getSystemDarkMode();
        },
        toggleTheme: (state) => {
            if (
                state.currentTheme === "light" ||
                (state.currentTheme === "system" && !state.isDarkModeActivated)
            ) {
                state.currentTheme = "dark";
                state.isDarkModeActivated = true;
            } else {
                state.currentTheme = "light";
                state.isDarkModeActivated = false;
            }
        },
        updateSystemDarkMode: (state) => {
            if (state.currentTheme === "system") {
                state.isDarkModeActivated = getSystemDarkMode();
            }
        },
    },
});

export const {
    setLightTheme,
    setDarkTheme,
    setSystemTheme,
    toggleTheme,
    updateSystemDarkMode,
} = themeSlice.actions;
export default themeSlice.reducer;
