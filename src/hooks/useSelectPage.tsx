// Utility react hook for debugging UIDL - Renders a select field to
//    select different pages
import React from 'react'

export function toSelectPageOptions(pages: string[]) {
  return pages.map((page: string) => ({
    key: page,
    value: page,
    label: page,
  }))
}

function useSelectPage({
  name = '',
  pages = [],
  navigate = () => {},
  onChange,
}: {
  name?: string
  pages?: string[]
  onChange?: (page: string) => void
  navigate: (to: string) => void
}) {
  const [current, setCurrent] = React.useState(name)

  const selectPage = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement> | string) => {
      if (typeof e === 'string') {
        navigate('/' + e)
      } else {
        navigate('/' + e.target.value)
      }
    },
    [navigate],
  )

  React.useEffect(() => {
    if (current !== name) {
      setCurrent(name)
      if (onChange) onChange(name)
    }
  }, [current, name, onChange])

  return {
    current,
    selectPage,
    selectPageOptions: toSelectPageOptions(pages),
  }
}

export default useSelectPage
