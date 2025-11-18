'use client';

import React, { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ActivityProvider } from '@/contexts/ActivityContext';
import { env } from '@/config/env';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: env.queryStaleTime,
            refetchOnWindowFocus: false,
            retry: env.queryRetry,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ActivityProvider>
          <SnackbarProvider
            maxSnack={env.snackbarMaxSnack}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            autoHideDuration={env.snackbarAutoHideDuration}
          >
            {children}
          </SnackbarProvider>
        </ActivityProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

