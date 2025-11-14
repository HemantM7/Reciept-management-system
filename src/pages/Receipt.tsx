import React, { useState, useEffect } from "react";
import { Autocomplete, Chip, Box, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { Add, Delete, Save, Refresh } from "@mui/icons-material";

const unitOptions = ["kg", "g", "l", "ml", "pcs", "box"];
const categoryOptions = ["Electronics", "Food", "Clothing", "Furniture", "Office Supplies", "Other"];

import {
  Button,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Card,
  CardContent,
  CardHeader,
  Divider,
} from "@mui/material";

import type { Receipt as ReceiptType, ItemRow, ReceiptStatus } from "../types/receipt";

type Receipt = ReceiptType;

interface ReceiptProps {
  onSave?: (summary: any) => void;
  onClose?: () => void;
  initialReceipt?: any;
}

const Receipt: React.FC<ReceiptProps> = ({
  onSave,
  onClose,
  initialReceipt,
}) => {
  const [receipt, setReceipt] = useState<Receipt>({
    receiptNo: "",
    date: new Date().toISOString().substring(0, 10),
    personName: "",
    items: [],
    remarks: "",
    totalQty: 0,
    totalAmt: 0,
    discount: 0,
    netAmount: 0,
    status: "Draft",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  //! Auto-generate receipt no
  useEffect(() => {
    if (initialReceipt) {
      setReceipt(initialReceipt);
    } else {
      const no = "R" + Date.now();
      setReceipt((prev) => ({ 
        ...prev, 
        receiptNo: no,
        createdAt: new Date().toISOString(),
      }));
    }
  }, [initialReceipt]);

  //! Save to localStorage
  const handleSave = () => {
    const updatedReceipt = {
      ...receipt,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(receipt.receiptNo, JSON.stringify(updatedReceipt));
    alert("Receipt Saved Successfully!");

    if (onSave) {
      const summary = {
        receiptNo: updatedReceipt.receiptNo,
        date: updatedReceipt.date,
        personName: updatedReceipt.personName,
        remarks: updatedReceipt.remarks,
        totalQty: updatedReceipt.totalQty,
        netAmount: updatedReceipt.netAmount,
        status: updatedReceipt.status,
      };
      onSave(summary);
    }

    if (onClose) onClose();
  };

  //! Reset for new receipt
  const handleNew = () => {
    setReceipt({
      receiptNo: "R" + Date.now(),
      date: new Date().toISOString().substring(0, 10),
      personName: "",
      items: [],
      remarks: "",
      totalQty: 0,
      totalAmt: 0,
      discount: 0,
      netAmount: 0,
      status: "Draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  const getStatusColor = (status: ReceiptStatus) => {
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

  //! Add new row
  const addRow = () => {
    const newRow: ItemRow = {
      id: Date.now(),
      itemName: "",
      unit: "",
      rate: 0,
      qty: 0,
      grossAmount: 0,
      discountPercent: 0,
      discountAmount: 0,
      netAmount: 0,
      category: "",
    };
    setReceipt((prev) => ({ ...prev, items: [...prev.items, newRow] }));
  };

  //! Handle change inside row
  const handleRowChange = (id: number, field: keyof ItemRow, value: any) => {
    const updated = receipt.items.map((row) => {
      if (row.id === id) {
        const updatedRow = { ...row, [field]: value };

        //todo Auto calculations
        updatedRow.grossAmount = updatedRow.rate * updatedRow.qty;
        updatedRow.discountAmount =
          (updatedRow.grossAmount * updatedRow.discountPercent) / 100;
        updatedRow.netAmount =
          updatedRow.grossAmount - updatedRow.discountAmount;

        return updatedRow;
      }
      return row;
    });

    //! totals
    const totalQty = updated.reduce((a, b) => a + Number(b.qty || 0), 0);
    const totalAmt = updated.reduce(
      (a, b) => a + Number(b.grossAmount || 0),
      0
    );
    const discount = updated.reduce(
      (a, b) => a + Number(b.discountAmount || 0),
      0
    );
    const netAmount = updated.reduce((a, b) => a + Number(b.netAmount || 0), 0);

    setReceipt((prev) => ({
      ...prev,
      items: updated,
      totalQty,
      totalAmt,
      discount,
      netAmount,
    }));
  };

  //! Delete row
  const deleteRow = (id: number) => {
    const updated = receipt.items.filter((r) => r.id !== id);
    setReceipt((prev) => ({ ...prev, items: updated }));
  };

  return (
    <Card className="max-w-6xl mx-auto w-full shadow-lg border rounded-2xl p-6 fade-in">
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <span style={{ fontWeight: 700, fontSize: "1.5rem" }}>Receipt</span>
            <Chip
              label={receipt.status}
              color={getStatusColor(receipt.status || "Draft")}
              size="small"
            />
          </Box>
        }
        action={
          <div className="flex space-x-2 gap-4">
            <Button variant="outlined" startIcon={<Refresh />} onClick={handleNew}>
              New
            </Button>
            <Button
              variant="contained"
              startIcon={<Save />}
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                "&:hover": {
                  background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                },
              }}
              onClick={handleSave}
            >
              Save
            </Button>
            <Button variant="outlined" color="error" onClick={onClose}>
              Close
            </Button>
          </div>
        }
      />
      <Divider />
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <TextField
            label="Receipt No"
            value={receipt.receiptNo}
            InputProps={{ readOnly: true }}
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "#f5f5f5",
              },
            }}
          />
          <TextField
            label="Date"
            type="date"
            value={receipt.date}
            onChange={(e) => setReceipt({ ...receipt, date: e.target.value })}
          />
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={receipt.status || "Draft"}
              label="Status"
              onChange={(e) =>
                setReceipt({ ...receipt, status: e.target.value as ReceiptStatus })
              }
            >
              <MenuItem value="Draft">Draft</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Paid">Paid</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </div>

        <TextField
          sx={{ marginY: "15px" }}
          fullWidth
          label="Person Name"
          value={receipt.personName}
          onChange={(e) =>
            setReceipt({ ...receipt, personName: e.target.value })
          }
        />

        <Table className="border rounded-lg" sx={{ marginBottom: "15px" }}>
          <TableHead>
            <TableRow sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
              <TableCell sx={{ color: "white", fontWeight: 600 }}>Sr.</TableCell>
              <TableCell sx={{ color: "white", fontWeight: 600 }}>Item Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: 600 }}>Category</TableCell>
              <TableCell sx={{ color: "white", fontWeight: 600 }}>Unit</TableCell>
              <TableCell sx={{ color: "white", fontWeight: 600 }}>Rate</TableCell>
              <TableCell sx={{ color: "white", fontWeight: 600 }}>Qty</TableCell>
              <TableCell sx={{ color: "white", fontWeight: 600 }}>Gross</TableCell>
              <TableCell sx={{ color: "white", fontWeight: 600 }}>Discount %</TableCell>
              <TableCell sx={{ color: "white", fontWeight: 600 }}>Discount Amt</TableCell>
              <TableCell sx={{ color: "white", fontWeight: 600 }}>Net Amt</TableCell>
              <TableCell sx={{ color: "white", fontWeight: 600 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receipt.items.map((row, idx) => (
              <TableRow key={row.id} sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    value={row.itemName}
                    onChange={(e) =>
                      handleRowChange(row.id, "itemName", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Autocomplete
                    options={categoryOptions}
                    value={row.category || ""}
                    onChange={(_, newValue) =>
                      handleRowChange(row.id, "category", newValue || "")
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Category" size="small" />
                    )}
                    sx={{ minWidth: 120 }}
                  />
                </TableCell>
                <TableCell>
                  <Autocomplete
                    options={unitOptions}
                    value={row.unit}
                    onChange={(_, newValue) =>
                      handleRowChange(row.id, "unit", newValue || "")
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Unit" size="small" />
                    )}
                    sx={{ minWidth: 100 }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    type="number"
                    value={row.rate}
                    onChange={(e) =>
                      handleRowChange(row.id, "rate", Number(e.target.value))
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    type="number"
                    value={row.qty}
                    onChange={(e) =>
                      handleRowChange(row.id, "qty", Number(e.target.value))
                    }
                  />
                </TableCell>
                <TableCell>{row.grossAmount}</TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    type="number"
                    value={row.discountPercent}
                    onChange={(e) =>
                      handleRowChange(
                        row.id,
                        "discountPercent",
                        Number(e.target.value)
                      )
                    }
                  />
                </TableCell>
                <TableCell>{row.discountAmount.toFixed(4)}</TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    type="number"
                    value={row.netAmount}
                    onChange={(e) =>
                      handleRowChange(
                        row.id,
                        "netAmount",
                        Number(e.target.value)
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => deleteRow(row.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={10}>
                <Button startIcon={<Add />} onClick={addRow} variant="outlined">
                  Add Item
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Divider style={{ marginBottom: "15px" }} />

        <div className="grid grid-cols-3 gap-6 items-start mt-4">
          <TextField
            multiline
            rows={3}
            fullWidth
            label="Remarks"
            value={receipt.remarks}
            onChange={(e) =>
              setReceipt({ ...receipt, remarks: e.target.value })
            }
          />

          <div className="flex items-center justify-center">
            <TextField
              label="Total Qty"
              value={receipt.totalQty}
              InputProps={{ readOnly: true }}
            />
          </div>

          <div className="flex flex-col space-y-2 gap-3">
            <TextField
              label="Total Amt"
              value={receipt.totalAmt.toFixed(4)}
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Discount"
              value={receipt.discount.toFixed(4)}
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Net Amount"
              value={receipt.netAmount.toFixed(4)}
              InputProps={{ readOnly: true }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Receipt;
