import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Shield, Loader2 } from 'lucide-react';

interface AdminProtectedRouteProps {
  children: ReactNode;
  requireSuperAdmin?: boolean;
}

const AdminProtectedRoute = ({ children, requireSuperAdmin = false }: AdminProtectedRouteProps) => {
  const { isAdminAuthenticated, adminUser, loading } = useAdmin();

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="bg-card border-halloween-purple p-8 shadow-lg text-center">
            <Loader2 className="w-8 h-8 animate-spin text-halloween-orange mx-auto mb-4" />
            <p className="text-spooky-light">Loading admin panel...</p>
          </Card>
        </div>
      </Layout>
    );
  }

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (requireSuperAdmin && adminUser?.role !== 'super_admin') {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="bg-card border-red-500 p-8 shadow-lg text-center max-w-md">
            <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-spooky text-red-500 mb-2">
              Access Denied
            </h1>
            <p className="text-spooky-light">
              You don't have permission to access this section. Super admin privileges required.
            </p>
          </Card>
        </div>
      </Layout>
    );
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
