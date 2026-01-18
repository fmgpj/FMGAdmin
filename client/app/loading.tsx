export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center space-y-6">
                {/* FMG Logo/Brand */}
                <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">F</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        FMG Admin
                    </h1>
                </div>

                {/* Loading Spinner */}
                <div className="flex items-center space-x-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <div className="text-gray-600 text-lg">Loading...</div>
                </div>

                {/* Loading Progress Animation */}
                <div className="w-64 bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-blue-600 h-2 rounded-full animate-pulse w-3/5"
                    ></div>
                </div>

                {/* Loading Text */}
                <p className="text-sm text-gray-500 max-w-md text-center">
                    Please wait while we prepare your dashboard and load the
                    latest data.
                </p>

                {/* Animated Dots */}
                <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <div
                        className="h-2 w-2 bg-blue-600 rounded-full animate-bounce delay-100"
                    ></div>
                    <div
                        className="h-2 w-2 bg-blue-600 rounded-full animate-bounce delay-200"
                    ></div>
                </div>
            </div>

            {/* Loading Stats Cards Skeleton */}
            <div className="mt-16 max-w-4xl w-full px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="bg-white shadow rounded-lg p-6 animate-pulse"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
