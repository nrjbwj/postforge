'use client';

import { AppBar, Toolbar, Box, Button, IconButton, Typography } from '@mui/material';
import { Home, Description, Add, LightMode, DarkMode } from '@mui/icons-material';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useThemeMode } from '@/contexts/ThemeContext';

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { mode, toggleTheme } = useThemeMode();

  const navItems = [
    { label: 'Dashboard', path: '/', icon: Home },
    { label: 'Posts', path: '/posts', icon: Description },
  ];

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>
        {/* Logo and Brand */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8,
              },
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1.5,
                backgroundColor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: 0.5,
                  backgroundColor: 'primary.light',
                  position: 'absolute',
                  top: 4,
                  left: 4,
                }}
              />
            </Box>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              PostForge
            </Typography>
          </Box>
        </Link>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link key={item.path} href={item.path} style={{ textDecoration: 'none' }}>
                <Button
                  startIcon={<Icon />}
                  sx={{
                    color: 'text.primary',
                    backgroundColor: isActive ? 'action.selected' : 'transparent',
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    textTransform: 'none',
                    fontWeight: isActive ? 600 : 400,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => router.push('/posts/new')}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              px: 2,
            }}
          >
            New Post
          </Button>
          <IconButton
            onClick={toggleTheme}
            sx={{
              color: 'text.primary',
            }}
            aria-label="toggle theme"
          >
            {mode === 'dark' ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

