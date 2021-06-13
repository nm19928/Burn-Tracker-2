import React, {useState,useEffect} from 'react'
import AuthRoutes from './components/AuthRoutes'
import SignIn from './components/SignIn'
import Axios from "axios"
var url = "http://localhost:5000"
if (process.env.NODE_ENV === "production"){
  url = "https://burn-tracker.herokuapp.com"
}


function App() {
  const [user,setUser] = useState()

    useEffect(()=>{
        Axios({
        method: "Get",
        withCredentials:true,
        url:`${url}/validation`
        }).then((res) => {
        setUser(res.data)
        console.log(res.data)
        console.log(process.env.PORT)
        })
    },[])

  if (user){
    return(
      <AuthRoutes user = {user}/>
    )} else {
      return(
      <SignIn />
      )
    }
  }

export default App
