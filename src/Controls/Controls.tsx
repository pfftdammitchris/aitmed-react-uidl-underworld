import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import Actions from 'components/common/Actions'
import Select from 'components/common/Select'
import YamlEditor from 'components/YamlEditor'
import useSelectPage, { toSelectPageOptions } from 'hooks/useSelectPage'
import useSelectDevice, { selectDeviceOptions } from 'hooks/useSelectDevice'
import useYamlTextField from 'hooks/useYamlTextField'

export interface ControlsProps {
  baseUrl?: string
  viewportWidth?: number
  viewportHeight?: number
  setViewportWidth?: (width: number) => void
  setViewportHeight?: (height: number) => void
  yml?: string
  onYmlChange?: (e: React.ChangeEvent<any>) => void | ((e: string) => void)
  selectedDevice?: string
  selectDevice?: (e: React.ChangeEvent<any>) => void | ((e: string) => void)
  selectedPage?: string
  selectPage?: (e: React.ChangeEvent<any>) => void | ((e: string) => void)
  pages?: string[]
}

const StyledRoot = styled.div`
  width: 100%;
`

function Controls({
  viewportWidth,
  viewportHeight,
  setViewportWidth,
  setViewportHeight,
  yml,
  onYmlChange,
  selectedDevice,
  selectDevice,
  selectedPage = '',
  selectPage,
  pages = [],
}: ControlsProps) {
  // Keeps preview in sync with size changes
  React.useEffect(() => {
    const { width, height } = sizes[device]
    if (width !== viewportWidth) setViewportWidth(width)
    if (height !== viewportHeight) setViewportHeight(height)
  }, [setViewportWidth, setViewportHeight, viewportWidth, viewportHeight])

  return (
    <StyledRoot>
      <Actions>
        <Select
          name="device"
          label="Select Device"
          value={selectedDevice}
          onChange={selectDevice}
          options={selectDeviceOptions}
        />
      </Actions>
      <Typography align="center" variant="caption" color="secondary">
        width: {viewportWidth}px height: {viewportHeight}px
      </Typography>
      <Select
        name="page"
        label="Select Page"
        value={selectedPage}
        onChange={selectPage}
        options={toSelectPageOptions(pages)}
      />
      <YamlEditor value={yml} onChange={onYmlChange} />
    </StyledRoot>
  )
}

export default Controls
