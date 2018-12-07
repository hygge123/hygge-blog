import tag from '../model/introductions'
class introductions{
    async getIntroductions(ctx){
        ctx.body = await tag.getTag()
    }
    async setTags(ctx){
        const id = ctx.params.id
        ctx.body = await tag.setTags(id,ctx.request.body)
    }
    async delTags(ctx){
        const id = ctx.params.id
        ctx.body = await tag.setTags(id,ctx.request.body)
    }
}
export default new introductions()