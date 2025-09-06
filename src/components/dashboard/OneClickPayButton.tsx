import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Zap, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OneClickPayButtonProps {
  pendingBillsCount: number;
  totalAmount: number;
  onPayAll: () => void;
}

export const OneClickPayButton = ({ pendingBillsCount, totalAmount, onPayAll }: OneClickPayButtonProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handlePayAll = async () => {
    if (pendingBillsCount === 0) return;

    setIsProcessing(true);
    
    // Mock payment processing
    setTimeout(() => {
      onPayAll();
      setIsProcessing(false);
      toast({
        title: "Payment Successful!",
        description: `Successfully paid ${pendingBillsCount} bills totaling $${totalAmount.toFixed(2)}`,
        variant: "default",
      });
    }, 3000);
  };

  if (pendingBillsCount === 0) {
    return (
      <Button variant="success" size="xl" disabled className="gap-2">
        <CheckCircle className="h-5 w-5" />
        All Bills Paid
      </Button>
    );
  }

  return (
    <Button
      variant="glow"
      size="xl"
      onClick={handlePayAll}
      disabled={isProcessing}
      className="gap-2 relative overflow-hidden"
    >
      <Zap className="h-5 w-5" />
      {isProcessing ? (
        <>
          <span>Processing...</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </>
      ) : (
        <>
          OneClick Pay All ({pendingBillsCount} bills)
          <span className="font-bold">${totalAmount.toFixed(2)}</span>
        </>
      )}
    </Button>
  );
};