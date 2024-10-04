import Link from "next/link";

interface AsideMenuItemProps {
    href: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    label: string;
  }
  
  const AsideMenuItem: React.FC<AsideMenuItemProps> = ({ href, icon: Icon, label }) => {
    return (
      <Link
        href={href}
        className="flex flex-col sm:flex-row lg:flex-col items-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-0 lg:space-y-2 p-2 hover:bg-gray-300 dark:hover:bg-gray-800 rounded-md transition"
      >
        <Icon className="h-6 w-6 lg:h-8 lg:w-8 text-gray-700 dark:text-gray-300" />
        <span className="hidden lg:inline-block text-sm text-gray-800 dark:text-gray-200">
          {label}
        </span>
      </Link>
    );
  };
  
  export default AsideMenuItem;