const User = require("../models/User");
const Post = require("../models/Post");

const getUserData = async (req, res)=> {
    const { userId } = req.params;
    let user
    try {
        user = await User.findOne({ _id: userId });
    } catch {
        return res.status(404).send({
            error: true,
            message: "La ID de usuario no es válida."
        });
    }

    const countPublications = await Post.countDocuments({ "owner.id": user._id })

    const userDataResponse = {
        id: user._id,
        username: user.username,
        name: user.name,
        lastname: user.lastname,
        image: user.image,
        createdAt: user.createdAt,
        postsQuantity: countPublications
    }

    return res.status(200).send({
        data: userDataResponse
    });
}

module.exports = getUserData;