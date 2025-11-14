import { Box, Typography, IconButton } from "@mui/material";
import { GitHub, LinkedIn, Twitter } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        py: 3,
        px: { xs: 2, sm: 4 },
        mt: 6,
        textAlign: "center",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
        <IconButton sx={{ color: "white" }}>
          <GitHub />
        </IconButton>
        <IconButton sx={{ color: "white" }}>
          <LinkedIn />
        </IconButton>
        <IconButton sx={{ color: "white" }}>
          <Twitter />
        </IconButton>
      </Box>
      <Typography variant="body2" sx={{ opacity: 0.9 }}>
        &copy; {new Date().getFullYear()} Receipt Management Pro. All rights reserved.
      </Typography>
      <Typography variant="caption" sx={{ opacity: 0.8, mt: 1, display: "block" }}>
        Built with React, TypeScript, and Material-UI
      </Typography>
    </Box>
  );
};

export default Footer;
