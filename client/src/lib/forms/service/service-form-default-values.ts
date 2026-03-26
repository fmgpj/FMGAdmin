import { FormData } from "@/src/types/forms/service-form.types";

export const defaultServiceValues = (
    initialValues?: Partial<FormData>
): FormData => ({
    name: initialValues?.name ?? "",
    department_id: initialValues?.department_id ?? "",
});
