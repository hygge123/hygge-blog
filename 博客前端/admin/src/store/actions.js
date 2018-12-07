//封装的请求request
import request from '@/utils/request'
// import 里面的方法和mutations里面的方法的主要区别在于,actions里面可以写异步代码,而mutations里面只能写同步代码,所以,通常情况下,我们话吧业务代码放在actions里面
const actions = {
  async saveActicle({commit,state},{id,title,tags,content,isPublished}){
    request({
      method:'post',
      url: `/articles/update/${id}`,
      data: {
        title,
        tags,
        content,
        isPublished
      }
    }).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
    commit('SET_CURRENT_ARTICLE',{id,title,tags,content,isPublished})
  },
  //登录方法
  //登录方法传递两个参数username,password
  //commit只是为了触发mutations方法
  LOGIN({commit},username,password){
    //这里面写登录的方法

  }
  //这里写登出

}
export default actions
