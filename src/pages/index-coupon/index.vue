<template>
	<div class="index-coupon">
		<!--切换-->
		<!-- <div class="tab">
			<span :class="curr==index?'on':''" v-for="(item,index) in tits" @click="tabs(index)">{{item.tit}}</span>
		</div> -->
		<!--数据-->
		<div class="index-coupon-list">
			<div class="index-coupon-list-li" v-for="(item,index) in memberTiket">
				<div class="cant">
					<p>{{item.money}}元抢购平台卷</p>
					<p>
						<span>{{item.giveMoney}}</span>
						<span>元</span>
						<span class="xian"></span>
					</p>
				</div>
				<div class="btn">
					立即购买
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import API from '@/api/home'
import {ToastShow} from '@/utils/index'
	export default {
		data() {
			return {
				curr: 0,
				coupon: [{
						pic: '48',
						rmb: '100'
					},
					{
						pic: '48',
						rmb: '100'
					},
					{
						pic: '48',
						rmb: '100'
					},
				],
				tits: [{
						tit: '购买'
					},
					{
						tit: '我的平台券'
					}
				],
				memberTiket:[]
			}
		},

		components: {

		},

		methods: {
			tabs: function(index) {
				let that = this;
				that.curr = index
			},

			/**
			 * 平台卷请求方法
			 */
			getTicket(){
				let that = this;
				API.getTicket().then(res => {
				   console.log(res,"打印成功数据")
				   if(res.code == 0){
				     that.memberTiket = res.memberTiket
				   }else{
					   ToastShow('失败','none')
				   }
				}).catch(err => {
					ToastShow('失败','none')
				})
			},
		},

		mounted() {
			 /**
			  * 加载平台卷
			  */
             this.getTicket();
		}
	}
</script>

<style scoped lang="less">
	.index-coupon {
		width: 100%;
		height: 100%;
		background-color: #f2f3f7;
		position: absolute;
		/*切换*/
		.tab {
			width: 100%;
			justify-content: space-between;
			display: flex;
			span {
				width: 50%;
				height: 39px;
				line-height: 39px;
				display: block;
				text-align: center;
				font-size: 14px;
				color: #666666;
			}
			.on {
				border-bottom: 1px solid #6e1b22;
				color: #6e1b22;
			}
		}
		/*数据*/
		.index-coupon-list {
			width: 100%;
			padding: 10px 13px 100px 13px;
			box-sizing: border-box;
			.index-coupon-list-li {
				display: flex;
				justify-content: space-around;
				align-items: center;
				width: 100%;
				height: 116px;
				background: linear-gradient(#a92732, #701c23);
				border-radius: 5px;
				margin-top: 22px;
				&:nth-child(1) {
					margin-top: 0;
				}
				.cant {
					p {
					
						&:nth-child(1) {
							font-size: 13px;
							color: #ffeeee;
						}
						&:nth-child(2) {
								position: relative;
							span {
								&:nth-child(1) {
									font-size: 40px;
									color: #FFEEEE;
								}
								&:nth-child(2) {
									font-size: 13px;
									color: #ffeeee;
								}
							}
							.xian{
								display: block;
								position: absolute;
								right: -4px;
								top: 11px;
								width: 1px;
								background-color: #ffd0d0;
								height: 34px;
								z-index: 99;
							}
						}
					}
				}
				.btn{
					width: 67px;
					height: 23px;
					border-radius: 11px;
					border: 1px solid #ebebeb;
					line-height: 23px;
					text-align: center;
					font-size: 12px;
					color: #ffffff;
				}
			}
		}
	}
</style>