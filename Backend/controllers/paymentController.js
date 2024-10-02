const PaymentDetails = require("../models/paymentModel")
const mongoose = require ('mongoose')

//get all Payments
const getpayments = async (req, res) => {
    const payments = await PaymentDetails.find({}).sort({})
    console.log(payments)

    res.status(200).json(payments)
}

//get payment
const getpayment = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such payment'})
    }

    const payment = await PaymentDetails.findById(id)

    if(!payment){
        return res.status(404).json({error: 'no such payment'})
    }
    
    res.status(200).json(payment)




}

const createPayment = async (req, res) => {
    const {bus_id, date, total} = req.body
    console.log('create payment')

    let emptyFields = []

    if(!bus_id){
        emptyFields.push('bus_no')
    }
    if(!date){
        emptyFields.push('driver_id')
    }
    if(!total){
        emptyFields.push('driver_name')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error: "please fill all the fields", emptyFields })
    }

    //add doc to db
    try{
        const pay = await PaymentDetails.create({bus_id, date, total})
        res.status(200).json(pay)

    }catch(error)
    {
        res.status(400).json({error: error.message})
    }
}
module.exports = {
    getpayments,
    getpayment, 
    createPayment
}