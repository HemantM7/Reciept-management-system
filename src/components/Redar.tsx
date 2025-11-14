import { useEffect, useState } from "react";
import { Box, Typography, Chip, Stack } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { getReceiptData } from "../utils/receiptData";
import { useTheme } from "../context/ThemeContext";
import { Assessment } from "@mui/icons-material";

export default function StatusDistributionChart() {
  const { darkMode } = useTheme();
  const [statusData, setStatusData] = useState<{ label: string; value: number }[]>([]);

  useEffect(() => {
    const data = getReceiptData();
    setStatusData(data.statusData.length > 0 ? data.statusData : [
      { label: "No Data", value: 1 }
    ]);
  }, []);

  const valueFormatter = (item: { value: number }) => `${item.value} receipts`;
  const totalReceipts = statusData.reduce((sum, item) => sum + item.value, 0);

  // Color mapping for statuses
  const colors = {
    Draft: "#2196f3",
    Pending: "#ff9800",
    Paid: "#4caf50",
    Cancelled: "#f44336",
  };

  const dataWithColors = statusData.map((item) => ({
    ...item,
    color: colors[item.label as keyof typeof colors] || "#9e9e9e",
  }));

  // Calculate percentages
  const statusPercentages = statusData.map(item => ({
    label: item.label,
    percentage: totalReceipts > 0 ? ((item.value / totalReceipts) * 100).toFixed(1) : "0",
    value: item.value,
    color: colors[item.label as keyof typeof colors] || "#9e9e9e",
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
          background: "linear-gradient(90deg, #fa709a 0%, #fee140 100%)",
        }}
      />

      {/* Header */}
      <Box sx={{ width: "100%", mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 0.5 }}>
          <Assessment sx={{ color: darkMode ? "#fa709a" : "#667eea", fontSize: 24 }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: darkMode ? "#fff" : "#667eea",
              textAlign: "center",
              fontSize: { xs: "1rem", sm: "1.25rem" },
            }}
          >
            Receipt Status
          </Typography>
        </Box>
        <Typography 
          variant="caption" 
          sx={{ 
            color: darkMode ? "#aaa" : "#666",
            fontSize: "0.75rem",
            textAlign: "center",
            display: "block"
          }}
        >
          {totalReceipts} Total Receipts
        </Typography>
      </Box>

      {/* Chart */}
      <PieChart
        series={[
          {
            data: dataWithColors,
            highlightScope: { fade: "global", highlight: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            valueFormatter,
            innerRadius: 55,
            outerRadius: 95,
            paddingAngle: 4,
            cornerRadius: 8,
          },
        ]}
        height={200}
        width={300}
        sx={{
          "& .MuiChartsLegend-series text": {
            fill: darkMode ? "#fff !important" : "#000 !important",
            fontSize: "0.75rem !important",
            fontWeight: "500 !important",
            paddingRight: "10px"
          },
        }}
      />

      {/* Status Breakdown */}
      <Stack 
        direction="row" 
        spacing={1} 
        flexWrap="wrap" 
        justifyContent="center"
        sx={{ mt: 2, gap: 0.5 }}
      >
        {statusPercentages.map((status) => (
          status.value > 0 && (
            <Chip
              key={status.label}
              label={`${status.label}: ${status.percentage}%`}
              size="small"
              sx={{
                bgcolor: `${status.color}20`,
                color: status.color,
                fontWeight: 600,
                fontSize: "0.7rem",
                border: `1px solid ${status.color}40`,
              }}
            />
          )
        ))}
      </Stack>
    </Box>
  );
}
