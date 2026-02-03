import Card from "@/src/components/ui/cards";
import { faAngleRight, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from "chart.js";
import Link from "next/link";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// Grouped bar chart component for number of tickets
const NumberOfTicketsChart = () => {
    const data = {
        labels: ["Mar 01", "Mar 02", "Mar 03", "Mar 04", "Mar 05"],
        datasets: [
            {
                label: "On Hold Tickets",
                data: [45, 35, 55, 55, 55],
                backgroundColor: "#3b82f6", // primary-500
                borderRadius: 2,
                barThickness: 12,
            },
            {
                label: "Due Tickets",
                data: [60, 40, 65, 68, 45],
                backgroundColor: "#dbeafe", // primary-200
                borderRadius: 2,
                barThickness: 12,
            },
            {
                label: "Open Tickets",
                data: [65, 45, 40, 42, 40],
                backgroundColor: "#bfdbfe", // primary-300
                borderRadius: 2,
                barThickness: 12,
            },
            {
                label: "Unassigned Tickets",
                data: [40, 45, 75, 78, 65],
                backgroundColor: "#60a5fa", // primary-400
                borderRadius: 2,
                barThickness: 12,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: "#374151",
                titleColor: "#f9fafb",
                bodyColor: "#f9fafb",
                borderColor: "#6b7280",
                borderWidth: 1,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                border: {
                    display: false,
                },
                ticks: {
                    color: "#6b7280",
                    font: {
                        size: 12,
                    },
                },
            },
            y: {
                grid: {
                    color: "#f3f4f6",
                    drawBorder: false,
                },
                border: {
                    display: false,
                },
                ticks: {
                    color: "#6b7280",
                    font: {
                        size: 12,
                    },
                    stepSize: 20,
                },
                max: 80,
            },
        },
        interaction: {
            mode: "index" as const,
            intersect: false,
        },
    };

    return (
        <div className="h-full w-full">
            <Bar data={data} options={options} />
        </div>
    );
};

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
                            125{" "}
                            <span className="text-xs text-success-500">
                                <FontAwesomeIcon icon={faCaretUp} size="xs" />
                                5.3%
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
                            100{" "}
                            <span className="text-xs text-primary-500">
                                <FontAwesomeIcon icon={faCaretUp} size="xs" />
                                3.20%
                            </span>
                        </p>
                        <p className="text-xs font-semibold text-gray-400">
                            Total Due Tickets
                        </p>
                    </div>
                    <div>
                        <div className="h-7 w-px bg-gray-100 rounded-full" />
                    </div>
                    <div className="flex flex-col min-w-30 w-30">
                        <p className="text-xl font-semibold">
                            53{" "}
                            <span className="text-xs text-warning-500">
                                <FontAwesomeIcon icon={faCaretUp} size="xs" />
                                2.3%
                            </span>
                        </p>
                        <p className="text-xs font-semibold text-gray-400">
                            Total Open Tickets
                        </p>
                    </div>
                    <div>
                        <div className="h-7 w-px bg-gray-100 rounded-full" />
                    </div>
                    <div className="flex flex-col min-w-40 w-40">
                        <p className="text-xl font-semibold">
                            136{" "}
                            <span className="text-xs text-error-500">
                                <FontAwesomeIcon icon={faCaretUp} size="xs" />
                                3.1%
                            </span>
                        </p>
                        <p className="text-xs font-semibold text-gray-400">
                            Total Unassigned Tickets
                        </p>
                    </div>
                </div>
                <div className="h-64 grow w-175 lg:w-full mt-4">
                    <NumberOfTicketsChart />
                </div>
            </div>
            <div className="h-px bg-gray-100 rounded-full" />
            <div className="flex flex-row p-4 items-center justify-between">
                <div className="flex items-center gap-2">
                    {/* <select title= "Select month" className="text-sm font-medium text-gray-700 bg-transparent border-none focus:outline-none cursor-pointer">
                        <option value="march">March</option>
                        <option value="april">April</option>
                        <option value="may">May</option>
                    </select>
                    <FontAwesomeIcon
                        icon={faCaretDown}
                        size="sm"
                        className="text-gray-400"
                    /> */}
                </div>
                <Link
                    href="#"
                    className="text-xs text-[#2c6be5] hover:text-[#2362b7] font-semibold"
                >
                    View all reports <FontAwesomeIcon icon={faAngleRight} />
                </Link>
            </div>
        </Card>
    );
};

export default TicketCountCard;
