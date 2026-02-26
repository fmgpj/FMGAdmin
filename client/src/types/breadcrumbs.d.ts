export interface BreadcrumbLinkProps {
    path: string;
    children: React.ReactNode;
    label: string;
    source: "sidebar" | "page";
    className?: string;
    onClick?: () => void;
}
