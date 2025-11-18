'use client';

import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import { Home, Description, Add, LightMode, DarkMode, Menu, Close } from '@mui/icons-material';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useThemeMode } from '@/contexts/ThemeContext';

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { mode, toggleTheme } = useThemeMode();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/', icon: Home },
    { label: 'Posts', path: '/posts', icon: Description },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      suppressHydrationWarning
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
        height: '64px',
        minHeight: '64px',
        maxHeight: '64px',
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          gap: 2,
          pl: {
            xs: 2,
            sm: 3,
          },
          pr: {
            xs: 2,
            sm: 3,
          },
          maxWidth: 'lg',
          mx: 'auto',
          width: '100%',
          alignItems: 'center',
          alignContent: 'center',
          minHeight: '64px',
          height: '64px',
          maxHeight: '64px',
          paddingTop: 0,
          paddingBottom: 0,
        }}
      >
        {/* Logo and Brand */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              cursor: 'pointer',
              alignSelf: 'center',
              flexShrink: 0,
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
                flexShrink: 0,
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
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              PostForge
            </Typography>
          </Box>
        </Link>

        {/* Navigation Links - Desktop */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            justifyContent: 'center',
            minWidth: 0,
            width: '100%',
            visibility: { xs: 'hidden', md: 'visible' },
            pointerEvents: { xs: 'none', md: 'auto' },
            height: '36px',
            alignSelf: 'center',
          }}
        >
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
                    height: '36px',
                    minHeight: '36px',
                    maxHeight: '36px',
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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 1,
            width: '100%',
            alignSelf: 'center',
            flexShrink: 0,
          }}
        >
          {/* New Post Button - Desktop with text, Mobile icon only */}
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => router.push('/posts/new')}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              px: 2,
              minWidth: '120px',
              width: '120px',
              height: '36px',
              minHeight: '36px',
              maxHeight: '36px',
              justifyContent: 'center',
              display: { xs: 'none', sm: 'flex' },
              '& .MuiButton-startIcon': {
                margin: '0 8px 0 -4px',
              },
            }}
          >
            <Box
              component="span"
              sx={{
                fontSize: '0.875rem',
              }}
            >
              New Post
            </Box>
          </Button>
          {/* Mobile New Post Icon Button */}
          <IconButton
            color="primary"
            onClick={() => router.push('/posts/new')}
            sx={{
              display: { xs: 'flex', sm: 'none' },
              backgroundColor: 'primary.main',
              color: 'white',
              width: '40px',
              height: '40px',
              minWidth: '40px',
              flexShrink: 0,
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
            aria-label="new post"
          >
            <Add />
          </IconButton>

          {/* Theme Toggle */}
          <IconButton
            onClick={toggleTheme}
            sx={{
              color: 'text.primary',
              width: '40px',
              height: '40px',
              minWidth: '40px',
              flexShrink: 0,
            }}
            aria-label="toggle theme"
          >
            {mode === 'dark' ? <LightMode /> : <DarkMode />}
          </IconButton>

          {/* Mobile Menu Button */}
          <IconButton
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{
              color: 'text.primary',
              width: '40px',
              height: '40px',
              minWidth: '40px',
              flexShrink: 0,
              ml: 1,
              display: { xs: 'flex', md: 'none' },
            }}
          >
            <Menu />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={600}>
            Menu
          </Typography>
          <IconButton onClick={handleDrawerToggle}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <ListItem key={item.path} disablePadding>
                <Link
                  href={item.path}
                  style={{ textDecoration: 'none', width: '100%', color: 'inherit' }}
                  onClick={handleDrawerToggle}
                >
                  <ListItemButton
                    selected={isActive}
                    sx={{
                      backgroundColor: isActive ? 'action.selected' : 'transparent',
                      '&.Mui-selected': {
                        backgroundColor: 'action.selected',
                        '&:hover': {
                          backgroundColor: 'action.selected',
                        },
                      },
                    }}
                  >
                    <ListItemIcon>
                      <Icon color={isActive ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: isActive ? 600 : 400,
                      }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </AppBar>
  );
};

