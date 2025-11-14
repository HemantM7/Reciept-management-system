import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Typography, Chip } from "@mui/material";
import { getReceiptData } from "../utils/receiptData";
import { useTheme } from "../context/ThemeContext";
import { Category } from "@mui/icons-material";

export default function PieActiveArc() {
  const { darkMode } = useTheme();
  const [categoryData, setCategoryData] = useState<{ label: string; value: number }[]>([]);

  useEffect(() => {
    const data = getReceiptData();
    setCategoryData(data.categoryData.length > 0 ? data.categoryData : [
      { label: "No Data", value: 1 }
    ]);
  }, []);

  const valueFormatter = (item: { value: number }) => `${item.value} items`;
  const totalItems = categoryData.reduce((sum, item) => sum + item.value, 0);
  const topCategory = categoryData.length > 0 
    ? categoryData.reduce((prev, current) => (prev.value > current.value) ? prev : current)
    : null;

  // Enhanced colors for categories
  const colorPalette = [
    "#667eea",
    "#f093fb",
    "#4facfe",
    "#fa709a",
    "#43e97b",
    "#38f9d7",
  ];

  const dataWithColors = categoryData.map((item, index) => ({
    ...item,
    color: colorPalette[index % colorPalette.length],
  }));

  return (
    <Box
      sx={{
        height: { xs: 380, sm: 400 },
        width: "100%",
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: darkMode ? "1px solid #333" : "1px solid #e0e0e0",
        borderRadius: "20px",
        bgcolor: darkMode ? "#0f3460" : "white",
        boxShadow: darkMode ? "0 8px 24px rgba(0,0,0,0.4)" : "0 8px 24px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
        p: { xs: 2, sm: 2.5, md: 3 },
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
          background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
        }}
      />

      {/* Header */}
      <Box sx={{ width: "100%", mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 0.5 }}>
          <Category sx={{ color: darkMode ? "#667eea" : "#667eea", fontSize: 24 }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: darkMode ? "#fff" : "#667eea",
              textAlign: "center",
              fontSize: { xs: "1rem", sm: "1.25rem" },
            }}
          >
            Items by Category
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, flexWrap: "wrap" }}>
          <Chip 
            label={`${totalItems} Total Items`}
            size="small"
            sx={{ 
              bgcolor: darkMode ? "rgba(102, 126, 234, 0.2)" : "rgba(102, 126, 234, 0.15)",
              color: darkMode ? "#fff" : "#667eea",
              fontWeight: 600,
              fontSize: "0.7rem"
            }}
          />
          {topCategory && topCategory.value > 0 && (
            <Chip 
              label={`Top: ${topCategory.label}`}
              size="small"
              sx={{ 
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                fontWeight: 600,
                fontSize: "0.7rem"
              }}
            />
          )}
        </Box>
      </Box>

      {/* Chart */}
      <PieChart
        series={[
          {
            data: dataWithColors,
            highlightScope: { fade: "global", highlight: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            valueFormatter,
            innerRadius: 50,
            outerRadius: 100,
            paddingAngle: 3,
            cornerRadius: 8,
          },
        ]}
        height={260}
        width={320}
        sx={{
          "& .MuiChartsLegend-series text": {
            fill: darkMode ? "#fff !important" : "#000 !important",
            fontSize: "0.75rem !important",
            fontWeight: "500 !important",
          },
          "& .MuiChartsLegend-mark": {
            rx: 2,
          },
        }}
      />
    </Box>
  );
}
