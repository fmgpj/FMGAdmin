// Navigation configuration data
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
                href: "/department",
                subNav: [],
            },
            {
                label: "Positions",
                href: "/position",
                subNav: [],
            },
            {
                label: "Clients",
                href: "/client",
                subNav: [],
            },
            {
                label: "Employees",
                href: "/employee",
                subNav: [],
            },
            {
                label: "Projects",
                href: "/project",
                subNav: [],
            },
        ],
    },
    {
        label: "Core",
        links: [
            {
                label: "Roles & Permissions",
                href: "/permission",
                subNav: [],
            },
        ],
    },
];

export default navs;
