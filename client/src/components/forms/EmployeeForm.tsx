"use client";

import { defaultEmployeeValues } from "@/src/lib/forms/employee/employee-form-default-values";
import {
    EmployeeContactPersonFields,
    EmployeeFormFields,
} from "@/src/lib/forms/employee/employee-form-field";
import { Mode } from "@/src/types/form";
import { FormData } from "@/src/types/forms/employee-form.types";
import { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BreadcrumbLink } from "../ui/breadcrumbs/BreadcrumbLink";
import Button from "../ui/button";
import FormBuilder from "../layout/FormBuilder";

type EmployeeFormProps = {
    mode: Mode;
    title: string;
    initialValues?: Partial<FormData>;
    onSubmit?: (data: FormData) => void;
    cancelPath?: string;
    submitLabel?: string;
};

const EmployeeForm = ({
    mode,
    title,
    initialValues,
    onSubmit,
    cancelPath = "/employee",
    submitLabel,
}: EmployeeFormProps) => {
    const isReadOnly = mode === "view";
    const defaultValues: FormData = useMemo(
        () => defaultEmployeeValues(initialValues),
        [initialValues]
    );

    const methods = useForm<FormData>({
        defaultValues,
        mode: "onBlur",
    });

    useEffect(() => {
        methods.reset(defaultValues);
    }, [defaultValues, methods]);

    const handleFormSubmit = methods.handleSubmit((data) => {
        if (isReadOnly) return;
        onSubmit?.(data);
    });

    return (
        <div className="flex flex-col px-4 gap-y-5 h-full">
            <p className="text-xl font-semibold">{title}</p>
            <form
                className="flex flex-col px-4 gap-y-4 overflow-hidden max-h-screen"
                autoComplete="off"
                onSubmit={handleFormSubmit}
            >
                <div className="w-full bg-white p-4 rounded-lg shadow-md flex flex-col gap-y-5 overflow-y-auto max-h-screen min-h-125">
                    <div className="flex flex-col gap-y-2">
                        <p className="text-lg font-semibold">
                            Basic information
                        </p>
                        <FormProvider {...methods}>
                            <FormBuilder
                                fields={EmployeeFormFields}
                                isReadOnly={isReadOnly}
                            />
                        </FormProvider>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <p className="text-lg font-semibold">Contact person</p>
                        <FormProvider {...methods}>
                            <FormBuilder
                                fields={EmployeeContactPersonFields}
                                isReadOnly={isReadOnly}
                            />
                        </FormProvider>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-end gap-x-3">
                    <BreadcrumbLink
                        variant="filled"
                        bgColor="#dfdfdf"
                        color="#29377E"
                        path={cancelPath}
                        label="Employees"
                        source="page"
                        className="h-10 min-w-30 rounded-sm flex items-center justify-center"
                    >
                        {isReadOnly ? "Back" : "Cancel"}
                    </BreadcrumbLink>
                    {!isReadOnly && (
                        <Button
                            type="submit"
                            variant="filled"
                            size="medium"
                            bgColor="#29377E"
                            className="min-w-30 cursor-pointer"
                        >
                            {submitLabel ||
                                (mode === "edit" ? "Update" : "Save")}
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;
