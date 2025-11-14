import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SentimentDissatisfied, Home } from "@mui/icons-material";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        overflow: "hidden",
      }}
    >
      {/* Animated background circles */}
      <Box
        sx={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          top: "-200px",
          right: "-200px",
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          bottom: "-100px",
          left: "-100px",
          animation: "float 8s ease-in-out infinite",
        }}
      />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          className="fade-in"
          sx={{
            textAlign: "center",
            color: "white",
            p: 4,
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <SentimentDissatisfied sx={{ fontSize: 100, mr: 2 }} />
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "4rem", md: "6rem" },
              }}
            >
              404
            </Typography>
          </Box>

          <Typography
            variant="h3"
            gutterBottom
            sx={{ fontWeight: 700, mb: 2 }}
          >
            Page Not Found
          </Typography>
          <Typography
            variant="h6"
            sx={{ mb: 4, opacity: 0.9, fontWeight: 400 }}
          >
            Oops! The page you're looking for seems to have wandered off.
            <br />
            Let's get you back on track.
          </Typography>

          <Button
            variant="contained"
            size="large"
            startIcon={<Home />}
            onClick={() => navigate("/")}
            sx={{
              borderRadius: "50px",
              px: 5,
              py: 2,
              fontSize: "1.1rem",
              fontWeight: 600,
              background: "white",
              color: "#667eea",
              textTransform: "none",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.9)",
                transform: "translateY(-2px)",
                boxShadow: "0 15px 40px rgba(0, 0, 0, 0.3)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Container>

      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }
        `}
      </style>
    </Box>
  );
}
