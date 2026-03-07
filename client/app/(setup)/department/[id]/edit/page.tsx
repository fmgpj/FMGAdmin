"use client";

import DepartmentForm from "@/src/components/forms/DepartmentForm";
import { useBreadcrumb } from "@/src/hooks/useBreadcrumbs";
import { departments } from "@data/departments";
import { useParams } from "next/navigation";
import { useMemo } from "react";

const Page = () => {
    const params = useParams<{ id: string }>();
    const id = params?.id;

    const departmentId = Number(id);

    const department = useMemo(
        () => departments.find((item) => item.id === departmentId),
        [departmentId]
    );

    useBreadcrumb("Edit Department");

    if (!department) {
        return (
            <div className="flex flex-col px-4 gap-y-3">
                <p className="text-xl font-semibold">Department not found</p>
                <p className="text-sm text-gray-500">
                    No department exists for ID: {id}
                </p>
            </div>
        );
    }

    return (
        <DepartmentForm
            mode="edit"
            title="Update department"
            initialValues={{
                name: department.name,
                email: department.email,
            }}
            submitLabel="Update"
            onSubmit={(data) =>
                console.log("Update Department", department.id, data)
            }
        />
    );
};

export default Page;
