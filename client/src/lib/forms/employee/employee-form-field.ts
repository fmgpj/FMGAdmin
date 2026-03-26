import departments from "@/src/data/departments";
import employees from "@/src/data/employees";
import positions from "@/src/data/positions";
import { FormConfig } from "@/src/types/form";

export const EmployeeFormFields: FormConfig[] = [
    {
        colSpan: 6,
        label: "Employee Number",
        name: "employee_no",
        required: true,
        type: "text",
    },
    {
        colSpan: 3,
        label: "Department",
        name: "department_id",
        required: true,
        type: "dropdown",
        options: departments.map((department) => ({
            label: department.name,
            value: department.id.toString(),
        })),
    },
    {
        colSpan: 3,
        label: "Position",
        name: "position_id",
        required: true,
        type: "dropdown",
        options: positions.map((position) => ({
            label: position.name,
            value: position.id.toString(),
        })),
    },
    {
        colSpan: 4,
        label: "First name",
        name: "fname",
        required: true,
        type: "text",
    },
    {
        colSpan: 4,
        label: "Middle name",
        name: "mname",
        required: false,
        type: "text",
    },
    {
        colSpan: 4,
        label: "Last name",
        name: "lname",
        required: true,
        type: "text",
    },
    {
        colSpan: 4,
        label: "Birthdate",
        name: "birthdate",
        required: true,
        type: "date",
    },
    {
        colSpan: 4,
        label: "Date hired",
        name: "datehired",
        required: true,
        type: "date",
    },
    {
        colSpan: 4,
        label: "Contact no.",
        name: "contact_no",
        required: true,
        type: "text",
    },
    {
        colSpan: 6,
        label: "Email",
        name: "email",
        required: true,
        type: "dropdown",
        options: employees.map((employee) => ({
            label: employee.email,
            value: employee.id.toString(),
        })),
    },
    {
        colSpan: 2,
        label: "Employment status",
        name: "employment_status",
        required: true,
        type: "dropdown",
        options: [
            {
                label: "Full time",
                value: "fulltime",
            },
            {
                label: "Part time",
                value: "parttime",
            },
            {
                label: "Temporary",
                value: "temporary",
            },
            {
                label: "Resigned",
                value: "resigned",
            },
        ],
    },
    {
        colSpan: 2,
        label: "Civil status",
        name: "civil_status",
        required: true,
        type: "dropdown",
        options: [
            {
                label: "Single",
                value: "single",
            },
            {
                label: "Married",
                value: "married",
            },
            {
                label: "Widowed",
                value: "widowed",
            },
            {
                label: "Legally separated",
                value: "legally_separated",
            },
        ],
    },
    {
        colSpan: 2,
        label: "Gender",
        name: "gender",
        required: true,
        type: "dropdown",
        options: [
            {
                label: "Male",
                value: "male",
            },
            {
                label: "Female",
                value: "female",
            },
        ],
    },
    {
        colSpan: 12,
        label: "Address",
        name: "address",
        required: true,
        type: "text",
        multiline: true,
        rows: 3,
    },
];

export const EmployeeContactPersonFields: FormConfig[] = [
    {
        colSpan: 3,
        label: "Full name",
        name: "contact_person.fullname",
        required: true,
        type: "text",
    },
    {
        colSpan: 3,
        label: "Email",
        name: "contact_person.email",
        required: true,
        type: "text",
    },
    {
        colSpan: 3,
        label: "Contact no",
        name: "contact_person.phone",
        required: true,
        type: "text",
    },
    {
        colSpan: 3,
        label: "Relationship",
        name: "contact_person.relationship",
        required: true,
        type: "text",
    },
    {
        colSpan: 12,
        label: "Address",
        name: "contact_person.address",
        required: true,
        type: "text",
        multiline: true,
        rows: 3,
    },
];
