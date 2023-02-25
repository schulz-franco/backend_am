const Post = require("../models/Post");

const getAllPost = async (req, res) => {
    const {page} = req.params;
    try {
        const countDocuments = await Post.countDocuments({})
        const result = await Post.find({}, null, { skip: parseInt(page * 10), limit: 10, sort: { createdAt: -1 } });
        return res.status(200).send({ data: result, total: countDocuments });
    } catch (error) {
        return res.status(400).json({ error })
    }
}

module.exports = getAllPost;