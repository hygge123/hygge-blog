import Article from '../model/HomeModel'

class HomeController {
    async getHomeList(ctx){
        ctx.body = await Article.getHomeList()
    }
    async getTag(ctx){
        ctx.body = await Article.getIntroductions()
    }
    async getBooks(ctx){
        ctx.body = await Article.getBooks()
    }
    async getAbout(ctx){
        ctx.body = await Article.getAbout()
    }
    async getArticle(ctx){
        const id = ctx.params.id
        ctx.body = await Article.getArticle(id)
    }
}
export default new HomeController()