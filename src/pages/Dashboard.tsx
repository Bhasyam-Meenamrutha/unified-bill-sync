import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Dashboard as DashboardComponent } from '@/components/dashboard/Dashboard';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardComponent />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;