'use client';

import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface EmptyStateProps {
  message: string;
  icon?: ReactNode;
  action?: ReactNode;
  title?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  icon,
  action,
  title,
}) => {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      {icon && (
        <Box sx={{ mb: 2, color: 'text.secondary' }}>
          {icon}
        </Box>
      )}
      {title && (
        <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
          {title}
        </Typography>
      )}
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
      {action && (
        <Box sx={{ mt: 3 }}>
          {action}
        </Box>
      )}
    </Box>
  );
};

