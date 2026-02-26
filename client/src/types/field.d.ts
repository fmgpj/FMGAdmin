export type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
    isRequired?: boolean;
    variant?: "outlined" | "filled";
    isRounded?: boolean;
    bgColor?: string;
    color?: string;
};
