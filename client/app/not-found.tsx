"use client";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                {/* 404 Graphic */}
                <div className="flex justify-center">
                    <div className="text-center">
                        <h1 className="text-6xl font-bold text-blue-600">
                            404
                        </h1>
                    </div>
                </div>

                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Page Not Found
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 max-w-sm mx-auto">
                    {`Sorry, we couldn't find the page you're looking for. It
                    might have been moved, deleted, or you entered the wrong
                    URL.`}
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="space-y-6">
                        {/* Navigation Options */}
                        <div className="grid grid-cols-1 gap-4">
                            <Link
                                href="/"
                                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                            >
                                Go to Dashboard
                            </Link>

                            <button
                                onClick={() => window.history.back()}
                                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                            >
                                Go Back
                            </button>
                        </div>

                        {/* Quick Links */}
                        <div className="border-t border-gray-200 pt-6">
                            <h3 className="text-sm font-medium text-gray-900 text-center mb-4">
                                Quick Navigation
                            </h3>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <Link
                                    href="/client"
                                    className="text-blue-600 hover:text-blue-800 text-center py-2 px-3 rounded hover:bg-blue-50 transition-colors"
                                >
                                    Clients
                                </Link>
                                <Link
                                    href="/products"
                                    className="text-blue-600 hover:text-blue-800 text-center py-2 px-3 rounded hover:bg-blue-50 transition-colors"
                                >
                                    Products
                                </Link>
                                <Link
                                    href="/dashboard"
                                    className="text-blue-600 hover:text-blue-800 text-center py-2 px-3 rounded hover:bg-blue-50 transition-colors"
                                >
                                    Analytics
                                </Link>
                                <Link
                                    href="/settings"
                                    className="text-blue-600 hover:text-blue-800 text-center py-2 px-3 rounded hover:bg-blue-50 transition-colors"
                                >
                                    Settings
                                </Link>
                            </div>
                        </div>

                        {/* Search Suggestion */}
                        <div className="border-t border-gray-200 pt-6">
                            <p className="text-xs text-gray-500 text-center">
                                Looking for something specific? Try using the
                                search feature in your dashboard.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="fixed top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 to-purple-600"></div>
        </div>
    );
}
