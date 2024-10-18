"use client";

import { useTheme, Theme } from "@mui/material/styles";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import ImageGallery from "./image-gallery";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Property, Property_Plain } from "../generated-interfaces/api/property";

export const baseURL = "http://localhost:1337";

interface PropertyCardProps {
  property: Property_Plain;
  onUpdate?: (updatedData: Property_Plain) => void; // Optional callback to notify parent of updates
  viewMode?: "full" | "card"; // New prop to switch between views
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const theme = useTheme();

  return (
    
      <Card sx={{height:1}}>
        <CardMedia>
          <ImageGallery media={property?.media || []} maxImagesToShow={1} />
        </CardMedia>
        <CardContent>
          {property?.listedPrice && (
            <Typography variant="h6" color="primary">
              {property.listedPrice} $
            </Typography>
          )}
          {property?.propertyStatus && (
            <Typography
              variant="subtitle1"
              fontWeight="bold"
 
            >
              {property?.propertyStatus}
            </Typography>
          )}
          {property?.location && (
            <Box display="flex" flexDirection="column" p={0}>
              <Typography variant="caption" color="textSecondary">
                {property.location?.address}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {property.location?.city}
              </Typography>

              <Typography variant="caption" color="textSecondary">
                {property.location?.neighborhood}
              </Typography>
            </Box>
          )}
        </CardContent>
        <CardActions>
          <IconButton>
            <FavoriteIcon fontSize="small" />
          </IconButton>
          <IconButton>
            <ShareIcon fontSize="small" />
          </IconButton>
        </CardActions>
      </Card>
  
  );
};

export default PropertyCard;
