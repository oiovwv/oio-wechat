const httpsRequest={
    https(url,data){
        wx.showLoading({
            title:'数据请求中....'
        })
        return new Promise((resolve,reject)=>{
            wx.request({
                url:url,
                data:data,
                method:'POST',
                header:{'Content-Type': 'application/json'},
                success:function(res){
                    wx.hideLoading()
                    if(res.statusCode!=200){
                        wx.showToast({
                            title:'网络出错',
                            icon:'none'
                        })
                        return false
                    }
                    resolve(res.data)
                },
                fail:function(error){
                    wx.hideLoading()
                    reject(error)
                },
                complete:function(){
                    wx.hideLoading()
                }
            })
        })
    }
}
export default httpsRequest