"use client";

import DepartmentForm from "@/src/components/forms/DepartmentForm";
import { useBreadcrumb } from "@/src/hooks/useBreadcrumbs";

const Page = () => {
    useBreadcrumb("Create Department");

    return (
        <DepartmentForm
            mode="create"
            title="Create department"
            onSubmit={(data) => console.log("Create Department", data)}
        />
    );
};

export default Page;
