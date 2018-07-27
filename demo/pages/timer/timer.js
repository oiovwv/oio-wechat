// pages/timer/timer.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:10,
    isClick:true,
    clickCount:0,
    phone:'',
    o:'中国静安寺附近卡号是会计法',
    t:'发货就爱上高科技哈萨克结过婚'
  },
  watchInput:function(e){
    let that=this;
    console.log(e.detail.value);
    that.setData({
      phone: e.detail.value
    })
  },
  getCode:function(){
    let that=this;
    let time = that.data.time;
    let clickCount = that.data.clickCount;
    let phone = that.data.phone;
    let regPhone=/^1[345678]\d{9}$/;
    if (!regPhone.test(phone)){
      wx.showModal({
        content: '请输入正确的手机号',
        showCancel:false,
        success:(res)=>{
          if(res.confirm){
            console.log('用户点击确定');
          }
        }
      })
    }else{
      clickCount++;
      let timer = setInterval(function () {
        time--;
        if (time < 0) {
          clearInterval(timer);
          time = 10;
          that.setData({
            isClick: true
          })
        }
        that.setData({
          time: time
        })
      }, 1000);
      that.setData({
        isClick: !that.data.isClick,
        clickCount: clickCount
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    let content=`<span class='red'>点击</span>`;
    WxParse.wxParse('article','html',content,that,5)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})