'use client';

import { Box, Typography } from '@mui/material';

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        mt: 'auto',
        textAlign: 'center',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        PostForge Dashboard © 2025 - Built with React & TanStack Query
      </Typography>
    </Box>
  );
};

