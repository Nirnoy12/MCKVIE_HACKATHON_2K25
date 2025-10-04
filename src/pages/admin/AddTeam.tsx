import { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ArrowLeft, 
  LogOut, 
  UserPlus,
  RefreshCw,
  CheckCircle
} from 'lucide-react';
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, query, orderBy } from 'firebase/firestore';
import { getApps, getApp } from 'firebase/app';
import { generateTeamId, sendRegistrationEmail } from '@/services/emailService';

const AddTeam = () => {
  const { adminUser, logout } = useAdmin();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const [formData, setFormData] = useState({
    teamName: '',
    teamLeaderName: '',
    teamLeaderEmail: '',
    teamLeaderPhone: '',
    teamLeaderInstitution: '',
    teammateName: '',
    teammateEmail: '',
    teammatePhone: '',
    teammateInstitution: '',
    teamSize: '2',
    problemCategory: '',
    experience: 'beginner',
    dietaryRequirements: '',
    emergencyContact: '',
    agreeToTerms: true,
    agreeToPhotography: true
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getNextTeamNumber = async (): Promise<number> => {
    try {
      const app = getApps().length > 0 ? getApp() : null;
      if (!app) {
        console.warn('Firebase app not initialized, using fallback counter');
        const currentCount = parseInt(localStorage.getItem('teamCounter') || '0');
        const nextCount = currentCount + 1;
        localStorage.setItem('teamCounter', nextCount.toString());
        return nextCount;
      }

      const db = getFirestore(app);
      const appId = import.meta.env.VITE_FIREBASE_APP_ID || 'default-app-id';
      
      const registrationsRef = collection(db, `artifacts/${appId}/public/data/registrations`);
      const registrationsQuery = query(registrationsRef, orderBy('submittedAt', 'desc'));
      const querySnapshot = await getDocs(registrationsQuery);
      
      return querySnapshot.size + 1;
    } catch (error) {
      console.error('Error getting team number:', error);
      const currentCount = parseInt(localStorage.getItem('teamCounter') || '0');
      const nextCount = currentCount + 1;
      localStorage.setItem('teamCounter', nextCount.toString());
      return nextCount;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Validate required fields
      const requiredFields = [
        'teamName', 'teamLeaderName', 'teamLeaderEmail', 'teamLeaderPhone', 
        'teamLeaderInstitution', 'problemCategory', 'emergencyContact'
      ];

      for (const field of requiredFields) {
        if (!formData[field as keyof typeof formData]) {
          setMessage({ type: 'error', text: `Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}` });
          setLoading(false);
          return;
        }
      }

      // Generate team ID
      const teamNumber = await getNextTeamNumber();
      const teamId = generateTeamId(teamNumber, formData.problemCategory);

      // Prepare registration data
      const registrationData = {
        ...formData,
        teamId,
        submittedAt: serverTimestamp(),
        teamNumber,
        addedBy: adminUser?.email,
        addedAt: new Date().toISOString()
      };

      // Store in Firestore
      const app = getApps().length > 0 ? getApp() : null;
      if (!app) {
        throw new Error('Firebase app not initialized');
      }

      const db = getFirestore(app);
      
      const docRef = await addDoc(collection(db, `artifacts/1:146843278185:web:88bc36b127a2b2a5df3bf8/public/data/registrations`), registrationData);

      // Send confirmation email
      const emailSent = await sendRegistrationEmail(formData, teamId);

      setMessage({ 
        type: 'success', 
        text: `Team ${teamId} added successfully! ${emailSent ? 'Confirmation email sent.' : 'Email could not be sent.'}` 
      });

      // Reset form
      setFormData({
        teamName: '',
        teamLeaderName: '',
        teamLeaderEmail: '',
        teamLeaderPhone: '',
        teamLeaderInstitution: '',
        teammateName: '',
        teammateEmail: '',
        teammatePhone: '',
        teammateInstitution: '',
        teamSize: '2',
        problemCategory: '',
        experience: 'beginner',
        dietaryRequirements: '',
        emergencyContact: '',
        agreeToTerms: true,
        agreeToPhotography: true
      });

    } catch (error) {
      console.error('Error adding team:', error);
      setMessage({ type: 'error', text: 'Failed to add team. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
                Add Team Manually
              </h1>
              <p className="text-spooky-light">
                Add a new team registration manually
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

        <div className="max-w-4xl mx-auto">
          <Card className="bg-card border-halloween-purple p-6 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Team Information */}
              <div>
                <h2 className="text-2xl font-spooky text-gradient-halloween mb-4">Team Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="teamName" className="text-neon-orange">Team Name *</Label>
                    <Input
                      id="teamName"
                      value={formData.teamName}
                      onChange={(e) => handleInputChange('teamName', e.target.value)}
                      className="bg-halloween-purple-muted border-halloween-purple text-spooky-light mt-1"
                      placeholder="Enter team name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="teamSize" className="text-neon-orange">Team Size</Label>
                    <Select value={formData.teamSize} onValueChange={(value) => handleInputChange('teamSize', value)}>
                      <SelectTrigger className="bg-halloween-purple-muted border-halloween-purple text-spooky-light mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Member</SelectItem>
                        <SelectItem value="2">2 Members</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="problemCategory" className="text-neon-orange">Problem Category *</Label>
                    <Select value={formData.problemCategory} onValueChange={(value) => handleInputChange('problemCategory', value)}>
                      <SelectTrigger className="bg-halloween-purple-muted border-halloween-purple text-spooky-light mt-1">
                        <SelectValue placeholder="Select problem category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PSA">PSA</SelectItem>
                        <SelectItem value="PSB">PSB</SelectItem>
                        <SelectItem value="PSC">PSC</SelectItem>
                        <SelectItem value="PSD">PSD</SelectItem>
                        <SelectItem value="PSE">PSE</SelectItem>
                        <SelectItem value="PSF">PSF</SelectItem>
                        <SelectItem value="PSG">PSG</SelectItem>
                        <SelectItem value="PSH">PSH</SelectItem>
                        <SelectItem value="PSI">PSI</SelectItem>
                        <SelectItem value="PSJ">PSJ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="experience" className="text-neon-orange">Experience Level</Label>
                    <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                      <SelectTrigger className="bg-halloween-purple-muted border-halloween-purple text-spooky-light mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Team Leader */}
              <div>
                <h2 className="text-2xl font-spooky text-gradient-halloween mb-4">Team Leader</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="teamLeaderName" className="text-neon-orange">Name *</Label>
                    <Input
                      id="teamLeaderName"
                      value={formData.teamLeaderName}
                      onChange={(e) => handleInputChange('teamLeaderName', e.target.value)}
                      className="bg-halloween-purple-muted border-halloween-purple text-spooky-light mt-1"
                      placeholder="Enter team leader name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="teamLeaderEmail" className="text-neon-orange">Email *</Label>
                    <Input
                      id="teamLeaderEmail"
                      type="email"
                      value={formData.teamLeaderEmail}
                      onChange={(e) => handleInputChange('teamLeaderEmail', e.target.value)}
                      className="bg-halloween-purple-muted border-halloween-purple text-spooky-light mt-1"
                      placeholder="Enter team leader email"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="teamLeaderPhone" className="text-neon-orange">Phone *</Label>
                    <Input
                      id="teamLeaderPhone"
                      value={formData.teamLeaderPhone}
                      onChange={(e) => handleInputChange('teamLeaderPhone', e.target.value)}
                      className="bg-halloween-purple-muted border-halloween-purple text-spooky-light mt-1"
                      placeholder="Enter phone number"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="teamLeaderInstitution" className="text-neon-orange">Institution *</Label>
                    <Input
                      id="teamLeaderInstitution"
                      value={formData.teamLeaderInstitution}
                      onChange={(e) => handleInputChange('teamLeaderInstitution', e.target.value)}
                      className="bg-halloween-purple-muted border-halloween-purple text-spooky-light mt-1"
                      placeholder="Enter institution name"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Teammate (if team size is 2) */}
              {formData.teamSize === '2' && (
                <div>
                  <h2 className="text-2xl font-spooky text-gradient-halloween mb-4">Teammate</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="teammateName" className="text-neon-orange">Name</Label>
                      <Input
                        id="teammateName"
                        value={formData.teammateName}
                        onChange={(e) => handleInputChange('teammateName', e.target.value)}
                        className="bg-halloween-purple-muted border-halloween-purple text-spooky-light mt-1"
                        placeholder="Enter teammate name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="teammateEmail" className="text-neon-orange">Email</Label>
                      <Input
                        id="teammateEmail"
                        type="email"
                        value={formData.teammateEmail}
                        onChange={(e) => handleInputChange('teammateEmail', e.target.value)}
                        className="bg-halloween-purple-muted border-halloween-purple text-spooky-light mt-1"
                        placeholder="Enter teammate email"
                      />
                    </div>

                    <div>
                      <Label htmlFor="teammatePhone" className="text-neon-orange">Phone</Label>
                      <Input
                        id="teammatePhone"
                        value={formData.teammatePhone}
                        onChange={(e) => handleInputChange('teammatePhone', e.target.value)}
                        className="bg-halloween-purple-muted border-halloween-purple text-spooky-light mt-1"
                        placeholder="Enter teammate phone"
                      />
                    </div>

                    <div>
                      <Label htmlFor="teammateInstitution" className="text-neon-orange">Institution</Label>
                      <Input
                        id="teammateInstitution"
                        value={formData.teammateInstitution}
                        onChange={(e) => handleInputChange('teammateInstitution', e.target.value)}
                        className="bg-halloween-purple-muted border-halloween-purple text-spooky-light mt-1"
                        placeholder="Enter teammate institution"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Information */}
              <div>
                <h2 className="text-2xl font-spooky text-gradient-halloween mb-4">Additional Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emergencyContact" className="text-neon-orange">Emergency Contact *</Label>
                    <Input
                      id="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                      className="bg-halloween-purple-muted border-halloween-purple text-spooky-light mt-1"
                      placeholder="Enter emergency contact"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="dietaryRequirements" className="text-neon-orange">Dietary Requirements</Label>
                    <Input
                      id="dietaryRequirements"
                      value={formData.dietaryRequirements}
                      onChange={(e) => handleInputChange('dietaryRequirements', e.target.value)}
                      className="bg-halloween-purple-muted border-halloween-purple text-spooky-light mt-1"
                      placeholder="Enter dietary requirements (if any)"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-halloween hover:opacity-90 text-spooky-dark font-semibold px-8 py-3"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Adding Team...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add Team
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AddTeam;
