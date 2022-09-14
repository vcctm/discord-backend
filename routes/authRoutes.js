const express = require('express');
const {controllers} = require('../controllers/auth/authControllers')
const router = express.Router();

router.post('/register', controllers.postRegister);
router.post('/login', controllers.postRegister);

module.exports = router;