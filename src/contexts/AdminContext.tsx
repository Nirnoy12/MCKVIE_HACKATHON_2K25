import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminUser {
  email: string;
  name: string;
  role: 'admin' | 'super_admin';
}

interface AdminContextType {
  adminUser: AdminUser | null;
  isAdminAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// List of permissible admin emails
const ADMIN_EMAILS: Record<string, { name: string; role: 'admin' | 'super_admin'; password: string }> = {
  'mckvie.hackathon.2k25@gmail.com': { name: 'MCKVIE Hackathon Admin', role: 'super_admin', password: '2k25soumyajitdebayan' },
  // Add more admin emails as needed
};

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is already logged in (from localStorage)
    const savedAdmin = localStorage.getItem('admin_user');
    if (savedAdmin) {
      try {
        const admin = JSON.parse(savedAdmin);
        // Verify the admin still exists in the permissible list
        if (ADMIN_EMAILS[admin.email]) {
          setAdminUser(admin);
        } else {
          localStorage.removeItem('admin_user');
        }
      } catch (error) {
        localStorage.removeItem('admin_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const adminData = ADMIN_EMAILS[email.toLowerCase()];
    
    if (adminData && adminData.password === password) {
      const admin: AdminUser = {
        email: email.toLowerCase(),
        name: adminData.name,
        role: adminData.role
      };
      
      setAdminUser(admin);
      localStorage.setItem('admin_user', JSON.stringify(admin));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const logout = () => {
    setAdminUser(null);
    localStorage.removeItem('admin_user');
  };

  const value: AdminContextType = {
    adminUser,
    isAdminAuthenticated: !!adminUser,
    login,
    logout,
    loading
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
