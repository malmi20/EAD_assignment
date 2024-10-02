const express = require('express');
const router = express.Router();

// import all controllers
const {
    getBusDetails,
    getBusRouteDetails,
    getAssignedBusRouteDetails,
    saveAssignedBusRouteDetails,
    updateBusRouteDetails,
    deleteBusRouteDetails
} = require('../../controllers/busDetailsController');

//get all buses
router.get('/busDetails', getBusDetails);

//get all bus routes
router.get('/busRoutes', getBusRouteDetails);

//get all assigned bus route details
router.get('/getAssignedBusRouteDetails', getAssignedBusRouteDetails);


//save assigned bus route details
router.post('/saveAssignedBusRouteDetails', saveAssignedBusRouteDetails);

//update assigned bus route details
router.post('/updateBusRouteDetails', updateBusRouteDetails);

//delete assigned bus route details
router.delete('/deleteBusRouteDetails', deleteBusRouteDetails);

module.exports = router;