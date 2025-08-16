import express from 'express';
import { generateBlogTitle, generateImage, genraterticel, removeBackGroundImage, removeImageObject, resumeReview } from '../controller/aicontroller.js';
import { auth } from '../middleware/auth.js';
import { upload } from '../config/multer.js';

const AiRouter=express.Router();


AiRouter.post('/generate-article',auth,genraterticel)
AiRouter.post('/generate-blog-title',auth,generateBlogTitle)
AiRouter.post('/generate-image',auth,generateImage)
AiRouter.post('/remove-imageback',upload.single('image'),auth,removeBackGroundImage)

AiRouter.post('/remove-image-object',upload.single('image'),auth,removeImageObject)
AiRouter.post('/review-resume',upload.single('resume'),auth,resumeReview)


export default AiRouter;