import Card from "@/src/components/ui/cards";
import {
    faBoxOpen,
    faCalendar,
    faCaretUp,
    faPause,
    faWarning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TicketStatusCard = () => {
    return (
        <Card className="bg-white p-4">
            <div className="flex flex-col gap-y-4 lg:gap-0">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex flex-row grow lg:w-2/4 items-center justify-between lg:pb-4">
                        <div className="flex flex-col">
                            <div className="bg-primary-100 w-6 h-6 flex items-center justify-center rounded-sm">
                                <FontAwesomeIcon
                                    icon={faPause}
                                    size="sm"
                                    color="#2a7be3"
                                />
                            </div>
                            <p className="text-xl font-semibold">
                                00{" "}
                                <span className="text-xs text-primary-500">
                                    <FontAwesomeIcon
                                        icon={faCaretUp}
                                        size="xs"
                                    />
                                    0.0%
                                </span>
                            </p>
                            <p className="text-xs font-semibold text-gray-400">
                                On Hold Tickets
                            </p>
                        </div>
                        <div className="flex flex-col">GRAPH HERE</div>
                    </div>
                    <div className="h-px lg:w-px lg:h-full bg-gray-100 rounded-full" />
                    <div className="flex flex-row grow lg:w-2/4 items-center justify-between lg:pb-4">
                        <div className="flex flex-col">
                            <div className="bg-success-100 w-6 h-6 flex items-center justify-center rounded-sm">
                                <FontAwesomeIcon
                                    icon={faBoxOpen}
                                    size="sm"
                                    color="#00d27b"
                                />
                            </div>
                            <p className="text-xl font-semibold">
                                00{" "}
                                <span className="text-xs text-success-500">
                                    <FontAwesomeIcon
                                        icon={faCaretUp}
                                        size="xs"
                                    />
                                    0.0%
                                </span>
                            </p>
                            <p className="text-xs font-semibold text-gray-400">
                                Open Ticket
                            </p>
                        </div>
                        <div className="flex flex-col">GRAPH HERE</div>
                    </div>
                </div>
                <div className="h-px bg-gray-100 rounded-full" />
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex flex-row grow lg:w-2/4 items-center justify-between lg:pt-4">
                        <div className="flex flex-col">
                            <div className="bg-secondary-100 w-6 h-6 flex items-center justify-center rounded-sm">
                                <FontAwesomeIcon
                                    icon={faCalendar}
                                    size="sm"
                                    color="#27bcfd"
                                />
                            </div>
                            <p className="text-xl font-semibold">
                                00{" "}
                                <span className="text-xs text-secondary-500">
                                    <FontAwesomeIcon
                                        icon={faCaretUp}
                                        size="xs"
                                    />
                                    0.0%
                                </span>
                            </p>
                            <p className="text-xs font-semibold text-gray-400">
                                Due Tickets Today
                            </p>
                        </div>
                        <div className="flex flex-col">GRAPH HERE</div>
                    </div>
                    <div className="h-px lg:w-px lg:h-full bg-gray-100 rounded-full" />
                    <div className="flex flex-row grow lg:w-2/4 items-center justify-between lg:pt-4">
                        <div className="flex flex-col">
                            <div className="bg-warning-100 w-6 h-6 flex items-center justify-center rounded-sm">
                                <FontAwesomeIcon
                                    icon={faWarning}
                                    size="sm"
                                    color="#f68f57"
                                />
                            </div>
                            <p className="text-xl font-semibold">
                                00{" "}
                                <span className="text-xs text-warning-500">
                                    <FontAwesomeIcon
                                        icon={faCaretUp}
                                        size="xs"
                                    />
                                    0.0%
                                </span>
                            </p>
                            <p className="text-xs font-semibold text-gray-400">
                                Unassigned
                            </p>
                        </div>
                        <div className="flex flex-col">GRAPH HERE</div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default TicketStatusCard;
