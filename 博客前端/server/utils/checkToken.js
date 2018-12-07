// import jwt from 'jsonwebtoken'
// import { secret } from "../config"
//
// export default async function(ctx,next){
//     const XToken = ctx.get('X-Token');
//     console.log(XToken);
//     if (XToken === '') {
//         /* ctx.throw(401, "no token detected in http header 'X-Token'");*/
//         ctx.body = {
//             code:401,
//             message:'请求头里面没有对应的token信息'
//         }
//     }
//     let tokenContent
//     try {
//         tokenContent = await jwt.verify(XToken, secret)//如果token过期或验证失败，将抛出错误
//         next()
//     }catch(err){
//         /*ctx.throw(401, 'invalid token');*/
//         if(err){
//             ctx.body = {
//                 code:401,
//                 message:'token已过期,请重新登录'
//             }
//         }
//     }
// }



// import jwt from 'jsonwebtoken'
// import { secret } from "../config"
// export default async function(ctx,next){
//     const XToken = ctx.get('X-Token');
//     console.log(XToken);
//     if (XToken === '') {
//         /* ctx.throw(401, "no token detected in http header 'X-Token'");*/
//         ctx.body = {
//             code:40001,
//             message:'请求头里面没有对应的token信息'
//         }
//     }
//     let tokenContent
//     try {
//         tokenContent = await jwt.verify(XToken, secret)//如果token过期或验证失败，将抛出错误
//         next()
//     }catch(err){
//         /*ctx.throw(401, 'invalid token');*/
//         if(err){
//             ctx.body = {
//                 code:40001,
//                 message:'token已过期,请重新登录'
//             }
//         }
//     }
// }



import jwt from 'jsonwebtoken'
import {
    secret
} from "../config"

export default async function (ctx, next) {
    const XToken = ctx.get('X-Token');
    if (XToken === '') {
        /* ctx.throw(401, "no token detected in http header 'X-Token'");*/
        ctx.body = {
            code: 40001,
            message: '请求头里面没有对应的token信息'
        }
    }
    let tokenContent
    try {
        tokenContent = await jwt.verify(XToken, secret) //如果token过期或验证失败，将抛出错误
        await next()
    } catch (err) {
        if (err.message == 'jwt expired') {
            /*ctx.throw(401, 'invalid token');*/
            ctx.body = {
                code: 40001,
                message: 'token已过期,请重新登录'
            }
        } else {
            ctx.throw(500) // 直接抛出500的错误，在所有加上checkToken的代码里面
            // 抛给了前端的response拦截器
        }
    }
}
