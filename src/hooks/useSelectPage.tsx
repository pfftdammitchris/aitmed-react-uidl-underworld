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

  function selectPage(page: string) {
    if (page !== selectedPage) {
      setSelectedPage(page)
    }
  }

  return {
    selectedPage,
    selectPage,
    selectPageOptions: toSelectPageOptions(pages),
  }
}

export default useSelectPage
