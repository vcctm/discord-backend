const express = require('express');
const {controllers} = require('../controllers/auth/authControllers')
const router = express.Router();
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});


// validation with Joi
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  password: Joi.string().min(6).max(12).required(),
  mail: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  mail: Joi.string().email().required(),
})

router.post('/register', validator.body(registerSchema), controllers.postRegister);
router.post('/login', validator.body(loginSchema), controllers.postLogin);

module.exports = router;