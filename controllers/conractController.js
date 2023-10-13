const asyncHandler = require('express-async-handler');
const ContactModel = require('../models/Contact');
/**
 * 
 * @desc get all contacts
 * @access public
 * @route GET /api/contacts
 * 
*/

const getAllContacts = asyncHandler( async (req,res) => {
    const contacts = await ContactModel.find({user_id : req.user.id});
    res.status(200).json(contacts)
})


/**
 * 
 * @desc create new contact
 * @access public
 * @route POST /api/contacts
 * 
*/

const createNewContact = asyncHandler (async (req,res) => {

    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.statusCode = 422;
        throw Error("enter all the fields");
    }
    
    const contact = await ContactModel.create({
        user_id: req.user.id,
        name,email,phone
    });

    res.status(201).json(contact)
})


/**
 * 
 * @desc update existing contact
 * @access public
 * @route PUT /api/contacts/:id
 * 
*/

const updateContact = asyncHandler (async (req,res) => {
    const contact = await ContactModel.findById(req.params.id);
    if(!contact){
        res.statusCode = 404;
        throw new Error("contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.statusCode = 403;
        throw new Error("user not autorized");
    }

    const updatedContact = await ContactModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    )
    res.status(201).json(updatedContact)
})

/**
 * 
 * @desc get contact
 * @access public
 * @route POST /api/contacts/:id
 * 
*/

const getContact = asyncHandler( async (req,res) => {
    const contact = await ContactModel.findById(req.params.id);
    // console.log(contact);
    if(!contact){
        res.statusCode = 404
        throw new Error("contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.statusCode = 403;
        throw new Error("user not autorized");
    }
    
    res.status(201).json(contact)
}) 


/**
 * 
 * @desc delete contact
 * @access public
 * @route POST /api/contacts/:id
 * 
*/

const deleteContact = asyncHandler(async (req,res) => {
    const contact = await ContactModel.findById(req.params.id);
    if(!contact){
        console.log(contact);
        res.status(404);
        throw new Error("contact not found");
    }
    await ContactModel.deleteOne();
    res.status(204).json(contact);
});


module.exports = {
    getAllContacts,
    createNewContact,
    updateContact,
    getContact,
    deleteContact
};