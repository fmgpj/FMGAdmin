/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { store } from "@src/store";
import { checkAuth, setHydrated } from "@src/store/slices/authSlice";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";

// Component to handle initial auth check
function AuthInitializer({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Mark as hydrated and check auth only after component mounts
        // Now relies on NextAuth secure session cookies instead of localStorage
        setMounted(true);
        store.dispatch(setHydrated());
        store.dispatch(checkAuth());
    }, []);

    // Don't render children until mounted to avoid hydration mismatch
    if (!mounted) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return <>{children}</>;
}

// Main Redux Provider component
export function ReduxProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <AuthInitializer>{children}</AuthInitializer>
        </Provider>
    );
}
