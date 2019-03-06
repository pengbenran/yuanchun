import * as API from './base'
export default {
	// 新增会员地址
	getSite(parms) {
		return API.POST('/api/address/add', parms)
	},
	//查询会员所有地址
	getSiteList(parms) {
		return API.GET('/api/address/addressAll', parms)
	},
	//删除地址
	addressAll(parms) {
		return API.POST('/api/address/deleteAddress', parms)
	},
	//修改地址
	update(parms) {
		return API.PUT('/api/address/update', parms)
	},
	//查询会员具体地址
	getSiteDef(parms) {
		return API.GET('/api/address/get', parms)
	},
	//默认地址
	defutaddress(parms) {
		return API.GET('/api/address/defutaddress', parms)
	},
	//	客服电话
	phoneNumber(parms) {
		return API.GET('/api/member/allCount', parms)
	},
}