const user = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
 
const postLogin = async (req, res) => {
  try {
    const {mail, password} = req.body;
    
    const userLogin = await user.findOne({
       mail: mail.toLowerCase(),
    });

    if(userLogin && (await bcrypt.compare(password, userLogin.password))) {
      const token = "JWT_TOKEN";
      return res.status(200).json({
        userDetails: {
          username: userLogin.username,
          mail: userLogin.mail,
          token
        }
      })
    } ;
    return res.status(400).send('Invalid credentials!');
  } catch (error) {
    return res.status(500).send('An error ocurred. Please try again!  ')
  }
};

module.exports = postLogin;