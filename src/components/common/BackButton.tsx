'use client';

import { Box, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Link from 'next/link';

interface BackButtonProps {
  href: string;
  label?: string;
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
}

export const BackButton: React.FC<BackButtonProps> = ({
  href,
  label = 'Back',
  variant = 'outlined',
  size = 'small',
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Link href={href} style={{ textDecoration: 'none', display: 'inline-block' }}>
        <Button variant={variant} size={size} startIcon={<ArrowBack />}>
          {label}
        </Button>
      </Link>
    </Box>
  );
};

