"use client";

import {
  Box,
  Typography,
  Stack,
  Chip,
  

  useTheme,
} from "@mui/material";
import Image from "next/image";



export default function LearningTitle() {
  const theme = useTheme();

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
     

        <Typography variant="h4" fontWeight="bold" sx={{fontSize:"50px",fontWeight:400}}>
          E-Learning
        </Typography>

        <Typography
          variant="body1"
         sx={{color:"black"}}
          maxWidth={600}
          mx="auto"
          lineHeight={1.7}
        >
        E-learning, or electronic learning, refers to the use of digital technologies to access educational content outside of a traditional classroom.
        </Typography>
      </Box>


     
    </Box>
    
  );
}
 