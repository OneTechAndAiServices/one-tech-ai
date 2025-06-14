import { Box, Chip, Typography } from '@mui/material'
import React from 'react'
import ContactForm from '../landingPage/ContactUs'
import Testimonials from '../landingPage/Testimonals'
import Image from 'next/image'

function ContactUs() {
  return (
   <>
   
   <Box mt={14}>
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
          label="Contact Us"
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

        <Typography variant="h4" fontWeight="bold" sx={{fontSize:"50px",fontWeight:400}}>
       Contact Us
        </Typography>

        <Typography
          variant="body1"
         sx={{color:"black"}}
          maxWidth={600}
          mx="auto"
          lineHeight={1.7}
        >
We’re here to help! Whether you need support with bookings, have inquiries about an event, or want to explore partnership opportunities, feel free to reach out.         </Typography>
      </Box>

<ContactForm/>
<Testimonials/>

   </Box>
   </>
  )
}

export default ContactUs