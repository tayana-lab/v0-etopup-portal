// Utility functions for formatting data

export function formatCurrency(amount: number, currency: string = 'SCR'): string {
  return new Intl.NumberFormat('en-SC', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

export function formatPhoneNumber(phoneNumber: string): string {
  // Format Seychelles phone numbers: +248 XXXXXXX
  const cleaned = phoneNumber.replace(/\D/g, '')
  if (cleaned.length === 7) {
    return `+248 ${cleaned}`
  }
  return phoneNumber
}

export function formatDate(date: Date | string, format: 'short' | 'long' = 'short'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  if (format === 'long') {
    return new Intl.DateTimeFormat('en-SC', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(dateObj)
  }
  
  return new Intl.DateTimeFormat('en-SC', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(dateObj)
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.substring(0, maxLength)}...`
}
