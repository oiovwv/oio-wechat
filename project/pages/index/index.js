//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    // 轮播数据
    swiperImgs: [],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    vertical: false,
    txtVertical:true,
    interval: 3000,
    duration: 1000,
    path:'',
    url:'',
    txtList: [],
    productGrid:[],
    discounts:[],
    showLoading:true,
    isLoadmore:true
  },
  
  //页面加载
  onLoad: function (){
    let that=this;
    var url = app.globalData.url;
    var path = app.globalData.path; 
    that.setData({
      url: url,
      path:path
    });
    wx.showLoading({
      title: '玩命加载中',
      success:function(){
        wx.request({
          url: that.data.url + '/mallUserController/queryadvert.do',
          success: (res) => {
            var txtArray = res.data.split('|');
            that.setData({
              txtList: txtArray
            });
          }
        });
        // 轮播图接口
        wx.request({
          url: that.data.url + '/mallPhotoController/selectlunbo.do',
          success: function (res) {
            var arr = res.data;
            var imgArr=[];
            for(let i in arr[0]){
              if (arr[0][i]!=null){
                imgArr.push(arr[0][i])
              }
            }
            // console.log(imgArr);
            that.setData({
              swiperImgs: imgArr
            })
          }
        });
        // 九宫格图片接口
        wx.request({
          url: that.data.url + '/mallProductController/showPrductList.do',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            var grid = res.data;
            var list = [];
            for (var i = 0; i < grid.length; i++) {
              var obj = {};
              obj.photoId = grid[i].photoId;
              obj.photoPoster = grid[i].photoPoster;
              list.push(obj);
            }
            that.setData({
              productGrid: list
            })
          }
        });
        // 打折商品
        wx.request({
          url: that.data.url + '/mallProductController/showPrductListzhe.do',
          success: function (res) {
            that.setData({
              discounts: res.data
            });
            if(res.statusCode===200){
              wx.hideLoading();
            }
          }
        });
      }
    });
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow(){
    
  },
  onReachBottom(){
    let that=this;
    that.setData({
      showLoading: !that.data.showLoading
    },()=>{
      setTimeout(()=>{
        that.setData({
          isLoadmore: !that.data.isLoadmore
        })
      },2000)
    })

    console.log('上拉加载');
  }
})
