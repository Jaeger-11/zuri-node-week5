// 1. Add/Book Flight
// 2. Get all Flight
// 3. Get single Flight
// 4. Update/Edit Flight
// 5. Delete Flight
const flights = require("../database/data");

const addFlight = async (req,res) => {
    const { time, date, price, title } = req.body
    if ( time && date && price && title ){
        const newFlight = {id : flights.length + 1, ...req.body}
        const updatedFlights = [...flights, newFlight ]
        return res.status(201).json({status: "success", allFlights: updatedFlights, count: updatedFlights.length})
    }
    await res.status(400).json({success:false, msg:"time, date, price & title parameters are required"})
}

const getAllFlights = async (req,res) => {
    await res.status(200).json({data: flights});
}

const getFlight = async (req,res) => {
    const { id } = req.params;
    const exist = flights.find((flight) => flight.id === Number(id));
    if ( !exist ){
        res.status(400).json({status:"failed", msg:"Id does not exist"})
    }
    await res.status(200).send(exist);
}

const editFlight = async (req,res) => {
    const { id } = req.params
    const { time, date, price, title } = req.body
    const exist = flights.find((flight) => flight.id === Number(id));
    if( !exist ){
        return res.status(400).json({status:"failed", msg:"Id does not exist"});
    }
    const updatedFlights = flights.map((flight) => {
        if(flight.id === Number(id)){
            flight.date = date || flight.date,
            flight.time = time || flight.time,
            flight.price = price || flight.price,
            flight.title = title || flight.title
        }
        return flight;
    })
    await res.status(201).json(updatedFlights)
}

const deleteFlight = async (req,res) => {
    const { id } = req.params;
    const exist = flights.find((flight) => flight.id === Number(id));
    if ( !exist ){
        return res.status(400).json({status:"failed", msg:"Id does not exist"});
    }
    const newFlights = flights.filter((flight) => flight.id !== Number(id));
    await res.status(204).json({status: "success", data:newFlights})
}

module.exports = {
    addFlight,
    getAllFlights,
    getFlight,
    editFlight,
    deleteFlight
}