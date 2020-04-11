import React from 'react'
import { useImmer } from 'use-immer'
import get from 'lodash.get'
import { UIDLComponent } from '@aitmed/react-uidl'
import { log } from 'utils'

export interface UseUIDLOptions {
  parsedYml?: any
}

export interface UseUIDLState {
  componentPaths: { [componentId: string]: string }
}

const initialState: UseUIDLState = {
  componentPaths: {},
}

function useUIDL({ parsedYml }: UseUIDLOptions = {}) {
  const [state, setState] = useImmer(initialState)

  React.useEffect(() => {
    function collectPaths(
      currentPath: string,
      components: UIDLComponent[],
      paths?: Record<string, string>,
    ) {
      if (Array.isArray(components)) {
        let path
        for (let index = 0; index < components.length; index++) {
          const component = components[index]
          path = `${currentPath}[${index}]`
          if (!paths) paths = {}
          paths[component.componentId as string] = path
          if (Array.isArray(component.children)) {
            collectPaths(`${path}.children`, component.children, paths)
          }
        }
      }
      return paths
    }

    if (parsedYml?.components) {
      setState((draft) => {
        const paths = collectPaths('components', parsedYml.components) || {}
        if (paths) draft.componentPaths = paths
      })
    }
  }, [parsedYml, setState])

  // React.useEffect(() => {
  //   function collectPaths(
  //     currentPath: string,
  //     components: UIDLComponent[],
  //     paths?: Record<string, string>,
  //   ) {
  //     if (Array.isArray(components)) {
  //       let path
  //       for (let index = 0; index < components.length; index++) {
  //         const component = components[index]
  //         path = `${currentPath}[${index}]`
  //         if (!paths) paths = {}
  //         paths[component.componentId as string] = path
  //         if (Array.isArray(component.children)) {
  //           collectPaths(`${path}.children`, component.children, paths)
  //         }
  //       }
  //     }
  //     return paths
  //   }

  //   if (parsedYml?.components) {
  //     const paths = collectPaths('components', parsedYml.components)
  //     console.log(paths)
  //   }
  // }, [parsedYml, state.page])

  return {
    ...state,
    setState,
  }
}

export default useUIDL
