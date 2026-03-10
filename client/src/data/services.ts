// Sample position data for development and testing
const setviceSeed = [
    {
        id: 1,
        department_name: "Accounting",
        name: "General Bookkeeping Services",
        status: "Active",
        created_by: "Paul John Judan",
    },
    {
        id: 2,
        department_name: "Accounting",
        name: "Accounts Payable (AP) Management",
        status: "Active",
        created_by: "Jane Smith",
    },
    {
        id: 3,
        department_name: "Information Technology",
        name: "Website Design and Development",
        status: "Inactive",
        created_by: "John Doe",
    },
    {
        id: 4,
        department_name: "Administration and Business Processing office",
        name: "Executive & Administrative Support",
        status: "Active",
        created_by: "Sarah Johnson",
    },
    {
        id: 5,
        department_name: "Legal",
        name: "Business Registration & Compliance",
        status: "Active",
        created_by: "Mike Wilson",
    },
    {
        id: 6,
        department_name: "Information Technology",
        name: "Google Sheet/Excel Automations",
        status: "Active",
        created_by: "Emily Davis",
    },
    {
        id: 7,
        department_name: "Information Technology",
        name: "Cloud Services",
        status: "Active",
        created_by: "Robert Brown",
    },
    {
        id: 8,
        department_name: "Legal",
        name: "Corporate Document Drafting",
        status: "Active",
        created_by: "Jennifer Martinez",
    },
    {
        id: 9,
        department_name: "Legal",
        name: "Regulatory Filings (SEC & BIR)",
        status: "Active",
        created_by: "David Anderson",
    },
    {
        id: 10,
        department_name: "Accounting",
        name: "Accounts Receivable (AR) Management",
        status: "Active",
        created_by: "Lisa Thompson",
    },
    {
        id: 11,
        department_name: "Accounting",
        name: "Payroll Processing",
        status: "Active",
        created_by: "Chris Garcia",
    },
];

export const services = setviceSeed.map((service) => ({
    ...service,
    action: service.id,
}));

export default services;
