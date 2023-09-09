const mongoose = require("mongoose");
const mongoURI = process.env.DB_HOST


const dbConnection = async function connection(){  

    return new Promise((resolve, reject) => {
        mongoose.connect(mongoURI, { useNewUrlParser: true})
            .then((connection) => {
                resolve(connection)
            })
            .catch((error) => {
                reject(error)
            })
    })   

}
module.exports = dbConnection