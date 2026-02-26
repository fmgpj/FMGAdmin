// Card variant configurations
export const CARD_VARIANTS = {
    default: {
        classes: "bg-white border border-gray-200 shadow-sm",
        description: "Standard card with subtle border and shadow",
    },
    elevated: {
        classes: "bg-white shadow-lg border border-gray-100",
        description: "Card with prominent shadow for emphasis",
    },
    outlined: {
        classes: "bg-white border-2 border-gray-300 shadow-none",
        description: "Card with prominent border and no shadow",
    },
    flat: {
        classes: "bg-gray-50 border-0 shadow-none",
        description: "Flat card with background color and no shadow",
    },
    gradient: {
        classes:
            "bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 shadow-md",
        description: "Card with gradient background",
    },
} as const;

export type CardVariant = keyof typeof CARD_VARIANTS;

// Card size configurations
export const CARD_SIZES = {
    sm: {
        classes: "p-3",
        description: "Small padding",
    },
    md: {
        classes: "p-4",
        description: "Medium padding",
    },
    lg: {
        classes: "p-6",
        description: "Large padding",
    },
    xl: {
        classes: "p-8",
        description: "Extra large padding",
    },
} as const;

export type CardSize = keyof typeof CARD_SIZES;

// Get card classes based on variant and size
export const getCardClasses = (
    variant: CardVariant = "default",
    size?: CardSize,
    rounded: boolean = true,
    hoverable: boolean = false,
    className?: string
): string => {
    const variantClasses = CARD_VARIANTS[variant].classes;
    const sizeClasses = size ? CARD_SIZES[size].classes : "";
    const roundedClasses = rounded ? "rounded-lg" : "";
    const hoverClasses = hoverable
        ? "hover:shadow-lg transition-shadow duration-200 cursor-pointer"
        : "";
    const overflowClasses = "overflow-hidden";

    return `flex flex-col w-full ${variantClasses} ${sizeClasses} ${roundedClasses} ${hoverClasses} ${overflowClasses} ${className || ""}`;
};

// Get card header classes
export const getCardHeaderClasses = (
    variant: CardVariant = "default",
    size: CardSize = "md"
): string => {
    const baseClasses = "border-b border-gray-200";
    const sizeClasses = CARD_SIZES[size].classes;

    switch (variant) {
        case "gradient":
            return `${baseClasses} ${sizeClasses} bg-white bg-opacity-50`;
        case "outlined":
            return `${baseClasses} ${sizeClasses} bg-gray-50`;
        default:
            return `${baseClasses} ${sizeClasses}`;
    }
};

// Get card body classes
export const getCardBodyClasses = (size: CardSize = "md"): string => {
    return `flex-1 ${CARD_SIZES[size].classes}`;
};

// Get card footer classes
export const getCardFooterClasses = (
    size: CardSize = "md",
    bordered: boolean = true
): string => {
    const sizeClasses = CARD_SIZES[size].classes;
    const borderClasses = bordered ? "border-t border-gray-200" : "";

    return `${sizeClasses} ${borderClasses} bg-gray-50`;
};

// Check if card should have hover effects
export const shouldHaveHoverEffect = (
    interactive: boolean = false
): boolean => {
    return interactive;
};

// Get animation classes for card interactions
export const getCardAnimationClasses = (): string => {
    return "transition-all duration-200 ease-in-out";
};

// Generate card loading skeleton classes
export const getCardSkeletonClasses = (): string => {
    return "animate-pulse bg-gray-200 rounded-lg";
};
