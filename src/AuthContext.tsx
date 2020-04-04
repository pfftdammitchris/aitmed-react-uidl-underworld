import React from 'react'
import { initialState, AuthContextValue } from './AuthProvider'

const context = React.createContext<AuthContextValue>(initialState)

export default context
