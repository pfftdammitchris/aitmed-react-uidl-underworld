import resolveAligns from './resolveAligns'
import resolvePositionAttrs from './resolvePositionAttrs'
import resolveSizeAttrs from './resolveSizeAttrs'
import resolveClassNames from './resolveClassNames'
import { callAll } from '../../../../utils/common'
import {
  normalizeStyleAttrs,
  normalizeBorderAttrs,
  normalizeFontAttrs,
  normalizeColorAttrs,
} from '../../../../utils/normalizers'
import { FinalizedUIDLComponent, ResolverOptions } from '../../../../types'
import { UIDLComponentResolversArgs } from '../..'

/**
 * Returns true if the styles represent full screen
 * @param { UIDLComponent } node - Mutable UIDL component
 */
function isFullScreen(node: FinalizedUIDLComponent) {
  if (typeof node !== 'string' && style) {
    return (
      style.top == '0' &&
      style.left == '0' &&
      style.width == '1' &&
      style.height == '1'
    )
  }
  return false
}

/** A function that is used by resolveStyles to modify the style object of
 *  a UIDL component
 * @param { function } fn - Higher order function (style modifier)
 */
export function normalizeStyle(fn: Function) {
  return ({ node }: ResolverOptions) => node && fn(style)
}
/**
 * Takes a UIDL component and finalizes its style object to be worked with in the client side layer
 * @param { UIDLComponent } node - Mutable UIDL component
 */
function resolveStyles({ component, viewport }: UIDLComponentResolversArgs) {
  const styleResolvers = [
    normalizeStyle(normalizeBorderAttrs),
    normalizeStyle(normalizeFontAttrs),
    normalizeStyle(normalizeColorAttrs),
    resolveAligns,
    resolveClassNames,
  ]
  if (style) {
    style.position = 'absolute'
    if (isFullScreen(node)) {
      style.width = viewport.viewportWidth
      style.height = viewport.viewportHeight
      style.top = 0
      style.right = 0
      style.bottom = 0
      style.left = 0
    } else {
      styleResolvers.push(resolvePositionAttrs, resolveSizeAttrs)
    }
    callAll(...styleResolvers)({
      node,
      css,
      tagName,
      viewportWidth,
      viewportHeight,
    })
    style = normalizeStyleAttrs(style, {
      viewportWidth,
      viewportHeight,
    })
  }
}

export default resolveStyles
