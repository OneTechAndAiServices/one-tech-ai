import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import WebsiteNavbar from "@/components/navbar/WebsiteNavbar";
import { Box } from "@mui/material";

export default function WebsiteLayout({ children }) {
    return (
        <div>
         <WebsiteNavbar/>
          
          <Box mt={8}>
              {children}
          </Box>
            <Footer/>
        </div>
    );
}