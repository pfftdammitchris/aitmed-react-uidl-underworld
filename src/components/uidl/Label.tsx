import React from 'react'
import { getDebugStyles } from 'utils'
import { ComponentType } from '../../types'

export interface LabelProps {
  style: React.CSSProperties
  type: ComponentType
  componentId: string
  children?: React.ReactNode
  uidl: any
}

function Label({
  style,
  type,
  componentId,
  children,
  uidl,
  ...rest
}: LabelProps) {
  const styles = {
    fontSize: uidl.css?.base?.fontSize,
    color: uidl.css?.base?.color,
    ...uidl.css?.label,
    ...style,
    ...getDebugStyles(),
  }

  return (
    <div style={styles} {...rest}>
      {children}
    </div>
  )
}

export default Label
