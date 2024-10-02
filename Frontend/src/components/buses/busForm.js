import { useNavigate } from "react-router-dom"


const { useState } = require("react")



const BusForm = () => {
    
    const[bus_no, setbus_no] = useState('')
    const[driver_id, setdriver_id] = useState('')
    const[driver_name, setdriver_name] = useState('')
    const navigate = useNavigate()
    const[error, seterror] = useState('null')
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const buses = {bus_no, driver_id, driver_name}

        const response = await fetch('http://localhost:4000/api/buses/', {
            method: 'POST',
            body: JSON.stringify(buses),
            headers: {
                'content-type': 'application/json',
            },
        });
        const json = await response.json()

        if(!response){
            seterror(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setbus_no('')
            setdriver_id('')
            setdriver_name('')
            seterror(null)
            console.log('new workout added', json)
            navigate ('/BusList')
           
        }

    }

    return(
        /*
        <div>
        <form className="create" onSubmit={handleSubmit}>
            <h2>Add new bus</h2>

            <label style={{marginTop:20}}> Bus No:  </label><br/>
            <input
                type="text"
                onChange={(e) => setbus_no(e.target.value)}
                value={bus_no}
            /><br></br>

            <label style={{marginTop:20}}>Driver ID: </label>
            <input
                type="text"
                onChange={(e) => setdriver_id(e.target.value)}
                value={driver_id}
            /><br></br>

            <label style={{marginTop:20}}>Driver name : </label>
            <input
                type="text"
                onChange={(e) => setdriver_name(e.target.value)}
                value={driver_name}
            /><br></br>

            <button>ADD</button>
            
        </form>*/

<form class = 'm-5'  onSubmit={handleSubmit}>

<h2>Add new bus</h2>
<div class="mb-3">

  <label for="exampleInputbusNO" class="form-label">Bus No:</label>
  <input type="text"  id="busNo"  
  onChange={(e) => setbus_no(e.target.value)}
  value={bus_no}
  className={`form-control ${emptyFields.includes('bus_no') ? 'error' : ''}`}/>
  
</div>
<div class="mb-3">
  <label for="exampleInputDriverID" class="form-label">Driver ID</label>
  <input type="text"  id="driverID" 
  onChange={(e) => setdriver_id(e.target.value)}
  value={driver_id}
  className={`form-control ${emptyFields.includes('deiver_id') ? 'error' : ''}`}
  />
</div>
<div class="mb-3 ">
  
  <label class="exampleInputDriverName" for="exampleCheck1">Driver Name</label>
  <input type="text"  id="driverName" 
  onChange={(e) => setdriver_name(e.target.value)}
  value={driver_name}
  className={`form-control ${emptyFields.includes('driver_name') ? 'error' : ''}`}
  />
</div>
<button type="submit" class="btn btn-danger ml-5" >Submit</button>
</form>
//</div>
    )
}

export default BusForm