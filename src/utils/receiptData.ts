import type { Receipt, ReceiptStatus } from "../types/receipt";

export interface ReceiptData {
  receipts: Receipt[];
  categoryData: { label: string; value: number }[];
  statusData: { label: string; value: number }[];
  monthlyData: { month: string; draft: number; pending: number; paid: number; cancelled: number }[];
  categoryRevenue: { category: string; revenue: number }[];
}

export const getReceiptData = (): ReceiptData => {
  const receipts: Receipt[] = [];
  
  // Load all receipts from localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith("R")) {
      const raw = localStorage.getItem(key);
      if (raw) {
        try {
          const receipt = JSON.parse(raw);
          receipts.push(receipt);
        } catch (e) {
          console.error(`Error parsing receipt ${key}`, e);
        }
      }
    }
  }

  // Calculate category data (count of items per category)
  const categoryMap = new Map<string, number>();
  receipts.forEach((receipt) => {
    receipt.items?.forEach((item) => {
      const category = item.category || "Other";
      categoryMap.set(category, (categoryMap.get(category) || 0) + item.qty);
    });
  });

  const categoryData = Array.from(categoryMap.entries()).map(([label, value]) => ({
    label,
    value,
  }));

  // Calculate status data (count of receipts per status)
  const statusMap = new Map<ReceiptStatus, number>();
  receipts.forEach((receipt) => {
    const status = receipt.status || "Draft";
    statusMap.set(status, (statusMap.get(status) || 0) + 1);
  });

  const statusData = Array.from(statusMap.entries()).map(([label, value]) => ({
    label,
    value,
  }));

  // Calculate monthly data (receipts per month by status)
  const monthlyMap = new Map<string, { draft: number; pending: number; paid: number; cancelled: number }>();
  
  receipts.forEach((receipt) => {
    const date = new Date(receipt.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    
    if (!monthlyMap.has(monthKey)) {
      monthlyMap.set(monthKey, { draft: 0, pending: 0, paid: 0, cancelled: 0 });
    }
    
    const monthData = monthlyMap.get(monthKey)!;
    const status = (receipt.status || "Draft").toLowerCase() as "draft" | "pending" | "paid" | "cancelled";
    monthData[status]++;
  });

  // Sort by month and get last 6 months
  const sortedMonths = Array.from(monthlyMap.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-6);

  const monthlyData = sortedMonths.map(([monthKey, data]) => {
    const [year, month] = monthKey.split("-");
    const monthName = new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString("en-US", { month: "short" });
    return {
      month: monthName,
      ...data,
    };
  });

  // Calculate category revenue
  const categoryRevenueMap = new Map<string, number>();
  receipts.forEach((receipt) => {
    receipt.items?.forEach((item) => {
      const category = item.category || "Other";
      categoryRevenueMap.set(
        category,
        (categoryRevenueMap.get(category) || 0) + item.netAmount
      );
    });
  });

  const categoryRevenue = Array.from(categoryRevenueMap.entries()).map(([category, revenue]) => ({
    category,
    revenue,
  }));

  return {
    receipts,
    categoryData,
    statusData,
    monthlyData,
    categoryRevenue,
  };
};
