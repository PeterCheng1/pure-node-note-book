/*
*创建model @author Sheldon-Yee 
*/
const mongoose = require('mongoose')
const {blogSchema,categorySchema} = require('./schema');
//第一个参数表明collection的名字，
const BlogModel = mongoose.model('Blog',blogSchema);
const CategroyModel = mongoose.model('Category',categorySchema);
const $_saveBlog = blog =>{
    return new BlogModel(blog).save().then(_blog=>{
        return {
            state:1,//约定1为存储成功 -1失败
            data:_blog
        }
    })
}

const $_saveCategroy = categroy =>{
    return new CategroyModel(categroy).save().then(_category=>{
        return {
            state:1,//约定1为存储成功 -1失败
            data:_category
        }
    })
}

module.exports = {
    $_saveBlog ,
    $_saveCategroy
}