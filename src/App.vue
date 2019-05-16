<script>
export default {
  created () {
    // 调用API从本地缓存中获取数
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('shareImage','')
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(function () {
      updateManager.applyUpdate()
    })
  }
}
</script>

<style>
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
.fontHidden3{
  white-space:normal;overflow: hidden;display: -webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;
}

.fontHidden1{
  white-space:normal;overflow: hidden;display: -webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1;
}
@font-face {
  font-family: 'iconfont';  /* project id 1048971 */
  src: url('//at.alicdn.com/t/font_1048971_o6fyo77z8p.eot');
  src: url('//at.alicdn.com/t/font_1048971_o6fyo77z8p.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1048971_o6fyo77z8p.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1048971_o6fyo77z8p.woff') format('woff'),
  url('//at.alicdn.com/t/font_1048971_o6fyo77z8p.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1048971_o6fyo77z8p.svg#iconfont') format('svg');
}
.iconfont{
  font-family: 'iconfont';
  vertical-align: middle; 
}
 /*隐藏滚动条*/
   ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }
</style>
