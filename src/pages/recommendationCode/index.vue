<template>
	<div class="businessCard">
		<div class="paintImg">
			<img :src="shareImage" mode='widthFix'>
		</div>
		<canvasdrawer :painting="painting"  @getImage="eventGetImage" ref="canvas"/>
		<div class="btn" @click="eventSave" v-if="shareImage">保存图片到本地</div> 
	</div>
</template>
<script>
	import canvasdrawer from '@/components/canvasdrawer'
	export default{
		data(){
			return{
				painting:{},
				Width:'',
				Height:'',
				shareImage:''
			}
		},
		components:{
			canvasdrawer
		},
		methods:{
			async getErCode(unionid,inviteCode){
				let that=this
				let params={}
				params.params=store.state.userInfo.unionid+','+inviteCode+','+3
				let QrcodeRes=await Api.GetQrcode(params)
				if(QrcodeRes.code==0){
					that.eventDraw(QrcodeRes.url)
				}
				
			},
			//点击生成海报
			async eventDraw(codeUrl){
			   	let that = this;
			   	wx.showLoading({
			   		title:'推广码绘制中'
			   	})	
			   	let ImgArr = []
			   	ImgArr[0]='https://shop.guqinet.com/html/images/yuanchun/bcg.png'
			   	ImgArr[1]='https://shop.guqinet.com/html/images/yuanchun/ercode.png'
			   	ImgArr[2]='http://thirdwx.qlogo.cn/mmopen/PiajxSqBRaEKjkMdnpwrWs2nKFTekONrTKVnkAwIDlzCvNV7wkx38HF1bm0SxcAswSE1m2Hallqvk1Y5HT1sPQw/132'
			   	that.painting={
			   		width: that.Width,
			   		height: that.Height,
			   		clear: true,
			   		views: [
			   		{
			   			type: 'image',
			   			url: ImgArr[0],
			   			top: 0,
			   			left: 0,
			   			width: that.Width,
			   			height: that.Height
			   		},
			   		{
			   			type: 'image',
			   			url: ImgArr[2],
			   			top: 20,
			   			left: (that.Width-120)/2,
			   			width: 120,
			   			height: 120,
			   			borderRadius:60
			   		},
			   		{
			   			type: 'image',
			   			url: ImgArr[1],
			   			top: that.Height-250,
			   			left: (that.Width-120)/2,
			   			width: 120,
			   			height: 120
			   		},
			   		{
			   			type: 'text',
			   			content:'彭本燃',
			   			fontSize: 28,
			   			color: '#fff',
			   			textAlign: 'left',
			   			breakWord: true,
			   			top: 140,
			   			left:45,
			   			width:140,
			   			MaxLineNumber:1,
			   			isCenter:true
			   		}
			   		]
			   	}
			   	this.$refs.canvas.readyPigment()
			   },
			   eventGetImage(event) {
			   	wx.hideLoading()
			   	console.log(event);
			   	const { tempFilePath, errMsg } = event

			   	if (errMsg === 'canvasdrawer:ok') {
			   		this.shareImage=tempFilePath

			   		// wx.previewImage({
			     //        current: this.shareImage, // 当前显示图片的http链接
			     //        urls: [this.shareImage] // 需要预览的图片http链接列表
			     //    })
			 }
			},
			eventSave() {
				wx.saveImageToPhotosAlbum({
					filePath: this.shareImage,
					success(res) {
						wx.showToast({
							title: '保存图片成功',
							icon: 'success',
							duration: 2000
						})
					}
				})
			},
		},
		mounted(){
			let that=this
			that.Width=wx.getSystemInfoSync().windowWidth
			that.Height=wx.getSystemInfoSync().windowHeight
			console.log(that.Width,that.Height);
			that.eventDraw()
		}
	}
</script>
<style scoped lang="less">
	.paintImg{
		width: 100%;
		margin: 0 auto;
	}
	img{
		width: 100%;
		height: 100%;
		display: block;
	}
	.btn{
			margin-top: 30px;
			width: 290px;
			height: 49px;
			line-height: 49px;
			text-align: center;
			margin:  30px auto 0 auto;
			color: #fff;
			font-size: 16px;
			background-color: #A92429;
			border-radius: 3px;
		}
</style>