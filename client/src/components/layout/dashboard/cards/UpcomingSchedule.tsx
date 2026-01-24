import Card from "@/src/components/ui/cards";
import Image from "next/image";

import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Profile from "@public/images/profile.jpg";

const UpcomingScheduleCard = () => {
    return (
        <Card className="bg-white">
            <div className="flex flex-col gap-y-6 p-4">
                <div className="flex flex-row gap-x-5 items-start">
                    <div className="flex flex-col grow gap-y-6">
                        <div className="flex flex-col">
                            <p className= "text-xs text-gray-300">Upcoming schedule</p>
                            <p className= "text-lg text-primary-500 font-semibold">FMG meeting</p>
                        </div>
                        <p className= "text-sm text-gray-500">{`The very first general meeting for planning FMG's design and development roadmap`}</p>
                    </div>
                    <div className="flex flex-col items-center justify-center w-30 lg:min-w-15 h-15 rounded-full  bg-primary-50">
                        <p className= "text-primary-500 -mt-1 text-xl font-semibold">09</p>
                        <p className= "text-primary-500 -mt-1 font-semibold text-sm">Mar</p>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <button type="button" className= "px-3 py-2 bg-success-400 text-white rounded-lg">
                        <FontAwesomeIcon icon={faVideo} /> Join meeting
                    </button>
                    <div className="flex flex-row items-center justify-end min-w-40 lg:min-w-2/12 px-4 py-2">
                        <Image
                            src={Profile}
                            alt="avatar"
                            width={26}
                            height={26}
                            className="rounded-full relative border-3 border-gray-200"
                        />
                        <Image
                            src={Profile}
                            alt="avatar"
                            width={26}
                            height={26}
                            className="rounded-full relative border-3 border-gray-200 -ml-2"
                        />
                        <div className="rounded-full w-6.5 h-6.5 bg-gray-600 border-3 border-gray-200 -ml-2 relative text-white text-[8px] flex items-center justify-center">
                            +50
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default UpcomingScheduleCard;
