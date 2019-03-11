	import * as API from './base'
	// 查询订单数量
	export default {
		getorderCount(params){
			return API.GET('/api/member/allCount',params)
		},
		selectSubordinate(params){
			return API.GET('/api/place/selectSubordinate',params)
		}
	}