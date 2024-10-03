import React, {useState, useEffect, useContext} from 'react'

const AppContext = React.createContext()


const GlobalContext = ({children}) => {

const [currentUser,setCurrentUser] = useState({})


  return (
    <AppContext.Provider value={{currentUser,setCurrentUser}}>
     {children}
        </AppContext.Provider>
  )
}
export const useGlobalContext = ()=>{
    return useContext(AppContext)
}
export default GlobalContext