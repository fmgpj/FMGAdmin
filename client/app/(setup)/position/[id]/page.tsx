"use client";

import PositionForm from "@/src/components/forms/PositionForm";
import positions from "@/src/data/positions";
import { useBreadcrumb } from "@/src/hooks/useBreadcrumbs";
import { useParams } from "next/navigation";
import { useMemo } from "react";

const Page = () => {
    const params = useParams<{ id: string }>();
    const id = params?.id;

    const positionId = Number(id);

    const position = useMemo(
        () => positions.find((item) => item.id === positionId),
        [positionId]
    );

    useBreadcrumb("View Position");

    if (!position) {
        return (
            <div className="flex flex-col px-4 gap-y-3">
                <p className="text-xl font-semibold">Position not found</p>
                <p className="text-sm text-gray-500">
                    No position exists for ID: {id}
                </p>
            </div>
        );
    }

    return (
        <PositionForm
            mode="view"
            title="View position"
            initialValues={{
                name: position.name,
                department_id: position.department_name,
            }}
        />
    );
};

export default Page;
