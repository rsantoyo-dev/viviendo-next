// components/Paginator.tsx
'use client'; // This must be the first line

import { Palette } from "@mui/icons-material";
import { Pagination, Stack, useTheme } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation"; // Use 'next/navigation' for App Router
import { FC } from "react";

type PaginatorProps = {
  currentPage: number;
  totalPages: number;
};

const Paginator: FC<PaginatorProps> = ({ currentPage, totalPages }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {

    // Update the URL with the new page number
    // const params = new URLSearchParams(searchParams.toString());
    // params.set('page', value.toString());
    // router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <Stack spacing={2} alignItems="center" marginY={4}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        color="primary"
        size="small" />
      
    </Stack>
  );
};

export default Paginator;
