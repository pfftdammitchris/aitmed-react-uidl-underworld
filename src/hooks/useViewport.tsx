import React from 'react'
import { isBrowser } from 'utils'

export interface UseViewportOptions {
  viewportWidth?: number
  viewportHeight?: number
}

function useViewport({
  viewportWidth: viewportWidthProp,
  viewportHeight: viewportHeightProp,
}: UseViewportOptions) {
  const { current: vwControlled } = React.useRef<boolean>(
    typeof viewportWidthProp !== 'undefined',
  )
  const { current: vhControlled } = React.useRef<boolean>(
    typeof viewportHeightProp !== 'undefined',
  )

  const getViewportSize = React.useCallback(
    function getViewportSize(type: 'width' | 'height') {
      if (isBrowser()) {
        switch (type) {
          case 'width':
            return vwControlled ? Number(viewportWidthProp) : window.innerWidth
          case 'height':
            return vhControlled
              ? Number(viewportHeightProp)
              : window.innerHeight
          default:
            break
        }
      }
      return 0
    },
    [vhControlled, viewportHeightProp, viewportWidthProp, vwControlled],
  )

  const [viewportWidth, setViewportWidth] = React.useState(
    getViewportSize('width'),
  )
  const [viewportHeight, setViewportHeight] = React.useState(
    getViewportSize('height'),
  )

  const onResize = React.useCallback(
    function onResize() {
      setViewportWidth(getViewportSize('width'))
      setViewportHeight(getViewportSize('height'))
    },
    [getViewportSize],
  )

  React.useEffect(() => {
    if (!vwControlled && !vhControlled) {
      window.addEventListener('resize', onResize)
    }
    return function cleanup() {
      window.removeEventListener('resize', onResize)
    }
  }, [onResize, vhControlled, vwControlled])

  React.useEffect(() => {
    onResize()
  }, [viewportWidthProp, viewportHeightProp, onResize])

  return {
    viewportWidth,
    viewportHeight,
  }
}

export default useViewport
