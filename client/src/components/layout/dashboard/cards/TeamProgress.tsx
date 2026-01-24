import Card from "@/src/components/ui/cards";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const TeamProgressCard = () => {
    return (
        <Card className="bg-white">
            <div className="p-4 flex flex-col gap-y-8">
                <div className="flex flex-row items-center justify-between">
                    <p className="text-[#344050] text-lg font-semibold">
                        Team Progress
                    </p>
                    <Link
                        href="#"
                        className="text-xs text-[#2c6be5] hover:text-[2362b7] font-semibold"
                    >
                        Report
                        <FontAwesomeIcon icon={faAngleRight} />
                    </Link>
                </div>
                <div className="flex flex-col gap-y-4">
                    <p className="text-sm text-gray-400">{`See team member's time worked, activity levels, and progress`}</p>
                    <div className="w-full h-2 rounded-full bg-gray-100 relative overflow-hidden">
                        <div
                            className={`h-2 bg-secondary-500`}
                            style={{
                                width: `63%`,
                            }}
                        />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-lg text-secondary-500">
                            75% completed
                        </p>
                        <p className="text-xs text-gray-400">Jan 1st to 30th</p>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default TeamProgressCard;
