"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../redux";
import { logout, logoutWithOAuth } from "../redux/slices/auth";

/**
 * Custom hook for handling logout functionality
 * Automatically detects OAuth vs traditional login and handles appropriately
 */
export const useLogout = () => {
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleLogout = async (redirectTo?: string) => {
        try {
            // Check if user logged in via OAuth (has provider field)
            if (user?.provider) {
                // OAuth user - use NextAuth signOut
                await dispatch(logoutWithOAuth()).unwrap();
            }

            // Redirect after successful logout
            if (redirectTo) {
                router.push(redirectTo);
            }
        } catch (error) {
            console.error("Logout failed:", error);
            // Fallback to regular logout if server logout fails
            dispatch(logout());

            // Still redirect on error to ensure user isn't stuck
            if (redirectTo) {
                router.push(redirectTo);
            }
        }
    };

    return { handleLogout };
};
