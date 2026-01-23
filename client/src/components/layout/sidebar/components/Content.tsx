import { usePathname } from "next/navigation";
import { NavProps } from "../types";
import Link from "next/link";

type ContentProps = {
    nav: NavProps;
    index: number;
    setDropdownOpen?: (open: boolean) => void;
}

const Content = ({ nav, index, setDropdownOpen }: ContentProps) => {
    const pathname = usePathname();;

    return (
        <div className="flex flex-col gap-y-2" key={index}>
            {nav.label !== "" && (
                <div className="flex flex-row items-center gap-x-4">
                    <p className="text-xs font-semibold text-[#9da9bb]">
                        {nav.label}
                    </p>
                    <div className="bg-[#dae4f5] h-px rounded-full grow" />
                </div>
            )}
            <div className="flex flex-col">
                {nav.links.map((links, linkIndex) => (
                    <div
                        className="flex flex-col gap-y-2 w-full py-1.5"
                        key={linkIndex}
                    >
                        {links.subNav.length > 0 ? (
                            <p
                                className={`font-semibold flex flex-row items-center cursor-pointer  justify-between text-sm ${
                                    links.subNav.some(
                                        (subNav) => pathname === subNav.href
                                    )
                                        ? "text-[#25303d]"
                                        : "text-[#5e6382]"
                                } hover:text-[#25303d]`}
                            >
                                {links.label}
                            </p>
                        ) : (
                            <Link
                                className={`font-semibold flex flex-row items-center justify-between text-sm ${pathname === links.href ? "text-[#25303d]" : "text-[#5e6382]"} hover:text-[#25303d]`}
                                href={links.href}
                                onClick={() => setDropdownOpen && setDropdownOpen(false)}
                            >
                                {links.label}
                            </Link>
                        )}
                        {links.subNav.length > 0 && (
                            <div className="flex flex-col pl-4">
                                {links.subNav.map((subNav, subnavIndex) => (
                                    <Link
                                        className={`py-1.5 font-semibold flex flex-row items-center justify-between text-sm ${pathname === subNav.href ? "text-[#25303d]" : "text-[#80849b]"} hover:text-[#25303d]`}
                                        href={subNav.href}
                                        onClick={() => setDropdownOpen && setDropdownOpen(false)}
                                        key={subnavIndex}
                                    >
                                        {subNav.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Content;
