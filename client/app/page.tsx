"use client";
import LoginForm from "@src/components/forms/LoginForm";
import DashboardPage from "@src/components/layout/dashboard";
import { useAuth } from "@src/store/hooks";

export default function Home() {
    const { isAuthenticated, loading } = useAuth();

    // Show loading spinner while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // Conditional rendering based on authentication status
    return isAuthenticated ? <DashboardPage /> : <LoginForm />;
}
