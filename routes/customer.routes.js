const { getLoaction, updateCustomerInfo, getAllResturant, getAllResturantMenu, placeOrder, getOrders, } = require("../controllers/customer.controller")

const router = require("express").Router()


router
    .post("/get-location", getLoaction)
    .post("/update-info", updateCustomerInfo)
    .get("/get-resturant", getAllResturant)
    .get("/get-resturant-menu/:rid", getAllResturantMenu)
    .post("/place-order", placeOrder)
    .get("/get-order", getOrders)

module.exports = router
