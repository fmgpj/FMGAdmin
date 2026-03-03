import navs from "@data/navigation";
import Content from "../../sidebar/components/Content";
import { DropdownPanelProps } from "../types";

const SidebarPanel = ({ setDropdownOpen }: DropdownPanelProps) => {
    return (
        <div className="flex xl:hidden flex-col px-4 bg-[#edf2f9f5] w-screen h-screen -left-4 absolute top-11 overflow-y-scroll pb-15 [&::-webkit-scrollbar]:hidden z-50">
            {navs.map((nav, index) => (
                <Content
                    key={index}
                    index={index}
                    nav={nav}
                    setDropdownOpen={setDropdownOpen}
                />
            ))}
        </div>
    );
};

export default SidebarPanel;
