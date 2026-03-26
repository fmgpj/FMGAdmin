import { DatePickerProps } from "@/src/types/datepicker";

export const getDatePickerStyles = ({
    bgColor,
    variant,
    isRounded,
    color,
}: Partial<DatePickerProps>) => {
    return {
        color: getTextColor(color),
        backgroundColor: getBackgroundColor(variant, bgColor),
        outline: "none",
        padding: getPadding(isRounded),
        border: getBorder(variant),
        borderRadius: getBorderRadius(isRounded),
    };
};

export const getTextColor = (color?: string): string => {
    return color ?? "#565555";
};

export const getBackgroundColor = (
    variant?: "outlined" | "filled",
    bgColor?: string
): string => {
    if (variant === "outlined") return "#FFFFFF";

    return bgColor ?? "#f4f4f5";
};

export const getBorder = (variant?: "outlined" | "filled"): string => {
    if (variant === "outlined") return "1px solid #e4e4e7";
    return "solid 0px transparent";
};

export const getPadding = (isRounded?: boolean): string => {
    return isRounded ? "4px 12px" : "4px 8px";
};

export const getBorderRadius = (isRounded?: boolean): string => {
    return isRounded ? "20px" : "4px";
};
