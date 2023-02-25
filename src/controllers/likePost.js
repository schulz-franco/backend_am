const Post = require("../models/Post");

const likePost = async (req, res)=> {
    const {postId} = req.body;
    let userId = req.user.id;
    try {
        // Busco el post
        const post = await Post.findOne({ _id: postId });
        const isLike = post.likes.includes(userId);
        // Si la id del usuario no existe en los likes
        console.log(post)
        if (!isLike) {
            post.likes = [...post.likes, userId]
            const data = await post.save()
            return res.status(200).send({
                data: data,
                message: "Comentario likeado"
            })
        }
        // Si existe
        else {
            post.likes = post.likes.filter( e => e !== userId)
            const data = await post.save()
            return res.status(200).send({
                data: data,
                message: "Comentario disslikeado"
            })
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports = likePost;
