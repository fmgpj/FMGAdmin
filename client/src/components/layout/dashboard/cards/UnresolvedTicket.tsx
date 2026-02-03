import Card from "@/src/components/ui/cards";
import {
    faAngleRight,
    faCloudArrowDown,
} from "@fortawesome/free-solid-svg-icons";
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

// Stacked bar chart component for unresolved tickets by priority
const UnresolvedTicketsChart = () => {
    const data = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label: "Urgent",
                data: [25, 20, 15, 30, 18, 22, 16],
                backgroundColor: "#1e40af", // blue-800
                borderRadius: 0,
                borderSkipped: false,
            },
            {
                label: "High",
                data: [35, 45, 40, 50, 35, 40, 30],
                backgroundColor: "#3b82f6", // blue-500
                borderRadius: 0,
                borderSkipped: false,
            },
            {
                label: "Medium",
                data: [40, 35, 45, 60, 40, 35, 30],
                backgroundColor: "#60a5fa", // blue-400
                borderRadius: 0,
                borderSkipped: false,
            },
            {
                label: "Low",
                data: [20, 25, 20, 25, 22, 18, 15],
                backgroundColor: "#93c5fd", // blue-300
                borderRadius: 0,
                borderSkipped: false,
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
                mode: "index" as const,
                intersect: false,
                backgroundColor: "#374151",
                titleColor: "#f9fafb",
                bodyColor: "#f9fafb",
                borderColor: "#6b7280",
                borderWidth: 1,
            },
        },
        scales: {
            x: {
                stacked: true,
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
                stacked: true,
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
                max: 120,
            },
        },
        interaction: {
            mode: "index" as const,
            intersect: false,
        },
    };

    return (
        <div className="h-full w-full flex flex-col">
            {/* Priority Legend */}
            <div className="flex flex-wrap gap-4 text-sm mb-6">
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-800">14</span>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-blue-800 rounded-full"></div>
                        <span className="text-xs text-gray-600">Urgent</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-800">16</span>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-xs text-gray-600">High</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-800">53</span>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-xs text-gray-600">Medium</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-800">25</span>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                        <span className="text-xs text-gray-600">Low</span>
                    </div>
                </div>
            </div>
            {/* Chart */}
            <div className="flex-1">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

const UnresolvedTicketCard = () => {
    return (
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
            <div className="p-4 flex-1 min-h-0">
                <UnresolvedTicketsChart />
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
    );
};

export default UnresolvedTicketCard;
