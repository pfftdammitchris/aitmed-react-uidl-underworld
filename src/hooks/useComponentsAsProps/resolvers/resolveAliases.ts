import { log } from 'utils'
import { UIDLComponentResolversArgs } from '..'

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
 * @param { object } options
 * @param { UIDLComponent } options.component - UIDL component
 * @param { ViewportOptions } options.viewport - Object describing the viewport size
 * @param { function } options.createAssetUrl - Creates an asset url using path
 */
export function resolveAliases({
  component,
  createAssetUrl,
}: UIDLComponentResolversArgs) {
  if (component) {
    // Input (textfield) components
    if (component['contentType']) {
      const inputType = getInputType(component.contentType)
      if (!inputType) {
        log({
          msg:
            'None of the content (input) types matched. Perhaps it needs to be ' +
            'supported? UIDL content type: ' +
            component.contentType,
          color: '#bd1972',
        })
      } else {
        component['inputType'] = inputType
      }
      delete component['contentType']
    }
    // Image/Button components
    if (component.path) {
      component['src'] = createAssetUrl(component.path)
      delete component['path']
    }
    if (component.resource) {
      component['src'] = component.resource
      delete component['resource']
    }
    if (Array.isArray(component.options)) {
      component['selectOptions'] = component.options.map(
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
      delete component['options']
    }
  }
}

export default resolveAliases
