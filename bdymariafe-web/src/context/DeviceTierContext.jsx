import { createContext, useContext } from 'react'
import { useDeviceTier } from '../hooks/useDeviceTier'

const DeviceTierContext = createContext('MEDIUM')

export function DeviceTierProvider({ children }) {
  const tier = useDeviceTier()
  return (
    <DeviceTierContext.Provider value={tier}>
      {children}
    </DeviceTierContext.Provider>
  )
}

export const useTier = () => useContext(DeviceTierContext)
