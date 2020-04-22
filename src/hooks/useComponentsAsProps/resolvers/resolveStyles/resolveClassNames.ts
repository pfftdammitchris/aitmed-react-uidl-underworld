import { UIDLComponentStyleResolverArgs } from './resolveStyles'

/**
 * Transformers their className aliases to actual classNames if globally found
 * The classnames are not actually "css classnames", they are style objects that we merge
 * into components with
 * @param { object } options
 * @param { object } options.style - UIDL style object
 * @param { object } options.css - Global style object from UIDL base css
 */
function resolveClassNames({ style, css }: UIDLComponentStyleResolverArgs) {
  if (css) {
    if (style.className && css[style.className]) {
      Object.assign(style, css[style.className])
      delete style['className']
    }
    if (Array.isArray(style.classNames)) {
      style.classNames.forEach((className: string) => {
        if (className && css[className]) {
          Object.assign(style, css[className])
        }
      })
      delete style['classNames']
    }
  }
}

export default resolveClassNames
