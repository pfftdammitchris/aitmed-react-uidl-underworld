import { getViewportRatio, hasDecimal, hasLetter } from '../utils/common'
import { ResolverOptions } from '../types'

/**
 * Computes a UIDL component's attributes and finalizes the style object to
 *    present a more accurate positioning
 * @param { ResolverOptions } options.node - Mutable UIDL component
 * @param { object } options.css - Parsed base CSS object
 * @param { string } options.tagName - UIDL component's html tag name
 */
function resolvePositionAttrs({
  node,
  viewportWidth,
  viewportHeight,
}: ResolverOptions) {
  if (node?.style) {
    const topExists = 'top' in node.style
    const leftExists = 'left' in node.style

    if (topExists || leftExists) {
      const { top, left } = node.style
      if (typeof top === 'string' && top !== '0') {
        if (!hasLetter(top))
          node.style.top = getViewportRatio(viewportHeight, top) + 'px'
      } else {
        if (hasDecimal(top))
          node.style.top = getViewportRatio(viewportHeight, top) + 'px'
      }
      if (typeof left === 'string' && left !== '0') {
        if (!hasLetter(left))
          node.style.left = getViewportRatio(viewportWidth, left) + 'px'
      } else {
        if (hasDecimal(left))
          node.style.left = getViewportRatio(viewportWidth, left) + 'px'
      }
    }
  }
}

export default resolvePositionAttrs
