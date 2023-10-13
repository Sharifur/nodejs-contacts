const express = require('express');
const {loginUser,registerUser,currentUser}  = require('../controllers/userController');
const jwtTokenHandler = require('../middleware/jwtTokenHandler');
const router = express.Router();

router.post('/login', loginUser)
router.post('/register',registerUser);
router.get('/current',jwtTokenHandler, currentUser);

module.exports = router;