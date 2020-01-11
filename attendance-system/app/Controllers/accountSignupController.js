const userDao = require('../DbQueries/userDAO');
const userToken = require('../Functions/jwtToken');
const emailService = require('../utils/emailService.js');

const signup = async(req, res) => {
    try {
      const body = req.body;

      if (!body.email || !body.password) {
        logger.error(`Missing parameters`);
        return res.status(404).send({
          status: false,
          message: 'Signup parameters missing'
        });
      }
      const isStudent = req.query.isStudent;

      const where = {
        email: body.email
      }
      const user = await userDao.findBy(where); //todo
      if (user) {
        console.log(`Account already exist with email: ${body.email}`);
        return res.status(404).send({
          status: false,
          message: 'The signed up account already exists'
        });
      }
  
      const createAccount = await userDao.create(body); //todo.
      if (createAccount) {
        console.log(`Account is created with email ${createAccount.email}`);
        const token = await userToken.createToken(createAccount); //todo
        console.log(`Account JWT token is ${token}`);
        const update = {
          token: token
        }
        const success = await userDao.update(where, update); //todo.

        const updateUserLevel = {
            isStudent: isStudent
        }

        if (success.ok) {
          console.log(`Acount JWT token is saved in DB success: ${success.ok}`);
          // mailer
          const successUserUpdate = await userDao.update(where,updateUserLevel);
          if(successUserUpdate) {
              console.log(`user status is updated to ${isStudent}`);
              await emailService.sendWelcomeEmail(body.email); //todo
            return res.status(200).send({
                status: true,
                message: 'Signup successfully done',
                token: token,
                isStudent: isStudent,
                verification: 0
            });
          }  
        }
      }
    } catch(err) {
      logger.error(`Error caught in signup catch block ${err}`);
      res.status(404).send({
        status: false,
        message: `Error caught in catch block ${err}`
      });
    }
  }
  module.exports = {
    signup
  }