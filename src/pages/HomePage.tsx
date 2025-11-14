import { Divider, Paper, Typography, Box, IconButton, Tooltip, Button, Chip } from "@mui/material";
import PieActiveArc from "../components/PieActiveArc";
import CategoryRevenueChart from "../components/BarCharts";
import MonthlyTrendsChart from "../components/LineChart";
import StatusDistributionChart from "../components/Redar";
import StatsCard from "../components/StatsCard";
import {
  Receipt,
  TrendingUp,
  AttachMoney,
  ShoppingCart,
  Refresh,
  Add,
  DeleteSweep,
  Timeline,
  Assessment,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { generateSampleReceipts, clearAllReceipts } from "../utils/sampleData";
import { useTheme } from "../context/ThemeContext";

const HomePage = () => {
  const { darkMode } = useTheme();
  const [stats, setStats] = useState({
    totalReceipts: 0,
    totalAmount: 0,
    totalItems: 0,
    avgAmount: 0,
  });
  const [refreshKey, setRefreshKey] = useState(0);

  const calculateStats = () => {
    let receipts = 0;
    let amount = 0;
    let items = 0;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("R")) {
        const raw = localStorage.getItem(key);
        if (raw) {
          try {
            const receipt = JSON.parse(raw);
            receipts++;
            amount += receipt.netAmount || 0;
            items += receipt.totalQty || 0;
          } catch (e) {
            console.error("Error parsing receipt", e);
          }
        }
      }
    }

    setStats({
      totalReceipts: receipts,
      totalAmount: amount,
      totalItems: items,
      avgAmount: receipts > 0 ? amount / receipts : 0,
    });
  };

  useEffect(() => {
    calculateStats();
  }, [refreshKey]);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleGenerateSample = () => {
    generateSampleReceipts(20);
    handleRefresh();
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to delete all receipts? This cannot be undone.")) {
      clearAllReceipts();
      handleRefresh();
    }
  };

  return (
    <Box className="fade-in" sx={{ position: "relative", px: { xs: 2, sm: 3, md: 4 }, py: { xs: 2, sm: 3 } }}>
      {/* Decorative Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          opacity: 0.05,
          filter: "blur(60px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -150,
          left: -150,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          opacity: 0.05,
          filter: "blur(80px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Header Section */}
      <Box sx={{ position: "relative", zIndex: 1, mb: { xs: 3, sm: 4, md: 5 } }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 2 }}>
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1.5,
                fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
              }}
            >
              Dashboard Overview
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: darkMode ? "#aaa" : "#666", 
                display: "flex", 
                alignItems: "center", 
                gap: 1,
                fontSize: { xs: "0.875rem", sm: "1rem" }
              }}
            >
              <Assessment sx={{ fontSize: 20 }} />
              Real-time analytics and insights
            </Typography>
          </Box>
          {stats.totalReceipts > 0 && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Tooltip title="Add more sample data">
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  onClick={handleGenerateSample}
                  sx={{
                    borderColor: "#667eea",
                    color: "#667eea",
                    borderRadius: "12px",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": {
                      borderColor: "#764ba2",
                      background: "rgba(102, 126, 234, 0.1)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Add Sample
                </Button>
              </Tooltip>
              <Tooltip title="Clear all receipts">
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteSweep />}
                  onClick={handleClearAll}
                  sx={{
                    borderRadius: "12px",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": {
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Clear All
                </Button>
              </Tooltip>
            </Box>
          )}
        </Box>
      </Box>

      {/* Empty State Banner */}
      {stats.totalReceipts === 0 && (
        <Paper
          elevation={0}
          sx={{
            mb: { xs: 3, sm: 4, md: 5 },
            p: { xs: 3, sm: 4, md: 5 },
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            borderRadius: "20px",
            color: "white",
            position: "relative",
            overflow: "hidden",
            border: "none",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -50,
              right: -50,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.1)",
            }}
          />
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 3 }}>
              <Box>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700, 
                    mb: 1.5,
                    fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" }
                  }}
                >
                  🚀 Welcome to Your Dashboard!
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    opacity: 0.95, 
                    mb: 2,
                    fontSize: { xs: "0.875rem", sm: "1rem" }
                  }}
                >
                  Get started by generating sample data to explore all the powerful features
                </Typography>
                <Chip
                  label="Quick Start"
                  sx={{
                    background: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    fontWeight: 600,
                    px: 1,
                    py: 0.5,
                  }}
                />
              </Box>
              <Button
                variant="contained"
                size="large"
                startIcon={<Add />}
                onClick={handleGenerateSample}
                sx={{
                  background: "white",
                  color: "#4facfe",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  px: 4,
                  py: 1.5,
                  borderRadius: "12px",
                  textTransform: "none",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.95)",
                    transform: "translateY(-3px)",
                    boxShadow: "0 12px 32px rgba(0, 0, 0, 0.2)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Generate Sample Data
              </Button>
            </Box>
          </Box>
        </Paper>
      )}

      {/* Stats Cards with Stagger Animation */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: { xs: 2, sm: 3, md: 4 },
          mb: { xs: 4, sm: 5, md: 6 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box sx={{ animation: "slideInUp 0.5s ease-out 0.1s both" }}>
          <StatsCard
            title="Total Receipts"
            value={stats.totalReceipts}
            icon={<Receipt sx={{ fontSize: 32 }} />}
            gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            subtitle="All time"
          />
        </Box>
        <Box sx={{ animation: "slideInUp 0.5s ease-out 0.2s both" }}>
          <StatsCard
            title="Total Revenue"
            value={`$${stats.totalAmount.toFixed(2)}`}
            icon={<AttachMoney sx={{ fontSize: 32 }} />}
            gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
            subtitle="Net amount"
          />
        </Box>
        <Box sx={{ animation: "slideInUp 0.5s ease-out 0.3s both" }}>
          <StatsCard
            title="Total Items"
            value={stats.totalItems}
            icon={<ShoppingCart sx={{ fontSize: 32 }} />}
            gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
            subtitle="Items sold"
          />
        </Box>
        <Box sx={{ animation: "slideInUp 0.5s ease-out 0.4s both" }}>
          <StatsCard
            title="Avg Receipt"
            value={`$${stats.avgAmount.toFixed(2)}`}
            icon={<TrendingUp sx={{ fontSize: 32 }} />}
            gradient="linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
            subtitle="Per receipt"
          />
        </Box>
      </Box>

      {/* Charts Section with Modern Design */}
      <Paper
        elevation={0}
        sx={{
          border: darkMode ? "1px solid #333" : "1px solid #e0e0e0",
          borderRadius: "24px",
          overflow: "hidden",
          backgroundColor: darkMode ? "#16213e" : "white",
          transition: "all 0.3s ease",
          position: "relative",
          zIndex: 1,
          boxShadow: darkMode
            ? "0 20px 60px rgba(0, 0, 0, 0.5)"
            : "0 20px 60px rgba(0, 0, 0, 0.08)",
          mb: { xs: 3, sm: 4 },
        }}
      >
        {/* Header with Gradient */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: { xs: "20px 24px", sm: "24px 28px", md: "28px 32px" },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -30,
              right: -30,
              width: 150,
              height: 150,
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.1)",
            }}
          />
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1.5 }}>
              <Timeline sx={{ fontSize: { xs: 28, sm: 32 }, color: "white" }} />
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 800, 
                  color: "white",
                  fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" }
                }}
              >
                Analytics Dashboard
              </Typography>
            </Box>
            <Typography 
              variant="body1" 
              sx={{ 
                color: "rgba(255,255,255,0.9)",
                fontSize: { xs: "0.875rem", sm: "1rem" }
              }}
            >
              Visual insights into your receipt data by category and status
            </Typography>
          </Box>
          <Tooltip title="Refresh all charts">
            <IconButton
              onClick={handleRefresh}
              sx={{
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                width: 56,
                height: 56,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  transform: "rotate(180deg)",
                },
                transition: "all 0.5s ease",
              }}
            >
              <Refresh sx={{ fontSize: 28 }} />
            </IconButton>
          </Tooltip>
        </Box>

        <Divider sx={{ borderColor: darkMode ? "#333" : "#e0e0e0" }} />

        {/* Charts Grid */}
        <Box 
          sx={{ 
            p: { xs: 3, sm: 4, md: 5 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }} 
          key={refreshKey}
        >
          {/* Top Row - Centered */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { 
                xs: "1fr", 
                md: "repeat(2, 1fr)",
                lg: "minmax(320px, 400px) minmax(500px, 1fr)"
              },
              gap: { xs: 3, sm: 4, md: 5 },
              mb: { xs: 3, sm: 4, md: 5 },
              width: "100%",
              maxWidth: "1400px",
              justifyItems: "center",
              alignItems: "stretch",
            }}
          >
            <Box
              sx={{
                animation: "fadeInScale 0.6s ease-out 0.2s both",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <PieActiveArc />
            </Box>
            <Box
              sx={{
                animation: "fadeInScale 0.6s ease-out 0.3s both",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CategoryRevenueChart />
            </Box>
          </Box>

          {/* Bottom Row - Centered */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { 
                xs: "1fr", 
                md: "repeat(2, 1fr)",
                lg: "minmax(500px, 1fr) minmax(320px, 400px)"
              },
              gap: { xs: 3, sm: 4, md: 5 },
              width: "100%",
              maxWidth: "1400px",
              justifyItems: "center",
              alignItems: "stretch",
            }}
          >
            <Box
              sx={{
                animation: "fadeInScale 0.6s ease-out 0.4s both",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <MonthlyTrendsChart />
            </Box>
            <Box
              sx={{
                animation: "fadeInScale 0.6s ease-out 0.5s both",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <StatusDistributionChart />
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Add Keyframe Animations */}
      <style>
        {`
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default HomePage;
