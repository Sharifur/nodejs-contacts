const mongose = require('mongoose');
require('dotenv').config();

const ConnectDB = async () => { 
    try{
        const conn = await mongose.connect(process.env.CONNECTION_STRING);
        console.log(`Database Connected `,conn.connection.host,conn.connection.name)
    }catch(err){
        console.log(err); 
        process.exit(1);
    }

} 

module.exports = ConnectDB;