const { getOrders } = require("../controllers/rider.controller")

const router = require("express").Router()


router
    .get("/get-orders", getOrders)

module.exports = router