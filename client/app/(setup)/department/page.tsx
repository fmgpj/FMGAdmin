"use client";

import { BreadcrumbLink } from "@/src/components/ui/breadcrumbs/BreadcrumbLink";
import Button from "@/src/components/ui/button";
import Field from "@/src/components/ui/field";
import Table from "@/src/components/ui/table";
import { useBreadcrumb } from "@/src/hooks/useBreadcrumbs";
import { departments } from "@data/departments";
import {
    faEye,
    faFilter,
    faPencil,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SetStateAction, useState } from "react";

const Page = () => {
    // This will automatically initialize breadcrumbs from URL if needed
    useBreadcrumb();

    // External search state
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="flex flex-col px-4 gap-y-2">
            <div className="flex flex-col gap-y-3">
                <p className="text-xl font-semibold">All departments</p>
                <div className="flex flex-row items-center justify-between gap-x-10">
                    <Field
                        className="w-full"
                        variant="outlined"
                        placeholder="Search department"
                        isRounded
                        value={searchTerm}
                        onChange={(e: { target: { value: SetStateAction<string>; }; }) => setSearchTerm(e.target.value)}
                    />
                    <div className="flex flex-row items-center justify-end gap-x-1 bg-">
                        <Button variant="filled" size="small" bgColor="#BE9F44">
                            <FontAwesomeIcon icon={faFilter} size="sm" />
                        </Button>
                        <BreadcrumbLink
                            path="/department/create"
                            label="Create Department"
                            source="page"
                            className="bg-[#29377E] text-white h-8 w-[33.5px] rounded-sm flex items-center justify-center"
                        >
                            <FontAwesomeIcon icon={faPlus} size="sm" />
                        </BreadcrumbLink>
                    </div>
                </div>
            </div>
            <Table
                size="large"
                variant="compact"
                pagination
                searchTerm={searchTerm}
                data={departments}
                columns={[
                    { key: "id", label: "ID", style: { minWidth: "50px" } },
                    {
                        key: "name",
                        label: "Name",
                        style: { minWidth: "150px" },
                        searchable: true,
                    },
                    {
                        key: "email",
                        label: "Email",
                        style: { minWidth: "250px" },
                        searchable: true,
                    },
                    {
                        key: "status",
                        label: "Status",
                        style: { minWidth: "100px" },
                        searchable: true,
                    },
                    {
                        key: "created_by",
                        label: "Created By",
                        style: { minWidth: "250px" },
                        searchable: true,
                    },
                    {
                        key: "actions",
                        label: "Actions",
                        style: { minWidth: "100px" },
                        searchable: false,
                        render: () => (
                            <div className="flex flex-row items-center gap-x-2">
                                <Button
                                    color="#565555"
                                    className="cursor-pointer"
                                >
                                    <FontAwesomeIcon icon={faEye} />
                                </Button>
                                <Button
                                    color="#565555"
                                    className="cursor-pointer"
                                >
                                    <FontAwesomeIcon icon={faPencil} />
                                </Button>
                            </div>
                        ),
                    },
                ]}
            />
        </div>
    );
};

export default Page;
