import query from '../utils/query'
import eacape from '../utils/eacape'
class AboutModel {
    async getAboutInfo(){
        return await query(`SELECT * FROM ABOUT`)
    }
    async setAboutInfo(id,{content}){
        return await query(eacape`UPDATE ABOUT SET content=${content} where id=${id}`)
    }
}
export default new AboutModel()