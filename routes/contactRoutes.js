
const {getAllContacts,createNewContact,updateContact,getContact,deleteContact} = require('../controllers/conractController');
const jwtTokenHandler = require('../middleware/jwtTokenHandler');
const express = require('express');
const router = express.Router();


router.use(jwtTokenHandler);
router.route('/').get(getAllContacts).post(createNewContact);
router.route('/:id').put(updateContact).get(getContact).delete(deleteContact);

module.exports = router;