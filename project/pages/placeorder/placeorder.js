// pages/placeorder/placeorder.js

const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    url:'',
    path: '',
    isChooseAddr:true,
    productList:[],
    addr:'',
    totalPrice:0,
    discountId:'',
    productId:'',
    number:0,
    inputValue:''
  },

  chooseAddress:function(e){
    let that = this;
    var arg = e.currentTarget.dataset.source; 
    wx.authorize({
      scope: 'scope.address',
      success: () => {
        wx.chooseAddress({
          success:(res)=>{
            if (res.errMsg) {
var addr = res.userName + res.telNumber + res.provinceName + res.cityName + res.countyName + res.detailInfo;
              that.setData({
                addr:addr,
                isChooseAddr: true
              })
            }
          }
        });
      },
      fail: res => {//用户拒绝授权
        wx.navigateTo({
          url: '../addr/addr?source='+arg
        });
      }
    }); 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    let that = this;
    var url = app.globalData.url;
    var path = app.globalData.path;
    that.setData({
      url: url,
      path: path,
    });
    // 商品列表
    wx.getStorage({
      key: 'productInfo',
      success: function (res){
        // //获取总价
        var total = 0;  
        var productList = res.data;
        // 判断获取到的缓存数据是对象还是数组，分别做不同的处理
        if (Object.prototype.toString.call(productList) === '[object Array]'){
          var i = 0, len = productList.length;
          for (i; i < len; i++) {
            total += productList[i].number * productList[i].productPrice
          }
          that.setData({
            productList: productList,
            totalPrice: total.toFixed(2)
          });
        }else{
          var list=[];
          list.push(productList);
          total += productList.number * productList.productPrice
          that.setData({
            productList: list,
            totalPrice: total.toFixed(2)
          });
        }        
      },
    });
    // 如果当前地址为空，设置页面为‘空’时的样式
    if(that.data.addr.length==0){
      that.setData({
        isChooseAddr: !that.data.isChooseAddr
      });
    };
    // 查看用户是否授权，分别做不同处理
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.address']) {
          wx.getStorage({
            key: 'shippingAddr',
            success: function(res) {
var address = res.data.addressName + res.data.addressPhone + res.data.address_provinces + res.data.addressPath
              that.setData({
                addr: address,
                isChooseAddr: true
              })
            }
          }) 
        } else {
          wx.getStorage({
            key: 'addr',
            success: function (res) {
              that.setData({
                addr: res.data,
                isChooseAddr: true
              });
            },
          });
        }
      }
    }) 
    
  },
  bindKeyInput:function(e){
    let that=this;
    that.setData({
      inputValue: e.detail.value
    })
  },

  // 确认支付按钮
  confirmOrder:function(){
    let that=this;
    if(that.data.addr.length==0){
      wx.showModal({
        content:'请选择收货地址！',
        showCancel:false,
        success:(res)=>{
          if(res.confirm){
            console.log('收货地址，用户点击确定');
          }
        }
      });
    }else{
      var orderProductList = that.data.productList;
      var orderAddress = that.data.addr;
      //设置缓存 订单页面取数据
      wx.setStorage({
        key: 'orderDetail',
        data: { productInfo: orderProductList, addr: orderAddress},
      });
      // 获取购物车里面的所有商品,只要用户点击了支付按钮，不管有没有付款，就将用户车里面的当前商品删除
      var globalCart = app.globalData.cartList;
      for(var i=0;i<globalCart.length;i++){
        if (globalCart[i].selected){
          wx.request({
            url: that.data.url + '/mallUserCart/deletMallCar.do',
            data: { cartId: globalCart[i].cartId },
            success: (res) => {
              if (res.statusCode == 200) {
                globalCart.splice(i, 1);
                app.globalData.cartList = globalCart;
              }
            }
          });
        }
      }
      var openid = app.globalData.openid;
      console.log('这里是调用支付时打印的openid：'+openid);
      var index = orderAddress.indexOf('1');
      var phone = orderAddress.substring(index,index+11);
      for(var i=0;i<orderProductList.length;i++){
        orderProductList[i].user_id = openid;
        orderProductList[i].addr = orderAddress;
        orderProductList[i].phone = phone;
        orderProductList[i].msg = that.data.inputValue
      }
      var arg = JSON.stringify(that.data.productList);
      console.log(arg);
      wx.getSetting({ 
        success(res){
          if(!res.authSetting['scope.userInfo']){
            wx.showModal({
              content: '您还尚未授权，请授权后重新购买！（为了您的信息安全，谢谢您的理解！）',
              showCancel: false,
              success: (res) => {
                if(res.confirm) {
                  wx.switchTab({
                    url: '../my/my',
                  })
                }
              }
            });
          }else{
            console.log('正在调用支付');
            var price = (that.data.totalPrice * 100).toString();
            wx.request({
              url: that.data.url + '/mallOrederController/addorder.do',
              data: { 'Malltext': arg },
              header: { 'content-type': 'application/json' },
              method: 'POST',
              success: (res) => {
                var orderId = res.data.ordernumber;
                if (res.statusCode == 200) {
                  if (openid){
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
                                    setTimeout(function () {
                                      wx.redirectTo({
                                        url: '../order/order',
                                      });
                                    }, 1500)
                                  }
                                });
                              }
                            },
                            'fail': function (res) {
                              wx.showToast({
                                title: '支付失败',
                                icon: 'none',
                                duration: 2000,
                                success: function (){
                                  wx.request({
                     url: that.data.url + '/mallOrederController/lfFailChangeStatus.do',
                                    data: { 'ordernumber': orderId },
                                    success: function (res) {
                                      if (res.statusCode == 200) {
                                        setTimeout(function(){
                                          wx.redirectTo({
                                            url: '../order/order',
                                          });
                                        },1500)
                                      }
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
              }
            });
          }
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (){
    
  }
})