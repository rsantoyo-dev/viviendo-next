import React from 'react';
import { Box, useTheme } from '@mui/material';

interface CardWrapperProps {
  children: React.ReactNode;
}

const CardWrapper: React.FC<CardWrapperProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1),
        //border: `1px solid ${theme.palette.divider}`,
        width: '100%',
      }}
    >
      {children}
    </Box>
  );
};

export default CardWrapper;
