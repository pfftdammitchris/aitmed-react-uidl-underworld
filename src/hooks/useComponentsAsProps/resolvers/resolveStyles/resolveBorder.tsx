import { UIDLStyleBorder } from '@aitmed/react-uidl'
import { hasLetter } from 'utils'
import { UIDLComponentStyleResolverArgs } from './resolveStyles'

/**
 * Converts a style object and normalizes it for html
 * @param { object } style - Style object
 * 1) no border / no borderRadius/
 * 2) borderBottom / solid / no borderRadius/
 * 3) borderAll / solid / has borderRadius
 * 4) borderAll / dashed / no borderRadius
 * 5) no border / has borderRadius
 */
function resolveBorderAttrs({ style }: UIDLComponentStyleResolverArgs) {
  const border: UIDLStyleBorder = style?.border
  if (border == '0') {
    style['borderStyle'] = 'none'
    delete style['border']
  }
  let borderStyle, color, width, line
  if (border && typeof border === 'object') {
    borderStyle = border.style
    color = border.color
    width = border.width
    line = border.line
  }
  if (color) style.borderColor = color
  if (line) style.borderStyle = line
  if (width) style.borderWidth = width
  if (borderStyle == '1') {
    style['borderStyle'] = 'none'
    style['borderRadius'] = 0
  } else if (borderStyle == '2') {
    style['borderRadius'] = 0
    style['borderStyle'] = 'none'
    style['borderBottomStyle'] = 'solid'
  } else if (borderStyle == '3') {
    style['borderStyle'] = 'solid'
    if (!width) style['borderWidth'] = 'thin'
  } else if (borderStyle == '4') {
    style['borderStyle'] = 'dashed'
    if (!width) style['borderWidth'] = 'thin'
    style['borderRadius'] = 0
  } else if (borderStyle == '5') {
    style['borderStyle'] = 'none'
  }
  if (typeof style.borderRadius === 'string') {
    if (!hasLetter(style.borderRadius)) {
      style['borderRadius'] = Number(style.borderRadius)
    }
  }
  if (style.borderWidth && typeof style.borderWidth === 'string') {
    if (!hasLetter(style.borderWidth)) {
      style.borderWidth = `${style.borderWidth}px`
    }
  }
  delete style['border']
}

export default resolveBorderAttrs
