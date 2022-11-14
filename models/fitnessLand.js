const mongoose = require('mongoose')

const Schema = mongoose.Schema
const fitSchema = new Schema ({
    category: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: Number,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    stock: {
        type: Boolean,
        required: true
    }
})

const FitLand = mongoose.model('FitLand', fitSchema)
module.exports = { FitLand }