import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ArrowLeft, 
  LogOut, 
  Mail, 
  Phone, 
  User, 
  Users,
  Calendar,
  Code,
  Shield,
  Trash2,
  Send,
  RefreshCw
} from 'lucide-react';
import { getFirestore, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { getApps, getApp } from 'firebase/app';
import { sendRegistrationEmail } from '@/services/emailService';

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
  agreeToTerms: boolean;
  agreeToPhotography: boolean;
  submittedAt: any;
  teamNumber: number;
}

const RegistrationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { adminUser, logout } = useAdmin();
  const navigate = useNavigate();
  const [registration, setRegistration] = useState<RegistrationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (id) {
      fetchRegistration(id);
    }
  }, [id]);

  const fetchRegistration = async (registrationId: string) => {
    setLoading(true);
    try {
      const app = getApps().length > 0 ? getApp() : null;
      if (!app) {
        console.warn('Firebase app not initialized');
        setLoading(false);
        return;
      }

      const db = getFirestore(app);
      
      const registrationRef = doc(db, `artifacts/1:146843278185:web:88bc36b127a2b2a5df3bf8/public/data/registrations`, registrationId);
      const registrationSnap = await getDoc(registrationRef);
      
      if (registrationSnap.exists()) {
        setRegistration({
          id: registrationSnap.id,
          ...registrationSnap.data()
        } as RegistrationData);
      } else {
        setMessage({ type: 'error', text: 'Registration not found' });
      }
    } catch (error) {
      console.error('Error fetching registration:', error);
      setMessage({ type: 'error', text: 'Failed to fetch registration details' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!registration || !window.confirm('Are you sure you want to delete this registration? This action cannot be undone.')) {
      return;
    }

    setDeleting(true);
    try {
      const app = getApps().length > 0 ? getApp() : null;
      if (!app) {
        throw new Error('Firebase app not initialized');
      }

      const db = getFirestore(app);
      
      await deleteDoc(doc(db, `artifacts/1:146843278185:web:88bc36b127a2b2a5df3bf8/public/data/registrations`, registration.id));
      
      setMessage({ type: 'success', text: 'Registration deleted successfully' });
      setTimeout(() => {
        navigate('/admin/registrations');
      }, 2000);
    } catch (error) {
      console.error('Error deleting registration:', error);
      setMessage({ type: 'error', text: 'Failed to delete registration' });
    } finally {
      setDeleting(false);
    }
  };

  const handleResendEmail = async () => {
    if (!registration) return;

    setSendingEmail(true);
    try {
      const success = await sendRegistrationEmail(registration, registration.teamId);
      
      if (success) {
        setMessage({ type: 'success', text: 'Confirmation email sent successfully' });
      } else {
        setMessage({ type: 'error', text: 'Failed to send email' });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setMessage({ type: 'error', text: 'Failed to send email' });
    } finally {
      setSendingEmail(false);
    }
  };

  const getProblemDisplayName = (problemId: string) => {
    const problemMap: Record<string, string> = {
      'PSA': 'PS A — Document Formatter & Exporter WebApp',
      'PSB': 'PS B — Vibe Coding Problem: Scholarship Finder & Manager WebApp',
      'PSC': 'PS C — Vibe Coding Problem: Grievance Redressal Portal for Education Institute',
      'PSD': 'PS D — EduScore: Smart Faculty Appraisal System',
      'PSE': 'PS E — Event Ease: Smart College Event & Report Manager',
      'PSF': 'PS F — Hire Smart: Faculty Recruitment Manager',
      'PSG': 'PS G — Smart Academic Assessor',
      'PSH': 'PS H — Select Emergency: Serious Patient Selection for Facilities',
      'PSI': 'PS I — Smart Document Management System (DMS) for Academic Institutions',
      'PSJ': 'PS J — Smart Classroom & Timetable Scheduler WebApp'
    };
    return problemMap[problemId] || problemId;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="bg-card border-halloween-purple p-8 shadow-lg text-center">
            <RefreshCw className="w-8 h-8 animate-spin text-halloween-orange mx-auto mb-4" />
            <p className="text-spooky-light">Loading registration details...</p>
          </Card>
        </div>
      </Layout>
    );
  }

  if (!registration) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="bg-card border-halloween-purple p-8 shadow-lg text-center">
            <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-spooky text-red-500 mb-2">Registration Not Found</h1>
            <p className="text-spooky-light mb-4">The registration you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/admin/registrations')}>
              Back to Registrations
            </Button>
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
              onClick={() => navigate('/admin/registrations')}
              variant="ghost_spooky"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Registrations
            </Button>
            <div>
              <h1 className="text-4xl font-spooky text-gradient-halloween mb-2">
                Registration Details
              </h1>
              <p className="text-spooky-light">
                Team: {registration.teamName} • ID: {registration.teamId}
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

        {message && (
          <Alert className={`mb-6 ${message.type === 'success' ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}`}>
            <AlertDescription className={message.type === 'success' ? 'text-green-400' : 'text-red-400'}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        {/* Team Information */}
        <Card className="bg-card border-halloween-purple p-6 shadow-lg mb-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-spooky text-gradient-halloween">Team Information</h2>
            <Badge variant="outline" className="font-mono text-lg">
              {registration.teamId}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-neon-orange mb-3 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Team Details
              </h3>
              <div className="space-y-2 text-spooky-light">
                <p><strong>Team Name:</strong> {registration.teamName}</p>
                <p><strong>Team Size:</strong> {registration.teamSize}</p>
                <p><strong>Problem Category:</strong> 
                  <Badge variant="secondary" className="ml-2">
                    {registration.problemCategory}
                  </Badge>
                </p>
                <p><strong>Experience Level:</strong> {registration.experience}</p>
                <p><strong>Submitted:</strong> {registration.submittedAt ? registration.submittedAt.toDate().toLocaleString() : 'Unknown'}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-neon-orange mb-3 flex items-center">
                <Code className="w-5 h-5 mr-2" />
                Problem Statement
              </h3>
              <div className="text-spooky-light">
                <p className="font-medium">{getProblemDisplayName(registration.problemCategory)}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Team Leader Information */}
        <Card className="bg-card border-halloween-purple p-6 shadow-lg mb-6">
          <h2 className="text-2xl font-spooky text-gradient-halloween mb-4 flex items-center">
            <User className="w-6 h-6 mr-2" />
            Team Leader
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center text-spooky-light">
                <User className="w-4 h-4 mr-2 text-neon-orange" />
                <span><strong>Name:</strong> {registration.teamLeaderName}</span>
              </div>
              <div className="flex items-center text-spooky-light">
                <Mail className="w-4 h-4 mr-2 text-neon-orange" />
                <span><strong>Email:</strong> {registration.teamLeaderEmail}</span>
              </div>
              <div className="flex items-center text-spooky-light">
                <Phone className="w-4 h-4 mr-2 text-neon-orange" />
                <span><strong>Phone:</strong> {registration.teamLeaderPhone}</span>
              </div>
              <div className="flex items-center text-spooky-light">
                <Shield className="w-4 h-4 mr-2 text-neon-orange" />
                <span><strong>Institution:</strong> {registration.teamLeaderInstitution}</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-neon-orange mb-3">Emergency Contact</h3>
              <p className="text-spooky-light">{registration.emergencyContact}</p>
            </div>
          </div>
        </Card>

        {/* Teammate Information */}
        {registration.teammateName && (
          <Card className="bg-card border-halloween-purple p-6 shadow-lg mb-6">
            <h2 className="text-2xl font-spooky text-gradient-halloween mb-4 flex items-center">
              <Users className="w-6 h-6 mr-2" />
              Teammate
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-center text-spooky-light">
                <User className="w-4 h-4 mr-2 text-neon-orange" />
                <span><strong>Name:</strong> {registration.teammateName}</span>
              </div>
              <div className="flex items-center text-spooky-light">
                <Mail className="w-4 h-4 mr-2 text-neon-orange" />
                <span><strong>Email:</strong> {registration.teammateEmail}</span>
              </div>
              <div className="flex items-center text-spooky-light">
                <Phone className="w-4 h-4 mr-2 text-neon-orange" />
                <span><strong>Phone:</strong> {registration.teammatePhone}</span>
              </div>
              <div className="flex items-center text-spooky-light">
                <Shield className="w-4 h-4 mr-2 text-neon-orange" />
                <span><strong>Institution:</strong> {registration.teammateInstitution}</span>
              </div>
            </div>
          </Card>
        )}

        {/* Additional Information */}
        <Card className="bg-card border-halloween-purple p-6 shadow-lg mb-6">
          <h2 className="text-2xl font-spooky text-gradient-halloween mb-4">Additional Information</h2>
          
          <div className="space-y-4">
            {registration.dietaryRequirements && (
              <div>
                <h3 className="text-lg font-semibold text-neon-orange mb-2">Dietary Requirements</h3>
                <p className="text-spooky-light">{registration.dietaryRequirements}</p>
              </div>
            )}
            
            <div>
              <h3 className="text-lg font-semibold text-neon-orange mb-2">Agreements</h3>
              <div className="flex space-x-4 text-spooky-light">
                <div className="flex items-center">
                  <span className={registration.agreeToTerms ? 'text-green-400' : 'text-red-400'}>
                    {registration.agreeToTerms ? '✓' : '✗'}
                  </span>
                  <span className="ml-2">Terms & Conditions</span>
                </div>
                <div className="flex items-center">
                  <span className={registration.agreeToPhotography ? 'text-green-400' : 'text-red-400'}>
                    {registration.agreeToPhotography ? '✓' : '✗'}
                  </span>
                  <span className="ml-2">Photography Consent</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <Card className="bg-card border-halloween-purple p-6 shadow-lg">
          <h2 className="text-2xl font-spooky text-gradient-halloween mb-4">Actions</h2>
          
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={handleResendEmail}
              disabled={sendingEmail}
              className="bg-gradient-halloween hover:opacity-90 text-spooky-dark"
            >
              {sendingEmail ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              Resend Confirmation Email
            </Button>
            
            <Button
              onClick={handleDelete}
              disabled={deleting}
              variant="ghost_spooky"
              className="text-red-400 hover:text-red-300"
            >
              {deleting ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4 mr-2" />
              )}
              Delete Registration
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default RegistrationDetail;
