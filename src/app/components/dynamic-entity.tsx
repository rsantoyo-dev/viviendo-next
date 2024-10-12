// DynamicEntity.tsx
"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import {
  Agent,
  Characteristics,
  DynamicComponentDataModel,
  FieldValue,
  Media,
  Property,
} from "../middleware/model";
import DynamicComponent from "./dynamic-component";
import DataItem from "./data-item";
import { baseURL } from "../apolloClient";
import { updateProperty } from "../middleware/requests";
type Entity = Property | (Agent & { [key: string]: FieldValue }); // Union type for Property and Agent with index signature
interface DynamicEntityProps {
  data: Entity;
  onUpdate?: (updatedData: Entity) => void; // Optional callback to notify parent of updates
  isTopLevel?: boolean; // Determines if the component is top-level
}

const DynamicEntity: React.FC<DynamicEntityProps> = ({ data }) => {
  // const [isEditing, setIsEditing] = useState<boolean>(false);
  const [dynamicEntityData, setDynamicEntityData] = useState<Entity>(
    data as Entity
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Log initial data
  const renderImage = (media: Media) => {
    return (
      <img
        src={baseURL + media.url}
        alt={media.name}
        className="flex w-32 h-32 object-cover rounded-lg"
      />
    );
  };

  const onSave = async () => {
    console.log('save', dynamicEntityData);
    // Add your save logic here, for example, making an API call to save the data
    const property: Property = {
      documentId: dynamicEntityData.documentId,
      registrationId: dynamicEntityData.registrationId as string,
      catastroId: dynamicEntityData.catastroId as string,
      location: dynamicEntityData.location,
      characteristics: dynamicEntityData.characteristics as Characteristics | undefined,
     
    }
   await updateProperty(
      dynamicEntityData.documentId,
      property)
   }
  

  const valueFieldHandler = (key: string, value: FieldValue) => {
    console.log("Value Change:", key, value);
    setDynamicEntityData((prevData) => {
      return {
        ...prevData,
        [key]: value,
      };
    });
  };

  const valueComponentHandler = (
    key: string,
    value: DynamicComponentDataModel
  ) => {
    console.log("Value Change:", key, value);
    setDynamicEntityData((prevData) => {
      return {
        ...prevData,
        [key]: value,
      };
    });
  };

  const isTypeName = (data: unknown): boolean =>
    data !== null && typeof data === "object" && "__typename" in data;

  return (
    <div className="flex flex-wrap p-2 border dark:border-gray-800 rounded-lg bg-gray-100 dark:bg-gray-900 dark:text-gray-200 shadow-md w-full">
      <div className="flex flex p-2 w-full justify-between items-center">
        <div>{data.__typename}</div>
        <button
          onClick={() => {
            if (isEditing) {
              onSave();
            }
            setIsEditing(!isEditing);
          }}
          className="bg-primary dark:bg-gray-800 hover:bg-primary-light  text-xs font-bold p-2 px-4 rounded"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
      <div className="flex p-2 flex-wrap border dark:border-gray-800 rounded-lg bg-gray-100 dark:bg-gray-900 dark:text-gray-200 shadow-md w-full">
        {Object.entries(dynamicEntityData)
          .filter(([key]) => key !== "__typename" && key !== "documentId")
          .map(([key, value]) => {
            console.log(key, value, typeof value);

            if (typeof value === "object") {
              return (
                <Fragment key={key}>
                  {Array.isArray(value) ? (
                    <div className="flex flex-col w-full p-2">
                      <span className="font-bold">{key}</span>
                      <div className="flex flex-wrap gap-2 p-2">
                        {value.map(
                          (item, index) =>
                            true && (
                              <div key={index} className="flex ">
                                {typeof item === "object" &&
                                  item !== null &&
                                  "__typename" in item &&
                                  String(item.__typename) === "UploadFile" &&
                                  renderImage(item as Media)}
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex w-full md:w-1/2 xl:w-1/3">
                      <DynamicComponent
                        data={value as Entity}
                        isEditing={isEditing}
                        onChange={(newValue) =>
                          valueComponentHandler(key, newValue)
                        }
                      />
                    </div>
                  )}
                </Fragment>
              );
            } else {
              return (
                true && (
                  <div key={key} className="flex w-full md:w-1/2 xl:w-1/3 p-2">
                    {
                      <DataItem
                        key={key}
                        label={key}
                        value={value as string}
                        isEditing={isEditing}
                        onChange={(newValue) =>
                          valueFieldHandler(key, newValue)
                        }
                      />
                    }
                  </div>
                )
              );
            }
            return null; // or any valid JSX element
          })}
      </div>
    </div>
  );
};

export default DynamicEntity;
