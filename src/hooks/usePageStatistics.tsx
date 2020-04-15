import React from 'react'
import omit from 'lodash.omit'
import { UIDLComponent, UIDLPage } from '@aitmed/react-uidl'
import { Draft } from 'immer'
import { useImmer } from 'use-immer'

const initialState = {
  ids: {
    paths: [],
    resources: [],
    components: [],
    componentTypes: [],
    functions: [],
    classNames: [],
    texts: [],
    dataModels: [],
    dataIds: [],
    placeholders: [],
  },
  paths: {},
  resources: {},
  components: {},
  componentTypes: {},
  functions: {},
  classNames: {},
  texts: {},
  dataIds: {},
  placeholders: {},
}

function traverseComponents(
  components: UIDLComponent[] = [],
  callback: (component: UIDLComponent) => any,
) {
  components.forEach((component: UIDLComponent) => {
    if (component) {
      callback(omit(component, ['children']))
      if (Array.isArray(component.children)) {
        traverseComponents(component.children, callback)
      }
    }
  })
}

function usePageStatistics({ parsedYml }: { parsedYml: null | UIDLPage }) {
  const [state, setState] = useImmer(initialState)

  function resetDraft(draft: Draft<typeof initialState>) {
    // Reset draft back to initial state before updating statistics
    for (let key in initialState) {
      if (key === 'ids') {
        for (let idKey in initialState.ids) {
          // @ts-ignore
          draft.ids[idKey] = []
        }
      } else {
        // @ts-ignore
        draft[key] = {}
      }
    }
  }

  React.useEffect(() => {
    if (parsedYml) {
      if (Array.isArray(parsedYml.components)) {
        setState((draft) => {
          // Reset draft back to initial state before updating statistics
          resetDraft(draft)

          traverseComponents(
            parsedYml.components,
            (component: UIDLComponent) => {
              if (component) {
                const {
                  className,
                  classNames,
                  componentId,
                  contentType,
                  dataModel,
                  dataId,
                  onClick,
                  onHover,
                  placeholder,
                  path,
                  resource,
                  style,
                  type,
                } = component

                // Classnames
                if (className) {
                  // @ts-ignore
                  draft.ids.classNames.push(className)
                  // @ts-ignore
                  draft.classNames[className] = component
                }
                // Classnames
                if (Array.isArray(classNames)) {
                  classNames.forEach((cn) => {
                    // @ts-ignore
                    draft.ids.classNames.push(cn)
                    // @ts-ignore
                    draft.classNames[cn] = component
                  })
                }
                // Component ids
                if (componentId) {
                  // @ts-ignore
                  if (!draft.ids.components.includes(componentId)) {
                    // @ts-ignore
                    draft.ids.components.push(componentId)
                  }
                  // @ts-ignore
                  draft.components[componentId] = component
                }
                // Component types
                if (type) {
                  // @ts-ignore
                  if (!draft.ids.componentTypes.includes(type)) {
                    // @ts-ignore
                    draft.ids.componentTypes.push(type)
                  }
                  // @ts-ignore
                  if (!draft.componentTypes[type]) {
                    // @ts-ignore
                    draft.componentTypes[type] = {}
                  }
                  // @ts-ignore
                  draft.componentTypes[type][componentId] = component
                }
                // Content types
                if (contentType) {
                  //
                }
                // Data models
                if (dataModel) {
                  // @ts-ignore
                  if (!draft.ids.dataModels.includes(dataModel)) {
                    // @ts-ignore
                    draft.ids.dataModels.push(dataModel)
                  }
                }
                if (dataId) {
                  // @ts-ignore
                  draft.ids.dataIds.push(dataId)
                  // @ts-ignore
                  draft.dataIds[dataId] = component
                }
                // Functions
                if (onClick) {
                  // @ts-ignore
                  draft.ids.functions.push(onClick)
                  // @ts-ignore
                  draft.functions[onClick] = component
                }
                if (onHover) {
                  // @ts-ignore
                  draft.ids.functions.push(onHover)
                  // @ts-ignore
                  draft.functions[onHover] = component
                }
                // Placeholders
                if (placeholder) {
                  // @ts-ignore
                  draft.ids.placeholders.push(placeholder)
                  // @ts-ignore
                  draft.placeholders[placeholder] = component
                }
                // Assets
                if (path) {
                  // @ts-ignore
                  draft.ids.paths.push(path)
                  // @ts-ignore
                  draft.paths[path] = component
                }
                if (resource) {
                  // @ts-ignore
                  draft.ids.resources.push(resource)
                  // @ts-ignore
                  draft.resources[resource] = component
                }
              }
            },
          )
        })
      } else {
        setState((draft) => {
          resetDraft(draft)
        })
      }
    }
    // eslint-disable-next-line
  }, [parsedYml])

  return {
    ...state,
  }
}

export default usePageStatistics
