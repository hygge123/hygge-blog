import query from '../utils/query'
import escape from '../utils/eacape'
class AboutModel{
    async getContent(){
        return await query("SELECT *FROM ABOUT")
    }
    async updateContent(id,content){
        return await query(escape `UPDATE ABOUT SET content=${content} WHERE id=${id}`)
    }
}
export default new AboutModel