import { UIDLStyleBorder } from '@aitmed/react-uidl'
import { callAll, getViewportRatio, hasDecimal, hasLetter, log } from 'utils'
import { UIDLComponentResolversArgs } from '.'

/**
 * Recurses throughout an object, converting any values that need to be explicitly converted
 *  for html to render correctly
 * @param { object } options
 * @param { UIDLComponent } options.component - UIDL component
 * @param { UIDLComponentResolversArgs } options.viewport - Object describing the viewport size
 */
export function normalizeStyleAttrs({
  component,
  viewport,
  ...rest
}: UIDLComponentResolversArgs) {
  const keys = Object.keys(component.style)
  const normalize = callAll(
    normalizeAliasAttrs,
    normalizeBorderAttrs,
    normalizeColorAttrs,
    normalizeFontAttrs,
    normalizePositionAttrs,
  )
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index]
    const value = component.style[key]
    if (value && typeof value === 'object') {
      if (key !== 'border')
        component.style[key] = normalizeStyleAttrs({
          component: value,
          viewport,
          ...rest,
        })
    }
  }
  normalize(component.style, viewport)
  return component.style
}

function attachTextAlign(component: any, textAlign: string) {
  if (textAlign) {
    if (textAlign === 'centerX') {
      component.style.textAlign = 'center'
    } else if (textAlign === 'centerY') {
      component.style.display = 'flex'
      component.style.alignItems = 'center'
      delete component.style['textAlign']
    } else {
      switch (textAlign) {
        case 'left':
        case 'center':
        case 'right':
          if (component.style['textAlign'] !== textAlign) {
            component.style.textAlign = textAlign
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
 * @param { object } component.style - Any style object
 */
export function normalizeAliasAttrs({
  component,
  viewport: { viewportWidth, viewportHeight },
}: UIDLComponentResolversArgs) {
  if (component.style) {
    if ('textAlign' in component.style) {
      const { textAlign } = component.style
      if (typeof textAlign === 'string') {
        attachTextAlign(component, textAlign)
      } else if (textAlign && typeof textAlign === 'object') {
        const { x, y } = textAlign
        if (typeof x !== 'undefined') {
          attachTextAlign(component, x)
        }
        if (typeof y !== 'undefined') {
          attachTextAlign(component, y)
        }
      }
    }
    if ('align' in component.style) {
      const align = component.style.align
      if (align === 'centerX') {
        component.style.display = 'flex'
        component.style.justifyContent = 'center'
      } else if (align === 'centerY') {
        component.style.display = 'flex'
        component.style.alignItems = 'center'
      }
      delete component.style['align']
    }
  }
}

/**
 * Converts a style object and normalizes it for html
 * @param { object } component.style - Style object
 * 1) no border / no borderRadius/
 * 2) borderBottom / solid / no borderRadius/
 * 3) borderAll / solid / has borderRadius
 * 4) borderAll / dashed / no borderRadius
 * 5) no border / has borderRadius
 */
export function normalizeBorderAttrs({
  component,
  viewport: { viewportWidth, viewportHeight },
}: UIDLComponentResolversArgs) {
  if (component.style) {
    const border: UIDLStyleBorder = component.style?.border
    if (border == '0') {
      component.style.borderStyle = 'none'
      delete component.style['border']
    }
    let style, color, width, line
    if (border && typeof border === 'object') {
      style = border.style
      color = border.color
      width = border.width
      line = border.line
    }
    if (color) component.style.borderColor = color
    if (line) component.style.borderStyle = line
    if (width) component.style.borderWidth = width
    if (style == '1') {
      component.style.borderStyle = 'none'
      component.style.borderRadius = 0
    } else if (style == '2') {
      component.style.borderRadius = 0
      component.style.borderStyle = 'none'
      component.style.borderBottomStyle = 'solid'
    } else if (style == '3') {
      component.style.borderStyle = 'solid'
      if (!width) component.style.borderWidth = 'thin'
    } else if (style == '4') {
      component.style.borderStyle = 'dashed'
      if (!width) component.style.borderWidth = 'thin'
      component.style.borderRadius = 0
    } else if (style == '5') {
      component.style.borderStyle = 'none'
    }
    if (typeof component.style.borderRadius === 'string') {
      if (!hasLetter(component.style.borderRadius)) {
        component.style.borderRadius = Number(component.style.borderRadius)
      }
    }
    if (
      component.style.borderWidth &&
      typeof component.style.borderWidth === 'string'
    ) {
      if (!hasLetter(component.style.borderWidth)) {
        component.style.borderWidth = `${component.style.borderWidth}px`
      }
    }
    delete component.style['border']
  }
}

/**
 * Normalizes any color attributes to be read for web pages
 * @param { object } component.style - Any style object
 */
export function normalizeColorAttrs({
  component,
  viewport: { viewportWidth, viewportHeight },
}: UIDLComponentResolversArgs) {
  if (component.style) {
    const { color, textColor, backgroundColor } = component.style
    if (typeof color === 'string') {
      // Convert color codes to their number data type for html to read correctly
      if (color.startsWith('0x')) {
        component.style['color'] = color.replace('0x', '#')
      }
    }
    if (typeof textColor === 'string') {
      if (textColor.startsWith('0x')) {
        component.style['color'] = textColor.replace('0x', '#')
      } else {
        component.style['color'] = textColor
      }
      delete component.style['textColor']
    }
    if (typeof backgroundColor === 'string') {
      if (backgroundColor.startsWith('0x')) {
        component.style['backgroundColor'] = backgroundColor.replace('0x', '#')
      }
    }
  }
}

/**
 * Normalizes any font attributes to be read for web pages
 * @param { object } options
 * @param { UIDLComponent } options.component - UIDL component
 * @param { UIDLComponentResolversArgs } options.viewport - Object describing the viewport size
 */
export function normalizeFontAttrs({
  component,
  viewport: { viewportWidth, viewportHeight },
}: UIDLComponentResolversArgs) {
  if (component.style) {
    const { fontSize, fontStyle } = component.style
    // '10' --> 10
    if (typeof fontSize === 'string' && !hasLetter(fontSize)) {
      component.style['fontSize'] = Number(fontSize)
    }
    if (fontStyle === 'bold') {
      component.style['fontWeight'] = 'bold'
      delete component.style['fontStyle']
    }
  }
}

/**
 * Normalizes any position attributes to be read for web pages
 * @param { object } options
 * @param { UIDLComponent } options.component - UIDL component
 * @param { UIDLComponentResolversArgs } options.viewport - Object describing the viewport size
 */
export function normalizePositionAttrs({
  component,
  viewport: { viewportWidth, viewportHeight },
}: UIDLComponentResolversArgs) {
  const keysToHandle = ['width', 'height', 'top', 'left', 'right', 'bottom']
  if (component.style) {
    keysToHandle.forEach((key: string) => {
      if (key in component.style) {
        const value = component.style[key]
        if (value == '0') component.style[key] = 0
        else if (typeof value === 'string') {
          if (key === 'width' || key === 'height') {
            if (value == '1') {
              const viewportSize =
                key === 'width' ? viewportWidth : viewportHeight
              component.style[key] = viewportSize + 'px'
            } else if (!hasLetter(value)) {
              component.style[key] =
                getViewportRatio(viewportWidth, value) + 'px'
            }
          } else if (!hasLetter(value) && hasDecimal(value)) {
            if (key === 'left' || key === 'top') {
              component.style[key] =
                getViewportRatio(viewportHeight, value) + 'px'
            }
          }
        }
      }
    })
  }
}
