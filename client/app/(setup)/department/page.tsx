"use client";

import { BreadcrumbLink } from "@/src/components/ui/breadcrumbs/BreadcrumbLink";
import Button from "@/src/components/ui/button";
import Dropdown from "@/src/components/ui/dropdown";
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
import { SetStateAction, useMemo, useState } from "react";

const Page = () => {
    // This will automatically initialize breadcrumbs from URL if needed
    useBreadcrumb();

    // External search state
    const [searchTerm, setSearchTerm] = useState("");

    // Filter modal state
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState<string | number>("");

    // Filter the data based on status and search term
    const filteredData = useMemo(() => {
        let result = departments;

        // Apply status filter
        if (statusFilter) {
            result = result.filter(
                (dept) =>
                    dept.status.toLowerCase() ===
                    statusFilter.toString().toLowerCase()
            );
        }

        // The Table component will handle searchTerm filtering
        return result;
    }, [statusFilter]);

    return (
        <div className="flex flex-col px-4 gap-y-2 h-full">
            <div className="flex flex-col gap-y-3">
                <p className="text-xl font-semibold">All departments</p>
                <div className="flex flex-row items-center justify-between gap-x-10">
                    <Field
                        className="w-full sm:w-6/12 md:w-5/12"
                        variant="outlined"
                        placeholder="Search department"
                        isRounded
                        value={searchTerm}
                        onChange={(e: {
                            target: { value: SetStateAction<string> };
                        }) => setSearchTerm(e.target.value)}
                    />
                    <div className="flex flex-row items-center justify-end gap-x-1">
                        <Button
                            variant="filled"
                            bgColor="#BE9F44"
                            className="w-10 h-10 flex items-center justify-center cursor-pointer"
                            onClick={() => setIsFilterModalOpen(true)}
                        >
                            <FontAwesomeIcon icon={faFilter} size="sm" />
                        </Button>
                        <BreadcrumbLink
                            variant="filled"
                            bgColor="#29377E"
                            color="#FFFFFF"
                            path="/department/create"
                            label="Create Department"
                            source="page"
                            className="w-10 h-10 md:w-auto rounded-sm flex items-center justify-center cursor-pointer"
                        >
                            <div className="block md:hidden">
                                <FontAwesomeIcon icon={faPlus} size="sm" />
                            </div>
                            <p className="hidden md:block md:px-3">Add new</p>
                        </BreadcrumbLink>
                    </div>
                </div>
            </div>
            {/* <div className="overflow-hidden max-w-5xl"> */}
            <Table
                size="large"
                variant="compact"
                pagination
                searchTerm={searchTerm}
                data={filteredData}
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

            {/* Filter Dropdown Panel */}
            {isFilterModalOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsFilterModalOpen(false)}
                    />
                    <div className="absolute top-30 right-4 bg-white rounded-lg shadow-lg p-4 w-80 z-50">
                        <div className="mb-3">
                            <h3 className="text-sm font-semibold text-gray-800">
                                Filter by Status
                            </h3>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-2">
                                    Status
                                </label>
                                <Dropdown
                                    value={statusFilter}
                                    onChange={(value) => setStatusFilter(value)}
                                    options={[
                                        { label: "All", value: "" },
                                        { label: "Active", value: "active" },
                                        {
                                            label: "Inactive",
                                            value: "inactive",
                                        },
                                    ]}
                                    placeholder="Select status"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setStatusFilter("");
                                    setIsFilterModalOpen(false);
                                }}
                                className="text-xs px-3 py-1.5 cursor-pointer"
                            >
                                Clear
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Page;
