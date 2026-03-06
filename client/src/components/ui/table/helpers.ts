import { TableColumn } from "@/src/types/table";

// Table variant configurations
export const TABLE_VARIANTS = {
    default: {
        container: "rounded-lg border border-gray-200 bg-white",
        table: "w-full border-collapse min-w-max relative overflow-hidden",
        header: "bg-gray-50 border-b border-gray-200",
        headerText: "text-left font-semibold text-gray-700",
        row: "border-b border-gray-100 transition-colors duration-150 hover:bg-gray-50",
    },
    striped: {
        container: "rounded-lg border border-gray-200 bg-white",
        table: "w-full border-collapse min-w-max relative overflow-hidden",
        header: "bg-blue-50 border-b border-blue-100",
        headerText: "text-left font-semibold text-gray-700",
        row: "border-b border-gray-100 transition-colors duration-150",
    },
    bordered: {
        container: "rounded-lg border border-gray-200 bg-white",
        table: "w-full border-collapse min-w-max border border-gray-300 relative overflow-hidden",
        header: "bg-gray-100 border-b-2 border-gray-200",
        headerText: "text-left font-semibold text-gray-700 font-bold",
        row: "border-b border-gray-100 transition-colors duration-150 border-gray-200 hover:bg-gray-50",
    },
    compact: {
        container: "rounded-lg border border-gray-200 bg-gray-50",
        table: "w-full border-collapse min-w-max text-xs relative overflow-hidden",
        header: "bg-gray-200 border-b border-gray-300",
        headerText:
            "text-left font-semibold text-gray-600 uppercase text-xs tracking-wider",
        row: "border-b border-gray-100 transition-colors duration-150 hover:bg-gray-100",
    },
    elevated: {
        container: "rounded-xl shadow-xl border border-gray-100 bg-white",
        table: "w-full border-collapse min-w-max relative overflow-hidden",
        header: "bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100",
        headerText: "text-left font-semibold text-gray-800 tracking-tight",
        row: "border-b border-gray-100 transition-colors duration-150 hover:bg-blue-25 hover:shadow-sm",
    },
} as const;

export type TableVariant = keyof typeof TABLE_VARIANTS;

// Table size configurations
export const TABLE_SIZES = {
    small: {
        cell: "px-3 py-1.5",
        cellCompact: "px-2 py-0.5",
        text: "text-xs",
    },
    medium: {
        cell: "px-4 py-3",
        cellCompact: "px-3 py-1",
        text: "text-sm",
    },
    large: {
        cell: "px-6 py-4",
        cellCompact: "px-4 py-2",
        text: "text-base",
    },
} as const;

export type TableSize = keyof typeof TABLE_SIZES;

// Get variant styles
export const getVariantStyles = (variant: TableVariant = "default"): string => {
    return TABLE_VARIANTS[variant].table;
};

// Get container styles
export const getContainerStyles = (
    variant: TableVariant = "default"
): string => {
    const baseContainer = "flex flex-col overflow-hidden";
    return `${baseContainer} ${TABLE_VARIANTS[variant].container}`;
};

// Get header styles
export const getHeaderStyles = (variant: TableVariant = "default"): string => {
    return TABLE_VARIANTS[variant].header;
};

// Get row styles with striping logic
export const getRowStyles = (
    index: number,
    variant: TableVariant = "default"
): string => {
    const baseRow = TABLE_VARIANTS[variant].row;

    if (variant === "striped") {
        const stripingClass =
            index % 2 === 0 ? "bg-white" : "bg-blue-25 bg-opacity-30";
        return `${baseRow} ${stripingClass} hover:bg-blue-50`;
    }

    return baseRow;
};

// Get cell padding based on size and variant
export const getCellPadding = (
    size: TableSize = "medium",
    variant: TableVariant = "default"
): string => {
    const sizeConfig = TABLE_SIZES[size];
    return variant === "compact" ? sizeConfig.cellCompact : sizeConfig.cell;
};

// Get text styles
export const getTextStyles = (size: TableSize = "medium"): string => {
    const baseText = "text-gray-900";
    return `${baseText} ${TABLE_SIZES[size].text}`;
};

// Get header text styles
export const getHeaderTextStyles = (
    variant: TableVariant = "default"
): string => {
    return TABLE_VARIANTS[variant].headerText;
};

// Helper function to merge column styles with alignment
export const getCellStyle = <T>(column: TableColumn<T>) => {
    const baseStyle = column.style || {};

    // If align is specified and textAlign is not in style, add it
    if (column.align && !baseStyle.textAlign) {
        return {
            ...baseStyle,
            textAlign: column.align,
        };
    }

    return baseStyle;
};

// Filter data based on search term
export const filterTableData = <T>(
    data: T[],
    columns: TableColumn<T>[],
    searchTerm: string
): T[] => {
    if (!searchTerm.trim()) return data;

    return data.filter((row) => {
        return columns.some((column) => {
            // Skip non-searchable columns if specified
            if (column.searchable === false) return false;

            const value = row[column.key as keyof T];
            return String(value || "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        });
    });
};

// Paginate data
export const paginateData = <T>(
    data: T[],
    currentPage: number,
    itemsPerPage: number,
    pagination: boolean = true
): T[] => {
    if (!pagination) return data;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return data.slice(startIndex, endIndex);
};

// Calculate pagination info
export const getPaginationInfo = (
    totalItems: number,
    currentPage: number,
    itemsPerPage: number
) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    return {
        totalPages,
        startIndex,
        endIndex,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
    };
};

// Safe page navigation
export const getValidPage = (
    targetPage: number,
    totalPages: number
): number => {
    return Math.max(1, Math.min(targetPage, totalPages));
};

// Transform items per page options for dropdown
export const transformItemsPerPageOptions = (options: number[]) => {
    return options.map((option) => ({
        value: option,
        label: `${option} per page`,
    }));
};

// Get pagination button classes
export const getPaginationButtonClasses = (
    isDisabled: boolean = false
): string => {
    const baseClasses =
        "flex items-center justify-center w-8 h-8 text-xs border border-gray-300 transition-colors duration-200";

    if (isDisabled) {
        return `${baseClasses} bg-gray-100 text-gray-400 cursor-not-allowed`;
    }

    return `${baseClasses} bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800`;
};

// Generate page range for pagination
export const generatePageRange = (
    currentPage: number,
    totalPages: number,
    maxVisible: number = 5
): number[] => {
    if (totalPages <= maxVisible) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfRange = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - halfRange);
    const end = Math.min(totalPages, start + maxVisible - 1);

    // Adjust start if we're near the end
    if (end === totalPages) {
        start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};
