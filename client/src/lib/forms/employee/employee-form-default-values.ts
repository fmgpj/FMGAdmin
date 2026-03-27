import { FormData } from "@/src/types/forms/employee-form.types";

export const defaultEmployeeValues = (
    initialValues?: Partial<FormData>
): FormData => ({
    employee_no: initialValues?.employee_no ?? "",
    department_id: initialValues?.department_id ?? "",
    position_id: initialValues?.position_id ?? "",
    fname: initialValues?.fname ?? "",
    mname: initialValues?.mname ?? "",
    lname: initialValues?.lname ?? "",
    birthdate: initialValues?.birthdate ?? "",
    datehired: initialValues?.datehired ?? "",
    civil_status: initialValues?.civil_status ?? "",
    email: initialValues?.email ?? "",
    contact_no: initialValues?.contact_no ?? "",
    gender: initialValues?.gender ?? "",
    employment_status: initialValues?.employment_status ?? "",
    address: initialValues?.address ?? "",
    sss: initialValues?.sss ?? "",
    philhealth: initialValues?.philhealth ?? "",
    pagibig: initialValues?.pagibig ?? "",
    tin: initialValues?.tin ?? "",
    contact_person: {
        fullname: initialValues?.contact_person?.fullname ?? "",
        relationship: initialValues?.contact_person?.relationship ?? "",
        address: initialValues?.contact_person?.address ?? "",
        phone: initialValues?.contact_person?.phone ?? "",
        email: initialValues?.contact_person?.email ?? "",
    },
});
