// Breadcrumb item type
export interface BreadcrumbItem {
    label: string;
    path: string;
}

// Get breadcrumb container classes
export const getBreadcrumbContainerClasses = (): string => {
    return "px-4 bg-[#edf2f9] w-full py-2";
};

// Get navigation classes
export const getNavigationClasses = (): string => {
    return "flex items-center gap-x-2 text-xs";
};

// Get separator classes
export const getSeparatorClasses = (): string => {
    return "text-gray-400 w-3 h-3";
};

// Get active item classes (last item)
export const getActiveItemClasses = (): string => {
    return "text-gray-400 font-semibold";
};

// Get link classes
export const getLinkClasses = (): string => {
    return "text-gray-400 hover:text-gray-600 transition-colors";
};

// Check if item is the last/active item
export const isLastItem = (index: number, totalItems: number): boolean => {
    return index === totalItems - 1;
};

// Truncate breadcrumb label if too long
export const truncateLabel = (
    label: string,
    maxLength: number = 20
): string => {
    if (label.length <= maxLength) return label;
    return label.substring(0, maxLength - 3) + "...";
};

// Generate breadcrumb path from route segments
export const generateBreadcrumbsFromPath = (
    pathname: string,
    routeMap?: Record<string, string>
): BreadcrumbItem[] => {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    // Always add home
    breadcrumbs.push({ label: "Home", path: "/" });

    // Build breadcrumbs from path segments
    let currentPath = "";
    segments.forEach((segment) => {
        currentPath += `/${segment}`;

        // Use route map for custom labels, otherwise format segment
        const label = routeMap?.[currentPath] || formatSegmentLabel(segment);

        breadcrumbs.push({
            label,
            path: currentPath,
        });
    });

    return breadcrumbs;
};

// Format URL segment into readable label
export const formatSegmentLabel = (segment: string): string => {
    // Handle dynamic routes [id]
    if (segment.startsWith("[") && segment.endsWith("]")) {
        return "Details";
    }

    // Convert kebab-case and snake_case to Title Case
    return segment
        .replace(/[-_]/g, " ")
        .split(" ")
        .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
};

// Limit breadcrumbs to prevent overflow
export const limitBreadcrumbs = (
    items: BreadcrumbItem[],
    maxItems: number = 4
): BreadcrumbItem[] => {
    if (items.length <= maxItems) return items;

    // Keep first item (Home), add ellipsis, keep last items
    const first = items[0];
    const last = items.slice(-(maxItems - 2));

    return [first, { label: "...", path: "#" }, ...last];
};

// Check if breadcrumb navigation should be hidden
export const shouldHideBreadcrumbs = (items: BreadcrumbItem[]): boolean => {
    return items.length === 0; // Hide only when no items (original behavior)
};
