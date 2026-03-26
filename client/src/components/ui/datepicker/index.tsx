import { DatePickerProps } from "@/src/types/datepicker";
import { getDatePickerStyles } from "./helpers";

const DatePicker = ({
    bgColor,
    variant,
    isRounded,
    color,
    disabled,
    minDate,
    maxDate,
    className,
    ...props
}: DatePickerProps) => {
    const datePickerStyles = getDatePickerStyles({
        bgColor,
        variant,
        isRounded,
        color,
    });

    const baseClasses = "transition-colors duration-200";
    const stateClasses = disabled ? "opacity-50 cursor-not-allowed" : "";
    const inputClasses =
        `${baseClasses} ${stateClasses} ${className ?? ""}`.trim();

    return (
        <input
            type="date"
            min={minDate}
            max={maxDate}
            style={{
                ...datePickerStyles,
                overflow: "hidden",
                textOverflow: "ellipsis",
            }}
            className={inputClasses}
            disabled={disabled}
            {...props}
        />
    );
};

export default DatePicker;
