const User = require("../models/User");
const jwt = require("jsonwebtoken");
const fs = require("fs");

// Devuelve false para error y true para válido
const validateNames = (name, lastname)=> {
    const concatenate = name + lastname;
    // Si el nombre o apellido contienen numeros o caracteres especiales
    if (/\W/g.test(concatenate) || /[0-9]/g.test(concatenate)) {
        return false;
    } else if (name.length > 20 || lastname.length > 20) {
        return false;
    }
    return true;
}

const updateUser = async (req, res) => {
    const { user, file } = req;
    const { name, lastname } = req.body;

    // No use un try porque el usuario se recibe desde el token por lo que debe existir si o si
    const findUser = await User.findOne({ _id: user.id });
    // Validaciones
    if (validateNames(name, lastname)) {
        findUser.name = name;
        findUser.lastname = lastname;
    } else {
        // Multer sube los archivos siempre, en caso de errores borro el archivo subido
        if (file) fs.unlinkSync(file.path);
        return res.status(400).send({
            error: true,
            message: 'El nombre o apellido no son válidos.'
        })
    }

    // Si existe una imagen
    if (file) {
        // Validaciones
        const fileType = file.mimetype.split('/')[1];
        if (fileType !== 'png' && fileType !== 'jpeg' && fileType !== 'webp') {
            fs.unlinkSync(file.path);
            return res.status(400).send({ error: true, message: 'La imagen no es válida' });
        }
        // Si el usuario ya guardo una imagen previamente
        if (findUser.image) {
            // Extraigo el nombre del archivo
            const fileName = findUser.image.replace('/profiles/', '');
            // Lo elimino
            fs.unlinkSync('public/profiles/' + fileName);
        }
        // Guardo la nueva imagen
        fs.renameSync(file.path, 'public/profiles/' + findUser._id.toString() + '.' + fileType);
        findUser.image = '/profiles/' + findUser._id.toString() + '.' + fileType;
    }

    try {
        saveUser = await findUser.save()
        const token = jwt.sign({
                id: saveUser._id,
                username: saveUser.username,
                name: saveUser.name,
                lastname: saveUser.lastname,
                image: saveUser.image,
                email: saveUser.email
            },
            process.env.TOKEN_SECRET
        );
        // Devuelvo un nuevo token porque en el front los datos del usuario se extraen desde ahi para que persista la sesion
        return res.status(200).send({ message: 'Los datos se actualizaron correctamente.', token })
    } catch (error) {
        if (file) fs.unlinkSync(file.path);
        return res.status(400).send({ error: true, message: 'Ocurrio un error al guardar los datos.' })
    }
}

module.exports = updateUser;