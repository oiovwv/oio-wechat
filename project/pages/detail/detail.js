// pages/detail/detail.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品详情图片
    swiperImgs:[],
    // 轮播设置
    indicatorDots: true,
    autoplay: false,
    circular: true,
    vertical: true,
    interval: 3000,
    duration: 1000,
    // 弹出层显示
    showDialog:false,
    // 数量输入框默认值
    val:'1',
    productId:'',
    photoId:'',
    // 商品详情相关参数
    detail:[],
    path: '',
    url: '',
    // 商品详情下面的大图
    imgDetail:[],
    // 设置购买数量时大于库存不能再加
    inventory:0
  },

  previewImage:function(){
    let that=this;
    let imgArray = that.data.imgDetail;
    let str = that.data.path;
    let newArray=imgArray.map(function(item){
      return str+'/'+item
    })
    wx.previewImage({
      urls: newArray,
      success:()=>{
        console.log('接口调用成功！');
      }
    })
  },
  // 加入购物车的按钮
  addToCart:function(){
    let that=this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.showModal({
            content: '您还尚未授权，请授权后重新加入购物车！',
            showCancel: false,
            success: (res) => {
              if (res.confirm) {
                wx.switchTab({
                  url: '../my/my',
                })
              }
            }
          });
        } else {
          var openid = wx.getStorageSync('openid');
          var mallCart = {};
          mallCart.userId = openid;
          mallCart.photo_id = parseInt(that.data.photoId);
          mallCart.productCount = 1;
          wx.request({
            url: that.data.url + '/mallUserCart/insertMallCar.do',
            data: mallCart,
            success: (res) => {
              if (res.statusCode == 200) {
                wx.showToast({
                  title: '成功加入购物车',
                  icon: 'success',
                  duration: 2000,
                });
              }
            }
          });
        }
      }
    });
  },

  // 跳转至购物车
  toCart:function(){
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.showModal({
            content: '您还尚未授权，不能进行此操作！谢谢！',
            showCancel: false,
            success: (res) => {
              if (res.confirm) {
                wx.switchTab({
                  url: '../my/my',
                })
              }
            }
          });
        }else{
          wx.navigateTo({
            url: '../cart/cart',
          })
        }
      }
    })
  },

  // 切换购买层
  toggleBuy:function(){
    this.setData({
      showDialog:!this.data.showDialog
    })
  },

  // 购买数量-
  handleMinus:function(){
    var that=this;
    var value=that.data.val;
    if(value<=1){
      that.setData({
        val:value
      })
    }else{
      value--;
      that.setData({
        val: value
      })
    }
  },
  // 购买数量+
  handlePlus:function(){
    var that = this;
    var value = that.data.val;
    var inventory = that.data.detail[0].productStock;
    if (value >= inventory) {
      that.setData({
        val: inventory
      })
    } else {
      value++;
      that.setData({
        val: value
      })
    }
  },
  // 输入框数据写入
  handleBlur:function(e){
    var that = this;
    if (e.detail.value == '' || e.detail.value<=0){
      that.setData({
        val: 1
      })
    }else{
      that.setData({
        val: e.detail.value
      })
    }
    
  },
  // 下一步按钮跳转至订单页面 ---》值传递
  placeOrder:function(){
    let that=this;
    var productInfo={};
    productInfo.productId = that.data.productId;
    productInfo.discountId = that.data.discountId;
    productInfo.photoPoster = that.data.imgDetail[0];
    productInfo.productPrice = that.data.detail[0].productPrice; 
    productInfo.productName = that.data.detail[0].productName;
    productInfo.productExplain = that.data.detail[0].productExplain;
    productInfo.number = that.data.val
    if (that.data.val<=0){
      wx.showModal({
        content: '购买数量不能为零！',
        showCancel:false,
        confirmText:'确定',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }else{
      wx.setStorage({
        key: 'productInfo',
        data: productInfo
      });
      wx.navigateTo({
        url: '../placeorder/placeorder'
      });
    }  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options){
    var that=this;
    var url = app.globalData.url;
    var path = app.globalData.path;
    that.setData({
      url: url,
      path: path,
      productId: options.productId
    });
    if (options.buyNow==="true"){
      that.toggleBuy();
    }
    var productId = parseInt(that.data.productId);

    // 在详情页获取商品信息接口
    wx.showLoading({
      title: '数据请求中',
      success:function(){
        wx.showNavigationBarLoading();
        wx.request({
          url: that.data.url + '/mallProductController/queryProductByPhotoId.do',
          data: { "photoId": productId },
          success: function (res) {
            that.setData({
              detail: res.data,
              photoId: res.data[0].photoId
            });
          }
        });
        // 商品轮播图借口
        wx.request({
          url: that.data.url + '/mallPhotoController/queryPhotoByPhotoIdList.do',
          data: { "photoId": productId },
          success: function (res) {
            // 轮播图数组的设置
            var arr = [];
            for (let key in res.data[0]) {
              if (res.data[0][key] != null && key != 'photoStatus' && key != 'photoFoot') {
                arr.push(res.data[0][key]);
              }
            }
            that.setData({
              swiperImgs: arr
            });
            var imgList = [];
            // 商品参数下面的六张图片
            for (let key in res.data[0]) {
              if (res.data[0][key] != null && key != 'photoStatus') {
                imgList.push(res.data[0][key]);
              }
            }
            that.setData({
              imgDetail: imgList
            });
            if(res.statusCode==200){
              wx.hideLoading();
              wx.hideNavigationBarLoading()
            }
          }
        });
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
    wx.hideShareMenu()
    wx.updateShareMenu({
      withShareTicket: true,
      success() {
      }
    })
  },
  onShareAppMessage: function (res) {
    console.log(res);
    
    // wx.getSetting({
    //   success(res) {
    //     if (!res.authSetting['scope.userInfo']) {
    //       wx.showModal({
    //         content: '您还尚未授权，尚不能分享！！！谢谢理解！',
    //         showCancel: false,
    //         success: (res) => {
    //           if (res.confirm) {
    //             wx.switchTab({
    //               url: '../my/my',
    //             })
    //           }
    //         }
    //       });
    //     } else {
          
    //     }
    //   }
    // })
    let that=this;
    
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '欢迎来到臻便宜',
      path: '/pages/detail/detail?productId=' + that.data.productId,
      success: function (res) {
        console.log(res);
        // wx.getShareInfo({
        //   shareTicket: res.shareTickets[0],
        //   success:function(res){
        //     console.log(res)
        //   }
        // })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
  
});