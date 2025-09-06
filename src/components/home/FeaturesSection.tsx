import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Shield, 
  Clock, 
  Bell, 
  BarChart3, 
  Zap,
  Smartphone,
  Globe,
  Lock
} from 'lucide-react';

export const FeaturesSection = () => {
  const features = [
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "One-Click Payments",
      description: "Pay all your bills instantly with a single click. No more juggling multiple platforms.",
      badge: "Popular",
      color: "text-primary"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Smart AutoPay",
      description: "Set intelligent automation rules that adapt to your spending patterns and preferences.",
      badge: "Smart",
      color: "text-success"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Blockchain Security",
      description: "Your transactions are secured by decentralized blockchain technology.",
      badge: "Secure",
      color: "text-info"
    },
    {
      icon: <Bell className="h-8 w-8" />,
      title: "Smart Notifications",
      description: "Get proactive alerts about upcoming bills, payment confirmations, and savings opportunities.",
      badge: "New",
      color: "text-warning"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Spending Analytics",
      description: "Detailed insights into your spending patterns with AI-powered recommendations.",
      badge: "AI-Powered",
      color: "text-purple-500"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Instant transactions with minimal fees. Experience the future of payments today.",
      badge: "Fast",
      color: "text-yellow-500"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile-First Design",
      description: "Fully responsive interface that works seamlessly across all your devices.",
      badge: "Responsive",
      color: "text-green-500"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Coverage",
      description: "Pay bills worldwide with support for multiple currencies and payment methods.",
      badge: "Global",
      color: "text-blue-500"
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Privacy-First",
      description: "Your financial data remains private with end-to-end encryption and zero-knowledge proofs.",
      badge: "Private",
      color: "text-red-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-muted/20 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient">
            Powerful Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to manage your bills efficiently and securely. 
            Built with cutting-edge technology for the modern user.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="gradient-card border-border hover:scale-105 transition-all duration-300 animate-fade-in group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <Badge variant="default" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary">
            <Zap className="h-4 w-4" />
            Ready to experience the future of bill payments?
          </div>
        </div>
      </div>
    </section>
  );
};