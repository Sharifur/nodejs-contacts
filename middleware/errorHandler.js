const {constants} = require('../constants');

const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    
    switch(statusCode){
        case constants.NOT_FOUND:
            res.json({
                title : "not found",
                message : err.message,
                stack : err.stack,
            })
        break;
        case constants.VALIDATION_ERROR:
            res.json({
                title : "validation error",
                message : err.message,
                stack : err.stack,
            })
        break;
        case constants.SERVER_ERROR:
            res.json({
                title : "server error",
                message : err.message,
                stack : err.stack,
            })
        break;
        case constants.FORBIDDEN:
            res.json({
                title : "forbidden error",
                message : err.message,
                stack : err.stack,
            });
        break;
        case constants.UNAUTHORIZED:
            res.json({
                title : "unauthorized",
                message : err.message,
                stack : err.stack,
            });
        break;
        default:
            console.log(`all error ${statusCode}`,err); 
        break;
    }


}

module.exports = errorHandler;