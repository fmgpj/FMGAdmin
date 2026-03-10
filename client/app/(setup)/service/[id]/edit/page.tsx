"use client";

import ServiceForm from "@/src/components/forms/ServiceForm";
import services from "@/src/data/services";
import { useBreadcrumb } from "@/src/hooks/useBreadcrumbs";
import { useParams } from "next/navigation";
import { useMemo } from "react";

const Page = () => {
    const params = useParams<{ id: string }>();
    const id = params?.id;

    const serviceId = Number(id);

    const service = useMemo(
        () => services.find((item) => item.id === serviceId),
        [serviceId]
    );

    useBreadcrumb("Edit Service");

    if (!service) {
        return (
            <div className="flex flex-col px-4 gap-y-3">
                <p className="text-xl font-semibold">Service not found</p>
                <p className="text-sm text-gray-500">
                    No service exists for ID: {id}
                </p>
            </div>
        );
    }

    return (
        <ServiceForm
            mode="edit"
            title="Update service"
            initialValues={{
                name: service.name,
                department_id: service.department_name,
            }}
            submitLabel="Update"
            onSubmit={(data) =>
                console.log("Update Service", service.id, data)
            }
        />
    );
};

export default Page;
