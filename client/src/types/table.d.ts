import { CSSProperties } from "react";

export interface TableColumn<T = unknown> {
    /** The property key from your data object to display in this column */
    key: string;

    /** The text to display in the column header */
    label: string;

    /**
     * CSS styles to apply to this column's cells and header.
     *
     * This accepts any valid CSS properties:
     * - `{ width: "200px" }` = Fixed 200px width
     * - `{ width: "25%" }` = 25% of table width
     * - `{ backgroundColor: "#f0f0f0" }` = Light gray background
     * - `{ textAlign: "center" }` = Center align text
     * - `{ minWidth: "150px", maxWidth: "300px" }` = Responsive width
     * - `{ padding: "8px", fontWeight: "bold" }` = Custom padding and font
     *
     * @example style: { width: "200px" } // Fixed width
     * @example style: { width: "25%", backgroundColor: "#f8f9fa" } // Width + background
     * @example style: { minWidth: "120px", textAlign: "center" } // Min width + center align
     */
    style?: CSSProperties;

    /**
     * Text alignment for this column's content (alternative to style.textAlign)
     * @default "left"
     */
    align?: "left" | "center" | "right";

    /** Custom render function to display cell content */
    render?: (value: unknown, row: T, index: number) => React.ReactNode;

    /**
     * Include this column in search filtering when using external search
     * @default true
     */
    searchable?: boolean;
}

interface TableProps<T> {
    data: T[];
    columns: TableColumn<T>[];
    variant?:
        | "default"
        | "striped"
        | "bordered"
        | "compact"
        | "elevated"
        | "borderless";
    size?: "small" | "medium" | "large";
    pagination?: boolean;
    itemsPerPage?: number;
    itemsPerPageOptions?: number[];
    /** External search term to filter data */
    searchTerm?: string;
    /** Callback when search should reset (for external search control) */
    [key: string]: unknown;
}
