//app.js
App({
  onLaunch: function () {
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.title = 'Time'
    backgroundAudioManager.epname = 'Time'
    backgroundAudioManager.singer = 'MKJ'
    backgroundAudioManager.coverImgUrl = 'http://imge.kugou.com/stdmusic/20160102/20160102074212268828.jpg'
    backgroundAudioManager.src = 'http://fs.w.kugou.com/201806151435/23b34b939b323e895538bf620282b4db/G049/M06/01/09/EZQEAFYtJQeAB-cmADmkhgCmCBc089.mp3' 
  }
})