const bcrypt = require('bcryptjs');
const user = require('../../models/user');

const postRegister = async (req, res) => {
  try {
    const {username, mail, password} = req.body;
    
    // check if user exists
    const userExists = await user.exists({
      mail: mail.toLowerCase(),
    })
    if (userExists) {
      return res.status(409).send('E-mail already in use.');
    }

    // encrypt password for database
    const encryptedPassword = await bcrypt.hash(password, 10);

    // create user document and save in database
    const userForSave = await user.create({
      username,
      mail: mail.toLowerCase(),
      password: encryptedPassword
    })

    // create JWT token and return
    const token = 'JWT token';

    res.status(201).json({
      userDetails: {
        mail: userForSave.mail,
        token,
        username: userForSave.username
      }
    })

  } catch (error) {
    return res.status(500).send("Error ocurred. Please try again.");
  }
};

module.exports = postRegister;