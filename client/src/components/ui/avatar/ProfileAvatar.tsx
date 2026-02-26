"use client";

import { useAppSelector } from "@/src/redux";
import Image from "next/image";
import {
    AvatarSize,
    getAvatarContainerClasses,
    getDisplayName,
    getInitials,
    getInitialsClasses,
    getNameDisplayClasses,
    getSizeConfig,
    needsUnoptimizedImage,
} from "./helpers";

interface ProfileAvatarProps {
    size?: AvatarSize;
    className?: string;
    showName?: boolean;
}

export default function ProfileAvatar({
    size = "md",
    className = "",
    showName = false,
}: ProfileAvatarProps) {
    const { user } = useAppSelector((state) => state.auth);

    if (!user) return null;

    const sizeConfig = getSizeConfig(size);
    const initials = getInitials(user.name);
    const displayName = getDisplayName(user.name);
    const containerClasses = getAvatarContainerClasses(size);
    const initialsClasses = getInitialsClasses(size);
    const nameClasses = getNameDisplayClasses(size);

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div className={containerClasses}>
                {user.image ? (
                    <Image
                        src={user.image}
                        alt={`${displayName}'s profile`}
                        fill
                        className="object-cover"
                        sizes={`${sizeConfig.pixels}px`}
                        unoptimized={needsUnoptimizedImage(user.image)}
                    />
                ) : (
                    <span className={initialsClasses}>{initials}</span>
                )}
            </div>
            {showName && <span className={nameClasses}>{displayName}</span>}
        </div>
    );
}
