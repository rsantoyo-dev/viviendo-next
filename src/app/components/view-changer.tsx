'use client';

import { ViewList, ViewModule } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useRouter, useSearchParams } from "next/navigation"; // Use 'next/navigation' for App Router
import React from 'react';

const ViewChanger = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [view, setView] = React.useState('single');

    const handleViewChange = (newView: string) => {
        setView(newView);
        const params = new URLSearchParams(searchParams.toString());

        if (newView === 'grid') {
            params.set('display', 'grid');
        } else {
            params.delete('display'); // Remove the 'display' parameter when in 'single' view
        }

        // Push the updated URL
        router.push(`${window.location.pathname}?${params.toString()}`);
    };

    return (
        <Box>
            <IconButton
                onClick={() => handleViewChange('single')}
                color={view === 'single' ? 'primary' : 'default'}
            >
                <ViewList />
            </IconButton>
            <IconButton
                onClick={() => handleViewChange('grid')}
                color={view === 'grid' ? 'primary' : 'default'}
            >
                <ViewModule />
            </IconButton>
        </Box>
    );
};

export default ViewChanger;
