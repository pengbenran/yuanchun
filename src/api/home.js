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
	getBanner(){
		return API.GET('/api/index/main')
	},
	getTicket(){
		return API.GET('/api/index/getTicket')
	},
	//获取新人礼
	getNewPersonGift(params){
		return API.GET('/api/index/getPackage',params)
	},
	getShopMain(){
		return API.GET('/api/Goods/getShopMain')
	},
	// 领取新人礼
	memberRedGet(params){
		return API.POST('/api/redPacket/MemberRedGet',params)
	}
}