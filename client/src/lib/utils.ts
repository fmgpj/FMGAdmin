import Profile from "@public/images/profile.jpg";

export const navs = [
    {
        label: "",
        links: [
            {
                label: "Dashboard",
                href: "/",
                subNav: [],
            },
            {
                label: "Calendar",
                href: "/calendar",
                subNav: [],
            },
            {
                label: "Client requests",
                href: "/client-request",
                subNav: [],
            },
            {
                label: "Billing",
                href: "/billing",
                subNav: [],
            },
            {
                label: "Invoice",
                href: "/invoice",
                subNav: [],
            },
        ],
    },
    {
        label: "Setup",
        links: [
            {
                label: "Departments",
                href: "/departments",
                subNav: [],
            },
            {
                label: "Positions",
                href: "/positions",
                subNav: [],
            },
            {
                label: "Client",
                href: "/client",
                subNav: [],
            },
            {
                label: "Employee",
                href: "/employee",
                subNav: [
                    {
                        label: "List",
                        href: "/employee",
                    },
                    {
                        label: "Attendance",
                        href: "/employee/attendance",
                    },
                    {
                        label: "Performance",
                        href: "/employee/performance",
                    },
                ],
            },
        ],
    },
];

export const projects = [
    {
        name: "Unified Communication App",
        client: "Flowmetric Accounting Group",
        progress: 50,
        hours_worked: "12h:25m:00s",
        due_date: "01/31/25",
        members: [Profile, Profile, Profile, Profile],
    },
    {
        name: "Asset Management System",
        client: "Flowmetric Accounting Group",
        progress: 10,
        hours_worked: "8h:25m:00s",
        due_date: "05/15/25",
        members: [Profile, Profile],
    },
    {
        name: "Information System",
        client: "Flowmetric Accounting Group",
        progress: 80,
        hours_worked: "480h:00m:00s",
        due_date: "03/5/25",
        members: [
            Profile,
            Profile,
            Profile,
            Profile,
            Profile,
            Profile,
            Profile,
        ],
    },
];