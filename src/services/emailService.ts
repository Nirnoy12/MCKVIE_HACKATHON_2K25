import emailjs from '@emailjs/browser';
import { getFirestore, collection, getDocs, query } from 'firebase/firestore';
import { getApps, getApp } from 'firebase/app';

// EmailJS configuration
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Problem category mappings
const PROBLEM_CATEGORY_MAP: Record<string, string> = {
  "web": "W",
  "ai": "A", 
  "blockchain": "B",
  "mobile": "M"
};

const PROBLEM_CATEGORY_DISPLAY: Record<string, string> = {
  "web": "Web Development Spook",
  "ai": "AI Phantom Challenge", 
  "blockchain": "Blockchain Boo",
  "mobile": "Mobile Monster Maker"
};

const EXPERIENCE_DISPLAY: Record<string, string> = {
  "beginner": "Beginner",
  "intermediate": "Intermediate",
  "advanced": "Advanced"
};

/**
 * Generate unique team ID in format MHACK_{number}{category}
 */
export const generateTeamId = (teamNumber: number, problemCategory: string): string => {
  const categoryLetter = PROBLEM_CATEGORY_MAP[problemCategory] || "X";
  const formattedNumber = teamNumber.toString().padStart(3, "0");
  return `MHACK_${formattedNumber}${categoryLetter}`;
};

/**
 * Get next team number based on Firestore registration count
 * This ensures unique team IDs across all browsers and sessions
 */
export const getNextTeamNumber = async (): Promise<number> => {
  try {
    // Get Firebase app and Firestore instance
    const app = getApps().length > 0 ? getApp() : null;
    if (!app) {
      console.warn('Firebase app not initialized, using fallback counter');
      // Fallback to localStorage if Firebase isn't available
      const currentCount = parseInt(localStorage.getItem('teamCounter') || '0');
      const nextCount = currentCount + 1;
      localStorage.setItem('teamCounter', nextCount.toString());
      return nextCount;
    }

    const db = getFirestore(app);
    const appId = import.meta.env.VITE_FIREBASE_APP_ID || 'default-app-id';
    
    // Query all registrations to count them
    const registrationsRef = collection(db, `artifacts/${appId}/public/data/registrations`);
    const registrationsQuery = query(registrationsRef);
    const querySnapshot = await getDocs(registrationsQuery);
    
    // Next team number is total count + 1
    const nextTeamNumber = querySnapshot.size + 1;
    
    console.log(`📊 Total registrations in Firestore: ${querySnapshot.size}`);
    console.log(`🆔 Next team number will be: ${nextTeamNumber}`);
    
    return nextTeamNumber;
    
  } catch (error) {
    console.error('Error getting team number from Firestore:', error);
    console.warn('Falling back to localStorage counter');
    
    // Fallback to localStorage if Firestore query fails
    const currentCount = parseInt(localStorage.getItem('teamCounter') || '0');
    const nextCount = currentCount + 1;
    localStorage.setItem('teamCounter', nextCount.toString());
    return nextCount;
  }
};

/**
 * Send registration confirmation email using EmailJS
 */
export const sendRegistrationEmail = async (registrationData: any, teamId: string): Promise<boolean> => {
  console.log('🚀 sendRegistrationEmail function called!', { teamId, email: registrationData.teamLeaderEmail });
  console.log('📋 Full registration data received:', registrationData);
  
  // Check if EmailJS is configured
  console.log('📧 EmailJS Configuration check:', {
    hasServiceId: !!EMAILJS_SERVICE_ID,
    hasTemplateId: !!EMAILJS_TEMPLATE_ID, 
    hasPublicKey: !!EMAILJS_PUBLIC_KEY,
    serviceId: EMAILJS_SERVICE_ID,
    templateId: EMAILJS_TEMPLATE_ID,
    publicKey: EMAILJS_PUBLIC_KEY ? EMAILJS_PUBLIC_KEY.substring(0, 8) + '...' : 'missing'
  });
  
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    console.warn('❌ EmailJS not configured - skipping email');
    return false;
  }

  // Prepare email template parameters to match your EmailJS HTML template exactly
  const templateParams = {
    // EmailJS required fields
    to_email: registrationData.teamLeaderEmail,
    from_name: "MCKVIE Halloween Hackathon Team",
    reply_to: registrationData.teamLeaderEmail,
    
    // Template variables matching your HTML template exactly
    teamId: teamId,
    teamLeaderName: registrationData.teamLeaderName || "",
    teamName: registrationData.teamName || "",
    teamLeaderEmail: registrationData.teamLeaderEmail || "",
    teamLeaderPhone: registrationData.teamLeaderPhone || "",
    institution: registrationData.institution || "",
    teamSize: registrationData.teamSize || "",
    problemCategory: PROBLEM_CATEGORY_DISPLAY[registrationData.problemCategory] || registrationData.problemCategory || "",
    experience: EXPERIENCE_DISPLAY[registrationData.experience] || registrationData.experience || "",
    emergencyContact: registrationData.emergencyContact || "",
    whatsappLink: "https://chat.whatsapp.com/Ls9Zdw3nWNbCS55Q47c5kP?mode=ems_wa_c",
    
    // Handle dietary requirements for conditional display (send empty string if none)
    dietaryRequirements: (registrationData.dietaryRequirements && registrationData.dietaryRequirements.trim()) 
      ? registrationData.dietaryRequirements.trim()
      : ""
  };

  try {
    console.log('Sending email with EmailJS...', { 
      teamId, 
      email: registrationData.teamLeaderEmail,
      serviceId: EMAILJS_SERVICE_ID,
      templateId: EMAILJS_TEMPLATE_ID,
      hasPublicKey: !!EMAILJS_PUBLIC_KEY 
    });
    console.log('Template parameters:', templateParams);
    
    // Validate templateParams before sending
    const requiredFields = ['teamId', 'teamLeaderName', 'teamName', 'teamLeaderEmail'];
    const missingFields = requiredFields.filter(field => !templateParams[field]);
    if (missingFields.length > 0) {
      console.error('❌ Missing required template fields:', missingFields);
      console.error('Registration data received:', registrationData);
      return false;
    }

    // Send email using EmailJS (NO PUBLIC KEY HERE - it's already initialized)
    console.log('🚀 Calling emailjs.send with:', {
      serviceId: EMAILJS_SERVICE_ID,
      templateId: EMAILJS_TEMPLATE_ID
    });
    
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('✅ Email sent successfully!', {
      status: response.status,
      text: response.text,
      teamId,
      toEmail: registrationData.teamLeaderEmail,
      timestamp: new Date().toISOString()
    });
    
    return true;

  } catch (error: any) {
    console.error('❌ Failed to send email:', error);
    
    // Log specific EmailJS error details for 422 status
    if (error.status === 422) {
      console.error('🚨 EmailJS 422 Error - Data validation failed:', {
        status: error.status,
        text: error.text,
        message: error.message,
        templateParams: templateParams,
        serviceId: EMAILJS_SERVICE_ID,
        templateId: EMAILJS_TEMPLATE_ID
      });
    }
    
    // Check for templateParams error specifically
    if (error.message && error.message.includes('templateParams')) {
      console.error('🚨 Template Parameters Error:', {
        error: error.message,
        templateParams,
        registrationData,
        teamId
      });
    }
    
    return false;
  }
};

/**
 * Reset the fallback localStorage counter (for development/testing)
 * Note: The primary counter is now based on Firestore document count
 */
export const resetTeamCounter = (): void => {
  localStorage.removeItem('teamCounter');
  console.log('🔄 localStorage team counter reset');
  console.log('ℹ️  Note: Primary counter is now based on Firestore registration count');
};

/**
 * Initialize EmailJS (call this once in your app)
 */
export const initializeEmailJS = (): boolean => {
  if (!EMAILJS_PUBLIC_KEY) {
    console.warn('EmailJS public key not configured');
    return false;
  }
  
  try {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    console.log('EmailJS initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize EmailJS:', error);
    return false;
  }
};
