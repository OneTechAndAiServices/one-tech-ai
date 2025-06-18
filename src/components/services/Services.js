"use client";

import {
  Box,
  Typography,
  Stack,
  Chip,
  Grid,
  Card,
  CardContent,
  IconButton,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AllServices from "./AllServices";
import ServicesProjects from "./ServicesProjects";
import 'aos/dist/aos.css'
import AOS from 'aos'
import { useEffect } from 'react'

const services = [
  {
    title: "Web Development Services",
    description:
      "We build fast, secure, and scalable websites tailored to your business goals. From responsive design to robust backend development.",
    direction: "right",
  },
  {
    title: "Artificial Intelligence & Machine Learning",
    description:
      "We build fast, secure, and scalable websites tailored to your business goals. From responsive design to robust backend development.",
    direction: "right",
  },
  {
    title: "UI/UX Design Services",
    description:
      "We build fast, secure, and scalable websites tailored to your business goals. From responsive design to robust backend development.",
    direction: "left",
  },
  {
    title: "Custom Software Development",
    description:
      "We build fast, secure, and scalable websites tailored to your business goals. From responsive design to robust backend development.",
    direction: "left",
  },
];

export default function ServicesSection() {
  const theme = useTheme();
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration
      once: true,     // whether animation should happen only once
    })
  }, [])
  return (
    <Box>

      {/* <Box
        py={8}
        px={2}
        textAlign="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
       

        <Typography variant="h4" fontWeight="bold" sx={{
          fontSize: "60px", fontWeight: 500, bgcolor: "black", background: 'linear-gradient(90deg, rgba(244, 201, 97, 1) 0%, rgba(222, 107, 167, 1) 50%, rgba(72, 202, 228, 1) 100%)',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        }}
        data-aos="fade-right">
          Services
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: "black" }}
          maxWidth={600}
          mx="auto"
          lineHeight={1.7}
          data-aos="fade-left"
        >
          We provide cutting-edge AI services designed to help businesses harness the power of artificial intelligence for smarter, faster, and more efficient operations.
        </Typography>
      </Box> */}


      <Box px={[2, 4, 10]} py={8}>
        <Grid container spacing={4} justifyContent="center" alignItems="center">

          <Grid size={{ xs: 12, md: 4 }}>
            <Grid container spacing={4} direction="column">
              {services
                .filter((s) => s.direction === "right")
                .map((service, idx) => (
                  <Grid item key={idx}>
                    <Card
                      variant="outlined"
                      sx={{
                        borderRadius: 3,
                        px: 2,
                        py: 2,
                        boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
                      }}
                    >
                      <CardContent>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Typography variant="h6" fontWeight="bold" sx={{ fontSize: "22px", fontWeight: 400 }}>
                            {service.title}
                          </Typography>
                          <IconButton>
                            <ArrowForwardIcon />
                          </IconButton>
                        </Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          mt={1}
                          fontSize={14}
                        >
                          {service.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Grid>


          <Grid size={{ xs: 12, md: 4 }} display="flex" flexDirection="column" alignItems="center">
            <Box position="relative" mb={2}>
              <Image
                src="/services-center.png"
                alt="Innovation Visual"
                width= {400}
                height={400}
                // objectFit="contain"
              />
            </Box>
            <Typography
              variant="h6"
              fontWeight="bold"
              textAlign="center"
              sx={{
                mt: -15,

                backdropFilter: 'blur(10px)',
                background: 'rgba(255, 255, 255, 0.1)',
                fontSize: "30px",
                fontWeight: 300
              }}
            >
              WHERE INTELLIGENCE MEETS INNOVATION.
            </Typography>
          </Grid>


          <Grid size={{ xs: 12, md: 4 }}>
            <Grid container spacing={4} direction="column">
              {services
                .filter((s) => s.direction === "left")
                .map((service, idx) => (
                  <Grid item key={idx}>
                    <Card
                      variant="outlined"
                      sx={{
                        borderRadius: 3,
                        px: 2,
                        py: 2,
                        boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
                      }}
                    >
                      <CardContent>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <IconButton>
                            <ArrowBackIcon />
                          </IconButton>
                          <Typography variant="h6" fontWeight="bold" sx={{ fontSize: "22px", fontWeight: 400 }}>
                            {service.title}
                          </Typography>

                        </Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          mt={1}
                          fontSize={14}
                        >
                          {service.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <AllServices />
      <ServicesProjects />
    </Box>

  );
}
