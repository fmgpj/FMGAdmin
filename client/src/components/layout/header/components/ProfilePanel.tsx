import { faCog, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

import { useLogout } from "@src/hooks/useLogout";
import { DropdownPanelProps } from "../types";

const ProfilePanel = ({ dropdownRef, setDropdownOpen }: DropdownPanelProps) => {
    const { handleLogout } = useLogout();

    const onLogout = async () => {
        await handleLogout("/"); // Redirect to login page after logout
        setDropdownOpen(false);
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef, setDropdownOpen]);

    const dropdownItems = [
        {
            icon: faUser,
            label: "Profile",
            action: () => console.log("Profile clicked"),
        },
        {
            icon: faCog,
            label: "Settings",
            action: () => console.log("Settings clicked"),
        },
        {
            icon: faSignOutAlt,
            label: "Logout",
            action: onLogout,
            className: "text-red-500 border-t border-gray-200",
        },
    ];

    return (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            {/* User Info Header */}
            {/* {user && (
                <div className="px-4 border-b border-gray-100">
                    <ProfileAvatar size="md" showName className="mb-1" />
                    <p className="text-xs text-gray-500">{user.email}</p>
                    {user.provider && (
                        <span className="inline-flex items-center px-2 rounded text-xs bg-blue-50 text-blue-700 mt-1">
                            {user.provider === "azure-ad"
                                ? "Microsoft"
                                : user.provider}
                        </span>
                    )}
                </div>
            )} */}

            {/* Menu Items */}
            {dropdownItems.map((item, index) => (
                <button
                    type="button"
                    key={index}
                    onClick={item.action}
                    className={`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3 ${item.className || ""}`}
                >
                    <FontAwesomeIcon
                        icon={item.icon}
                        className={`w-4 h-4 ${item.className?.includes("text-orange") ? "text-orange-500" : item.className?.includes("text-red") ? "text-red-500" : "text-gray-400"}`}
                    />
                    <span
                        className={
                            item.className?.includes("text-orange")
                                ? "text-orange-500 font-medium"
                                : ""
                        }
                    >
                        {item.label}
                    </span>
                </button>
            ))}
        </div>
    );
};

export default ProfilePanel;
