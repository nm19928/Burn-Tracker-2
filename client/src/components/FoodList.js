import React, {Fragment,useState, useEffect} from "react"
import Axios from "axios"
var url = "http://localhost:5000"
if (process.env.NODE_ENV === "production"){
  url = process.env.PORT
}

function FoodList(props){
  const [loading,setLoading] = useState(true)
  const [values,setValues] = useState(false)
  const [list, setList] = useState([])
  const [activity,setActivity] = useState({
    id:null,
    calories:null,
    date:null
  })

  const getFoodInfo = () => {
    Axios({
      method:"Get",
      withCredentials:true,
      url:`${url}/foodslist/${props.date}`
    }).then((res) => {
    const value = res.data
    if (res.data !== false){
    setList(preValue => {
    return [...preValue,...value]
        })
      }
    })
  }

  const getCalorieInfo = () => {
    Axios({
      method:"Get",
      withCredentials:true,
      url:`${url}/activity/${props.date}`
    }).then((res) => {
    const response = res.data
    if (response !== false){
    setActivity(response)
    setValues(true)
      }
    })
  }

const totalCalories = list.reduce(function (acc, obj) {
  return acc + (parseInt(obj.cals) * parseInt(obj.servings)) }, 0)

  function renderModifyButton(){
    if (values){
      return(
        <div>
        <a href = {`/modify-activity/${activity["id"]}`}>
        <button className = "btn btn-primary btn-sm">Modify</button>
        </a>
        </div>
      )}
    }

    function renderActivityButton() {
      if (values === false && activity["id"] === null){
        return(
          <div>
          <a href = {`/activity/${props.date}`}>
          <button className = "btn btn-primary ActivityButton">Click here for Calories Burned</button>
          </a>
          </div>
        )
      }
    }

  useEffect(() => {
      document.body.classList = "FoodList"
      getFoodInfo()
      getCalorieInfo()
      setLoading(false)
  },[])

  if (loading){
    return(
      <Fragment>
      </Fragment>
    )
  } else {
    if (list.length === 0 && activity["id"] === null) {
      return(
        <Fragment>
        <div className = "NullData">
        <p>Sorry, but there doesn't seem to be any food values for this day.</p>
        </div>
        <a href = {`/foodinput/${props.date}`}>
        <button className="btn btn-primary FoodButton">Click here to Input Food</button>
        </a>
        </Fragment>
      )
    } else {
  return(
    <Fragment>
    <h1 className = "DateHeading">{props.date}</h1>

    <table className = "table table-striped table-dark">
    <thead>
    <tr>
      <th scope="col">Total Calories Consumed</th>
      <th scope="col">Calories Burned</th>
      <th scope="col">Modify Calories Burned</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>{totalCalories}</td>
    <td>{activity["calories"]}</td>
    <td>{renderModifyButton()}</td>
    </tr>
    </tbody>
    </table>
    {renderActivityButton()}
    <table className = "table table-striped table-dark">
    <thead>
    <tr>
      <th scope="col">Food Name</th>
      <th scope="col">Calories</th>
      <th scope="col">Full Info</th>
    </tr>
    </thead>
    <tbody>
    {list.map((item) => {
      return (
        <tr>
        <td>{item["Food"]}</td>
        <td>{item["cals"] * item["servings"]}</td>
        <td><a href = {`http://localhost:3000/foodInfo/${item.id}`}><button className = "btn btn-primary btn-sm">Info</button></a></td>
        </tr>
      )
    })}
    </tbody>
    </table>
    <a href = {`/foodinput/${props.date}`}>
    <button className="btn btn-primary FoodButton">Click here to Input Food</button>
    </a>
    </Fragment>
  )}
  }
}

export default FoodList
