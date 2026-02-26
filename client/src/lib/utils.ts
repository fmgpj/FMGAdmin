// Utility functions for the application

/**
 * Format a date to a readable string
 * @param date - Date to format
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted date string
 */
export const formatDate = (date: Date, locale: string = "en-US"): string => {
    return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(date);
};

/**
 * Generate a unique ID
 * @returns Random unique ID string
 */
export const generateId = (): string => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

/**
 * Debounce a function call
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number
): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

/**
 * Capitalize the first letter of a string
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Check if a value is empty (null, undefined, empty string, empty array, empty object)
 * @param value - Value to check
 * @returns True if empty, false otherwise
 */
export const isEmpty = (value: unknown): boolean => {
    if (value === null || value === undefined) return true;
    if (typeof value === "string") return value.trim().length === 0;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === "object") return Object.keys(value).length === 0;
    return false;
};

/**
 * Truncate a string to a specified length
 * @param str - String to truncate
 * @param length - Maximum length
 * @param suffix - Suffix to add if truncated (default: '...')
 * @returns Truncated string
 */
export const truncate = (
    str: string,
    length: number,
    suffix: string = "..."
): string => {
    return str.length > length ? str.substring(0, length) + suffix : str;
};

/**
 * Convert a string to slug format (lowercase, hyphens instead of spaces)
 * @param str - String to convert
 * @returns Slug string
 */
export const slugify = (str: string): string => {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
};
