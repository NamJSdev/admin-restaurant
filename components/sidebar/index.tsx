"use client";

import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import SidebarToggle from "./sidebar-toggle";
import { useSidebarStore } from "@/stores/sidebar-store";
import Logo from "../logo";
import Navbar from "./navbar";
import ThemeToggle from "./theme-toggle";
import AccoutAction from "./accout-action";

export interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { isMinimal } = useSidebarStore();

  return (
    <div className={cn("text-white", className)}>
      <div className="h-20 pl-7 pr-6">
        <div className="flex items-center justify-between w-full">
          {!isMinimal && <Logo />}
          <SidebarToggle />
        </div>
      </div>
      <div className="flex flex-col menu_bar">
        <div className="  grow overflow-y-auto scroll-smooth scrollbar-none">
          <Navbar />
        </div>
        <div
          className={cn(
            "bottom-8 left-4 right-4",
            "lg:left-7 lg:right-auto pl-5 pr-5",
            isMinimal && "lg:left-3"
          )}
        >
          <div className="mb-4 p-4 rounded-lg bg-gray-900">
            <div className="mb-4 flex items-center">
              <AccoutAction />
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
