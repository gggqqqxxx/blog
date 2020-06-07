const util = require('../../utils/util.js');
const {
  $Toast
} = require('../..//dist/base/index');
var pageNo = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0, //当前所在滑块的 index
    scrollLeft: 0, //滚动条的位置,一个选项卡宽度是90（自定义来自css），按比例90*n设置位置
    navlist: ["全部", "Html", "HTTP", "Css", "Javascript", "Vue", "React", "小程序"],
    content: [],
    content1: [],
    tip: "",
    loading: false,
    userInfo: {},
    user_comment: '',
    isShow: true,
    show: false,
    id:'',
    buttons: [{
        type: 'error',
        className: 'screenDialog',
        text: '编辑文章',
        value: 0
      },
      {
        type: 'primary',
        className: 'screenDialog',
        text: '删除文章',
        value: 1
      }
    ]
  },
  //tab切换
  tab: function (event) {
    var curNavlist = this.data.navlist[event.target.dataset.current];
    pageNo = 1;
    var that = this;
    this.setData({
      current: event.target.dataset.current,
      content1: []
    });
    if (event.target.dataset.current != 0) {
      var temp = that.data.content.filter((val) => {
        return val.category.objectId == curNavlist
      })
      that.setData({
        content1: temp
      });
    } else {
      that.setData({
        content1: that.data.content
      });
    }
  },
  //长按编辑
  modifyArticle: function (event) {
    console.log()
    this.setData({
      show: true,
      article_title: event.currentTarget.dataset.title,
      id:event.currentTarget.dataset.index
    })
  },
  buttontap(e) {
    var that = this;
    that.setData({
      show: false
    });
    if (e.detail.index == 0) {    
      wx.navigateTo({
        url: '/pages/editArticle/editArticle?id='+that.data.id
      });
    } else {   
      wx.u.delActile(that.data.id).then(res => {
        $Toast({
          content: '删除成功',
          type: 'success'
        });
        that.setData({
          loading: false,
          tip: "没有数据了",
          content: [],
          content1: []
        });
        setTimeout(()=>{        
          that.getUserDesignArticle();
        },200)
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userInfo = wx.getStorageSync("userInfo");
    if (!userInfo) {
      $Toast({
        content: '请先登录!',
        type: 'error',
        duration: 900,
        mask: true
      });
      setTimeout(()=>{
        wx.reLaunch({
          url: '/pages/my/index',
        });
      },1000)
    }
    that.setData({
      userInfo: userInfo
    });

    that.getUserDesignArticle();
  },
  //获取用户文章
  getUserDesignArticle: function () {
    var that = this;
    that.setData({
      loading: true,
      tip: "正在加载"
    });
    wx.u.getArticleByUser(this.data.userInfo.nickName).then((res) => {
      console.log(res.result)
      that.setData({
        loading: false,
        tip: "没有数据了",
        content: that.data.content.concat(res.result),
        content1: that.data.content.concat(res.result)
      });
    })

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})