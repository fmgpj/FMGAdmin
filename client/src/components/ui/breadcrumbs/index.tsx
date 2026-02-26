"use client";

import { useAppDispatch, useAppSelector } from "@/src/redux";
import { navigateToItem } from "@/src/redux/slices/breadcrumbs";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {
    getActiveItemClasses,
    getBreadcrumbContainerClasses,
    getLinkClasses,
    getNavigationClasses,
    getSeparatorClasses,
    isLastItem,
    shouldHideBreadcrumbs,
} from "./helpers";

const Breadcrumbs = () => {
    const { items } = useAppSelector((state) => state.breadcrumb);
    const dispatch = useAppDispatch();

    if (shouldHideBreadcrumbs(items)) return null;

    const handleBreadcrumbClick = (path: string) => {
        dispatch(navigateToItem(path));
    };

    const containerClasses = getBreadcrumbContainerClasses();
    const navigationClasses = getNavigationClasses();
    const separatorClasses = getSeparatorClasses();
    const activeItemClasses = getActiveItemClasses();
    const linkClasses = getLinkClasses();

    return (
        <div className={containerClasses}>
            <nav className={navigationClasses}>
                {items.map((item, index) => (
                    <div key={item.path} className="flex items-center gap-x-2">
                        {index > 0 && (
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                className={separatorClasses}
                            />
                        )}
                        {isLastItem(index, items.length) ? (
                            <span className={activeItemClasses}>
                                {item.label}
                            </span>
                        ) : (
                            <Link
                                href={item.path}
                                onClick={() => handleBreadcrumbClick(item.path)}
                                className={linkClasses}
                            >
                                {item.label}
                            </Link>
                        )}
                    </div>
                ))}
            </nav>
        </div>
    );
};

export default Breadcrumbs;
