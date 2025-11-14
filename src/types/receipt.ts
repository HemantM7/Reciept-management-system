export type ReceiptStatus = "Draft" | "Paid" | "Pending" | "Cancelled";

export type ItemRow = {
  id: number;
  itemName: string;
  unit: string;
  rate: number;
  qty: number;
  grossAmount: number;
  discountPercent: number;
  discountAmount: number;
  netAmount: number;
  category?: string;
};

export type Receipt = {
  receiptNo: string;
  date: string;
  personName: string;
  items: ItemRow[];
  remarks: string;
  totalQty: number;
  totalAmt: number;
  discount: number;
  netAmount: number;
  status?: ReceiptStatus;
  createdAt?: string;
  updatedAt?: string;
};
