// pages/orderDetail/orderDetail.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    path:'',
    url:'',
    orderProduct:[],
    status:'',
    address:'',
    orderNum:'',
    createTime:'',
    subtotal:0,
    freight:0,
    totalPrice:0
  },
  toSee:function(){
    wx.switchTab({
      url: '../all/all',
    })
  },
  continuePay:function(){
    wx.switchTab({
      url: '../index/index',
    })
 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    let that = this;
    var orderId = options.orderId;
    var url = app.globalData.url;
    var path = app.globalData.path;
    that.setData({
      url: url,
      path:path
    });
    var status=options.status;
    if(status=='1'){
      that.setData({
        status: parseInt(status)
      })
    } else if (status=='2'){
      that.setData({
        status: parseInt(status)
      })
    }else{
      that.setData({
        status: parseInt(status)
      })
    }
    wx.request({
      url: that.data.url+'/mallOrederController/selectByOrderNumber.do',
      data: { 'ordernumber':orderId },
      success:function(res){
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
        if(newData){
          that.setData({
            orderProduct: newData,
            address: newData[0].addr,
            orderNum: newData[0].ordernumber,
            createTime: newData[0].now
          })
        }
        var subtotal=0, totalPrice=0;
        var array = newData[0].list,i;
        for (i = 0; i < array.length;i++){
          subtotal += array[i].number * array[i].productPrice;
        }
        totalPrice = subtotal + that.data.freight;
        that.setData({
          subtotal: subtotal,
          totalPrice: totalPrice
        })
      }
    });
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