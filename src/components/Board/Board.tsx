import React from 'react'
import styled from 'styled-components'
import Box, { BoxProps } from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

export interface BoardProps extends BoxProps {
  label?: React.ReactNode
  sublabel?: React.ReactNode
  children?: React.ReactNode
  height?: string | number
}

const StyledBox = styled(Box)`
  border: 1px solid #37506c;
  border-radius: 4px;
  margin: 8px 0 10px;
  padding: 12px;
  color: #37506c;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.35;
  box-shadow: 1px 1px 10px rgba(25, 37, 45, 0.15);
  user-select: none;
  height: ${({ height }) => height};
`

function BoardHeader({
  label,
  sublabel,
}: {
  label?: React.ReactNode
  sublabel?: React.ReactNode
}) {
  return sublabel ? (
    <Typography align="center">
      <Typography style={{ display: 'block' }} variant="button">
        {label}
      </Typography>
      <Typography variant="caption" style={{ display: 'block' }} align="center">
        {sublabel}
      </Typography>
    </Typography>
  ) : (
    <Typography variant="button">{label}</Typography>
  )
}

function Board({ label, sublabel, children, ...rest }: BoardProps) {
  return (
    <StyledBox margin="normal" {...rest}>
      <BoardHeader label={label} sublabel={sublabel} />
      {children}
    </StyledBox>
  )
}

export default Board
