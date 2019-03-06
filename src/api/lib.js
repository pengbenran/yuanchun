import * as API from './base'
export default {
      get_Click(params){
          return API.POST('/api/member/upMemberLv',params)
      },
      get_Sign(params){
          return API.GET('/api/member/signInfo',params)
      }
}