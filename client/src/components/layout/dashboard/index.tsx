"use client";

import CustomerSatisfactionCard from "./cards/CustomerSatisfaction";
import TicketCountCard from "./cards/TicketCount";
import TicketStatusCard from "./cards/TicketStatus";
import UnresolvedTicketCard from "./cards/UnresolvedTicket";
import WelcomeCard from "./cards/Welcome";

export default function DashboardPage() {
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
                <div className="grow lg:w-3/4">
                    <TicketCountCard />
                </div>
                <div className="grow lg:w-1/4">
                    <CustomerSatisfactionCard />
                </div>
            </div>
        </div>
    );
}
