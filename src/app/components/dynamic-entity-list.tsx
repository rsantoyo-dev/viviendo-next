// DynamicEntityList.tsx
"use client";
import React, { Fragment, useEffect, useState } from "react";
import SettingsBar from "./settings-bar";
import { flattenAndRenameObject } from "../utilities/helpers";
import DynamicEntity from "./dynamic-entity";
import { Entity, Property } from "../middleware/model"; // Import Entity type
import PropertyFullView from "./property-full-view";

interface DynamicEntityListProps {
  data: Entity[]; // The dataset can be an array of Property or Agent
  defaultVisibleColumns?: string[]; // Default visible columns
  groupedColumns?: { [key: string]: string[] }; // Column groups for filtering
}

const DynamicEntityList: React.FC<DynamicEntityListProps> = ({
  data,
  defaultVisibleColumns = [],
  groupedColumns = {},
}) => {
  // Initialize local state for entities to handle updates
  const [entities, setEntities] = useState<Entity[]>(data);

  // Log the received data to verify __typename presence
  useEffect(() => {
    console.log("DynamicEntityList received data:", data);
    data.forEach((item, index) => {
      console.log(`Item ${index} __typename:`, item.__typename);
    });
    setEntities(data);
  }, [data]);

  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    defaultVisibleColumns
  );
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  if (entities.length === 0) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 text-gray-500 p-4 rounded-lg shadow-sm">
        No data available
      </div>
    );
  }

  // Flatten and rename object fields (generic for any data type)
  const flattenedData = entities.map((item, index) => {
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
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
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
          return sortConfig.direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else if (typeof aValue === "number" && typeof bValue === "number") {
          return sortConfig.direction === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }

        return 0;
      });
      console.log("Sorted Data:", sorted);
      return sorted;
    }
    console.log("Unsorted Data:", flattenedData);
    return flattenedData;
  }, [flattenedData, sortConfig]);

  // Handle updates from DynamicEntity
  const handleUpdate = (index: number, updatedData: Entity) => {
    console.log(`Updating entity at index ${index}:`, updatedData);
    const updatedEntities = [...entities];
    updatedEntities[index] = updatedData;
    setEntities(updatedEntities);
  };

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
        {sortConfig?.key === header
          ? sortConfig.direction === "asc"
            ? " 🔼"
            : " 🔽"
          : ""}
      </th>
    ));

  const renderRows = sortedData.length
    ? sortedData.map((item, rowIndex: number) => {
        // Retrieve the original item (before flattening)
        const originalItem = entities[rowIndex];
        console.log(`Original Item ${rowIndex}:`, originalItem);

        // Toggle row expansion
        const toggleRow = () => {
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
                isRowExpanded
                  ? "bg-gray-200 dark:bg-gray-600"
                  : "hover:bg-gray-200 dark:hover:bg-gray-400"
              }`}
              onClick={toggleRow}
            >
              {allHeaders
                .filter((key) => visibleColumns.includes(key))
                .map((key, index) => (
                  <td
                    key={index}
                    className="border-b border-gray-300 dark:border-gray-700 border-r border-dashed border-gray-300 dark:border-gray-700 px-2 py-2 text-sm text-gray-800 dark:text-gray-300 md:text-base"
                  >
                    {item[key] !== undefined ? String(item[key]) : "N/A"}
                  </td>
                ))}
            </tr>

            {isRowExpanded && (
              <tr>
                <td colSpan={allHeaders.length} className="">
                  {/* Use DynamicEntity to render the dynamic content with edit controls */}
                  {originalItem.__typename === "Property" ? (
                    <PropertyFullView data={originalItem as Property} />
                  ) : (
                    <DynamicEntity
                      data={originalItem}
                      onUpdate={(updatedData) =>
                        handleUpdate(rowIndex, updatedData)
                      }
                      isTopLevel={true} // Indicate this is the top-level component with edit controls
                    />
                  )}
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
            <tr>{renderHeaders}</tr>
          </thead>
          <tbody>{renderRows}</tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default DynamicEntityList;
