import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { NotificationsPanel } from '@/components/dashboard/NotificationsPanel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockNotifications } from '@/data/mockData';
import { 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  AlertTriangle,
  Settings,
  Filter,
  MoreVertical
} from 'lucide-react';
import { Notification } from '@/types';

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<string>('all');

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    return notification.type === filter;
  });

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'upcoming':
        return <Clock className="h-5 w-5 text-info" />;
      case 'overdue':
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      default:
        return <Bell className="h-5 w-5 text-primary" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'upcoming':
        return 'bg-info text-info-foreground';
      case 'overdue':
        return 'bg-destructive text-destructive-foreground';
      case 'success':
        return 'bg-success text-success-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  const filterCounts = {
    all: notifications.length,
    upcoming: notifications.filter(n => n.type === 'upcoming').length,
    overdue: notifications.filter(n => n.type === 'overdue').length,
    success: notifications.filter(n => n.type === 'success').length,
    warning: notifications.filter(n => n.type === 'warning').length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gradient mb-2">Notifications</h1>
              <p className="text-muted-foreground">
                Stay updated with your bills and payments
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button onClick={markAllAsRead} size="sm">
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark All Read
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="gradient-card border-border sticky top-20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filter Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(filterCounts).map(([key, count]) => (
                  <Button
                    key={key}
                    variant={filter === key ? 'default' : 'ghost'}
                    size="sm"
                    className="w-full justify-between"
                    onClick={() => setFilter(key)}
                  >
                    <span className="capitalize">{key}</span>
                    <Badge variant="secondary" className="text-xs">
                      {count}
                    </Badge>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Notifications List */}
          <div className="lg:col-span-3 space-y-4">
            {filteredNotifications.length === 0 ? (
              <Card className="gradient-card border-border">
                <CardContent className="p-12 text-center">
                  <div className="text-6xl mb-4">🔔</div>
                  <h3 className="text-xl font-semibold mb-2">No notifications found</h3>
                  <p className="text-muted-foreground">
                    {filter === 'all' 
                      ? "You're all caught up! No notifications at the moment."
                      : `No ${filter} notifications found.`
                    }
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`gradient-card border-border hover:scale-[1.02] transition-all duration-300 ${
                    notification.read ? 'opacity-70' : ''
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-foreground">
                                {notification.title}
                              </h3>
                              <Badge 
                                className={`text-xs ${getTypeColor(notification.type)}`}
                              >
                                {notification.type.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground mb-3">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(notification.timestamp).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          
                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Notifications;