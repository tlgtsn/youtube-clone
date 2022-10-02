import User from "../models/User.js";
import Video from "../models/video.js";
import { createError } from "../utils/error.js";

//* CREATE A VIDEO
export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    res
      .status(200)
      .json(savedVideo)
  } catch (error) {
    next(error);
  }
}

//* UPDATE A VIDEO
export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));
    if (req.user.id === Video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
        $set: req.body
      },
        { new: true });
      res.status(200).json(updatedVideo);
    } else {
      return next(createError(403, "You can update only your video!"));
    }
  } catch (error) {
    next(error);
  }
}

//* DELETE A VIDEO
export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));
    if (req.user.id === Video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("Video has been deleted!");
    } else {
      return next(createError(403, "You can delete only your video!"));
    }
  } catch (error) {
    next(error);
  }


}

//* GET A VIDEO
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
}

//* VIDEO VIEW COUNTER
export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 }
    }, { new: true });
    res.status(200).json("The view has been incremented!");
  } catch (error) {
    next(error);
  }
}

//* RANDOM VIDEO
export const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
}

//* TREND VIDEO
export const trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 }).limit(40);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
}

//* SUB VIDEO
export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map(async (channelId) => {
        return await Video.find({ userId: channelId });
      })
    );

    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};

//* GET BY TAG VIDEO
export const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
}

//* SEARCH VIDEO
export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({ title: { $regex: query, $options: "i" } }).limit(40);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
}