import React from 'react'
import styled from 'styled-components'
import InputLabel from '@material-ui/core/InputLabel'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

export interface ComponentBoardPanelProps {
  label?: React.ReactNode
  children?: React.ReactNode
  inline?: boolean
}

const StyledBoardLabel = styled(InputLabel)``

const StyledBoardBody = styled.div``

function ComponentBoardPanel({
  label,
  children,
  inline,
}: ComponentBoardPanelProps) {
  return (
    <Card elevation={0}>
      <CardContent
        style={{ display: inline ? 'flex' : 'block', alignItems: 'center' }}
      >
        <StyledBoardLabel component="pre">
          <code>{label}</code>
        </StyledBoardLabel>
        {inline && <div style={{ width: 12 }} />}
        <StyledBoardBody>{children}</StyledBoardBody>
      </CardContent>
    </Card>
  )
}

export default ComponentBoardPanel
