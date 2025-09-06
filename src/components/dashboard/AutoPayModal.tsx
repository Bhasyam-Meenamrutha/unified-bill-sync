import { useState } from 'react';
import { Bill } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Calendar, DollarSign, Repeat } from 'lucide-react';

interface AutoPayModalProps {
  isOpen: boolean;
  onClose: () => void;
  bill: Bill;
  onSave: (billId: string) => void;
}

export const AutoPayModal = ({ isOpen, onClose, bill, onSave }: AutoPayModalProps) => {
  const [paymentDate, setPaymentDate] = useState('');
  const [frequency, setFrequency] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [maxLimit, setMaxLimit] = useState(bill.amount.toString());

  const handleSave = () => {
    // Save autopay settings to local state or backend
    onSave(bill.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="gradient-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="text-2xl">{bill.serviceIcon}</div>
            Enable AutoPay for {bill.serviceName}
          </DialogTitle>
          <DialogDescription>
            Set up automatic payments for your {bill.serviceName} bill. You can modify or disable this anytime.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="payment-date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Payment Date
              </Label>
              <Input
                id="payment-date"
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Repeat className="h-4 w-4" />
                Frequency
              </Label>
              <Select value={frequency} onValueChange={(value: 'monthly' | 'quarterly' | 'yearly') => setFrequency(value)}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="max-limit" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Maximum Payment Limit
              </Label>
              <Input
                id="max-limit"
                type="number"
                step="0.01"
                value={maxLimit}
                onChange={(e) => setMaxLimit(e.target.value)}
                className="bg-background"
                placeholder="Enter maximum amount"
              />
            </div>
          </div>

          <div className="bg-muted/20 rounded-lg p-4 space-y-2">
            <h4 className="font-medium">AutoPay Summary</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Payment will be automatically processed {frequency}</p>
              <p>• Maximum limit: ${maxLimit}</p>
              <p>• Next payment: {paymentDate || 'Please select a date'}</p>
              <p>• You can modify or cancel anytime from your dashboard</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button 
            variant="gradient" 
            onClick={handleSave}
            disabled={!paymentDate}
            className="flex-1"
          >
            Enable AutoPay
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};