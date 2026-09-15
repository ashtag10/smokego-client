/**
 * Formate un nombre en prix FCFA
 */
export const formatPrice = (amount: number | string | any): string => {
  
  let numericAmount: number;
  
  if (typeof amount === 'string') {
    numericAmount = parseFloat(amount);
  } else if (amount && typeof amount === 'object' && 'toNumber' in amount) {
    // Cas du Decimal de Prisma
    numericAmount = amount.toNumber();
  } else if (typeof amount === 'number') {
    numericAmount = amount;
  } else {
    numericAmount = 0;
  }

  
  if (isNaN(numericAmount) || !isFinite(numericAmount)) {
    console.warn('⚠️ formatPrice - Invalid amount:', amount);
    return '0 FCFA';
  }

  //
  const roundedAmount = Math.round(numericAmount * 100) / 100;
  
  if (roundedAmount === 0) {
    return '0 FCFA';
  }

  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(roundedAmount).replace('FCFA', 'FCFA');
}

/**
 * Formate une date
 */
export const formatDate = (date: string | Date, format: 'short' | 'long' | 'relative' = 'short'): string => {
  const d = typeof date === 'string' ? new Date(date) : date

  if (isNaN(d.getTime())) {
    return 'Date invalide'
  }

  if (format === 'relative') {
    const now = new Date()
    const diff = Math.floor((now.getTime() - d.getTime()) / 1000)

    if (diff < 60) return 'à l\'instant'
    if (diff < 3600) return `il y a ${Math.floor(diff / 60)} min`
    if (diff < 86400) return `il y a ${Math.floor(diff / 3600)} h`
    if (diff < 604800) return `il y a ${Math.floor(diff / 86400)} j`
    return formatDate(d, 'short')
  }

  if (format === 'long') {
    return d.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return d.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Formate un numéro de téléphone
 */
export const formatPhone = (phone: string): string => {
  if (!phone) return ''
  
  // +237699123456 -> +237 699 12 34 56
  if (phone.startsWith('+237')) {
    const rest = phone.slice(4)
    return `+237 ${rest.slice(0, 3)} ${rest.slice(3, 5)} ${rest.slice(5, 7)} ${rest.slice(7, 9)}`
  }
  return phone
}

/**
 * Tronque un texte
 */
export const truncateText = (text: string, maxLength: number = 100): string => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

/**
 * Capitalise la première lettre
 */
export const capitalizeFirst = (text: string): string => {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}