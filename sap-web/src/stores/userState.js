import { createContainer } from "unstated-next"
import React, {useState} from 'react';

function UserState() {
    let [user , setUser] = useState(localStorage.getItem("token"))
    let login = (token) => {
        setUser(token)
        _login(token)
    }
    let logout = () => {
        setUser()
        localStorage.clear()
    }
    return { user, login, logout, setUser }
  }
  
  let UserStore = createContainer(UserState)

  export default UserStore

  async function _login(token){
    localStorage.setItem("token", token)
  }