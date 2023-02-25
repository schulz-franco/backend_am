const Post = require("../models/Post");

const commentsPostController = async (req, res) => {
  const { id, comment } = req.body;
  
  const commentObject = {
    owner: req.user,
    comment,
    date: Date(),
  };

  try {
    const document = await Post.findOne({ _id: id });
    document.comments = [...document.comments, commentObject];
    document.save();
    return res.status(200).send({
      message: "Posteo comentado con exito",
      data: commentObject,
      error: null,
    });
  } catch (error) {
    return res.status(200).send({
      message: "El posteo no pudo ser comentado",
      data: null,
      error: error,
    });
  }
};

module.exports = commentsPostController;
