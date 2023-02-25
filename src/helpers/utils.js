const Joi = require('joi');

// const validateEmail = Joi.object({
//     username: Joi.string().min(4).max(255).required().email(),
//   });

//   const validatePassword = Joi.object({
//     password: Joi.string().min(6).max(1024).required(),
//   });

//   const { error } = schemaLogin.validate(req.body);
//   console.log(error)
//   // if(error){
//   //  return res.status(400).json({ error: error.details[0].message });
//   // }

const schemaEmail = Joi.string().email()

  const isEmail = (email) => {
    const {error} = schemaEmail.validate(email)
    return error ? false : true
  }

  module.exports = {
    isEmail
  }