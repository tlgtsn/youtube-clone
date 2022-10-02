import express from 'express';
import { addVideo, addView, deleteVideo, getByTag, getVideo, random, search, sub, trend, updateVideo } from '../controllers/video.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

//* CREATE A VIDEO
router.post('/', verifyToken, addVideo);

//* UPDATE A VIDEO
router.put('/:id', verifyToken, updateVideo);

//* DELETE A VIDEO
router.delete('/:id', verifyToken, deleteVideo);

//* GET A VIDEO
router.get('/find/:id', getVideo);

//* VIDEO VIEW COUNTER
router.put('/view/:id', addView);

//* RANDOM VIDEO
router.get('/random', random);

//* TREND VIDEO
router.get('/trend', trend);

//* SUB VIDEO
router.get('/sub',verifyToken, sub);

//* GET BY TAG VIDEO
router.get('/tags', getByTag);

//* SEARCH VIDEO
router.get('/search', search);

export default router;