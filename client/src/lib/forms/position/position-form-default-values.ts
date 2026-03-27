import { FormData } from "@/src/types/forms/position-form.types";

export const defaultPositionValues = (
    initialValues?: Partial<FormData>
): FormData => ({
    name: initialValues?.name ?? "",
    department_id: initialValues?.department_id ?? "",
});
