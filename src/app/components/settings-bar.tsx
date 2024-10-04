"use client";
import React, { useState, useEffect } from "react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline"; // Engine icon from Heroicons

interface SettingsBarProps {
  groupedColumns: { [key: string]: string[] }; // Grouped column names (e.g., general, location, characteristics)
  visibleColumns: string[]; // Currently visible columns
  onVisibilityChange: (updatedVisibleColumns: string[]) => void; // Event to handle column visibility updates
  onToggle: (isExpanded: boolean) => void; // Event to handle when the bar is opened/closed
  isExpanded?: boolean; // Control bar expansion from the parent
}

const SettingsBar: React.FC<SettingsBarProps> = ({
  groupedColumns,
  visibleColumns,
  onVisibilityChange,
  onToggle,
  isExpanded: parentExpanded = false, // Default value for parent control
}) => {
  const [isExpanded, setIsExpanded] = useState(parentExpanded); // Local state to track bar expansion

  // Sync local state with the parent control
  useEffect(() => {
    setIsExpanded(parentExpanded);
  }, [parentExpanded]);

  // Toggle the entire settings bar (when clicking anywhere on the bar, excluding checkboxes)
  const toggleExpand = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).tagName === "INPUT") return; // Ignore clicks on checkboxes

    setIsExpanded((prev) => {
      const nextExpanded = !prev;
      onToggle(nextExpanded); // Emit event to parent when expanded/collapsed
      return nextExpanded;
    });
  };

  // Toggle visibility for a specific column
  const handleColumnToggle = (header: string) => {
    const updatedVisibleColumns = visibleColumns.includes(header)
      ? visibleColumns.filter((col) => col !== header) // Deselect column
      : [...visibleColumns, header]; // Select column

    onVisibilityChange(updatedVisibleColumns); // Emit updated visible columns
  };

  return (
    <div
      className={`w-full cursor-pointer p-2 mb-1 rounded-lg 
      ${isExpanded ? "bg-opacity-50 bg-gray-500 dark:bg-opacity-50 dark:bg-gray-700" : "bg-gray-200 dark:bg-gray-800"}`}
      onClick={toggleExpand}
    >
      {/* Bar that expands/collapses the settings */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-1">
          <Cog6ToothIcon className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          <span className="font-medium text-gray-600 dark:text-gray-300 text-sm">Columns Settings</span>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {isExpanded ? "Click to collapse" : "Click to expand"}
        </span>
      </div>

      {isExpanded && (
        <div className="flex flex-wrap mt-2">
          {Object.entries(groupedColumns).map(([category, columns]) => (
            <div key={category} className="flex flex-col flex-grow mb-4">
              <span className="font-bold text-xs text-gray-700 dark:text-gray-300 mb-1">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
              <div className="flex flex-col space-y-1">
                {columns.map((header) => (
                  <label
                    key={header}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={visibleColumns.includes(header)}
                      onChange={() => handleColumnToggle(header)} // Handle individual column toggle
                    />
                    <span className="text-xs text-gray-700 dark:text-gray-300">
                      {header.charAt(0).toUpperCase() + header.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SettingsBar;
