import { UIDLComponentStyleResolverArgs } from './resolveStyles'

export function getInputType(contentType: string) {
  switch (contentType) {
    case 'email':
    case 'number':
    case 'password':
    case 'tel':
    case 'text':
      return contentType
    case 'phoneNumber':
      return 'tel'
    default:
      return null
  }
}

/**
 * Takes an object, and a key and replaces a color from 0x00000000 to #00000000 format
 * If a third argument (overrideKey) is provided, it will override the original key
 *    and delete the old key
 * @param { object } styleObj - Style object
 * @param { string } key - Key to replace value with
 * @param { string? } overrideKey - A key to override the "key" if provided
 */
export function ensureHex(styleObj: any, key: string, overrideKey?: string) {
  if (styleObj && typeof styleObj[key] === 'string') {
    if (styleObj[key].startsWith('0x')) {
      // Use the override key instead of the original and delete the original one
      if (overrideKey) {
        styleObj[overrideKey] = styleObj[key].replace('0x', '#')
        delete styleObj[key]
      } else {
        styleObj[key] = styleObj[key].replace('0x', '#')
      }
    }
  }
}

/**
 * Renames some keywords to align more with html/css/etc
 * ex: resource --> src (for images)
 * @param { object } options
 * @param { object } options.style - Style object
 */
export function resolveColors({ style }: UIDLComponentStyleResolverArgs) {
  const { color, textColor, backgroundColor } = style
  // Convert color codes to their number data type for html to read correctly
  if (typeof color === 'string') {
    ensureHex(style, 'color')
  }
  if (typeof textColor === 'string') {
    ensureHex(style, 'textColor', 'color')
  }
  if (typeof backgroundColor === 'string') {
    ensureHex(style, 'backgroundColor')
  }
}

export default resolveColors
