import query from '../utils/query'
import eacape from '../utils/eacape'
class introductions {
    async getTag() {
        return await query(`SELECT TAGS FROM ARTICLE`)
    }
    async setTags(id,{tags}) {
        return await query(eacape`UPDATE ARTICLE SET tags=${tags} WHERE id=${id}`)
    }
}
export default new introductions()