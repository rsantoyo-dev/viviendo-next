// dynamic-component.tsx
import React, { useState, useEffect } from "react";
import DataItem from "./data-item";
import { baseURL } from "../apolloClient";
import { updateAgent, updateProperty } from "../middleware/requests";
import { Entity, Property, Agent, FieldValue } from "../middleware/model";

interface DynamicComponentProps {
  data: Entity;
  isEditing: boolean;
  onChange: (updatedData: Entity) => void;
}

// Helper function to get the thumbnail URL from the media name
const getThumbnailUrl = (url: string) => {
  const urlParts = url.split("/");
  const fileName = urlParts.pop();
  const thumbnailName = `thumbnail_${fileName}`;
  return `${baseURL}${urlParts.join("/")}/${thumbnailName}`;
};

// A helper to handle rendering of fields, including arrays and nested components
const renderField = (
  key: string,
  value: FieldValue,
  isEditing: boolean,
  handleChange: (key: string, value: FieldValue) => void
) => {
  // Skip rendering for IDs in view mode, but ensure they are editable in edit mode
  if (!isEditing && key.toLowerCase().includes("id")) {
    return null;
  }

  // Handle arrays (like media or other nested lists)
  if (Array.isArray(value)) {
    const isMediaArray = value.every(
      (item) =>
        item &&
        typeof item === "object" &&
        "__typename" in item &&
        item.__typename === "UploadFile"
    );

    return (
      <div key={key} className="w-full mb-4">
        <strong className="truncate text-gray-300 block mb-1">{key}:</strong>
        <div className="flex flex-wrap p-2 gap-2">
          {value.map((item, index) => {
            if (isMediaArray && typeof item === "object") {
              const thumbnailUrl = item && "url" in item && getThumbnailUrl(item.url as string);
              return (
                <div
                  key={index}
                  className="flex flex-col items-center p-4 border bg-gray-100 dark:bg-gray-900 dark:border-gray-700 rounded-md shadow-sm max-w-44 sm:w-auto"
                >
                  <img
                    src={thumbnailUrl || undefined}
                    alt={(item as { caption?: string; name?: string }).caption || (item as { caption?: string; name?: string }).name}
                    className="object-cover rounded-md w-24 h-24 sm:w-36 sm:h-36 xl:w-64 xl:h-64"
                  />
                  <div className="text-center flex max-w-40 text-xs mt-2 text-gray-900 dark:text-gray-100 truncate">
                    <span className="truncate block overflow-hidden">
                      {(item as { caption?: string; name?: string }).caption || (item as { caption?: string; name?: string }).name}
                    </span>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className="p-4 border dark:border-gray-700 rounded-md shadow-sm bg-gray-100 dark:bg-gray-900 dark:text-gray-300 w-full"
                >
                  {typeof item === "object" && item !== null ? (
                    <DynamicComponent
                      key={index}
                      data={item as Entity}
                      isEditing={isEditing}
                      onChange={(updatedValue) => handleChange(`${key}[${index}]`, updatedValue)}
                    />
                  ) : (
                    <div className="truncate">{JSON.stringify(item) || "N/A"}</div>
                  )}
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }

  // Handle non-array fields, they take 50% or 33% width
  const fieldWidthClass = "w-full sm:w-1/2 lg:w-1/3 p-1"; // Adjust width classes as needed

  if (value && typeof value === "object" && "__typename" in value) {
    return (
      <div key={key} className={fieldWidthClass}>
        <DynamicComponent
          data={value as Entity}
          isEditing={isEditing}
          onChange={(updatedValue) => handleChange(key, updatedValue)}
        />
      </div>
    );
  }

  // **Editable DataItem**: Render inputs for editing based on value type
  if (isEditing) {
    // **Boolean**: Render checkbox for boolean values
    if (typeof value === "boolean") {
      return (
        <div key={key} className={`p-2 border-b border-gray-600 ${fieldWidthClass}`}>
          <strong className="text-gray-300">{key}:</strong>
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => handleChange(key, e.target.checked)}
            className="border p-1 w-full bg-gray-100 dark:bg-gray-800 border-gray-600 text-gray-900 dark:text-gray-300"
          />
        </div>
      );
    }

    // **Number**: Render input for numbers
    if (typeof value === "number" || value === null) {
      return (
        <div key={key} className={`p-2 border-b border-gray-600 ${fieldWidthClass}`}>
          <strong className="text-gray-300">{key}:</strong>
          <input
            type="number"
            value={value !== null ? value : ""}
            onChange={(e) => handleChange(key, parseFloat(e.target.value) || null)}
            className="border p-1 w-full bg-gray-100 dark:bg-gray-800 border-gray-600 text-gray-900 dark:text-gray-300"
          />
        </div>
      );
    }

    // **String**: Render input for strings
    if (typeof value === "string" || value === null) {
      return (
        <div key={key} className={`p-2 border-b border-gray-600 ${fieldWidthClass}`}>
          <strong className="text-gray-300">{key}:</strong>
          <input
            type="text"
            value={value !== null ? value : ""}
            onChange={(e) => handleChange(key, e.target.value || null)}
            className="border p-1 w-full bg-gray-100 dark:bg-gray-800 border-gray-600 text-gray-900 dark:text-gray-300"
          />
        </div>
      );
    }
  }

  // **View Mode**: Only render DataItem when value is present in view mode
  if (value !== undefined && value !== null) {
    const dataItemProps = {
      label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the key for the label
      value: value !== undefined ? value : "N/A", // Convert value to string or N/A
      iconName: "GlobeAltIcon", // Dynamically assign icons based on the key if needed
    };

    return (
      <div key={key} className={fieldWidthClass}>
        <DataItem
          isEditing={false}
          label={dataItemProps.label}
          value={
            typeof dataItemProps.value === "object" && dataItemProps.value !== null
              ? JSON.stringify(dataItemProps.value)
              : dataItemProps.value
          }
          onChange={() => {}}
        />
      </div>
    );
  }

  return null; // Do not render if value is undefined or null in view mode
};

// Main DynamicComponent to render fields and handle nested components or arrays
const DynamicComponent: React.FC<DynamicComponentProps> = ({ data, isEditing, onChange }) => {
  const [formData, setFormData] = useState<Entity>(data);

  // Use effect to log the type of the data
  useEffect(() => {
    console.log("DynamicComponent Data type:", formData.__typename);
  }, [formData.__typename]);

  const handleChange = (key: string, value: unknown) => {
    const existingValue = formData[key];
    let updatedValue = value;

    if (typeof existingValue === 'object' && existingValue !== null && '__typename' in existingValue) {
      updatedValue = {
        ...existingValue,
        ...(typeof value === 'object' && value !== null ? value : {}),
        __typename: existingValue.__typename, // Preserve __typename
      };
    }

    const updatedData = {
      ...formData,
      [key]: updatedValue,
    };
    setFormData(updatedData as Entity);
    onChange(updatedData); // Call parent onChange
  };

  return (
    <div className="border dark:border-gray-800 p-2 rounded-lg bg-gray-100 dark:bg-gray-900 dark:text-gray-200 shadow-md w-full">
      {formData.__typename && (
        <h2 className="text-lg font-semibold mb-4 truncate max-w-full text-gray-900 dark:text-gray-200">
          {formData.__typename} Details
        </h2>
      )}

      {/* Dynamically render each field, excluding __typename */}
      <div className="flex flex-wrap">
        {Object.entries(formData)
          .filter(([key]) => key !== "__typename")
          .map(([key, value]) => renderField(key, value, isEditing, handleChange))}
      </div>
    </div>
  );
};

// Parent component handling top-level edit mode and passing it to subcomponents
interface DynamicComponentContainerProps {
  data: Entity;
}

const DynamicComponentContainer: React.FC<DynamicComponentContainerProps> = ({ data }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Entity>(data);

  // Use effect to log the type of the data
  useEffect(() => {
    console.log("DynamicComponentContainer Data type:", formData.__typename);
  }, [formData.__typename]);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (updatedData: Entity) => {
    setFormData(updatedData);
  };

  const handleSave = async () => {
    console.log("handleSave:", formData.__typename, formData);
    try {
      if (formData.__typename === "Property") {
        const updatedProperty = await updateProperty(formData.documentId, formData as Property);
        if (updatedProperty) {
          console.log("Property updated successfully:", updatedProperty);
          setFormData(updatedProperty); // Update formData with the response
        }
      } else if (formData.__typename === "Agent") {
        const updatedAgent = await updateAgent(formData.id, formData as Agent); // Use `id` instead of `documentId`
        if (updatedAgent) {
          console.log("Agent updated successfully:", updatedAgent);
          setFormData(updatedAgent); // Update formData with the response
        }
      } else {
        console.error("Unknown typename:", formData.__typename);
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className="border dark:border-gray-700 p-2 rounded-lg bg-gray-100 dark:bg-gray-900 dark:text-gray-200 shadow-md w-full">
      <div className="flex justify-between mb-4">
        <button onClick={toggleEditMode} className="bg-primary dark:bg-primary text-white px-4 py-2 rounded">
          {isEditing ? "Cancel" : "Edit"}
        </button>
        {isEditing && (
          <button onClick={handleSave} className="bg-green-500 dark:bg-green-600 text-white px-4 py-2 rounded">
            Save
          </button>
        )}
      </div>

      <DynamicComponent data={formData} isEditing={isEditing} onChange={handleChange} />
    </div>
  );
};

export default DynamicComponentContainer;
