'use strict';
require('dotenv').config({path: './.env.development'});
const app = require('./src/app');
const { connection } = require('./src/config');
const PORT = process.env.PORT;

app.listen(PORT, () => {
    connection()
        .then(() => {
            console.log(`Running on Port: ${PORT}`);
        })
        .catch((e) => {
            console.log("App Crashed!", e?.message)            
        })
    
})
