import {
  AsYouType,
  CountryCode,
  isValidNumberForRegion,
} from 'libphonenumber-js'

export async function formatPhoneNumber({
  phoneNumber,
  country,
}: {
  phoneNumber: string
  country: CountryCode
}): Promise<string> {
  const asYouType = new AsYouType(country)
  await asYouType.input(phoneNumber)
  const result = await asYouType.getNumber()
  if (!result) return ''
  const { countryCallingCode, nationalNumber } = result
  return `+${countryCallingCode} ${nationalNumber}`
}

export async function isValidPhoneNumber({
  phoneNumber,
  country,
}: {
  phoneNumber: string
  country: CountryCode
}): Promise<boolean> {
  return isValidNumberForRegion(phoneNumber, country)
}
