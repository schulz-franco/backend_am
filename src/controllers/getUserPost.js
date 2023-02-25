const Post = require("../models/Post");
const User = require("../models/User");

const getUserPost = async (req, res) => {
    const { page, userId } = req.params;
        
    // Si el userId no existe => 404
    try {
      const user = await User.find({ _id: userId });
    } catch {
      return res.status(404).send({
        error: true,
        message: "El usuario no existe"
      })
    }

    const countPosts = await Post.countDocuments({ "owner.id": userId });
    const result = await Post.find({ "owner.id": userId }, null, {
      skip: parseInt(page * 10),
      limit: 10,
      sort: { createdAt: -1 },
    });
    return res.status(200).send({ data: result, total: countPosts });
};

module.exports = getUserPost;
