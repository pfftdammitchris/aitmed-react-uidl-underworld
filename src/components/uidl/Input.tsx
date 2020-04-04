import React from 'react'
import { getDebugStyles, log } from 'utils'
import { ComponentType } from '../../types'

export interface InputProps {
  style: React.CSSProperties
  type: ComponentType | string
  componentId: string
  placeholder?: string
  inputType?: string
  uidl: any
  children?: any
  onChange?: any
}

function Input({
  type = '',
  style,
  componentId,
  inputType = 'text',
  children,
  uidl,
  onChange: onChangeProp,
  ...rest
}: InputProps) {
  const [value, setValue] = React.useState(
    typeof children === 'string' ? children : '',
  )

  const props: any = {
    type: inputType,
    style: {
      ...uidl?.css?.textField,
      ...style,
      ...getDebugStyles(),
    },
  }

  if (children) {
    log({
      msg: `Input has children. ${
        componentId ? 'Component ID: ' + componentId : ''
      }`,
      color: '#c92fb5',
      data: children,
    })
  }

  if (type.indexOf('.') !== -1) {
    const narrowedType = type.split('.')?.[1]
    if (narrowedType === 'date') props.type = 'date'
  }

  function onChange(e: React.ChangeEvent<any>) {
    if (typeof onChangeProp === 'function') {
      onChangeProp(e)
    }
    setValue(e.target?.value)
  }

  return (
    <input
      id={componentId}
      value={value}
      onChange={onChange}
      {...rest}
      {...props}
    />
  )
}

export default Input
