import { useNavigate } from "react-router-dom"

const BusDetails = ({bus}) => {

    const navigate = useNavigate()
    

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:4000/api/buses/${id}`, {
            method: 'DELETE'
        })
        const json = await response.json()

        if(response.ok){
            console.log(json)

        }
        
    }

    const handleUpdate = (id) => {
        navigate (`/updateBus/${id}`)
    }



    return(
        <div className="bus-details">
            <p><strong>Bus NO:   </strong>{bus.bus_no}</p>
            <p><strong>Driver ID:</strong>{bus.driver_id} </p>
            <p><strong>Driver Name:</strong>{bus.driver_name} </p><br/>
            <p><button className="btn" onClick={() => handleUpdate(bus._id)}>update</button> <button className="btn" onClick={() => handleDelete(bus._id)}>Delete</button></p>
        </div>
    )
}

export default BusDetails