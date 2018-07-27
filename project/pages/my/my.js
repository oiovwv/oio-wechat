const app = getApp();
var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    // 是否授权的现实与隐藏
    isShowMine: false,
    userInfo: {},
    userInfoList: [
      {
        "icon": "../../images/icon/d.png",
        "text": "联系客服",
        "navigatorUrl": "../service/service",
        "caption": ""
      },
      {
        "icon": "../../images/icon/e.png",
        "text": "常见问题",
        "navigatorUrl": "../question/question",
        "caption": ""
      }
    ],
  },
  getUserInfoFunction: function (e) {
    if (!e.detail.userInfo) {
      wx.showModal({
        title: '提示',
        content: '为了您的用户体验请同意授权！',
        showCancel: false
      })
    } else {
      app.globalData.userInfo = e.detail.userInfo;
      wx.setStorageSync('userInfo', e.detail.userInfo);
      this.onLoad()
    }
  },

  // 选择地址
  chooseAddress: (e) => {
    var arg = e.currentTarget.dataset.source;
    // 访问用户授权
    wx.authorize({
      scope: 'scope.address',
      success: () => {
        wx.chooseAddress({
          success: function (res) {
            if (res.errMsg) {
 var addr = res.userName + res.telNumber + res.provinceName + res.cityName + res.countyName + res.detailInfo;
              getApp().globalData.address = addr;
              wx.redirectTo({
                url: '../my/my',
              });
            }
          }
        });
      },
      fail: res => {//用户拒绝授权
        wx.navigateTo({
          url: '../addr/addr?source=' + arg
        });
      }
    });
  },

  openConfirm: () => {
    wx.makePhoneCall({
      phoneNumber: '027-88859680',
    });
  },

  onLoad: function (options) {
    var that = this;
    that.setData({ url: app.globalData.url })
    util.haveUserInfo(function (haveInfo) {
      that.setData({ isShowMine: haveInfo, userInfo: app.globalData.userInfo })
    })
  }
})