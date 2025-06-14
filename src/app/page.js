
import Footer from "@/components/footer/Footer";
import Banner from "@/components/landingPage/Banner";
import ContactUs from "@/components/landingPage/ContactUs";
import Services from "@/components/landingPage/Services";
import Testimonals from "@/components/landingPage/Testimonals";
import Navbar from "@/components/navbar/Navbar";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <>
    <Navbar/>
  <Box maxWidth={"1800px"} mx={"auto"}>
  <Banner/>
    <Services/>
    <Testimonals/>
    <ContactUs/>
  </Box>
    <Footer/>
    </>
  );
}
