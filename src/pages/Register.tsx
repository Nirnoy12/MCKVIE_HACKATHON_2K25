import {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { generateTeamId, getNextTeamNumber, sendRegistrationEmail, initializeEmailJS } from '@/services/emailService';
import Layout from '@/components/Layout';
import { useForm } from '@/hooks/use-form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Users, Mail, Phone, Code, Trophy, CheckCircle, AlertTriangle, X } from 'lucide-react';
import { getApps, getApp, FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore, collection, addDoc, serverTimestamp, setLogLevel } from "firebase/firestore";

const Register = () => {
  // Get authentication state from previous page
  const location = useLocation();
  const authState = location.state as { userEmail?: string; userName?: string } | null;

  const [formData, setFormData] = useState({
    teamName: '',
    teamLeaderName: authState?.userName || '',
    teamLeaderEmail: authState?.userEmail || '',
    teamLeaderPhone: '',
    institution: '',
    teamSize: '',
    problemCategory: '',
    experience: '',
    dietaryRequirements: '',
    emergencyContact: '',
    agreeToTerms: false,
    agreeToPhotography: false
  });

  // Validation errors state
  const [validationErrors, setValidationErrors] = useState({
    agreeToTerms: false,
    agreeToPhotography: false
  });

  // Registration success state
  const [registrationSuccess, setRegistrationSuccess] = useState<{
    teamId: string;
    teamName: string;
    emailSent: boolean;
  } | null>(null);

  // --- Firebase Configuration ---
  // Reads variables from your .env file
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  };

  // --- App ID for Firestore Path ---
  const appId: string = import.meta.env.VITE_FIREBASE_APP_ID || 'default-app-id';

  const { formData, handleInputChange, resetForm } = useForm<RegistrationFormData>(initialFormData);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Firebase state
  const [db, setDb] = useState<Firestore | null>(null);

  // --- Firebase Initialization Effect ---
  useEffect(() => {
    // Initialize EmailJS
    initializeEmailJS();

    // Initialize Firebase
    if (Object.keys(firebaseConfig).length > 0) {
      try {
        const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
        const firestoreDb = getFirestore(app);
        setDb(firestoreDb);
        setLogLevel('debug');
      } catch (error) {
        console.error("Error initializing Firebase:", error);
        toast({
          title: "Connection Error",
          description: "Could not connect to the backend.",
          variant: "destructive"
        });
      }
    } else {
      console.warn("Firebase config is empty. Running in offline mode.");
    }
  }, []);

  // Comprehensive form validation
  const validateForm = () => {
    const errors = { agreeToTerms: false, agreeToPhotography: false };
    let isValid = true;

    // Check required fields first
    const requiredFields = [
      'teamName', 'teamLeaderName', 'teamLeaderEmail', 'teamLeaderPhone',
      'institution', 'teamSize', 'problemCategory', 'experience', 'emergencyContact'
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData] || formData[field as keyof typeof formData] === '') {
        isValid = false;
        toast({
          title: "Missing Information",
          description: `Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`,
          variant: "destructive"
        });
        return { isValid: false, errors };
      }
    }

    // MANDATORY: Both agreements must be checked
    if (!formData.agreeToTerms) {
      errors.agreeToTerms = true;
      isValid = false;
    }

    if (!formData.agreeToPhotography) {
      errors.agreeToPhotography = true;
      isValid = false;
    }

    // Show specific error message for unchecked agreements
    if (!isValid && (errors.agreeToTerms || errors.agreeToPhotography)) {
      const missingAgreements = [];
      if (errors.agreeToTerms) missingAgreements.push("Terms and Conditions");
      if (errors.agreeToPhotography) missingAgreements.push("Photography Consent");
      
      toast({
        title: "Agreements Required",
        description: `Please check: ${missingAgreements.join(" and ")} to proceed.`,
        variant: "destructive"
      });
    }

    return { isValid, errors };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({ agreeToTerms: false, agreeToPhotography: false });

    // System readiness check
    if (!db) {
      toast({
        title: "System Not Ready",
        description: "The registration system is warming up. Please try again in a moment.",
        variant: "destructive"
      });
      return;
    }

    // MANDATORY: Comprehensive form validation - form will NOT reset on failure
    const validation = validateForm();
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      
      // Scroll to terms section if agreements are missing
      if (validation.errors.agreeToTerms || validation.errors.agreeToPhotography) {
        const termsSection = document.getElementById('terms-section');
        if (termsSection) {
          termsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      
      // IMPORTANT: Return early without resetting form - user keeps their data
      return;
    }

    setLoading(true);
    try {
      // Generate unique team ID based on Firestore registration count
      console.log('🔢 Getting next team number from Firestore...');
      const teamNumber = await getNextTeamNumber();
      const teamId = generateTeamId(teamNumber, formData.problemCategory);
      console.log(`🆔 Generated team ID: ${teamId} (Team #${teamNumber})`);
      
      // Prepare registration data
      const registrationData = {
        ...formData,
        teamId,
        submittedAt: serverTimestamp(),
        teamNumber
      };

      // Store in Firestore
      if (db) {
        await addDoc(collection(db, `artifacts/${appId}/public/data/registrations`), registrationData);
      } else {
        console.warn("Firestore not available - storing locally for demo");
      }

      // Send email notification
      console.log("🔥 About to call sendRegistrationEmail..."); // Debug log
      console.log("📋 Form data for email:", formData);
      console.log("🆔 Team ID for email:", teamId);
      
      const emailSent = await sendRegistrationEmail(formData, teamId);
      
      console.log("📧 Email sending result:", emailSent);
      
      // Set success state to show success modal
      setRegistrationSuccess({
        teamId,
        teamName: formData.teamName,
        emailSent
      });

      // Reset form data only on successful submission
      setFormData({
        teamName: '', teamLeaderName: '', teamLeaderEmail: '', teamLeaderPhone: '',
        institution: '', teamSize: '', problemCategory: '', experience: '',
        dietaryRequirements: '', emergencyContact: '', agreeToTerms: false, agreeToPhotography: false
      });

    } catch (error: unknown) {
      console.error("Error submitting registration:", error);
      toast({
        title: "Submission Error",
        description: "Something went wrong. Please check the console and try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const benefits = [
    "Free hackathon kit with Halloween goodies",
    "Meals and refreshments throughout the event", 
    "Mentorship from industry experts",
    "Networking opportunities with tech professionals",
    "Exclusive workshop access",
    "Certificate of participation"
  ];

  // Show success modal if registration was successful
  if (registrationSuccess) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="bg-card border-neon-green p-8 shadow-lg text-center max-w-2xl w-full animate-glow">
            <div className="text-6xl mb-6">🎃</div>
            <h1 className="text-4xl font-spooky text-gradient-halloween mb-4">
              Registration Successful!
            </h1>
            
            <div className="bg-halloween-orange/20 border border-halloween-orange rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-halloween-orange mb-2">🎯 Important Information</h2>
              <div className="space-y-2 text-left">
                <p><strong>Team Name:</strong> {registrationSuccess.teamName}</p>
                <p><strong>Team ID:</strong> <span className="font-mono text-lg text-neon-green">{registrationSuccess.teamId}</span></p>
                <p><strong>Status:</strong> Successfully Registered</p>
                <p><strong>Email:</strong> {registrationSuccess.emailSent ? '✅ Confirmation email sent' : '✅ Team registered successfully'}</p>
              </div>
            </div>

            <div className="space-y-4 text-spooky-light">
              <p>🎉 Congratulations! Your team is now registered for the MCKVIE Halloween Hackathon 2025!</p>
              <p>📧 Check your email for detailed information and next steps.</p>
              
              <div className="bg-neon-green/20 border border-neon-green rounded-lg p-4 mt-6">
                <h3 className="font-bold text-neon-green mb-2">📱 Join Our WhatsApp Group</h3>
                <p className="text-sm mb-3">Stay updated with important announcements and connect with other participants!</p>
                <a 
                  href="https://chat.whatsapp.com/Ls9Zdw3nWNbCS55Q47c5kP?mode=ems_wa_c" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-[#25D366] text-white px-4 py-2 rounded-lg hover:bg-[#128C7E] transition-colors"
                >
                  <span>💬</span>
                  <span>Join WhatsApp Group</span>
                </a>
              </div>
              
              <p className="text-sm text-spooky-muted mt-6">
                Save your Team ID: <strong>{registrationSuccess.teamId}</strong> - you'll need it for the event!
              </p>
            </div>
            

          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-heading text-gradient-halloween mb-6 animate-glow">
            Join the Hunt
          </h1>
          <p className="text-xl text-spooky-muted max-w-3xl mx-auto leading-relaxed">
            Register your team for the most spine-tingling hackathon of the year! 
            Limited spots available - secure yours before they vanish into the night.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Badge className="bg-neon-green text-spooky-dark text-lg p-2 animate-glow">
              <Trophy className="w-4 h-4 mr-2" />
              ₹2L+ Prize Pool
            </Badge>
            <Badge className="bg-halloween-orange text-spooky-light text-lg p-2 animate-flicker">
              <Users className="w-4 h-4 mr-2" />
              200+ Participants
            </Badge>
          </div>
        </div>

        {/* Authentication Welcome Banner */}
        {authState?.userEmail && (
          <div className="max-w-6xl mx-auto mb-8">
            <Alert className="border-neon-green bg-neon-green/20">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="text-neon-green">
                Welcome back! Your email and name have been automatically filled from your authentication.
              </AlertDescription>
            </Alert>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Registration Form */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-halloween-purple-muted p-8 shadow-lg hover:glow-orange transition-all duration-300">
              <h2 className="text-3xl font-spooky text-gradient-halloween mb-6 flex items-center">
                <Code className="w-8 h-8 mr-3 animate-bob" />
                Team Registration
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Team Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="teamName" className="text-spooky-light">Team Name</Label>
                    <Input
                      id="teamName"
                      value={formData.teamName}
                      onChange={(e) => handleInputChange('teamName', e.target.value)}
                      placeholder="Enter your spooky team name"
                      required
                      className="bg-halloween-purple-muted border-halloween-purple text-spooky-light"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="teamSize" className="text-spooky-light">Team Size</Label>
                    <Select onValueChange={(value) => handleInputChange('teamSize', value)} required>
                      <SelectTrigger className="bg-halloween-purple-muted border-halloween-purple text-spooky-light">
                        <SelectValue placeholder="Select team size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 members</SelectItem>
                        <SelectItem value="3">3 members</SelectItem>
                        <SelectItem value="4">4 members</SelectItem>
                        <SelectItem value="5">5 members</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Team Leader Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-halloween-orange">Team Leader Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="teamLeaderName" className="text-spooky-light">
                        Full Name
                        {authState?.userName && (
                          <span className="text-neon-green text-xs ml-2">✓ Auto-filled from authentication</span>
                        )}
                      </Label>
                      <Input
                        id="teamLeaderName"
                        value={formData.teamLeaderName}
                        onChange={(e) => handleInputChange('teamLeaderName', e.target.value)}
                        placeholder="Team leader's name"
                        required
                        className={`bg-halloween-purple-muted border-halloween-purple text-spooky-light ${
                          authState?.userName ? 'border-neon-green' : ''
                        }`}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="institution" className="text-spooky-light">Institution</Label>
                      <Input
                        id="institution"
                        value={formData.institution}
                        onChange={(e) => handleInputChange('institution', e.target.value)}
                        placeholder="Your college/university"
                        required
                        className="bg-halloween-purple-muted border-halloween-purple text-spooky-light"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="teamLeaderEmail" className="text-spooky-light">
                        Email
                        {authState?.userEmail && (
                          <span className="text-neon-green text-xs ml-2">✓ Auto-filled from authentication</span>
                        )}
                      </Label>
                      <Input
                        id="teamLeaderEmail"
                        type="email"
                        value={formData.teamLeaderEmail}
                        onChange={(e) => handleInputChange('teamLeaderEmail', e.target.value)}
                        placeholder="your.email@example.com"
                        required
                        className={`bg-halloween-purple-muted border-halloween-purple text-spooky-light ${
                          authState?.userEmail ? 'border-neon-green' : ''
                        }`}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="teamLeaderPhone" className="text-spooky-light">Phone Number</Label>
                      <Input
                        id="teamLeaderPhone"
                        type="tel"
                        value={formData.teamLeaderPhone}
                        onChange={(e) => handleInputChange('teamLeaderPhone', e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        required
                        className="bg-halloween-purple-muted border-halloween-purple text-spooky-light"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="problemCategory" className="text-spooky-light">Preferred Problem Category</Label>
                      <Select onValueChange={(value) => handleInputChange('problemCategory', value)} required>
                        <SelectTrigger className="bg-halloween-purple-muted border-halloween-purple text-spooky-light">
                          <SelectValue placeholder="Choose your challenge" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web">Web Development Spook</SelectItem>
                          <SelectItem value="ai">AI Phantom Challenge</SelectItem>
                          <SelectItem value="blockchain">Blockchain Boo</SelectItem>
                          <SelectItem value="mobile">Mobile Monster Maker</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="experience" className="text-spooky-light">Team Experience Level</Label>
                      <Select onValueChange={(value) => handleInputChange('experience', value)} required>
                        <SelectTrigger className="bg-halloween-purple-muted border-halloween-purple text-spooky-light">
                          <SelectValue placeholder="Select experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="dietaryRequirements" className="text-spooky-light">Dietary Requirements (Optional)</Label>
                    <Textarea
                      id="dietaryRequirements"
                      value={formData.dietaryRequirements}
                      onChange={(e) => handleInputChange('dietaryRequirements', e.target.value)}
                      placeholder="Any special dietary requirements or allergies"
                      className="bg-halloween-purple-muted border-halloween-purple text-spooky-light"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="emergencyContact" className="text-spooky-light">Emergency Contact Number</Label>
                    <Input
                      id="emergencyContact"
                      type="tel"
                      value={formData.emergencyContact}
                      onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                      placeholder="Emergency contact number"
                      required
                      className="bg-halloween-purple-muted border-halloween-purple text-spooky-light"
                    />
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div id="terms-section" className="space-y-4">
                  <div className={`flex items-start space-x-2 p-3 rounded-lg transition-all ${
                    validationErrors.agreeToTerms ? 'border-2 border-red-500 bg-red-500/10 animate-pulse' : ''
                  }`}>
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                      className={`border-halloween-orange data-[state=checked]:bg-halloween-orange ${
                        validationErrors.agreeToTerms ? 'border-red-500 animate-bounce' : ''
                      }`}
                    />
                    <Label htmlFor="agreeToTerms" className="text-spooky-light text-sm leading-relaxed">
                      I agree to the <span className="text-halloween-orange underline cursor-pointer">terms and conditions</span> and 
                      understand the hackathon rules and regulations.
                      {validationErrors.agreeToTerms && (
                        <div className="text-red-400 text-xs mt-1 flex items-center space-x-1">
                          <AlertTriangle className="w-3 h-3" />
                          <span>This agreement is required to proceed</span>
                        </div>
                      )}
                    </Label>
                  </div>
                  
                  <div className={`flex items-start space-x-2 p-3 rounded-lg transition-all ${
                    validationErrors.agreeToPhotography ? 'border-2 border-red-500 bg-red-500/10 animate-pulse' : ''
                  }`}>
                    <Checkbox
                      id="agreeToPhotography"
                      checked={formData.agreeToPhotography}
                      onCheckedChange={(checked) => handleInputChange('agreeToPhotography', checked as boolean)}
                      className={`border-halloween-orange data-[state=checked]:bg-halloween-orange ${
                        validationErrors.agreeToPhotography ? 'border-red-500 animate-bounce' : ''
                      }`}
                    />
                    <Label htmlFor="agreeToPhotography" className="text-spooky-light text-sm leading-relaxed">
                      I consent to photography and videography during the event for promotional purposes.
                      {validationErrors.agreeToPhotography && (
                        <div className="text-red-400 text-xs mt-1 flex items-center space-x-1">
                          <AlertTriangle className="w-3 h-3" />
                          <span>This agreement is required to proceed</span>
                        </div>
                      )}
                    </Label>
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit"
                  variant="neon" 
                  size="xl" 
                  disabled={loading}
                  className="w-full text-lg animate-glow"
                >
                  {loading ? 'Registering Team...' : 'Register Team for Halloween Hackathon'}
                </Button>
              </form>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* What You Get */}
            <Card className="bg-card border-halloween-purple-muted p-6 shadow-lg">
              <h3 className="text-2xl font-spooky text-gradient-halloween mb-4 flex items-center">
                <Trophy className="w-6 h-6 mr-2 animate-bob" />
                What You Get
              </h3>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5 animate-glow" />
                    <span className="text-spooky-light text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Contact Support */}
            <Card className="bg-gradient-halloween p-6 text-center shadow-lg glow-orange">
              <h3 className="text-xl font-spooky text-spooky-dark mb-2">
                Need Help?
              </h3>
              <p className="text-spooky-dark mb-4 text-sm">
                Having trouble with registration? Our spooky support team is here to help!
              </p>
              <div className="space-y-2 text-sm text-spooky-dark">
                <div className="flex items-center justify-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>help@mckvie-hackathon.edu.in</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+91 98765 43210</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;