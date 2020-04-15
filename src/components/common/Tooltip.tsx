import React from 'react'
import MuiTooltip, {
  TooltipProps as MuiTooltipProps,
} from '@material-ui/core/Tooltip'

export interface TooltipProps extends MuiTooltipProps {
  //
}

function Tooltip({ title, children, ...rest }: TooltipProps) {
  const [opened, setOpened] = React.useState(false)

  function onOpen(e: React.ChangeEvent<any>) {
    setOpened(true)
  }

  function onClose(e: React.ChangeEvent<any>) {
    setOpened(false)
  }

  return (
    <MuiTooltip
      title={title}
      open={opened}
      onOpen={onOpen}
      onClose={onClose}
      placement="top"
      arrow
      {...rest}
    >
      {children}
    </MuiTooltip>
  )
}

export default Tooltip
