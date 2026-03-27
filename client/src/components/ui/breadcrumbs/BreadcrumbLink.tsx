"use client";

import { useAppDispatch, useAppSelector } from "@/src/redux";
import {
    addToTrail,
    navigateToItem,
    startFromSidebar,
} from "@/src/redux/slices/breadcrumbs";
import { BreadcrumbLinkProps } from "@/src/types/breadcrumbs";
import Link from "next/link";
import { getButtonClassNames, getButtonStyles } from "../button/helpers";

export const BreadcrumbLink = ({
    path,
    children,
    label,
    source,
    className,
    onClick,
    variant,
    isRounded,
    bgColor,
    color,
    size,
    fullWidth,
}: BreadcrumbLinkProps) => {
    const dispatch = useAppDispatch();
    const { items } = useAppSelector((state) => state.breadcrumb);

    const handleClick = () => {
        const breadcrumbItem = { label, path };

        if (source === "sidebar") {
            dispatch(startFromSidebar(breadcrumbItem));
        } else {
            // Check if path already exists in breadcrumb trail
            const pathExists = items.some((item) => item.path === path);
            if (pathExists) {
                // If going back to an existing path, use navigateToItem to trim the trail
                dispatch(navigateToItem(path));
            } else {
                // If it's a new path, add it to the trail
                dispatch(addToTrail(breadcrumbItem));
            }
        }

        onClick?.();
    };

    const buttonStyles = getButtonStyles({
        variant,
        bgColor,
        color,
        size,
        isRounded,
        fullWidth,
    });

    const shouldApplyButtonStyles =
        variant !== undefined ||
        bgColor !== undefined ||
        color !== undefined ||
        size !== undefined ||
        isRounded !== undefined ||
        fullWidth !== undefined;

    const buttonClasses = getButtonClassNames(variant);

    return (
        <Link
            href={path}
            className={`${buttonClasses} ${className || ""}`}
            style={shouldApplyButtonStyles ? buttonStyles : undefined}
            onClick={handleClick}
        >
            {children}
        </Link>
    );
};
