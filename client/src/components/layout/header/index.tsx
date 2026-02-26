"use client";

import {
    faBarsStaggered,
    faBell,
    faMoon,
    faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

import ProfileAvatar from "@/src/components/ui/avatar/ProfileAvatar";
import { useAppDispatch, useAppSelector } from "@/src/redux";
import { toggleTheme } from "@/src/redux/slices/theme";
import Profile from "@public/images/profile.jpg";
import NotificationPanel from "./components/NotificationPanel";
import ProfileMenu from "./components/ProfilePanel";
import SidebarPanel from "./components/SidebarPanel";

const notifications = {
    new: [
        {
            id: 1,
            avatar: Profile,
            initials: "EW",
            name: "Emma Watson",
            action: "replied to",
            target: "your comment",
            message: "Hello world 😍",
            time: "Just now",
            isNew: true,
        },
        {
            id: 2,
            avatar: null,
            initials: "AB",
            name: "Albert Brooks",
            action: "reacted to",
            target: "Mia Khalifa's status",
            emoji: "❤️",
            time: "9hr",
            isNew: true,
        },
    ],
    earlier: [
        {
            id: 3,
            avatar: null,
            icon: "🌤️",
            initials: "AB",
            name: "Weather Update",
            action: "The forecast today shows",
            target: "a low of 20°C in California.",
            message: "See today's weather.",
            time: "1d ago",
            isNew: false,
        },
    ],
};

export default function Header() {
    const { isDarkModeActivated } = useAppSelector((state) => state.theme);
    const dispatch = useAppDispatch();
    const profileRef = useRef<HTMLDivElement>(null);
    const notificationRef = useRef<HTMLDivElement>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const [profileOpen, setProfileOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    };

    return (
        <header className="bg-[#edf2f9f5] px-4 py-2 flex flex-row item-center gap-x-3">
            <div className="grow flex flex-row items-center gap-x-2 lg:gap-x-0">
                <div className="relative" ref={sidebarRef}>
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="relative p-1 lg:hidden"
                    >
                        <FontAwesomeIcon
                            icon={faBarsStaggered}
                            color="#6c6e71"
                            className="hover:text-[#47494a] ease-in-out transition-all"
                        />
                    </button>
                    {sidebarOpen && (
                        <SidebarPanel setDropdownOpen={setSidebarOpen} />
                    )}
                </div>
                <h2 className="text-2xl font-bold text-[#BE9F44]">
                    FMG <span className="text-[#29377E]">Admin</span>
                </h2>
            </div>
            <div className="flex flex-row items-center grow justify-end gap-x-2">
                <button type="button" onClick={handleToggleTheme}>
                    <FontAwesomeIcon
                        icon={isDarkModeActivated ? faMoon : faSun}
                        color="#6c6e71"
                        className="hover:text-[#47494a] ease-in-out transition-all"
                    />
                </button>
                <div className="relative" ref={notificationRef}>
                    <button
                        type="button"
                        onClick={() => setNotificationOpen(!notificationOpen)}
                        className="relative p-1"
                    >
                        <FontAwesomeIcon
                            icon={faBell}
                            color="#6c6e71"
                            className="hover:text-[#47494a] ease-in-out transition-all"
                        />
                        {/* Notification badge */}
                        {notifications.new.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {notifications.new.length}
                            </span>
                        )}
                    </button>
                    {notificationOpen && (
                        <NotificationPanel
                            dropdownRef={notificationRef}
                            notifications={notifications}
                            setDropdownOpen={setNotificationOpen}
                        />
                    )}
                </div>
                <div className="relative" ref={profileRef}>
                    <button
                        type="button"
                        onClick={() => setProfileOpen(!profileOpen)}
                        className="relative p-1"
                    >
                        <ProfileAvatar size="sm" />
                    </button>
                    {profileOpen && (
                        <ProfileMenu
                            dropdownRef={profileRef}
                            setDropdownOpen={setProfileOpen}
                        />
                    )}
                </div>
            </div>
        </header>
    );
}
