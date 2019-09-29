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
   // them truong ten cua san pham
  name:{
      type:String,
      require:true,
  },
  // sua do UsersModel dat ten la Users
   author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        require:true,
   },
   createdAt:{
       type: Date,
       default:new Date(),
   },
   //them truong gia ca
   price:{
        type:Number,
        default:0,
        require:true,
   },
})
const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;