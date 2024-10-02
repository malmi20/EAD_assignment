const express = require('express') 
const{
    getpayment,
    getpayments,
    createPayment
} = require('../../controllers/paymentController')

const router = express.Router()

//get all payments
router.get('/', getpayments)

//get a single payment
router.get('/:id', getpayment)

//create payment
router.post('/',createPayment )

module.exports = router