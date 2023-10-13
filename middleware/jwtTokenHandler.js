const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const jwtTokenHandler = asyncHandler(async (req,res,next) => {
    let token;

    let accessToken = req.headers.authorization || req.headers.authorization;
    
    if(accessToken != null){
        token = accessToken.split(' ')[1];

        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (erro,decoded) => {
                if(erro){
                    res.status(403);
                    throw new Error("user not authorized");
                }
                req.user = decoded.user;
                next();
            }
        )
    }

    if(token == null){
        res.status(403);
        throw new Error("you don't have permission to access this page.");
    }

});

module.exports = jwtTokenHandler;