// components/Paginator.tsx
'use client'; // This must be the first line

import { Pagination, Stack } from "@mui/material";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const Paginator: React.FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const getPageCount = searchParams.get("pageCount");
  const getPage = searchParams.get("page");

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    console.log("page:", page);

    // Update the URL with the new page number
    //const params = new URLSearchParams(searchParams.toString());
    // params.set('page', page.toString());
    // router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Stack spacing={2} alignItems="center" marginY={4}>
      <Pagination
        count={getPageCount ? parseInt(getPageCount) : 1}
        page={getPage ? parseInt(getPage) : 1}
        onChange={handleChange}
        color="primary"
        size="small"
      />
    </Stack>
  );
};

export default Paginator;
