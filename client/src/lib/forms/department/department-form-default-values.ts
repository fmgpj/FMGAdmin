import { FormData } from "@/src/types/forms/department-form.types";

export const defaultDepartmentValues = (
    initialValues?: Partial<FormData>
): FormData => ({
    name: initialValues?.name ?? "",
    employee_id: initialValues?.employee_id ?? "",
});
