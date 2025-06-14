"use client";

import {
  Box,
  Typography,
  Stack,
  Chip,
  

  useTheme,
} from "@mui/material";
import Image from "next/image";
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

export default function ProductList() {
  const theme = useTheme();
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration
      once: true,     // whether animation should happen only once
    })
  }, [])
  return (
    <Box>
    
      <Box
        py={8}
        px={2}
        textAlign="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {/* <Chip
          icon={
            <Image
              src="/services-icon.png" 
              alt="Our Services"
              width={20}
              height={20}
              style={{height:"25px",width:"25px"}}
            />
          }
          label="Products"
          sx={{
            bgcolor: "#FFFF",
            border:"1px solid lightgray",
            color: "#000",
            fontSize:"15px",
            fontWeight: 500,
            mb: 2,
            px: 1.5,
            py: 0.5,
            borderRadius: "16px",
          }}
        /> */}

        <Typography variant="h4" fontWeight="bold" sx={{fontSize:"50px",fontWeight:400}} data-aos="fade-left">
          Products
        </Typography>

        <Typography
          variant="body1"
         sx={{color:"black"}}
          maxWidth={600}
          mx="auto"
          lineHeight={1.7}
          data-aos="fade-right"
        >
        We are offering our products 
        </Typography>
      </Box>


     
    </Box>
    
  );
}
  