import React, {Fragment,useState, useEffect} from "react"
import Axios from "axios"
var url = "http://localhost:5000"
if (process.env.NODE_ENV === "production"){
  url = process.env.PORT
}

function FoodInfo(props){

  const [foodInfo, setfoodInfo] = useState({})

  const {Food,cals,fat,carbs,servings} = foodInfo


  useEffect(()=>{
    Axios({
    method:"Get",
    withCredentials:true,
    url:`${url}/foodInfo/${props.id}`
  }).then((res) => {
    setfoodInfo(res.data)
  })
    document.body.classList = "FoodInfo"
  },[])

  const deleteFoodItem = () => {
    Axios({
      method:"Post",
      withCredentials:true,
      data:foodInfo,
      url:`${url}/deleteFood`
    }).then((res) => {
      if (res.data === true) {
        window.location = `/calendar/${foodInfo["date"]}`
      }
    })
  }

  return(
    <Fragment>
    <div className = "FoodContainer">
    <h1>Food Info</h1>
    <p>Food: {Food}</p>
    <p>Total Cals: {cals * servings}</p>
    <p>Total Fat: {fat * servings}</p>
    <p>Total Carbs: {carbs * servings}</p>
    <p>Servings Amount: {servings}</p>
    <br />
    <a href={`/modify-food/${props.id}`}>
    <button className = "btn btn-success btn-sm btn-radius">Modify Food</button>
    </a>
    <button className = "btn btn-warning btn-sm btn-radius" onClick = {deleteFoodItem}>Delete Food</button>
    </div>
    </Fragment>
  )
}

export default FoodInfo
