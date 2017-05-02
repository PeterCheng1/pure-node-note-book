/*
*创建model @author Sheldon-Yee 
*/
const mongoose = require('mongoose')
const {blogSchema,categorySchema} = require('./schema');//获取相关数据骨架，Schema
//第一个参数表明collection的名字，
const BlogModel = mongoose.model('Blog',blogSchema);//生成BolgModel，对应mongoDB的document
const CategroyModel = mongoose.model('Category',categorySchema);//生成CategoryModel，对应mongoDB的document

//分别定义不同数据库操作方法
const $_saveBlog = blog =>{
    // upsert ==> update + insert 
    let condiction = {title:blog.title};
    blog.date = new Date().toLocaleString();
   return  BlogModel.findOneAndUpdate(condiction,blog,{
        upsert:true,
        new:true
    }).then(blog=>{
        return {
            status : 1,
            data:blog
        }
    })
}
//保存博客列表
const $_saveCategroy = category =>{
    return CategroyModel.findOneAndUpdate({
        name:category.name
    },category,{
        upsert:true,
        new:true
    }).then(_category=>{
        return {
            status:1,
            data:_category
        }
    })
}
//获取博客列表
const $_getCategory = query =>{
    return CategroyModel.find(query).exec().then((categoryList)=>{
        return {
            status:1,
            data:categoryList || []
        }
    })
}
//获取博客详情
const $_getBlogDetail = query =>{
    let {id} = query;
    let condiction = {
        _id : mongoose.Types.ObjectId(id)
    }
    // let {id} = query;
    // id = mongoose.Types.ObjectId(id);
    return BlogModel.findOne(condiction).then(blog=>{
        return {
            status : 1,
            data:blog
        }
    })
}

//获取博客列表
const $_getBlogList = query =>{
    return BlogModel.find(query).exec().then(blogList=>{
        return {
            status : 1,
            data:blogList
        }
    })
}
//删除博客
const $_deleteBlog = query =>{
    let condiction = {
        _id : mongoose.Types.ObjectId(query.id)
    }
    return BlogModel.remove(condiction).exec().then(blog=>{
        return {
            status:1,
            data:'删除成功'
        }
    })
}

module.exports = {
    $_saveBlog ,
    $_saveCategroy,
    $_getCategory,
    $_getBlogDetail,
    $_getBlogList,
    $_deleteBlog
}