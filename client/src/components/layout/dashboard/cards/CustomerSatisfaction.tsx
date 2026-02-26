import Card from "@/src/components/ui/cards";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

// Pie chart component for customer satisfaction
const CustomerSatisfactionChart = () => {
    const data = {
        labels: ["Positive", "Negative"],
        datasets: [
            {
                data: [75, 25], // 75% positive, 25% negative
                backgroundColor: [
                    "#3b82f6", // blue-500 for positive
                    "#93c5fd", // blue-300 for negative
                ],
                borderWidth: 0,
                cutout: 0,
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
                callbacks: {
                    label: function (context: {
                        label: string;
                        parsed: number;
                    }) {
                        return `${context.label}: ${context.parsed}%`;
                    },
                },
            },
        },
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <div className="w-48 h-48">
                <Pie data={data} options={options} />
            </div>
            {/* Legend */}
            <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Positive</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
                    <span className="text-sm text-gray-600">Negative</span>
                </div>
            </div>
        </div>
    );
};

const CustomerSatisfactionCard = () => {
    return (
        <Card className="bg-white h-full">
            <div className="flex flex-row items-center justify-between p-4">
                <p className="text-[#344050] text-sm font-semibold">
                    Customer Satisfaction
                </p>
            </div>
            <div className="h-px bg-gray-100 rounded-full" />
            <div className="flex-1 p-4">
                <CustomerSatisfactionChart />
            </div>
            <div className="h-px bg-gray-100 rounded-full" />
            <div className="flex items-center justify-evenly gap-x-4">
                <div className="flex flex-col py-2">
                    <p className="text-xs font-semibold text-gray-400">
                        Positive
                    </p>
                    <p className="text-xl font-semibold">
                        75{" "}
                        <span className="text-xs text-success-500">
                            <FontAwesomeIcon icon={faCaretUp} size="xs" />
                            8.2%
                        </span>
                    </p>
                </div>
                <div className="w-px h-full bg-gray-100 rounded-full" />
                <div className="flex flex-col py-2">
                    <p className="text-xs font-semibold text-gray-400">
                        Negative
                    </p>
                    <p className="text-xl font-semibold">
                        25{" "}
                        <span className="text-xs text-error-500">
                            <FontAwesomeIcon icon={faCaretDown} size="xs" />
                            2.1%
                        </span>
                    </p>
                </div>
            </div>
        </Card>
    );
};

export default CustomerSatisfactionCard;
