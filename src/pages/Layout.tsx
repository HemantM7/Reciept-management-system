import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Container, Box } from "@mui/material";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";

export default function Layout() {
  const { darkMode } = useTheme();

  return (
    <Box
      sx={{
        background: darkMode
          ? "linear-gradient(to bottom, #1a1a2e 0%, #16213e 100%)"
          : "linear-gradient(to bottom, #f8f9fa 0%, #e9ecef 100%)",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        transition: "background 0.3s ease",
      }}
    >
      <Navbar />
      <Box 
        component="main" 
        sx={{ 
          flex: 1, 
          padding: { xs: "1rem", sm: "1.5rem", md: "2rem" }, 
          marginTop: { xs: "70px", sm: "80px" },
          minHeight: "calc(100vh - 200px)"
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
          <Outlet />
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
