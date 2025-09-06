import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SparklingGlobe } from './SparklingGlobe';
import { ArrowRight, DollarSign, Calendar, Activity, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-background/50 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-info/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.1),transparent)] animate-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.08),transparent)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-gradient">Unified</span>
                <br />
                <span className="text-foreground">Bill Payment</span>
                <br />
                <span className="text-gradient">& AutoPay</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Take control of your finances with our decentralized bill payment platform. 
                Never miss a payment again with intelligent automation and blockchain security.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                size="xl" 
                variant="gradient"
                className="text-lg font-semibold animate-glow"
              >
                <Link to="/dashboard">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="xl" 
                variant="outline"
                className="text-lg font-semibold"
              >
                Learn More
              </Button>
            </div>

            {/* Stats Dashboard Preview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
              <Card className="gradient-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Total Monthly</p>
                      <p className="text-lg font-bold">$426.77</p>
                    </div>
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="gradient-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Pending Bills</p>
                      <p className="text-lg font-bold">3</p>
                    </div>
                    <Calendar className="h-5 w-5 text-warning" />
                  </div>
                </CardContent>
              </Card>

              <Card className="gradient-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">AutoPay Active</p>
                      <p className="text-lg font-bold">$24.98</p>
                    </div>
                    <Activity className="h-5 w-5 text-success" />
                  </div>
                </CardContent>
              </Card>

              <Card className="gradient-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Saved This Month</p>
                      <p className="text-lg font-bold">$127.40</p>
                    </div>
                    <TrendingUp className="h-5 w-5 text-info" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sparkling Globe */}
          <div className="flex justify-center lg:justify-end animate-scale-in">
            <div className="relative">
              <SparklingGlobe />
              {/* Floating Elements */}
              <div className="absolute -top-8 -left-8 animate-bounce delay-300">
                <div className="bg-primary/20 backdrop-blur-sm rounded-full p-3 border border-primary/30">
                  <span className="text-sm font-medium">⚡ Auto</span>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 animate-bounce delay-700">
                <div className="bg-success/20 backdrop-blur-sm rounded-full p-3 border border-success/30">
                  <span className="text-sm font-medium">💰 Save</span>
                </div>
              </div>
              <div className="absolute top-1/2 -right-12 animate-bounce delay-500">
                <div className="bg-info/20 backdrop-blur-sm rounded-full p-3 border border-info/30">
                  <span className="text-sm font-medium">🔒 Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};