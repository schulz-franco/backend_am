const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
require("dotenv").config();

const loginController = async (req, res) => {
  const { username, password } = req.body;
  let user
  // Si se ingreso un mail o usuario que no esta en la base.
  try {
    user = await User.findOne({
      $or: [
        {
          email: username,
        },
        {
          username: username,
        },
      ],
    });
  } catch {
    return res.status(404).send({
      message: "El usuario/mail no fue encontrado",
      error: "Login fallido",
    });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).send({
      message: "La contraseña no es valida",
      error: "Login fallido",
    });

  // Token
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      name: user.name,
      lastname: user.lastname,
      image: user.image,
      email: user.email
    },
    process.env.TOKEN_SECRET
  );

  res.header("auth-token", token).status(200).send({
    data: user,
    message: "Login exitoso",
    error: null,
    token: token,
  });
};

module.exports = loginController;
