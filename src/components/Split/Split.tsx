import React from 'react'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'

export interface SplitProps {
  children: React.ReactNode
}

const StyledColumn = styled(Grid)`
  position: relative;
  width: 100%;
  height: 100%;
  border: 2px solid magenta;
  overflow-x: hidden;
  .borderRight {
    border-right: 1px solid #178c8c;
  }
`

function Split({ left, right }: SplitProps) {
  return (
    <Grid xs={12} sm={6} md={6} lg={6} xl={6} container>
      {left}
      {right}
    </Grid>
  )
}

export default Split
