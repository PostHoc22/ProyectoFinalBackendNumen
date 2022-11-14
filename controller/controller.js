const {FitLand} = require('../models/fitnessLand')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const axios = require('axios')

const indexController = (req, res) => {
    res.send('¡Bienvenidos a "FitnessLand", el hogar de los amantes del fitness!')
}

const verProductos = async (req, res) => {
    const producto = await FitLand.find()
    res.status(200).json({producto})  
}

const verProducto = async (req, res) => {
    const producto = await FitLand.findById(req.params.id)
    res.status(200).json({producto})  
}

const buscarProducto = async (req, res) => {
    const producto = await FitLand.findOne({product: req.params.product})
    res.status(200).json({producto})  
}

const filtarPorTipo = async (req, res) => {
    const producto = await FitLand.find({category: req.params.category})
    res.status(200).json({producto})  
}

const cargarProducto = async (req, res) => {
    try {
        const err = validationResult(req)
        if (err.isEmpty()) {
            const producto = new FitLand(req.body)
            await producto.save()
            res.status(201).json({producto})    
        } else {
            res.status(501).json(err)
        }
    } catch (error) {
        res.status(501).json({error})
    }
}

const editarProducto = async (req, res) => {
    try {
        const err = validationResult(req)
        if (err.isEmpty()) {
            await FitLand.findByIdAndUpdate(req.params.id, req.body)
            res.status(201).json({msg:'Modificacion gestionada: todos los datos del producto fueron actualizados correctamente'})
        } else {
            res.status(501).json(err)
        }
    } catch (error) {
        res.status(501).json({error})
    }
}

const eliminarProducto = async (req, res) => {
    producto = await FitLand.findByIdAndDelete(req.params.id)
    res.status(200).json({msg:'El Producto se elimino correctamente', producto})
}

const ejemploPass = async (req, res) => {
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(req.body.pass, salt)
    let comparacion = bcrypt.compareSync(req.body.pass, hash)
    let comparacion2 = bcrypt.compareSync('654321', hash)
    res.json({hash, comparacion, comparacion2})
}

const consultaAxios = async (req, res) => {
    try {
        const respuesta = await axios.get('https://breakingbadapi.com/api/characters')
        res.status(200).json({status: respuesta.status, data: respuesta.data})
    } catch {
        res.json({status: error.response.status, data: error.response.data})
    }
}

module.exports = {indexController, verProductos, verProducto, buscarProducto, filtarPorTipo, cargarProducto, editarProducto, eliminarProducto, ejemploPass, consultaAxios}