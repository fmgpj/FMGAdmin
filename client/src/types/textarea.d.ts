import { TextareaHTMLAttributes } from "react";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    isRequired?: boolean;
    variant?: "outlined" | "filled";
    isRounded?: boolean;
    bgColor?: string;
    color?: string;
    rows?: number;
};
