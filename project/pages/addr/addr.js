const app = getApp();

Page({
  data: {
    isShowAddr: true,
    addressList: [],
    url:'',
    openId:'',
    source:''
  },
  chooserShippingAddr:function(e){
    let that=this;
    var addressList = that.data.addressList;
    var index = e.currentTarget.dataset.id;
    var arr=addressList[index];
    wx.setStorage({
      key: 'shippingAddr',
      data: arr
    })
    if (that.data.source =='fromPlaceorder'){
      wx.redirectTo({
        url: '../placeorder/placeorder'
      });
    } else if (that.data.source == 'fromMy'){
    }
    
  },

  // 设置默认
  setDefault:function(e){
    let that=this;
    console.log(e.detail.value);
    wx.request({
      url: that.data.url + '/mallAddressControll/updefaultByinsertorupd.do',
      data: { 'userId': that.data.openId },
      success: (res) => {
        if (res.statusCode == 200) {
          wx.request({
            url: that.data.url + '/mallAddressControll/updefaultByid.do',
            data: { 'id': e.currentTarget.dataset.id },
            success: (res) => {
              if (res.statusCode == 200) {
                wx.request({
                  url: that.data.url + '/mallAddressControll/queryMallAddress.do',
                  data: { 'userId': that.data.openId },
                  success: res => {
                    that.setData({
                      addressList: res.data
                    });
                  }
                });
              }
            }
          });
        }
      }
    }); 
  },
  //删除事件
  del:function (e){
    var that = this;
    var openId=that.data.openId;
    var addressList=that.data.addressList;
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      content: '确定删除此地址吗？此操作无法恢复哦！',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm){
          if(e.currentTarget.id!=undefined){
            var index = e.currentTarget.id;
            wx.request({
              url: that.data.url + '/mallAddressControll/deletMallAddress.do',
              data: {'id': id},
              success: (res) => {
                if (res.statusCode==200){
                  wx.showToast({
                    title: '删除成功',
                    icon: 'success',
                    duration: 500
                  });
                  addressList.splice(index, 1);
                  that.setData({
                    addressList:addressList
                  });
                  if (addressList.length==0){
                    that.setData({
                      isShowAddr: !that.data.isShowAddr
                    })
                  }
                }
              }
            });
          }  
        }else {
        }
      }
    });
  },
  // 新增地址
  addAddr: function (e){
    var arg = e.currentTarget.dataset.operation;
    wx.navigateTo({
      url: '../edit/edit?operation='+arg
    });
  },

  // 编辑地址
  edit:function(e){
    let that = this;
    var addrList = that.data.addressList;
    var index = e.currentTarget.id; 
    wx.setStorage({
      key: 'addr',
      data: addrList[index],
    });
    var arg = e.currentTarget.dataset.operation;
    wx.navigateTo({
      url: '../edit/edit?operation='+arg,
      success:()=>{
        wx.setNavigationBarTitle({
          title: '修改地址',
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options){
    var that=this;
    var arr = Object.keys(options);
    if(arr.length==0){
      that.setData({
        source: ''
      })
    }else{
      that.setData({
        source: options.source
      })
    }
    var url = app.globalData.url;
    var path = app.globalData.path;
    var openId = wx.getStorageSync('openid');
    that.setData({
      url: url,
      path: path,
      openId:openId
    });
 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(){
    
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (){
    let that = this;   
    wx.request({
      url: that.data.url + '/mallAddressControll/queryMallAddress.do',
      data: { 'userId': that.data.openId },
      success: (res) => {
        that.setData({
          addressList: res.data
        })
        if (that.data.addressList.length != 0){
          that.setData({
            isShowAddr: true
          })
        } else {
          that.setData({
            isShowAddr: false
          });
        }
      }
    });
  }
})