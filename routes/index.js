const express = require('express')
const router = express.Router()
const {indexController, verProductos, verProducto, buscarProducto, filtarPorTipo, cargarProducto, editarProducto, eliminarProducto, ejemploPass, consultaAxios} = require('../controller/controller')
const {validarId} = require('../middleware/validarId')
const {validarProducto} = require('../middleware/validarProducto')
const {validarCategoria} = require('../middleware/validarCategoria')
const {check} = require('express-validator')


//get
router.get('/fitnessland', indexController)
router.get('/fitnessland/productos', verProductos)
router.get('/fitnessland/producto/:id',validarId, verProducto)
router.get('/fitnessland/buscar/:product', validarProducto, buscarProducto)
router.get('/fitnessland/filtrar/:category', validarCategoria, filtarPorTipo)
router.get('/pass', ejemploPass)
router.get('/axios', consultaAxios)

//post
router.post('/fitnessland/cargarProducto',[
    check('category').not().isEmpty().withMessage('Dato obligatorio, por favor cargar el "Tipo" de Producto').isUppercase().withMessage('Los datos cargados deben ser en letras mayusculas').isLength({min: 4, max:30}).withMessage('el campo debe contener entre 4 y 30 caracteres').isString(),
    check('product').not().isEmpty().withMessage('Dato obligatorio, por favor cargar el "Nombre" del Producto').isUppercase().withMessage('Los datos cargados deben ser en letras mayusculas').isLength({min: 4, max:60}).withMessage('el campo debe contener entre 4 y 60 caracteres').isString(),
    check('code').not().isEmpty().withMessage('Dato obligatorio, por favor cargar el "Codigo" del rotulo del Producto').isNumeric().withMessage('Atencion, el dato cargado debe ser numerico').custom(value =>{if (value >=0) return value; else if (value < 1) throw Error('El valor ingresado no puede ser un numero negativo ni tampoco cero')}),
    check('price').not().isEmpty().withMessage('Dato obligatorio, por favor cargar el "Precio" del producto').isNumeric().withMessage('Atencion, el dato cargado debe ser numerico').custom(value =>{if (value >= 0) return value; else if (value < 1) throw Error('El valor ingresado no puede ser un numero negativo ni tampoco cero')}),
    check('image').not().isEmpty().withMessage('Dato obligatorio, por favor cargar la "URL de la imagen" del Producto').trim().isURL().withMessage('el dato cargado debe poseer la URL de una imagen'),
    check('description').not().isEmpty().withMessage('Dato obligatorio, por favor cargar la "Descripcion" del producto').isString().withMessage('Dato debe ser String').isLength({max:300}).withMessage('se pueden cargar solamente hasta 200 caracteres').isLowercase().withMessage('solo letras minusculas'),
    check('stock').exists().not().isEmpty().withMessage('Dato obligatorio, se debe aclarar si posee en "Stock" al producto').isBoolean().withMessage('Si posee stock cargar "true". Caso contrario, cargar "false".')
], cargarProducto)

//put
router.put('/fitnessland/editarProducto/:id', validarId, [
    check('category').not().isEmpty().withMessage('Dato obligatorio, por favor cargar el "Tipo" de Producto').isUppercase().withMessage('Los datos cargados deben ser en letras mayusculas').isLength({min: 4, max:30}).withMessage('el campo debe contener entre 4 y 30 caracteres').isString(),
    check('product').not().isEmpty().withMessage('Dato obligatorio, por favor cargar el "Nombre" del Producto').isUppercase().withMessage('Los datos cargados deben ser en letras mayusculas').isLength({min: 4, max:60}).withMessage('el campo debe contener entre 4 y 60 caracteres').isString(),
    check('code').not().isEmpty().withMessage('Dato obligatorio, por favor cargar el "Codigo" del rotulo del Producto').isNumeric().withMessage('Atencion, el dato cargado debe ser numerico').custom(value =>{if (value >=0) return value; else if (value < 1) throw Error('El valor ingresado no puede ser un numero negativo ni tampoco cero')}),
    check('price').not().isEmpty().withMessage('Dato obligatorio, por favor cargar el "Precio" del producto').isNumeric().withMessage('Atencion, el dato cargado debe ser numerico').custom(value =>{if (value >= 0) return value; else if (value < 1) throw Error('El valor ingresado no puede ser un numero negativo ni tampoco cero')}),
    check('image').not().isEmpty().withMessage('Dato obligatorio, por favor cargar la "URL de la imagen" del Producto').trim().isURL().withMessage('el dato cargado debe poseer la URL de una imagen'),
    check('description').not().isEmpty().withMessage('Dato obligatorio, por favor cargar la "Descripcion" del producto').isString().withMessage('Dato debe ser String').isLength({max:300}).withMessage('se pueden cargar solamente hasta 200 caracteres').isLowercase().withMessage('solo letras minusculas'),
    check('stock').exists().not().isEmpty().withMessage('Dato obligatorio, se debe aclarar si posee en "Stock" al producto').isBoolean().withMessage('Si posee stock cargar "true". Caso contrario, cargar "false".')
], editarProducto)

//delete
router.delete('/fitnessland/eliminarProducto/:id',validarId, eliminarProducto)
module.exports = router