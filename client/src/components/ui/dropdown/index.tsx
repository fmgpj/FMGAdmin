import { DropdownOption, DropdownProps } from "@/src/types/dropdown";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useRef, useState } from "react";
import Field from "../field";
import {
    filterOptions,
    getDisplayText,
    getOptionBackgroundColor,
    getSelectedOption,
} from "./helpers";

const Dropdown = ({
    options,
    value,
    onChange,
    placeholder = "Select option...",
    disabled,
    searchable,
    searchPlaceholder = "Search...",
}: DropdownProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [searchTerm, setSearchTerm] = useState("");

    const selectedOption = getSelectedOption(options, value);

    const filteredOptions = useMemo(
        () => filterOptions(options, searchTerm),
        [options, searchTerm]
    );

    const handleOptionSelect = (option: DropdownOption) => {
        onChange(option.value);
        setIsOpen(false);
        setSearchTerm("");
        setHighlightedIndex(-1);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (!isOpen || filteredOptions.length === 0) return;

        switch (event.key) {
            case "ArrowDown":
                event.preventDefault();
                setHighlightedIndex((prev) =>
                    prev < filteredOptions.length - 1 ? prev + 1 : prev
                );
                break;
            case "ArrowUp":
                event.preventDefault();
                setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
                break;
            case "Enter":
                event.preventDefault();
                if (
                    highlightedIndex >= 0 &&
                    highlightedIndex < filteredOptions.length
                ) {
                    const selectedOption = filteredOptions[highlightedIndex];
                    if (!selectedOption.disabled) {
                        handleOptionSelect(selectedOption);
                    }
                }
                break;
            case "Escape":
            case "Tab":
                setIsOpen(false);
                setHighlightedIndex(-1);
                setSearchTerm("");
                break;
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && searchable && searchInputRef.current) {
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 50);
        }
    }, [isOpen, searchable]);

    // Reset highlighted index when dropdown opens
    useEffect(() => {
        if (isOpen) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setHighlightedIndex(-1);
        }
    }, [isOpen]);

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                className="focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                style={{
                    padding: "8px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                    cursor: disabled ? "not-allowed" : "pointer",
                    backgroundColor: "#ffffff",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "relative",
                    gap: "8px",
                }}
            >
                <p>
                    {getDisplayText(
                        selectedOption,
                        placeholder || "Select an option"
                    )}
                </p>
                {isOpen ? (
                    <FontAwesomeIcon icon={faChevronUp} color="#6b7280" />
                ) : (
                    <FontAwesomeIcon icon={faChevronDown} color="#6b7280" />
                )}
            </div>
            {isOpen && (
                <div
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #d1d5db",
                        borderRadius: "4px",
                        marginTop: "2px",
                        zIndex: 1000,
                    }}
                >
                    {searchable && (
                        <div className="p-2">
                            <Field
                                className="focus:outline-none"
                                ref={searchInputRef}
                                type="text"
                                value={searchTerm}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setSearchTerm(e.target.value);
                                    setHighlightedIndex(-1);
                                }}
                                onKeyDown={handleKeyDown}
                                placeholder={searchPlaceholder}
                                variant="outlined"
                                style={{ width: "100%" }}
                                onClick={(e: React.MouseEvent) =>
                                    e.stopPropagation()
                                }
                            />
                        </div>
                    )}
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option, index) => (
                            <div
                                style={{
                                    padding: "8px 12px",
                                    cursor: option.disabled
                                        ? "not-allowed"
                                        : "pointer",
                                    backgroundColor: getOptionBackgroundColor(
                                        option,
                                        index,
                                        highlightedIndex,
                                        value
                                    ),
                                    opacity: option.disabled ? 0.6 : 1,
                                }}
                                key={option.value}
                                onClick={() => {
                                    if (!option.disabled) {
                                        handleOptionSelect(option);
                                    }
                                }}
                            >
                                {option.label}
                            </div>
                        ))
                    ) : (
                        <div className="py-2 px-3 text-[#6b7280] italic text-center">
                            No options found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
