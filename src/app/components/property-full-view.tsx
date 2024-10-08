'use client';
import React from "react";
import { DynamicComponentDataModel, Property } from "../middleware/model";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Box,
  ImageList,
  ImageListItem,
  Paper,
  IconButton,
  useTheme,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import DynamicComponent from "./dynamic-component";
import ImageGallery from "./image-gallery";

export const baseURL = "http://localhost:1337";

interface PropertyFullViewProps {
  data: Property;
  onUpdate?: (updatedData: Property) => void; // Optional callback to notify parent of updates
  isTopLevel?: boolean; // Determines if the component is top-level
}

const PropertyFullView: React.FC<PropertyFullViewProps> = ({ data }) => {
  const theme = useTheme();
  return (
    <Card sx={{ margin: 2 }}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="stretch"
      >
        {/* Property Info Section */}
        <Box display="flex" flexDirection="column" p={1}>
          <Typography variant="h5" component="div">
            For Sale
          </Typography>
          <Typography variant="subtitle2">
            5581 rue alain, brossard, QC
          </Typography>
        </Box>

        {/* Price, Action Buttons, and Contact Broker Button Section */}
        <Box display="flex" alignItems="stretch">
          {/* Price Section */}
          <Box display="flex" p={1}>
            <Typography variant="h5" component="div">
              $12,500,000
            </Typography>
          </Box>

          {/* Share and Favorite Buttons Section */}
          <Box display="flex" flexDirection="column">
            <IconButton
              sx={{
                height: "50%",
                border: `1px solid ${theme.palette.divider}`,
                borderBottom: "none",
                borderRadius: 0,
              }}
            >
              <FavoriteIcon fontSize="small" />
            </IconButton>
            <IconButton
              sx={{
                height: "50%",
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 0,
              }}
            >
              <ShareIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Contact Broker Button */}
          <Button
            variant="contained"
            disableElevation
            sx={{
              borderRadius: 0,
              whiteSpace: "nowrap",
              alignSelf: "stretch",
            }}
          >
            Contact Broker
          </Button>
        </Box>
      </Box>

      <ImageGallery media={data.media || []} />

      {data.characteristics && (
        <Box flex="1 1 45%">
          <DynamicComponent
            title="Characteristics"
            data={data.characteristics}
            onChange={(newValue: DynamicComponentDataModel) => {
              // Implement your update logic here
              console.log("Characteristics updated:", newValue);
            }}
          />
        </Box>
      )}
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {data.characteristics && (
          <Box flex="1 1 45%">
            <DynamicComponent
              title="Characteristics"
              data={data.characteristics}
              onChange={(newValue: DynamicComponentDataModel) => {
                // Implement your update logic here
                console.log("Characteristics updated:", newValue);
              }}
            />
          </Box>
        )}
        {data.location && (
          <Box flex="1 1 45%">
            <DynamicComponent
              title="Location"
              data={data.location}
              onChange={(newValue: DynamicComponentDataModel) => {
                // Implement your update logic here
                console.log("Location updated:", newValue);
              }}
            />
          </Box>
        )}
      </Box>

      {/* Action Buttons */}
      <CardActions>
        <Button size="small" variant="outlined">
          Edit Property
        </Button>
        <Button size="small" variant="outlined" color="error">
          Delete Property
        </Button>
      </CardActions>
    </Card>
  );
};

export default PropertyFullView;
