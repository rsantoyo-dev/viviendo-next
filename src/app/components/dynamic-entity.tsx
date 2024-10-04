// dynamic-entity.tsx
"use client";
import React, { Fragment, useEffect, useState } from "react";
import SettingsBar from "./settings-bar";
import { flattenAndRenameObject } from "../utilities/helpers";
import DynamicComponent from "./dynamic-component";
import { Entity } from "../middleware/model"; // Import Entity type

interface DynamicEntityProps {
  data: Entity[]; // The dataset can be an array of Property or Agent
  defaultVisibleColumns?: string[]; // Default visible columns
  groupedColumns?: { [key: string]: string[] }; // Column groups for filtering
}

const DynamicEntity: React.FC<DynamicEntityProps> = ({
  data,
  defaultVisibleColumns = [],
  groupedColumns = {},
}) => {
  // Log the received data to verify __typename presence
  useEffect(() => {
    console.log("DynamicEntity received data:", data);
    data.forEach((item, index) => {
      console.log(`Item ${index} __typename:`, item.__typename);
    });
  }, [data]);

  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(defaultVisibleColumns);
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

  if (data.length === 0) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 text-gray-500 p-4 rounded-lg shadow-sm">
        No data available
      </div>
    );
  }

  // Flatten and rename object fields (generic for any data type)
  const flattenedData = data.map((item, index) => {
    const flattened = flattenAndRenameObject(item);
    console.log(`Flattened Data Item ${index}:`, flattened);
    return flattened;
  });

  const allHeaders = Object.keys(flattenedData[0]);
  console.log("All Headers:", allHeaders);

  // Handle visibility changes from the SettingsBar component
  const handleVisibilityChange = (updatedVisibleColumns: string[]) => {
    console.log("Visibility Changed:", updatedVisibleColumns);
    setVisibleColumns(updatedVisibleColumns);
  };

  // Handle toggle event from the SettingsBar component
  const handleSettingsToggle = (isExpanded: boolean) => {
    console.log("Settings Toggle:", isExpanded);
    setIsSettingsExpanded(isExpanded);
  };

  // Function to handle sorting when a header is clicked
  const handleSort = (key: string) => {
    console.log(`Sorting by: ${key}`);
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Sorting function for the data
  const sortedData = React.useMemo(() => {
    if (sortConfig !== null) {
      console.log("Sorting Data:", sortConfig);
      const sorted = [...flattenedData].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === null || bValue === null) return 0;

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortConfig.direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        } else if (typeof aValue === "number" && typeof bValue === "number") {
          return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
        }

        return 0;
      });
      console.log("Sorted Data:", sorted);
      return sorted;
    }
    console.log("Unsorted Data:", flattenedData);
    return flattenedData;
  }, [flattenedData, sortConfig]);

  // Render the headers with sorting capability
  const renderHeaders = allHeaders
    .filter((header) => visibleColumns.includes(header))
    .map((header) => (
      <th
        key={header}
        onClick={() => handleSort(header)}
        className="cursor-pointer border-b border-gray-300 dark:border-gray-700 border-r border-dashed border-gray-300 dark:border-gray-700 px-2 py-2 text-left font-bold text-gray-800 dark:text-gray-300 text-sm xl:text-base"
      >
        <span>{header.charAt(0).toUpperCase() + header.slice(1)}</span>
        {sortConfig?.key === header ? (
          sortConfig.direction === "asc" ? " 🔼" : " 🔽"
        ) : (
          ""
        )}
      </th>
    ));

  const renderRows = sortedData.length
    ? sortedData.map((item, rowIndex: number) => {
        // Retrieve the original item (before flattening)
        const originalItem = data[rowIndex];
        console.log(`Original Item ${rowIndex}:`, originalItem);

        // Log the original item's __typename
        useEffect(() => {
          console.log(`Row ${rowIndex} originalItem __typename:`, originalItem.__typename);
        }, [originalItem.__typename]);

        const renderDataItems = allHeaders
          .filter((key) => visibleColumns.includes(key))
          .map((key, index) => (
            <td
              key={index}
              className="border-b border-gray-300 dark:border-gray-700 border-r border-dashed border-gray-300 dark:border-gray-700 px-2 py-2 text-sm text-gray-800 dark:text-gray-300 md:text-base"
            >
              {item[key] !== undefined ? String(item[key]) : "N/A"}
            </td>
          ));

        const toggleRow = () => {
          setIsSettingsExpanded(false);
          if (expandedRows.includes(rowIndex)) {
            setExpandedRows(expandedRows.filter((index) => index !== rowIndex));
          } else {
            setExpandedRows([...expandedRows, rowIndex]);
          }
        };

        const isRowExpanded = expandedRows.includes(rowIndex);

        return (
          <Fragment key={rowIndex}>
            <tr
              className={`cursor-pointer transition-colors ${
                isRowExpanded ? "bg-gray-200 dark:bg-gray-600" : "hover:bg-gray-200 dark:hover:bg-gray-400"
              }`}
              onClick={toggleRow}
            >
              {renderDataItems}
            </tr>

            {isRowExpanded && (
              <tr className="">
                <td colSpan={allHeaders.length} className="p-2">
                  {/* Use DynamicComponent to render the dynamic content */}
                  <DynamicComponent data={originalItem} />
                </td>
              </tr>
            )}
          </Fragment>
        );
      })
    : null;

  return (
    <Fragment>
      <SettingsBar
        groupedColumns={groupedColumns}
        visibleColumns={visibleColumns}
        onVisibilityChange={handleVisibilityChange}
        onToggle={handleSettingsToggle}
        isExpanded={isSettingsExpanded}
      />
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="">{renderHeaders}</tr>
          </thead>
          <tbody>{renderRows}</tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default DynamicEntity;
