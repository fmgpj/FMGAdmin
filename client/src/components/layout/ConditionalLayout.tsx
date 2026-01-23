"use client";
import ThemeInitializer from "@src/components/ThemeInitializer";
import { useAuth } from "@src/store/hooks";
import Header from "./header";
import Sidebar from "./sidebar";

export default function ConditionalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated, loading } = useAuth();

    // Show loading spinner during auth check
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <ThemeInitializer />
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen max-w-7xl mx-auto">
            <ThemeInitializer />
            {/* Header and Sidebar only show when authenticated */}
            {isAuthenticated && <Header />}
            <main className="flex flex-row grow overflow-hidden gap-x-4">
                {isAuthenticated && <Sidebar />}
                <div
                    className={`w-full h-screen overflow-y-scroll [&::-webkit-scrollbar]:hidden ${isAuthenticated && "pb-17"}`}
                >
                    {children}
                </div>
            </main>
        </div>
    );
}
