import * as API from './base'
export default {
	// 根据code判断是否是会员
	getCode(code){		
	 return API.GET('/api/member/byCode',{code:code})	
	},
	// 获取用户信息并且注册会员  
	weCatLogin(params){
		return API.GET('/api/member/weChatLogin',params)
	},
	getTicket(){
		return API.GET('/api/index/getTicket')
	},
	getIndex(){
		return API.GET('/api/index/main')
	},
	getShopMain(){
		return API.GET('/api/Goods/getShopMain')
	},
}