<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log('app created and cache logs by setStorageSync')
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
.fontHidden{
  white-space:normal;overflow: hidden;display: -webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;
}

.fontHidden1{
  white-space:normal;overflow: hidden;display: -webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1;
}
@font-face {
  font-family: 'iconfont';  /* project id 1048971 */
  src: url('//at.alicdn.com/t/font_1048971_ijiblfkelx.eot');
  src: url('//at.alicdn.com/t/font_1048971_ijiblfkelx.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1048971_ijiblfkelx.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1048971_ijiblfkelx.woff') format('woff'),
  url('//at.alicdn.com/t/font_1048971_ijiblfkelx.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1048971_ijiblfkelx.svg#iconfont') format('svg');
}
.iconfont{
  font-family: 'iconfont';
  vertical-align: middle; 
}
</style>
