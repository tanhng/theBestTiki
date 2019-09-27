const express = require('express');
const multer = require('multer');
const uploadRouter = express.Router();
const fs = require('fs');
// const upload = multer({
//     dest: 'public/'
// })
const multerStorage = multer({
    dest: 'public/',
    // fileFilter: (req,file,cb) => {
    //     console.log(req.file);
    //     console.log(file);
    // },
    // limits:{},
    // preservepath: true,
});
uploadRouter.post('/photos', multerStorage.single('image'),async (req,res) => {
    console.log(req.file);

    //rename
        const fileExt = req.file.originalname.split('.');
        const ext = fileExt[fileExt.length - 1];
        fs.renameSync(req.file.path, `public/${req.file.filename}.${ext}`);
        console.log(`public/${req.file.filename}.${ext}`);
    //return url
    res.status(200).json({
        success: true,
        data: `/${req.file.filename}.${ext}`
    })
});
 
module.exports = uploadRouter;