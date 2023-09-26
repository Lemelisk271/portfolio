import { createContext, useState } from 'react'

export const PageContext = createContext()

export const PageProvider = props => {
  const [page, setPage] = useState('about')

  return (
    <PageContext.Provider value={{page, setPage}}>
      {props.children}
    </PageContext.Provider>
  )
}

export default PageProvider
