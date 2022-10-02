import Comment from '../models/comment.js';
import Video from '../models/video.js';

//* ADD A COMMENT
export const addComment = async (req, res, next) => {
  const newComment = new Comment({ userId: req.user.id, ...req.body });
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (error) {
    next(error);
  }
}

//* DELETE A COMMENT
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(req.params.id);
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json('The comment has been deleted!');
    } else {
      return next(createError(403, 'You can delete only your comment!'));
    }
  } catch (error) {
    next(error);
  }
}

//* GET COMMENTS
export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};