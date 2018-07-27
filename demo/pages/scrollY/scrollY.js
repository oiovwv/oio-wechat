// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollNum: 0,
    scrollTop: 0,
    typeHeight: 36,
    goodHeight: 88,
    toView:'food',
    
    menu: ['分类1', '分类2', '分类3', '分类4', '分类5', '分类6', '分类7', '分类8'],
    menuType: ['food', 'dust', 'bowl', 'cages', 'toys', 'tools','aa','bb'],
    goods: [
      {
        name: '分类1', id:'food' , children:
          [
            { img: '../../images/1.png', name: '图片1', number: 10 },
            { img: '../../images/2.png', name: '图片2', number: 10 },
            { img: '../../images/4.png', name: '图片4', number: 10 },
            { img: '../../images/5.png', name: '图片5', number: 10 }
            
          ]
      },
      { name: '分类2', id:'dust', children: [
        { img: '../../images/6.png', name: '图片6', number: 10 },
        { img: '../../images/7.png', name: '图片7', number: 10 },
        { img: '../../images/8.png', name: '图片8', number: 10 }
      ] },
      {
        name: '分类3', id: 'bowl', children:
          [
            { img: '../../images/3.png', name: '图片3' }
          ]
      },
      {
        name: '分类4', id:'cages',  children: [{ img: '../../images/1.png', name: '图片1', number: 10 },
        { img: '../../images/2.png', name: '图片2', number: 10 }]
      },
      { name: '分类5', id:'toys',  children: [{ img: '../../images/5.png', name: '图片5', number: 10 }, { img: '../../images/4.png', name: '图片4', number: 10 }] },
      { name: '分类6', id: 'tools',  children: [{ img: '../../images/6.png', name: '图片6', number: 10 }] },
      { name: '分类7', id:'aa',  children: [{ img: '../../images/7.png', name: '图片7', number: 10 }] },
      { name: '分类8', id:'bb', children: [{ img: '../../images/8.png', name: '图片8', number: 10 }] }
    ]
  },

  toggle: function (e) {
    // console.log(e);
    var id = e.target.dataset.index;
    var tType = this.data.menuType[id];
    this.setData({
      scrollNum: id,
      toView: tType
    });
    console.log(this.data.scrollNum)
  },
  // scroll: function (e){
  //   // console.log(e)
  //   // var typeCount = this.data.menu.length;
  //   // var goodsCount = 0
  //   // this.data.goods.forEach((item) => {
  //   //   // console.log(item);
  //   //   goodsCount += item.children.length;
  //   // });
  //   var heightList = [0];
  //   var curHeight = 0;
  //   this.data.goods.forEach((item) => {
  //     curHeight += (this.data.typeHeight + item.children.length * this.data.goodHeight);

  //     // console.log(curHeight)
  //     heightList.push(curHeight);
  //     // console.log(heightList)
  //   });

  //   // for (var i = 0; i < heightList.length; i++) {
  //   //   if (e.detail.scrollTop >= heightList[i] && e.detail.scrollTop < heightList[i + 1]) {
  //   //     this.setData({
  //   //       scrollNum: i
  //   //     });
  //   //   }
  //   // }
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})