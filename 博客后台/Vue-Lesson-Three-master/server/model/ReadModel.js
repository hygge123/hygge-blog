import query from '../utils/query'
import eacape from '../utils/eacape'

class ReadModel{
    async getbooks(){
        return  await query('SELECT * FROM RD_LIST')
    }
    async addBooks(name,author,score){
        return  await  query(`INSERT INTO RD_LIST SET name= '${name}',author='${author}',score='${score}' ` )
    }
    async updateRead(id,{name,author,score}){

        return await query(`UPDATE RD_LIST SET name = '${name}', author = '${author}',score='${score}' WHERE id = '${id}'`)
    }
    async removList(id){
        return  await query(`DELETE FROM RD_LIST WHERE id = '${id}'`)
    }
}
export default new ReadModel()