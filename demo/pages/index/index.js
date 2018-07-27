//index.js
//获取应用实例
const app = getApp()

var aaa='sdasfja';
// function aaa(){
//   var aaa='adasfasfa'
//   return aaa;
// }
Page({
  data: {
    num:5,
    list:[],
    t1:{txt:'我是模版A的内容'},
    t2: { txt: '我是模版B' },

    // aaa:aaa()
    motto: 'Hello World',
    width:'',
    key1:"",
    key2: "",
    key3: "",
    key4:'',
    key5:'',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    address:'',
    animationData:{},
    txtList: [
      {txt:'感觉丧失那几个女生的恐惧感你说的感慨是SD卡给你SD卡'},
      { txt: '苏格兰开始了对顾客SD卡老公说了德国历史上来看过来看' },
      { txt: '说的话根深蒂固不是个都不是' },
    ],
    autoplay: true,
    circular: true,
    vertical: true,
    interval: 3000,
    duration: 1000,
    
  },
  click:function(){
    this.dialog.showDialog()
  },
  _cancelEvent:function(){
    this.dialog.hideDialog()
  },
  _confirmEvent:function(){
    this.dialog.hideDialog()
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },


  previewImage:()=>{
    wx.previewImage({
      urls: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526435187&di=c0d2fb346aeed6af6946e98699d46363&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3Dfe36870588cb39dbc1c0675ee01409a7%2Fbd3134738bd4b31ca4f377548ed6277f9c2ff86b.jpg','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525840471002&di=56db23490fcf39a738866b34f482d7fd&imgtype=0&src=http%3A%2F%2Fimg1.tgbusdata.cn%2Fthumbnail%2Fjpg%2FOGQ4NCw5NjAsMjAwLDQsMSwxLC0xLDEsMSxyazUw%2Fu%2Fpc.tgbus.com%2Fuploads%2Fallimg%2F140728%2F303-140HQ40141-51.jpg'], // 需要预览的图片http链接列表
      success:()=>{
        console.log('接口调用成功');
      }
    })
  },

  Keyinput1: function (e) {
    var that = this;
    that.setData({
      key1: e.detail.value,
    })
  },
  Keyinput2: function (e) {
    var that = this;
    that.setData({
      
      key2: e.detail.value

    })
  },
  Keyinput3: function (e) {
    var that = this;
    that.setData({
      key3: e.detail.value
    })
  },
  Keyinput4: function (e) {
    var that = this;
    that.setData({
      key4: e.detail.value
    })
  },
  Keyinput5: function (e) {
    var that = this;
    that.setData({
      key5: e.detail.value
    })
  },
  clickMe: function () {
    var that = this;
    var name= that.data.key1;
    var sex = that.data.key2;
    // console.log(parseInt(that.data.key3));
    var phone = that.data.key3;
    
    
    var path = that.data.key4;
    var time = that.data.key5;


    var str2 = '';


    var str ='张是是多13123546987广东省广州市海珠区新港中路397号';

    var str1 = "{'openid':'oRRxc5ZGNXdbHRJhqU9RC04m5AgM',}";
    var index1=str1.indexOf(':');
    var index2 = str1.indexOf(',');
    var id = str1.slice(index1+2, index2-1);
    console.log(id);

    wx.showToast({
      title: '支付成功',
      icon: 'none',
      duration: 2000
    });



    var index=str.indexOf('1');
    var phone=str.slice(index,index+11);
    console.log(phone);


    var list = [
      { productId: "7", discountId: "", photoPoster: "product/wine/winePoster.jpg", productPrice: 1111, productName: "黄果酒", "productExplain": "袋", "number": 1 },
      { productId: "7", discountId: "", photoPoster: "product/wine/winePoster.jpg", productPrice: 1111, productName: "黄果酒", "productExplain": "袋", "number": 1 }
      ];

    for (var i = 0; i < list.length; i++) {
      list[i].user_id = 'oRRxc5ZGNXdbHRJhqU9RC04m5AgM';
      list[i].addr = str;
      list[i].phone = phone
    }
    var arg=JSON.stringify(list);

    // var arg = '["1","2"]';
    // console.log(arg);
    // console.log(typeof arg);
    // console.log(name);
    wx.request({
      url: 'http://192.168.0.105:8080/Lxkj_WeChatMall/mallPhotoController/selectlunbo.do',
      // url: 'http://192.168.0.116:8080/Lxkj_WeChatMall/mallOrederController/aaa.do',
      // url: 'http://192.168.0.116:8080/Lxkj_WeChatMall/WxPayController/ttt.do',
      // url:'http://localhost:3000/users/selectUser',
      // url: 'http://localhost:3000/users/selectOneUser',
      // url: 'http://192.168.0.116:8080/Lxkj_WeChatMall/mallOrederController/addorder.do',
      // url: 'http://192.168.0.102:8080/Lxkj_WeChatMall/mallOrederController/selectByOrderNumber.do',
      // url: 'http://192.168.0.102:8080/Lxkj_WeChatMall/mallOrederController/selectByOpenId.do',
      // url: 'http://192.168.0.102:8080/Lxkj_WeChatMall/mallOrederController/deleteByOrderNumber.do',
      // url: 'http://192.168.0.102:8080/Lxkj_WeChatMall/mallOrederController/lfFailChangeStatus.do',
      // url: 'http://192.168.0.102:8080/Lxkj_WeChatMall/mallProductController/showPrductList.do',
      // url: 'http://192.168.0.102:8080/Lxkj_WeChatMall/mallOrederController/ceshijson.do',
      // url: 'http://192.168.0.102:8080/Lxkj_WeChatMall/mallOrederController/ceshijson.do',
      // data: { 'openid': 'oRRxc5ZGNXdbHRJhqU9RC04m5AgM'},
      // data: { 'ordernumber': "9760820180515" },
      // data: { 'ordernumber': "1126220180514" },
      // data:{uid:name,uname:sex,uage:phone},
      // data: {
      //   'addressName': name, 'addressSex':sex,'addressPhone':phone,'addressPath':path,'createTime':time},
      // header: {'content-type': 'application/json'},
      success: function(res){
        that.setData({
          list:res.data
        })

        console.log(res);
        console.log(res.data);
        console.log('请求成功');
      },
      fail: function (res) {
        console.log('请求失败！');
      }
    })
  },
  onLoad: function(){
    let that=this;
    wx.createSelectorQuery().select('#canvas').boundingClientRect(function (rect) {
      console.log(rect.width)   // 节点的宽度
    }).exec();


    var ctx = wx.createCanvasContext('firstCanvas');
    var text = '还是结婚是个好时机客观上科技公司控股';
    ctx.setFontSize(13);
    
    ctx.setTextBaseline('middle');
    var w = ctx.measureText(text).width;
    console.log(w);
    var x = w;
    setInterval(function () {
      ctx.clearRect(0, 0, 300, 60);
      ctx.setFillStyle("#E7759A");
      ctx.fillText(text, x, 15);
      ctx.draw();
      x -= 10;
      if (x <= -w) {
        x = w ;
      }
    }, 130);


    if (app.globalData.userInfo){
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  upLoad:function(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: 'http://192.168.0.102:8080/Lxkj_WeChatMall/mallOrederController/selectByOpenId.do', 
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = res.data
            //do something
          }
        })
      }
    })
  },


  onReady:function(){
    this.dialog = this.selectComponent("#dialog");
    this.aaa = this.selectComponent("#toastedit");
  },
  
  showToast:function(){
    this.aaa.showToast('我是组件内容',2000)
  },

  onShow:function(){
    // 动画函数
    var animation = wx.createAnimation({
      duration: 5000,
      timingFunction: 'ease',
    });
    this.animation = animation;
    animation.scale(0.5,0.5).rotate(45).step();
    this.setData({
      animationData: animation.export()
    })
  } 
})
