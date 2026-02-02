"use client";

import { useAuth } from "@src/store/hooks";
import Image from "next/image";

interface ProfileAvatarProps {
    size?: "sm" | "md" | "lg";
    className?: string;
    showName?: boolean;
}

export default function ProfileAvatar({
    size = "md",
    className = "",
    showName = false,
}: ProfileAvatarProps) {
    const { user } = useAuth();

    const sizeClasses = {
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-16 h-16",
    };

    const sizePx = {
        sm: 32,
        md: 40,
        lg: 64,
    };

    const textSizes = {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-lg",
    };

    if (!user) return null;

    const getInitials = (fullName: string) => {
        const names = fullName.trim().split(" ");
        const firstInitial = names[0]?.charAt(0).toUpperCase() || "";
        const lastInitial =
            names[names.length - 1]?.charAt(0).toUpperCase() || "";
        return firstInitial + lastInitial;
    };

    const getDisplayName = () => {
        return user.name.trim();
    };

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div
                className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gray-200 flex items-center justify-center relative`}
            >
                {user.image ? (
                    <Image
                        src={user.image}
                        alt={`${getDisplayName()}'s profile`}
                        fill
                        className="object-cover"
                        sizes={`${sizePx[size]}px`}
                        unoptimized={
                            user.image.includes("googleusercontent.com") ||
                            user.image.includes("graph.microsoft.com")
                        }
                    />
                ) : (
                    <span
                        className={`${textSizes[size]} font-medium text-gray-600`}
                    >
                        {getInitials(user.name)}
                    </span>
                )}
            </div>
            {showName && (
                <span
                    className={`${textSizes[size]} font-medium text-gray-900`}
                >
                    {getDisplayName()}
                </span>
            )}
        </div>
    );
}
