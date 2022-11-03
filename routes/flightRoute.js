const express = require("express");
const router = express.Router();
const {
    addFlight,
    getAllFlights,
    getFlight,
    editFlight,
    deleteFlight
} = require("../controllers/flightController")

router.get('/', getAllFlights);
router.post('/', addFlight);
router.get('/:id', getFlight);
router.patch('/:id', editFlight);
router.delete('/:id', deleteFlight);

module.exports = router