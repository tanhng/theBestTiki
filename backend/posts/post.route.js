const express = require('express');
const postModel = require('./post.model');
//const joi = require('@hapi/joi');
const postRouter = express.Router();
postRouter.post('/create-post', async (req,res) => {
    try {
        const newPost = await postModel.create({
            imageUrl: req.body.imageUrl,
            content: req.body.content,
            //author: req.session.currentUser._id
        });
        res.status(200).json({
            success: true,
            message:"upload successed",
            data: newPost
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    
}})
module.exports = postRouter;