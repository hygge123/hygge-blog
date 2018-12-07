import ReadModel from '../model/ReadModel'
class  ReadController{
    async getbooks(ctx){
        const books = await ReadModel.getbooks()
        ctx.body = books;
    }
    async addBooks(ctx){
        const name = ctx.request.body.name;
        const author = ctx.request.body.author;
        const score = ctx.request.body.score;

        const res = await ReadModel.addBooks(name,author,score);
        ctx.body = res ;
    }
    async updateRead(ctx){
        const id = ctx.request.body.id;
        const name = ctx.request.body.name;
        console.log(name)
        const author = ctx.request.body.author;
        const score = ctx.request.body.score;
        const res= await ReadModel.updateRead(id,{name,author,score});
        console.log(res);
        ctx.body = {
            message:'修改成功',
            status:200
        }
    }
    async removList(ctx){
        const id = ctx.request.body.id;
        console.log(id);
        const res = await ReadModel.removList(id);
        ctx.body={
            meaasge:'删除成功'
        }
    }
}
export default new ReadController()