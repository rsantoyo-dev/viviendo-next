import React, { useState } from "react";
import { DynamicComponentDataModel, FieldValue } from "../middleware/model";
import DataItem from "./data-item";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import { theme } from "../ui/theme";
import { Subtitles } from "@mui/icons-material";

interface DynamicComponentProps {
  title?: string;
  data: DynamicComponentDataModel;
  isEditing?: boolean;
  onChange: (newValue: DynamicComponentDataModel) => void;
}

const DynamicComponent: React.FC<DynamicComponentProps> = ({
  title,
  data,
  isEditing,
  onChange,
}) => {
  // Maintain state for the data so it can be updated
  const [localData, setLocalData] = useState(data);

  const handleDataItemChange = (key: string, newValue: FieldValue) => {
    console.log("handleDataItemChange", key, newValue);
    const updatedData = {
      ...localData,
      [key]: newValue,
    };
    setLocalData(updatedData);
    onChange(updatedData);
  };

  return (
    <Card elevation={0} sx={{margin:1}}>
      <Typography variant={'subtitle1'} fontWeight={'bold'} px={2} py={0} color="text.secondary">
        {title}
      </Typography>
      <CardContent sx={{paddingY:0}}>
        <Box display="flex" flexWrap="wrap">
          {Object.entries(localData)
            .filter(([key]) => key !== "__typename")
            .filter(([key, value]) => isEditing || value !== null)
            .map(([key, value]) => {
              return (
                <Box p={1} key={key}>
                  <DataItem
                    label={key}
                    value={value as string | number | boolean | null}
                    isEditing={isEditing || false}
                    onChange={(newValue) => handleDataItemChange(key, newValue)}
                  />
                </Box>
              );
            })}
        </Box>
      </CardContent>
    </Card>
  );
};

export default DynamicComponent;
