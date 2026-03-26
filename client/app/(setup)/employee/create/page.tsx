"use client";

import EmployeeForm from "@/src/components/forms/EmployeeForm";
import { useBreadcrumb } from "@/src/hooks/useBreadcrumbs";

const Page = () => {
    useBreadcrumb("Create Employee");

    return (
        <EmployeeForm
            mode="create"
            title="Create Employee"
            onSubmit={(data) => console.log("Create Employee", data)}
        />
    );
};

export default Page;
