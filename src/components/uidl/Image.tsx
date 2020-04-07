import React from 'react'
// import Button from './Button'
import { getDebugStyles, log } from 'utils'
import { ComponentType } from '../../types'

export interface ImageProps {
  style: React.CSSProperties
  type: ComponentType
  componentId: string
  src?: string
  uidl: any
  children?: any
}

function Image({
  children, // TODO: sometimes we're having buttons as a child
  type,
  style,
  src,
  componentId,
  uidl,
  ...rest
}: ImageProps) {
  // If an image has children, we will assume it is some icon button overlapping
  //    Ex: profile photos and showing pencil icon on top to change it
  if (children) {
    log({
      msg: 'Image has children',
      color: '#c33a0b',
      data: children,
    })
  }

  const styles = {
    ...uidl?.css?.image,
    ...style,
    ...getDebugStyles(),
  }

  let child

  if (!children) {
    return <img src={src} alt="" style={styles} {...rest} />
  } else if (children.props?.uidl?.component) {
    child = uidl?.parseComponent(children.props.uidl.component)
  }

  return (
    <div style={{ ...styles, position: 'relative' }}>
      <img
        src={src}
        title={src}
        alt=""
        style={{ border: '1px solid red', width: '100%', height: '100%' }}
        {...rest}
      />
      {child}
    </div>
  )
}

export default Image
