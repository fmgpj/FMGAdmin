"use client";

import EmployeeForm from "@/src/components/forms/EmployeeForm";
import employees from "@/src/data/employees";
import { useBreadcrumb } from "@/src/hooks/useBreadcrumbs";
import { useParams } from "next/navigation";
import { useMemo } from "react";

const Page = () => {
    const params = useParams<{ id: string }>();
    const id = params?.id;

    const employeeId = Number(id);

    const employee = useMemo(
        () => employees.find((item) => item.id === employeeId),
        [employeeId]
    );

    useBreadcrumb("View Employee");

    if (!employee) {
        return (
            <div className="flex flex-col px-4 gap-y-3">
                <p className="text-xl font-semibold">Employee not found</p>
                <p className="text-sm text-gray-500">
                    No employee exists for ID: {id}
                </p>
            </div>
        );
    }

    return (
        <EmployeeForm
            mode="view"
            title="View employee"
            initialValues={{
                email: employee.email,
            }}
        />
    );
};

export default Page;
