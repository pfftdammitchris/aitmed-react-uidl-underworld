import { ResolverOptions } from '../types'

/**
 * Transformers their className aliases to actual classNames if globally found
 * @param { UIDLComponent } options.node - Mutable UIDL component
 * @param { object } options.css - Parsed base CSS object
 * @param { string } options.tagName - UIDL component's html tag name
 */
function resolveClassNames({ node, css }: ResolverOptions) {
  if (node) {
    if (node.className && css && node.className in css) {
      Object.assign(node.style, css[node.className])
      delete node['className']
    }
    if (Array.isArray(node.classNames)) {
      node.classNames.forEach((className: string) => {
        if (className && css && className in css) {
          Object.assign(node.style, css[className])
        }
      })
      delete node['classNames']
    }
  }
}

export default resolveClassNames
