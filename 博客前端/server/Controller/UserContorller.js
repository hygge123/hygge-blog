// const login = async ctx=>{
//
// }
//
//
// export default {
//     login,
// }

// 这是我们以前的写法,通常我们会把处理过程写成函数,直接暴露函数即可
// 以后,我们在写方法的时候,直接要使用ES6 class类

import User from '../model/UserModel'
import md5 from 'md5'
import createToken from "../utils/createToken"


class UserContorller {
    // 登录逻辑的处理在这里
    async login(ctx){
        let user = ctx.request.body.user
        let password = ctx.request.body.password
        // 1.验证用户名\密码是否合法
            // 验证省略了
            // 检查用户是否合法
            // 所有的对于数据库的操作,我们不在控制器里面完成,

        // 2.检查用户名是否存在
        const res = (await User.getUserByName(user))[0]
        if (res){
            // 如果存在
            // 检查密码是否正确
            if (res.password === md5(password)){
                // 生成token
                // 最后返回token
                let token = createToken(res.user)
                ctx.body = {
                    success: true,
                    message: '登录成功',
                    token: token
                }
            }else{
                ctx.body = {
                    success: false,
                    message: '密码错误,请重新填写.....'
                }
            }
        }else{
            ctx.body = {
                success: false,
                message: '用户名不存在,请重新填写......'
            }
        }
        // 3.检查密码是否正确

        // 4.生成token

        // 5.最后返回token

    }
    async logout(ctx){
        ctx.body = {
            success: true,
            message: '退出成功'
        }
    }
}
export default new UserContorller()