import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Profile from "@public/images/profile.jpg";
import Image from "next/image";
import { useEffect } from "react";
import { DropdownPanelProps } from "../types";

const NotificationPanel = ({
    dropdownRef,
    notifications,
    setDropdownOpen,
}: DropdownPanelProps) => {
    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
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

    const markAllAsRead = () => {
        console.log("Mark all as read clicked");
        setDropdownOpen(false);
    };

    return (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                    Mark all as read
                </button>
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto max-h-80">
                {/* New Notifications */}
                {notifications && notifications.new.length > 0 && (
                    <div>
                        <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                            NEW
                        </div>
                        {notifications.new.map((notification) => (
                            <div
                                key={notification.id}
                                className="px-4 py-3 hover:bg-gray-50 border-l-4 border-blue-500"
                            >
                                <div className="flex items-start gap-3">
                                    {/* Avatar */}
                                    <div className="shrink-0">
                                        {notification.avatar ? (
                                            <Image
                                                className="rounded-full"
                                                src={Profile}
                                                alt={notification.name}
                                                width={32}
                                                height={32}
                                            />
                                        ) : (
                                            <div className="w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                                                {notification.initials}
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm text-gray-900">
                                            <span className="font-medium">
                                                {notification.name}
                                            </span>
                                            <span className="text-gray-600">
                                                {" "}
                                                {notification.action}{" "}
                                            </span>
                                            <span className="text-blue-600">
                                                {notification.target}
                                            </span>
                                            {notification.emoji && (
                                                <span className="ml-1">
                                                    {notification.emoji}
                                                </span>
                                            )}
                                        </div>
                                        {notification.message && (
                                            <div className="mt-1 text-sm text-gray-600">
                                                : &quot;
                                                {notification.message}
                                                &ldquo;
                                            </div>
                                        )}
                                        <div className="mt-1 text-xs text-gray-500">
                                            {notification.time}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Earlier Notifications */}
                {notifications && notifications.earlier.length > 0 && (
                    <div>
                        <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                            EARLIER
                        </div>
                        {notifications.earlier.map((notification) => (
                            <div
                                key={notification.id}
                                className="px-4 py-3 hover:bg-gray-50"
                            >
                                <div className="flex items-start gap-3">
                                    {/* Icon/Avatar */}
                                    <div className="shrink-0">
                                        {notification.icon ? (
                                            <div className="w-8 h-8 flex items-center justify-center text-lg">
                                                {notification.icon}
                                            </div>
                                        ) : notification.avatar ? (
                                            <Image
                                                className="rounded-full"
                                                src={notification.avatar}
                                                alt={notification.name}
                                                width={32}
                                                height={32}
                                            />
                                        ) : (
                                            <div className="w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                                                {notification.initials}
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm text-gray-900">
                                            <span className="font-medium">
                                                {notification.name}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {notification.action}{" "}
                                            {notification.target}
                                        </div>
                                        {notification.message && (
                                            <div className="mt-1 text-sm text-blue-600">
                                                {notification.message}
                                            </div>
                                        )}
                                        <div className="mt-1 text-xs text-gray-500">
                                            {notification.time}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {notifications && notifications.new.length === 0 &&
                    notifications.earlier.length === 0 && (
                        <div className="px-4 py-8 text-center text-gray-500">
                            <FontAwesomeIcon
                                icon={faBell}
                                className="w-8 h-8 mx-auto mb-2 text-gray-400"
                            />
                            <p>No notifications yet</p>
                        </div>
                    )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-4 py-3">
                <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                    View all
                </button>
            </div>
        </div>
    );
};

export default NotificationPanel;
