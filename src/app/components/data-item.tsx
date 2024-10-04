import React from "react";
import { iconMap, IconMapType } from "../ui/icons";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface DataItemProps {
  label: string; // Label for the field
  value: string | number | boolean | null; // The actual value to display or edit
  iconName?: string; // Optional icon name for the field
  isEditing: boolean; // Flag to determine if the component is in editing mode
  onChange: (newValue: string | number | boolean | null) => void; // Callback to update the value in edit mode
}

const DataItem: React.FC<DataItemProps> = ({ label, value, iconName, isEditing, onChange }) => {
  const IconComponent = iconName ? (iconMap as IconMapType)[iconName] : null; // Get the icon component dynamically

  // Render input elements for editing based on the type of value
  const renderEditField = () => {
    // Checkbox for boolean values
    if (typeof value === "boolean") {
      return (
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="border p-1 w-full bg-gray-100 dark:bg-gray-800 border-gray-600 text-gray-900 dark:text-gray-300"
        />
      );
    }

    // Number input for numeric values
    if (typeof value === "number") {
      return (
        <input
          type="number"
          value={value !== null ? value : ""}
          onChange={(e) => onChange(parseFloat(e.target.value) || null)}
          className="border p-1 w-full bg-gray-100 dark:bg-gray-800 border-gray-600 text-gray-900 dark:text-gray-300"
        />
      );
    }

    // Text input for string values
    return (
      <input
        type="text"
        value={value !== null ? value : ""}
        onChange={(e) => onChange(e.target.value || null)}
        className="border p-1 w-full bg-gray-100 dark:bg-gray-800 border-gray-600 text-gray-900 dark:text-gray-300"
      />
    );
  };

  // Render the value based on its type
  const renderField = () => {
    if (value === null) return "N/A";

    if (typeof value === "boolean") {
      return value ? (
        <CheckIcon className="h-5 w-5 text-green-500" />
      ) : (
        <XMarkIcon className="h-5 w-5 text-red-500" />
      );
    }

    return value;
  };

  return (
    <div className="flex flex-col p-2 bg-gray-50 dark:bg-gray-800 min-w-20 max-w-full rounded-md shadow-sm">
      {/* First Line: Icon and Label in the same row */}
      <div className="flex items-center space-x-1 mb-1">
        {IconComponent && <IconComponent className="h-4 w-4 text-gray-500 dark:text-gray-300" />}
        {label && (
          <span className="text-gray-800 dark:text-gray-200 text-xs truncate max-w-full">
            {label}
          </span>
        )}
      </div>

      {/* Second Line: Render either the value or the editable field */}
      <div className="text-gray-700 dark:text-gray-300 text-sm truncate max-w-full">
        {isEditing ? renderEditField() : renderField()}
      </div>
    </div>
  );
};

export default DataItem;
