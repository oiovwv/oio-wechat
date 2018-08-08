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
		left: 0,
		pdata_sf: {//微博请求参数，为和微信请求参数独立 
			listid: 6,
			typeid: 1,
			time: "",
			webid: 87,
			pageindex: 1,
			pagesize: 20,
			lanmuname: '',
			appId: '108ED59677F64554A0D9DDD51C5B1E8A'
		},
		pdata_cf: {//微信请求参数，设置这两个是为了保存原始记录，防止切换后状态冗余
			listid: 6,
			typeid: 1,
			time: "",
			webid: 88,
			pageindex: 1,
			pagesize: 20,
			lanmuname: '',
			appId: '108ED59677F64554A0D9DDD51C5B1E8A'
		},
		pdata: {},
		sf: {
			nodata: false,
			height_total: 0,
			ptop: 0, pleft: 0,
			onemc_width: 120,
			one_width: 80,
			one_height: 32,
			two_width: 30,
			two_height: 32,
			three_height: 0,
			threemc_width: 120,
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
			nodata: false,
			ptop: 0, pleft: 0,
			onemc_width: 120,
			one_width: 80,
			one_height: 32,
			two_width: 30,
			two_height: 32,
			three_height: 0,
			threemc_width: 120,
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
		animation: '',
		isdata: false,
		length: 20,
		winWidth: 0,
		winHeight: 0,
		currentTab: 87,//选中的项
		userInfo: {},
		listData: [],//微博数据组
		listWxData: [],//微信数据组
		pageIndex: 1,//页数
		date: "",//时间
		mindate: "",//最小时间
		maxdate: "",//最大时间
		changetime: '',
		time: "12:01",
		tokens: "",
		istrue: false,
		loading: false, // "上拉加载"的变量，默认false，隐藏
		show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
		index: 0, //选择的下拉列表下标
		tabIndex: 0,
		tabItem: 0,
		tabArray: [
			['ZBI指数', '原创传播度', '综合传播度', '活跃度', '关注度'],
			['ZCI指数', '原创文章传播度', '头条文章传播度', '爆款文章传播度', '综合传播度', '活跃度']
		],
		tabIDArray: [
			['Wbhitszbi', 'WbycspreadNumber', 'WbzhspreadNumber', 'WbactiveNumber', 'WbfollowNumber'],
			['Wxhitszci', 'WxYcSpreadNumber', 'WxHeadSpreadNumber', 'WxHotSpreadNumber', 'WxSpreadNumber', 'WxactiveNumber']
		],
		animationData: {},
		shownavindex: '',
		content: [],
		listid: 6,
		chioceSorting: false,
		activeSortingName: "卫视两微榜",
		sortingChioceIcon: "/images/icon-go-black.png",
		dateChioceIcon: "/images/icon-go-black.png",
		content: [],
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
		bdname: '省级卫视综艺栏目两微榜',
		busy: false//请求状态参数
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
		me.setData({
			cityright: {},
			citycenter: this.data.cityleft[e.currentTarget.dataset.city].TwoList,
			select1: e.target.dataset.city,
			select2: ''
		});
	},
	selectcenter: function (e) {
		this.setData({
			cityright: this.data.citycenter[e.currentTarget.dataset.city].ThreeList,
			select2: e.target.dataset.city
		});
	},
	selectright: function (e) {
		me.fw(me.data.currentTab);//复位
		switch (parseInt(me.data.currentTab)) {
			case 87://pdata_sf,先复位，再修改请求参数
				me.setData({
					// "sf.ptop":0,
					//"pdata_sf.pageindex":1,
					//  listData: [],
					"pdata_sf.listid": me.data.cityright[e.currentTarget.dataset.city].TreeId,
					"pdata_cf.listid": me.data.cityright[e.currentTarget.dataset.city].TreeId
				});
				break;
			case 88://pdata_cf
				me.setData({
					// "cf.ptop":0,
					// "pdata_cf.pageindex":1,
					//  listWxData: [],
					"pdata_sf.listid": me.data.cityright[e.currentTarget.dataset.city].TreeId,
					"pdata_cf.listid": me.data.cityright[e.currentTarget.dataset.city].TreeId
				});
				break;
		}
		//这个地方设置。
		me.setData({
			bdname: this.data.cityright[e.currentTarget.dataset.city].TreeTypeName,
			select3: e.target.dataset.city
		});
		me.listqy();
		//新请求数据
		me.LoadList();
	},
	//获取参数token
	GetToken: function () {
		wx.request({
			url: 'https://shuxidata.com/zd/Home/GetAppToken',
			data: { appId: '108ED59677F64554A0D9DDD51C5B1E8A' },
			method: 'GET',
			header: { 'content-type': 'application/json' },
			success: function (res) {
				if (res.data.Data != null) {
					var dd = util.md5(res.data.Data + util.formatTimestring(new Date()));
					var dddd = util.md5(res.data.Data + util.formatTimestring(new Date()));
					wx.setStorageSync("token", util.md5(res.data.Data + util.formatTimestring(new Date())));
				}

			}
		})
	},
	//上拉加载调用数据
	LoadList: function () {
		if (me.data.busy) {
			return false;//如果在请求数据中，则直接返回
		}
		// wx.showLoading();//显示请求数据
		me.setData({
			busy: true//设置成忙碌状态
		});
		var time_max = util.formatTimes(new Date());
		var checktime = util.formatTimecheck(new Date());
		var time_min = util.formatTimemin(new Date());
		switch (parseInt(me.data.currentTab)) {
			case 87:
				if (me.data.sf.nodata) {
					me.setData({ busy: false });
					return false;
				}
				me.setData({
					// "pdata_sf.maxdate":time_max,
					// "pdata_sf.date":checktime,
					// "pdata_sf.time": me.data.date,
					// "pdata_sf.mindate":time_min
					"pdata_sf.time": me.data.date,

				});
				break;
			case 88:
				if (me.data.cf.nodata) {
					me.setData({ busy: false });
					return false;
				}
				me.setData({
					// "pdata_cf.maxdate":time_max,
					// "pdata_cf.date":checktime,
					// "pdata_cf.time":checktime,
					// "pdata_cf.mindate":time_min
					"pdata_cf.time": me.data.date,
				});
				break;
		}
		switch (parseInt(me.data.currentTab)) {
			case 87:
				me.setData({
					pdata: me.data.pdata_sf
				});
				break;
			case 88:
				me.setData({
					pdata: me.data.pdata_cf
				});
				break;
		}
		me.setData({
			"pdata.token": wx.getStorageSync("token")
		});
		console.info(me.data.pdata);
		wx.request({
			url: 'https://shuxidata.com/zd/ZD_WxAndWbLists/GetCommonListDatas',
			data: me.data.pdata,
			method: 'GET',
			header: { 'content-type': 'application/json' },
			success: function (res) {
				me.setData({
					busy: false//取消忙碌状态
				});
				wx.hideLoading();//取消加载显示框
				if (res.data.Code != 200) {	//token过期了
					me.GetToken(); //重新取一遍token
					me.LoadList();
				} else {
					if (res.data.Data.datalist.length != 0) {
						if (me.data.currentTab == 87) {
							for (var i = 0; i < res.data.Data.datalist.length; i++) {
								me.data.listData.push(res.data.Data.datalist[i]);
							}
							me.setData({
								listData: me.data.listData,
								"pdata_sf.pageindex": me.data.pdata_sf.pageindex + 1,
								"sf.height_total": me.data.listData.length * 32
							});
						} else if (me.data.currentTab == 88) {
							for (var i = 0; i < res.data.Data.datalist.length; i++) {
								me.data.listWxData.push(res.data.Data.datalist[i]);
							}
							me.setData({
								listWxData: me.data.listWxData,
								"pdata_cf.pageindex": me.data.pdata_cf.pageindex + 1,
								"cf.height_total": me.data.listWxData.length * 32
							});
						}
					} else { // 数组为空,即没有数据了，
						switch (parseInt(me.data.currentTab)) {
							case 87:
								me.setData({
									"sf.nodata": true
								});
								break;
							case 88:
								me.setData({
									"cf.nodata": true
								});
								break;
						}
						wx.showToast({
							title: "没更多数据!"//没有数据了，就直接告诉。
						});
					}
				}
				setTimeout(function () {
					me.changeTab(function () { me.setData({ listData: me.data.listData }) })
				}.bind(this), 300)
			}
		})
	},
	//下拉选项数据
	getCheckData: function () {
		wx.request({
			url: 'https://shuxidata.com/zd/ZD_CommonListNames/AppGetAllCommonListType',
			data: { appId: '108ED59677F64554A0D9DDD51C5B1E8A', token: wx.getStorageSync("token") },
			method: 'GET',
			header: { 'content-type': 'application/json' },
			success: function (res) {
				if (res.data.Code != 200)//token过期了
				{
					me.GetToken(); //重新取一遍token
					me.getCheckData();
				} else {
					me.setData({ cityleft: res.data.Data });
				}
			}
		})

	},
	et_touch_start: function (et) {
		console.log("start")
		this.startX = et.touches[0].pageX;
		this.startY = et.touches[0].pageY;
	},
	et_touch_end: function (et) {
		console.log("end")
		this.endX = et.changedTouches[0].pageX;
		this.endY = et.changedTouches[0].pageY;
		var x = this.startX - this.endX
		var y = this.startY - this.endY
		// this.data.left += x
		// if (this.data.left < 0)
		// 	this.data.left = 0
		// var left = this.tabLeft
		// if (this.data.left > left)
		// 	this.data.left > left
		// this.setData({ left: this.data.left })
	},
	et_touch_move: function (et) {
		if (!this.tabLeft) {
			this.tabLeft = this.data.tabArray[this.data.tabIndex].length * 120 - this.data.sf.two_width
		}
		var left = this.tabLeft
		ey = et.touches[0].pageY;
		ex = et.touches[0].pageX;
		dify = ey - sy;//差异
		difx = ex - sx;
		var x = this.startX - ex
		this.startX = ex
		this.data.left += x
		if (this.data.left < 0)
			this.data.left = 0
		if (this.data.left > left)
			this.data.left > left
		this.setData({ left: this.data.left })
		var a = Math.abs(dify);
		var b = Math.abs(difx);
		//上右
		if (dify <= 0 && difx > 0 && a < difx) {
			dify = 0;
		}
		//上右
		if (dify <= 0 && difx > 0 && a > difx) {
			difx = 0;
		}
		//左上移动
		if (dify <= 0 && difx <= 0 && a < b) {
			dify = 0;
		}
		//左上移动
		if (dify <= 0 && difx <= 0 && a > b) {
			difx = 0;
		}
		//下右
		if (dify > 0 && difx > 0 && dify < difx) {
			dify = 0;
		}
		//下右
		if (dify > 0 && difx > 0 && dify > difx) {
			difx = 0;
		}

		//下左
		if (dify > 0 && difx <= 0 && dify < b) {
			dify = 0;
		}
		//下左
		if (dify > 0 && difx <= 0 && dify > b) {
			difx = 0;
		}


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
		if (me.data.sf.height_total <= (Math.abs(me.data.sf.ptop) + me.data.sf.four_height) && dify < 0) {
			me.LoadList();//加载数据，到底部加数据即可，因为请求的参数是不变的，所以此处也不需要变
			console.info("到底部开始刷数据");
			return false;
		}
		if (120 * 5 <= (me.data.sf.four_width + me.data.sf.pleft) && difx < 0) {
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
	searchScrollLower: function () {
		me.LoadList();
	},
	cancelLoading: function () {
		wx.hideToast();
	},

	et_touch_start_cf: function (et) {
		sx = et.touches[0].pageX;
		sy = et.touches[0].pageY;
	},
	et_touch_move_cf: function (et) {
		var that = this;
		ey = et.touches[0].pageY;
		ex = et.touches[0].pageX;
		dify = ey - sy;//差异
		difx = ex - sx;
		var tefx = ex - sx;
		var a = Math.abs(dify);
		var b = Math.abs(difx);
		//上右
		if (dify <= 0 && difx > 0 && a < difx) {
			dify = 0;
		}
		//上右
		if (dify <= 0 && difx > 0 && a > difx) {
			difx = 0;
		}
		//左上移动
		if (dify <= 0 && difx <= 0 && a < b) {
			dify = 0;
		}
		//左上移动
		if (dify <= 0 && difx <= 0 && a > b) {
			difx = 0;
		}
		//下右
		if (dify > 0 && difx > 0 && dify < difx) {
			dify = 0;
		}
		//下右
		if (dify > 0 && difx > 0 && dify > difx) {
			difx = 0;
		}

		//下左
		if (dify > 0 && difx <= 0 && dify < b) {
			dify = 0;
		}
		//下左
		if (dify > 0 && difx <= 0 && dify > b) {
			difx = 0;
		}
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

		if (me.data.cf.height_total <= (Math.abs(me.data.cf.ptop) + me.data.cf.four_height) && dify < 0) {
			me.LoadList();//和上面同样的，只要重新请求数据即可。
			console.info("到底部开始刷数据");
			return false;
		}
		if (120 * 6 <= (me.data.cf.four_width + me.data.cf.pleft) && difx < 0) {
			return false;
		}
		if (!this.tabLeft) {
			this.tabLeft = this.data.tabArray[this.data.tabIndex].length * 120 - this.data.sf.two_width
		}
		var left = this.tabLeft
		if (deltax > left + 20)
			deltax = left + 20
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
					winWidth: ret.windowWidth,
					winHeight: ret.windowHeight
				});
			}
		});
		me.setData({
			"sf.two_width": me.data.sf.fwidth - me.data.sf.one_width - me.data.sf.onemc_width,
			"cf.two_width": me.data.cf.fwidth - me.data.cf.one_width - me.data.cf.onemc_width,
			"sf.four_width": me.data.sf.fwidth - me.data.sf.one_width - me.data.sf.onemc_width,
			"cf.four_width": me.data.cf.fwidth - me.data.cf.one_width - me.data.cf.onemc_width,
			"sf.three_height": me.data.sf.fheight - me.data.sf.one_height,
			"cf.three_height": me.data.cf.fheight - me.data.cf.one_height,
			"sf.four_height": me.data.sf.fheight - me.data.sf.one_height,
			"cf.four_height": me.data.cf.fheight - me.data.cf.one_height
		});
		let pageIndex = me.data.pageIndex;

		var time = util.formatTimes(new Date());
		var checktime = util.formatTimecheck(new Date());
		this.setData({
			maxdate: time,
			date: checktime
		});
		var time = util.formatTimemin(new Date());
		this.setData({
			mindate: time
		});
		me.getCheckData();
		me.LoadList();//加载基础数据
		var animation = wx.createAnimation({
			duration: 300,
			timingFunction: 'linear',

		})
		this.animation = animation
	},

	changeTab: function (callback) {
		setTimeout(function () {
			me.animation.translateX(20).step()
			if (callback)
				callback()
			me.animation.translateX(0).step()
			me.setData({ animationData: me.animation.export() })
		}.bind(me), 300)
	},


	/**
	 * 点击tab切换
	 */
	swichNav: function (e) {
		if (me.data.currentTab == e.currentTarget.dataset.current) {
			return false;//直接判断即可，如果就是当前的直接返回，不要操作
		}
		//这个地方要先判断这个currentTab是否有数据，如果没有数据，则进行请求，如果有，则直接显示，不请求
		me.fw(me.data.currentTab);//进行复位
		me.setData({
			currentTab: e.currentTarget.dataset.current
		});
		if (me.data.currentTab == 87) {
			me.setData({
				listData: [],
				busy: false,
				"sf.nodata": false,
				"sf.height_total": 0,
				"pdata_sf.pageindex": 1,
				"sf.ptop": 0,
				sortingChioceIcon: "/images/icon-go-black.png",
				chioceSorting: false,
				tabIndex: 0
			})
			if (me.data.listData.length == 0) {
				//则请求数据
				me.LoadList();
			}

		} else if (me.data.currentTab == 88) {
			me.setData({
				listWxData: [],
				busy: false,
				"cf.nodata": false,
				"cf.height_total": 0,
				"pdata_cf.pageindex": 1,
				"cf.ptop": 0,
				sortingChioceIcon: "/images/icon-go-black.png",
				chioceSorting: false,
				tabIndex: 1
			});
			if (me.data.listWxData.length == 0) {
				//则请求数据
				me.LoadList();
			}

		}
	},
	bindPickerChange: function (e) {
		console.log('picker发送选择改变，携带值为', e.detail.value);//
		//选择时间，设置一下
		switch (parseInt(me.data.currentTab)) {
			case 87://pdata_sf
				break;
			case 88://pdata_cf
				break;
		}
		this.setData({
			index: e.detail.value,
		})
	},
	//时间改变
	bindDateChange: function (e) {
		//时间改变，
		//  switch(parseInt(me.data.currentTab)){
		//      case 87:
		//          //pdata_sf
		//         me.setData({
		//           listData: [],
		//            "sf.ptop":0,//这个复位，因为请求参数变化了
		//            "pdata_sf.pageindex":1,//页数复位，
		//         });
		//         break;
		//     case 88:
		//         //pdata_cf
		//         me.setData({
		//           listWxData: [],
		//             "cf.ptop":0,//这个复位，因为请求参数变化了
		//             "pdata_cf.pageindex":1,//页数复位，
		//        });
		//         break;
		// }
		me.fw(me.data.currentTab);//进行复位
		this.setData({
			length: 20,
			pageIndex: 1,
			date: e.detail.value
		});
		me.LoadList();//新请求步骤，先对位置进行复位，然后再请求数据。

	},
	bindTimeChange: function (e) {
		this.setData({
			time: e.detail.time
		})

	},
	fw: function (tid) {
		switch (parseInt(tid)) {
			case 87:
				me.setData({
					listData: [],
					busy: false,
					"sf.nodata": false,
					"sf.nodata": false,
					"sf.pleft": 0,//复位，因为请求参数变化了
					"sf.ptop": 0,//复位，因为请求参数变化了
					"sf.height_total": 0,//刚开始高度复位
					"pdata_sf.pageindex": 1//页数复位，
				});
				break;
			case 88:
				me.setData({
					listWxData: [],
					busy: false,
					"cf.nodata": false,
					"cf.pleft": 0,//复位，因为请求参数变化了
					"cf.ptop": 0,//复位，因为请求参数变化了
					"cf.height_total": 0,//刚开始高度复位
					"pdata_cf.pageindex": 1//页数复位
				});
				break;
		}
	}
})
