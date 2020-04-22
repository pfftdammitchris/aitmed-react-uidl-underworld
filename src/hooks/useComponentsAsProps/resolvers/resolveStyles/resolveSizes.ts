import { getViewportRatio, hasLetter } from 'utils'
import { UIDLComponentStyleResolverArgs } from './resolveStyles'

/**
 * Computes a UIDL component's attributes and finalizes the style object to
 *    present a more accurate sizing
 * @param { object } options.style - UIDL component
 * @param { ViewportOptions } options.viewport - Object describing the viewport size
 */
function resolveSizeAttrs({
  style,
  viewport: { viewportWidth, viewportHeight },
}: UIDLComponentStyleResolverArgs) {
  const { width, height } = style
  // Check if it has any units. It could possibly be implicity converted. ex: '50' --> 50
  if (typeof width === 'string' && !hasLetter(width)) {
    style['width'] = getViewportRatio(viewportWidth, width) + 'px'
  } else if (typeof width === 'number' && width !== 0) {
    style['width'] = getViewportRatio(viewportWidth, width) + 'px'
  }
  if (typeof height === 'string' && !hasLetter(height)) {
    style['height'] = getViewportRatio(viewportHeight, height) + 'px'
  } else if (typeof height === 'number' && height !== 0) {
    style['height'] = getViewportRatio(viewportHeight, height) + 'px'
  }
}

export default resolveSizeAttrs
