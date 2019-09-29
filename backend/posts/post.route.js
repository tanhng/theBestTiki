const express = require('express');
const PostsModel = require('./post.model');
const joi = require('@hapi/joi');
const postRouter = express.Router();

postRouter.post('/create-post', async (req, res) => {
    try {
        const newPost = await PostsModel.create({
            imageUrl: req.body.imageUrl,
            content: req.body.content,
            //author: req.session.currentUser._id
        });
        res.status(200).json({
            success: true,
            message: "upload successed",
            data: newPost
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });

    }
})

postRouter.get('/get/posts', async (req, res) => {
    try {
        console.log('test1');
        // offset paging => pageNumber | pageSize => limit | skip
        const pageNumber = Number(req.query.pageNumber);
        const pageSize = Number(req.query.pageSize);
        const validateSchema = joi.object().keys({
            pageNumber: joi.number().min(1),
            pageSize: joi.number().min(1).max(50),
        });
        const validateResult = validateSchema.validate({
            pageNumber: pageNumber,
            pageSize: pageSize,
        });
        if (validateResult.error) {
            const error = validateResult.error.details[0];
            res.status(400).json({
                success: false,
                message: error.message,
            });
        } else {
            console.log('test 2');
            // get data
            const result = await PostsModel.find({})
                .sort({ createdAt: -1 })
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize)
                .lean();
            console.log('result ne', result);
            const total = await PostsModel.find({}).countDocuments();
            console.log('total', total);
            res.status(200).json({
                success: true,
                data: {
                    data: result,
                    total: total,
                },
            });
            console.log('test 3');
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
});

module.exports = postRouter;