const mongoose = require('mongoose')
require('dotenv').config()

const conect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECT)
        console.log("Conexion exitosa con la base de datos")
    } catch {
        console.log("No es posible conectar con la base de datos, por favor vuelva a intentar!!!")
    }
}

module.exports = {conect}