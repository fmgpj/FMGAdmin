import { FormConfig } from "@/src/types/form";
import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "../ui/datepicker";
import Dropdown from "../ui/dropdown";
import Field from "../ui/field";
import Textarea from "../ui/textarea";

type FormBuilderProps = {
    fields: Array<FormConfig>;
    isReadOnly?: boolean;
    variant?: "outlined" | "filled";
};

const spanClass: Record<1 | 2 | 3 | 4 | 6 | 12, string> = {
    1: "col-span-1 md:col-span-1",
    2: "col-span-1 md:col-span-2",
    3: "col-span-1 md:col-span-3",
    4: "col-span-1 md:col-span-4",
    6: "col-span-1 md:col-span-6",
    12: "col-span-1 md:col-span-12",
};

const FormBuilder = ({
    fields,
    variant = "outlined",
    isReadOnly,
}: FormBuilderProps) => {
    const { register, control, getFieldState, formState } = useFormContext();

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
            {fields.map((field) => {
                const { error } = getFieldState(field.name, formState);
                const errorMessage =
                    typeof error?.message === "string"
                        ? error.message
                        : undefined;
                return (
                    <div
                        className={`flex flex-col gap-y-1 ${spanClass[field.colSpan]}`}
                        key={field.name}
                    >
                        <p className="text-sm">{field.label}</p>
                        <div className="flex flex-col">
                            {(field.type === "text" ||
                                field.type === "email" ||
                                field.type === "number") &&
                                (field.multiline ? (
                                    <Textarea
                                        autoComplete="off"
                                        variant={variant}
                                        isRounded
                                        disabled={isReadOnly || field.disabled}
                                        placeholder={field.placeholder}
                                        rows={field.rows ?? 4}
                                        {...register(field.name, {
                                            required:
                                                isReadOnly || !field.required
                                                    ? false
                                                    : `${field.label} is required`,
                                        })}
                                    />
                                ) : (
                                    <Field
                                        autoComplete="off"
                                        variant={variant}
                                        isRounded
                                        disabled={isReadOnly || field.disabled}
                                        placeholder={field.placeholder}
                                        type={field.type}
                                        {...register(field.name, {
                                            required:
                                                isReadOnly || !field.required
                                                    ? false
                                                    : `${field.label} is required`,
                                        })}
                                    />
                                ))}
                            {field.type === "dropdown" && (
                                <Controller
                                    name={field.name}
                                    control={control}
                                    rules={{
                                        required:
                                            isReadOnly || !field.required
                                                ? false
                                                : `${field.label} is required`,
                                    }}
                                    render={({ field: rhfField }) => (
                                        <Dropdown
                                            value={rhfField.value}
                                            onChange={rhfField.onChange}
                                            isRounded
                                            disabled={isReadOnly}
                                            options={field.options}
                                        />
                                    )}
                                />
                            )}
                            {field.type === "date" && (
                                <Controller
                                    name={field.name}
                                    control={control}
                                    rules={{
                                        required:
                                            isReadOnly || !field.required
                                                ? false
                                                : `${field.label} is required!`,
                                    }}
                                    render={({ field }) => (
                                        <DatePicker
                                            value={field.value}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            disabled={isReadOnly}
                                            variant="outlined"
                                            isRounded
                                        />
                                    )}
                                />
                            )}
                            {errorMessage && (
                                <p className="text-sm text-right pr-3 text-red-400">
                                    {errorMessage}
                                </p>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default FormBuilder;
