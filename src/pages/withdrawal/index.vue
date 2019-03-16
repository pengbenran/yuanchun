<template>
	<div class="withdraw">
		<div v-for="(item,index) in financeCashDOList" class="flowbill-list-li" >
			<div class="top">
				<div class="name">
					<span>{{item.uname}}提现- {{item.status}}</span>
					<span>{{item.withdrawTime}}</span>
				</div>
				<div class="num">￥{{item.amount}}</div>
			</div>
		</div>
		
		<div v-if="hasMore" class="tip">~~我也是有底线的~~</div>
	</div>
</template>
<script type="text/javascript">
import Api from '@/api/member'
import store from '@/store/store'
import {ToastShow} from '@/utils/index'
	export default {
		data(){
			return{
				withdeawList:[],
				Pagination:{
					offset:0,
					limit:20
				},
				userInfo:{},
				financeCashDOList:[],
				hasMore:true
			}
		},
		mounted(){
			let that = this;
			that.userInfo = store.state.userInfo
			that.GetPayList();
		},
		methods:{
            GetPayList(){
				let that = this;
				if(that.hasMore){
					let data = Object.assign({},that.Pagination,{memberId:that.userInfo.memberId})
					Api.userPayList(data).then(res => {
						if(res.code == 0){
							if(res.financeCashDOList.length<that.Pagination.limit){
								that.hasMore=false
							}
							res.financeCashDOList.map(item=>{
								if(item.withdrawStatus==0){
									item.status="待打款"
								}
								else{
									item.status="已打款"
								}
							})
							that.financeCashDOList =that.financeCashDOList.concat(res.financeCashDOList);

						}else{
							ToastShow('失败','none')
						}
					}).catch(err => {
						ToastShow('失败','none')
					})
				}
				else{
					ToastShow('没有更多数据','none')
				}		
			}
		},
		onUnload(){
			this.Pagination={
				offset:0,
				limit:20
			};
			this.userInfo={};
			this.financeCashDOList=[];
			this.hasMore=true;
		},
		onReachBottom:function(){
			let that = this;
			that.Pagination.offset+=1
			that.getKindGood()
		},
	}
</script>
<style scoped lang="less">
.tip{
	text-align: center;
	font-size: 16px;
	color: #666;
}
.flowbill-list-li{
	.top{
		display: flex;
		justify-content: space-between;
		height: 50px;
		border-bottom: 1px solid #ddd;
		padding: 0 15px;
		.name{
			flex-grow: 1;
			margin-top: 4px;
			span {
				max-width: 200px;
				display: block;
				font-size: 14px;
				color: #111111;
				height: 20px;
				line-height:20px;
				&:nth-child(2) {
					font-size: 12px;
					color: #999999;
				}
			}
		}
		.num{
			font-size: 14px;
			font-family: "roboto";
			line-height: 50px;				
		}

	}
}
</style>