import express from 'express';
import { auth } from '../middleware/auth.js';
import { getPublishedCreation, getUserCreation, toggleLikeCreations } from '../controller/usercontroller.js';

const userRouter=express.Router();

userRouter.get('/get-users-creations',auth,getUserCreation)
userRouter.get('/get-poublished-creations',auth,getPublishedCreation)
userRouter.post('/toggle-like', auth, toggleLikeCreations);


export default userRouter