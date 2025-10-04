import { useState, useEffect } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Mail, 
  Shield, 
  LogOut, 
  Eye, 
  UserPlus, 
  UserMinus,
  Send,
  Download,
  RefreshCw,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { getFirebaseDB } from '@/firebase';

interface RegistrationData {
  id: string;
  teamName: string;
  teamId: string;
  teamLeaderName: string;
  teamLeaderEmail: string;
  problemCategory: string;
  submittedAt: any;
  teamNumber: number;
}

const AdminDashboard = () => {
  const { adminUser, logout } = useAdmin();
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRegistrations: 0,
    todayRegistrations: 0,
    problemStats: {} as Record<string, number>
  });

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      // Use the centralized Firebase instance with lazy initialization
      const db = getFirebaseDB();
      console.log('🔧 AdminDashboard: Using centralized Firebase instance');
      const collectionPath = `artifacts/1:146843278185:web:88bc36b127a2b2a5df3bf8/public/data/registrations`;
      
      console.log('🔍 AdminDashboard: Fetching from path:', collectionPath);
      
      const registrationsRef = collection(db, collectionPath);
      
      // Try without orderBy first to see if that's the issue
      let querySnapshot;
      try {
        const registrationsQuery = query(registrationsRef, orderBy('submittedAt', 'desc'), limit(50));
        querySnapshot = await getDocs(registrationsQuery);
        console.log('✅ Query with orderBy successful');
      } catch (orderByError) {
        console.log('⚠️ OrderBy failed, trying without:', orderByError.message);
        querySnapshot = await getDocs(registrationsRef);
        console.log('✅ Query without orderBy successful');
      }
      
      console.log('📊 Query result:', {
        size: querySnapshot.size,
        empty: querySnapshot.empty,
        docs: querySnapshot.docs.length
      });
      
      const regData: RegistrationData[] = [];
      const problemCounts: Record<string, number> = {};
      let todayCount = 0;
      const today = new Date().toDateString();

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log('📄 Processing document:', doc.id, data);
        
        regData.push({
          id: doc.id,
          ...data
        } as RegistrationData);

        // Count by problem category
        const problem = data.problemCategory || 'Unknown';
        problemCounts[problem] = (problemCounts[problem] || 0) + 1;

        // Count today's registrations
        if (data.submittedAt && data.submittedAt.toDate().toDateString() === today) {
          todayCount++;
        }
      });
      
      console.log('📈 Final stats:', {
        regDataLength: regData.length,
        problemCounts,
        todayCount
      });

      setRegistrations(regData);
      setStats({
        totalRegistrations: regData.length,
        todayRegistrations: todayCount,
        problemStats: problemCounts
      });
    } catch (error) {
      console.error('Error fetching registrations:', error);
      if (error instanceof Error && error.message.includes('Firebase configuration')) {
        setError('Firebase configuration error. Please check environment variables.');
      } else {
        setError('Failed to fetch registrations');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getProblemDisplayName = (problemId: string) => {
    const problemMap: Record<string, string> = {
      'PSA': 'PS A — Document Formatter',
      'PSB': 'PS B — Scholarship Finder',
      'PSC': 'PS C — Grievance Portal',
      'PSD': 'PS D — Faculty Appraisal',
      'PSE': 'PS E — Event Manager',
      'PSF': 'PS F — Faculty Recruitment',
      'PSG': 'PS G — Academic Assessor',
      'PSH': 'PS H — Emergency Selection',
      'PSI': 'PS I — Document Management',
      'PSJ': 'PS J — Timetable Scheduler'
    };
    return problemMap[problemId] || problemId;
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="bg-card border-halloween-purple p-8 shadow-lg text-center">
            <RefreshCw className="w-8 h-8 animate-spin text-halloween-orange mx-auto mb-4" />
            <p className="text-spooky-light">Loading dashboard...</p>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-spooky-dark p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-spooky text-gradient-halloween mb-2">
              Admin Dashboard
            </h1>
            <p className="text-spooky-light">
              Welcome back, {adminUser?.name} ({adminUser?.role})
            </p>
          </div>
          <div className="flex space-x-4">
            <Button
              onClick={fetchRegistrations}
              disabled={loading}
              className="bg-gradient-halloween hover:opacity-90 text-spooky-dark font-semibold"
            >
              {loading ? (
                <div className="flex items-center">
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Loading Data...
                </div>
              ) : (
                <div className="flex items-center">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh All Data
                </div>
              )}
            </Button>
            <Button
              onClick={handleLogout}
              variant="ghost_spooky"
              className="text-red-400 hover:text-red-300"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card border-halloween-purple p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-spooky-light text-sm">Total Registrations</p>
                <p className="text-3xl font-bold text-neon-green">{stats.totalRegistrations}</p>
              </div>
              <Users className="w-12 h-12 text-neon-green" />
            </div>
          </Card>

          <Card className="bg-card border-halloween-purple p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-spooky-light text-sm">Today's Registrations</p>
                <p className="text-3xl font-bold text-halloween-orange">{stats.todayRegistrations}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-halloween-orange" />
            </div>
          </Card>

          <Card className="bg-card border-halloween-purple p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-spooky-light text-sm">Problem Categories</p>
                <p className="text-3xl font-bold text-neon-purple">{Object.keys(stats.problemStats).length}</p>
              </div>
              <Calendar className="w-12 h-12 text-neon-purple" />
            </div>
          </Card>
        </div>

        {/* Problem Statistics */}
        <Card className="bg-card border-halloween-purple p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-spooky text-gradient-halloween mb-4">Problem Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(stats.problemStats).map(([problem, count]) => (
              <div key={problem} className="text-center">
                <Badge variant="outline" className="mb-2">
                  {problem}
                </Badge>
                <p className="text-2xl font-bold text-neon-green">{count}</p>
                <p className="text-xs text-spooky-light">{getProblemDisplayName(problem)}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-card border-halloween-purple p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-spooky text-gradient-halloween mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              onClick={() => navigate('/admin/registrations')}
              className="bg-gradient-halloween hover:opacity-90 text-spooky-dark"
            >
              <Eye className="w-4 h-4 mr-2" />
              View All
            </Button>
            <Button
              onClick={() => navigate('/admin/send-email')}
              variant="ghost_spooky"
              className="animate-flicker"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Email
            </Button>
            <Button
              onClick={() => navigate('/admin/add-team')}
              variant="ghost_spooky"
              className="animate-flicker"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add Team
            </Button>
            <Button
              onClick={() => {/* Implement export */}}
              variant="ghost_spooky"
              className="animate-flicker"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </Card>

        {/* Recent Registrations */}
        <Card className="bg-card border-halloween-purple p-6 shadow-lg">
          <h2 className="text-2xl font-spooky text-gradient-halloween mb-4">Recent Registrations</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-halloween-purple-muted">
                  <th className="text-left py-3 px-4 text-neon-orange">Team ID</th>
                  <th className="text-left py-3 px-4 text-neon-orange">Team Name</th>
                  <th className="text-left py-3 px-4 text-neon-orange">Leader</th>
                  <th className="text-left py-3 px-4 text-neon-orange">Problem</th>
                  <th className="text-left py-3 px-4 text-neon-orange">Actions</th>
                </tr>
              </thead>
              <tbody>
                {registrations.slice(0, 10).map((reg) => (
                  <tr key={reg.id} className="border-b border-halloween-purple-muted/30">
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="font-mono">
                        {reg.teamId}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-spooky-light">{reg.teamName}</td>
                    <td className="py-3 px-4 text-spooky-light">{reg.teamLeaderName}</td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary">
                        {reg.problemCategory}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        size="sm"
                        variant="ghost_spooky"
                        onClick={() => navigate(`/admin/registration/${reg.id}`)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {registrations.length > 10 && (
            <div className="text-center mt-4">
              <Button
                onClick={() => navigate('/admin/registrations')}
                variant="ghost_spooky"
              >
                View All Registrations ({registrations.length})
              </Button>
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
