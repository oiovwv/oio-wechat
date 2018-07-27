// pages/all/all.

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{ 'classifyId': '','classifyName':'全部'}],
    activeIndex: 0,
    isHidden: true,
    isDown:true,
    isHighlight:true,
    all: [],
    classAll:[],
    isFull:false,
    path: '',
    url: '',
  },
  // 选项卡切换
  tabClick:function(e){
    var that=this;
    var tabclassifyId = parseInt(e.currentTarget.id);
    var arr = that.data.tabs;
    if (tabclassifyId===0){
      that.getAll();
    }else{
      wx.request({
        url: that.data.url + '/mallProductController/queryPrductByClassifyId.do',
        data: { 'classifyId': tabclassifyId },
        success: function (res) {
          var classProduct = res.data;
          if (classProduct.length != 0) {
            that.setData({
              isFull: false
            })
          } else {
            that.setData({
              isFull: true
            })
          }
          that.setData({
            classAll: classProduct
          })
        }
      });
    }
 // 选项卡的切换
    that.setData({
      activeIndex:e.currentTarget.id,
      isHighlight: !that.data.isHighlight
    });
  },
  // 箭头切换
  toggleArrows:function(){
    var that = this; 
    that.setData({
      isDown: !that.data.isDown,
      isHidden: !that.data.isHidden
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var url = app.globalData.url;
    var path = app.globalData.path;
    that.setData({
      url: url,
      path: path
    });
    wx.showLoading({
      title: '数据加载中',
      success:function(){
        // 分类标签
        wx.request({
          url: that.data.url + '/mallClassifyController/showMallClassify.do',
          success: function (res) {
            var arr = res.data;
            var list = [];
            // 将获取的数据里面的classifyName摘取出来拼接到全局数据tabs中
            for (var i = 0; i < arr.length; i++) {
              var obj = {};
              obj.classifyId = arr[i].classifyId;
              obj.classifyName = arr[i].classifyName;
              list.push(obj);
            }
            var tabs = that.data.tabs.concat(list);
            that.setData({
              tabs: tabs
            })
          }
        });
        that.getAll();
      }
    })
    setTimeout(function() {
      wx.hideLoading()
    }, 1500);
  },
  getAll:function(){
    let that=this;
    wx.request({
      url: that.data.url + '/mallProductController/queryPrductList.do',
      success: function (res) {
        var arrInfo = res.data;
        that.setData({
          all: arrInfo
        });
        if (that.data.all.length != 0) {
          that.setData({
            isFull: false
          })
        } else {
          that.setData({
            isFull: !that.data.isFull
          })
        }
      }
    });
  }
})