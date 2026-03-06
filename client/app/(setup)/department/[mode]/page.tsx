"use client";

import { BreadcrumbLink } from "@/src/components/ui/breadcrumbs/BreadcrumbLink";
import Button from "@/src/components/ui/button";
import Dropdown from "@/src/components/ui/dropdown";
import Field from "@/src/components/ui/field";
import { useBreadcrumb } from "@/src/hooks/useBreadcrumbs";
import { Controller, useForm } from "react-hook-form";

type FormData = {
    name: string;
    email: number;
};

const Page = () => {
    // Use custom label for better breadcrumb display
    useBreadcrumb("Create Department");
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            name: "",
            email: undefined,
        },
        mode: "onBlur",
    });

    return (
        <div className="flex flex-col px-4 gap-y-5 h-full">
            <p className="text-xl font-semibold">Create department</p>
            <form
                className="flex flex-col gap-y-4 overflow-hidden max-h-screen"
                autoComplete="off"
                onSubmit={handleSubmit((data) => console.log(data))}
            >
                <div className="w-full bg-white p-4 rounded-lg shadow-md flex flex-col overflow-y-auto max-h-screen min-h-125">
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="w-full md:w-1/2 flex flex-col gap-y-1">
                            <p className="text-sm">Name</p>
                            <div className="flex flex-col">
                                <Field
                                    variant="outlined"
                                    isRounded
                                    {...register("name", {
                                        required: "Name is required",
                                    })}
                                />
                                {errors.name?.message && (
                                    <p className="text-sm text-right pr-3 text-red-600 mt-1">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col gap-y-1">
                            <p className="text-sm">Email</p>
                            <div className="flex flex-col">
                                <Controller
                                    name="email"
                                    control={control}
                                    rules={{ required: "Email is required" }}
                                    render={({ field }) => (
                                        <Dropdown
                                            {...field}
                                            isRounded
                                            options={[
                                                {
                                                    label: "pj.judan@flowmetricaccounting.group",
                                                    value: 1,
                                                },
                                                {
                                                    label: "judayann.vibal@flowmetricaccounting.group",
                                                    value: 2,
                                                },
                                            ]}
                                        />
                                    )}
                                />
                                {errors.email?.message && (
                                    <p className="text-sm text-right pr-3 text-red-600 mt-1">
                                        {errors.email.message}
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
                        path="/department"
                        label="Departments"
                        source="page"
                        className="h-10 min-w-30 rounded-sm flex items-center justify-center"
                    >
                        Cancel
                    </BreadcrumbLink>
                    <Button
                        type="submit"
                        variant="filled"
                        size="medium"
                        bgColor="#29377E"
                        className="min-w-30 cursor-pointer"
                    >
                        Save
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Page;
