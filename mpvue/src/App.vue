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
page{
  background: #f0f0f0;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding:0 0 50rpx 0;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
.quantity_box,.options{
    display: flex;
}
.quantity,.quantity_text{
    width: 80rpx;
    border: 1rpx solid #999;
}
.quantity{
    border-radius: 5rpx;
    line-height: 52rpx;
}
.quantity_minus{
    border-right:none; 
}
.quantity.on{
    background:#f8f8f8;
    color:#bbb;
    border-color:#e8e8e8;
}
.quantity_plus{
    border-left:none; 
}

.empty_box{
    text-align: center;
    padding: 50rpx;
}
.empty{
    width: 340rpx;
    height: 288rpx;
}
.weui-navbar{
    background: #fff;
}
.ribbon{
  width:100%;
  height:10rpx;
  display: block;
}
.btn{
    position: fixed;
    bottom: 0;
    left: 0;
    border-radius: 0;
    width: 100%;
    height: 80rpx;
    background: #f73859;
    color:#fff;
    font-size: 28rpx;
    flex-grow:1;
    line-height: 40rpx;
    border:none;
    text-align: center;
    box-sizing: border-box;
}

</style>
