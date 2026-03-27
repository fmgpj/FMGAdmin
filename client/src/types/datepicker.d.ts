import { InputHTMLAttributes } from "react";

export type DatePickerProps = InputHTMLAttributes<HTMLInputElement> & {
    variant?: "outlined" | "filled";
    isRounded?: boolean;
    bgColor?: string;
    color?: string;
    minDate?: string;
    maxDate?: string;
};
