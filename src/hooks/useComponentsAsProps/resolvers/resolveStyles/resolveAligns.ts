import { log } from 'utils'
import { UIDLComponentStyleResolverArgs } from './resolveStyles'

function attachTextAlign(style: any, textAlign: string) {
  if (textAlign) {
    if (textAlign === 'centerX') {
      style['textAlign'] = 'center'
    } else if (textAlign === 'centerY') {
      style['display'] = 'flex'
      style['alignItems'] = 'center'
      delete style['textAlign']
    } else {
      switch (textAlign) {
        case 'left':
        case 'center':
        case 'right':
          if (style.textAlign !== textAlign) {
            style['textAlign'] = textAlign
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

/**
 * Resolves an object's "align" property and attaches corresponding html attributes
 * @param { object } style - Style object
 */
function resolveAligns({ style }: UIDLComponentStyleResolverArgs) {
  if (style['textAlign']) {
    const { textAlign } = style
    if (typeof textAlign === 'string') {
      attachTextAlign(style, textAlign)
    } else if (textAlign && typeof textAlign === 'object') {
      const { x, y } = textAlign
      if (typeof x !== 'undefined') {
        attachTextAlign(style, x)
      }
      if (typeof y !== 'undefined') {
        attachTextAlign(style, y)
      }
    }
  }
  if (style['align']) {
    const align = style.align
    if (align === 'centerX') {
      style.display = 'flex'
      style.justifyContent = 'center'
    } else if (align === 'centerY') {
      style.display = 'flex'
      style.alignItems = 'center'
    }
    delete style['align']
  }
}

export default resolveAligns
