<template>
	<div class="partner">
		<div class="header">
			<div class="avator">
				<img src="/static/images/product-list.png">
			</div>
			<div class="headerTitle">我的佣金</div>
		</div>
		<div class="partnerTitle">
			<p>￥300.89</p>
			<p>累计收益</p>
		</div>
		<div class="myTeam">
			<div class="myTeamTitle">
				收益明细
			</div>
			<div class="teamList" v-for="(item,index) in inComingList" :key="item" :index='index' @click="showMore(index)">
				<div class="teamListIntro">
					<div class="left">
						<span class="teamAvator">
							<img :src="item.face">
						</span>
						<span class="name">{{item.name}}</span>
					</div>
					<div class="right">
						返佣:￥{{item.incoming}}
					</div>
				</div>
				<div class="teamListDetail" v-show="item.isSelct">
					<p>购买商品:{{item.goodName}}</p>
					<p>下单时间:{{item.orderTime}}</p>
					<p class="money">
						<span class="consum">消费金额:￥{{item.consum}}</span>
						<span class="returnCommission">返佣金额:￥{{item.incoming}}</span>
					</p>
				</div>	
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				inComingList:[
					{
						face:'/static/images/product-list.png',
						name:'元淳',
						incoming:'9.99',
						goodName:'元淳面膜',
						orderTime:'2018-09-12 12:30',
						consum:'399',
						isSelct:true
					},
					{
						face:'/static/images/product-list.png',
						name:'元淳',
						incoming:'9.99',
						goodName:'元淳面膜',
						orderTime:'2018-09-12 12:30',
						consum:'399',
						isSelct:false
					},
					{
						face:'/static/images/product-list.png',
						name:'元淳',
						incoming:'9.99',
						goodName:'元淳面膜',
						orderTime:'2018-09-12 12:30',
						consum:'399',
						isSelct:false
					},
					{
						face:'/static/images/product-list.png',
						name:'元淳',
						incoming:'9.99',
						goodName:'元淳面膜',
						orderTime:'2018-09-12 12:30',
						consum:'399',
						isSelct:false
					}
				]
			}
		},

		components: {

		},

		methods: {
			showMore(index){
				let that=this
				that.inComingList.map(item=>{
					item.isSelct=false
				})
				that.inComingList[index].isSelct=true
			}
		},

		created() {

		}
	}
</script>

<style lang="less">
img{
	width: 100%;
	height: 100%;
	display: block;
}
.header{
	height: 150px;
	background: #B1333F;
	width: 100%;
	padding-top:20px;
	box-sizing: border-box;
	.avator{
		width: 80px;
		height: 80px;
		border-radius: 50%;
		overflow: hidden;
		margin: 0  auto;
	}
	.headerTitle{
		text-align: center;
		font-size: 16px;
		color:#fff;
		height: 30px;
		line-height:30px;
	}
}
.partnerTitle{
	text-align: center;
	height: 60px;
	color: #6E6E6E;
	box-shadow: 0 0 1px #000;
	width: 300px;
	margin: 0 auto;
	position: relative;
	top:-10px;
	background: #fff;
	font-size: 16px;
	padding: 10px 0;
	box-sizing:border-box;
}
.myTeam{
	.myTeamTitle{
		height: 40px;
		line-height:40px;
		padding-left: 10px;
		font-size: 18px;
	}
	.teamList{
		.teamListIntro{
			display: flex;
			justify-content: space-between;
			height: 50px;
			padding: 0 10px;
			box-sizing:border-box;
			line-height:50px;
			font-size: 16px;
			color:#323232;
			border-top: 1px solid #ddd;
			.left{
				flex-grow: 1;
				.teamAvator{
					display: inline-block;
					width: 40px;
					height: 40px;
					overflow: hidden;
					border-radius: 50%;
					vertical-align: middle;
				}
				.name{
					display: inline-block;
					padding-left: 10px;
				}
			}
			.right{
				
			}
		}
		.teamListDetail{
			font-size: 16px;
			color:#323232;
			padding: 10px;
			box-sizing: border-box;
			p{
				height: 30px;
				line-height:30px;
			}
			.money{
				display: flex;
				justify-content: space-between;
			}
		}
	}
}
</style>