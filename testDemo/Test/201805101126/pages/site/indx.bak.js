const util = require("../../utils/util.js");
var me;
var sx = 0;
var sy = 0;
var ex = 0;
var ey = 0;
var difx = 0;
var dify = 0;
var deltax = 0;
var deltay = 0;
Page({
    data: {
       /* pdata_sf: {
            listid: listid,
            typeid: '1',
            time: date,
            webid: webid,
            pageindex: pageIndex,
            pagesize: '20',
            lanmuname: '',
            appId: '687D7C5DD80E4F0588D5FC2327DE248A',
            token: tokens
        },
        pdata_cf: {
            listid: listid,
            typeid: '1',
            time: date,
            webid: webid,
            pageindex: pageIndex,
            pagesize: '20',
            lanmuname: '',
            appId: '687D7C5DD80E4F0588D5FC2327DE248A',
            token: tokens
        },*/
        sf: {
            height_total:0,
            ptop: 0, pleft: 0,
            one_width: 80,
            one_height: 32,
            two_width: 30,
            two_height: 32,
            three_height: 0,
            three_width: 80,
            four_width: 0,
            four_height: 0,
            fwidth: 320,
            fheight: 400,
            scleft: 0,
            sctop: 0,
            sctop_three: 0,
            sctop_four: 0,
            scleft_two: 0,
            scleft_four: 0,
            dom: 4
        },
        cf: {
            ptop: 0, pleft: 0,
            one_width: 80,
            one_height: 32,
            two_width: 30,
            two_height: 32,
            three_height: 0,
            three_width: 80,
            four_width: 0,
            four_height: 0,
            fwidth: 320,
            fheight: 400,
            scleft: 0,
            sctop: 0,
            sctop_three: 0,
            sctop_four: 0,
            scleft_two: 0,
            scleft_four: 0,
            dom: 4
        },
        isdata: false,
        length: 20,
        winWidth: 0,
        winHeight: 0,
        currentTab: 87,//选中的项
        motto: 'Hello Worldss',
        userInfo: {},
        listData: "",//微博数据组
        listWxData: "",//微信数据组
        pageIndex: 1,//页数
        date: "",//时间
        mindate: "",//最小时间
        maxdate: "",//最大时间
        changetime: '',
        time: "12:01",
        tokens: "sa",
        istrue: false,
        loading: false, // "上拉加载"的变量，默认false，隐藏
        loaded: false, //“没有数据”的变量，默认false，隐藏
        show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
        index: 0, //选择的下拉列表下标
        selected: true,
        selected1: false,
        select1: '',
        select2: '',
        shownavindex: '',
        content: [],
        listid: '6',
        chioceSorting: false,
        activeSortingName: "卫视两微榜",
        sortingChioceIcon: "/images/icon-go-black.png",
        dateChioceIcon: "/images/icon-go-black.png",
        content: [],
        nv: [],
        px: [],
        qyopen: false,
        qyshow: false,
        nzopen: false,
        pxopen: false,
        nzshow: false,
        pxshow: false,
        isfull: false,
        cityleft: '',
        citycenter: '',
        cityright: {},
        select1: '',
        select2: '',
        select3: '',
        shownavindex: '',
        bdname: '省级卫视综艺栏目两微榜'
    },
    listqy: function (e) {
        if (this.data.qyopen) {
            this.setData({
                qyopen: false,
                nzopen: false,
                pxopen: false,
                nzshow: true,
                pxshow: true,
                qyshow: false,
                isfull: false,
                shownavindex: 0
            })
        } else {
            this.setData({
                qyopen: true,
                pxopen: false,
                nzopen: false,
                nzshow: true,
                pxshow: true,
                qyshow: false,
                isfull: true,
                shownavindex: e.currentTarget.dataset.nav
            })
        }

    },
    selectleft: function (e) {

        let ass = this.data.cityleft[0];
        let ddd = this.data.cityleft[0].TwoList;
        let ddds = e.currentTarget.dataset.city;
        this.setData({
            cityright: {},
            citycenter: this.data.cityleft[e.currentTarget.dataset.city].TwoList,
            select1: e.target.dataset.city,
            select2: ''
        });
    },
    selectcenter: function (e) {
        let aaaaas = this.data.citycenter[e.currentTarget.dataset.city].ThreeList[0].TreeId;
        this.setData({
            cityright: this.data.citycenter[e.currentTarget.dataset.city].ThreeList,
            // cityright: this.data.citycenter[e.currentTarget.dataset.city],
            select2: e.target.dataset.city
        });
    },
    selectright: function (e) {
        let df = this.data.cityright[e.currentTarget.dataset.city].TreeId;
        let dfa = this.data.cityright[e.currentTarget.dataset.city].TreeTypeName;
        this.setData({
            "sf.ptop": 0,
            "cf.ptop": 0,
            isdata: false,
            pageIndex: 1,
            length: 20,
            listid: this.data.cityright[e.currentTarget.dataset.city].TreeId,
            bdname: this.data.cityright[e.currentTarget.dataset.city].TreeTypeName,
            select3: e.target.dataset.city
        });
        this.listqy();
        this.gainLoadingListData();
    },
    //综合排序
    selectSorting: function (e) {
        var index = e.currentTarget.dataset.index;
        this.setData({
            sortingChioceIcon: "/images/icon-go-black.png",
            chioceSorting: false,
            listid: this.data.sortingList[index].key,
            activeSortingName: this.data.sortingList[index].value,
            productList: [],
            pageIndex: 1,
            loadOver: false,
            isLoading: true
        });
        this.gainLoadingListData();
    },

    selected: function (e) {
        this.setData({
            selected1: false,
            selected: true
        })
    },
    selected1: function (e) {
        this.setData({
            selected: false,
            selected1: true
        })
    },
    //获取参数token
    GetToken: function () {
        var that = this;
        let pageIndex = that.data.pageIndex;
        let date = that.data.date;
        let ddd = util.formatTimestring(new Date())
        wx.request({
            url: 'https://shuxidata.com/zd/Home/GetAppToken',
            data: {appId: '687D7C5DD80E4F0588D5FC2327DE248A'},
            method: 'GET',
            header: {'content-type': 'application/json'},
            success: function (res) {
                if (res.data.Data != null) {
                    let md = util.md5(res.data.Data + ddd);
                    that.setData({
                        tokens: md,
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
        let pageIndex = that.data.pageIndex;
        let date = that.data.date;
        let webid = that.data.currentTab;
        let listid = that.data.listid;
        let tokens = that.data.tokens;
        switch(me.data.currentTab){
            case 87:
                break;
            case 88:
                break;
        }
        wx.request({
            url: 'https://shuxidata.com/zd/ZD_WxAndWbLists/GetCommonListDatas',
            data: {
                listid: listid,
                typeid: '1',
                time: date,
                webid: webid,
                pageindex: pageIndex,
                pagesize: '20',
                lanmuname: '',
                appId: '687D7C5DD80E4F0588D5FC2327DE248A',
                token: tokens
            },
            method: 'GET',
            header: {'content-type': 'application/json'},
            success: function (res) {
                if (res.data.Data == null)//token过期了
                {
                    me.GetToken(); //重新取一遍token
                    me.LoadList();
                } else {
                    if (res.data.Data.datalist.length != 0) {
                        if (me.data.currentTab == 87) {
                            for (var i = 0; i < res.data.Data.datalist.length; i++) {
                                me.data.listData.push(res.data.Data.datalist[i]);
                            }
                            that.setData({
                                listData: me.data.listData,
                                loading: true
                            });
                        }else if(me.data.currentTab == 88) {
                            for (var i = 0; i < res.data.Data.datalist.length; i++) {
                                me.data.listWxData.push(res.data.Data.datalist[i]);
                            }
                            that.setData({
                                listWxData: me.data.listWxData,
                                loading: true
                            });
                        }
                        if (res.data.Data.datalist.length < 20) {
                            that.setData({isdata: true});
                        }
                    }
                    else { // 数组为空
                        that.setData({
                            isdata: true,
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
        let webid = that.data.currentTab;
        let listid = that.data.listid;
        let tokens = that.data.tokens;
        wx.request({
            url: 'https://shuxidata.com/zd/ZD_WxAndWbLists/GetCommonListDatas',
            data: {
                listid: listid,
                typeid: '1',
                time: date,
                webid: webid,
                pageindex: pageIndex,
                pagesize: '20',
                lanmuname: '',
                appId: '687D7C5DD80E4F0588D5FC2327DE248A',
                token: tokens
            },
            method: 'GET',
            header: {'content-type': 'application/json'},
            success: function (res) {
                if (res.data.Data == null)//token过期了
                {
                    that.GetToken(); //重新取一遍token
                    that.gainLoadingListData();
                }
                else {
                    if (webid == 87) {
                        that.setData({listData: res.data.Data.datalist, loaded: false});
                    }
                    if (webid == 88) {
                        that.setData({listWxData: res.data.Data.datalist, loaded: false});
                    }
                    if (res.data.Data.datalist.length < 20) {
                        that.setData({isdata: true});
                    }
                }
            },
            fail: function () {

            },
            complete: function () {

            }
        })
    },

    //下拉选项数据
    getCheckData: function () {
        var that = this;
        let tokens = that.data.tokens;
        wx.request({
            url: 'https://shuxidata.com/zd/ZD_CommonListNames/AppGetAllCommonListType',
            data: {appId: '687D7C5DD80E4F0588D5FC2327DE248A', token: tokens},
            method: 'GET',
            header: {'content-type': 'application/json'},
            success: function (res) {
                if (res.data.Data == null)//token过期了
                {
                    that.GetToken(); //重新取一遍token
                    that.getCheckData();
                } else {
                    that.setData({cityleft: res.data.Data});
                }
            },
            fail: function () {

            },
            complete: function () {

            }
        })

    },
    et_touch_start: function (et) {
        sx = et.touches[0].pageX;
        sy = et.touches[0].pageY;
    },
    et_touch_end: function (et) {
        sx = et.changedTouches[0].pageX;
        sy = et.changedTouches[0].pageY;
    },
    et_touch_move: function (et) {
        ey = et.touches[0].pageY;
        ex = et.touches[0].pageX;
        dify = ey - sy;//差异
        difx = ex - sx;
        var le = this.data.length;
        var isd = this.data.isdata;
        if (isd) {
            le = me.data.listData.length;
        }
        if ((me.data.sf.ptop - dify) <= 0) {
            deltay = 0;
        } else {
            deltay = me.data.sf.ptop - dify;
        }
        if ((me.data.sf.pleft - difx) <= 0) {
            deltax = 0;
        } else {
            deltax = me.data.sf.pleft - difx;
        }

        // if (me.data.listData.length * 32 <= (Math.abs(me.data.sf.ptop) + me.data.sf.four_height) && dify < 0) {
        if (me.data.sf.height_total <= (Math.abs(me.data.sf.ptop) + me.data.sf.four_height) && dify < 0) {
            let that = this;
            let currentTab = that.data.currentTab;
            wx.showLoading({
                title: '正在加载',
            })
            that.setData({
                loading: true,
                pageIndex: that.data.pageIndex + 1,
            })
            let len = 20 * that.data.pageIndex;
            that.setData({
                length: len,
            })
            this.LoadList();
            setTimeout(function () {
                wx.hideLoading()
            }, 500)
            if (isd) {
                wx.showToast({
                    title: '没更多数据',
                    icon: 'success'
                });
                setTimeout(function () {
                    wx.hideToast();
                }, 3000)
            }
            console.info("到底部开始刷数据");
            return false;
        }
        if (120 * 6 <= (me.data.sf.four_width + me.data.sf.pleft) && difx < 0) {
            return false;
        }
        me.setData({
            "sf.ptop": deltay,
            "sf.pleft": deltax
        });
        sy = ey;//赋值新的数值
        sx = ex;
    },
    showLoading: function () {
        wx.showToast({
            title: '加载中',
            icon: 'loading'
        });
    },
    cancelLoading: function () {
        wx.hideToast();
    },

    et_touch_start_cf: function (et) {
        sx = et.touches[0].pageX;
        sy = et.touches[0].pageY;
    },
    et_touch_move_cf: function (et) {
        let that = this;
        ey = et.touches[0].pageY;
        ex = et.touches[0].pageX;
        dify = ey - sy;//差异
        difx = ex - sx;
        var le = this.data.length;
        var isd = this.data.isdata;
        if (isd) {
            le = me.data.listWxData.length;
        }
        if ((me.data.cf.ptop - dify) <= 0) {
            deltay = 0;
        } else {
            deltay = me.data.cf.ptop - dify;
        }
        if ((me.data.cf.pleft - difx) <= 0) {
            deltax = 0;
        } else {
            deltax = me.data.cf.pleft - difx;
        }
        // if (me.data.listWxData.length * 32 <= (Math.abs(me.data.cf.ptop) + me.data.cf.four_height) && dify < 0) {
        if (le * 32 <= (Math.abs(me.data.cf.ptop) + me.data.cf.four_height) && dify < 0) {
            let currentTab = that.data.currentTab;
            wx.showLoading({
                title: '正在加载',
            })
            that.setData({
                loading: true,
                pageIndex: that.data.pageIndex + 1,
            })
            let len = 20 * that.data.pageIndex;
            that.setData({
                length: len,
            })
            this.LoadList();
            setTimeout(function () {
                wx.hideLoading()
            }, 500)
            if (isd) {
                wx.showToast({
                    title: '没更多数据',
                    icon: 'success'
                });
                setTimeout(function () {
                    wx.hideToast();
                }, 3000)
            }

            console.info("到底部开始刷数据");
            return false;
        }
        if (120 * 7 <= (me.data.cf.four_width + me.data.cf.pleft) && difx < 0) {
            return false;
        }
        me.setData({
            "cf.ptop": deltay,
            "cf.pleft": deltax
        });

        sy = ey;//赋值新的数值
        sx = ex;
    },


    onLoad: function () {
        //lsk addon
        me = this;
        wx.getSystemInfo({
            success: function (ret) {
                me.setData({
                    "sf.fwidth": ret.windowWidth,
                    "cf.fwidth": ret.windowWidth,
                    "sf.fheight": ret.windowHeight - 100,
                    "cf.fheight": ret.windowHeight - 100,
                    winWidth: res.windowWidth,
                    winHeight: res.windowHeight
                });
            }
        });
        me.setData({
            "sf.two_width": me.data.sf.fwidth - me.data.sf.one_width,
            "cf.two_width": me.data.cf.fwidth - me.data.cf.one_width,
            "sf.four_width": me.data.sf.fwidth - me.data.sf.one_width,
            "cf.four_width": me.data.cf.fwidth - me.data.cf.one_width,
            "sf.three_height": me.data.sf.fheight - me.data.sf.one_height,
            "cf.three_height": me.data.cf.fheight - me.data.cf.one_height,
            "sf.four_height": me.data.sf.fheight - me.data.sf.one_height,
            "cf.four_height": me.data.cf.fheight - me.data.cf.one_height
        });
        //lsk addon
        var that = this;
        let pageIndex = that.data.pageIndex;
        var time = util.formatTimes(new Date());
        var checktime = util.formatTimecheck(new Date());
        this.setData({
            maxdate: time,
            date: checktime
        });
        var time = util.formatTimemin(new Date());
        me.setData({
            mindate: time
        });
        that.getCheckData();
        //that.gainLoadingListData();
        me.LoadList();//加载基础数据
    },
    /**
     * 点击tab切换
     */
    swichNav: function (e) {
        var that = this;
        var time = util.formatTimes(new Date());
        that.setData({
            "sf.ptop": 0,
            "cf.ptop": 0,
            isdata: false,
            loaded: false
        });
        // var time = util.formatTimemin(new Date());
        // this.setData({
        //   mindate: time
        //});
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                length: 20,
                pageIndex: 1,
                currentTab: e.target.dataset.current
            })
        }
        let currentTab = that.data.currentTab;
        wx.showLoading({
            title: '正在拼命加载',
        })
        that.setData({

            loading: true,
        })
        if (currentTab == 87) {
            this.setData({
                sortingChioceIcon: "/images/icon-go-black.png",
                chioceSorting: false,
                selected1: false,
                selected: true
            })
            this.gainLoadingListData();
        }
        else if (currentTab == 88) {
            this.setData({
                sortingChioceIcon: "/images/icon-go-black.png",
                chioceSorting: false,
                selected: false,
                selected1: true
            })
            this.gainLoadingListData();
        }
        setTimeout(function () {
            wx.hideLoading()
        }, 500)

    },
    bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value,
        })
    },
    //时间改变
    bindDateChange: function (e) {
        this.setData({
            "sf.ptop": 0,
            "cf.ptop": 0,
            isdata: false,
            length: 20,
            pageIndex: 1,
            date: e.detail.value,

        })
        let currentTab = this.data.currentTab;
        if (currentTab == 87) {
            this.gainLoadingListData();
        }
        else if (currentTab == 88) {
            this.gainLoadingListData();
        }
    },
    bindTimeChange: function (e) {
        this.setData({
            time: e.detail.time,
        })

    },
})
