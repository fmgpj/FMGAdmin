"use client";

import { TableColumn, TableProps } from "@/src/types/table";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState } from "react";
import Button from "../button";
import Dropdown from "../dropdown";
import Field from "../field";
import {
    filterTableData,
    getCellPadding,
    getCellStyle,
    getContainerStyles,
    getHeaderStyles,
    getHeaderTextStyles,
    getPaginationInfo,
    getRowStyles,
    getTextStyles,
    getValidPage,
    getVariantStyles,
    paginateData,
    transformItemsPerPageOptions,
} from "./helpers";

const Table = <T,>({
    data,
    columns,
    variant,
    size,
    pagination = false,
    itemsPerPage = 10,
    itemsPerPageOptions = [5, 10, 25, 50],
    searchTerm = "",
    ...otherProps
}: TableProps<T>) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItemsPerPage, setCurrentItemsPerPage] =
        useState(itemsPerPage);

    // Filter data based on external search term
    const filteredData = useMemo(() => {
        return filterTableData(data, columns, searchTerm);
    }, [data, columns, searchTerm]);

    const paginatedData = useMemo(() => {
        return paginateData(
            filteredData,
            currentPage,
            currentItemsPerPage,
            pagination
        );
    }, [filteredData, currentPage, currentItemsPerPage, pagination]);

    const paginationInfo = getPaginationInfo(
        filteredData.length,
        currentPage,
        currentItemsPerPage
    );
    const { totalPages, startIndex, endIndex } = paginationInfo;

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setCurrentItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    const goToPage = (page: number) => {
        setCurrentPage(getValidPage(page, totalPages));
    };

    // Transform itemsPerPageOptions to Dropdown format
    const itemsPerPageDropdownOptions =
        transformItemsPerPageOptions(itemsPerPageOptions);

    return (
        <div className={getContainerStyles(variant)} {...otherProps}>
            {/* Top Controls */}
            {pagination && data.length > 0 && (
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
                    {/* Left: Items Per Page Selector */}
                    <div className="flex items-center space-x-2 text-sm text-gray-700">
                        <span>Show:</span>
                        <Dropdown
                            options={itemsPerPageDropdownOptions}
                            value={currentItemsPerPage}
                            onChange={(value) => {
                                const numValue = Array.isArray(value)
                                    ? value[0]
                                    : value;
                                handleItemsPerPageChange(Number(numValue));
                            }}
                            placeholder="Select items"
                        />
                    </div>

                    {/* Right: Total Info */}
                    <p className="text-sm text-gray-600">
                        Total: {data.length} items
                    </p>
                </div>
            )}

            {/* Scrollable Table Container */}
            <div className="overflow-x-auto overflow-y-auto max-h-screen">
                <table className={getVariantStyles(variant)}>
                    <thead className={`${getHeaderStyles(variant)}`}>
                        <tr>
                            {columns.map((column: TableColumn<T>) => (
                                <th
                                    key={column.key}
                                    className={`${getHeaderTextStyles(variant)} ${getCellPadding(size, variant)}`}
                                    style={getCellStyle(column)}
                                >
                                    {column.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((row: T, index: number) => (
                                <tr
                                    key={index}
                                    className={getRowStyles(index, variant)}
                                >
                                    {columns.map((column: TableColumn<T>) => (
                                        <td
                                            key={column.key}
                                            className={`${getTextStyles(size)} ${getCellPadding(size, variant)}`}
                                            style={getCellStyle(column)}
                                        >
                                            {column.render
                                                ? column.render(
                                                      (
                                                          row as Record<
                                                              string,
                                                              unknown
                                                          >
                                                      )[column.key as string] ??
                                                          "",
                                                      row,
                                                      index
                                                  )
                                                : String(
                                                      (
                                                          row as Record<
                                                              string,
                                                              unknown
                                                          >
                                                      )[column.key as string] ??
                                                          ""
                                                  )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="py-3 text-center text-gray-500 text-sm"
                                >
                                    No results found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Fixed Pagination Footer - Does NOT scroll horizontally */}
            {pagination && filteredData.length > 0 && (
                <div className="flex items-center justify-between px-4 py-2 bg-white">
                    {/* Left: Items Info */}
                    <div className="text-xs text-gray-700">
                        Showing {startIndex + 1} to {endIndex} of{" "}
                        {filteredData.length}{" "}
                        {searchTerm && filteredData.length !== data.length
                            ? `(filtered from ${data.length} total)`
                            : ""}{" "}
                        items
                    </div>

                    {/* Center: Page Navigation */}
                    <div className="flex items-center space-x-2">
                        {/* Previous Button */}
                        <Button
                            onClick={() => goToPage(currentPage - 1)}
                            className={
                                currentPage === 1
                                    ? "cursor-not-allowed"
                                    : "cursor-pointer"
                            }
                        >
                            <FontAwesomeIcon
                                icon={faChevronLeft}
                                size="sm"
                                color="#99a1af "
                            />
                        </Button>

                        {/* Current Page Input */}
                        <div className="flex items-center space-x-1">
                            <Field
                                type="number"
                                min="1"
                                disabled={currentPage === totalPages}
                                max={totalPages}
                                value={currentPage}
                                onChange={(e: { target: { value: unknown } }) =>
                                    goToPage(Number(e.target.value))
                                }
                                className={`w-10 px-2 py-1 text-sm text-center border border-gray-300 rounded focus:outline-none ${currentPage === totalPages ? "cursor-not-allowed" : ""}`}
                            />
                            <span className="text-xs text-gray-400">
                                of {totalPages}
                            </span>
                        </div>

                        {/* Next Button */}
                        <Button
                            onClick={() => goToPage(currentPage + 1)}
                            className={
                                currentPage === totalPages
                                    ? "cursor-not-allowed"
                                    : "cursor-pointer"
                            }
                        >
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                size="sm"
                                color="#99a1af "
                            />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Table;
