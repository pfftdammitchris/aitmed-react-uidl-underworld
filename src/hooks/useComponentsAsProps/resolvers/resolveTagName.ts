import { log } from '../utils/common'
import { ResolverOptions } from '../types'

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
      log({
        msg:
          'Encountered type: footer. Reminder: Handle list uidl components officially',
        color: 'rgba(0,0,0,0.7)',
      })
    case 'list':
      log({
        msg:
          'Encountered type: list. Reminder: Handle list uidl components officially',
        color: 'rgba(0,0,0,0.7)',
      })
    case 'scrollView':
      log({
        msg:
          'Encountered type: scrollView. Reminder: Handle scrollView uidl components officially',
        color: 'rgba(0,0,0,0.7)',
      })
    case 'view':
      return 'div'
    default:
      return null
  }
}

/**
 * Takes a UIDL component and resolves its html tag name by evaluating its "type" property
 * @param { UIDLComponent } options.node - Mutable UIDL component
 * @param { object } options.css - Parsed base CSS object
 * @param { string } options.tagName - UIDL component's html tag name
 */
export function resolveTagName({ node, tagName }: ResolverOptions) {
  if (!tagName) {
    log({
      msg:
        'None of the component types matched. Perhaps it needs to be ' +
        'supported? UIDL component type: ' +
        node?.type,
      color: 'red',
    })
  } else {
    if (node) node.type = tagName
  }
}

export default resolveTagName
