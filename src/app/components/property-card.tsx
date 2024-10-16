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
import { Property } from "../middleware/model";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

export const baseURL = "http://localhost:1337";

interface PropertyCardProps {
  data: Property;
  onUpdate?: (updatedData: Property) => void; // Optional callback to notify parent of updates
  viewMode?: "full" | "card"; // New prop to switch between views
}

const PropertyCard: React.FC<PropertyCardProps> = ({ data }) => {
  const theme = useTheme();

  return (
    
      <Card sx={{height:1}}>
        <CardMedia>
          <ImageGallery media={data.media || []} maxImagesToShow={1} />
        </CardMedia>
        <CardContent>
          {data.listedPrice && (
            <Typography variant="h6" color="primary">
              {data.listedPrice} $
            </Typography>
          )}
          {data.propertyStatus && (
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="textSecondary"
            >
              {data.propertyStatus}
            </Typography>
          )}
          {data.location && (
            <Box display="flex" flexDirection="column" p={0}>
              <Typography variant="caption" color="textSecondary">
                {data.location?.address}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {data.location?.city}
              </Typography>

              <Typography variant="caption" color="textSecondary">
                {data.location?.neighborhood}
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
