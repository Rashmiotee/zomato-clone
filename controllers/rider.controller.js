
const asyncHandler = require("express-async-handler")
const { checkEmpty } = require("../utils/checkEmpty")
const Order = require("../models/Order");
const { io } = require("../socket/socket");

exports.getOrders = asyncHandler(async (req, res) => {
    console.log(req.user);

    const result = await Order
        .find({ rider: req.user, status: { $ne: "delivered" } })
        .select("-rider -createdAt -updatedAt -__v")//select find pay lagtey je nahi patvycha ahe tey selct mdhe takhych
        .populate("resturant", "name hero mobile address") //populate main second arugument//joins 
        .populate("customer", "name mobile address") //populate main second arugument//joins 
        .populate("items.dish", "name type image price")//je patvycha ahe tey populate mdhe
        .sort({ createdAt: -1 })
    res.json({ message: "order fetch success", result })
})
exports.updateOrderStatus = asyncHandler(async (req, res) => {

    const { oid } = req.params
    await Order.findByIdAndUpdate(oid, { status: req.body.status })
    io.emit("status-update")
    res.json({ message: "order update status" })
})