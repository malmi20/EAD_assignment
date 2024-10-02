const express = require('express')
const {
    createBus,
    getbuses,
    getbus,
    deleteBus,
    updateBus
} = require('../../controllers/busController')

const router = express.Router()


//get all buses
router.get('/', getbuses)

//get a single bus
router.get('/:id', getbus)

//post a new bus
router.post('/', createBus)

//delete a single bus
router.delete('/:id', deleteBus)

//update a single bus
router.patch('/:id', updateBus)


module.exports = router