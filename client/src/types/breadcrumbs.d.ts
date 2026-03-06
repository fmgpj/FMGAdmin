export interface BreadcrumbLinkProps {
    path: string;
    children: React.ReactNode;
    label: string;
    source: "sidebar" | "page";
    className?: string;
    onClick?: () => void;
    variant?: "filled" | "outlined";
    isRounded?: boolean;
    bgColor?: string;
    color?: string;
    size?: "small" | "medium" | "large";
    fullWidth?: boolean;
}
