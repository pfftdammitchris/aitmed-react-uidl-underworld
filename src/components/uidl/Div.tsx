import React from 'react'
import { getDebugStyles } from 'utils'
import { ComponentType } from '../../types'

export interface DivProps {
  style: React.CSSProperties
  type: ComponentType
  componentId: string
  children?: React.ReactNode
  uidl: any
}

function Div({ style, children, componentId, uidl }: DivProps) {
  const styles = {
    color: uidl?.css?.base?.color,
    fontSize: uidl?.css?.base?.fontSize,
    ...style,
    ...getDebugStyles(),
  }

  return (
    <div id={componentId} style={styles}>
      {Array.isArray(children) &&
        // @ts-ignore
        children.map((child, index: number) => (
          <React.Fragment key={`uidlc-${index}`}>{child}</React.Fragment>
        ))}
    </div>
  )
}

export default Div
