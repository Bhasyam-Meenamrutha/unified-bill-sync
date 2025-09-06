import { useState, useMemo } from 'react';
import { Bill, BillStatus } from '@/types';
import { mockBills, mockNotifications } from '@/data/mockData';
import { BillCard } from './BillCard';
import { FilterBar } from './FilterBar';
import { NotificationsPanel } from './NotificationsPanel';
import { OneClickPayButton } from './OneClickPayButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutGrid, List, TrendingUp, DollarSign, Calendar, Activity } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const Dashboard = () => {
  const [bills, setBills] = useState<Bill[]>(mockBills);
  const [currentFilter, setCurrentFilter] = useState<BillStatus>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const { toast } = useToast();

  const filteredBills = useMemo(() => {
    if (currentFilter === 'all') return bills;
    return bills.filter(bill => bill.status === currentFilter);
  }, [bills, currentFilter]);

  const billCounts = useMemo(() => {
    return {
      all: bills.length,
      pending: bills.filter(b => b.status === 'pending').length,
      paid: bills.filter(b => b.status === 'paid').length,
      autopay: bills.filter(b => b.status === 'autopay').length,
    };
  }, [bills]);

  const pendingBills = bills.filter(b => b.status === 'pending');
  const totalPendingAmount = pendingBills.reduce((sum, bill) => sum + bill.amount, 0);

  const handlePayNow = (billId: string) => {
    setBills(prevBills => 
      prevBills.map(bill => 
        bill.id === billId ? { ...bill, status: 'paid' } : bill
      )
    );
    toast({
      title: "Payment Successful!",
      description: "Your bill has been paid successfully.",
      variant: "default",
    });
  };

  const handleEnableAutoPay = (billId: string) => {
    setBills(prevBills => 
      prevBills.map(bill => 
        bill.id === billId ? { ...bill, status: 'autopay' } : bill
      )
    );
    toast({
      title: "AutoPay Enabled!",
      description: "Your bill will now be paid automatically.",
      variant: "default",
    });
  };

  const handlePayAll = () => {
    setBills(prevBills => 
      prevBills.map(bill => 
        bill.status === 'pending' ? { ...bill, status: 'paid' } : bill
      )
    );
  };

  const totalMonthlyAmount = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const autoPaidAmount = bills.filter(b => b.status === 'autopay').reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <div className="space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="gradient-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Monthly</p>
                  <p className="text-2xl font-bold">${totalMonthlyAmount.toFixed(2)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Bills</p>
                  <p className="text-2xl font-bold">{billCounts.pending}</p>
                </div>
                <Calendar className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">AutoPay Active</p>
                  <p className="text-2xl font-bold">${autoPaidAmount.toFixed(2)}</p>
                </div>
                <Activity className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Saved This Month</p>
                  <p className="text-2xl font-bold">$127.40</p>
                </div>
                <TrendingUp className="h-8 w-8 text-info" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <OneClickPayButton
            pendingBillsCount={billCounts.pending}
            totalAmount={totalPendingAmount}
            onPayAll={handlePayAll}
          />

          <div className="flex items-center gap-4">
            <FilterBar
              currentFilter={currentFilter}
              onFilterChange={setCurrentFilter}
              billCounts={billCounts}
            />

            <div className="flex border border-border rounded-lg p-1">
              <Button
                variant={viewMode === 'cards' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('cards')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'table' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Bills Section */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Your Bills</h2>
              <span className="text-sm text-muted-foreground">
                Showing {filteredBills.length} of {bills.length} bills
              </span>
            </div>

            {filteredBills.length === 0 ? (
              <Card className="gradient-card border-border">
                <CardContent className="p-12 text-center">
                  <div className="text-6xl mb-4">📋</div>
                  <h3 className="text-xl font-semibold mb-2">No bills found</h3>
                  <p className="text-muted-foreground">
                    {currentFilter === 'all' 
                      ? "You don't have any bills yet. Add your first bill to get started!"
                      : `No bills with status "${currentFilter}" found.`
                    }
                  </p>
                </CardContent>
              </Card>
            ) : viewMode === 'cards' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredBills.map((bill) => (
                  <BillCard
                    key={bill.id}
                    bill={bill}
                    onPayNow={handlePayNow}
                    onEnableAutoPay={handleEnableAutoPay}
                  />
                ))}
              </div>
            ) : (
              <Card className="gradient-card border-border">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-border">
                        <tr>
                          <th className="text-left p-4">Service</th>
                          <th className="text-left p-4">Due Date</th>
                          <th className="text-left p-4">Amount</th>
                          <th className="text-left p-4">Status</th>
                          <th className="text-left p-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBills.map((bill) => (
                          <tr key={bill.id} className="border-b border-border/50 hover:bg-muted/20">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <span className="text-xl">{bill.serviceIcon}</span>
                                <div>
                                  <p className="font-medium">{bill.serviceName}</p>
                                  <p className="text-sm text-muted-foreground">{bill.category}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-sm">
                              {new Date(bill.dueDate).toLocaleDateString()}
                            </td>
                            <td className="p-4 font-medium">${bill.amount.toFixed(2)}</td>
                            <td className="p-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                bill.status === 'paid' ? 'bg-success text-success-foreground' :
                                bill.status === 'pending' ? 'bg-warning text-warning-foreground' :
                                'bg-info text-info-foreground'
                              }`}>
                                {bill.status.toUpperCase()}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                {bill.status === 'pending' && (
                                  <Button size="sm" onClick={() => handlePayNow(bill.id)}>
                                    Pay Now
                                  </Button>
                                )}
                                {bill.status !== 'autopay' && (
                                  <Button size="sm" variant="outline" onClick={() => handleEnableAutoPay(bill.id)}>
                                    AutoPay
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <NotificationsPanel notifications={mockNotifications} />
            
            {/* Quick Actions */}
            <Card className="gradient-card border-border">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  + Add New Bill
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  📊 View Reports
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  ⚙️ Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

    </div>
  );
};