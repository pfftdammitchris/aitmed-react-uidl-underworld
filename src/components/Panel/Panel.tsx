import React from 'react'
import styled from 'styled-components'
import Grid, { GridProps } from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

export interface PanelProps extends GridProps {
  label?: React.ReactNode
  sublabel?: React.ReactNode
  textColor?: string
}

const StyledRoot = styled(Grid)`
  padding: 10px 12px;
  /* border: 1px solid red; */
  overflow: hidden;
`

const StyledLabel = styled(Typography)`
  text-align: center;
  width: 100%;
  display: block;
  .sublabel {
    display: block;
    text-align: inherit;
  }
`

function PanelHeader({
  label,
  sublabel,
  textColor = 'rgba(0, 0, 0, 0.5)',
}: Partial<PanelProps>) {
  return sublabel ? (
    <StyledLabel style={{ color: textColor }} variant="h6">
      <Typography variant="button">{label}</Typography>
      <Typography className="sublabel" variant="caption" paragraph>
        {sublabel}
      </Typography>
    </StyledLabel>
  ) : label ? (
    <StyledLabel variant="button">{label}</StyledLabel>
  ) : null
}

function Panel({
  label,
  sublabel,
  textColor = 'light',
  children,
  ...rest
}: PanelProps) {
  return (
    <StyledRoot {...rest}>
      <PanelHeader textColor={textColor} label={label} sublabel={sublabel} />
      {children && <Typography component="div">{children}</Typography>}
    </StyledRoot>
  )
}

export default Panel
