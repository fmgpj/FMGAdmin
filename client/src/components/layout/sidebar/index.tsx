"use client";
import navs from "@data/navigation";
import Content from "./components/Content";

export default function Sidebar() {

    return (
        <div className="hidden xl:flex flex-col xl:min-w-2/12 xl:w-2/12 xl:max-w-2/12 h-screen overflow-y-scroll [&::-webkit-scrollbar]:hidden pb-17 px-4">
            <div className="flex flex-col gap-y-4">
                {navs.map((nav, index) => (
                    <Content key={index} index={index} nav={nav} />
                ))}
            </div>
        </div>
    );
}
