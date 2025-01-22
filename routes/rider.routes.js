const { getOrders, updateOrderStatus } = require("../controllers/rider.controller")

const router = require("express").Router()


router
    .get("/get-orders", getOrders)
    .put("/update-order-status/:oid", updateOrderStatus)

module.exports = router