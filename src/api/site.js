import * as API from './base'
export default {
	// 新增会员地址
	getSite(){
		return API.POST('/api/address/add')
	},

}