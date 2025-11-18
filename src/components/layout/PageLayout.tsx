'use client';

import { Box, Container } from '@mui/material';
import { ReactNode } from 'react';
import { Footer } from './Footer';

interface PageLayoutProps {
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  showFooter?: boolean;
  containerSx?: object;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  maxWidth = 'lg',
  showFooter = true,
  containerSx,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}
    >
      <Container maxWidth={maxWidth} sx={{ py: 4, flex: 1, ...containerSx }}>
        {children}
      </Container>
      {showFooter && <Footer />}
    </Box>
  );
};

