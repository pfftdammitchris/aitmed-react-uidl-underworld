import React from 'react'
import { getDebugStyles } from 'utils'
import { ComponentProps } from '@aitmed/react-uidl'

function Button({
  type,
  style,
  componentId,
  children,
  src,
  uidl,
  ...rest
}: ComponentProps) {
  const styles = {
    outline: 'none',
    cursor: 'pointer',
    fontSize: uidl?.css.base?.fontSize,
    borderStyle: uidl?.css.button?.borderStyle,
    backgroundColor: uidl?.css?.base?.backgroundColor,
    ...style,
    ...getDebugStyles(),
  }

  return (
    // @ts-ignore
    <button type="button" style={styles} {...rest}>
      {children}{' '}
      {src && (
        <img
          src={src}
          alt="'"
          style={{
            width: '35%',
            height: '35%',
          }}
        />
      )}
    </button>
  )
}

export default Button
