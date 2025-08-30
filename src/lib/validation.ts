import type { RegistrationFormData } from './types';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-()]{10,}$/;
  return phoneRegex.test(phone);
};

export const validateRegistrationForm = (formData: RegistrationFormData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!formData.teamName.trim()) {
    errors.push('Team name is required');
  }

  if (!formData.teamLeaderName.trim()) {
    errors.push('Team leader name is required');
  }

  if (!formData.teamLeaderEmail.trim()) {
    errors.push('Team leader email is required');
  } else if (!validateEmail(formData.teamLeaderEmail)) {
    errors.push('Please enter a valid email address');
  }

  if (!formData.teamLeaderPhone.trim()) {
    errors.push('Team leader phone is required');
  } else if (!validatePhone(formData.teamLeaderPhone)) {
    errors.push('Please enter a valid phone number');
  }

  if (!formData.institution.trim()) {
    errors.push('Institution is required');
  }

  if (!formData.teamSize) {
    errors.push('Team size is required');
  }

  if (!formData.problemCategory) {
    errors.push('Problem category is required');
  }

  if (!formData.agreeToTerms) {
    errors.push('You must agree to the terms and conditions');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

