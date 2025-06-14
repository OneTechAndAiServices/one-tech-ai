"use client";

import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";


const servicesData = [
  {
    number: "01",
    title: "Custom Software Development",
    description:
      "We specialize in creating custom software solutions tailored to your unique business needs. From concept to deployment, our team works closely with you to design and develop scalable, secure, and high-performing applications. Whether it's automating workflows, building enterprise platforms, or crafting innovative digital products, we deliver software that fits seamlessly into your operations and drives real value.",
  },
  {
    number: "02",
    title: "Web Development Services",
    description:
      "Our web development services are designed to help businesses establish a strong, engaging, and reliable online presence. We craft responsive, high-performing websites with best practices, SEO, and optimal user experiences in mind. From front-end design to back-end development, our team builds to support your goals and scale with your business.",
  },
  {
    number: "03",
    title: "UI/UX Design Services",
    description:
      "We offer comprehensive UI/UX design services that focus on creating visually stunning and user-centric digital experiences. Our approach combines creativity with functionality, ensuring your website or app is both beautiful and easy to use. We design smart interfaces that enhance engagement and elevate the overall experience.",
  },
  {
    number: "04",
    title: "Artificial Intelligence & Machine Learning",
    description:
      "We specialize in leveraging Artificial Intelligence (AI) and Machine Learning (ML) to create intelligent, data-driven solutions that transform your business. From predicting customer behavior to automating processes and unlocking new efficiencies, our AI solutions deliver measurable value.",
  },
  {
    number: "05",
    title: "Cyber Security",
    description:
      "In today’s digital world, safeguarding your data and systems is more critical than ever. Our cyber security services are designed to protect your business from evolving threats. We provide comprehensive security solutions including risk assessments, threat response, vulnerability testing, and incident resolution.",
  },
  {
    number: "06",
    title: "AI-Powered Automation",
    description:
      "Our AI-powered automation solutions are designed to streamline your business operations, reduce costs, and improve efficiency. From intelligent workflows to predictive analytics, we help you automate tasks, improve decision-making, and stay competitive in a rapidly evolving market.",
  },
];

export const AllServices = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box px={[2, 4, 8]} py={[6, 8]}>
      <Grid container spacing={4}>
        {servicesData.map((service, index) => (
          <Grid size={{ xs:12, md:6}}  key={index}>
            <Box
              sx={{
                p: 3,
                mt: 2,
                // height: "100%",
                // border: "1px solid #e0e0e0",
                borderRadius: 2,
              }}
            >
              <Box display="flex" flexDirection={["column","column","row"]} alignItems="flex-start" gap={2}>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ fontSize: "75px", color: "black", fontWeight: 400 }}
                >
                  {service.number}
                </Typography>
                <Box sx={{borderTop:'3px solid black'}}>
                  <Typography variant="h6" sx={{ fontSize: "37px", color: "black", fontWeight: 400 }} mt={2} gutterBottom>
                    {service.title}
                  </Typography>
                  <Typography
                    variant="body2" sx={{ fontSize: "20px", color: "#9A9A9A", fontWeight: 400 }}
                    lineHeight={1.7}
                  >
                    {service.description}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AllServices;
