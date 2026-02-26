"use client";

import { useBreadcrumb } from "@/src/hooks/useBreadcrumbs";
import Card from "../../ui/cards";
import CustomerSatisfactionCard from "./cards/CustomerSatisfaction";
import RunningProjectsCard from "./cards/RunningProjects";
import TeamProgressCard from "./cards/TeamProgress";
import TicketCountCard from "./cards/TicketCount";
import TicketStatusCard from "./cards/TicketStatus";
import UnresolvedTicketCard from "./cards/UnresolvedTicket";
import UpcomingScheduleCard from "./cards/UpcomingSchedule";
import WelcomeCard from "./cards/Welcome";

export default function DashboardPage() {
    useBreadcrumb("Dashboard");
    return (
        <div className="flex flex-col gap-y-4 px-4">
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex flex-col gap-y-4 grow lg:w-2/4">
                    <WelcomeCard />
                    <TicketStatusCard />
                </div>
                <div className="grow lg:w-2/4">
                    <UnresolvedTicketCard />
                </div>
            </div>
            <div className="flex flex-col gap-4 lg:flex-row">
                <div className="grow lg:w-7/12">
                    <TicketCountCard />
                </div>
                <div className="grow lg:w-5/12">
                    <CustomerSatisfactionCard />
                </div>
            </div>
            <RunningProjectsCard />
            <div className="flex flex-col gap-4 lg:flex-row">
                <div className="flex flex-col gap-4 grow lg:w-4/12">
                    <TeamProgressCard />
                    <UpcomingScheduleCard />
                </div>
                <div className="grow lg:w-8/12">
                    <Card className="bg-white h-full">
                        <div className="flex items-center justify-center h-full">
                            CALENDAR UI HERE
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
