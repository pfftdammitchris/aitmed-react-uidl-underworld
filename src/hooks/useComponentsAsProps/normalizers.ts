import { UIDLStyleBorder, ViewportOptions } from '../types'
import { callAll, getViewportRatio, hasLetter, hasDecimal, log } from './common'

function attachTextAlign(styleObj: any, textAlign: string) {
  if (textAlign) {
    if (textAlign === 'centerX') {
      styleObj.textAlign = 'center'
    } else if (textAlign === 'centerY') {
      styleObj.display = 'flex'
      styleObj.alignItems = 'center'
      delete styleObj['textAlign']
    } else {
      switch (textAlign) {
        case 'left':
        case 'center':
        case 'right':
          if (styleObj['textAlign'] !== textAlign) {
            styleObj.textAlign = textAlign
          }
          return
        default:
          log({
            msg: `The value of textAlign was not found to be supported. textAlign: ${textAlign}`,
            color: 'red',
            data: textAlign,
          })
          return
      }
    }
  }
}

/** Normalize aliases like "textAlign", "align", etc.
 * @param { object } styleObj - Any style object
 */
export function normalizeAliasAttrs(styleObj: any) {
  if (styleObj) {
    if ('textAlign' in styleObj) {
      const { textAlign } = styleObj
      if (typeof textAlign === 'string') {
        attachTextAlign(styleObj, textAlign)
      } else if (textAlign && typeof textAlign === 'object') {
        const { x, y } = textAlign
        if (typeof x !== 'undefined') {
          attachTextAlign(styleObj, x)
        }
        if (typeof y !== 'undefined') {
          attachTextAlign(styleObj, y)
        }
      }
    }
    if ('align' in styleObj) {
      const align = styleObj.align
      if (align === 'centerX') {
        styleObj.display = 'flex'
        styleObj.justifyContent = 'center'
      } else if (align === 'centerY') {
        styleObj.display = 'flex'
        styleObj.alignItems = 'center'
      }
      delete styleObj['align']
    }
  }
}

/**
 * Recurses throughout an object, converting any values that need to be explicitly converted
 *  for html to render correctly
 * @param { object } styleObj - Any style object
 */
export function normalizeStyleAttrs(
  styleObj: Record<string, any>,
  viewport: ViewportOptions,
): any {
  if (!styleObj) return styleObj
  const keys = Object.keys(styleObj)
  const normalize = callAll(
    normalizeAliasAttrs,
    normalizeBorderAttrs,
    normalizeColorAttrs,
    normalizeFontAttrs,
    normalizePositionAttrs,
  )
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index]
    const value = styleObj[key]
    if (value && typeof value === 'object') {
      if (key !== 'border') styleObj[key] = normalizeStyleAttrs(value, viewport)
    }
  }
  normalize(styleObj, viewport)
  return styleObj
}

/**
 * Normalizes any font attributes to be read for web pages
 * @param { object } styleObj - Any styleobject
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
 * @param { object } styleObj - Any style object
 */
export function normalizePositionAttrs({
  component,
  viewport: { viewportWidth, viewportHeight },
}: ViewportOptions) {
  const styleObj = component.style
  const keysToHandle = ['width', 'height', 'top', 'left', 'right', 'bottom']
  if (styleObj) {
    keysToHandle.forEach((key: string) => {
      if (key in styleObj) {
        const value = styleObj[key]
        if (value == '0') styleObj[key] = 0
        else if (typeof value === 'string') {
          if (key === 'width' || key === 'height') {
            if (value == '1') {
              const viewportSize =
                key === 'width' ? viewportWidth : viewportHeight
              styleObj[key] = viewportSize + 'px'
            } else if (!hasLetter(value)) {
              styleObj[key] = getViewportRatio(viewportWidth, value) + 'px'
            }
          } else if (!hasLetter(value) && hasDecimal(value)) {
            if (key === 'left' || key === 'top') {
              styleObj[key] = getViewportRatio(viewportHeight, value) + 'px'
            }
          }
        }
      }
    })
  }
}

/**
 * Normalizes any color attributes to be read for web pages
 * @param { object } styleObj - Any style object
 */
export function normalizeColorAttrs(component: any) {
  const styleObj = component.style
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
export function normalizeBorderAttrs(component: any) {
  const styleObj = component.style
  if (styleObj) {
    const border: UIDLStyleBorder = styleObj?.border
    if (border == '0') {
      styleObj.borderStyle = 'none'
      delete styleObj['border']
    }
    let style, color, width, line
    if (border && typeof border === 'object') {
      style = border.style
      color = border.color
      width = border.width
      line = border.line
    }
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
    if (typeof styleObj.borderRadius === 'string') {
      if (!hasLetter(styleObj.borderRadius)) {
        styleObj.borderRadius = Number(styleObj.borderRadius)
      }
    }
    if (styleObj.borderWidth && typeof styleObj.borderWidth === 'string') {
      if (!hasLetter(styleObj.borderWidth)) {
        styleObj.borderWidth = `${styleObj.borderWidth}px`
      }
    }
    delete styleObj['border']
  }
}
