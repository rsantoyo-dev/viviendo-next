import React from "react";
import { ImageList, ImageListItem, Paper, Typography } from "@mui/material";
import { Media } from "../middleware/model";

export const baseURL = "http://localhost:1337";

interface ImageGalleryProps {
  media: Media[];
}


const ImageGallery: React.FC<ImageGalleryProps> = ({ media }) => {
  return (
    <ImageList cols={3} gap={2} sx={{ padding: 0 }}>
      {media && media.length > 0 ? (
        media.map((mediaItem, index) => (
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
  );
};

export default ImageGallery; 
