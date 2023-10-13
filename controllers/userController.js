const asyncHandler = require('express-async-handler');
const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

/**
 * get current userr
 * @url: api/users/current
 * @type: GET
 * @access private
*/
const currentUser = asyncHandler(async(req,res) => {
    res.send(req.user);
})


/**
 * create new user
 * @url: api/users/resigser
 * @type: POST
 * visility : public
*/
const registerUser = asyncHandler(async(req,res) => {

    const {name,email,password} = req.body;
    if(!name || !email || !password){
        res.status(422);
        throw new Error('input all required field');
    }
    const userAvailable = await UserModel.findOne({email});
    // console.log(userAvailable)
    if(userAvailable !== null){
        res.statusCode = 422;
        throw Error("user already available");
    }

    const hashPassword  = await bcrypt.hash(password,10);
    const user = await UserModel.create({
        name,
        email,
        password : hashPassword
    })

    if(user){
        res.send({id:user._id,email:user.email,name:user.name});
    }else{
        res.statusCode = 422;
        throw Error("user data is not valid");
    }

    
})
/**
 * create new user
 * @url: api/users/login
 * @type: POST
 * visility : public
*/
const loginUser = asyncHandler(async(req,res) => {

    const {email,password} = req.body;
        console.log(email,password);

    if(!email || !password){
        res.status(422);
        throw new Error("enter usernamd and password");
    }

    const user = await UserModel.findOne({email});

    if(!user){
        res.status(401).json({message: "user not found"});
    }

    //todo:: compare password

    if(await bcrypt.compare(password,user.password)){
      const accessToken = await jwt.sign(
           {
            user : {
                email : user.email,
                name: user.name,
                id: user._id
            }
           },
           process.env.ACCESS_TOKEN_SECRET,
           {expiresIn: "10m"}
        )
        res.status(200).json({access_token: accessToken});
    }else{
        res.status(401).json({message: "your credentials are wrong"});
    }

    //todo:: generate web token with user email, name, id
});


module.exports = {
    loginUser,registerUser,currentUser
} 