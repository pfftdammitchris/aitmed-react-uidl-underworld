import React from 'react'
import Select, { SelectOption } from 'components/common/Select'

export interface ControlsProps {
  device?: {
    selected?: string
    select?: (e: React.ChangeEvent<any>) => void | ((e: string) => void)
    selectOptions?: SelectOption[]
  }
  page?: {
    select?: (e: React.ChangeEvent<any>) => void | ((e: string) => void)
    selected?: string
    selectOptions?: SelectOption[]
  }
}

function Controls({ device, page }: ControlsProps) {
  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
      {device && (
        <Select
          name="device"
          label="Select Device"
          value={device.selected}
          onChange={device.select}
          options={device.selectOptions}
          inline
        />
      )}
      <div style={{ width: 10 }} />
      {page && (
        <Select
          name="page"
          label="Select Page"
          value={page.selected}
          onChange={page.select}
          options={page.selectOptions}
          inline
        />
      )}
    </div>
  )
}

export default Controls
