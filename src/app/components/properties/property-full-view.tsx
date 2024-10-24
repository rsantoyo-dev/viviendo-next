'use client';
import React from "react";
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
  Grid2,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import DynamicComponent from "../dynamic-component";
import ImageGallery from "../image-gallery";
import { Property, Property_Plain } from "../../generated-interfaces/api/property";
import { DynamicComponentDataModel } from "../../middleware/model";

export const baseURL = "http://localhost:1337";

interface PropertyFullViewProps {
  property: Property_Plain
  onUpdate?: (updatedData: Property_Plain) => void; // Optional callback to notify parent of updates
}

const PropertyFullView: React.FC<PropertyFullViewProps> = ({ property }) => {
  const theme = useTheme();
  return (
    <Card sx={{width:1}}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="stretch"
      >
        {/* Property Info Section */}
        <Box display="flex" flexDirection="column" p={1}>
          <Typography variant="h5" component="div">
            {property?.propertyStatus}
          </Typography>
          <Typography variant="subtitle2">
            {property?.location?.address}, {property?.location?.city}
          </Typography>
        </Box>

        {/* Price, Action Buttons, and Contact Broker Button Section */}
        <Box display="flex" alignItems="stretch">
          {/* Price Section */}
          <Box display="flex" p={1}>
            <Typography variant="h5" component="div">
              ${property?.listedPrice}
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

      <ImageGallery media={property?.media || []} maxImagesToShow={6} /> 

      <Grid2 container padding={1} spacing={1}>
      {property?.features && (
        <Grid2 size={{ xs: 12, md: 6 }}>
          <DynamicComponent
            title="Features"
            data={property.features} onChange={function (newValue: DynamicComponentDataModel): void {
              throw new Error("Function not implemented.");
            } }            
          />
        </Grid2>
      )}
      {property?.building && (
        <Grid2 size={{ xs: 12, md: 6 }}>
          <DynamicComponent
            title="Building"
            data={property.building} onChange={function (newValue: DynamicComponentDataModel): void {
              throw new Error("Function not implemented.");
            } }            
          />
        </Grid2>
      )}
      </Grid2>

      

      

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
