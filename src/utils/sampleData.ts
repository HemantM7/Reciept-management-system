import type { Receipt, ReceiptStatus } from "../types/receipt";

const categories = ["Electronics", "Food", "Clothing", "Furniture", "Office Supplies"];
const units = ["kg", "g", "l", "ml", "pcs", "box"];
const statuses: ReceiptStatus[] = ["Draft", "Pending", "Paid", "Cancelled"];
const names = ["John Doe", "Jane Smith", "Bob Johnson", "Alice Williams", "Charlie Brown"];

const getRandomItem = <T,>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomDate = (daysBack: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - getRandomNumber(0, daysBack));
  return date.toISOString().substring(0, 10);
};

export const generateSampleReceipts = (count: number = 20): void => {
  for (let i = 0; i < count; i++) {
    const itemCount = getRandomNumber(1, 5);
    const items = [];
    
    for (let j = 0; j < itemCount; j++) {
      const rate = getRandomNumber(10, 500);
      const qty = getRandomNumber(1, 10);
      const grossAmount = rate * qty;
      const discountPercent = getRandomNumber(0, 20);
      const discountAmount = (grossAmount * discountPercent) / 100;
      const netAmount = grossAmount - discountAmount;
      
      items.push({
        id: Date.now() + j,
        itemName: `${getRandomItem(categories)} Item ${j + 1}`,
        unit: getRandomItem(units),
        rate,
        qty,
        grossAmount,
        discountPercent,
        discountAmount,
        netAmount,
        category: getRandomItem(categories),
      });
    }
    
    const totalQty = items.reduce((sum, item) => sum + item.qty, 0);
    const totalAmt = items.reduce((sum, item) => sum + item.grossAmount, 0);
    const discount = items.reduce((sum, item) => sum + item.discountAmount, 0);
    const netAmount = items.reduce((sum, item) => sum + item.netAmount, 0);
    
    const receipt: Receipt = {
      receiptNo: `R${Date.now() + i}`,
      date: getRandomDate(180), // Random date within last 6 months
      personName: getRandomItem(names),
      items,
      remarks: `Sample receipt ${i + 1}`,
      totalQty,
      totalAmt,
      discount,
      netAmount,
      status: getRandomItem(statuses),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    localStorage.setItem(receipt.receiptNo, JSON.stringify(receipt));
    
    // Small delay to ensure unique timestamps
    const now = Date.now();
    while (Date.now() < now + 2) {
      // Wait
    }
  }
};

export const clearAllReceipts = (): void => {
  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith("R")) {
      keys.push(key);
    }
  }
  keys.forEach((key) => localStorage.removeItem(key));
};
