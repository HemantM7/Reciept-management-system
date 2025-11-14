import { useEffect, useState } from "react";
import { Box, Typography, Chip, Stack } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { getReceiptData } from "../utils/receiptData";
import { useTheme } from "../context/ThemeContext";
import { TrendingUp } from "@mui/icons-material";

export default function MonthlyTrendsChart() {
  const { darkMode } = useTheme();
  const [monthlyData, setMonthlyData] = useState<{ month: string; draft: number; pending: number; paid: number; cancelled: number }[]>([]);

  useEffect(() => {
    const data = getReceiptData();
    setMonthlyData(data.monthlyData.length > 0 ? data.monthlyData : [
      { month: "No Data", draft: 0, pending: 0, paid: 0, cancelled: 0 }
    ]);
  }, []);

  const months = monthlyData.map((item) => item.month);
  const draftData = monthlyData.map((item) => item.draft);
  const pendingData = monthlyData.map((item) => item.pending);
  const paidData = monthlyData.map((item) => item.paid);
  const cancelledData = monthlyData.map((item) => item.cancelled);

  // Calculate totals for display
  const totalDraft = draftData.reduce((a, b) => a + b, 0);
  const totalPending = pendingData.reduce((a, b) => a + b, 0);
  const totalPaid = paidData.reduce((a, b) => a + b, 0);
  const totalCancelled = cancelledData.reduce((a, b) => a + b, 0);

  // Calculate dynamic Y-axis range
  const allValues = [...draftData, ...pendingData, ...paidData, ...cancelledData];
  const maxValue = Math.max(...allValues, 0);
  const minValue = Math.min(...allValues, 0);
  
  // Add 20% padding to the range for better visualization
  const range = maxValue - minValue;
  const padding = range * 0.2;
  const yAxisMin = Math.max(0, Math.floor(minValue - padding));
  const yAxisMax = Math.ceil(maxValue + padding);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "800px",
        height: { xs: 420, sm: 450 },
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
          background: "linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)",
        }}
      />

      {/* Header with Stats */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2, flexWrap: "wrap", gap: 1 }}>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
            <TrendingUp sx={{ color: darkMode ? "#4facfe" : "#667eea", fontSize: 24 }} />
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700, 
                color: darkMode ? "#fff" : "#667eea",
                fontSize: { xs: "1rem", sm: "1.25rem" }
              }}
            >
              Monthly Trends
            </Typography>
          </Box>
          <Typography 
            variant="caption" 
            sx={{ 
              color: darkMode ? "#aaa" : "#666",
              fontSize: "0.75rem"
            }}
          >
            Receipt status over time • Range: {yAxisMin}-{yAxisMax}
          </Typography>
        </Box>

        {/* Quick Stats Chips */}
        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 0.5 }}>
          <Chip 
            label={`${totalPaid} Paid`}
            size="small"
            sx={{ 
              bgcolor: "rgba(76, 175, 80, 0.15)",
              color: "#4caf50",
              fontWeight: 600,
              fontSize: "0.7rem"
            }}
          />
          <Chip 
            label={`${totalPending} Pending`}
            size="small"
            sx={{ 
              bgcolor: "rgba(255, 152, 0, 0.15)",
              color: "#ff9800",
              fontWeight: 600,
              fontSize: "0.7rem"
            }}
          />
          <Chip 
            label={`${totalDraft} Draft`}
            size="small"
            sx={{ 
              bgcolor: "rgba(33, 150, 243, 0.15)",
              color: "#2196f3",
              fontWeight: 600,
              fontSize: "0.7rem"
            }}
          />
          {totalCancelled > 0 && (
            <Chip 
              label={`${totalCancelled} Cancelled`}
              size="small"
              sx={{ 
                bgcolor: "rgba(244, 67, 54, 0.15)",
                color: "#f44336",
                fontWeight: 600,
                fontSize: "0.7rem"
              }}
            />
          )}
        </Stack>
      </Box>

      {/* Chart */}
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <LineChart
          xAxis={[{ 
            scaleType: "point", 
            data: months,
            tickLabelStyle: { 
              fontSize: 11, 
              fill: darkMode ? "#fff" : "#000", 
              fontWeight: 500 
            }
          }]}
          yAxis={[{
            min: yAxisMin,
            max: yAxisMax,
            tickLabelStyle: { 
              fill: darkMode ? "#fff" : "#000", 
              fontWeight: 500 
            }
          }]}
          series={[
            { 
              data: paidData, 
              label: "Paid",
              color: "#4caf50",
              curve: "linear",
              showMark: true,
            },
            { 
              data: pendingData, 
              label: "Pending",
              color: "#ff9800",
              curve: "linear",
              showMark: true,
            },
            { 
              data: draftData, 
              label: "Draft",
              color: "#2196f3",
              curve: "linear",
              showMark: true,
            },
            { 
              data: cancelledData, 
              label: "Cancelled",
              color: "#f44336",
              curve: "linear",
              showMark: true,
            },
          ]}
          height={320}
          margin={{ top: 10, right: 20, bottom: 30, left: 55 }}
          grid={{ vertical: true, horizontal: true }}
          sx={{
            "& .MuiChartsLegend-series text": {
              fill: darkMode ? "#fff !important" : "#000 !important",
              fontWeight: "600 !important",
              fontSize: "0.8rem !important",
            },
            "& .MuiLineElement-root": {
              strokeWidth: 3,
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
            },
            "& .MuiMarkElement-root": {
              scale: "1.5",
              strokeWidth: 2.5,
              filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))",
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
