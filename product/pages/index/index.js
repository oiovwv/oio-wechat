//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    swiperImgs: ['../../images/1.jpg', '../../images/2.jpg', '../../images/3.jpg'],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    vertical: true,
    interval: 3000,
    duration: 1000
  },
  // previewImage: function () {
  //   let that = this;
  //   let imgArray = that.data.swiperImgs;
  //   console.log(imgArray);
  //   wx.previewImage({
  //     urls: imgArray,
  //     success: () => {
  //       console.log('接口调用成功！');
  //     }
  //   })
  // },
  listenerBtnGetLocation: function () {
    wx.getLocation({
      //定位类型 wgs84, gcj02
      type: 'gcj02',
      success: function (res) {
        console.log(res)
        wx.openLocation({
          //当前经纬度
          latitude: res.latitude,
          longitude: res.longitude,
          scale: 15,
          //位置名
          name: '牵肠挂肚手机维修',
          //详细地址
          address: '火星路24号',
          //成功打印信息
          success: function (res) {
            console.log(res)
          },
          //失败打印信息
          fail: function (err) {
            console.log(err)
          },
          //完成打印信息
          complete: function (info) {
            console.log(info)
          }
        })
      },
      fail: function (err) {
        console.log(err)
      },
      complete: function (info) {
        console.log(info)
      }
    })
  },
  //事件处理函数
  call: function() {
    wx.makePhoneCall({
      phoneNumber: '154545454545',
    });
  }
})
