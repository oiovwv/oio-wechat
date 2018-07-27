// components/first-component/dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:'标题'
    },
    content: {
      type: String,
      value: '弹窗内容'
    },
    cancelText: {
      type: String,
      value: '取消'
    },
    confirmText: {
      type: String,
      value: '确认'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideDialog(){
      this.setData({
        isShow: !this.data.isShow
      })
    },
    showDialog(){
      this.setData({
        isShow: !this.data.isShow
      })
    },
    // 取消与确认的回调
    _cancelEvent(){
      this.triggerEvent('cancelEvent')
    },
    _confirmEvent() {
      this.triggerEvent('confirmEvent')
    }
  }
})
