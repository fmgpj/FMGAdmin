import { ReduxProvider } from "@src/store/Provider";
import type { Metadata } from "next";
import "./globals.css";

import ConditionalLayout from "@src/components/layout/ConditionalLayout";

export const metadata: Metadata = {
    title: {
        template: "%s | FMG Admin",
        default: "FMG Admin - Dashboard & Management System",
    },
    description:
        "Comprehensive admin dashboard for FMG operations, providing efficient management tools and analytics for your business needs.",
    keywords: [
        "admin",
        "dashboard",
        "management",
        "FMG",
        "analytics",
        "business",
        "flowmetric",
        "accounting",
    ],
    authors: [{ name: "FMG Team" }],
    creator: "FMG",
    publisher: "FMG",
    robots: {
        index: false, // Typically admin panels shouldn't be indexed
        follow: false,
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: process.env.NEXT_PUBLIC_APP_URL,
        title: "FMG Admin Dashboard",
        description:
            "Comprehensive admin dashboard for FMG operations and management.",
        siteName: "FMG Admin",
        images: [
            {
                url: "/images/og-image.jpg", // You'll need to add this image
                width: 1200,
                height: 630,
                alt: "FMG Admin Dashboard",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "FMG Admin Dashboard",
        description:
            "Comprehensive admin dashboard for FMG operations and management.",
        images: ["/images/og-image.jpg"],
    },
    other: {
        "mobile-web-app-capable": "yes",
        "apple-mobile-web-app-status-bar-style": "default",
        "msapplication-TileColor": "#edf2f9",
        "msapplication-navbutton-color": "#edf2f9",
        "theme-color": "#edf2f9",
    },
    icons: {
        // icon: [
        //     {
        //         url: "/icons/favicon-16x16.png",
        //         sizes: "16x16",
        //         type: "image/png",
        //     },
        //     {
        //         url: "/icons/favicon-32x32.png",
        //         sizes: "32x32",
        //         type: "image/png",
        //     },
        // ],
        // apple: [
        //     {
        //         url: "/icons/apple-touch-icon.png",
        //         sizes: "180x180",
        //         type: "image/png",
        //     },
        // ],
        // other: [{ rel: "manifest", url: "/manifest.json" }],
    },
    metadataBase: new URL(
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    ),
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#edf2f9" },
        { media: "(prefers-color-scheme: dark)", color: "#edf2f9" },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased bg-[#edf2f9] overflow-hidden">
                <ReduxProvider>
                    <ConditionalLayout>{children}</ConditionalLayout>
                </ReduxProvider>
            </body>
        </html>
    );
}
