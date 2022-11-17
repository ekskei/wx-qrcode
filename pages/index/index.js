// index.js
// 获取应用实例

var QRCode = require('../../utils/wx-qrcode.js')
var qrcode;

const app = getApp()

Page({
  data: {
    text: '哈哈哈',
    image: ''
  },
  onLoad() {
    qrcode = new QRCode('myCanvas', {
      text: this.data.text,
      width: 200,
      height: 200,
      correctLevel: QRCode.CorrectLevel.H
    });
  },
  toTest() {
    wx.navigateTo({
      url: '/pages/detail/detail'
    })
  },
  confirmHandler: function (e) {
    var value = e.detail.value
    console.log(e);
    qrcode.makeCode(value)
  },
  inputHandler: function (e) {
    var value = e.detail.value
    this.setData({
      text: value
    })
  },
  tapHandler: function () {
    // 传入字符串生成qrcode
    console.log('tapHandler')
    qrcode.makeCode(this.data.text)

  },
  // 长按保存
  save: function () {
    wx.showActionSheet({
      itemList: ['保存图片'],
      success: function (res) {
        if (res.tapIndex == 0) {
          console.log("save image");
          qrcode.exportImage(function (path) {
            console.log(path.path);
            wx.saveImageToPhotosAlbum({
              filePath: path.path,
              success(res) {
                console.log(res);
                wx.showToast({
                  title: '保存成功',
                })
              },
              fail(res) {
                console.log(res);
                wx.showToast({
                  title: '保存失败',
                })
              }
            })
          })
        }
      }
    })
  }
})