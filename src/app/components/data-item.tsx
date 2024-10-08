import React from "react";
import { iconMap, IconMapType } from "../ui/icons";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FieldValue } from "../middleware/model";
import { Checkbox, TextField, Typography, Box, IconButton } from "@mui/material";

interface DataItemProps {
  label: string;
  value: FieldValue;
  iconName?: string;
  isEditing: boolean;
  onChange: (newValue: string | number | boolean | null) => void;
}

const DataItem: React.FC<DataItemProps> = ({
  label,
  value,
  iconName,
  isEditing,
  onChange,
}) => {
  const IconComponent = iconName ? (iconMap as IconMapType)[iconName] : null;

  // Render input elements for editing based on the type of value
  const renderEditField = () => {
    if (typeof value === "boolean") {
      return (
        <Checkbox
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          color="primary"
        />
      );
    }

    if (typeof value === "number") {
      return (
        <TextField
          type="number"
          value={value !== null ? value : ""}
          onChange={(e) => onChange(parseFloat(e.target.value) || null)}
          variant="outlined"
          size="small"
          fullWidth
        />
      );
    }

    return (
      <TextField
        type="text"
        value={value !== null ? value : ""}
        onChange={(e) => onChange(e.target.value || null)}
        variant="outlined"
        size="small"
        fullWidth
      />
    );
  };

  const renderField = (): React.ReactNode => {
    if (value === null) return "NO";

    if (typeof value === "boolean") {
      return value ? (
        <CheckIcon className="h-5 w-5 text-green-500" />
      ) : (
        <XMarkIcon className="h-5 w-5 text-red-500" />
      );
    }

    if (typeof value === "string" || typeof value === "number") {
      return value;
    }

    return null;
  };

  return (
    <Box
      width={100}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      sx={{
    
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {/* First Line: Icon and Label in the same row */}
      <Box display="flex" alignItems="center" marginBottom={1}>
        {IconComponent && (
          <IconButton size="small">
            <IconComponent />
          </IconButton>
        )}
        {label && (
          <Typography variant="caption" color="textSecondary" noWrap>
            {label}
          </Typography>
        )}
      </Box>

      {/* Second Line: Render either the value or the editable field */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" color="textPrimary" noWrap>
          {isEditing ? renderEditField() : renderField()}
        </Typography>
      </Box>
    </Box>
  );
};

export default DataItem;
