import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, CheckCircle } from 'lucide-react';

export const WalletConnectButton = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Mock connection delay
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  if (isConnected) {
    return (
      <Button
        variant="success"
        onClick={handleDisconnect}
        className="gap-2"
      >
        <CheckCircle className="h-4 w-4" />
        Connected (0x1234...5678)
      </Button>
    );
  }

  return (
    <Button
      variant="gradient"
      onClick={handleConnect}
      disabled={isConnecting}
      className="gap-2"
    >
      <Wallet className="h-4 w-4" />
      {isConnecting ? 'Connecting...' : 'Connect Aptos Wallet'}
    </Button>
  );
};