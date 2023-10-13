require('dotenv').config();
const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const ConnectDB = require('./config/ConnectDatabase')


const app = express();
const port = process.env.PORT || 5000;

ConnectDB(); 

app.use(express.json());
app.use("/api/contacts",require('./routes/contactRoutes'));
app.use("/api/users",require('./routes/userRoutes'));
app.use(errorHandler);
app.listen(port,() => {
    console.log(`server is lisening to port ${port}`);
});