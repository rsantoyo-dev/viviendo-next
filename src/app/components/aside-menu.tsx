import React from "react";
import { BuildingOfficeIcon, UserIcon } from "@heroicons/react/24/outline";
import AsideMenuItem from "./aside-menu-item";

const AsideMenu: React.FC = () => {
  return (
    <aside className="w-full sm:w-16 lg:w-32 bg-gray-200 dark:bg-gray-900 h-16 sm:h-screen p-4 flex flex-row sm:flex-col justify-between fixed bottom-0 sm:static">
      <div className="flex flex-row sm:flex-col space-x-4 sm:space-x-0 sm:space-y-4 w-full justify-around sm:justify-start">
        <AsideMenuItem
          href="/dashboard"
          icon={BuildingOfficeIcon}
          label="Properties"
        />
        <AsideMenuItem
          href="/dashboard/agents"
          icon={UserIcon}
          label="Agents"
        />
        {/* Add other buttons here */}
      </div>
    </aside>
  );
};

export default AsideMenu;
