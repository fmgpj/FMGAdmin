import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./index";

// Typed version of useDispatch hook
// Use this instead of plain useDispatch for type safety
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Typed version of useSelector hook
// Use this instead of plain useSelector for type safety
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Custom hooks for auth (these replace your useAuth hook)
export const useAuth = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const isAuthenticated = useAppSelector(
        (state) => state.auth.isAuthenticated
    );
    const loading = useAppSelector((state) => state.auth.loading);
    const error = useAppSelector((state) => state.auth.error);
    const hydrated = useAppSelector((state) => state.auth.hydrated);

    return {
        user,
        isAuthenticated,
        loading: loading || !hydrated, // Show loading until hydrated
        error,
        hydrated,
        dispatch, // For dispatching actions in components
    };
};

// Custom hooks for theme (following the same pattern as useAuth)
export const useTheme = () => {
    const dispatch = useAppDispatch();
    const mode = useAppSelector((state) => state.theme.mode);
    const loading = useAppSelector((state) => state.theme.loading);
    const hydrated = useAppSelector((state) => state.theme.hydrated);

    return {
        mode,
        loading: loading || !hydrated, // Show loading until hydrated
        hydrated,
        dispatch, // For dispatching theme actions in components
    };
};

// Additional auth-specific hooks
export const useAuthActions = () => {
    const dispatch = useAppDispatch();

    return {
        dispatch,
        // You can add more specific action creators here if needed
    };
};
