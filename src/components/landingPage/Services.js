"use client"

import React, { useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import AOS from 'aos';
import 'aos/dist/aos.css';
const services = [
  {
    title: 'Custom Software Development',
    description: 'Tailored software solutions crafted to fit your unique business needs.',
    features: ['Custom-built software', 'Tailored development services'],
  },
  {
    title: 'Web Development Services',
    description: 'Build and maintain websites, ensuring optimal performance and experience.',
    features: ['Custom build', 'Integration', 'Optimal performance'],
  },
  {
    title: 'UI/UX Design Services',
    description: 'Design intuitive and user-friendly experiences.',
    features: ['UI/UX design focus', 'User-centric experiences'],
  },
  {
    title: 'Cyber Security',
    description: 'Security solutions to protect your digital assets and systems.',
    features: ['Threat prevention', 'Secure development'],
  },
  {
    title: 'AI-Powered Automation',
    description: 'Streamline operations and reduce manual effort with AI-driven automation.',
    features: ['Workflow automation', 'Efficiency boost'],
  },
  {
    title: 'Artificial Intelligence & Machine Learning',
    description: 'Leverage the power of AI/ML to enhance business operations.',
    features: ['AI systems', 'ML optimization'],
  },
];

const ServicesSection = () => {

useEffect(() => {
  AOS.init({
    duration: 1000,
    once: true, // animation should happen only once
  });
}, []);
  return (
    <Box
      sx={{
        px: { xs: 2, md: 8 },
        py: 6,
        // background: 'linear-gradient(to bottom right, #f0f8ff, #ffffff)',
      }}
    >
   
     <Box display='flex' alignItems={"center"} my={4} flexDirection={['column','column','row']}>
     <Box  width={["100%", "100%", "50%"]}>
        <Typography variant="h5" sx={{ fontWeight: 400, fontSize:'25px', bgcolor: 'black', color: 'white', display: 'inline-block', borderRadius: '16px', px: 2}}>
          Services
        </Typography>
        <Typography variant="h4" sx={{ fontSize: '30px', mb: 1 ,mt:2 }} data-aos="fade-left">
          We offer a range of professional services designed to help your{' '}
          <Box component="span" sx={{
            background: 'linear-gradient(90deg, rgba(244, 201, 97, 1) 0%, rgba(222, 107, 167, 1) 50%, rgba(72, 202, 228, 1) 100%)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontSize: '30px',
          }}>business grow and succeed</Box>

        </Typography>
        
      </Box>
      <Box width={["100%", "100%", "50%"]} data-aos="fade-right">
      <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto', fontSize:'20px' ,fontWeight:400}}>
          From website development and UI/UX design to AI solutions and digital consulting, we deliver innovative and customized strategies tailored to your needs.
        </Typography>
      </Box>

     </Box>

      <Grid container spacing={5}>
        {services.map((service, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index} data-aos="fade-up" data-aos-delay={index * 100}>
            <Card
              sx={{
                borderRadius: "60px",
                p: 2,
                maxHeight: '300px',
                minHeight: '300px',
                // background: 'linear-gradient(135deg, #ffffff 0%, #f0faff 100%)',
                boxShadow: 10,
                position: 'relative',
                display:"flex",
                flexDirection:"column",
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  cursor:"pointer",
                  boxShadow: 14,
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 400, mb: 1 ,fontSize:"25px"}}>
                  {service.title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, color: '#666',fontSize:"15px",fontWeight:400 }}>
                  {service.description}
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 400, mb: 1,fontSize:"15px" }}>
                  Features:
                </Typography>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {service.features.map((feature, idx) => (
                    <li key={idx}>
                      <Typography variant="body2" color={"black"} fontSize={"15px"} fontWeight={400}>
                        {feature}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <Box display={'flex'} justifyContent={'flex-end'} mt={"auto"} ml={-2} >
                <ArrowOutwardIcon sx={{ color: 'white', bgcolor: 'black', borderRadius: 10, p: 1 }} />

              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>


      <Box textAlign="center" mt={6}>
        <Button
          variant="contained"
          sx={{
            borderRadius: 20,
            px: 4,
            py: 1.5,
            // background: 'linear-gradient(to right, #6366f1, #ec4899)',
            backgroundColor:"black",
            color: '#fff',
            textTransform: 'none',
            fontWeight: 'bold',
            transition:"0.3s",
            border:"1px solid white",
            ":hover":{
              bgcolor:"white",
              color:"black",
              border:"1px solid black",
              transition:"0.3s"
            }
          }}
        >
          Read More
        </Button>
      </Box>
    </Box>
  );
};

export default ServicesSection;
