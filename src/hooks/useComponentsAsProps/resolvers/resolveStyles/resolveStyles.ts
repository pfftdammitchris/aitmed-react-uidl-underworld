import { FinalizedUIDLComponent, ViewportOptions } from '@aitmed/react-uidl'
import { callAll } from 'utils'
import { UIDLComponentResolversArgs } from '../..'
import resolveAligns from './resolveAligns'
import resolveBorder from './resolveBorder'
import resolveColors from './resolveColors'
import resolveFont from './resolveFont'
import resolvePosition from './resolvePosition'
import resolveSizes from './resolveSizes'
import resolveClassNames from './resolveClassNames'

export interface UIDLComponentStyleResolverArgs {
  style: any
  css: any
  viewport: ViewportOptions
}

/**
 * Returns true if the styles represent full screen
 * @param { UIDLComponent } component - UIDL component
 */
function isFullScreen(component: FinalizedUIDLComponent) {
  if (typeof component !== 'string' && component.style) {
    return (
      component.style.top == '0' &&
      component.style.left == '0' &&
      component.style.width == '1' &&
      component.style.height == '1'
    )
  }
  return false
}

/**
 * Recurses throughout an object, converting any values that need to be explicitly converted
 *  for html to render correctly
 * @param { object } options
 * @param { UIDLComponent } options.component - UIDL component
 * @param { UIDLComponentResolversArgs } options.viewport - Object describing the viewport size
 */
export function normalizeStyleAttrs(options: UIDLComponentResolversArgs) {
  const { component, viewport, ...rest } = options

  const keys = Object.keys(component.style)
  const normalize = callAll(
    resolveAligns,
    resolveBorder,
    resolveColors,
    resolveFont,
    resolvePosition,
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
  normalize(options)
  return component.style
}

/** A function that is used by resolveStyles to modify the style object of
 *  a UIDL component
 * @param { function } fn - Higher order function (style modifier)
 */
export function normalizeStyle(fn: Function) {
  return (options: UIDLComponentResolversArgs) => options && fn(options)
}
/**
 * Takes a UIDL component and finalizes its style object to be worked with in the client side layer
 * @param { object } options
 * @param { UIDLComponent } options.component - UIDL component
 * @param { ViewportOptions } options.viewport - Object describing the viewport size
 */
function resolveStyles(options: UIDLComponentResolversArgs) {
  const { component, viewport, css } = options

  if (component.style) {
    const resolvers = [
      // Put resolveClassNames at the top to merge the extra styles in first
      resolveClassNames,
      resolveAligns,
      resolveBorder,
      resolveColors,
      resolveFont,
    ]

    // All components follow the UIDL positioning logic
    component.style.position = 'absolute'

    if (isFullScreen(component)) {
      component.style.width = viewport.viewportWidth
      component.style.height = viewport.viewportHeight
      component.style.top = 0
      component.style.right = 0
      component.style.bottom = 0
      component.style.left = 0
    } else {
      resolvers.push(resolvePosition, resolveSizes)
    }

    callAll(...resolvers)({
      style: component.style,
      css,
      viewport,
    })
  }
}

export default resolveStyles
