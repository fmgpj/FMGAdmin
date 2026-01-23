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
