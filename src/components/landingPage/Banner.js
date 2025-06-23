import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';


const Banner = () => {
  return (
    <Box sx={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
    
      <video
        autoPlay
        muted
        loop
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Box
        sx={{
          position: 'absolute',
          width: ['100%', '100%', '50%'],
          height: '100%',
          top: 0,
          left: 0,
          backdropFilter: 'blur(10px)',
          background: 'rgba(255, 255, 255, 0.1)',

        }}
      />

   
      <Box
        sx={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: 2, md: 10 },
          zIndex: 1,
          color: 'white',
          width: ['95%', '95%', '50%'],
        }}
      >

        <Box>
          <Typography variant="h4" gutterBottom component={'h2'} fontSize={"25px"} fontWeight={400}>
            Start Your Vision with Us
          </Typography>
          <Typography
            variant="h2" component={'h1'}
            sx={{ fontWeight: 400, lineHeight: 1.2, mb: 2 ,fontSize:["50px", "60px", "70px"],   background: 'linear-gradient(90deg, rgba(244, 201, 97, 1) 0%, rgba(222, 107, 167, 1) 50%, rgba(72, 202, 228, 1) 100%)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',  }}
          >
            ONE TECH & AI <br />
            <Box
              component="span"
              sx={{
               
                color: 'white', 
                fontWeight: 400,
                fontSize:["35px", "45px", "55px"] 
              }}
            >
              SOLUTIONS
            </Box>

          </Typography>
          <Typography variant="body1" component={'h3'} sx={{ mb: 3, maxWidth: 400 }} fontSize={"16px"} fontWeight={400}>
            We'll take your ideas and turn them into impactful results that drive growth.
          </Typography>
          <Button
          href='/contact-us/'
          endIcon={<ArrowOutwardIcon sx={{bgcolor:'white', color:'black', borderRadius:10, padding:1}}/>}
            variant="outlined" 
            sx={{ borderRadius: '60px', color: 'white', borderColor: 'white' }}
          >
            Get Started
          </Button>
        </Box>

 
        <Grid container spacing={2} sx={{mt:4}}>
          <Grid size={{xs:6, md:2.5}}>
          <Typography variant="body2" fontSize={"25px"} fontWeight={400}>Data Coverage</Typography>

          </Grid>
          <Grid size={{xs:6, md:3}}>
          <Typography variant="h6" fontSize={"25px"} fontWeight={400}>25+</Typography>
          <Typography variant="body2" fontSize={"15px"} fontWeight={400}>Complete Projects</Typography>

          </Grid>
          <Grid size={{xs:6, md:2}}>
          <Typography variant="h6"  fontSize={"25px"} fontWeight={400}>20+</Typography>
          <Typography variant="body2" fontSize={"15px"} fontWeight={400}>Staff</Typography>

          </Grid>
          {/* <Grid size={{xs:6, md:2.5}} sx>
          <Typography variant="h6" fontSize={"25px"} fontWeight={400}>50K</Typography>
          <Typography variant="body2" fontSize={"15px"} fontWeight={400}>Complete Projects</Typography>
          </Grid> */}

        </Grid>
      </Box>
    </Box>
  );
};

export default Banner;
