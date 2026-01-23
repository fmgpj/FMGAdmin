import { StaticImageData } from "next/image";
import { RefObject } from "react";

type Notification = {
    id: number;
    avatar: StaticImageData | string | null;
    initials: string;
    name: string;
    emoji?: string;
    icon?: string;
    action: string;
    target: string;
    message?: string;
    time: string;
    isNew: boolean;
};

export interface DropdownPanelProps {
    dropdownRef?: RefObject<HTMLDivElement | null>;
    dropdownOpen?: boolean;
    setDropdownOpen: (open: boolean) => void;
    notifications?: {
        new: Notification[];
        earlier: Notification[];
    };
}
