import React from 'react'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import { useImmer } from 'use-immer'

export interface StatisticsProps {
  parsedYml?: any
}

const StyledRoot = styled(Typography)`
  border: 1px solid red;
`

const initialStats = {
  components: {
    types: {},
    ids: [],
    nodes: {},
  },
  assets: {
    paths: [],
  },
  functions: [],
}

function getStats(statistics) {
  if (statistics) {
    if (Array.isArray(statistics.components)) {
      return statistics.components.reduce((component) => {
        const {
          type,
          style,
          componentId,
          children,
          path,
          onClick,
          onHover,
        } = component
        //
      }, {})
    }
  }
}

function Statistics({ parsedYml }: StatisticsProps) {
  const [stats, setStats] = useImmer(initialStats)
  if (!parsedYml) return null

  return (
    <StyledRoot>
      <p>dfdsfds</p>
    </StyledRoot>
  )
}

export default Statistics
