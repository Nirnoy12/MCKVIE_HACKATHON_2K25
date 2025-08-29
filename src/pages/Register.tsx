import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Users, Mail, Phone, Code, Trophy, CheckCircle } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    teamName: '',
    teamLeaderName: '',
    teamLeaderEmail: '',
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

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions to register.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Registration Submitted! 🎃",
      description: "Your Halloween hackathon registration has been submitted successfully. Check your email for confirmation.",
    });
    
    console.log('Registration Data:', formData);
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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-spooky text-gradient-halloween mb-6 animate-glow">
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
                      <Label htmlFor="teamLeaderName" className="text-spooky-light">Full Name</Label>
                      <Input
                        id="teamLeaderName"
                        value={formData.teamLeaderName}
                        onChange={(e) => handleInputChange('teamLeaderName', e.target.value)}
                        placeholder="Team leader's name"
                        required
                        className="bg-halloween-purple-muted border-halloween-purple text-spooky-light"
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
                      <Label htmlFor="teamLeaderEmail" className="text-spooky-light">Email</Label>
                      <Input
                        id="teamLeaderEmail"
                        type="email"
                        value={formData.teamLeaderEmail}
                        onChange={(e) => handleInputChange('teamLeaderEmail', e.target.value)}
                        placeholder="your.email@example.com"
                        required
                        className="bg-halloween-purple-muted border-halloween-purple text-spooky-light"
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
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                      className="border-halloween-orange data-[state=checked]:bg-halloween-orange"
                    />
                    <Label htmlFor="agreeToTerms" className="text-spooky-light text-sm leading-relaxed">
                      I agree to the <span className="text-halloween-orange underline cursor-pointer">terms and conditions</span> and 
                      understand the hackathon rules and regulations.
                    </Label>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeToPhotography"
                      checked={formData.agreeToPhotography}
                      onCheckedChange={(checked) => handleInputChange('agreeToPhotography', checked as boolean)}
                      className="border-halloween-orange data-[state=checked]:bg-halloween-orange"
                    />
                    <Label htmlFor="agreeToPhotography" className="text-spooky-light text-sm leading-relaxed">
                      I consent to photography and videography during the event for promotional purposes.
                    </Label>
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit"
                  variant="neon" 
                  size="xl" 
                  className="w-full text-lg animate-glow"
                >
                  Register Team for Halloween Hackathon
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