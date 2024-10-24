'use client';
import React, { useState, useEffect, useRef } from 'react';

import Slider from '@mui/material/Slider';

import { debounce } from 'lodash';
import { NumberFilter } from '@/app/middleware/model';

// Define the key marks
const marks = [
  { value: 0, label: '0' },
  { value: 1, label: '10K' },
  { value: 2, label: '50K' },
  { value: 3, label: '100K' },
  { value: 4, label: '500K' },
  { value: 5, label: '1M' },
  { value: 6, label: '5M' },
  { value: 7, label: '10M' },
  { value: 8, label: '20M' },
];

// Mapping of slider values to actual values
const valueMap: number[] = [
  0,          // 0
  10_000,     // 1 - 10K
  50_000,     // 2 - 50K
  100_000,    // 3 - 100K
  500_000,    // 4 - 500K
  1_000_000,  // 5 - 1M
  5_000_000,  // 6 - 5M
  10_000_000, // 7 - 10M
  20_000_000, // 8 - 20M
];

// Helper function to interpolate between two points
const interpolate = (value: number): number => {
  if (value <= 0) return valueMap[0];
  if (value >= marks.length - 1) return valueMap[marks.length - 1];

  const lowerIndex = Math.floor(value);
  const upperIndex = Math.ceil(value);
  const lowerValue = valueMap[lowerIndex];
  const upperValue = valueMap[upperIndex];
  const fraction = value - lowerIndex;

  return lowerValue + fraction * (upperValue - lowerValue);
};

// Function to format the actual value for display
const formatValue = (value: number): string => {
  const actualValue = interpolate(value);
  if (actualValue >= 1_000_000) {
    return `$${(actualValue / 1_000_000).toFixed(1)}M`;
  }
  if (actualValue >= 1_000) {
    return `$${(actualValue / 1_000).toFixed(0)}K`;
  }
  return `$${actualValue}`;
};

interface RangeSliderProps {
  onFilterChange?: (filter: NumberFilter) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ onFilterChange }) => {
  // Initialize state with two handles: [low, high]
  const [sliderValues, setSliderValues] = useState<number[]>([0, 8]); // Default range: [0, 8] means no filter

  // Debounced callback to prevent excessive updates
  const debouncedOnFilterChange = useRef(
    debounce((filter: NumberFilter) => {
      if (onFilterChange) {
        onFilterChange(filter);
      }
    }, 300) // 300ms delay
  ).current;

  useEffect(() => {
    const [low, high] = sliderValues;
    const actualLow = interpolate(low);
    const actualHigh = interpolate(high);

    // Initialize filter
    let filter: NumberFilter = {};

    if (low === 0 && high === 8) {
      // No filter applied
      filter = {};
    } else if (low > 0 && high === 8) {
      // Only low bound applied
      filter.gt = actualLow;
    } else if (low === 0 && high < 8) {
      // Only high bound applied
      filter.lte = actualHigh;
    } else if (low > 0 && high < 8) {
      // Both bounds applied
      filter.gte = actualLow;
      filter.lte = actualHigh;
    }

    //console.log('Filter:', filter);

    // Use debounced callback
    debouncedOnFilterChange(filter);

    // Cleanup on unmount
    return () => {
      debouncedOnFilterChange.cancel();
    };
  }, [sliderValues, debouncedOnFilterChange]);

  // Handle slider value changes
  const handleChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setSliderValues(newValue);
    }
  };

  // Function to determine if the slider is in 'no filter' state
  const isNoFilter = sliderValues[0] === 0 && sliderValues[1] === 8;

  // Function to reset the slider to 'no filter'
  const resetFilter = () => {
    setSliderValues([0, 8]);
  };

  return (
   
      <Slider
        aria-labelledby="range-slider"
        value={sliderValues}
        onChange={handleChange}
        step={0.01}
        min={0}
        max={8}
        marks={marks}
        valueLabelDisplay="auto"
        getAriaValueText={(value) => formatValue(value)}
        valueLabelFormat={(value) => formatValue(value)}
        disableSwap
        sx={{
          color: isNoFilter ? 'grey.500' : 'primary.main',
        }}
      />
     
      
   
  );
};

export default RangeSlider;
