let noticeScroll=function(el,str){
    let ctx = wx.createCanvasContext(el);
    ctx.setFontSize(12);
    ctx.setTextBaseline('middle');
    let tw = ctx.measureText(str).width;
    let w=wx.getSystemInfoSync().windowWidth
    let x = 0;
    ctx.setFillStyle("#f73859");
    ctx.fillText(str, 0, 15);
    ctx.draw();
    setTimeout(function(){
      setInterval(function () {
        ctx.clearRect(0, 0, 0, 0);
        ctx.setFillStyle("#f73859");
        ctx.fillText(str, x, 15);
        ctx.draw();
        x -= 10;
        if (x <= -tw) {
          x = w ;
        }
      }, 160);
    },1500)
}
export default noticeScroll