'use client';
import { Box } from '@mui/material'
import React from 'react'
import Paginator from '../paginator'
import ViewChanger from '../view-changer'
import { PageInfo } from '@/app/middleware/model'
import PriceFilter from './PriceFilter';


const PropertiesHeader = (pageInfo: PageInfo) => {
     // Handle filter changes from RangeSlider

  return (
    <Box display="flex" flexDirection={'column'} alignItems="center" justifyContent="space-between">
          <Box width={0.5}>
            <Paginator
              currentPage={pageInfo.page}
              totalPages={pageInfo.pageCount}
            />
          </Box>
        </Box>
  )
}

export default PropertiesHeader