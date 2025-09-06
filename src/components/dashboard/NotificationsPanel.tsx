import { Notification } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, AlertCircle, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface NotificationsPanelProps {
  notifications: Notification[];
}

export const NotificationsPanel = ({ notifications }: NotificationsPanelProps) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'upcoming':
        return <Clock className="h-4 w-4" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4" />;
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getNotificationVariant = (type: string) => {
    switch (type) {
      case 'upcoming':
        return 'default';
      case 'overdue':
        return 'destructive';
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      default:
        return 'default';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="gradient-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
          <Badge variant="default">{notifications.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No notifications</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 border border-border/50"
            >
              <div className="flex-shrink-0 mt-0.5">
                <Badge variant={getNotificationVariant(notification.type)}>
                  {getNotificationIcon(notification.type)}
                </Badge>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm">{notification.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {formatTimestamp(notification.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};