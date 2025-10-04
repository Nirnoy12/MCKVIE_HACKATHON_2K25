import { useState, useEffect } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  LogOut, 
  Eye, 
  Search,
  Filter,
  Download,
  RefreshCw,
  ArrowLeft,
  Mail,
  Phone,
  User
} from 'lucide-react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { getFirebaseDB } from '@/firebase';

interface RegistrationData {
  id: string;
  teamName: string;
  teamId: string;
  teamLeaderName: string;
  teamLeaderEmail: string;
  teamLeaderPhone: string;
  teamLeaderInstitution: string;
  teammateName: string;
  teammateEmail: string;
  teammatePhone: string;
  teammateInstitution: string;
  teamSize: string;
  problemCategory: string;
  experience: string;
  dietaryRequirements: string;
  emergencyContact: string;
  submittedAt: any;
  teamNumber: number;
}

const AdminRegistrations = () => {
  const { adminUser, logout } = useAdmin();
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<RegistrationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    fetchRegistrations();
  }, []);

  useEffect(() => {
    filterRegistrations();
  }, [registrations, searchTerm, filterCategory]);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      // Use the centralized Firebase instance with lazy initialization
      const db = getFirebaseDB();
      console.log('🔧 AdminRegistrations: Using centralized Firebase instance');
      
      const registrationsRef = collection(db, `artifacts/1:146843278185:web:88bc36b127a2b2a5df3bf8/public/data/registrations`);
      const registrationsQuery = query(registrationsRef, orderBy('submittedAt', 'desc'));
      const querySnapshot = await getDocs(registrationsQuery);
      
      const regData: RegistrationData[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        regData.push({
          id: doc.id,
          ...data
        } as RegistrationData);
      });

      setRegistrations(regData);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterRegistrations = () => {
    let filtered = registrations;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(reg =>
        reg.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.teamLeaderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.teamLeaderEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.teamId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(reg => reg.problemCategory === filterCategory);
    }

    setFilteredRegistrations(filtered);
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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const exportToCSV = () => {
    const headers = [
      'Team ID', 'Team Name', 'Leader Name', 'Leader Email', 'Leader Phone', 'Leader Institution',
      'Teammate Name', 'Teammate Email', 'Teammate Phone', 'Teammate Institution',
      'Team Size', 'Problem Category', 'Experience', 'Dietary Requirements', 'Emergency Contact', 'Submitted At'
    ];

    const csvContent = [
      headers.join(','),
      ...filteredRegistrations.map(reg => [
        reg.teamId,
        `"${reg.teamName}"`,
        `"${reg.teamLeaderName}"`,
        reg.teamLeaderEmail,
        reg.teamLeaderPhone,
        `"${reg.teamLeaderInstitution}"`,
        `"${reg.teammateName}"`,
        reg.teammateEmail,
        reg.teammatePhone,
        `"${reg.teammateInstitution}"`,
        reg.teamSize,
        reg.problemCategory,
        reg.experience,
        `"${reg.dietaryRequirements}"`,
        reg.emergencyContact,
        reg.submittedAt ? reg.submittedAt.toDate().toISOString() : ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hackathon_registrations_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="bg-card border-halloween-purple p-8 shadow-lg text-center">
            <RefreshCw className="w-8 h-8 animate-spin text-halloween-orange mx-auto mb-4" />
            <p className="text-spooky-light">Loading registrations...</p>
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
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => navigate('/admin/dashboard')}
              variant="ghost_spooky"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-4xl font-spooky text-gradient-halloween mb-2">
                All Registrations
              </h1>
              <p className="text-spooky-light">
                {filteredRegistrations.length} of {registrations.length} registrations
              </p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="ghost_spooky"
            className="text-red-400 hover:text-red-300"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Filters */}
        <Card className="bg-card border-halloween-purple p-6 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spooky-light w-4 h-4" />
              <Input
                placeholder="Search by team name, leader name, email, or team ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-halloween-purple-muted border-halloween-purple text-spooky-light pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-neon-orange" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-halloween-purple-muted border border-halloween-purple text-spooky-light rounded-md px-3 py-2"
              >
                <option value="all">All Categories</option>
                <option value="PSA">PSA</option>
                <option value="PSB">PSB</option>
                <option value="PSC">PSC</option>
                <option value="PSD">PSD</option>
                <option value="PSE">PSE</option>
                <option value="PSF">PSF</option>
                <option value="PSG">PSG</option>
                <option value="PSH">PSH</option>
                <option value="PSI">PSI</option>
                <option value="PSJ">PSJ</option>
              </select>
            </div>
            <Button
              onClick={exportToCSV}
              variant="ghost_spooky"
              className="animate-flicker"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </Card>

        {/* Registrations Table */}
        <Card className="bg-card border-halloween-purple p-6 shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-halloween-purple-muted">
                  <th className="text-left py-3 px-4 text-neon-orange">Team ID</th>
                  <th className="text-left py-3 px-4 text-neon-orange">Team Name</th>
                  <th className="text-left py-3 px-4 text-neon-orange">Leader</th>
                  <th className="text-left py-3 px-4 text-neon-orange">Contact</th>
                  <th className="text-left py-3 px-4 text-neon-orange">Problem</th>
                  <th className="text-left py-3 px-4 text-neon-orange">Submitted</th>
                  <th className="text-left py-3 px-4 text-neon-orange">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map((reg) => (
                  <tr key={reg.id} className="border-b border-halloween-purple-muted/30 hover:bg-halloween-purple-muted/20">
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="font-mono">
                        {reg.teamId}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-spooky-light font-medium">{reg.teamName}</div>
                      <div className="text-xs text-spooky-light/70">Size: {reg.teamSize}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-spooky-light font-medium">{reg.teamLeaderName}</div>
                      <div className="text-xs text-spooky-light/70">{reg.teamLeaderInstitution}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center text-xs text-spooky-light/70 mb-1">
                        <Mail className="w-3 h-3 mr-1" />
                        {reg.teamLeaderEmail}
                      </div>
                      <div className="flex items-center text-xs text-spooky-light/70">
                        <Phone className="w-3 h-3 mr-1" />
                        {reg.teamLeaderPhone}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary" className="mb-1">
                        {reg.problemCategory}
                      </Badge>
                      <div className="text-xs text-spooky-light/70">
                        {getProblemDisplayName(reg.problemCategory)}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-spooky-light/70 text-sm">
                      {reg.submittedAt ? reg.submittedAt.toDate().toLocaleDateString() : 'Unknown'}
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
          
          {filteredRegistrations.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-spooky-light/30 mx-auto mb-4" />
              <p className="text-spooky-light/70">
                {searchTerm || filterCategory !== 'all' 
                  ? 'No registrations match your search criteria' 
                  : 'No registrations found'
                }
              </p>
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default AdminRegistrations;
