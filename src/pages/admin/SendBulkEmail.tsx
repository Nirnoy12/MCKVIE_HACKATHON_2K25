import { useState, useEffect } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ArrowLeft, 
  LogOut, 
  Send, 
  Users,
  Mail,
  RefreshCw,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';
import { getApps, getApp } from 'firebase/app';
import emailjs from '@emailjs/browser';

interface RegistrationData {
  id: string;
  teamLeaderName: string;
  teamLeaderEmail: string;
  teamName: string;
  teamId: string;
}

const SendBulkEmail = () => {
  const { adminUser, logout } = useAdmin();
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const [emailData, setEmailData] = useState({
    subject: '',
    message: '',
    recipientType: 'all' as 'all' | 'selected',
    selectedTeams: [] as string[]
  });

  const [sendResults, setSendResults] = useState<{
    total: number;
    sent: number;
    failed: number;
    failedEmails: string[];
  } | null>(null);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const app = getApps().length > 0 ? getApp() : null;
      if (!app) {
        console.warn('Firebase app not initialized');
        setLoading(false);
        return;
      }

      const db = getFirestore(app);
      
      const registrationsRef = collection(db, `artifacts/1:146843278185:web:88bc36b127a2b2a5df3bf8/public/data/registrations`);
      const registrationsQuery = query(registrationsRef, orderBy('submittedAt', 'desc'));
      const querySnapshot = await getDocs(registrationsQuery);
      
      const regData: RegistrationData[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        regData.push({
          id: doc.id,
          teamLeaderName: data.teamLeaderName,
          teamLeaderEmail: data.teamLeaderEmail,
          teamName: data.teamName,
          teamId: data.teamId
        });
      });

      setRegistrations(regData);
    } catch (error) {
      console.error('Error fetching registrations:', error);
      setMessage({ type: 'error', text: 'Failed to fetch registrations' });
    } finally {
      setLoading(false);
    }
  };

  const handleTeamSelection = (teamId: string) => {
    setEmailData(prev => ({
      ...prev,
      selectedTeams: prev.selectedTeams.includes(teamId)
        ? prev.selectedTeams.filter(id => id !== teamId)
        : [...prev.selectedTeams, teamId]
    }));
  };

  const handleSendEmail = async () => {
    if (!emailData.subject || !emailData.message) {
      setMessage({ type: 'error', text: 'Please fill in both subject and message' });
      return;
    }

    const recipients = emailData.recipientType === 'all' 
      ? registrations 
      : registrations.filter(reg => emailData.selectedTeams.includes(reg.teamId));

    if (recipients.length === 0) {
      setMessage({ type: 'error', text: 'No recipients selected' });
      return;
    }

    setSending(true);
    setSendResults(null);

    const results = {
      total: recipients.length,
      sent: 0,
      failed: 0,
      failedEmails: [] as string[]
    };

    try {
      for (const recipient of recipients) {
        try {
          const templateParams = {
            to_email: recipient.teamLeaderEmail,
            from_name: "MCKVIE Halloween Hackathon Team",
            reply_to: "mckvie.hackathon.2k25@gmail.com",
            
            // Template variables
            teamLeaderName: recipient.teamLeaderName,
            teamName: recipient.teamName,
            teamId: recipient.teamId,
            subject: emailData.subject,
            message: emailData.message,
            
            // Additional context
            hackathonName: "MCKVIE Halloween Hackathon 2025",
            contactEmail: "mckvie.hackathon.2k25@gmail.com"
          };

          // Send email using EmailJS
          await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            templateParams
          );

          results.sent++;
        } catch (error) {
          console.error(`Failed to send email to ${recipient.teamLeaderEmail}:`, error);
          results.failed++;
          results.failedEmails.push(recipient.teamLeaderEmail);
        }

        // Small delay to avoid overwhelming the email service
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      setSendResults(results);
      
      if (results.failed === 0) {
        setMessage({ type: 'success', text: `Successfully sent ${results.sent} emails` });
      } else {
        setMessage({ 
          type: 'error', 
          text: `Sent ${results.sent} emails, ${results.failed} failed` 
        });
      }
    } catch (error) {
      console.error('Error sending bulk emails:', error);
      setMessage({ type: 'error', text: 'Failed to send emails' });
    } finally {
      setSending(false);
    }
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
                Send Bulk Email
              </h1>
              <p className="text-spooky-light">
                Send updates to all registered teams
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

        {sendResults && (
          <Card className="bg-card border-halloween-purple p-6 shadow-lg mb-6">
            <h2 className="text-2xl font-spooky text-gradient-halloween mb-4">Send Results</h2>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-neon-green">{sendResults.sent}</div>
                <div className="text-spooky-light">Sent</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">{sendResults.failed}</div>
                <div className="text-spooky-light">Failed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-halloween-orange">{sendResults.total}</div>
                <div className="text-spooky-light">Total</div>
              </div>
            </div>
            
            {sendResults.failedEmails.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-red-400 mb-2">Failed Emails:</h3>
                <div className="text-spooky-light text-sm">
                  {sendResults.failedEmails.join(', ')}
                </div>
              </div>
            )}
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Email Form */}
          <Card className="bg-card border-halloween-purple p-6 shadow-lg">
            <h2 className="text-2xl font-spooky text-gradient-halloween mb-4">Email Content</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="subject" className="text-neon-orange">Subject</Label>
                <Input
                  id="subject"
                  value={emailData.subject}
                  onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
                  className="bg-halloween-purple-muted border-halloween-purple text-spooky-light mt-1"
                  placeholder="Important Update - MCKVIE Hackathon 2025"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-neon-orange">Message</Label>
                <Textarea
                  id="message"
                  value={emailData.message}
                  onChange={(e) => setEmailData(prev => ({ ...prev, message: e.target.value }))}
                  className="bg-halloween-purple-muted border-halloween-purple text-spooky-light mt-1 min-h-[200px]"
                  placeholder="Dear Team,

We hope this email finds you well. We have an important update regarding the MCKVIE Halloween Hackathon 2025.

[Your message here]

Best regards,
MCKVIE Hackathon Team"
                />
              </div>

              <div>
                <Label className="text-neon-orange">Recipients</Label>
                <div className="flex space-x-4 mt-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="all"
                      checked={emailData.recipientType === 'all'}
                      onChange={(e) => setEmailData(prev => ({ ...prev, recipientType: e.target.value as 'all' | 'selected' }))}
                      className="mr-2"
                    />
                    <span className="text-spooky-light">All Teams ({registrations.length})</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="selected"
                      checked={emailData.recipientType === 'selected'}
                      onChange={(e) => setEmailData(prev => ({ ...prev, recipientType: e.target.value as 'all' | 'selected' }))}
                      className="mr-2"
                    />
                    <span className="text-spooky-light">Selected Teams ({emailData.selectedTeams.length})</span>
                  </label>
                </div>
              </div>

              <Button
                onClick={handleSendEmail}
                disabled={sending || !emailData.subject || !emailData.message}
                className="w-full bg-gradient-halloween hover:opacity-90 text-spooky-dark font-semibold"
              >
                {sending ? (
                  <div className="flex items-center">
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Sending Emails...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Send className="w-4 h-4 mr-2" />
                    Send Emails
                  </div>
                )}
              </Button>
            </div>
          </Card>

          {/* Team Selection */}
          <Card className="bg-card border-halloween-purple p-6 shadow-lg">
            <h2 className="text-2xl font-spooky text-gradient-halloween mb-4 flex items-center">
              <Users className="w-6 h-6 mr-2" />
              Select Teams
            </h2>
            
            {emailData.recipientType === 'selected' && (
              <div className="mb-4">
                <p className="text-spooky-light mb-3">
                  Select teams to send emails to:
                </p>
                <div className="max-h-[400px] overflow-y-auto space-y-2">
                  {registrations.map((reg) => (
                    <label key={reg.id} className="flex items-center p-2 rounded hover:bg-halloween-purple-muted/20 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={emailData.selectedTeams.includes(reg.teamId)}
                        onChange={() => handleTeamSelection(reg.teamId)}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="text-spooky-light font-medium">{reg.teamName}</div>
                        <div className="text-xs text-spooky-light/70">
                          {reg.teamLeaderName} • {reg.teamId}
                        </div>
                      </div>
                      <Mail className="w-4 h-4 text-spooky-light/50" />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {emailData.recipientType === 'all' && (
              <div className="text-center py-8">
                <Users className="w-16 h-16 text-neon-green mx-auto mb-4" />
                <p className="text-spooky-light">
                  Email will be sent to all {registrations.length} registered teams
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SendBulkEmail;
