import AboutModel from '../model/AboutModel'
class AboutController {
    async getAboutInfo(ctx){
        ctx.body = await AboutModel.getAboutInfo()
    }
    async setAboutInfo(ctx){
        const id = ctx.params.id
        ctx.body = await AboutModel.setAboutInfo(id,ctx.request.body)
    }
}
export default new AboutController()