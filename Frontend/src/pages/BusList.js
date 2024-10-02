import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"



//components
import BusDetails from '../components/buses/busDetails'

const BusList = () => {
    //const {buses, dispatch} = UseBusContext()
    const [buses, setbuses] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchbuses = async () => {
            const response = await fetch('/api/buses')
            const json = await response.json()

            if (response.ok){
                //dispatch({type: 'SET_BUSES', payload: json})
                setbuses(json)

            }
        }

        fetchbuses()

        
    }, [buses])

    const handleAdd = () => {
        navigate('/AddBus')

    }
    

    return(
        <div className="head">
            <h1>Bus List</h1>

           
            
        <div className="BusList">
            {buses && buses.map((bus, index) => (
                <BusDetails key={index} bus={bus}/>
            ))}

        <div> <button className="btn" onClick={() => handleAdd()}>Add</button></div>
            
        </div>
        </div>
    )

}
export default BusList