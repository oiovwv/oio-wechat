const app = getApp();
// modelTest.js
var model = require('../../model/model.js');

var show = false;
var item = {};

Page({
  data: {
    url: '',
    item:{ show:show},
    sex: [{ name: '先生', value: 0, checked: false }, { name: '女士', value: 1, checked: false}],
    // 选择省市区提示文字的显示与隐藏
    isShowCity:false,
    gender:'',
    address:'',
    addressEdit:{},
    operation:''
  },

  // 单选框选择
  radioChange: function(e){
    let that=this;
    that.setData({
      gender:e.detail.value
    });
  },
  // 表单验证相关 验证通过直接请求新增地址
  formSubmit:function(e){
    var that=this; 
    var uname = e.detail.value.uname;
    var regName =/^[\u4e00-\u9fa5]{2,4}$/;
    var uphone = e.detail.value.uphone;
    var regPhone = /^1[3456789]\d{9}$/;
    var addr = e.detail.value.addr;
    var sex = that.data.gender;
    var address = that.data.address
    if (!uname){
      wx.showModal({
        content: '收件人姓名不能为空！',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
          }
        }
      });
      return false
    } else if (!regName.test(uname)) {
      wx.showModal({
        content: '请输入合理的姓名！',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
          }
        }
      });
      return false
    }else if(sex==null){
      wx.showModal({
        content: '请选择一个礼貌性的称呼！',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
          }
        }
      });
      return false
    }else if (!uphone){
      wx.showModal({
        content: '联系电话不能为空！',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
          }
        }
      });
      return false
    } else if (!regPhone.test(uphone)){
      wx.showModal({
        content: '请输入正确的手机号!',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
          }
        }
      });
      return false
    } else if (address=null){
      wx.showModal({
        content: '请选择省市区！',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
          }
        }
      });
      return false
    } else if (!addr){
      wx.showModal({
        content: '收货地址不能为空！',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
          }
        }
      });
      return false
    }else{
      // 获取后台所需参数 
      var openId = wx.getStorageSync('openid');
      var mallAddress = {};
      var address = that.data.address;
      // 将参数封装成对象进行传递 
      mallAddress.userId = openId;
      mallAddress.addressName = uname;
      mallAddress.addressSex = sex;
      mallAddress.addressPhone = uphone;
      mallAddress.address_provinces = address;
      mallAddress.addressPath = addr;
      mallAddress.status = 1;
      var openId = wx.getStorageSync('openid');
      wx.request({
        url: that.data.url + '/mallAddressControll/updefaultByinsertorupd.do',
        data: { 'userId': openId},
        success:(res)=>{
          console.log('设置状态为0');
        }
      });
      var operation = that.data.operation;
      if (operation =='addAddress'){
        // 新增地址
        wx.request({
          url: that.data.url + '/mallAddressControll/insertMallAdress.do',
          data: mallAddress,
          success: (res) => {
            if (res.statusCode == 200) {
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 1000
              });
              setTimeout(function () {
                wx.redirectTo({
                  url: '../addr/addr'
                })
              }, 2000);
            }
          }
        });
      } else if (operation == 'edit'){
        var addressEdit = that.data.addressEdit; 
        mallAddress.id = addressEdit.id;
        wx.request({
          url: that.data.url + '/mallAddressControll/updateMallAddress.do',
          data: mallAddress,
          success: (res) => {
            if (res.statusCode == 200) {
              wx.removeStorage({
                key: 'addr',
                success: function (res) {
                  console.log('清除地址缓存成功');
                },
              });
              wx.showToast({
                title: '修改成功',
                icon: 'success',
                duration: 1000
              });
              setTimeout(function () {
                wx.redirectTo({
                  url: '../addr/addr'
                })
              }, 2000);
            }
          }
        });
      } 
    }
  },
  
  onLoad:function(options){
    let that=this;
    var url = app.globalData.url;
    var path = app.globalData.path;   
    that.setData({
      url: url,
      path: path,
      operation: options.operation
    });
    if (that.data.operation =='edit'){
      wx.getStorage({
        key: 'addr',
        success: res => {
          if (res.data) {
            if (res.data.addressSex == 0) {
              that.data.sex[0].checked = true;
              that.data.sex[1].checked = false;
              that.setData({
                sex: that.data.sex,  
              })
            } else {
              that.data.sex[0].checked = false;
              that.data.sex[1].checked = true;
              that.setData({
                sex: that.data.sex,
              })
            }
            //点击修改时，页面进来加载就有值的赋值处理
            that.setData({
              addressEdit: res.data,
              gender: res.data.addressSex,
              isShowCity: !this.data.isShowCity,
              address: res.data.address_provinces
            });
          }
        }
      });
    }
    
  },

  //生命周期函数--监听页面初次渲染完成
  onReady: function (e) {
    var that = this;
    //请求数据
    model.updateAreaData(that, 0, e);
  },
  //点击选择城市按钮显示picker-view
  translate: function (e) {
    console.log(e);
    model.animationEvents(this, 0, true, 400);
  },
  //隐藏picker-view
  hiddenFloatView: function (e) {
    console.log(e);
    model.animationEvents(this, 200, false, 400);
  },
  //滑动事件
  bindChange: function (e){
    model.updateAreaData(this, 1, e);
    item = this.data.item;
    console.log(this.data.addressEdit);
    this.setData({
      isShowCity: !this.data.isShowCity,
      province: item.provinces[item.value[0]].name,
      city: item.citys[item.value[1]].name,
      county: item.countys[item.value[2]].name,
      address: item.provinces[item.value[0]].name + item.citys[item.value[1]].name + item.countys[item.value[2]].name
    });
  }
})
