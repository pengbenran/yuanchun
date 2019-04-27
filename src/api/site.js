import * as API from './base'
export default {
	// 新增会员地址
	getSite(params) {
		return API.POST('/api/address/add', params)
	},
	//查询会员所有地址
	getSiteList(params) {
		return API.GET('/api/address/addressAll', params)
	},
	//删除地址
	addressAll(params) {
		return API.POST('/api/address/deleteAddress', params)
	},
	//修改地址
	update(params) {
		return API.PUT('/api/address/update', params)
	},
	//查询会员具体地址
	getSiteDef(params) {
		return API.GET('/api/address/get', params)
	},
	//默认地址
	defutaddress(params) {
		return API.GET('/api/address/defutaddress', params)
	},
	//	客服电话
	phoneNumber(params) {
		return API.GET('/api/member/allCount', params)
	},
}