"use client";
import { navs } from "@/src/lib/utils";
import Content from "./components/Content";

export default function Sidebar() {

    return (
        <div className="hidden lg:flex flex-col min-w-50 w-50 max-w-50 h-screen overflow-y-scroll [&::-webkit-scrollbar]:hidden pb-17 px-4">
            <div className="flex flex-col gap-y-4">
                {navs.map((nav, index) => (
                    <Content key={index} index={index} nav={nav} />
                ))}
            </div>
        </div>
    );
}
