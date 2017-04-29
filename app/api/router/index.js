/*
*创建路由   
*@author:Sheldon-Yee
*构想 
*router.get('/blogDetail.action',(ctx)=>{
*   return blog数据
*})
*router.post('/User.action',(ctx)=>{
*   return 用户数据
*})
*/
    class Router{
        constructor(){
            this.routerMap = {
                'get' :{},
                'post' :{}
            }
        }
        get(pathname,handle){
            let getMap = this.routerMap.get;
            getMap[pathname] = handle;
        }

        post(pathname,handle){
            let postMap = this.routerMap.post;
            postMap[pathname] = handle;
        }
        //对接response 和 request
        routes(ctx){
            let {pathname,method} = ctx.reqCtx;
            if(method === 'get' || method === 'post'){
                let handle = this.routerMap[method][pathname];
                if(handle){
                    return Promise.resolve(handle(ctx));
                }else{
                    return  Promise.resolve();
                }
            }else{
                return Promise.resolve();
            }
        }
    }

    module.exports = new Router();



