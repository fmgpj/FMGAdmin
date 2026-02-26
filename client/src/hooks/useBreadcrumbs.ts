"use client";

import navs from "@data/navigation";
import { useAppDispatch, useAppSelector } from "@/src/redux";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { addToTrail } from "../redux/slices/breadcrumbs";

// Helper function to build breadcrumbs from URL path
const buildBreadcrumbFromPath = (pathname: string, customLabel?: string) => {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs = [];

    let currentPath = "";

    for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        currentPath += `/${segment}`;

        // Check if this path exists in navs
        let navLabel = null;
        for (const nav of navs) {
            const found = nav.links.find((link) => link.href === currentPath);
            if (found) {
                navLabel = found.label;
                break;
            }
        }

        if (navLabel) {
            // Use the nav label
            breadcrumbs.push({ label: navLabel, path: currentPath });
        } else {
            // Generate label for dynamic routes
            let label = segment.charAt(0).toUpperCase() + segment.slice(1);

            // Handle common route patterns
            if (segment === "create" && i > 0) {
                const parentSegment = segments[i - 1];
                label = `Create ${parentSegment.charAt(0).toUpperCase() + parentSegment.slice(0, -1)}`; // Remove 's' from plural
            } else if (segment === "edit" && i > 0) {
                const parentSegment = segments[i - 1];
                label = `Edit ${parentSegment.charAt(0).toUpperCase() + parentSegment.slice(0, -1)}`;
            }

            // Use custom label for the current (last) segment
            if (i === segments.length - 1 && customLabel) {
                label = customLabel;
            }

            breadcrumbs.push({ label, path: currentPath });
        }
    }

    return breadcrumbs;
};

export const useBreadcrumb = (customLabel?: string) => {
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const { items } = useAppSelector((state) => state.breadcrumb);

    useEffect(() => {
        // Skip if we already have breadcrumbs (to preserve navigation state)
        if (items.length > 0) return;

        // Find the current page in navigation
        let currentPage = null;

        for (const nav of navs) {
            const found = nav.links.find((link) => link.href === pathname);
            if (found) {
                currentPage = {
                    label: customLabel || found.label,
                    path: pathname,
                };
                break;
            }
        }

        if (currentPage) {
            // Found in navs - use normal flow
            dispatch(addToTrail(currentPage));
        } else if (pathname !== "/") {
            // Not found in navs - build from path (for dynamic routes)
            const breadcrumbs = buildBreadcrumbFromPath(pathname, customLabel);
            breadcrumbs.forEach((crumb) => dispatch(addToTrail(crumb)));
        }
    }, [pathname, dispatch, customLabel, items.length]);
};
