// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData:{},
    signNum:0,
    sign:false,
    signTime:'',
    loading:true,
    noReadNewsCount:0
  },
  
  onLoad: function (options) {
    // wx.showLoading({
    //   title: '加载中'
    // })
    var that = this
    wx.getUserInfo({
      success: (result) => {
        var nickName = result.userInfo.nickName
        var userPic = result.userInfo.avatarUrl
        let obj=wx.u.getUserInfo()       
        var userData = { 'nickName': nickName, 'userPic': userPic ,'objectId':obj.objectId}
        wx.setStorageSync('userInfo', userData)
        that.setData({
          userData: userData
        })
      }
    })

    wx.u.getSignNum().then(res=>{
      if (res.result[0]!="" && res.result[0]!=undefined){
        var day = new Date(res.result[0].createdAt).toDateString();

        if (day == new Date().toDateString()){
          that.setData({
            sign:true,
            signTime:res.result[0]
          })
        }
      }
      that.setData({
        signNum:res.signNum
      })
      that.spinShow()
    })
    wx.u.getNewsCount().then(res=>{
      this.setData({
        noReadNewsCount:res.result
      })
    })
  },
  onShareAppMessage() {
    return {
      title: "guo's 博客",
      path: 'pages/index/index',
      imageUrl: '/images/blog.png'
    }
  },
  //授权获取用户数据
  bindGetUserInfo (){
    wx.showLoading({
      title: '授权中',
    })
    var that = this
    wx.login({
      success:()=>{
        wx.getUserInfo({
          success:(result)=>{
            var nickName = result.userInfo.nickName
            var userPic = result.userInfo.avatarUrl
            let obj=wx.u.getUserInfo()   
            wx.u.saveUserInfo(userPic,nickName)
            var userData = {'nickName':nickName,'userPic':userPic,'objectId':obj.objectId}
            wx.setStorageSync('userInfo', userData)
            that.setData({  
              userData:userData
            })
            wx.hideLoading()
          }
        })
      }
    })
  },
  //签到
  sign (){
    var that = this
    wx.showLoading({
      title: '签到中',
    })
    wx.u.saveSign().then(res=>{
      if(res.result){
        setTimeout(function () {
          wx.hideLoading()
          that.setData({
            sign:true,
            signShow:true,
            signTime:res.data,
            signNum:that.data.signNum + 1
          })
        }, 1500)
      }
    })
  },
  //我的文章
  praise (){
    wx.navigateTo({
      url: '/pages/myArticle/myArticle',
    });
  },
  //分享
  share (){

  },
  spinShow: function () {
    var that = this
    setTimeout(function () {
      that.setData({
        loading: !that.data.loading,
      });
      console.log("spinShow");
    }, 1500)
  }
})