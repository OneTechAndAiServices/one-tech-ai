// "use client"

// import React from 'react'
// import { Box, Grid, Typography, Button, List, ListItem, useTheme } from '@mui/material'
// import Image from 'next/image'
// import LearningTitle from './LearningTitle'


// function ELearning() {
//   const theme = useTheme()

//   const features = [
//     'International SEO',
//     'On/Off-Page Technical SEO',
//     'Complete SEO Audits & Reporting',
//     'Freelancing Tips for SEO Projects',
//     'Live project work + mentorship',
//   ]

//   return (
//     <Box mt={12}>
//       <LearningTitle/>
    
//     <Box
//       component="section"
//       sx={{
//         px: { xs: 2, md: 8 },
//         py: { xs: 6, md: 6 },
//         overflow: 'hidden',
//       }}
//     >
//       <Grid container spacing={4} alignItems="center">
//         {/* Text Column */}
//         <Grid size={{ xs: 12, md: 6 }}>
//           <Typography
//             variant="h4"
//             component="h2"
//             sx={{
//               fontWeight: 700,
//               lineHeight: 1.2,
//               mb: 3,
//             }}
//           >
//             SEO & DIGITAL<br />
//             MARKETING COURSES
//           </Typography>

//           <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
//             In today’s digital world, learning online skills is essential for everyone.
//             At One Tech and AI, we bring you the best courses designed to take you
//             from beginner to expert level, helping you start or grow your career
//             in the digital field.
//           </Typography>

//           <List disablePadding>
//             {features.map((text) => (
//               <ListItem
//                 key={text}
//                 disableGutters
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   mb: 1.5,
//                 }}
//               >
//                 <Box
//                   component="span"
//                   sx={{
//                     width: 8,
//                     height: 8,
//                     borderRadius: '50%',
//                     backgroundColor: theme.palette.primary.main,
//                     display: 'inline-block',
//                     mr: 2,
//                   }}
//                 />
//                 <Typography variant="body2">{text}</Typography>
//               </ListItem>
//             ))}
//           </List>

//           <Button
//             variant="contained"
//             sx={{
//               mt: 3,
//               backgroundColor: '#000',
//               textTransform: 'none',
//               borderRadius: 8,
//               px: 4,
//               py: 1.2,
//               '&:hover': { backgroundColor: '#222' },
//             }}
//           >
//             Read More
//           </Button>
//         </Grid>

//         {/* Image Column */}
//         <Grid size={{ xs: 12, md: 6 }} sx={{ position: 'relative' }}>
//           <Image
//             src="/eLearning.png"
//             alt="Student"
//             width={1920}
//             height={1080}
//             quality={100}
//             priority
//             style={{
//               width: '100%',
//               height: 'auto',
//               objectFit: 'cover',
//             }}
//           />
//         </Grid>
//       </Grid>
//     </Box>
//     <Box bgcolor='#00D4FF' width='100%' height='50px'>
//     </Box>
//     </Box>
//   )
// }

// export default ELearning
"use client"

import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Box, Grid, Typography, Button, List, ListItem, useTheme } from '@mui/material'
import Image from 'next/image'
import LearningTitle from './LearningTitle'

function ELearning() {
  const theme = useTheme()

  const features = [
    'International SEO',
    'On/Off-Page Technical SEO',
    'Complete SEO Audits & Reporting',
    'Freelancing Tips for SEO Projects',
    'Live project work + mentorship',
  ]

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  return (
    <Box mt={12}>
      <LearningTitle />

      <Box
        component="section"
        sx={{
          px: { xs: 2, md: 8 },
          py: { xs: 6, md: 6 },
          overflow: 'hidden',
        }}
      >
        <Grid container spacing={4} alignItems="center">
          {/* Text Column */}
          <Grid  size={{xs:12,md:6}} data-aos="fade-up">
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 700,
                lineHeight: 1.2,
                mb: 3,
              }}
            >
              SEO & DIGITAL<br />
              MARKETING COURSES
            </Typography>

            <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
              In today’s digital world, learning online skills is essential for everyone.
              At One Tech and AI, we bring you the best courses designed to take you
              from beginner to expert level, helping you start or grow your career
              in the digital field.
            </Typography>

            <List disablePadding>
              {features.map((text, index) => (
                <ListItem
                  key={index}
                  disableGutters
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 1.5,
                  }}
                  data-aos="fade-right"
                  data-aos-delay={index * 100}
                >
                  <Box
                    component="span"
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: theme.palette.primary.main,
                      display: 'inline-block',
                      mr: 2,
                    }}
                  />
                  <Typography variant="body2">{text}</Typography>
                </ListItem>
              ))}
            </List>

            <Button
              href='/contact-us/'
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: '#000',
                textTransform: 'none',
                borderRadius: 8,
                px: 4,
                py: 1.2,
                '&:hover': { backgroundColor: '#222' },
              }}
              data-aos="fade-up"
              data-aos-delay="600"
            >
              Read More
            </Button>
          </Grid>

          {/* Image Column */}
          <Grid size={{xs:12,md:6}} sx={{ position: 'relative' }} data-aos="zoom-in">
            <Image
              src="/eLearning.png"
              alt="Student"
              width={1920}
              height={1080}
              quality={100}
              priority
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
              }}
            />
          </Grid>
        </Grid>
      </Box>

      <Box bgcolor="#00D4FF" width="100%" height="50px" />
    </Box>
  )
}

export default ELearning
