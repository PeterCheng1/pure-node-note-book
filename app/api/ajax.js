/*
*采用mongoose处理ajax
* @Author SheldonYee
*/

//获取router，将相应的path和handle对应起来，并且存入router映射表中
//mongo文件主要是用mongoose定义了数据库相关方法

let Router = require('./router');

let {$_saveBlog , 
    $_saveCategroy,
    $_getCategory,
    $_getBlogDetail,
    $_getBlogList,
    $_deleteBlog
} = require('./mongo');
//获取分类列表
Router.get('/categoryList.action',(ctx)=>{
   return $_getCategory()
});
//增加分类
Router.post('/category.action',(ctx)=>{
     let category = ctx.reqCtx.body;
    return $_saveCategroy(category);
});
//添加博客
Router.post('/blog.action',(ctx)=>{
    let blog = ctx.reqCtx.body;
    return $_saveBlog(blog);
});

//博客详情页
Router.get('/blogDetail.action',(ctx)=>{
    let {query} = ctx.reqCtx;
    return $_getBlogDetail(query);
})
//获取博客列表
Router.get('/blogList.action',(ctx)=>{
    let {query} = ctx.reqCtx;
    return $_getBlogList(query)
})
//删除博客
Router.post('/deleteBlog.action',(ctx)=>{
    let body = ctx.reqCtx.body;
    return $_deleteBlog(body);
})
///categoryList.action
///blog.action
///category.action

module.exports = Router;