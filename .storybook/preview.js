import React from 'react'
import { addParameters, addDecorator } from '@storybook/react'
import AppProvider from '../src/AppProvider'
import AuthProvider from '../src/AuthProvider'
import GlobalStyle from '../src/app/GlobalStyle'

addDecorator((storyFn) => (
  <>
    <GlobalStyle />
    <AuthProvider>
      <AppProvider>{storyFn()}</AppProvider>
    </AuthProvider>
  </>
))

addParameters({
  options: {
    showAddonsPanel: false,
    showSearchBox: false,
    showPanel: false,
    // Sort alphabetically
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
})
