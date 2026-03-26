"use client";

import { BreadcrumbLink } from "@/src/components/ui/breadcrumbs/BreadcrumbLink";
import Button from "@/src/components/ui/button";
import { defaultServiceValues } from "@/src/lib/forms/service/service-form-default-values";
import { ServiceFormFields } from "@/src/lib/forms/service/service-form-field";
import { Mode } from "@/src/types/form";
import { FormData } from "@/src/types/forms/service-form.types";
import { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormBuilder from "../layout/FormBuilder";

type ServiceFormProps = {
    mode: Mode;
    title: string;
    initialValues?: Partial<FormData>;
    onSubmit?: (data: FormData) => void;
    cancelPath?: string;
    submitLabel?: string;
};

const ServiceForm = ({
    mode,
    title,
    initialValues,
    onSubmit,
    cancelPath = "/service",
    submitLabel,
}: ServiceFormProps) => {
    const isReadOnly = mode === "view";
    const defaultValues: FormData = useMemo(
        () => defaultServiceValues(initialValues),
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
                className="flex flex-col gap-y-4 overflow-hidden max-h-screen"
                autoComplete="off"
                onSubmit={handleFormSubmit}
            >
                <div className="w-full bg-white p-4 rounded-lg shadow-md flex flex-col overflow-y-auto max-h-screen min-h-125">
                    <FormProvider {...methods}>
                        <FormBuilder
                            fields={ServiceFormFields}
                            isReadOnly={isReadOnly}
                        />
                    </FormProvider>
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

export default ServiceForm;
