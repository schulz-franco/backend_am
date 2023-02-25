const Post = require("../models/Post");
const fs = require('fs');

const createPost = async (req, res) => {
    const {user, file} = req
    const {content} = req.body

    // Si el posteo no tiene mensaje ni imagen.
    if (!content && !file) {
        return res.status(400).send({ error: true, message: 'El posteo no tiene contenido' });
    }
    if (content.length > 200) {
        if (file) fs.unlinkSync(file.path);
        return res.status(400).send({ error: true, message: 'El contenido excede los 200 caracteres' });
    }
    const newPost = new Post({
        owner: {
            id: user.id,
            username: user.username,
            name: user.name,
            lastname: user.lastname,
            image: user.image
        },
        content
    })
    if (file) {
        // Verifico el tipo de archivo
        const fileType = file.mimetype.split('/')[1]
        if (fileType !== 'png' && fileType !== 'jpeg' && fileType !== 'webp') {
            return res.status(400).send({ error: true, message: 'La imagen no es válida' });
        }
        // Renombro la imagen guardada con el id del post y le agrego la extension de archivo
        fs.renameSync(file.path, 'public/images/' + newPost._id.toString() + '.' + fileType);
        newPost.image = '/images/' + newPost._id.toString() + '.' + fileType;
    }
    try {
        const savePost = await newPost.save();
        return res.status(200).send({
            data: savePost,
            message: 'Publicación creada correctamente'
        });
    } catch (error) {
        if (file) fs.unlinkSync(file.path);
        return res.status(400).send({ error, message: "Hubo un problema y no se guardo el posteo" });
    }
}

module.exports = createPost;