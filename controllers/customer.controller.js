const asyncHandler = require("express-async-handler")

const axios = require("axios")
const { checkEmpty } = require("../utils/checkEmpty")
const Customer = require("../models/Customer")
const Resturant = require("../models/Resturant")
const Menu = require("../models/Menu")
const Order = require("../models/Order")
exports.getLoaction = asyncHandler(async (req, res) => {
    const { latitude, longitude } = req.body
    const { isError, error } = checkEmpty({ latitude, longitude })
    if (isError) {
        return res.status(400).json({ message: "all fields required", error })
    }
    const { data } = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=${process.env.CAGE_API_KEY}`)

    console.log(data)
    let str = ""
    let city = data.results[0].components.city
    str += "" + data.results[0].components.road
    str += "" + data.results[0].components.neighbourhood
    str += "" + data.results[0].components.suburb
    str += "" + data.results[0].components.city
    str += "" + data.results[0].components.postcode


    res.json({
        message: "location fetch success", result: {
            address: str,
            city
        }
    })
    // addrss
    // setLoc(data.results[0].formatted);
})
exports.updateCustomerInfo = asyncHandler(async (req, res) => {
    const { address, city, gender } = req.body
    const { isError, error } = checkEmpty({ address, city, gender })
    if (isError) {
        return res.status(400).json({ message: "all fields required", error })
    }

    const result = await Customer.findByIdAndUpdate(req.user, {
        address,
        city,
        gender,
        infoComplete: true
    }, { new: true })

    res.json({ message: "profile update sucess", result })
    // setLoc(data.results[0].formatted);
})

exports.getAllResturant = asyncHandler(async (req, res) => {
    const result = await Resturant.find({ isActive: true }).select("-password -createdAt -updatedAt -__v -certificate -infoComplete -isActive")
    res.json({ message: "ALlresturant fetch success", result })
})
exports.getAllResturantMenu = asyncHandler(async (req, res) => {
    const result = await Menu.find({ resturant: req.params.rid }).select("-createdAt -updatedAt -__v")
    res.json({ message: "menu fetch success", result })
})
exports.placeOrder = asyncHandler(async (req, res) => {

    const { resturant, items } = req.body
    const { error, isError } = checkEmpty({ resturant, items })
    if (isError) {
        return res.status(400).json({ message: "all fields required", error })
    }
    await Order.create({ resturant, items, customer: req.user })
    res.json({ message: "order place success" })
})
exports.getOrders = asyncHandler(async (req, res) => {
    const result = await Order
        .find({ customer: req.user })
        .select("-customer -createdAt -updatedAt -__v")//select find pay lagtey je nahi patvycha ahe tey selct mdhe takhych
        .populate("resturant", "name hero") //populate main second arugument//joins 
        .populate("items.dish", "name type image price")//je patvycha ahe tey populate mdhe
        .sort({ createdAt: -1 })
    res.json({ message: "order place success", result })
})