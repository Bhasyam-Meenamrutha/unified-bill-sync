import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Circle, Zap, Shield, Globe, Smartphone } from 'lucide-react';

interface RoadmapStep {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  icon: any;
}

const roadmapSteps: RoadmapStep[] = [
  {
    id: 1,
    title: 'Connect Wallet',
    description: 'Securely connect your Aptos wallet to get started',
    status: 'completed',
    icon: Shield
  },
  {
    id: 2,
    title: 'Add Bills',
    description: 'Import or manually add your recurring bills',
    status: 'completed',
    icon: Circle
  },
  {
    id: 3,
    title: 'Enable AutoPay',
    description: 'Set up automatic payments for convenience',
    status: 'current',
    icon: Zap
  },
  {
    id: 4,
    title: 'Multi-Chain Support',
    description: 'Connect to Ethereum, Polygon, and other chains',
    status: 'upcoming',
    icon: Globe
  },
  {
    id: 5,
    title: 'Mobile App',
    description: 'Access Pulse on-the-go with our mobile app',
    status: 'upcoming',
    icon: Smartphone
  }
];

export const RoadmapSection = () => {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepId = parseInt(entry.target.getAttribute('data-step-id') || '0');
            setVisibleSteps(prev => [...prev, stepId].filter((id, index, arr) => arr.indexOf(id) === index));
          }
        });
      },
      { threshold: 0.3 }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const getStepIcon = (step: RoadmapStep) => {
    const IconComponent = step.icon;
    if (step.status === 'completed') {
      return <CheckCircle className="h-6 w-6 text-success" />;
    }
    return <IconComponent className={`h-6 w-6 ${step.status === 'current' ? 'text-primary' : 'text-muted-foreground'}`} />;
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gradient mb-4">Your Payment Journey</h2>
          <p className="text-xl text-muted-foreground">
            Follow these steps to unlock the full potential of decentralized bill payments
          </p>
        </div>

        <div className="relative">
          {/* Animated progress line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-border">
            <div className="h-3/5 w-full gradient-primary rounded-full transition-all duration-1000" />
          </div>

          <div className="space-y-16">
            {roadmapSteps.map((step, index) => (
              <div
                key={step.id}
                ref={(el) => (stepRefs.current[index] = el)}
                data-step-id={step.id}
                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-8 ${
                  visibleSteps.includes(step.id) ? 'animate-roadmap-move' : 'opacity-0'
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <Card className={`gradient-card border-border shadow-card transition-all duration-500 hover:scale-105 ${
                    step.status === 'current' ? 'shadow-glow border-primary/50' : ''
                  }`}>
                    <CardContent className="p-6">
                      <div className={`flex items-center gap-3 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                        {getStepIcon(step)}
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground mt-2">{step.description}</p>
                      {step.status === 'current' && (
                        <div className="mt-3">
                          <span className="text-primary text-sm font-medium animate-pulse">
                            → You are here
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Central node */}
                <div className="flex-shrink-0 relative z-10">
                  <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${
                    step.status === 'completed' 
                      ? 'bg-success border-success shadow-glow' 
                      : step.status === 'current'
                      ? 'bg-primary border-primary shadow-glow animate-pulse'
                      : 'bg-muted border-border'
                  }`}>
                    <span className="text-lg font-bold text-primary-foreground">{step.id}</span>
                  </div>
                </div>

                <div className="flex-1" />
              </div>
            ))}
          </div>

          {/* Walking character animation */}
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-[3s] ${
            visibleSteps.length > 2 ? 'translate-y-32' : ''
          }`}>
            <div className="text-6xl animate-float">🚶‍♂️</div>
          </div>
        </div>
      </div>
    </section>
  );
};