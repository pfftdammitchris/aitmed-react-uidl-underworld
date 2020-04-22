import { hasLetter } from 'utils'
import { UIDLComponentStyleResolverArgs } from './resolveStyles'

/**
 * Normalizes any font attributes to be read for web pages
 * @param { object } options
 * @param { object } options.style - Style object
 */
function resolveFontAttrs({ style }: UIDLComponentStyleResolverArgs) {
  const { fontSize, fontStyle } = style
  // '10' --> 10
  if (typeof fontSize === 'string' && !hasLetter(fontSize)) {
    style['fontSize'] = Number(fontSize)
  }
  if (fontStyle === 'bold') {
    style['fontWeight'] = 'bold'
    delete style['fontStyle']
  }
}

export default resolveFontAttrs
