'use client'

import { useEffect } from 'react'


export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Something went wrong!
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          We encountered an unexpected error. Please try again.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            {/* Error Details */}
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="shrink-0">
                  
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Error Details
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p className="font-mono text-xs bg-red-100 p-2 rounded">
                      {error.message || 'An unexpected error occurred'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-4">
              <button
                onClick={reset}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Try Again
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Go to Homepage
              </button>
            </div>

            {/* Support Info */}
            <div className="text-center">
              <p className="text-xs text-gray-500">
                If the problem persists, please contact support with error ID:
              </p>
              <p className="text-xs font-mono text-gray-600 mt-1">
                {error.digest || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}