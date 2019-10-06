const express = require('express');
const PostsModel = require('./post.model');
const joi = require('@hapi/joi');
const postRouter = express.Router();
const UsersModel = require('../models/users.model');
postRouter.post('/create-post', async (req, res) => {
    if (!req.session.currentUser || !req.session.currentUser.email) {
        res.status(500).json({
            success: false,
            message: 'forbidden'
        })
    }
    else {
        const postValidateSchema = joi.object().keys({
            imageUrl: joi.string().required(),
            content: joi.string().required(),
            price: joi.number().required(),
            name: joi.string().required(),
        })
        try {
            const newPost = await PostsModel.create({
                imageUrl: req.body.imageUrl,
                content: req.body.content,
                author: req.session.currentUser._id,
                price: req.body.price,
                name: req.body.name,
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
    }

})



postRouter.post('/deleteCart', async (req, res) => {


    try {
        console.log('cái để delete',req.body);
        id=req.body.postDelete._id;
        idUser=req.body.postDelete.author._id
        let money = 0;
        let order=[];



        UsersModel.findById(idUser, function (err, user) {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                }
                );
            }
            else {order=user.orderList;
                console.log('orderList ne',order);
                console.log('user ne', user);
                money = user.moneyInCart - req.body.postDelete.price;
                console.log('money delete ne', money);
               var newOrder= order.filter(function(x){
                return x._id != id ;
            });
            console.log('orderList sau delete ne',newOrder);
                UsersModel.findByIdAndUpdate(idUser, { moneyInCart: money,orderList: newOrder }, function (err, model) {
                    if (err) {
                        res.status(500).json({
                            success: false,
                            message: error.message,
                        }
                        );
                    } else {
                        console.log('model sau delete ne', model);
                        res.status(200).json({
                            success: true,
                            data: model
                        }
                        );
                    }
                });

              


            }
        })




    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });

    }


})




postRouter.post('/cart', async (req, res) => {


    try {
        console.log(req.body)
        console.log('price ne', req.body.postAdded.price)
        console.log('Id ne', req.body.postAdded.author._id)
        let id = req.body.postAdded.author._id
        let money = 0;
        let order=[];
        UsersModel.findById(id, function (err, user) {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                }
                );
            }
            else {order=user.orderList;
                order.push(req.body.postAdded);
                console.log('orderList ne',order);
                console.log('user ne', user);
                money = user.moneyInCart + req.body.postAdded.price;
                console.log('money ne', money);
                UsersModel.findByIdAndUpdate(id, { moneyInCart: money,orderList: order }, function (err, model) {
                    if (err) {
                        res.status(500).json({
                            success: false,
                            message: error.message,
                        }
                        );
                    } else {
                        console.log('model ne', model)
                    }
                });

            }
        })




        res.status(200).json({
            success: true,
            message: 'ahihi',
            data: req.body.selectedPost
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
                .populate('author', '_id name email')
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



postRouter.get('/gets/carts', async (req, res) => {
    try {
        
        {
            console.log('user current test',req.session.currentUser);
            id=req.session.currentUser._id;
        
            // get data
             UsersModel.findById(id,function(err,user){
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: error.message,
                    }
                    );
                }
                else {
                    console.log('user get cart ne',user.orderList);
                    res.status(200).json({
                        success: true,
                        data: {
                            data: user.orderList,
                           
                        },
                    });
                }
             })
                
           
        
            
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