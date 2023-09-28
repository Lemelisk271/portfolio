import { createContext, useState } from 'react'

export const UltraDarkModeContext = createContext()

export const UltraDarkModeProvider = props => {
  const [ultraDarkMode, setUltraDarkMode] = useState(false)

  return (
    <UltraDarkModeContext.Provider value={{ultraDarkMode, setUltraDarkMode}}>
      {props.children}
    </UltraDarkModeContext.Provider>
  )
}

export default UltraDarkModeProvider
