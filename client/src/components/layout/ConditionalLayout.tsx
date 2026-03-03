"use client";

// import { useAuth } from "@src/store/hooks";
import { useAppSelector } from "@/src/redux";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Breadcrumbs from "../ui/breadcrumbs";
import Header from "./header";
import Sidebar from "./sidebar";

export default function ConditionalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
    const router = useRouter();
    const pathname = usePathname();

    // Redirect to login page if not authenticated and not already on root page
    useEffect(() => {
        if (!loading && !isAuthenticated && pathname !== "/") {
            router.push("/");
        }
    }, [isAuthenticated, loading, pathname, router]);

    // Show loading spinner during auth check
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // If not authenticated and not on root page, show loading while redirecting
    if (!isAuthenticated && pathname !== "/") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen max-w-7xl mx-auto">
            {/* Header and Sidebar only show when authenticated */}
            {isAuthenticated && <Header />}
            <main className="flex flex-row grow overflow-hidden gap-x-4">
                {isAuthenticated && <Sidebar />}
                <div className="flex flex-col w-full h-screen relative">
                    {isAuthenticated && <Breadcrumbs />}
                    <div
                        className={`w-full h-screen overflow-y-scroll [&::-webkit-scrollbar]:hidden ${isAuthenticated && "pb-17"}`}
                    >
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
