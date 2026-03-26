import employees from "@/src/data/employees";
import { FormConfig } from "@/src/types/form";

export const DepartmentFormFields: FormConfig[] = [
    {
        colSpan: 6,
        label: "Name",
        name: "name",
        required: true,
        type: "text",
    },
    {
        colSpan: 6,
        label: "Assigned email",
        name: "employee_id",
        required: true,
        type: "dropdown",
        options: employees.map((employee) => ({
            label: employee.email,
            value: employee.id.toString(),
        })),
    },
];
