// pages/cart/cart.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: '',//标识符
    // 购物车页面初始样式
    isShowCart:true,
    // 是否选中
    isChecked:false,
    totalPrice: 0,           // 总价，初始为0
    selectAllStatus: false,  // 全选状态，默认全选
    isDisabled:true,
    //默认全隐藏删除
    cartList:[],
    startX: 0, //开始坐标
    startY: 0, 
    url:'',
    path:'',
    openid:''
  },

  // 购物车页面为空时去看看
  toSee:function(){
    wx.reLaunch({
      url: '../all/all',
    });
  },

  // 获取总价格
  getTotalPrice() {
    var carts = this.data.cartList;//获取购物车列表
    var total = 0;//定义总价
    for (var i = 0; i < carts.length; i++) {//遍历列表
      if (carts[i].selected) {//如果产品被选中才会计算总价
        total += carts[i].productPrice * carts[i].number;
      }
    }
    this.setData({
      cartList: carts,
      totalPrice: total.toFixed(2)
    });
    app.globalData.cartList = carts;
  },
  // 选择事件
  select:function(e){
    let that = this;
    var carts = that.data.cartList;//获取购物车列表
    var index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    var selected = carts[index].selected;         // 获取当前商品的选中状态 --false
    carts[index].selected = !selected;  // 改变状态 ---true
    var count=0;          //计算当前选中的数量
    //如果有一个没有选中就设置全选取消
    if (!carts[index].selected && that.data.selectAllStatus){
      that.setData({
        selectAllStatus: false
      })
    }
    for(var i=0;i<carts.length;i++){
      if (carts[i].selected) {
        count++;
        if(count==carts.length){
          that.selectAll()
        }
      }
    }
    that.setData({
      cartList: carts
    });
    app.globalData.cartList = carts;
    that.getTotalPrice();                           // 重新获取总价
  },

  // 全选事件
  selectAll(){
    var carts = this.data.cartList;//获取购物车列表
    var selectAllStatus = this.data.selectAllStatus;    // 获取全选状态  默认false
    selectAllStatus = !selectAllStatus;//点击之后改变当前状态  true
    for(var i = 0; i < carts.length; i++){
      carts[i].selected = selectAllStatus;            // 改变所有商品状态 ---true
    }
    // 重新赋值渲染
    this.setData({
      selectAllStatus: selectAllStatus,
      cartList: carts
    });
    app.globalData.cartList = carts;
    // 重新计算总价
    this.getTotalPrice();
  },

  // 购买数量-
  handleMinus: function(e){
    let that = this;
    var carts = that.data.cartList;//获取购物车列表
    var index = e.currentTarget.dataset.index;
    var num = carts[index].number;
    var subtotal = carts[index].subtotal;
    var productPrice = carts[index].productPrice;
    if (num <= 1) {
      num=1;
      carts[index].subtotal = num * productPrice;
    } else {
      num--;
      carts[index].number = num;
      carts[index].subtotal = num * productPrice;
      that.setData({
        cartList: carts
      });
      app.globalData.cartList = carts;
      that.getTotalPrice();
    }
  },
  // 购买数量+
  handlePlus: function (e) {
    console.log(e);
    let that = this;
    var carts = that.data.cartList;//获取购物车列表
    var index = e.currentTarget.dataset.index;
    var num = carts[index].number;
    var subtotal = carts[index].subtotal;
    var productPrice = carts[index].productPrice;
    if (num >= 50){
      wx.showModal({
        content: '已达到购买上限！可以看看其他商品哦！',
        showCancel:false,
        success:(res)=>{
          if(res.confirm){
            console.log('用户点击确定');
          }
        }
      });
      num=50;
      carts[index].subtotal = num * productPrice;
    } else {
      num++;
      carts[index].number = num;
      carts[index].subtotal = num * productPrice;
      that.setData({
        cartList: carts
      });
      app.globalData.cartList = carts;
      that.getTotalPrice();
    }
  },
  // 输入框数据写入
  handleBlur: function(e){
    console.log(e);
    let that = this;
    var carts = that.data.cartList;//获取购物车列表
    var index = e.currentTarget.dataset.index;
    var productPrice = carts[index].productPrice;
    if (e.detail.value>=50){
      e.detail.value=50;
      carts[index].subtotal = e.detail.value * productPrice;
    } else if (e.detail.value <= 1){
      e.detail.value = 1;
      carts[index].subtotal = e.detail.value * productPrice;
    }else{
      carts[index].number = e.detail.value;
      carts[index].subtotal = carts[index].number * productPrice;
    }
    
    that.setData({
      cartList: carts
    });
    app.globalData.cartList = carts;
    that.getTotalPrice();
  },
  //删除事件
  del: function(e){
    var that = this;
    var cartId = e.currentTarget.dataset.id;
    var carts=that.data.cartList;
    wx.showModal({
      content: '确定要删除此商品吗？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          if (e.currentTarget.id != undefined) {
            var index = parseInt(e.currentTarget.id);
            wx.request({
              url: that.data.url + '/mallUserCart/deletMallCar.do',
              data:{ cartId: cartId},
              success:(res)=>{
                if(res.statusCode==200){
                  carts.splice(index, 1);
                  that.setData({
                    cartList: carts
                  });
                  app.globalData.cartList = carts;
                  // 重新计算总价
                  that.getTotalPrice();
                  if (Object.prototype.toString.call(carts) === '[object Array]' && carts.length === 0){
                    that.setData({
                      isShowCart: !that.data.isShowCart
                    });
                  }
                }
              }
            });
          }
        } else {
          console.log('用户点击辅助操作');
        }
      }
    });
  },

  // 结算按钮
  order: function(){
    let that=this;
    var productInfo = that.data.cartList;
    var list = [];
    //遍历商品列表，如果当前商品选中，全部存在list中传给确认订单页面
    for (var i = 0; i < productInfo.length;i++){ 
      if (productInfo[i].selected){
        list.push(productInfo[i]);
        wx.setStorage({
          key: 'productInfo',
          data: list
        });
      }
    }
    // 判断用户有没有选择商品，没有就不让跳转
    if(list.length>0){
      wx.navigateTo({
        url: '../placeorder/placeorder',
        success:function(){
          that.setData({
            selectAllStatus:false,
            totalPrice: 0
          });
        }
      });
    }else{
      wx.showModal({
        content: '您还没有选择商品哦！',
        showCancel: false,
        confirmText: '确定',
        success: (res) => {
          if (res.confirm) {
            console.log('用户点击确定');
          }
        }
      })
    }  
  },

  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    console.log(e)
    //开始触摸时 重置所有删除
    this.data.cartList.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      cartList: this.data.cartList
    })
  },

  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.cartList.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      cartList: that.data.cartList
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    var url = app.globalData.url;
    var path = app.globalData.path;
    var cart = app.globalData.cartList;
    that.setData({
      url: url,
      path: path,
      cartList: cart
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
  onShow: function(){
    let that=this;
    var openid = wx.getStorageSync('openid');
    wx.request({
      url: that.data.url + '/mallUserCart/queryMallCar.do',
      data: { userId: openid },
      success: (res) => {
        var cartList = that.data.cartList;
        if (Object.prototype.toString.call(res.data) === '[object Array]' && res.data.length === 0) {
          app.globalData.cartList = res.data;
          that.setData({
            cartList: res.data,
            isShowCart: !that.data.isShowCart
          })
        } else {
          var list = [];
          for (var i = 0; i < res.data.length; i++) {
            var obj = {};
            obj.cartId = res.data[i].cartId;
            obj.photoPoster = res.data[i].product.mallPhoto.photoPoster;
            obj.productPrice = res.data[i].product.productPrice;
            obj.number = res.data[i].productCount;
            obj.productName = res.data[i].product.productName;
            obj.productExplain = res.data[i].product.productExplain;
            obj.selected = false;
            obj.isTouchMove = false;
            obj.subtotal = obj.number * obj.productPrice;
            list.push(obj);
          }
          app.globalData.cartList = list;
          that.setData({
            cartList: list,
            isShowCart: true
          })
        }
      }
    });
  }
})