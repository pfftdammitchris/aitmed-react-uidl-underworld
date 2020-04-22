import { log } from 'utils'
import { UIDLComponentResolversArgs } from '..'

/**
 * Supported tag names (anything not listed is assumed to be a new addition which
 *     needs to be added to be supported)
 * @param { string } type - UIDL component type
 */
export function getTagName(type: string) {
  switch (type) {
    case 'button':
      return 'button'
    case 'dateSelect':
      return 'input.date'
    case 'divider':
      return 'hr'
    case 'header':
      return 'div'
    case 'image':
      return 'img'
    case 'label':
      return 'label'
    case 'searchBar':
      return 'input.search'
    case 'select':
      return 'select'
    case 'textField':
      return 'input'
    case 'footer':
    case 'list':
    case 'scrollView':
      log({
        msg: `Encountered type: ${type}. Reminder: Handle ${type} uidl components officially`,
        color: 'rgba(0,0,0,0.7)',
      })
      return 'div'
    case 'view':
      return 'div'
    default:
      return null
  }
}

/**
 * Takes a UIDL component and resolves its html tag name by evaluating its "type" property
 * @param { object } options
 * @param { UIDLComponent } options.component - UIDL component
 * @param { ViewportOptions } options.viewport - Object describing the viewport size
 */
export function resolveTagName({ component }: UIDLComponentResolversArgs) {
  const tagName = getTagName(component.type)
  if (!tagName) {
    log({
      msg:
        'None of the component types matched. Perhaps it needs to be ' +
        'supported? UIDL component type: ' +
        component.type,
      color: 'red',
    })
  } else {
    component.type = tagName
  }
}

export default resolveTagName
