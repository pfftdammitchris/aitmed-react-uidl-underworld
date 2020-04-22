import React from 'react'
import { UIDLComponent, ViewportOptions } from '@aitmed/react-uidl'
import { useImmer } from 'use-immer'
import resolveAliases from './resolvers/resolveAliases'
import resolveStyles from './resolvers/resolveStyles'
import resolveTagName from './resolvers/resolveTagName'

export interface UseComponentsOptions {
  baseUrl: string
  components: UIDLComponent[]
  css: any
  viewport: ViewportOptions
}

export interface UIDLComponentResolversArgs {
  component: UIDLComponent & { [key: string]: any }
  viewport: ViewportOptions
  createAssetUrl: (path: string) => string
  css: any
}

export type UIDLComponentResolver = (options: UIDLComponentResolversArgs) => any

function useComponents({
  baseUrl = '',
  components: componentsProp = [],
  css,
  viewport,
}: UseComponentsOptions) {
  const [state, setState] = useImmer({ components: componentsProp })

  function callAll(...fns: Function[]) {
    return (args: any) => fns.forEach((fn) => fn && fn(args))
  }

  function createAssetUrl(path: string) {
    return `${baseUrl}assets/${path}`
  }

  function resolveComponent(
    component: UIDLComponent,
    resolve: (options: UIDLComponentResolversArgs) => void,
  ) {
    resolve({ component, viewport, createAssetUrl, css })
    if (component.children) {
      component.children.map((child: UIDLComponent) =>
        resolveComponent(child, resolve),
      )
    }
  }

  React.useEffect(() => {
    // prettier-ignore
    const resolvers = callAll(
      resolveAliases,
      resolveStyles,
      resolveTagName
    )
    setState((draft) => {
      draft.components.forEach((component: UIDLComponent) => {
        resolveComponent(component, resolvers)
      })
    })

    // eslint-disable-next-line
  }, [componentsProp])

  return {
    ...state,
  }
}

export default useComponents
