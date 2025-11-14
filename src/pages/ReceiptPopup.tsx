import Receipt from "./Receipt";

interface ReceiptPopupProps {
  onSave: (receipt: any) => void;
  onClose: () => void;
  initialReceipt?: any;
}

const ReceiptPopup = ({
  onSave,
  onClose,
  initialReceipt,
}: ReceiptPopupProps) => {
  return (
    <div>
      <Receipt
        onSave={onSave}
        onClose={onClose}
        initialReceipt={initialReceipt}
      />
    </div>
  );
};

export default ReceiptPopup;
