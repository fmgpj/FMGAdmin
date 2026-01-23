"use client";

import {
    faAngleRight,
    faBoxOpen,
    faCalendar,
    faCaretUp,
    faCloudArrowDown,
    faPause,
    faWarning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "../../ui/cards";
import Link from "next/link";

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-y-4 px-4">
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex flex-col gap-y-4 grow lg:w-2/4">
                    <Card className="bg-[#f9fafd] p-4">
                        <div className=" flex flex-col">
                            <p className="text-sm text-[#29377E]">Welcome!</p>
                            <p className="text-lg font-bold text-[#29377E]">
                                <span className="text-[#BE9F44] font-extrabold">
                                    Judan
                                </span>
                                , <span>Paul John</span>
                            </p>
                        </div>
                    </Card>
                    <Card className="bg-white p-4">
                        <div className="flex flex-col gap-y-4 lg:gap-0">
                            <div className="flex flex-col lg:flex-row gap-4">
                                <div className="flex flex-row grow lg:w-2/4 items-center justify-between lg:pb-4">
                                    <div className="flex flex-col">
                                        <div className="bg-[#e5effb] w-6 h-6 flex items-center justify-center rounded-sm">
                                            <FontAwesomeIcon
                                                icon={faPause}
                                                size="sm"
                                                color="#2a7be3"
                                            />
                                        </div>
                                        <p className="text-xl font-semibold">
                                            00{" "}
                                            <span className="text-xs text-[#2a7be3]">
                                                <FontAwesomeIcon
                                                    icon={faCaretUp}
                                                    size="xs"
                                                />
                                                0.0%
                                            </span>
                                        </p>
                                        <p className="text-xs font-semibold text-[#8f959e]">
                                            On Hold Tickets
                                        </p>
                                    </div>
                                    <div className="flex flex-col">
                                        GRAPH HERE
                                    </div>
                                </div>
                                <div className="h-px lg:w-px lg:h-full bg-gray-100 rounded-full" />
                                <div className="flex flex-row grow lg:w-2/4 items-center justify-between lg:pb-4">
                                    <div className="flex flex-col">
                                        <div className="bg-[#e0f9ef] w-6 h-6 flex items-center justify-center rounded-sm">
                                            <FontAwesomeIcon
                                                icon={faBoxOpen}
                                                size="sm"
                                                color="#00d27b"
                                            />
                                        </div>
                                        <p className="text-xl font-semibold">
                                            00{" "}
                                            <span className="text-xs text-[#00d27b]">
                                                <FontAwesomeIcon
                                                    icon={faCaretUp}
                                                    size="xs"
                                                />
                                                0.0%
                                            </span>
                                        </p>
                                        <p className="text-xs font-semibold text-[#8f959e]">
                                            Open Ticket
                                        </p>
                                    </div>
                                    <div className="flex flex-col">
                                        GRAPH HERE
                                    </div>
                                </div>
                            </div>
                            <div className="h-px bg-gray-100 rounded-full" />
                            <div className="flex flex-col lg:flex-row gap-4">
                                <div className="flex flex-row grow lg:w-2/4 items-center justify-between lg:pt-4">
                                    <div className="flex flex-col">
                                        <div className="bg-[#e4f7fe] w-6 h-6 flex items-center justify-center rounded-sm">
                                            <FontAwesomeIcon
                                                icon={faCalendar}
                                                size="sm"
                                                color="#27bcfd"
                                            />
                                        </div>
                                        <p className="text-xl font-semibold">
                                            00{" "}
                                            <span className="text-xs text-[#27bcfd]">
                                                <FontAwesomeIcon
                                                    icon={faCaretUp}
                                                    size="xs"
                                                />
                                                0.0%
                                            </span>
                                        </p>
                                        <p className="text-xs font-semibold text-[#8f959e]">
                                            Due Tickets Today
                                        </p>
                                    </div>
                                    <div className="flex flex-col">
                                        GRAPH HERE
                                    </div>
                                </div>
                                <div className="h-px lg:w-px lg:h-full bg-gray-100 rounded-full" />
                                <div className="flex flex-row grow lg:w-2/4 items-center justify-between lg:pt-4">
                                    <div className="flex flex-col">
                                        <div className="bg-[#fef1ea] w-6 h-6 flex items-center justify-center rounded-sm">
                                            <FontAwesomeIcon
                                                icon={faWarning}
                                                size="sm"
                                                color="#f68f57"
                                            />
                                        </div>
                                        <p className="text-xl font-semibold">
                                            00{" "}
                                            <span className="text-xs text-[#f68f57]">
                                                <FontAwesomeIcon
                                                    icon={faCaretUp}
                                                    size="xs"
                                                />
                                                0.0%
                                            </span>
                                        </p>
                                        <p className="text-xs font-semibold text-[#8f959e]">
                                            Unassigned
                                        </p>
                                    </div>
                                    <div className="flex flex-col">
                                        GRAPH HERE
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="grow lg:w-2/4">
                    <Card className="bg-white h-full">
                        <div className="flex flex-row items-center justify-between p-4">
                            <p className="text-[#344050] text-sm font-semibold">
                                Unresolved Tickets by Priority
                            </p>
                            <button
                                type="button"
                                className="hover:shadow-sm px-1 rounded-xs"
                            >
                                <FontAwesomeIcon icon={faCloudArrowDown} />
                            </button>
                        </div>
                        <div className="h-px bg-gray-100 rounded-full" />
                        <div className="flex items-center justify-center h-48 lg:h-full">
                            GRAPH HERE
                        </div>
                        <div className="h-px bg-gray-100 rounded-full" />
                        <div className="flex items-center justify-center p-4">
                            <Link
                                href="#"
                                className="text-xs text-[#2c6be5] hover:text-[2362b7] font-semibold"
                            >
                                View all
                                <FontAwesomeIcon icon={faAngleRight} />
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
