import { getViewportRatio, hasLetter } from '../utils/common'
import { ResolverOptions } from '../types'

/**
 * Computes a UIDL component's attributes and finalizes the style object to
 *    present a more accurate sizing
 * @param { ResolverOptions } options.node - Mutable UIDL component
 * @param { object } options.css - Parsed base CSS object
 * @param { string } options.tagName - UIDL component's html tag name
 */
function resolveSizeAttrs({
  node,
  viewportWidth,
  viewportHeight,
}: ResolverOptions) {
  if (node?.style) {
    const { width, height } = node.style
    // Check if it has any units. It could possibly be implicity converted. ex: '50' --> 50
    if (typeof width === 'string' && !hasLetter(width)) {
      node.style.width = getViewportRatio(viewportWidth, width) + 'px'
    } else if (typeof width === 'number' && width !== 0) {
      node.style.width = getViewportRatio(viewportWidth, width) + 'px'
    }
    if (typeof height === 'string' && !hasLetter(height)) {
      node.style.height = getViewportRatio(viewportHeight, height) + 'px'
    } else if (typeof height === 'number' && height !== 0) {
      node.style.height = getViewportRatio(viewportHeight, height) + 'px'
    }
  }
}

export default resolveSizeAttrs
