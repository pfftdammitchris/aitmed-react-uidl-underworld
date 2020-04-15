import React from 'react'
import omit from 'lodash.omit'
import { UIDLComponent, UIDLPage } from '@aitmed/react-uidl'
import { Draft, useImmer } from 'use-immer'
import { log } from 'utils'

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
                console.log(component)

                // Classnames
                if (className) {
                  draft.ids.classNames.push(className)
                  draft.classNames[className] = component
                }
                // Classnames
                if (Array.isArray(classNames)) {
                  classNames.forEach((cn) => {
                    draft.ids.classNames.push(cn)
                    draft.classNames[cn] = component
                  })
                }
                // Component ids
                if (componentId) {
                  draft.ids.components.push(componentId)
                  draft.components[componentId] = component
                }
                // Component types
                if (type) {
                  draft.ids.componentTypes.push(type)
                  if (!draft.componentTypes[type]) {
                    draft.componentTypes[type] = {}
                  }
                  draft.componentTypes[type][componentId] = component
                }
                // Content types
                if (contentType) {
                  //
                }
                // Data models
                if (dataModel) {
                  if (!draft.ids.dataModels.includes(dataModel)) {
                    draft.ids.dataModels.push(dataModel)
                  }
                }
                if (dataId) {
                  draft.ids.dataIds.push(dataId)
                  draft.dataIds[dataId] = component
                }
                // Functions
                if (onClick) {
                  draft.ids.functions.push(onClick)
                  draft.functions[onClick] = component
                }
                if (onHover) {
                  draft.ids.functions.push(onHover)
                  draft.functions[onHover] = component
                }
                // Placeholders
                if (placeholder) {
                  draft.ids.placeholders.push(placeholder)
                  draft.placeholders[placeholder] = component
                }
                // Assets
                if (path) {
                  draft.ids.paths.push(path)
                  draft.paths[path] = component
                }
                if (resource) {
                  draft.ids.resources.push(resource)
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
