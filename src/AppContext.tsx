import React from 'react'
import { AppContextValue } from './AppProvider'

const context = React.createContext<undefined | AppContextValue>(undefined)

export default context
