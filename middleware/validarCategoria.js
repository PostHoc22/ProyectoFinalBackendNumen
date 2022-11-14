const {FitLand} = require('../models/fitnessLand')

const validarCategoria = async (req, res, next) => {
    const producto = await FitLand.findOne(req.params);
    if (producto !== null) {
        next()
    } else { 
        res.status(500).json({msg:'categoria no existente, por favor verifique y vuelva a intentar'});
    }
}

module.exports = {validarCategoria}