export interface NavigationItem {
  name: string;
  path: string;
}

export interface RegistrationFormData {
  teamName: string;
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
}

export interface ProblemCategory {
  id: number;
  title: string;
  difficulty: string;
  duration: string;
  teamSize: string;
  description: string;
  techStack: string[];
  prizes: string[];
}

export interface ContactMethod {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  description: string;
  action: string;
}

export interface Organizer {
  name: string;
  role: string;
  email: string;
  phone: string;
  image: string;
}

export interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  url: string;
  color: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

