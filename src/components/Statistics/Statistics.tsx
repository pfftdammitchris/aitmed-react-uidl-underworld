import React from 'react'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import { UIDLComponent } from '@aitmed/react-uidl'
import { useImmer } from 'use-immer'
import { log } from 'utils'

export interface StatisticsProps {
  page?: any
}

export interface PageStatistics {
  components: Record<string, UIDLComponent>
  componentIds: string[]
  functions: Record<string, string[]>
  assets: Record<string, string[]>
  types: Record<string, string[]>
}

const StyledRoot = styled(Typography)``

const initialStats = {
  pageName: '',
  components: {},
  componentIds: [],
  assets: {},
  functions: {},
  types: {},
}

function Statistics({ page }: StatisticsProps) {
  const [stats, setStats] = useImmer(initialStats)

  function extract(components) {
    if (Array.isArray(components)) {
      setStats((draft) => {
        components.forEach((component) => {
          const { componentId, resource, path, onClick, onHover, type } = component
          draft.components[componentId] = component
          if (!draft['componentIds'].includes(componentId)) {
            draft.componentIds.push(componentId)
          }

          if (resource || path) {
            if (!(draft.assets[componentId])) {
              draft.assets[componentId] = {}
              if (resource) draft.assets[]
            } else {
              if (resource) 
            }
          }

          if (!(draft.assets[componentId])) {
            
          }
        })
      })
    }
  }

  React.useEffect(() => {
    function getComponentStats(
      components: UIDLComponent[] = [],
    ): typeof initialStats {
      return components.reduce(
        (acc: any, component: any) => {
          const {
            type,
            style,
            componentId = '',
            children,
            path,
            onClick,
            onHover,
          } = component

          // Component stats
          if (!acc.components.types[type]) acc.components.types[type] = []
          acc.components.types[type].push(componentId)
          acc.components.ids.push(componentId)
          acc.components.nodes[componentId] = component

          if (onClick) {
            acc.functions[componentId] = {
              type: 'onClick',
              name: onClick,
            }
          }
          if (onHover) {
            acc.functions[componentId] = {
              type: 'onHover',
              name: onHover,
            }
          }
          if (path) {
            if (!acc.assets.paths[componentId]) {
              acc.assets.paths[componentId] = {}
            }
            acc.assets.paths[componentId].path = path
          }

          if (Array.isArray(children) && children.length) {
            return { ...acc, ...getComponentStats(children) }
          }

          return acc
        },
        { ...initialStats },
      )
    }
    if (page) {
      if (Array.isArray(page.components && page.components.length)) {
        // @ts-ignore
        setStats({
          pageName: page.pageName,
          ...getComponentStats(page.commponents),
        })
      }
    }
    // eslint-disable-next-line
  }, [page])

  log({ msg: 'Page statistics:', color: 'magenta', data: stats })
  if (!page) return null

  return (
    <StyledRoot>
      <p>dfdsfds</p>
    </StyledRoot>
  )
}

export default React.memo(Statistics)
