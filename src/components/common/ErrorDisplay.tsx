'use client';

import { Box, Typography, Button, Alert } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

interface ErrorDisplayProps {
  message: string;
  title?: string;
  onRetry?: () => void;
  action?: React.ReactNode;
  variant?: 'text' | 'alert';
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  message,
  title,
  onRetry,
  action,
  variant = 'text',
}) => {
  if (variant === 'alert') {
    return (
      <Alert
        severity="error"
        action={
          <>
            {onRetry && (
              <Button color="inherit" size="small" onClick={onRetry}>
                Retry
              </Button>
            )}
            {action}
          </>
        }
        icon={<ErrorOutline />}
      >
        {title && <Typography variant="subtitle2" fontWeight={600}>{title}</Typography>}
        <Typography variant="body2">{message}</Typography>
      </Alert>
    );
  }

  return (
    <Box sx={{ py: 4 }}>
      {title && (
        <Typography variant="h6" component="h2" gutterBottom color="error" fontWeight={600}>
          {title}
        </Typography>
      )}
      <Typography variant="body1" color="error">
        {message}
      </Typography>
      {(onRetry || action) && (
        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          {onRetry && (
            <Button variant="contained" onClick={onRetry}>
              Retry
            </Button>
          )}
          {action}
        </Box>
      )}
    </Box>
  );
};

