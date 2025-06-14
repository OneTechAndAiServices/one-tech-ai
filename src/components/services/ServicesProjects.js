import React from 'react'
import Image from 'next/image'
import { Box, Container, Grid, Typography, Button } from '@mui/material'
import 'aos/dist/aos.css'
import AOS from 'aos'
import { useEffect } from 'react'
export const ServicesProjects = () => {
  const gradientStops = ['#F4C961', '#DE6BA7', '#48CAE4'];
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration
      once: true,     // whether animation should happen only once
    })
  }, [])
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 12 },
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">

          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                sx={{ fontWeight: 500, fontSize: ["60px", "63px", "67px"] }}
                data-aos="fade-left"
              >
                ONE TECH & AI
              </Typography>
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: 500,
                  fontSize: ["60px", "63px", "67px"],
                  background: 'linear-gradient(90deg, #F4C961, #DE6BA7, #48CAE4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
                data-aos="fade-left"
              >
                SOLUTIONS
              </Typography>
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: 500,
                  fontSize: ['60px', '70px', '72px'],
                  background: `linear-gradient(90deg, ${gradientStops.join(', ')})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
                data-aos="fade-left"
              >
                PROJECTS
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: "#919191" }} data-aos="fade-left">
                Explore some of our most successful and impactful projects that demonstrate our expertise in delivering innovative solutions. Each project reflects our commitment to quality, creativity, and customer satisfaction, showcasing the real-world applications of our work.
              </Typography>
              <Button
                variant="outlined"
                size="large"
                color='inherit'
                sx={{
                  borderRadius: 10,
                  textTransform: 'none',
                  px: 4,
                  mt: 3
                }}
              >
                Explore Now
              </Button>
            </Box>
          </Grid>


          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: { xs: 240, sm: 320, md: 400 },
              }}
              data-aos="fade-right"
            >
              <Image
                src="/services-info.png"
                alt="Our solutions & projects"
                layout="fill"
                objectFit="contain"
                priority
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default ServicesProjects
