// "use client"

// import React from 'react'
// import {
//   Box,
//   Grid,
//   Typography,
//   Button,
//   useTheme
// } from '@mui/material'

// const products = [
//   { title: 'Healthcare Portal', subtitle: 'Health Portal', desc: 'GP Line is an online doctor consultation service available in Ireland. It connects patients with licensed general practitioners (GPs) through secure and private online consultations. No waiting rooms or long queues—get medical advice, prescriptions, and sick notes from the comfort of your home. Ideal for busy individuals or those unable to visit a clinic.' },
//   { title: 'Repeat Prescription Online', subtitle: 'Health Portal', desc: 'The Prescription Refill service allows patients to request their repeat medications online without visiting the clinic. Its secure, fast, and ideal for managing long-term treatments. The process saves time and ensures you never run out of essential medicine.'},
//   { title: 'Automated Health Booking', subtitle: 'Health Portal', desc: 'Healthcare scheduling software is a digital platform designed to streamline appointment booking, patient management, and staff coordination for medical practices, hospitals, and clinics. It reduces no-shows, optimizes workflows, and enhances patient satisfaction through automation and AI-driven features'},
//   { title: 'Automated Staff Management', subtitle: 'Health Portal', desc: 'Clock O Work is a smart time-tracking and workforce management software designed for businesses. It monitors employee hours, attendance, and productivity in real-time. Ideal for remote teams, it helps improve efficiency and accountability through automation.'},
//    { title: 'Work Sign-Off Tool', subtitle: 'Health Portal', desc: 'Sign O Work is a digital platform for managing task approvals, document signing, and workflow authorization. It streamlines team communication by allowing managers and staff to sign off on work digitally. Perfect for remote teams and project-based environments.'},
//    { title: 'Revolutionize Your Checkout', subtitle: 'Health Portal', desc: 'A Point of Sale (POS) system is a digital solution that handles sales transactions, inventory management, and customer data at retail locations. It streamlines checkout, improves accuracy, and tracks real-time sales performance. Ideal for retail stores, restaurants, and service businesses.'},
//    { title: 'Online Digital Training', subtitle: 'Health Portal', desc: 'This Digital Marketing e-learning course offers in-depth training in SEO, social media marketing, email marketing, Google Ads, and analytics. Designed for beginners and professionals, it combines practical skills with real-world strategies. Learn at your own pace and build a future-proof career in digital marketing.'},
//    { title: 'Rent AI Tools', subtitle: 'Health Portal', desc: 'AI Rental is a platform that allows users to rent access to powerful AI tools and software without the need for expensive licenses or infrastructure. It offers flexible, pay-as-you-go access to AI models for tasks like image generation, text analysis, chatbots, and more. Ideal for startups, researchers, and developers looking for affordable AI power.'},
//    { title: 'Boost Customer Relationships', subtitle: 'Health Portal', desc: 'A CMR System is a software solution designed to manage and analyze customer interactions and data throughout the customer lifecycle. It helps businesses improve customer relationships, streamline processes, and enhance customer satisfaction. Key features include tracking sales, managing support tickets, and automating communication'},
//    { title: 'Your AI Travel Assistant', subtitle: 'Health Portal', desc: 'An AI Travel Agent is a digital assistant or platform powered by Artificial Intelligence (AI) that helps users plan, book, and manage travel arrangements efficiently. It leverages machine learning, natural language processing (NLP), and data analytics to provide personalized recommendations, automate bookings, and offer real-time travel support.'},
//    { title: 'Smart Transportation Solutions', subtitle: 'Health Portal', desc: 'An AI Transportation Portal is a centralized digital platform powered by Artificial Intelligence (AI) that optimizes and manages various aspects of transportation, including public transit, ride-sharing, logistics, and smart city mobility. It integrates AI technologies like machine learning (ML), predictive analytics, IoT sensors, and real-time data processing to enhance efficiency, safety, and user experience.'},
  
// ]


// const description =
//   'A Health Portal provides easy access to personal medical records, appointment scheduling, lab results, and health resources—all in one secure online platform. It empowers users to manage their healthcare conveniently and stay informed about their well-being.'

// export default function AllProducts() {
//   const theme = useTheme()

//   return (
//     <Box
//       component="section"
//       sx={{
//         px: { xs: 2, md: 8 },
//         py: { xs: 4, md: 8 },
//       }}
//     >
 
//       <Box sx={{  pl: 3 }}>
//         <Grid container spacing={4}>
//           {products.map((prod) => (
//             <Grid size={{ xs:11, md:6}} key={prod.title} sx={{border:"1px solid white",p:2 ,transition:"0.3s",
//                             '&:hover': {
//                 transform: 'translateY(-5px)',
//                 boxShadow: "0 6px 30px rgba(0,0,0,0.15)",

//                 borderColor: theme.palette.primary.light,
//                 border:"1px solid lightgray" ,p:2,borderRadius:4,cursor:"pointer",transition:"0.3s",  
//               },
//             }}>
//               <Box
//                 sx={{
//                   borderBottom: '1px solid',
//                   borderColor: 'divider',
//                   pb: 3,
//                   mb: 3,
//                 }}
//               >
//                 <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
//                   {prod.title}
//                 </Typography>
//                 <Typography
//                   variant="subtitle2"
//                   color="text.secondary"
//                   sx={{ mb: 1 }}
//                 >
//                   {prod.subtitle}
//                 </Typography>

//                 <Typography
//                   variant="subtitle2"
//                   sx={{ fontWeight: 600, mb: 0.5 }}
//                 >
//                   Description:
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   color="text.secondary"
//                   sx={{ mb: 2 }}
//                 >
//                   {prod.desc}
//                 </Typography>

//                 <Button
//                   variant="outlined"
//                   size="small"
//                   color='inherit'
//                   sx={{
//                     textTransform: 'none',
//                     borderRadius: 6,
//                     fontSize: '12px',
//                     px: 3.5,
//                     py: 0.6,
//                   }}
//                 >
//                   Request a Demo
//                 </Button>
//               </Box>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Box>
//   )
// }




"use client"

import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  CircularProgress,
  Alert,
  useTheme,
} from '@mui/material';

export default function AllProducts() {
  const theme = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        const res = await fetch('/api/products', {
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch – ${res.status}`);
        }

        const json = await res.json();
        setProducts(json.data || []);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ px: 2, py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box
      component="section"
      sx={{
        px: { xs: 2, md: 8 },
        py: { xs: 4, md: 8 },
      }}
    >
      <Box sx={{ pl: 3 }}>
        <Grid container spacing={4}>
          {products.map((prod) => (
            <Grid
              size={{ xs:12, md:6}}
              
              key={prod._id}
              sx={{
                border: '1px solid white',
                p: 2,
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 6px 30px rgba(0,0,0,0.15)',
                  borderColor: theme.palette.primary.light,
                  border: '1px solid lightgray',
                  borderRadius: 4,
                  cursor: 'pointer',
                  transition: '0.3s',
                },
              }}
            >
              <Box
                sx={{
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  pb: 3,
                  mb: 3,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {prod.name}
                </Typography>

                {Array.isArray(prod.category) && prod.category.length > 0 && (
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {prod.category.join(', ')}
                  </Typography>
                )}

                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, mb: 0.5 }}
                >
                  Description:
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {prod.description || '—'}
                </Typography>

                {typeof prod.price !== 'undefined' && (
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                    Price: {prod.price}
                  </Typography>
                )}

                <Button
                  href='/contact-us/'
                  variant="outlined"
                  size="small"
                  color="inherit"
                  sx={{
                    textTransform: 'none',
                    borderRadius: 6,
                    fontSize: '12px',
                    px: 3.5,
                    py: 0.6,
                  }}
                >
                  Request a Demo
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

