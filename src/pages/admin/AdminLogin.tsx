import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Eye, EyeOff, Lock } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, loading } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const success = await login(email, password);
    
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Please check your email and password.');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="bg-card border-halloween-purple p-8 shadow-lg max-w-md w-full animate-glow">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-halloween rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-spooky-dark" />
            </div>
            <h1 className="text-3xl font-spooky text-gradient-halloween mb-2">
              Admin Portal
            </h1>
            <p className="text-spooky-light">
              Enter your credentials to access the admin panel
            </p>
          </div>

          {error && (
            <Alert className="mb-6 border-red-500 bg-red-500/10">
              <AlertDescription className="text-red-400">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-neon-orange">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-halloween-purple-muted border-halloween-purple text-spooky-light mt-1"
                placeholder="Enter your admin email"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-neon-orange">
                Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-halloween-purple-muted border-halloween-purple text-spooky-light pr-10"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-spooky-light hover:text-halloween-orange transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-halloween hover:opacity-90 text-spooky-dark font-semibold py-3"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-spooky-dark mr-2"></div>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center">
                  <Lock className="w-4 h-4 mr-2" />
                  Sign In
                </div>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-halloween-purple-muted">
            <div className="text-center text-sm text-spooky-light">
              <p className="mb-2">Authorized personnel only</p>
              <div className="bg-halloween-purple-muted/50 rounded-lg p-3">
                <p className="text-xs text-neon-green font-mono">
                  MCKVIE Hackathon Admin Portal
                </p>
                <p className="text-xs text-spooky-light/70">
                  Contact system administrator for access
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminLogin;
