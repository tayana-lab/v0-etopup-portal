// Utility functions for validation

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhoneNumber(phoneNumber: string): boolean {
  // Seychelles phone numbers are 7 digits
  const cleaned = phoneNumber.replace(/\D/g, '')
  return cleaned.length === 7
}

export function validateOTP(otp: string, length: number = 6): boolean {
  return /^\d+$/.test(otp) && otp.length === length
}

export function validatePassword(password: string, minLength: number = 6): boolean {
  return password.length >= minLength
}

export function validateMobileNumber(mobile: string): { valid: boolean; error?: string } {
  const cleaned = mobile.replace(/\D/g, '')
  
  if (cleaned.length === 0) {
    return { valid: false, error: 'Mobile number is required' }
  }
  
  if (cleaned.length !== 7) {
    return { valid: false, error: 'Mobile number must be 7 digits' }
  }
  
  return { valid: true }
}

export function validateAmount(amount: number, min: number = 0, max?: number): boolean {
  if (amount < min) return false
  if (max !== undefined && amount > max) return false
  return true
}
