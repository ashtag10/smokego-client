/**
 * Validation email
 */
export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

/**
 * Validation téléphone (format international)
 */
export const isValidPhone = (phone: string): boolean => {
  const regex = /^\+\d{1,3}\d{6,12}$/
  return regex.test(phone)
}

/**
 * Validation mot de passe (min 8 caractères, 1 lettre, 1 chiffre)
 */
export const isValidPassword = (password: string): boolean => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  return regex.test(password)
}

/**
 * Validation OTP (6 chiffres)
 */
export const isValidOTP = (otp: string): boolean => {
  const regex = /^\d{6}$/
  return regex.test(otp)
}

/**
 * Validation nom (2-60 caractères, lettres, espaces, tirets)
 */
export const isValidName = (name: string): boolean => {
  const regex = /^[a-zA-ZÀ-ÿ\s\-]{2,60}$/
  return regex.test(name)
}

/**
 * Validation prix
 */
export const isValidPrice = (price: number): boolean => {
  return price > 0 && Number.isFinite(price)
}

/**
 * Validation quantité
 */
export const isValidQuantity = (quantity: number): boolean => {
  return Number.isInteger(quantity) && quantity > 0
}

/**
 * Validation code postal
 */
export const isValidPostalCode = (code: string): boolean => {
  const regex = /^\d{5}$/
  return regex.test(code)
}