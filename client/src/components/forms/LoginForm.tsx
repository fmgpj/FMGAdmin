"use client";

import { useAppDispatch, useAppSelector } from "@/src/redux";
import { clearError, loginWithOAuth } from "@/src/redux/slices/auth";
import { faGoogle, faMicrosoft } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginForm = () => {
    const { isAuthenticated, loading, error } = useAppSelector(
        (state) => state.auth
    );
    const dispatch = useAppDispatch();
    // const { error, loading, isAuthenticated, dispatch } = useAuth();
    const router = useRouter();

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            router.push("/"); // Adjust path as needed
        }
    }, [isAuthenticated, router]);

    const handleGoogleLogin = async () => {
        dispatch(clearError());
        try {
            await dispatch(loginWithOAuth("google")).unwrap();
            // Navigation will be handled by useEffect above
        } catch (error) {
            // Error is handled by Redux state
            console.error("Google login failed:", error);
        }
    };

    const handleMicrosoftLogin = async () => {
        dispatch(clearError());
        try {
            await dispatch(loginWithOAuth("azure-ad")).unwrap();
            // Navigation will be handled by useEffect above
        } catch (error) {
            // Error is handled by Redux state
            console.error("Microsoft login failed:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-start max-w-sm mx-auto px-4">
            <div className="flex flex-col gap-y-9 w-full">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold text-[#BE9F44]">
                        FMG <span className="text-[#29377E]">Admin</span>
                    </h2>
                    <p className="text-xs">
                        We specialize in delivering accurate, timely, and
                        insightful financial solutions to drive your success.
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-3">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}
                <div className="flex flex-col gap-y-2">
                    <p className="text-sm">Sign in with:</p>
                    <div className="flex flex-row gap-x-2 items-center">
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="w-full px-4 py-2 bg-[#F12727] text-white rounded-full transition-colors text-sm hover:bg-[#d91e1e] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FontAwesomeIcon icon={faGoogle} className="mr-2" />
                            {loading ? "Signing in..." : "Google"}
                        </button>
                        <p className="text-xs">OR</p>
                        <button
                            type="button"
                            onClick={handleMicrosoftLogin}
                            disabled={loading}
                            className="w-full px-4 py-2 bg-[#0067b8] text-white rounded-full transition-colors text-sm hover:bg-[#005494] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FontAwesomeIcon
                                icon={faMicrosoft}
                                className="mr-2"
                            />
                            {loading ? "Signing in..." : "Microsoft"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
