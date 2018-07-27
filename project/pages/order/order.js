// pages/order/order.js
const app = getApp();
var sliderWidth = 94; // 需要设置slider的宽度，用于计算中间位置
Page({
  data:{
    url:'',
    path:'',
    tabs: ['全部订单', '待付款', '已付款', '已取消'],
    activeIndex: 0,
    // 整个页面的显示与隐藏
    isShowOrder: true,
    // 单独选项卡里面内容的空或否
    cancelBox:true,//取消
    delayBox: true,//待付
    completeBox: true,//完成
    allList:[],
    delayList:[],
    completeList: [],
    cancelList: []
  },
  
  // 选项卡切换
  tabClick:function(e){
    let that=this;
    var index = e.currentTarget.id;  
    that.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });  
  },


  // 查看订单详情
  toOrderDetail:function(e){
    var index = e.currentTarget.dataset.id;
    var status = e.currentTarget.dataset.status;
    var orderId = e.currentTarget.dataset.orderid;
    wx.navigateTo({
      url: '../orderDetail/orderDetail?status='+status+'&id='+index+'&orderId='+orderId
    });
  },

  // 继续支付
  continuePay:function(e){
    let that = this;
    var openid = wx.getStorageSync('openid');
    var price = (e.currentTarget.dataset.price * 100).toString();
    var status = e.currentTarget.dataset.status;
    var orderId = e.currentTarget.dataset.orderid;
    if (status == 2) {
      if (openid) {
        wx.request({
          url: that.data.url + '/wxPayController/xcxpay.do',
          method: 'POST',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          data: { 'openid': openid, 'pay': price },
          success: function (res) {
            if (res.statusCode == '200') {
              wx.requestPayment({
                'timeStamp': res.data.timeStamp,
                'nonceStr': res.data.nonceStr,
                'package': res.data.package,
                'signType': res.data.signType,
                'paySign': res.data.sign,
                'success': function (res) {
                  if (res.errMsg == 'requestPayment:ok') {
                    wx.showToast({
                      title: '支付成功',
                      icon: 'success',
                      duration: 2000,
                      success:function(){
                        wx.request({
                          url: that.data.url + '/mallOrederController/lfPayChangeStatus.do',
                          data: { 'ordernumber': orderId },
                          success: function (res) {
                            if(res.statusCode==200){
                              that.getAllOrder();
                            }
                          }
                        })
                      }
                    })
                  }
                },
                'fail': function (res) {
                  wx.showToast({
                    title: '支付失败',
                    icon: 'none',
                    duration: 2000,
                    success: function () {
                      wx.request({
                        url: that.data.url + '/mallOrederController/lfFailChangeStatus.do',
                        data: { 'ordernumber': orderId },
                        success: function (res) {
                          console.log('未支付修改订单状态');
                        }
                      })
                    }
                  });
                }
              });
            }
          }
        });
      }
    }
  },


  // 取消订单的删除按钮
  deleteOrder:function(e){
    let that=this;
    var cancelList = that.data.cancelList;
    var index = e.currentTarget.dataset.index;
    var orderId = e.currentTarget.dataset.orderid;
    wx.showModal({
      content: '确定取消订单吗？',
      confirmText:'确定',
      cancelText:'取消',
      success:(res)=>{
        if(res.confirm){
          wx.request({
            url: that.data.url + '/mallOrederController/deleteByOrderNumber.do',
            data: { 'ordernumber': orderId },
            success:function(res){
              cancelList.splice(index, 1);
              that.getAllOrder();
              if (that.data.cancelList.length == 0) {
                that.setData({
                  cancelBox: true
                });
              }
            }
          }); 
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){ 
    let that=this;
    var url = app.globalData.url;
    var path = app.globalData.path;
    if(Object.keys(options).length==0){
      console.log(options+'为空对象');
    }else{
      that.setData({
        activeIndex: options.activeIndex
      })
    }
    that.setData({
      url: url,
      path: path 
    });
    that.getAllOrder();
   
  },

  getAllOrder:function(){
    let that=this;
    var openid = wx.getStorageSync('openid');
    wx.request({
      url: that.data.url + '/mallOrederController/selectByOpenId.do',
      data: { 'openid': openid },
      success: function (res) {
        var newData = [];
        res.data.forEach(function (v, i) {
          var n;
          for (var i = 0; i < newData.length; i++) {
            var t = newData[i];
            if (t.ordernumber == v.ordernumber) {
              n = t;
              break;
            }
          }
          if (!n) {
            n = { ordernumber: v.ordernumber, status: v.status, now: v.now, phone: v.phone, addr: v.addr, list: [] };
            newData.push(n);
          }
          delete v.ordernumber;
          delete v.status;
          delete v.now;
          delete v.addr;
          delete v.phone;
          n.list.push(v);
        });
        if (newData) {
          for (var i = 0; i < newData.length; i++) {
            var total = 0;
            var arr = newData[i].list;
            if (arr.length == 1) {
              total = arr[0].number * arr[0].productPrice;
            } else {
              for (var j = 0; j < arr.length; j++) {
                total += arr[j].number * arr[j].productPrice;
              }
            }
            newData[i].price = total
          }
          that.setData({
            allList: newData
          });
          var allList = that.data.allList;
          var delayList = that.data.delayList;
          var completeList = that.data.completeList;
          var cancelList = that.data.cancelList;

          // 全部订单列表的判断
          if (allList.length == 0) {
            that.setData({
              isShowOrder: !that.data.isShowOrder
            });
          } else {
            that.setData({
              isShowOrder: true
            });
          }

          // 单独选项卡的判断
          // 待付款
          if (delayList.length == 0) {
            that.setData({
              delayBox: true
            });
          } else {
            that.setData({
              delayBox: !that.data.delayBox
            });
          }
          // 已完成
          if (completeList.length == 0) {
            that.setData({
              completeBox: true
            });
          } else {
            that.setData({
              completeBox: !that.data.completeBox
            });
          }
          // 已取消
          if (cancelList.length == 0) {
            that.setData({
              cancelBox: true
            });
          } else {
            that.setData({
              cancelBox: !that.data.cancelBox
            });
          }

          // 判断订单状态
          var delay = [], complete = [], cancel = [];
          for (var i = 0; i < allList.length; i++) {
            if (allList[i].status == 2) {
              delay.push(allList[i]);
            } else if (allList[i].status == 1) {
              complete.push(allList[i]);
            } else if (allList[i].status == 3) {
              cancel.push(allList[i]);
            }
          }

          if (delay.length != 0) {
            that.setData({
              delayBox: !that.data.delayBox,
              delayList: delay
            });
          } else {
            that.setData({
              delayBox: true
            });
          }

          if (complete.length != 0) {
            that.setData({
              completeBox: !that.data.completeBox,
              completeList: complete
            });
          } else {
            that.setData({
              completeBox: true
            });
          }
          if (cancel.length != 0) {
            that.setData({
              cancelBox: !that.data.cancelBox,
              cancelList: cancel
            });
          } else {
            that.setData({
              cancelBox: true
            });
          }
        }
      }
    })
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
  
  }
})