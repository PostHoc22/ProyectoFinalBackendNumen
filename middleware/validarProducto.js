const {FitLand} = require('../models/fitnessLand')

const validarProducto = async (req, res, next) => {
    const producto = await FitLand.findOne(req.params);
    if (producto !== null) {
        next()
    } else { 
        res.status(500).json({msg:'el producto que busca no existe en la base de datos, por favor verifique el dato que cargo y vuelva a intentarlo'});
    }
}

module.exports = {validarProducto}