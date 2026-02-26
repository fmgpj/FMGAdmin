"use client";

import { useAppDispatch } from "@/src/redux";
import { addToTrail, startFromSidebar } from "@/src/redux/slices/breadcrumbs";
import { BreadcrumbLinkProps } from "@/src/types/breadcrumbs";
import Link from "next/link";

export const BreadcrumbLink = ({
    path,
    children,
    label,
    source,
    className,
    onClick,
}: BreadcrumbLinkProps) => {
    const dispatch = useAppDispatch();

    const handleClick = () => {
        const breadcrumbItem = { label, path };

        if (source === "sidebar") {
            dispatch(startFromSidebar(breadcrumbItem));
        } else {
            dispatch(addToTrail(breadcrumbItem));
        }

        onClick?.();
    };

    return (
        <Link href={path} className={className} onClick={handleClick}>
            {children}
        </Link>
    )
};
