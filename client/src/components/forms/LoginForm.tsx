"use client";

import { faGoogle, faMicrosoft } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "@src/store/hooks";
import { clearError, loginUser } from "@src/store/slices/authSlice";

const LoginForm = () => {
    const { error, dispatch } = useAuth();

    const handleGoogleLogin = () => {
        // Implement Google OAuth here
        console.log("Google login clicked");
        dispatch(clearError());
        dispatch(
            loginUser({ email: "admin@fmg.com", password: "password123" })
        );
    };

    const handleMicrosoftLogin = () => {
        // Implement Microsoft OAuth here
        console.log("Microsoft login clicked");
        dispatch(clearError());
        dispatch(
            loginUser({ email: "admin@fmg.com", password: "password123" })
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-start max-w-sm mx-auto">
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
                            className="w-full px-4 py-2 bg-[#F12727] text-white rounded-full transition-colors text-sm hover:bg-[#d91e1e]"
                        >
                            <FontAwesomeIcon icon={faGoogle} className="mr-2" />
                            Google
                        </button>
                        <p className="text-xs">OR</p>
                        <button
                            type="button"
                            onClick={handleMicrosoftLogin}
                            className="w-full px-4 py-2 bg-[#0067b8] text-white rounded-full transition-colors text-sm hover:bg-[#005494]"
                        >
                            <FontAwesomeIcon
                                icon={faMicrosoft}
                                className="mr-2"
                            />
                            Microsoft
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
