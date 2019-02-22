import * as API from './base'
export default {
	// 根据code判断是否是会员
	getCode(code){		
	 // return API.GetCode('https://nadou.guqinet.com/api/login/byCode',{code:code})
	 return API.GetCode('https://nadou.guqinet.com/api/login/byCode',{code:code})
	   // return API.GetCode('http://192.168.2.131:8013/api/login/byCode',{code:code})		
	},
	// 获取用户信息并且注册会员  
	weCatLogin(params){
		return API.getLogin('https://nadou.guqinet.com/api/login/weChatLogin',params)
	   // return API.getLogin('http://192.168.2.111:8013/api/login/weChatLogin',params)
		// return API.getLogin('http://192.168.2.208:8013/api/login/weChatLogin',params)
		// return API.getLogin('https://nadou.guqinet.com/api/login/weChatLogin',params)
	},
	getIndex(){
		return API.GET('/api/index/main')
	},
	getShopMain(){
		return API.GET('/api/Goods/getShopMain')
	}
}