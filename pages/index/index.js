Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    current: '',
    current_scroll: '',
    category: '',
    moreData: true,//更多数据
    pageSize: 5,//数量
    pagination: 0,//页码
    articles: [],
    bottomWord:'',
    loadMore:false,
    loadMores:false,
    firstView:true
  },

  onLoad: function (options) {
    var that = this
    that.getArticleList(this.data.pageSize, this.data.pagination);
  },
  getArticleList(pageSize, pagination) {
    wx.u.getArticleList(pageSize, pagination, '').then(res => {
      console.log(res)
      let data = [];
      res.result.forEach((resEach) => {
        data.push({
          'objectId': resEach.objectId,
          'title': resEach.title,
          'read_counts': resEach.read_counts,
          'excerpt': resEach.excerpt,
          'createdAt': resEach.createdAt.slice(0, 16),
          'category': resEach.category,
          'listPic': resEach.listPic,
          'author': resEach.author
        })
      })
      if (this.data.pagination == 0) {
        this.spinShow()
      }
      if (data.length) {
        let articles = this.data.articles;
        let pagination = this.data.pagination;
        articles.push.apply(articles, data);
        pagination = pagination ? pagination + 1 : 1;

        this.setData({
          'articles': articles,
          'pagination': pagination,
          'bottomWord': '',
          'loadMore': false,
        })
      }else{
        this.setData({
          'moreData':false,
          'bottomWord': '加载完',
          'loadMore': false,
        })
      }  
    })
  },
  
  onShow(){
    var that=this;
    if(!that.data.firstView){
      that.setData({
        'articles': [],
        'pagination': 0,
        'loadMore': false,
      })
      that.getArticleList(that.data.pageSize, that.data.pagination);
    }
   
  },
  onHide(){
    var that=this;
    that.setData({
      firstView:false
    })
  },
  onReachBottom: function () {
    if(this.data.moreData){
      this.setData({
        'loadMore': true,
        'bottomWord': '加载中',
      })
      this.getArticleList(this.data.pageSize, this.data.pagination);
    }
  },
  spinShow: function () {
    var that = this
    setTimeout(function () {
      that.setData({
        loading: !that.data.loading,
      });
      console.log("spinShow");
    }, 1500)
  },
  onShareAppMessage() {
    return {
      title: "guo's 博客",
      path: 'pages/index/index',
      imageUrl: '/images/blog.png'
    }
  }
})