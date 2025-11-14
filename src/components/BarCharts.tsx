import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import Box from "@mui/material/Box";
import { Typography, Chip } from "@mui/material";
import { getReceiptData } from "../utils/receiptData";
import { useTheme } from "../context/ThemeContext";
import { AttachMoney } from "@mui/icons-material";

export default function CategoryRevenueChart() {
  const { darkMode } = useTheme();
  const [categoryRevenue, setCategoryRevenue] = useState<{ category: string; revenue: number }[]>([]);

  useEffect(() => {
    const data = getReceiptData();
    setCategoryRevenue(data.categoryRevenue.length > 0 ? data.categoryRevenue : [
      { category: "No Data", revenue: 0 }
    ]);
  }, []);

  const categories = categoryRevenue.map((item) => item.category);
  const revenues = categoryRevenue.map((item) => item.revenue);
  const totalRevenue = revenues.reduce((a, b) => a + b, 0);
  const topCategory = categoryRevenue.length > 0 
    ? categoryRevenue.reduce((prev, current) => (prev.revenue > current.revenue) ? prev : current)
    : null;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "800px",
        height: { xs: 380, sm: 400 },
        border: darkMode ? "1px solid #333" : "1px solid #e0e0e0",
        borderRadius: "20px",
        bgcolor: darkMode ? "#0f3460" : "white",
        boxShadow: darkMode ? "0 8px 24px rgba(0,0,0,0.4)" : "0 8px 24px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        p: { xs: 2, sm: 2.5, md: 3 },
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
        mx: "auto",
        "&:hover": {
          boxShadow: darkMode ? "0 12px 32px rgba(0,0,0,0.5)" : "0 12px 32px rgba(0,0,0,0.12)",
          transform: "translateY(-4px)",
        },
      }}
    >
      {/* Decorative gradient overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #f093fb 0%, #f5576c 100%)",
        }}
      />

      {/* Header with Stats */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2, flexWrap: "wrap", gap: 1 }}>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
            <AttachMoney sx={{ color: darkMode ? "#f093fb" : "#667eea", fontSize: 24 }} />
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700, 
                color: darkMode ? "#fff" : "#667eea",
                fontSize: { xs: "1rem", sm: "1.25rem" }
              }}
            >
              Revenue by Category
            </Typography>
          </Box>
          <Typography 
            variant="caption" 
            sx={{ 
              color: darkMode ? "#aaa" : "#666",
              fontSize: "0.75rem"
            }}
          >
            Total: ${totalRevenue.toFixed(2)}
          </Typography>
        </Box>

        {/* Top Category Chip */}
        {topCategory && topCategory.revenue > 0 && (
          <Chip 
            label={`Top: ${topCategory.category}`}
            size="small"
            sx={{ 
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              color: "white",
              fontWeight: 600,
              fontSize: "0.7rem"
            }}
          />
        )}
      </Box>

      {/* Chart */}
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <BarChart
          xAxis={[{ 
            scaleType: "band", 
            data: categories,
            tickLabelStyle: { 
              fontSize: 11, 
              fill: darkMode ? "#fff" : "#000", 
              fontWeight: 500,
              angle: categories.length > 4 ? -45 : 0,
              textAnchor: categories.length > 4 ? "end" : "middle",
            }
          }]}
          yAxis={[{
            tickLabelStyle: { 
              fill: darkMode ? "#fff" : "#000", 
              fontWeight: 500 
            }
          }]}
          series={[
            { 
              data: revenues, 
              label: "Revenue ($)",
              color: "#f093fb",
            }
          ]}
          height={280}
          margin={{ top: 10, right: 20, bottom: categories.length > 4 ? 60 : 30, left: 60 }}
          grid={{ horizontal: true }}
          sx={{
            "& .MuiChartsLegend-series text": {
              fill: darkMode ? "#fff !important" : "#000 !important",
              fontWeight: "600 !important",
              fontSize: "0.8rem !important",
            },
            "& .MuiBarElement-root": {
              rx: 6,
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
              transition: "all 0.3s ease",
              "&:hover": {
                opacity: 0.8,
              }
            },
            "& .MuiChartsGrid-line": {
              stroke: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
              strokeDasharray: "3 3",
            },
          }}
        />
      </Box>
    </Box>
  );
}
