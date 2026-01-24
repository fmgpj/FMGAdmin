import Card from "@/src/components/ui/cards";
import {
    faAngleRight,
    faCaretDown,
    faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const TicketCountCard = () => {
    return (
        <Card className="bg-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 gap-y-4">
                <p className="text-[#344050] text-sm font-semibold">
                    Number of Tickets
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex flex-row gap-5">
                        <div className="flex flex-row gap-x-2 items-center">
                            <div className="w-2.5 h-2.5 bg-primary-500 rounded-full" />
                            <p className="text-xs text-gray-400">
                                On Hold Tickets
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-x-2 items-center">
                                <div className="w-2.5 h-2.5 bg-primary-200 rounded-full" />
                                <p className="text-xs text-gray-400">
                                    Due Tickets
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-5">
                        <div className="flex flex-row gap-x-2 items-center">
                            <div className="w-2.5 h-2.5 bg-primary-300 rounded-full" />
                            <p className="text-xs text-gray-400">
                                Open Tickets
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-x-2 items-center">
                                <div className="w-2.5 h-2.5 bg-primary-400 rounded-full" />
                                <p className="text-xs text-gray-400">
                                    Unassigned Tickets
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-px bg-gray-100 rounded-full" />
            <div className="flex flex-col p-4 gap-y-2 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
                <div className="flex flex-row items-center gap-x-3">
                    <div className="flex flex-col min-w-30 w-30">
                        <p className="text-xl font-semibold">
                            00{" "}
                            <span className="text-xs text-success-500">
                                <FontAwesomeIcon icon={faCaretUp} size="xs" />
                                0.0%
                            </span>
                        </p>
                        <p className="text-xs font-semibold text-gray-400">
                            Total On Hold Tickets
                        </p>
                    </div>
                    <div>
                        <div className="h-7 w-px bg-gray-100 rounded-full" />
                    </div>
                    <div className="flex flex-col min-w-30 w-30">
                        <p className="text-xl font-semibold">
                            00{" "}
                            <span className="text-xs text-primary-500">
                                <FontAwesomeIcon icon={faCaretUp} size="xs" />
                                0.0%
                            </span>
                        </p>
                        <p className="text-xs font-semibold text-gray-400">
                            Total Open Tickets
                        </p>
                    </div>
                    <div>
                        <div className="h-7 w-px bg-gray-100 rounded-full" />
                    </div>
                    <div className="flex flex-col min-w-30 w-30">
                        <p className="text-xl font-semibold">
                            00{" "}
                            <span className="text-xs text-warning-500">
                                <FontAwesomeIcon icon={faCaretDown} size="xs" />
                                0.0%
                            </span>
                        </p>
                        <p className="text-xs font-semibold text-gray-400">
                            Total Due Tickets
                        </p>
                    </div>
                    <div>
                        <div className="h-7 w-px bg-gray-100 rounded-full" />
                    </div>
                    <div className="flex flex-col min-w-40 w-40">
                        <p className="text-xl font-semibold">
                            00{" "}
                            <span className="text-xs text-error-500">
                                <FontAwesomeIcon icon={faCaretUp} size="xs" />
                                0.0%
                            </span>
                        </p>
                        <p className="text-xs font-semibold text-gray-400">
                            Total Unassigned Tickets
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-center h-48 grow w-175 lg:w-full">
                    GRAPH HERE
                </div>
            </div>
            <div className="h-px bg-gray-100 rounded-full" />
            <div className="flex flex-row p-4 items-center justify-between">
                <p>dropdown here</p>
                <Link
                    href="#"
                    className="text-xs text-[#2c6be5] hover:text-[2362b7] font-semibold"
                >
                    View all reports
                    <FontAwesomeIcon icon={faAngleRight} />
                </Link>
            </div>
        </Card>
    );
};

export default TicketCountCard;
