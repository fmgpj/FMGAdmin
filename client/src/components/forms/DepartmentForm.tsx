"use client";

import { BreadcrumbLink } from "@/src/components/ui/breadcrumbs/BreadcrumbLink";
import Button from "@/src/components/ui/button";
import Dropdown from "@/src/components/ui/dropdown";
import Field from "@/src/components/ui/field";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

type Mode = "create" | "edit" | "view";

export type DepartmentFormData = {
    name: string;
    employee_id: string;
};

type DepartmentFormProps = {
    mode: Mode;
    title: string;
    initialValues?: Partial<DepartmentFormData>;
    onSubmit?: (data: DepartmentFormData) => void;
    cancelPath?: string;
    submitLabel?: string;
};

const DepartmentForm = ({
    mode,
    title,
    initialValues,
    onSubmit,
    cancelPath = "/department",
    submitLabel,
}: DepartmentFormProps) => {
    const isReadOnly = mode === "view";

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<DepartmentFormData>({
        defaultValues: {
            name: initialValues?.name ?? "",
            employee_id: initialValues?.employee_id ?? "",
        },
        mode: "onBlur",
    });

    useEffect(() => {
        reset({
            name: initialValues?.name ?? "",
            employee_id: initialValues?.employee_id ?? "",
        });
    }, [initialValues, reset]);

    const handleFormSubmit = handleSubmit((data) => {
        if (isReadOnly) return;
        onSubmit?.(data);
    });

    return (
        <div className="flex flex-col px-4 gap-y-5 h-full">
            <p className="text-xl font-semibold">{title}</p>
            <form
                className="flex flex-col gap-y-4 overflow-hidden max-h-screen"
                autoComplete="off"
                onSubmit={handleFormSubmit}
            >
                <div className="w-full bg-white p-4 rounded-lg shadow-md flex flex-col overflow-y-auto max-h-screen min-h-125">
                    <div className="flex flex-col md:flex-row gap-2">
                        <div className="w-full md:w-1/2 flex flex-col">
                            <p className="text-sm">Name</p>
                            <div className="flex flex-col">
                                <Field
                                    variant="outlined"
                                    // color="#565555"
                                    isRounded
                                    disabled={isReadOnly}
                                    {...register("name", {
                                        required: isReadOnly
                                            ? false
                                            : "Name is required",
                                    })}
                                />
                                {errors.name?.message && (
                                    <p className="text-sm text-right pr-3 text-red-400">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col">
                            <p className="text-sm">Email</p>
                            <div className="flex flex-col">
                                <Controller
                                    name="employee_id"
                                    control={control}
                                    rules={{
                                        required: isReadOnly
                                            ? false
                                            : "Email is required",
                                    }}
                                    render={({ field }) => (
                                        <Dropdown
                                            value={field.value}
                                            onChange={field.onChange}
                                            isRounded
                                            disabled={isReadOnly}
                                            options={[
                                                {
                                                    label: "pj.judan@flowmetricaccounting.group",
                                                    value: 1,
                                                },
                                                {
                                                    label: "judyann.vibal@flowmetricaccounting.group",
                                                    value: 2,
                                                },
                                            ]}
                                        />
                                    )}
                                />
                                {errors.employee_id?.message && (
                                    <p className="text-sm text-right pr-3 text-red-400">
                                        {errors.employee_id.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-end gap-x-3">
                    <BreadcrumbLink
                        variant="filled"
                        bgColor="#dfdfdf"
                        color="#29377E"
                        path={cancelPath}
                        label="Departments"
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

export default DepartmentForm;
