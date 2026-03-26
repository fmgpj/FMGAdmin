import departments from "@/src/data/departments";
import { FormConfig } from "@/src/types/form";

export const ServiceFormFields: FormConfig[] = [
    {
        colSpan: 6,
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
        colSpan: 6,
        label: "Name",
        name: "name",
        required: true,
        type: "text",
    },
];
