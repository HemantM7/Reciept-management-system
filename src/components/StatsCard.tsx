import { Card, CardContent, Typography, Box } from "@mui/material";
import type { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  gradient: string;
  subtitle?: string;
}

const StatsCard = ({ title, value, icon, gradient, subtitle }: StatsCardProps) => {
  return (
    <Card
      sx={{
        background: gradient,
        color: "white",
        borderRadius: "20px",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        border: "none",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-8px) scale(1.02)",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.25)",
          "& .icon-box": {
            transform: "rotate(10deg) scale(1.1)",
          },
          "& .bg-circle-1": {
            transform: "scale(1.2)",
          },
          "& .bg-circle-2": {
            transform: "scale(1.3)",
          },
        },
      }}
    >
      {/* Decorative Background Circles */}
      <Box
        className="bg-circle-1"
        sx={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          transition: "all 0.4s ease",
        }}
      />
      <Box
        className="bg-circle-2"
        sx={{
          position: "absolute",
          bottom: -30,
          left: -30,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.05)",
          transition: "all 0.4s ease",
        }}
      />

      <CardContent sx={{ position: "relative", zIndex: 1, p: { xs: 2.5, sm: 3, md: 3.5 } }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: { xs: 1.5, sm: 2 } }}>
          <Typography
            variant="body2"
            sx={{
              opacity: 0.95,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              fontSize: "0.75rem",
            }}
          >
            {title}
          </Typography>
          <Box
            className="icon-box"
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.25)",
              backdropFilter: "blur(10px)",
              borderRadius: "14px",
              p: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
            }}
          >
            {icon}
          </Box>
        </Box>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            mb: { xs: 0.5, sm: 1 },
            fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
            lineHeight: 1.1,
          }}
        >
          {value}
        </Typography>
        {subtitle && (
          <Typography
            variant="caption"
            sx={{
              opacity: 0.9,
              fontSize: { xs: "0.75rem", sm: "0.85rem" },
              fontWeight: 500,
            }}
          >
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
