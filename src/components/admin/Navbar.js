"use client";
import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box, Avatar, Menu,
  MenuItem, Divider, ListItemIcon, IconButton, Drawer, List,
  ListItem, ListItemText, ListItemIcon as MuiListItemIcon, useMediaQuery,
  CircularProgress, Backdrop
} from '@mui/material';
import {
  Dashboard, People, Notifications, Settings, Logout, Menu as MenuIcon,
  Newspaper
} from '@mui/icons-material';
import { styled, alpha, useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1a237e 0%, #283593 50%, #3949ab 100%)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  padding: theme.spacing(0, 2),
  transition: 'all 0.3s ease',
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  margin: theme.spacing(0, 1),
  padding: theme.spacing(1, 2),
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    transform: 'translateY(-2px)',
    '&::after': {
      transform: 'translateX(0)',
    }
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 2,
    background: theme.palette.secondary.main,
    transform: 'translateX(-100%)',
    transition: 'transform 0.3s ease',
  },
  '&.active': {
    '&::after': {
      transform: 'translateX(0)',
    }
  }
}));

const AnimatedChevron = ({ active }) => (
  <motion.div
    animate={{ 
      x: active ? 5 : 0,
      rotate: active ? 90 : 0
    }}
    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    style={{ fontSize: '0.8rem' }}
  >
    ▶
  </motion.div>
);

const LoadingBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: '#fff',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
}));

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const pathname = usePathname();

  const open = Boolean(anchorEl);

  const navItems = [
    // { label: 'Dashboard', icon: <Dashboard />, value: 'dashboard', route: "/admin-dashboard" },
    { label: 'Users', icon: <People />, value: 'users', route: "/admin-users" },
    // { label: 'Timings', icon: <Notifications />, value: 'timings', route: "/admin-timings" },
    { label: 'Products', icon: <Settings />, value: 'settings', route: "/admin-products" },
    { label: 'News', icon: <Newspaper />, value: 'news', route: "/admin-news" },
  ];

  // Set active tab based on current route
 useEffect(() => {
  const currentRoute = navItems.find(item => pathname?.startsWith(item.route));
  if (currentRoute) {
    setActiveTab(currentRoute.value);
  }
}, [pathname]);


  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const handleNavigation = (route, tab) => {
    setLoading(true);
    setActiveTab(tab);
    setDrawerOpen(false);
    
    // Simulate network delay for demo purposes
    setTimeout(() => {
      router.push(route);
      setLoading(false);
    }, 800);
  };

  return (
    <>
      <StyledAppBar position="sticky">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isMobile && (
              <IconButton 
                color="inherit" 
                edge="start" 
                onClick={() => setDrawerOpen(true)}
                aria-label="Open menu"
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" sx={{
              ml: 1,
              fontWeight: 700,
              background: 'linear-gradient(45deg, #ffffff 30%, #bbdefb 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)'
              }
            }} onClick={() => handleNavigation('/admin-dashboard', 'dashboard')}>
              Admin Dashboard
            </Typography>
          </Box>

          {!isMobile && (
            <Box sx={{ 
              display: 'flex', 
              position: 'absolute', 
              left: '50%', 
              transform: 'translateX(-50%)',
              overflow: 'hidden'
            }}>
              {navItems.map(item => (
                <NavButton
                  key={item.value}
                  startIcon={item.icon}
                  endIcon={<AnimatedChevron active={activeTab === item.value} />}
                  onClick={() => handleNavigation(item.route, item.value)}
                  className={activeTab === item.value ? 'active' : ''}
                  aria-label={item.label}
                >
                  {item.label}
                </NavButton>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton 
              onClick={handleMenuOpen} 
              size="small" 
              sx={{ ml: 2 }}
              aria-label="User menu"
              aria-controls="user-menu"
              aria-haspopup="true"
            >
              <Avatar sx={{
                width: 36,
                height: 36,
                background: 'linear-gradient(45deg, #ff6b6b 0%, #ffa3a3 100%)',
                boxShadow: '0 2px 10px rgba(255, 107, 107, 0.5)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)'
                }
              }}>A</Avatar>
            </IconButton>
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              PaperProps={{
                elevation: 4,
                sx: {
                  overflow: 'visible',
                  mt: 1.5,
                  minWidth: 200,
                  borderRadius: '12px',
                  '& .MuiAvatar-root': { 
                    width: 32, 
                    height: 32, 
                    ml: -0.5, 
                    mr: 1,
                    transition: 'all 0.3s ease'
                  },
                  '& .MuiMenuItem-root': {
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      transform: 'translateX(5px)'
                    }
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleMenuClose}>
                <Avatar /> 
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  Profile
                </motion.div>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  Logout
                </motion.div>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </StyledAppBar>

      {/* Responsive Drawer */}
      <Drawer 
        anchor="left" 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            background: 'linear-gradient(135deg, #1a237e 0%, #283593 50%, #3949ab 100%)',
            color: 'white',
          }
        }}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {navItems.map(item => (
              <ListItem 
                key={item.value} 
                button 
                onClick={() => handleNavigation(item.route, item.value)}
                sx={{
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.common.white, 0.15),
                  },
                  backgroundColor: activeTab === item.value ? alpha(theme.palette.common.white, 0.2) : 'transparent',
                  transition: 'all 0.3s ease',
                }}
              >
                <MuiListItemIcon sx={{ color: 'white' }}>
                  {item.icon}
                </MuiListItemIcon>
                <ListItemText 
                  primary={item.label} 
                  primaryTypographyProps={{
                    fontWeight: activeTab === item.value ? 'bold' : 'normal',
                    variant: 'body1'
                  }}
                />
                {activeTab === item.value && (
                  <AnimatedChevron active={true} />
                )}
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Page Transition Loader */}
      <AnimatePresence>
        {loading && (
          <LoadingBackdrop open={loading}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <CircularProgress color="inherit" size={60} thickness={4} />
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Typography variant="h6" color="inherit">
                  Loading...
                </Typography>
              </motion.div>
            </motion.div>
          </LoadingBackdrop>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
