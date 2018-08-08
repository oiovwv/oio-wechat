const util = require("../../utils/util.js");
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,//选中的项
    motto: 'Hello Worldss',
    userInfo: {},
    listData: "",//数据组
    pageIndex: 1,//页数
    date: "",//时间
    mindate: "",//最小时间
    maxdate: "",//最大时间
    changetime: '',
    time: "12:01",
    tokens: "sa",
    loading: false, // "上拉加载"的变量，默认false，隐藏 
    loaded: false, //“没有数据”的变量，默认false，隐藏 
    activeSortingName: "综合排序",
    sortingList: [{ key: 1, value: "智能排序" }, {
      key: 2, value: "价格最低"
    }, {
      key: 3, value: "价格最高"
    }, {
      key: 4, value: "服务最好"
    }, {
      key: 5, value: "环境最好"
    }, {
      key: 6, value: "预约最快"
    }],
  },
  //条件选择
  choiceItem: function (e) {
    switch (e.currentTarget.dataset.item) {
      case "1":
        if (this.data.chioceDistrict) {
          this.setData({
            districtChioceIcon: "/images/icon-go-black.png",
            sortingChioceIcon: "/images/icon-go-black.png",
            chioceDistrict: false,
            chioceSorting: false,
            chioceFilter: false,
          });
        }
        else {
          this.setData({
            districtChioceIcon: "/images/icon-down-black.png",
            sortingChioceIcon: "/images/icon-go-black.png",
            chioceDistrict: true,
            chioceSorting: false,
            chioceFilter: false,
          });
        }
        break;
      case "2":
        if (this.data.chioceSorting) {
          this.setData({
            districtChioceIcon: "/images/icon-go-black.png",
            sortingChioceIcon: "/images/icon-go-black.png",
            chioceDistrict: false,
            chioceSorting: false,
            chioceFilter: false,
          });
        }
        else {
          this.setData({
            districtChioceIcon: "/images/icon-go-black.png",
            sortingChioceIcon: "/images/icon-down-black.png",
            chioceDistrict: false,
            chioceSorting: true,
            chioceFilter: false,
          });
        }
        break;
      case "3":
        if (this.data.chioceFilter) {
          this.setData({
            districtChioceIcon: "/images/icon-go-black.png",
            sortingChioceIcon: "/images/icon-go-black.png",
            chioceDistrict: false,
            chioceSorting: false,
            chioceFilter: false,
          });
        }
        else {
          this.setData({
            districtChioceIcon: "/images/icon-go-black.png",
            sortingChioceIcon: "/images/icon-go-black.png",
            chioceDistrict: false,
            chioceSorting: false,
            chioceFilter: true,
          });
        }
        break;
    }
  },

  //综合排序
  selectSorting: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      sortingChioceIcon: "/images/icon-go-black.png",
      chioceSorting: false,
      activeSortingIndex: index,
      activeSortingName: this.data.sortingList[index].value,
      productList: [],
      pageIndex: 1,
      loadOver: false,
      isLoading: true
    })
    //this.getProductList();
  },

  //获取参数token
  GetToken: function () {
    var that = this;
    let pageIndex = that.data.pageIndex;
    let date = that.data.date;
    wx.request({
      url: 'http://10.0.0.101/zd/Home/GetMD5Token',
      data: { appId: '687D7C5DD80E4F0588D5FC2327DE248A' },
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        if (res.data.Data != null) {
          that.setData({
            tokens: res.data.Data,
          });
        }
      },
      fail: function () {

      },
      complete: function () {

      }
    })
  },
  //上拉加载调用数据
  LoadList: function () {
    var that = this;
    let pageIndex = that.data.pageIndex;
    let date = that.data.date;
    let tokens = that.data.tokens;
    wx.request({
      url: 'http://data.zemedia.com.cn:8080/zd/ZD_WxAndWbLists/GetCommonListDatas',
      data: {
        listid: '32', typeid: '1', time: '2018-04-22', webid: '87', pageindex: pageIndex, pagesize: '14', lanmuname: '', appId:
        '687D7C5DD80E4F0588D5FC2327DE248A', token: "86ba57b7805b5a009e981e724d4f9725"
      },
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success: function (res) {

        var ite = that.data.listData;
        if (res.data.Data == null)//token过期了
        {
          that.GetToken(); //重新取一遍token
          that.LoadList();
        } else {
          if (res.data.Data.datalist.length != 0) {
            for (var i = 0; i < res.data.Data.datalist.length; i++) {
              ite.push(res.data.Data.datalist[i]);
            }
            that.setData({
              listData: ite,
              loading: true,
            });
          } else { // 数组为空
            that.setData({
              loading: false,  //把"上拉加载"的变量设为true，隐藏
              loaded: true,  //把"上拉加载完成"的变量设为false，显示
            })
          }
        }
      },
      fail: function () {

      },
      complete: function () {

      }
    })
  },
  //下拉刷新或者第一次加载数据
  gainLoadingListData: function () {
    var that = this;
    let pageIndex = that.data.pageIndex;
    let date = that.data.date;
    let tokens = that.data.tokens;
    wx.request({
      url: 'http://data.zemedia.com.cn:8080/zd/ZD_WxAndWbLists/GetCommonListDatas',
      data: {
        listid: '32', typeid: '1', time: '2018-04-22', webid: '87', pageindex: pageIndex, pagesize: '14', lanmuname: '', appId:
        '687D7C5DD80E4F0588D5FC2327DE248A', token: "86ba57b7805b5a009e981e724d4f9725"
      },
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        if (res.data.Data == null)//token过期了
        {
          that.GetToken(); //重新取一遍token
          that.gainLoadingListData();
        } else {
          that.setData({ listData: res.data.Data.datalist, loaded: false });
        }
      },
      fail: function () {

      },
      complete: function () {

      }
    })

  },
  //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    let that = this;
    let currentTab = that.data.currentTab;
    that.setData({
      pageIndex: 1,
    })
   
      this.gainLoadingListData();
    


  },
  //上拉加载
  onReachBottom: function () {
    let that = this;
    wx.showLoading({
      title: '正在加载',
    })
    that.setData({

      loading: true,
      pageIndex: that.data.pageIndex + 1,
    })
      this.LoadList();
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)

  },
  //初始
  onLoad: function () {
    var that = this;
    let pageIndex = that.data.pageIndex;
    that.gainLoadingListData();
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },
  
 
})
