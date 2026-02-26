// Avatar size configurations
export const AVATAR_SIZES = {
    sm: {
        classes: "w-8 h-8",
        pixels: 32,
        textSize: "text-xs",
    },
    md: {
        classes: "w-10 h-10",
        pixels: 40,
        textSize: "text-sm",
    },
    lg: {
        classes: "w-16 h-16",
        pixels: 64,
        textSize: "text-lg",
    },
} as const;

export type AvatarSize = keyof typeof AVATAR_SIZES;

// Get size configuration
export const getSizeConfig = (size: AvatarSize) => {
    return AVATAR_SIZES[size];
};

// Get initials from full name
export const getInitials = (fullName: string): string => {
    if (!fullName || !fullName.trim()) return "?";

    const names = fullName
        .trim()
        .split(" ")
        .filter((name) => name.length > 0);

    if (names.length === 0) return "?";
    if (names.length === 1) return names[0].charAt(0).toUpperCase();

    const firstInitial = names[0].charAt(0).toUpperCase();
    const lastInitial = names[names.length - 1].charAt(0).toUpperCase();

    return firstInitial + lastInitial;
};

// Clean and format display name
export const getDisplayName = (name: string): string => {
    return name?.trim() || "Unknown User";
};

// Get avatar background color based on name (consistent color per user)
export const getAvatarBackgroundColor = (name: string): string => {
    if (!name) return "bg-gray-200";

    const colors = [
        "bg-red-200",
        "bg-blue-200",
        "bg-green-200",
        "bg-yellow-200",
        "bg-purple-200",
        "bg-pink-200",
        "bg-indigo-200",
        "bg-cyan-200",
    ];

    // Generate consistent color based on name hash
    const hash = name.split("").reduce((acc, char) => {
        return acc + char.charCodeAt(0);
    }, 0);

    return colors[hash % colors.length];
};

// Check if image URL is from external provider that needs unoptimized loading
export const needsUnoptimizedImage = (imageUrl: string): boolean => {
    return (
        imageUrl.includes("googleusercontent.com") ||
        imageUrl.includes("graph.microsoft.com") ||
        imageUrl.includes("githubusercontent.com") ||
        imageUrl.includes("gravatar.com")
    );
};

// Get avatar container classes
export const getAvatarContainerClasses = (
    size: AvatarSize,
    className?: string
): string => {
    const sizeConfig = getSizeConfig(size);
    const baseClasses = `${sizeConfig.classes} rounded-full overflow-hidden flex items-center justify-center relative`;

    return `${baseClasses} ${className || ""}`;
};

// Get text classes for initials
export const getInitialsClasses = (size: AvatarSize): string => {
    const sizeConfig = getSizeConfig(size);
    return `${sizeConfig.textSize} font-medium text-gray-600`;
};

// Get name display classes
export const getNameDisplayClasses = (size: AvatarSize): string => {
    const sizeConfig = getSizeConfig(size);
    return `${sizeConfig.textSize} font-medium text-gray-900`;
};
