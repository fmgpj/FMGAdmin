"use client";

import ServiceForm from "@/src/components/forms/ServiceForm";
import { useBreadcrumb } from "@/src/hooks/useBreadcrumbs";

const Page = () => {
    useBreadcrumb("Create Service");

    return (
        <ServiceForm
            mode="create"
            title="Create service"
            onSubmit={(data) => console.log("Create Service", data)}
        />
    );
};

export default Page;
