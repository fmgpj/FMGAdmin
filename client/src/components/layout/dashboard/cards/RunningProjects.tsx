/* eslint-disable react-hooks/purity */
import Card from "@/src/components/ui/cards";
import { projects } from "@data/projects";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

const variants = ["success", "danger", "primary", "secondary", "warning"];

const RunningProjectsCard = () => {
    return (
        <Card className="bg-white">
            <div className="flex flex-row items-center justify-between p-4">
                <p className="text-[#344050] text-sm font-semibold">
                    Running Projects
                </p>
            </div>
            <div className="h-px bg-gray-100 rounded-full" />
            <div className="flex flex-col overflow-x-scroll [&::-webkit-scrollbar]:hidden">
                <div className="flex flex-items items-center">
                    <p className="text-gray-700 text-sm font-semibold min-w-80 lg:min-w-4/12  px-4 py-2 bg-gray-100 ">
                        Projects
                    </p>
                    <p className="text-gray-700 text-sm font-semibold min-w-40 lg:min-w-2/12 px-4 py-2 bg-gray-100 ">
                        Progress
                    </p>
                    <p className="text-gray-700 text-sm font-semibold min-w-40 lg:min-w-2/12 px-4 py-2 bg-gray-100 ">
                        Worked
                    </p>
                    <p className="text-gray-700 text-sm font-semibold min-w-40 lg:min-w-2/12 px-4 py-2 bg-gray-100 ">
                        Due Date
                    </p>
                    <p className="text-gray-700 text-sm font-semibold min-w-40 lg:min-w-2/12 px-4 py-2 bg-gray-100 ">
                        Member
                    </p>
                </div>
                <div className="flex flex-col">
                    {projects.map((project, index) => {
                        const randomVariant =
                            variants[
                                Math.floor(Math.random() * variants.length)
                            ];
                        return (
                            <div
                                className="flex flex-row items-center"
                                key={index}
                            >
                                <div className="flex flex-row min-w-80 lg:min-w-4/12  px-4 py-2 gap-x-2 items-center">
                                    <p
                                        className={`font-semibold text-${randomVariant}-500 bg-${randomVariant}-100 w-8 h-8 rounded-full flex items-center justify-center`}
                                    >
                                        {project.name.charAt(0).toUpperCase()}
                                    </p>
                                    <div className="flex flex-col">
                                        <p className="text-sm font-bold text-gray-500">
                                            {project.name}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {project.client}
                                        </p>
                                    </div>
                                </div>
                                <div className="min-w-40 lg:min-w-2/12 px-4 py-2">
                                    <div className="w-full h-2 rounded-full bg-gray-100 relative overflow-hidden">
                                        <div
                                            className={`h-2 bg-secondary-500`}
                                            style={{
                                                width: `${project.progress}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                                <p className="min-w-40 lg:min-w-2/12 px-4 py-2 text-sm text-gray-500">
                                    {project.hours_worked}
                                </p>
                                <p className="min-w-40 lg:min-w-2/12 px-4 py-2 text-sm text-gray-500">
                                    {project.due_date}
                                </p>
                                <div className="flex flex-row items-center min-w-40 lg:min-w-2/12 px-4 py-2">
                                    {project.members
                                        .slice(0, 2)
                                        .map((member, index) => (
                                            <Image
                                                src={member}
                                                key={index}
                                                alt="avatar"
                                                width={26}
                                                height={26}
                                                className="rounded-full relative border-3 border-gray-200 -ml-2"
                                            />
                                        ))}
                                    {project.members.length > 2 && (
                                        <div className="rounded-full w-6.5 h-6.5 bg-gray-600 border-3 border-gray-200 -ml-2 relative text-white text-[8px] flex items-center justify-center">
                                            +{project.members.length - 2}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="h-px bg-gray-100 rounded-full" />
            <div className="flex items-center justify-center p-4">
                <Link
                    href="#"
                    className="text-xs text-[#2c6be5] hover:text-[2362b7] font-semibold"
                >
                    Show All Projects
                    <FontAwesomeIcon icon={faAngleRight} />
                </Link>
            </div>
        </Card>
    );
};

export default RunningProjectsCard;
