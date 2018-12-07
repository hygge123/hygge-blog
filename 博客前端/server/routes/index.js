import Router from 'koa-router'
import { base_API } from "../config"
import UserController from '../Controller/UserContorller'
// 引入验证token的合法性的方法
import checkToken from '../utils/checkToken'
// 引入文章相关的控制器
import ArticleConller from '../Controller/ArticleConller'
// 引入前台文章相关的控制器
import HomeController from '../Controller/HomeController'
// 引入前关于我相关的控制器
import AboutController from '../Controller/About'
// 引入tag相关的控制器
import TagController from '../Controller/introductions'

const router = new Router()
router.get('/index',async ctx=>{
    ctx.body = '欢迎使用vue-blog接口测试服务器!!!!!'
})
//所有的路由都写在这里就可以了
//前端所有的请求发过来的时候都是http://localhost:3000/api/.....
router.prefix(`${base_API}`)

// 登录
router.post('/login',UserController.login)
// 登出
// 只要是登录后才能看到的内容都需要验证一下token的合法性
router.get('/logout',checkToken,UserController.logout)
// 获取所有的文章
router.get('/articles',checkToken,ArticleConller.getArticles)
// 添加一篇新文章
router.post('/articles/add',checkToken,ArticleConller.addArticle)
// 查询一下最新发布的那篇文章的详细信息
router.get('/articles/:id',checkToken,ArticleConller.getOneArticle)
// 更新一篇新的文章
router.post('/articles/update/:id',checkToken,ArticleConller.updateArticle)
// 删除一篇新文章
router.delete('/articles/:id',checkToken,ArticleConller.deleteArticle)
// 发布文章
router.put('/articles/publish/:id',checkToken,ArticleConller.publishArticle)
// 查询关于我
router.get('/briefs',checkToken,AboutController.getAboutInfo)
// 修改关于我
router.put('/briefs/:id',checkToken,AboutController.setAboutInfo)
// 标签页
router.get('/tags',checkToken,TagController.getIntroductions)
// 标签页 - 修改标签
router.put('/settag/:id',checkToken,TagController.setTags)
// 标签页 - 删除标签
router.put('/deltag/:id',checkToken,TagController.delTags)




// 前台文章查询
router.get('/home',HomeController.getHomeList)
// 标签页
router.get('/introductions',HomeController.getTag)
// 阅读列表
router.get('/books',HomeController.getBooks)
// 关于我
router.get('/about',HomeController.getAbout)
// 查看特定文章
router.get('/article/:id',HomeController.getArticle)

export default router
