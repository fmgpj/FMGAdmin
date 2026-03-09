"use client";

import { BreadcrumbLink } from "@/src/components/ui/breadcrumbs/BreadcrumbLink";
import Button from "@/src/components/ui/button";
import Dropdown from "@/src/components/ui/dropdown";
import Field from "@/src/components/ui/field";
import { departments } from "@/src/data/departments";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

type Mode = "create" | "edit" | "view";

export type PositionFormData = {
    name: string;
    department_id: string | "";
};

type PositionFormProps = {
    mode: Mode;
    title: string;
    initialValues?: Partial<PositionFormData>;
    onSubmit?: (data: PositionFormData) => void;
    cancelPath?: string;
    submitLabel?: string;
};

const PositionForm = ({
    mode,
    title,
    initialValues,
    onSubmit,
    cancelPath = "/position",
    submitLabel,
}: PositionFormProps) => {
    const isReadOnly = mode === "view";

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<PositionFormData>({
        defaultValues: {
            name: initialValues?.name ?? "",
            department_id: initialValues?.department_id ?? "",
        },
        mode: "onBlur",
    });

    useEffect(() => {
        reset({
            name: initialValues?.name ?? "",
            department_id: initialValues?.department_id ?? "",
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
                        <div className="w-full md:w-1/2 flex flex-col gap-y-1">
                            <p className="text-sm">Department</p>
                            <div className="flex flex-col">
                                <Controller
                                    name="department_id"
                                    control={control}
                                    rules={{
                                        required: isReadOnly
                                            ? false
                                            : "Department is required",
                                    }}
                                    render={({ field }) => (
                                        <Dropdown
                                            value={field.value}
                                            onChange={field.onChange}
                                            isRounded
                                            disabled={isReadOnly}
                                            options={departments.map(
                                                (department) => ({
                                                    label: department.name,
                                                    value: department.id,
                                                })
                                            )}
                                        />
                                    )}
                                />
                                {errors.department_id?.message && (
                                    <p className="text-sm text-right pr-3 text-red-400">
                                        {errors.department_id.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col gap-y-1">
                            <p className="text-sm">Name</p>
                            <div className="flex flex-col">
                                <Field
                                    variant="outlined"
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
                    </div>
                </div>
                <div className="flex flex-row items-center justify-end gap-x-3">
                    <BreadcrumbLink
                        variant="filled"
                        bgColor="#dfdfdf"
                        color="#29377E"
                        path={cancelPath}
                        label="Position"
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

export default PositionForm;
