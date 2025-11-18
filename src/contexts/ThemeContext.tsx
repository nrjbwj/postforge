'use client';

import React, { createContext, useContext, useState, useMemo, useEffect, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { env } from '@/config/env';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

const THEME_STORAGE_KEY = 'app-theme-mode';

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Always start with env default for SSR
  const [mode, setMode] = useState<ThemeMode>(env.defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage after component mounts (client-side only)
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      // This is a valid pattern for Next.js client-side hydration
      setMode(savedTheme);
    }
    setMounted(true);
  }, []);

  // Persist theme to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(THEME_STORAGE_KEY, mode);
    }
  }, [mode, mounted]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const contextValue = useMemo(
    () => ({ mode, toggleTheme }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            // hsl(217 91% 60%)
            main: '#3b82f6',
            light: '#60a5fa',
            dark: '#2563eb',
          },
          secondary: {
            // Light: hsl(210 40% 96%), Dark: hsl(217 33% 20%)
            main: mode === 'dark' ? '#2d3748' : '#e2e8f0',
            light: mode === 'dark' ? '#374151' : '#f1f5f9',
            dark: mode === 'dark' ? '#1e293b' : '#cbd5e1',
          },
          error: {
            // Light: hsl(0 84% 60%), Dark: hsl(0 63% 31%)
            main: mode === 'dark' ? '#991b1b' : '#ef4444',
            light: mode === 'dark' ? '#b91c1c' : '#f87171',
            dark: mode === 'dark' ? '#7f1d1d' : '#dc2626',
          },
          success: {
            // hsl(142 71% 45%)
            main: '#10b981',
            light: '#34d399',
            dark: '#059669',
          },
          warning: {
            // hsl(38 92% 50%)
            main: '#f59e0b',
            light: '#fbbf24',
            dark: '#d97706',
          },
          info: {
            // hsl(199 89% 48%)
            main: '#0ea5e9',
            light: '#38bdf8',
            dark: '#0284c7',
          },
          background: {
            // Light: hsl(210 20% 98%), Dark: hsl(222 47% 11%)
            default: mode === 'dark' ? '#0f172a' : '#f8fafc',
            // Light: hsl(0 0% 100%), Dark: hsl(222 47% 15%)
            paper: mode === 'dark' ? '#1e293b' : '#ffffff',
          },
          text: {
            // Light: hsl(222 47% 11%), Dark: hsl(210 40% 98%)
            primary: mode === 'dark' ? '#f1f5f9' : '#0f172a',
            // Light: hsl(215 16% 47%), Dark: hsl(215 20% 65%)
            secondary: mode === 'dark' ? '#94a3b8' : '#64748b',
          },
          divider: mode === 'dark' ? 'rgba(45, 55, 72, 0.12)' : 'rgba(214, 232, 240, 0.08)',
        },
        typography: {
          fontFamily: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          h1: {
            fontWeight: 700,
            letterSpacing: '-0.02em',
          },
          h2: {
            fontWeight: 700,
            letterSpacing: '-0.01em',
          },
          h3: {
            fontWeight: 600,
            letterSpacing: '-0.01em',
          },
          h4: {
            fontWeight: 600,
            letterSpacing: '-0.01em',
          },
          h5: {
            fontWeight: 600,
          },
          h6: {
            fontWeight: 600,
          },
          button: {
            fontWeight: 500,
            letterSpacing: '0.01em',
          },
        },
        shape: {
          borderRadius: 12,
        },
        shadows: mode === 'dark'
          ? [
              'none',
              '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
              '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.4)',
              '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.4)',
              '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.4)',
              '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.4)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            ]
          : [
              'none',
              '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
              '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
              '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
              '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            ],
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 500,
                borderRadius: 10,
                padding: '10px 20px',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  // Using primary color: hsl(217 91% 60%) = #3b82f6 = rgb(59, 130, 246)
                  boxShadow: '0 10px 20px -5px rgba(59, 130, 246, 0.3)',
                },
              },
              contained: {
                boxShadow: 'none',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
                transition: 'all 0.3s ease-in-out',
              },
              elevation1: {
                boxShadow: mode === 'dark'
                  ? '0 1px 3px 0 rgba(0, 0, 0, 0.4)'
                  : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              },
              elevation2: {
                boxShadow: mode === 'dark'
                  ? '0 4px 6px -1px rgba(0, 0, 0, 0.4)'
                  : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              },
              elevation3: {
                boxShadow: mode === 'dark'
                  ? '0 10px 15px -3px rgba(0, 0, 0, 0.4)'
                  : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 16,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: mode === 'dark'
                    ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)'
                    : '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                },
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                '& .MuiOutlinedInput-root': {
                  borderRadius: 10,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                  },
                  '&.Mui-focused': {
                    transform: 'translateY(-1px)',
                  },
                },
              },
            },
          },
          MuiTableRow: {
            styleOverrides: {
              root: {
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  // Using primary color: hsl(217 91% 60%) = #3b82f6 = rgb(59, 130, 246)
                  backgroundColor: mode === 'dark'
                    ? 'rgba(59, 130, 246, 0.08)'
                    : 'rgba(59, 130, 246, 0.04)',
                  transform: 'scale(1.001)',
                },
              },
            },
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

