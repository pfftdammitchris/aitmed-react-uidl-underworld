import { log } from 'utils'
import { UIDLComponentResolversArgs } from '../..'

function attachTextAlign(styleObj: any, textAlign: string) {
  if (textAlign) {
    if (textAlign === 'centerX') {
      styleObj.textAlign = 'center'
    } else if (textAlign === 'centerY') {
      styleObj.display = 'flex'
      styleObj.alignItems = 'center'
      delete styleObj['textAlign']
    } else {
      switch (textAlign) {
        case 'left':
        case 'center':
        case 'right':
          if (styleObj['textAlign'] !== textAlign) {
            styleObj.textAlign = textAlign
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
 * Resolves a UIDL component's "align" property and attaches corresponding html attributes
 * @param { UIDLComponent } options.node - Mutable UIDL component
 */
function resolveAligns({ component, viewport }: UIDLComponentResolversArgs) {
  const styleObj = component?.style
  if (styleObj) {
    if ('textAlign' in styleObj) {
      const { textAlign } = styleObj
      if (typeof textAlign === 'string') {
        attachTextAlign(styleObj, textAlign)
      } else if (textAlign && typeof textAlign === 'object') {
        const { x, y } = textAlign
        if (typeof x !== 'undefined') {
          attachTextAlign(styleObj, x)
        }
        if (typeof y !== 'undefined') {
          attachTextAlign(styleObj, y)
        }
      }
    }
    if ('align' in styleObj) {
      const align = styleObj.align
      if (align === 'centerX') {
        styleObj.display = 'flex'
        styleObj.justifyContent = 'center'
      } else if (align === 'centerY') {
        styleObj.display = 'flex'
        styleObj.alignItems = 'center'
      }
      delete styleObj['align']
    }
  }
}

export default resolveAligns
