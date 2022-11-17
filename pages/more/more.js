// pages/more/more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    retcode:''
  },
  goToScan(){
    wx.scanCode({
      success: (res) => {
        console.log(res)
        this.setData({
          retcode:res.result
        })
      }
    })
  }
 
})