import { getViewportRatio, hasDecimal, hasLetter } from 'utils'
import { UIDLComponentStyleResolverArgs } from './resolveStyles'

/**
 * Computes a UIDL component's attributes and finalizes the style object to
 *    present a more accurate positioning
 * @param { object } style - Style object
 * @param { ViewportOptions } viewport
 */
function resolvePositionAttrs({
  style,
  viewport: { viewportWidth, viewportHeight },
}: UIDLComponentStyleResolverArgs) {
  const topExists = 'top' in style
  const leftExists = 'left' in style

  if (topExists || leftExists) {
    const { top, left } = style
    if (typeof top === 'string' && top !== '0') {
      if (!hasLetter(top))
        style.top = getViewportRatio(viewportHeight, top) + 'px'
    } else {
      if (hasDecimal(top))
        style.top = getViewportRatio(viewportHeight, top) + 'px'
    }
    if (typeof left === 'string' && left !== '0') {
      if (!hasLetter(left))
        style.left = getViewportRatio(viewportWidth, left) + 'px'
    } else {
      if (hasDecimal(left))
        style.left = getViewportRatio(viewportWidth, left) + 'px'
    }
  }
}

export default resolvePositionAttrs
