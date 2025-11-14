import { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  InputAdornment,
  Box,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { Edit, Delete, Search, Print, Add, FileDownload } from "@mui/icons-material";
import { Dialog } from "@mui/material";
import ReceiptPopup from "../pages/ReceiptPopup";
import type { ReceiptStatus } from "../types/receipt";

interface Props {
  open: boolean;
  onClose: () => void;
}

type Receipt = {
  receiptNo: string;
  date: string;
  personName: string;
  totalQty: number;
  netAmount: number;
  remarks: string;
  status?: ReceiptStatus;
};

const ReceiptList = ({ open, onClose }: Props) => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [filteredReceipts, setFilteredReceipts] = useState<Receipt[]>([]);
  const [showReceiptPopup, setShowReceiptPopup] = useState(false);
  const [currentReceipt, setCurrentReceipt] = useState<Receipt | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  //! Load receipts from localStorage on component mount
  useEffect(() => {
    const allReceipts: Receipt[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("R")) {
        const raw = localStorage.getItem(key);
        if (raw) {
          try {
            const fullReceipt = JSON.parse(raw);
            const summary: Receipt = {
              receiptNo: fullReceipt.receiptNo,
              date: fullReceipt.date,
              personName: fullReceipt.personName,
              totalQty: fullReceipt.totalQty,
              netAmount: fullReceipt.netAmount,
              remarks: fullReceipt.remarks,
              status: fullReceipt.status || "Draft",
            };
            allReceipts.push(summary);
          } catch (e) {
            console.error(`Error parsing receipt ${key}`, e);
          }
        }
      }
    }

    setReceipts(allReceipts);
    setFilteredReceipts(allReceipts);
  }, [open]); //! reload every time the dialog opens

  //! Filter receipts based on search and status
  useEffect(() => {
    let filtered = receipts;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (r) =>
          r.receiptNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.personName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "All") {
      filtered = filtered.filter((r) => r.status === statusFilter);
    }

    setFilteredReceipts(filtered);
  }, [searchQuery, statusFilter, receipts]);

  //! Open the dialog to add a new receipt
  const handleAdd = () => {
    setShowReceiptPopup(true);
  };

  //! Update state when new receipt is saved
  const handleReceiptSave = (newReceipt: Receipt) => {
    setReceipts((prev) => {
      const updated = prev.filter((r) => r.receiptNo !== newReceipt.receiptNo);
      return [...updated, newReceipt];
    });

    setCurrentReceipt(null);
    setShowReceiptPopup(false);
  };

  //! Handle delete functionality
  const handleDelete = (receiptNo: string) => {
    localStorage.removeItem(receiptNo);
    setReceipts(receipts.filter((r) => r.receiptNo !== receiptNo));
  };

  const handleEdit = (receipt: Receipt) => {
    //! Load full receipt data from localStorage for editing
    const raw = localStorage.getItem(receipt.receiptNo);
    if (raw) {
      try {
        const fullReceipt = JSON.parse(raw);
        setCurrentReceipt(fullReceipt);
      } catch (e) {
        setCurrentReceipt(receipt);
      }
    } else {
      setCurrentReceipt(receipt);
    }
    setShowReceiptPopup(true);
  };

  //! Handle print
  const handlePrint = () => {
    window.print();
  };

  //! Export to CSV
  const handleExportCSV = () => {
    const headers = ["Receipt No", "Date", "Person Name", "Total Qty", "Net Amount", "Status", "Remarks"];
    const csvData = filteredReceipts.map((r) => [
      r.receiptNo,
      r.date,
      r.personName,
      r.totalQty,
      r.netAmount.toFixed(2),
      r.status || "Draft",
      r.remarks,
    ]);

    const csv = [headers, ...csvData].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipts_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const getStatusColor = (status?: ReceiptStatus) => {
    switch (status) {
      case "Paid":
        return "success";
      case "Pending":
        return "warning";
      case "Draft":
        return "info";
      case "Cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <div className="max-w-7xl mx-auto p-4 fade-in">
        <Box
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "20px",
            borderRadius: "12px 12px 0 0",
            color: "white",
            mb: 3,
          }}
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Receipt Management</h2>
              <p className="text-sm opacity-90 mt-1">
                Manage and track all your receipts
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="contained"
                startIcon={<Add />}
                sx={{
                  background: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(10px)",
                  "&:hover": { background: "rgba(255, 255, 255, 0.3)" },
                }}
                onClick={handleAdd}
              >
                Add New
              </Button>
              <Button
                variant="outlined"
                startIcon={<FileDownload />}
                sx={{
                  color: "white",
                  borderColor: "white",
                  "&:hover": { borderColor: "white", background: "rgba(255, 255, 255, 0.1)" },
                }}
                onClick={handleExportCSV}
              >
                Export CSV
              </Button>
              <Button
                variant="outlined"
                startIcon={<Print />}
                sx={{
                  color: "white",
                  borderColor: "white",
                  "&:hover": { borderColor: "white", background: "rgba(255, 255, 255, 0.1)" },
                }}
                onClick={handlePrint}
              >
                Print
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "white",
                  "&:hover": { borderColor: "white", background: "rgba(255, 255, 255, 0.1)" },
                }}
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          </div>
        </Box>

        {/* Search and Filter */}
        <Box sx={{ display: "flex", gap: 2, mb: 3, px: 2 }}>
          <TextField
            placeholder="Search by receipt no or person name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ flex: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="All">All Status</MenuItem>
              <MenuItem value="Draft">Draft</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Paid">Paid</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TableContainer component={Paper} sx={{ borderRadius: "12px", overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>Sr No.</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>Receipt No</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>Date</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>Person Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>Total Qty</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>Net Amount</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>Remarks</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReceipts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      No receipts found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredReceipts.map((receipt, index) => (
                  <TableRow
                    key={receipt.receiptNo}
                    sx={{
                      "&:hover": { backgroundColor: "#f5f5f5" },
                      transition: "background-color 0.2s",
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{receipt.receiptNo}</TableCell>
                    <TableCell>{receipt.date}</TableCell>
                    <TableCell>{receipt.personName}</TableCell>
                    <TableCell>{receipt.totalQty}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      ${receipt.netAmount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={receipt.status || "Draft"}
                        color={getStatusColor(receipt.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{receipt.remarks}</TableCell>
                    <TableCell>
                      <IconButton
                        sx={{
                          color: "#667eea",
                          "&:hover": { background: "rgba(102, 126, 234, 0.1)" },
                        }}
                        onClick={() => handleEdit(receipt)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        sx={{
                          color: "#f5576c",
                          "&:hover": { background: "rgba(245, 87, 108, 0.1)" },
                        }}
                        onClick={() => handleDelete(receipt.receiptNo)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog
          open={showReceiptPopup}
          onClose={() => {
            setShowReceiptPopup(false);
            setCurrentReceipt(null);
          }}
          fullWidth
          maxWidth={false}
          PaperProps={{ style: { width: "1150px", maxWidth: "1150px" } }}
        >
          <ReceiptPopup
            onSave={handleReceiptSave}
            onClose={() => {
              setShowReceiptPopup(false);
              setCurrentReceipt(null);
            }}
            initialReceipt={currentReceipt}
          />
        </Dialog>
      </div>
    </Dialog>
  );
};

export default ReceiptList;
