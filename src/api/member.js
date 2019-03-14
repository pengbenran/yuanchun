	import * as API from './base'
	// 查询订单数量
	export default {
		getorderCount(params){
			return API.GET('/api/member/allCount',params)
		},
		// 查看是否满足升级条件
		selectSubordinate(params){
			return API.GET('/api/place/selectSubordinate',params)
		},

		//用户提现
		userBalancePay(params){
			return API.POST('/api/distribe/submitDistribeApply',params)
		},

		//用户提现记录
		userPayList(params){
			return API.GET('/api/distribe/accountManagement',params)
		},	

		// 合伙人升高级合伙人
		upshift(params){	 	
			return API.PUT('/api/place/upshift',params)
		},
		// 高级合伙人升服务商
		upHighest(params){
			return API.PUT('/api/place/upHighest',params)
		},
		// 获取我的团队信息
		allSubordinate(params){
			return API.GET('/api/place/allSubordinate',params)
		},
		// 获取分润详情
		shareDetails(params){
			return API.GET('/api/place/shareDetails',params)
		}
		
	}