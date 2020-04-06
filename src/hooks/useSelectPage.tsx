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
  pages = [],
  startPage = '',
}: {
  startPage: string
  pages: string[]
}) {
  const [selectedPage, setSelectedPage] = React.useState(startPage)

  function selectPage(e: React.ChangeEvent<HTMLInputElement> | string) {
    if (typeof e === 'string') {
      if (selectedPage !== e) {
        setSelectedPage(e)
      }
    } else {
      if (selectedPage !== e.target.value) {
        setSelectedPage(e.target.value)
      }
    }
  }

  React.useEffect(() => {
    if (!selectedPage && startPage) {
      setSelectedPage(startPage)
    }
  }, [selectedPage, startPage])

  return {
    selectedPage,
    selectPage,
    selectPageOptions: toSelectPageOptions(pages),
  }
}

export default useSelectPage
