// pages/about/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    QQ:"1006828115",
    email: "1006828115@qq.com",
    web:"还没有",
    github:"https://github.com/gggqqqxxx"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  copyDataTap: function (a) {
    var t = a.target.dataset.index;
    wx.setClipboardData({
      data: t,
      success: function (a) {
        wx.getClipboardData({
          success: function (a) {
            console.log(a.data);
          }
        });
      }
    });
  }
})