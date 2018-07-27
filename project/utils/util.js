const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function haveUserInfo(callBack) {
  wx.getSetting({
    success: function (res) {
      var authSetting = res.authSetting
      if (authSetting['scope.userInfo']) {
        console.log("以获取登陆权限")
        wx.getUserInfo({
          withCredentials: true,
          success: function (res) {
            getApp().globalData.userInfo = res.userInfo
            callBack(true)
          }
        })
      } else {
        callBack(false)
      }
    }
  })
}

module.exports = {
  formatTime: formatTime,
  haveUserInfo: haveUserInfo
}
