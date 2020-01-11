const userDao = require('../DbQueries/userDAO');
const userToken = require('../Functions/jwtToken');

const login = async(req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
  
      if (!email || !password) {
        console.log(`Missing parameters`);
        return res.status(404).send({
          status: false,
          message: 'Login parameters missing'
        });
      }
  
      const where = {
        email: email
      }
      const user = await userDao.findBy(where);
      if (!user) {
        console.log(`User doesn’t exist with email ${email}`);
        return res.status(404).send({
          status: false,
          message: 'user does not exists with this email'
        });
      }
  
      const validPassword = user.comparePassword(password);  
      if (!validPassword) {
        console.log(`Invalid password with email ${email}`);
        return res.status(404).send({
          status: false,
          message: 'Invalid password provided by user'
        });
      }
  
      if (validPassword && user) {
        const token = await userToken.createToken(user); //todo
  
        const update = {
          token: token
        }
        await userDao.update(where, update); //todo
        
  
        console.log(`Login successfully by email ${email} and token ${token}`);
        return res.status(200).send({
          status: true,
          message: 'Login success',
          token: token,
        });
      }
      return;
    } catch(err) {
      console.log(`Error caught in login catch block ${err}`);
      res.status(404).send({
        status: false,
        message:  `Error catch in login catch block ${err}`
      });
    }
}

// const generateResetLink = async(req, res) => {
//   try{

//   }
//   catch(err) {
//     console.log(`Error caught in generateResetLink catch block ${err}`);
//       res.status(404).send({
//         status: false,
//         message:  `Error catch in generateResetLink catch block ${err}`
//       });
//   }
// }
  
  module.exports = {
    login
  }