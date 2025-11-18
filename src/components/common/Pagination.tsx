'use client';

import { Box, Pagination as MuiPagination, Stack, Typography } from '@mui/material';

interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  showCount?: boolean;
  scrollToTop?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'standard';
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  showCount = true,
  scrollToTop = true,
  size = 'large',
  color = 'primary',
}) => {
  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const startItem = totalItems > 0 ? (page - 1) * itemsPerPage + 1 : 0;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Stack spacing={2}>
        <MuiPagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color={color}
          showFirstButton
          showLastButton
          size={size}
        />
        {showCount && (
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Showing {startItem} - {endItem} of {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

