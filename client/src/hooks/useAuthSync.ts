"use client";

import { useAuth } from "@src/store/hooks";
import { checkAuth } from "@src/store/slices/authSlice";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

/**
 * Custom hook that synchronizes NextAuth session with Redux auth state
 * This ensures both authentication systems stay in sync
 */
export const useAuthSync = () => {
    const { data: session, status } = useSession();
    const { dispatch, isAuthenticated, user } = useAuth();

    useEffect(() => {
        // Only run checkAuth when NextAuth session status is determined
        if (status === "authenticated" || status === "unauthenticated") {
            dispatch(checkAuth());
        }
    }, [session, status, dispatch]);

    return {
        session,
        status,
        isAuthenticated,
        user,
        isLoading: status === "loading",
    };
};
