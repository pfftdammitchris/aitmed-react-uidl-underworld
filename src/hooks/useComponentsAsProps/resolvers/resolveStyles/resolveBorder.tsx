import { UIDLStyleBorder } from '@aitmed/react-uidl'
import { hasLetter } from 'utils'
import { UIDLComponentResolversArgs } from '../..'

/**
 * Converts a style object and normalizes it for html
 * @param { object } styleObj - Style object
 * 1) no border / no borderRadius/
 * 2) borderBottom / solid / no borderRadius/
 * 3) borderAll / solid / has borderRadius
 * 4) borderAll / dashed / no borderRadius
 * 5) no border / has borderRadius
 */
export function resolveBorder({
  component,
  viewport,
}: UIDLComponentResolversArgs) {
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
