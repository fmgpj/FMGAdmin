/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { checkAuth, setHydrated } from "./slices/auth";
import { store } from "./store";

interface StoreProviderProps {
    children: React.ReactNode;
}

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        store.dispatch(setHydrated());
        store.dispatch(checkAuth());
    }, []);

    if (!mounted)
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );

    return <>{children}</>;
};

export default function StoreProvider({ children }: StoreProviderProps) {
    return (
        <Provider store={store}>
            <AuthInitializer>{children}</AuthInitializer>
        </Provider>
    );
}
