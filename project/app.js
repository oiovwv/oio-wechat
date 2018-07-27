//app.js
App({
  onLaunch: function (){
    let that = this;  
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    //验证用户是否登陆超时
    wx.checkSession({
      success: function (res) {
        //session 未过期，并且在本生命周期一直有效
        that.getUserData();
      },
      fail: function () {
        //登录态过期,重新获取用户信息
        that.getUserData();
        return false;
      }
    })

  },
  getUserData:function(){
    let that=this;
    // 获取用户openid并访问注册接口
    wx.login({
      success: function (res) {
        wx.request({
          url: that.globalData.url + '/wxPayController/GetOpenid.do',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: { js_code: res.code },
          success: function (res) {
            console.log('这是打印openid之前的一句话');
            console.log('这是appjs里面打印的openid：'+res.data.openid);
            console.log('这是打印openid之后的一句话');
            that.globalData.openid = res.data.openid;
            wx.setStorageSync('openid', res.data.openid);
            var user = {};
            user.wechat = res.data.openid;
            if (res.data.openid) {
              wx.request({
                url: that.globalData.url + '/mallUserController/addMallUser.do',
                data: user,
                success: (res) => {
                  if(res.data==0){
                    console.log('注册成功，新增用户成功');
                  }else{
                    console.log('您已经成功授权过啦');
                   
                  }
                }
              });
            }
          }
        });
      }
    });
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // });
  },
  
  // 全局数据
  globalData: {
    userInfo: null,
    path:'https://www.lixikeji.cn/wechat/images',
    url:'https://www.lixikeji.cn/wcc_lxkj-0.0.1-SNAPSHOT',
    // url:'http://192.168.0.105:8080/Lxkj_WeChatMall',
    address:'',
    cartList:[],
    openid:''
  }
})