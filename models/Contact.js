const mongoose = require('mongoose');

const Contact = mongoose.Schema({
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name : {
        type: "string",
        required: [true,"name is required"]
    },
    email : {
        type: "string",
        required: [true,"email is required"]
    },
    phone : {
        type: "string",
        required: [true,"phone is required"]
    }
},{
    timestamps: true
});

module.exports = mongoose.model("Contact",Contact);