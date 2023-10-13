const mongose = require('mongoose');

const UserSchema = mongose.Schema({
    name : {
        type : "string",
        required : [true,"name is required"]
    },
    email : {
        type : "string",
        required : [true,"email is required"]
    },
    password : {
        type : "string",
        required : [true,"password is required"]
    },
},{
    timestamp: true
});


module.exports = mongose.model("User",UserSchema);