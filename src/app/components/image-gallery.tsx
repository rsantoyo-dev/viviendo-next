import React from "react";
import { ImageList, ImageListItem, Paper, Typography, IconButton, Badge, useMediaQuery, useTheme, Theme } from "@mui/material";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import { Media } from "../middleware/model";

export const baseURL = "http://localhost:1337";

interface ImageGalleryProps {
  media: Media[];
  maxImagesToShow?: number;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ media, maxImagesToShow = 6 }) => {
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down("md"));
  //const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  maxImagesToShow = isXsScreen ? 1 : maxImagesToShow;
  const imagesToShow = media.slice(0, maxImagesToShow);
  const totalImages = media.length;
  const cols = imagesToShow.length === 1 ? 1 : Math.min(imagesToShow.length, 3);

  return (
    <div style={{ position: "relative" }}>
      <ImageList
        cols={cols}
        gap={2}
        sx={{
          padding: 0,
          display: {
            xs: imagesToShow.length === 1 ? 'block' : 'grid',
            md: 'grid',
          },
        }}
      >
        {imagesToShow && imagesToShow.length > 0 ? (
          imagesToShow.map((mediaItem, index) => (
            <Paper key={index}>
              <ImageListItem>
                <img
                  src={`${baseURL}${mediaItem.url}`}
                  style={{
                    objectFit: "cover",
                    aspectRatio: "4 / 3",
                    width: "100%",
                    height: "100%",
                  }}
                  alt={mediaItem.caption || `Property image ${index + 1}`}
                  loading="lazy"
                />
              </ImageListItem>
            </Paper>
          ))
        ) : (
          <Typography>No media available</Typography>
        )}
      </ImageList>
      {totalImages > maxImagesToShow && (
        <IconButton
          href="/gallery"
          style={{ position: "absolute", bottom: 8, right: 8 }}
        >
          <Badge badgeContent={totalImages} color="primary">
            <PhotoLibraryIcon />
          </Badge>
        </IconButton>
      )}
    </div>
  );
};

export default ImageGallery;