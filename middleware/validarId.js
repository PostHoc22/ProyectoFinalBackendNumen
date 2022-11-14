const {FitLand} = require('../models/fitnessLand')

const validarId = async (req, res, next) => {
    try {
        const producto = await FitLand.findById(req.params.id);
        if (producto !== null) {
            next()
        } else { 
            res.status(500).json({msg:'el id cargado no existe en la base de datos, por favor verifique el dato cargado y vuelva a intentarlo'});
        }
    } catch {
        res.status(500).json({msg:'el id cargado no existe en la base de datos, por favor verifique el dato cargado y vuelva a intentarlo'})
    }
}

module.exports = {validarId}