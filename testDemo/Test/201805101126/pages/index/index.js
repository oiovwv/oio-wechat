//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    array: ["美国", "中国", "巴西", "日本"],
    index: 0,
    date: "2016-09-01",
    time: "12:01"
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.time
    })

  },
  onLoad: function() {
    console.log('onLoad');
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      });
    });
  },
	//事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs',
    });
  },
	//获取火车票函数
  getTrainInfo1: function () {

    wx.navigateTo({
      url: '../Test/Test',
    });
  },

  getTrainInfo2: function () {

    wx.navigateTo({
      url: '../flash/index',
    });
  },


  getTrainInfo: function() {
    wx.request({
      url: 'http://apis.baidu.com/qunar/qunar_train_service/s2ssearch',
      header: {
        apikey: '361cf2a2459552575b0e86e0f62302bc',
      },
      data: {
        version: '1.0',
        from: '北京',
        to: '杭州',
        date: '2016-11-15',
      },
      success: function(res) {
        var json = res.data;
        //将JSON类型转为String类型用以url参数传递，否则传递后会变成[object Object]
        var jsonString = JSON.stringify(json);
        wx.navigateTo({
          url: '../train/train?trainInfos='+jsonString,
        });
      },
    });
  },
});
