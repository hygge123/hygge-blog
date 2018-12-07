import About from '../model/AboutModel'

class AboutController {

    async getContent(ctx) {
        const res = await About.getContent();
        console.log(res)
        ctx.body = res;

    }
    async updateContent(ctx){
        console.log(ctx)
         //传递id值固定格式
        const id = ctx.params.id;
        //debug  忘记 ctx.request.body
        const content = ctx.request.body.content;
        // console.log(content)
        const res = await About.updateContent(id,content);
        ctx.body = res;
    }
}
export default new AboutController