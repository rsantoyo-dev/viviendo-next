import React from 'react';
import NavDash from '../components/nav-dash';
import AsideMenu from '../components/aside-menu';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <NavDash />
      <div className="flex">
        {/* Sidebar */}
        <AsideMenu />

        {/* Main content area with a light soft gradient */}
        <main className="flex-1 p-2 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black">
          {children}
        </main>
      </div>
    </section>
  );
}
