const User = require("../models/User");
const bcrypt = require("bcrypt");

const registerController = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // Usuario existente
  const isUserExist = await User.findOne({ username: username });
  if (isUserExist) {
    return res.status(400).send({
      message: "Este usuario ya fue registrado",
      error: "Registro invalido",
    });
  }

  // Mail existente
  const isEmailExist = await User.findOne({ email: email });
  if (isEmailExist) {
    return res.status(400).send({
      message: "Este mail ya fue registrado",
      error: "Registro invalido",
    });
  }

  // Confirmar password
  if (password !== confirmPassword) {
    return res.status(400).send({
      message: "Las contraseñas no coinciden",
      error: "Registro invalido",
    });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    username: username,
    email: email,
    password: passwordHash,
  });
  try {
    const savedUser = await user.save();
    return res.status(201).send({
      data: savedUser,
      message: "Usuario creado correctamente",
      error: null,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = registerController;
