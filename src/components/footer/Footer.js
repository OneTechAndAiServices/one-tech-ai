import React from 'react';
import { Box, Typography, Grid, Link, IconButton } from '@mui/material';
import { EmailOutlined, Facebook, Instagram, LinkedIn, PhoneOutlined } from '@mui/icons-material';
import Image from 'next/image';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        color: 'black',
        px: { xs: 3, md: 10 },
        py: 5,
        borderTop: '1px solid #ccc',
      }}
    >
      <Grid container spacing={4} justifyContent='center'>

        <Grid size={{ xs: 12, md: 3.8 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, justifyContent: 'center' }}>
            <Box
              component="img"
              src="/logo1.png"
              alt="Logo"
              sx={{ width: '60px', height: '60px', mx: 'auto' }}
            />
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
              <IconButton>
                <Link href="https://www.facebook.com/share/1CKEPjwrZe/" underline="none" color="inherit">
                <Facebook />
                </Link>
              </IconButton>
              <IconButton>
                <Link href="https://www.instagram.com/one.tech.and.ai?igsh=MjF2bXU1M280anQ3" underline="none" color="inherit">
                <Instagram />
                </Link>
                
              </IconButton>
              <IconButton>
                <Link href="https://www.linkedin.com/company/one-tech-and-ai/posts/?feedView=all" underline="none" color="inherit">
                <LinkedIn />
                </Link>
              </IconButton>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 1.5 }}>
          <Typography fontWeight="bold" mb={1}>
            Quick Links
          </Typography>
          <Link href="#" underline="none" color="inherit" display="block">
            <Typography variant="body2" mb={1}>Home</Typography>
          </Link>
          <Link href="#" underline="none" color="inherit" display="block">
            <Typography variant="body2" mb={1}>About Us</Typography>
          </Link>
          <Link href="#" underline="none" color="inherit" display="block">
            <Typography variant="body2" mb={1}>Services</Typography>
          </Link>
          <Link href="#" underline="none" color="inherit" display="block">
            <Typography variant="body2" mb={1}>Company</Typography>
          </Link>
          
          <Link href="/login" underline="none" color="inherit" display="block">
            <Typography variant="body2" mb={1}>Login</Typography>
          </Link>
        </Grid>

        <Grid size={{ xs: 12, md: 1.5 }}>
          <Typography fontWeight="bold" mb={1}>
            Site Map
          </Typography>
          <Link href="#" underline="none" color="inherit" display="block">
            <Typography variant="body2" mb={1}>Career</Typography>
          </Link>
          <Link href="#" underline="none" color="inherit" display="block">
            <Typography variant="body2" mb={1}>Internships</Typography>
          </Link>
          <Link href="#" underline="none" color="inherit" display="block">
            <Typography variant="body2" mb={1}>News and Blogs</Typography>
          </Link>
          <Link href="#" underline="none" color="inherit" display="block">
            <Typography variant="body2" mb={1}>E-learning</Typography>
          </Link>
        </Grid>

        <Grid size={{ xs: 12, md: 1.8 }}>
          <Typography fontWeight="bold" mb={1}>
            Presence
          </Typography>

          <Box display="flex" alignItems="center" mb={1}>
            <Typography variant="body2" mr={1}>UK</Typography>
            <Box
              component="img"
              src="/flags/uk.png"
              alt="UK Flag"
              sx={{ width: 15, height: 15 }}
            />
          </Box>

          <Box display="flex" alignItems="center" mb={1}>
            <Typography variant="body2" mr={1}>Germany</Typography>
            <Box
              component="img"
              src="/flags/germany.png"
              alt="Germany Flag"
              sx={{ width: 15, height: 15 }}
            />
          </Box>

          <Box display="flex" alignItems="center" mb={1}>
            <Typography variant="body2" mr={1}>Netherlands</Typography>
            <Box
              component="img"
              src="/flags/netherlands.png"
              alt="Netherlands Flag"
              sx={{ width: 15, height: 15 }}
            />
          </Box>

          <Box display="flex" alignItems="center" mb={1}>
            <Typography variant="body2" mr={1}>Ireland</Typography>
            <Box
              component="img"
              src="/flags/ireland.png"
              alt="Ireland Flag"
              sx={{ width: 15, height: 15 }}
            />
          </Box>
        </Grid>


        <Grid size={{ xs: 12, md: 3 }}>
          <Typography fontWeight="bold" mb={1}>
            Contact Us
          </Typography>
         

          <Link
            href="https://www.google.com/maps/place/85+Great+Portland+Street,+London+W1W+7LT,+UK"
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            color="inherit"
          >
            <Typography variant="body2" mb={1}>
              Head Office: <br />
              One Tech & AI (UK) Ltd. <br />
              85 Great Portland Street First Floor <br />
              London W1W 7LT <br />
              United Kingdom
            </Typography>
          </Link>

           <Link href="mailto:info@onetechandai.com" underline="none" color="inherit" style={{display:'flex', alignItems:'center'}}>
           <EmailOutlined sx={{fontSize: 22, mr: 1 }}/>
            <Typography variant="body2" >
               info@onetechandai.com
            </Typography>
          </Link>

          <Link href="tel:+447772198009" underline="none" color="inherit" style={{display:'flex', alignItems:'center'}}>
          <PhoneOutlined sx={{fontSize: 22, mr: 1 }}/>
            <Typography variant="body2" >
               +44(0)7772 198009
            </Typography>
          </Link>

        </Grid>
      </Grid>

      <Box display='flex' justifyContent={'flex-start'} mt={2}>
        <Image
          src={'/dmca.png'}
          alt='no image found'
          width={100}
          height={100}
          style={{
            width: '100px',
            height: '50px'
          }} />

      </Box>

      <Box
        sx={{
          mt: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid #ccc',
          pt: 2,
          flexWrap: 'wrap',
        }}
      >
        <Box display='flex'>
        <Typography mx={1} fontSize={'14px'}>Privacy Policy</Typography>
        <Typography mx={1} fontSize={'14px'}>Cookies Policy</Typography>
        <Typography mx={1} fontSize={'14px'}>Terms Of Use</Typography>
        </Box>
        <Typography fontSize={'14px'}>© One Tech and AI UK Corporation, All Rights Reserved</Typography>


      </Box>
    </Box>
  );
};

export default Footer;
