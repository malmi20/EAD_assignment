import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
//import {  } from ""

const UpdateBus = () => {
    const [bus_no, setbus_no] = useState('')
    const [driver_id, setdriver_id] = useState('')
    const [driver_name, setdriver_name] = useState('')
    const { id } = useParams();
    const [error,setError] = useState('')
    const [emptyFields, setEmptyFields] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchbuses = async () => {
          try {
            const response = await fetch(`http://localhost:4000/api/buses/${id}`)
            const json = await response.json()

            if (response.ok) {
              setbus_no(json.bus_no)
              setdriver_id(json.driver_id)
              setdriver_name(json.driver_name)
            }
          } catch (error) {
            console.log(error)
          }
        };
        fetchbuses();
      }, [id])

      const handleUpdate = async (e) => {
        e.preventDefault()
        try {
          const response = await fetch(`http://localhost:4000/api/buses/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              bus_no,
              driver_id,
              driver_name
            })
          })
    
          const json = await response.json()

          if(response.ok){
            setError(null)
            setEmptyFields([])
            navigate('/BusList')
          }
        else{
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
    }
            catch (error) {
                console.log(error)
              }

}

return(
<form class = 'm-5'  onSubmit={handleUpdate}>

<h2>Update bus</h2>
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
  
  <label class="exampleInputDriverID" for="exampleCheck1">Driver Name</label>
  <input type="text"  id="driverName" 
  onChange={(e) => setdriver_name(e.target.value)}
  value={driver_name}
  className={`form-control ${emptyFields.includes('driver_name') ? 'error' : ''}`}
  />
</div>
<button type="submit" class="btn btn-danger ml-5" >Submit</button>
</form>
)
  }

  export default UpdateBus