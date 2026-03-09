"use client";

import Card from "@/src/components/ui/cards";
import Table from "@/src/components/ui/table";
import { TableColumn } from "@/src/types/table";
import { projects } from "@data/projects";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

type RunningProject = (typeof projects)[number];

const badgeVariants = [
    "text-success-500 bg-success-100",
    "text-danger-500 bg-danger-100",
    "text-primary-500 bg-primary-100",
    "text-secondary-500 bg-secondary-100",
    "text-warning-500 bg-warning-100",
];

const columns: TableColumn<RunningProject>[] = [
    {
        key: "name",
        label: "Projects",
        style: { minWidth: "320px" },
        render: (_, row, index) => {
            const badgeClass = badgeVariants[index % badgeVariants.length];

            return (
                <div className="flex flex-row gap-x-2 items-center">
                    <p
                        className={`font-semibold ${badgeClass} w-8 h-8 rounded-full flex items-center justify-center`}
                    >
                        {row.name.charAt(0).toUpperCase()}
                    </p>
                    <div className="flex flex-col">
                        <p className="text-sm font-bold text-gray-500">
                            {row.name}
                        </p>
                        <p className="text-xs text-gray-400">{row.client}</p>
                    </div>
                </div>
            );
        },
    },
    {
        key: "progress",
        label: "Progress",
        style: { minWidth: "160px" },
        searchable: false,
        render: (_, row) => (
            <div className="w-full h-2 rounded-full bg-gray-100 relative overflow-hidden">
                <div
                    className="h-2 bg-secondary-500"
                    style={{ width: `${row.progress}%` }}
                />
            </div>
        ),
    },
    {
        key: "hours_worked",
        label: "Worked",
        style: { minWidth: "160px" },
    },
    {
        key: "due_date",
        label: "Due Date",
        style: { minWidth: "160px" },
    },
    {
        key: "members",
        label: "Member",
        style: { minWidth: "160px" },
        searchable: false,
        render: (_, row) => (
            <div className="flex flex-row items-center">
                {row.members.slice(0, 2).map((member, index) => (
                    <Image
                        src={member}
                        key={index}
                        alt="avatar"
                        width={26}
                        height={26}
                        className="rounded-full relative border-3 border-gray-200 -ml-2"
                    />
                ))}
                {row.members.length > 2 && (
                    <div className="rounded-full w-6.5 h-6.5 bg-gray-600 border-3 border-gray-200 -ml-2 relative text-white text-[8px] flex items-center justify-center">
                        +{row.members.length - 2}
                    </div>
                )}
            </div>
        ),
    },
];

const RunningProjectsCard = () => {
    return (
        <Card className="bg-white">
            <div className="flex flex-row items-center justify-between p-4">
                <p className="text-[#344050] text-sm font-semibold">
                    Running Projects
                </p>
            </div>
            <div className="h-px bg-gray-100 rounded-full" />
            <div className="overflow-x-auto">
                <Table
                    data={projects}
                    columns={columns}
                    size="small"
                    variant="borderless"
                />
            </div>
            <div className="h-px bg-gray-100 rounded-full" />
            <div className="flex items-center justify-center p-4">
                <Link
                    href="#"
                    className="text-xs text-[#2c6be5] hover:text-[2362b7] font-semibold"
                >
                    Show All Projects
                    <FontAwesomeIcon icon={faAngleRight} />
                </Link>
            </div>
        </Card>
    );
};

export default RunningProjectsCard;
