import query from '../utils/query'
class ArticleModel{
    async getHomeList(){
        return await query(`SELECT * FROM ARTICLE WHERE isPublished=1 ORDER BY createTime DESC`)
    }
    async getIntroductions() {
        return await query(`SELECT id,title,tags,publishTime FROM ARTICLE where isPublished=1 ORDER BY publishTime DESC`)
    }
    async getBooks() {
        return await query(`SELECT * FROM rd_list`)
    }
    async getAbout() {
        return await query(`SELECT * FROM ABOUT`)
    }
    async getArticle(id) {
        return await query(`SELECT * FROM ARTICLE WHERE id=${id}`)
    }}
export default new ArticleModel()