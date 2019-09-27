// them postModel
const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    
   imageUrl:{
       type:String,
       require:true,
   },
   view:{
       type:Number,
       default: 0,
   },
   content:{
       type: String,
       require:true,
   },
   // do chua dang nhap nen tam thoi bo author
//    author:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'Account',
//         // tam thoi chua dang nhap duoc nen ko có
//         //require:true,
//    },
   createdAt:{
       type: Date,
       default:new Date(),
   },
   price:{
        type:Number,
        default:0,
   },
})
const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;