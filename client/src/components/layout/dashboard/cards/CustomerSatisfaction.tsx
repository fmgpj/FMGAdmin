import Card from "@/src/components/ui/cards";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomerSatisfactionCard = () => {
    return (
        <Card className="bg-white h-full">
            <div className="flex flex-row items-center justify-between p-4">
                <p className="text-[#344050] text-sm font-semibold">
                    Customer Satisfaction
                </p>
            </div>
            <div className="h-px bg-gray-100 rounded-full" />
            <div className="flex items-center justify-center h-48 lg:h-full">
                GRAPH HERE
            </div>
            <div className="h-px bg-gray-100 rounded-full" />
            <div className="flex items-center justify-center gap-x-4">
                <div className="flex flex-col py-2">
                    <p className="text-xs font-semibold text-gray-400">
                        Positive
                    </p>
                    <p className="text-xl font-semibold">
                        00{" "}
                        <span className="text-xs text-success-500">
                            <FontAwesomeIcon icon={faCaretUp} size="xs" />
                            0.0%
                        </span>
                    </p>
                </div>
                <div className="w-px h-full bg-gray-100 rounded-full" />
                <div className="flex flex-col py-2">
                    <p className="text-xs font-semibold text-gray-400">
                        Negative
                    </p>
                    <p className="text-xl font-semibold">
                        00{" "}
                        <span className="text-xs text-error-500">
                            <FontAwesomeIcon icon={faCaretDown} size="xs" />
                            0.0%
                        </span>
                    </p>
                </div>
            </div>
        </Card>
    );
};

export default CustomerSatisfactionCard;
