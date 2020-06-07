// pages/share/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '海报生成中',
    })
    var that = this
    var title = options.title
    var shareCode = options.shareCode
    var listPic = options.listPic
    that.setData({
      visible: true,
      createPoster: {
        width: '750rpx',
        height: '750rpx',
        background: '#fff',
        views: [{
            type: 'image',
            url: listPic,
            css: {
              width: '750rpx',
              height: '750rpx',
            }
          },
          {
            type: 'image',
            url: shareCode,
            css: {
              width: '180rpx',
              height: '167rpx',
              mode: 'scaleToFill',
              top: '433rpx',
            }
          },         
          {
            type: 'text',
            text: title,
            css: {
              top: `50rpx`,
              fontSize: '45rpx',
              color: '#fff',
              fontWeight: 'bold',
              align: 'center',
              width: '600rpx',
              left: '300rpx'
            }
          },
          {
            type: 'text',
            text: "guo's博客",
            css: {
              left: '300rpx',
              top: '380rpx',
              fontSize: '80rpx',
              color: '#fff',
              width: '600rpx',
              align: 'center',
            }
          }
        ]
      }
    })
  },
  onImgOK(e) {
    this.setData({
      imagePath:e.detail.path
    })    
    setTimeout(function() {
      wx.hideLoading()
      console.log("spinShow");
    }, 1000)

    console.log(e);
  },
  saveImage() {
    var that = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {

            }
          })
          wx.openSetting({
            success(res) {
              console.log(res.authSetting)
            }
          })
        } else {
          wx.saveImageToPhotosAlbum({
            filePath: that.data.imagePath,
            success(res) {
              wx.navigateBack({
                delta: 1
              })
            }
          });
        }
      }
    })
  }
})