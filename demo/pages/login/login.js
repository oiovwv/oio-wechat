// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex:0,
    currentIndex:0,
    tabs:[
      { name: '分类1', id: 0, isHasChild: true, children: 
        [
        { img: '../../images/1.png', name: '图片1', number: 10}, 
        { img: '../../images/2.png', name: '图片2', number: 10 },
        { img: '../../images/4.png', name: '图片4', number: 10 }, 
        { img: '../../images/5.png', name: '图片5', number: 10 },
        { img: '../../images/6.png', name: '图片6', number: 10 },
        { img: '../../images/7.png', name: '图片7', number: 10 },
        { img: '../../images/8.png', name: '图片8', number: 10 },
        
          
          
          
          
          
        ]
      },
      { name: '分类2', id: 1, isHasChild: false, children:[]},
      {name: '分类3', id: 2, isHasChild: true, children:
        [
          { img: '../../images/3.png', name: '图片3' }
        ]
      },
      {
        name: '分类4', id: 3, isHasChild: true, children: [{ img: '../../images/1.png', name: '图片1', number: 10 },
        { img: '../../images/2.png', name: '图片2', number: 10 }] },
      { name: '分类5', id: 4, isHasChild: true, children: [{ img: '../../images/5.png', name: '图片5', number: 10 }, { img: '../../images/4.png', name: '图片4', number: 10 }]},
      { name: '分类6', id: 5, isHasChild: true, children: [{ img: '../../images/6.png', name: '图片6', number: 10 }] },
      { name: '分类7', id: 6, isHasChild: true, children: [{ img: '../../images/7.png', name: '图片7', number: 10 }]},
      { name: '分类8', id: 7, isHasChild: true, children: [{ img: '../../images/8.png', name: '图片8', number: 10 }]  }
    ]
  },

  toggle:function(e){
    let that=this;
    // console.log(e);
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    that.setData({
      currentIndex:index,
      activeIndex:id
    })
  },
  // lower:function(e){
  //   let that=this;
  //   console.log(e);
  //   console.log('滚到底部了');
  //   var aIndex = that.data.activeIndex;
  //   var cIndex = that.data.currentIndex;
  //   ++aIndex;
  //   ++cIndex;
  //   that.setData({
  //     activeIndex: aIndex,
  //     currentIndex:cIndex
  //   })
  // },
  // upper:function(e){
  //   let that = this;
  //   console.log(e);
  //   console.log('滚到顶部了');
  //   var aIndex = that.data.activeIndex;
  //   var cIndex = that.data.currentIndex;
  //   aIndex--;
  //   cIndex--;
  //   that.setData({
  //     activeIndex: aIndex,
  //     currentIndex: cIndex
  //   })
  // },
  // scroll:function(e){
  //   let that=this;
  //   console.log('在滚');
  //   var arr = that.data.tabs;
  //   var aIndex = that.data.activeIndex;
  //   var cIndex = that.data.currentIndex;
  //   for(var i=0;i<arr.length;i++){
  //     if (arr[i].children.length===0){
  //       ++aIndex;
  //       ++cIndex;
  //       that.setData({
  //         activeIndex: aIndex,
  //         currentIndex: cIndex
  //       })
  //     }
  //   }
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