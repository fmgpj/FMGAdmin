import Card from "@/src/components/ui/cards";
import {
    faAngleRight,
    faCloudArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

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
    );
};

export default UnresolvedTicketCard;
