import { ResolverOptions, UIDLComponent } from '../types'

/**
 * Attaches appropriate children to the component
 * @param { function } parseComponent - UIDL component parser + renderer
 */
function resolveChildren(
  parseComponent: (node: UIDLComponent) => React.ReactNode | JSX.Element,
) {
  return function ({ node }: ResolverOptions) {
    if (node?.children || node?.text) {
      // @ts-ignore
      node.children = Array.isArray(node.children)
        ? node.children.map((child) => parseComponent(child) || null)
        : node.text
      if ('text' in node) {
        delete node['text']
      }
    }
  }
}

export default resolveChildren
