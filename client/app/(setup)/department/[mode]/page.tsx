"use client";

import { useBreadcrumb } from "@/src/hooks/useBreadcrumbs";

const Page = () => {
    // Use custom label for better breadcrumb display
    useBreadcrumb("Create Department");

    return (
        <div className="flex flex-col px-4 gap-y-2">
            <p className="text-xl font-semibold">Create department</p>
        </div>
    );
};

export default Page;
