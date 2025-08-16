import OpenAI from 'openai';
import sql from '../config/Db.js';
import { clerkClient } from '@clerk/express';
import axios from 'axios'
import {v2 as cloudinary} from 'cloudinary'
import FormData from 'form-data';

import fs from 'fs'
import { GoogleGenerativeAI } from "@google/generative-ai";
import pdf from 'pdf-parse/lib/pdf-parse.js'
const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

 



export const genraterticel = async (req, res) => {
  try {
    const { userId } = req.auth;
    const { prompt, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({ success: false, message: "Upgrade to continue" });
    }

    const response = await openai.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: length,
    });

    const content = response.choices[0].message.content;

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'article')
    `;

    if (plan !== 'premium') {
      await clerkClient.users.updateUser(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({ success: true, content });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth;
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({ success: false, message: "Upgrade to continue" });
    }

    const titlePrompt = `Generate a catchy blog title for: "${prompt}"`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(titlePrompt);
    const content = result.response.text();

    if (!content) {
      return res.status(500).json({
        success: false,
        message: "AI did not return a valid response. Please try again.",
      });
    }

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'blog_title')
    `;

    if (plan !== 'premium') {
      await clerkClient.users.updateUser(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({ success: true, content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth;
    const { prompt ,publish} = req.body;
    const plan = req.plan;
    if (plan !== "premium" ) {
      return res.json({ success: false, message: "this is available for premuim " });
    }

  const formData = new FormData();
formData.append('prompt', prompt);

const data = await axios.post(
  'https://clipdrop-api.co/text-to-image/v1',
  formData,
  {
    headers: {
   
      'x-api-key': process.env.CLICK_DROP_API,
    },
    responseType: 'arraybuffer',
  }
);

 

 const base64Image = `data:image/png;base64,${Buffer.from(data.data, 'binary').toString('base64')}`;
    const {secure_url}=await cloudinary.uploader.upload(base64Image)
       await sql`
      INSERT INTO creations (user_id, prompt, content, type,publish)
      VALUES (${userId}, ${prompt}, ${secure_url}, 'image',${publish ??false})
    `;

    res.json({ success: true, content: secure_url });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const removeBackGroundImage = async (req, res) => {
  try {
    const { userId } = req.auth; // معرف المستخدم
    const image = req.file; // الملف اللي جاي من multer
    const plan = req.plan; // خطة الاشتراك
   
    // ✋ التحقق من الخطة
    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is available for premium users only",
      });
    }

    // 📂 التحقق من وجود صورة
    if (!image) {
      return res.status(400).json({
        success: false,
        message: "No image file uploaded",
      });
    }

    // 🧠 رفع الصورة على Cloudinary
    const {  secure_url } = await cloudinary.uploader.upload(
      image.path,{
            transformation: [{ effect: `background_removal` ,background_removal:'remove_the_background'}],
      }
    );

  

    // 🗃️ حفظ النتيجة في قاعدة البيانات
 await sql`
  INSERT INTO creations (user_id, prompt, content, type)
  VALUES (${userId}, ${'remove the background from image'}, ${secure_url}, 'image')
`;


    // ✅ إرسال النتيجة للعميل
    res.json({ success: true, content: secure_url });

  } catch (error) {
    console.error("Remove background error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
  const { object } = req.body;

    const image = req.file; // الملف اللي جاي من multer
    const plan = req.plan; 
    // ✋ التحقق من الخطة
    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is available for premium users only",
      });
    }

    // 📂 التحقق من وجود صورة
    if (!image) {
      return res.status(400).json({
        success: false,
        message: "No image file uploaded",
      });
    }

    // 🧠 رفع الصورة على Cloudinary
    const {  public_id } = await cloudinary.uploader.upload(image.path );
  const imageUrl=  cloudinary.url(public_id,{
      transformation:[{effect:`gen_remove:${object}`}],
      resource_type:'image'
    })

  

    // 🗃️ حفظ النتيجة في قاعدة البيانات
 await sql`
  INSERT INTO creations (user_id, prompt, content, type)
  VALUES (${userId}, ${`remove ${object} from image`}, ${imageUrl}, 'image')
`;

    res.json({ success: true, content: imageUrl });

  } catch (error) {
    console.error("Remove background error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};



export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth(); // استخراج معرف المستخدم
    const resume = req.file;       // استخراج ملف الـ PDF
    const plan = req.plan;         // خطة الاشتراك

    console.log("req.auth:", req.auth);
    console.log("req.file:", req.file);
    console.log("req.plan:", req.plan);

    // التحقق من الخطة
    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is available for premium users only",
      });
    }

    // التحقق من وجود الملف
    if (!resume) {
      return res.status(400).json({ success: false, message: "No resume uploaded" });
    }

    // التحقق من حجم الملف
    if (resume.size > 5 * 1024 * 1024) {
      return res.json({ success: false, message: "Resume file exceeds allowed size (5MB)" });
    }

    // قراءة محتوى PDF
    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdf(dataBuffer);

    const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement:\n\n${pdfData.text}`;

    // استدعاء Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);

    const content = result.response.text();

    if (!content) {
      return res.status(500).json({
        success: false,
        message: "AI did not return a valid response. Please try again.",
      });
    }

    // حفظ النتيجة في قاعدة البيانات
    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resume_review')
    `;

    // إرسال النتيجة للعميل
    res.json({ success: true, content });
  } catch (error) {
    console.error("Resume review error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};