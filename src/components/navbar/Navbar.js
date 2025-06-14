

'use client';

import React, { useState, useEffect } from 'react';
import {
  Toolbar,
  IconButton,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();
  const isHome = pathname === '/';

  const navItems = [
    { title: 'Home', route: '/' },
    { title: 'Services', route: '/services' },
    { title: 'Products', route: '/products' },
    { title: 'E-learning', route: '/e-learning' },
    { title: 'News & Blogs', route: '/blogs' },
    { title: 'Contact Us', route: '/contact-us' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolling(window.scrollY > 100);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Determine colors & shadow
  const bgColor = isHome
    ? scrolling
      ? 'white'
      : 'transparent'
    : 'white';
  const textColor = isHome
    ? scrolling
      ? 'black'
      : 'white'
    : 'black';
  const shadow = isHome
    ? scrolling
      ? 3
      : 0
    : 3;

  return (
    <Box maxWidth="1600px" mx="auto">
      <Box
        component="nav"
        position="fixed"
        top={0}
        left={0}
        right={0}
        width="100%"
        sx={{
          pl: [2, 3, 5],
          maxWidth: '1400px',
          mx: 'auto',
          bgcolor: bgColor || 'pink',
          color: textColor,
          boxShadow: shadow,
          transition: 'background-color 0.3s, color 0.3s',
          zIndex: theme.zIndex.appBar,           // <-- ensure navbar sits on top
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box
            component={Link}
            href="/"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Box
              component="img"
              src="/logo.png"
              alt="Logo"
              sx={{ width: 80, height: 80 }}
            />
          </Box>

          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>

              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                ModalProps={{ keepMounted: true }}
              >
                <Box
                  sx={{ width: 250 }}
                  role="presentation"
                  onClick={() => setDrawerOpen(false)}
                  onKeyDown={() => setDrawerOpen(false)}
                >
                    <Box
            component={Link}
            href="/"
            sx={{ display: 'flex', alignItems: 'center' ,bgcolor:"lightgray"}}
          >
            <Box
              component="img"
              src="/logo.png"
              alt="Logo"
              sx={{ width: 80, height: 80 }}
            />
          </Box>
                  <List>
                    {navItems.map((item) => (
                      <ListItem
                        button
                        key={item.route}
                        component={Link}
                        href={item.route}
                        sx={{color:"black"}}
                      >
                        <ListItemText primary={item.title} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 3, mr: 5, alignItems: 'center' }}>
              {navItems.map((item) => (
               <Box key={item.route}>
                 <Link
                  
                  href={item.route}
                  passHref
                  style={{ textDecoration: 'none' }}
                >
                  <Typography
                    sx={{
                      cursor: 'pointer',
                      fontWeight: 500,
                      color: textColor, 
                      transition: '0.3s',
                      ":hover": {
                        bgcolor: '#257a9d',
                        color: 'white', 
                        px: 2,
                        borderRadius: 4,
                        transition: '0.3s'
                      }
                    }}
                  >
                    {item.title}
                  </Typography>
                </Link>

               </Box>
              ))}

              {/* <Button
                variant="outlined"
                sx={{
                  textTransform: 'none',
                  borderRadius: 1,
                  borderColor: textColor,
                  color: textColor,
                }}
              >
                Login
              </Button> */}
            </Box>
          )}
        </Toolbar>
      </Box>
    </Box>
  );
}
