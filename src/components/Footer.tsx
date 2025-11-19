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
        <IconButton
          component="a"
          href="https://github.com/HemantM7"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          sx={{ color: "white", transition: "transform .12s", '&:hover': { transform: 'scale(1.08)' } }}
        >
          <GitHub />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          sx={{ color: "white", transition: "transform .12s", '&:hover': { transform: 'scale(1.08)' } }}
        >
          <LinkedIn />
        </IconButton>
        <IconButton
          component="a"
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          sx={{ color: "white", transition: "transform .12s", '&:hover': { transform: 'scale(1.08)' } }}
        >
          <Twitter />
        </IconButton>
      </Box>
      <Typography variant="body2" sx={{ opacity: 0.9 }}>
        &copy; {new Date().getFullYear()} Hemant Mistri. Receipt Management Pro. All Rights Reserved.
      </Typography>
      <Typography variant="caption" sx={{ opacity: 0.8, mt: 1, display: "block" }}>
        Built with React, TypeScript, and Material-UI
      </Typography>
      <Box sx={{ mt: 1 }}>
        <Typography
          component="a"
          href="/privacy"
          sx={{ color: 'white', opacity: 0.85, textDecoration: 'none', mx: 1 }}
          variant="caption"
        >
          Privacy
        </Typography>
        <Typography
          component="a"
          href="/terms"
          sx={{ color: 'white', opacity: 0.85, textDecoration: 'none', mx: 1 }}
          variant="caption"
        >
          Terms
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
