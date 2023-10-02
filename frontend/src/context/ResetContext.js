import { createContext, useState } from 'react'

export const ResetContext = createContext()

export const ResetProvider = props => {
  const [reset, setReset] = useState(false)

  return (
    <ResetContext.Provider value={{reset, setReset}}>
      {props.children}
    </ResetContext.Provider>
  )
}

export default ResetProvider
