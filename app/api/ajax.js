/*
*采用mongoose处理ajax
* @Author SheldonYee
*/

let Router = require('./router');

let {$_saveBlog , $_saveCategroy} = require('./mongo');
//获取分类列表
Router.get('/categoryList.action',(ctx)=>{
   
});
//增加分类
Router.get('/category.action',(ctx)=>{
     let category = ctx.reqCtx.query;
    return $_saveCategroy(category);
});
//添加博客
Router.post('/blog.action',(ctx)=>{
    let blog = ctx.reqCtx.body;
    return $_saveBlog(blog);
});
///categoryList.action
///blog.action
///category.action

module.exports = Router;