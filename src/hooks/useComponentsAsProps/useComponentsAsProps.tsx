import React from 'react'
import omit from 'lodash.omit'
import { UIDLComponent, ViewportOptions } from '@aitmed/react-uidl'
import { useImmer } from 'use-immer'
import resolveAliases from './resolvers/resolveAliases'
import resolveChildren from './resolvers/resolveChildren'
import resolveStyles from './resolvers/resolveStyles'
import resolveTagName from './resolvers/resolveTagName'

export interface UseComponentsOptions {
  components: UIDLComponent[]
  viewport: ViewportOptions
}

export interface UIDLComponentResolversArgs {
  component: UIDLComponent
  viewport: ViewportOptions
}

export type UIDLComponentResolver = (options: UIDLComponentResolversArgs) => any

function useComponents({
  components: componentsProp = [],
  viewport,
}: UseComponentsOptions) {
  const [state, setState] = useImmer({ components: componentsProp })

  function callAll(...fns: Function[]) {
    return (args: any) => fns.forEach((fn) => fn && fn(args))
  }

  function resolveComponent(component: UIDLComponent, resolver) {
    resolver(component)
    if (component.children) {
      component.children.map((child: UIDLComponent) =>
        resolveComponent(child, resolver),
      )
    }
  }

  React.useEffect(() => {
    const resolvers = callAll(
      resolveAliases,
      resolveChildren,
      resolveStyles,
      resolveTagName,
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
