// Utility react hook for debugging UIDL - Renders a select field to
//    select different device sizes
import React from 'react'

export type DeviceKey =
  | 'galaxyS5'
  | 'iPhone5'
  | 'iPhone6_7_8'
  | 'iPhone6_7_8_Plus'
  | 'iPad'

export interface Device {
  label: string
  sizes: {
    width: number
    height: number
  }
}

export const devices: Record<DeviceKey, Device> = {
  galaxyS5: {
    label: 'Galaxy S5',
    sizes: { width: 360, height: 640 },
  },
  iPhone5: {
    label: 'iPhone 5',
    sizes: { width: 320, height: 568 },
  },
  iPhone6_7_8: {
    label: 'iPhone 6, 7, 8',
    sizes: { width: 375, height: 667 },
  },
  iPhone6_7_8_Plus: {
    label: 'iPhone 6, 7, 8 Plus',
    sizes: { width: 414, height: 736 },
  },
  iPad: {
    label: 'iPad',
    sizes: { width: 768, height: 1024 },
  },
}

export const selectDeviceOptions = Object.keys(devices).map((deviceKey) => {
  return {
    key: deviceKey,
    value: deviceKey,
    label: devices[deviceKey as DeviceKey].label,
  }
})

function useSelectDevice({
  initialValue = 'galaxyS5',
}: {
  initialValue: DeviceKey | ''
}) {
  const [selectedDevice, setSelectedDevice] = React.useState(initialValue)

  function selectDevice(e: React.ChangeEvent<any> | DeviceKey) {
    if (typeof e === 'string') {
      setSelectedDevice(e)
    } else {
      setSelectedDevice(e.target.value)
    }
  }

  return {
    selectDevice,
    selectedDevice,
    selectDeviceOptions,
  }
}

export default useSelectDevice
