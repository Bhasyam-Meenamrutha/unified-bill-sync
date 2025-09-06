import { BillStatus } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FilterBarProps {
  currentFilter: BillStatus;
  onFilterChange: (filter: BillStatus) => void;
  billCounts: Record<BillStatus, number>;
}

export const FilterBar = ({ currentFilter, onFilterChange, billCounts }: FilterBarProps) => {
  const filters: { key: BillStatus; label: string; variant: any }[] = [
    { key: 'all', label: 'All Bills', variant: 'outline' },
    { key: 'pending', label: 'Pending', variant: 'pending' },
    { key: 'paid', label: 'Paid', variant: 'paid' },
    { key: 'autopay', label: 'AutoPay', variant: 'autopay' },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.key}
          variant={currentFilter === filter.key ? 'gradient' : 'ghost'}
          onClick={() => onFilterChange(filter.key)}
          className="gap-2"
        >
          {filter.label}
          <Badge variant={filter.variant} className="text-xs">
            {billCounts[filter.key]}
          </Badge>
        </Button>
      ))}
    </div>
  );
};