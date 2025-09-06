import { useState } from 'react';
import { Bill } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Calendar, DollarSign, Settings } from 'lucide-react';
import { AutoPayModal } from './AutoPayModal';

interface BillCardProps {
  bill: Bill;
  onPayNow: (billId: string) => void;
  onEnableAutoPay: (billId: string) => void;
}

export const BillCard = ({ bill, onPayNow, onEnableAutoPay }: BillCardProps) => {
  const [showAutoPayModal, setShowAutoPayModal] = useState(false);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'paid':
        return 'paid';
      case 'pending':
        return 'pending';
      case 'autopay':
        return 'autopay';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = () => {
    return new Date(bill.dueDate) < new Date() && bill.status === 'pending';
  };

  return (
    <>
      <Card className={`gradient-card border-border shadow-card transition-all duration-300 hover:scale-105 hover:shadow-glow ${isOverdue() ? 'border-destructive/50' : ''}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{bill.serviceIcon}</div>
              <div>
                <h3 className="font-semibold text-lg">{bill.serviceName}</h3>
                <p className="text-sm text-muted-foreground">{bill.category}</p>
              </div>
            </div>
            <Badge variant={getStatusVariant(bill.status)}>
              {bill.status.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {formatDate(bill.dueDate)}
                {isOverdue() && <span className="text-destructive ml-1">(Overdue)</span>}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">${bill.amount.toFixed(2)}</span>
            </div>
          </div>

          {bill.description && (
            <p className="text-sm text-muted-foreground">{bill.description}</p>
          )}

          <div className="flex gap-2 pt-2">
            {bill.status === 'pending' && (
              <Button
                size="sm"
                variant="gradient"
                onClick={() => onPayNow(bill.id)}
                className="flex-1"
              >
                Pay Now
              </Button>
            )}

            {bill.status !== 'autopay' && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowAutoPayModal(true)}
                className="flex-1 gap-2"
              >
                <Settings className="h-3 w-3" />
                Enable AutoPay
              </Button>
            )}

            {bill.status === 'autopay' && (
              <Button
                size="sm"
                variant="ghost"
                className="flex-1 gap-2"
              >
                <Settings className="h-3 w-3" />
                Manage AutoPay
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <AutoPayModal
        isOpen={showAutoPayModal}
        onClose={() => setShowAutoPayModal(false)}
        bill={bill}
        onSave={onEnableAutoPay}
      />
    </>
  );
};