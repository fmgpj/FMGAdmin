"use client";

import PositionForm from "@/src/components/forms/PositionForm";
import { useBreadcrumb } from "@/src/hooks/useBreadcrumbs";

const Page = () => {
    useBreadcrumb("Create Position");

    return (
        <PositionForm
            mode="create"
            title="Create position"
            onSubmit={(data) => console.log("Create Position", data)}
        />
    );
};

export default Page;
