"use client";

import React, { useState, useEffect, useRef } from "react";
import { IconButton, LinearProgress, Stack, Typography, Box } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dynamic from "next/dynamic";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function Testimonials() {
 
  const testimonials = [
    {
      review:
        "MediLaser transformed my skincare experience. I felt safe and the results were amazing!",
      name: "Sarah Van Dijk",
      designation: "Client",
      profileImg: "/home/Testimonials-Profile.png",
    },
    {
      review:
        "From booking to results, everything was smooth and professional. Highly recommend!",
      name: "Liam de Jong",
      designation: "Client",
      profileImg: "/home/Testimonials-Profile.png",
    },
    {
      review:
        "From booking to results, everything was smooth and professional. Highly recommend!",
      name: "Liam de Jong",
      designation: "Client",
      profileImg: "/home/Testimonials-Profile.png",
    },
  ];

  const sliderRef = useRef(null);
  const progressPerSlide = 100 / testimonials.length;
  const [progress, setProgress] = useState(progressPerSlide);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setProgress((currentIndex + 1) * progressPerSlide);
  }, [currentIndex, progressPerSlide]);


  const settings = {
    dots: false,
    arrows: false,
    infinite: testimonials.length > 1,
    speed: 800,
    autoplay: testimonials.length > 1,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    afterChange: (index) => setCurrentIndex(index),
  };

  return (
    <Box px={{ xs: 3, md: 10 }} py={8} >
      <Typography variant="h4" textAlign="center" fontWeight={400} mb={1} fontSize={"40px"} >
        What people say
      </Typography>
      <Typography
        textAlign="center"
       
        mb={5}
        maxWidth={600}
        fontWeight={400}
        fontSize={"20px"}
        mx="auto"
      >
        Hear from our valued users about their experiences and how our
        solutions have made a difference in their lives.
      </Typography>


      <Stack
        direction={["column-reverse", "column-reverse", "row"]}
        justifyContent="center"
        alignItems="center"
        gap={[1, 1, 8]}
        py={5}
        px={[3, 3, 40]}
      >
   
        <Stack gap={2}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              width: "100%",
              mt: 2,
              height: 4,
              borderRadius: "5px",
              backgroundColor: "lightgray",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "var(--primary)",
              },
            }}
          />
          <Typography variant="h3" component="span">
            From Our <b style={{ color: "#48CAE4" }}>Community.</b>
          </Typography>
          <Typography>
            Empowering connections and sharing success stories from our community.
          </Typography>
          <Stack mt={2} direction="row" alignItems="center" justifyContent="center" gap={2}>
            <IconButton
              onClick={() => sliderRef.current?.slickPrev()}
              sx={{
                bgcolor: "white",
                color: "black",
                transition: "0.3s",
                "&:hover": { bgcolor: "black", color: "white" },
              }}
            >
              <ArrowBack />
            </IconButton>
            <IconButton
              onClick={() => sliderRef.current?.slickNext()}
              sx={{
                bgcolor: "white",
                color: "black",
                transition: "0.3s",
                "&:hover": { bgcolor: "black", color: "white" },
              }}
            >
              <ArrowForward />
            </IconButton>
          </Stack>
        </Stack>

       
        <Box maxWidth={400} minWidth={400} maxHeight={[400, 400, "auto"]} overflow="hidden">
          <Slider ref={sliderRef} {...settings}>
            {testimonials.map((t, idx) => (
              <Stack key={idx} spacing={3} p={3}>
                {/* <Image
                  src="/home/testimonals.png"
                  alt="Quotation Mark"
                  height={45}
                  width={50}
                  style={{
                    height:"30px",
                    width:"30px"
                  }}
                  priority  
                /> */}
                    <Image
      src="/home/testimonals.png" 
      alt="Quotation Mark"
      width={40}                  
      height={30}
      priority                    
    />
                <Typography
                  variant="h6"
                  sx={{
                    maxHeight: 150,
                    overflowY: "auto",
                    backgroundColor: "transparent",
                    scrollbarWidth: "thin",
                    "&::-webkit-scrollbar-button": { display: "none" },
                  }}
                >
                  {t.review}
                </Typography>
                <Stack direction="row" alignItems="center" gap={1}>
                  <Image src={t.profileImg} alt="Client Profile" height={50} width={50} />
                  <Stack>
                    <Typography fontWeight="bold">{t.name}</Typography>
                    <Typography color="var(--grey-review)" fontSize={14}>
                      {t.designation}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            ))}
          </Slider>
        </Box>
      </Stack>
    </Box>
  );
}
