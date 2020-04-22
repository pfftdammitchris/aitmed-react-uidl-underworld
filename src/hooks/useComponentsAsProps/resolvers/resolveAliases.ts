import { log } from '../utils/common'
import { ResolverOptions } from '../types'

export function getInputType(contentType: string) {
  switch (contentType) {
    case 'email':
    case 'number':
    case 'password':
    case 'tel':
    case 'text':
      return contentType
    case 'phoneNumber':
      return 'tel'
    default:
      return null
  }
}

/**
 * Renames some keywords to align more with html/css/etc
 * ex: resource --> src (for images)
 * @param { object } node - A mutable object
 */
export function resolveAliases({ createAssetUrl, node }: ResolverOptions) {
  if (node) {
    // Input (textfield) components
    if (node['contentType']) {
      const inputType = getInputType(node.contentType)
      if (!inputType) {
        log({
          msg:
            'None of the content (input) types matched. Perhaps it needs to be ' +
            'supported? UIDL content type: ' +
            node.contentType,
          color: '#bd1972',
        })
      } else {
        node['inputType'] = inputType
      }
      delete node['contentType']
    }
    // Image/Button components
    if (node['path']) {
      if (createAssetUrl) {
        node.src = createAssetUrl(node.path)
      }
      delete node['path']
    }
    if ('resource' in node) {
      node['src'] = node.resource
      delete node['resource']
    }
    if ('options' in node) {
      if (Array.isArray(node['options'])) {
        node.selectOptions = node.options.map(
          (option: string, index: number) => {
            if (typeof option === 'string') {
              return {
                index,
                value: option,
                label: option,
              }
            }
            return option
          },
        )
        delete node['options']
      } else {
        log({
          msg: `Options is not an array. ${
            node.componentId ? 'Component ID: ' + node.componentId : ''
          }`,
          data: node.options,
        })
      }
    }
  }
}

export default resolveAliases
