import { callAll, hasLetter, hasDecimal, decimalToWhole } from './common'
import { UIDLBorder } from '../types'

/**
 * Recurses throughout an object, converting any values that need to be explicitly converted
 *  for html to render correctly
 * @param { object } styleObj - Any object
 */
export function normalizeStyleAttrs(styleObj: Record<string, any>): any {
  const keys = Object.keys(styleObj)
  const normalize = callAll(
    normalizeBorderAttrs,
    normalizeColorAttrs,
    normalizeFontAttrs,
    normalizePositionAttrs,
  )
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index]
    const value = styleObj[key]
    if (value && typeof value === 'object') {
      if (key !== 'border') styleObj[key] = normalizeStyleAttrs(value)
    }
  }
  normalize(styleObj)
  return styleObj
}

/**
 * Normalizes any font attributes to be read for web pages
 * @param { object } styleObj - Any object
 */
export function normalizeFontAttrs(styleObj: any) {
  if (styleObj) {
    const { fontSize, fontStyle } = styleObj
    // '10' --> 10
    if (typeof fontSize === 'string' && !hasLetter(fontSize)) {
      styleObj['fontSize'] = Number(fontSize)
    }
    if (fontStyle === 'bold') {
      styleObj['fontWeight'] = 'bold'
      delete styleObj['fontStyle']
    }
  }
}

/**
 * Normalizes any position attributes to be read for web pages
 * @param { object } styleObj - Any object
 */
export function normalizePositionAttrs(styleObj: any) {
  const keysToHandle = ['width', 'height', 'top', 'left', 'right', 'bottom']
  if (styleObj) {
    keysToHandle.forEach((key: string) => {
      if (key in styleObj) {
        const value = styleObj[key]
        if (value == '0') styleObj[key] = 0
        else if (typeof value === 'string') {
          if (key === 'width' || key === 'height') {
            if (value == '1')
              styleObj[key] = key === 'width' ? '100vw' : '100vh'
            else if (!hasLetter(value)) {
              styleObj[key] = `${decimalToWhole(value)}${
                key === 'width' ? 'vw' : 'vh'
              }`
            }
          } else if (!hasLetter(value) && hasDecimal(value)) {
            styleObj[key] = `${decimalToWhole(value)}${
              ['width', 'left', 'right'].includes(key) ? 'vw' : 'vh'
            }`
          }
        }
      }
    })
  }
}

/**
 * Normalizes any color attributes to be read for web pages
 * @param { object } styleObj - Any object
 */
export function normalizeColorAttrs(styleObj: any) {
  if (styleObj) {
    const { color, textColor, backgroundColor } = styleObj
    if (typeof color === 'string') {
      // Convert color codes to their number data type for html to read correctly
      if (color.startsWith('0x')) {
        styleObj['color'] = color.replace('0x', '#')
      }
    }
    if (typeof textColor === 'string') {
      if (textColor.startsWith('0x')) {
        styleObj['color'] = textColor.replace('0x', '#')
      } else {
        styleObj['color'] = textColor
      }
      delete styleObj['textColor']
    }
    if (typeof backgroundColor === 'string') {
      if (backgroundColor.startsWith('0x')) {
        styleObj['backgroundColor'] = backgroundColor.replace('0x', '#')
      }
    }
  }
}

/**
 * Converts a style object and normalizes it for html
 * @param { object } styleObj - Style object
 * 1) no border / no borderRadius/
 * 2) borderBottom / solid / no borderRadius/
 * 3) borderAll / solid / has borderRadius
 * 4) borderAll / dashed / no borderRadius
 * 5) no border / has borderRadius
 */
export function normalizeBorderAttrs(styleObj: any) {
  const border: UIDLBorder = styleObj?.border
  if (typeof border === 'undefined') return
  if (border == '0') {
    styleObj.borderStyle = 'none'
    delete styleObj['border']
    return
  }
  const { style, color, width, line } = border
  if (color) styleObj.borderColor = color
  if (line) styleObj.borderStyle = line
  if (width) styleObj.borderWidth = width
  if (style == '1') {
    styleObj.borderStyle = 'none'
    styleObj.borderRadius = 0
  } else if (style == '2') {
    styleObj.borderRadius = 0
    styleObj.borderStyle = 'none'
    styleObj.borderBottomStyle = 'solid'
  } else if (style == '3') {
    styleObj.borderStyle = 'solid'
    if (!width) styleObj.borderWidth = 'thin'
  } else if (style == '4') {
    styleObj.borderStyle = 'dashed'
    if (!width) styleObj.borderWidth = 'thin'
    styleObj.borderRadius = 0
  } else if (style == '5') {
    styleObj.borderStyle = 'none'
  }
  if (typeof styleObj.borderRadius !== 'undefined') {
    styleObj['borderRadius'] = Number(styleObj.borderRadius)
  }
  delete styleObj['border']
}
