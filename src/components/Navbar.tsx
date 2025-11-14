import { AppBar, Button, Typography, IconButton, Box, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Receipt, Brightness4, Brightness7 } from "@mui/icons-material";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          padding: "12px 24px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Receipt sx={{ fontSize: 32 }} />
          <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
            Receipt Management Pro
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"}>
            <IconButton onClick={toggleDarkMode} sx={{ color: "white" }}>
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            sx={{
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.3)",
              },
            }}
            size="medium"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Box>
      </AppBar>
    </div>
  );
};

export default Navbar;
