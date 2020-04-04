import React from 'react'
import { getDebugStyles } from 'utils'
import { ComponentType } from '../../types'

export interface SelectProps {
  style: React.CSSProperties
  type: ComponentType
  componentId: string
  selectOptions?: any[]
  uidl: any
}

function Select({
  type,
  style,
  componentId,
  uidl,
  selectOptions = [],
  ...rest
}: SelectProps) {
  const [value, setValue] = React.useState('')

  const styles = {
    ...style,
    ...getDebugStyles(),
  }

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setValue(e.target?.value)
  }

  return (
    <select style={styles} value={value} onChange={onChange} {...rest}>
      {selectOptions.map((option: any) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default Select
