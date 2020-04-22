import { UIDLEndpointConfig } from '../types'

/** Takes a base config and returns a function that takes a path to create URLs for assets
 * @param { UIDLEndpointConfig } config - Base config received from UIDL server
 */
function prepareAssetUrl(config: null | UIDLEndpointConfig) {
  return (path: string) => {
    return `${config?.baseUrl}assets/${path}`
  }
}

export default prepareAssetUrl
