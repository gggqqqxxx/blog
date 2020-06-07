const util = require('../../utils/util.js');

const {
  $Toast
} = require('../..//dist/base/index');

Page({
  data: {
    userInfo: {},
    value: '',
    article_img: "",
    file_type: [],
    article_content: {},
    content: {
      labels:'',
      title:'',
      author:'',
      openid:''
    },
    loadding: false,
    text_flag: true,
    labelIndex: 0,
    error: '',
    showActionsheet: false,
		show: false,
	
  },

	updateFile: function(e) {
		this.setData({ 
			show: true,
			location_index: e.currentTarget.dataset.index
		});
	},

	onClose() {
		this.setData({ show: false });
	},
  getUrl:function(e){
    this.setData({
      article_img:e.detail.value
    })
  },

  close: function() {
    this.setData({
      showActionsheet: false
    });
  },

  bindLabelChange: function(e) { 
      this.setData({
        labelIndex: e.detail.value,
        ['content.labels']: this.data.labels[e.detail.value]
      });
  },

  onLoad: function(options) { 
    var that=this
    var userInfo = wx.getStorageSync("userInfo");
    that.setData({
      userInfo: userInfo,
      ['content.author']: userInfo.nickName,
      ['content.openid']: userInfo.objectId
    });
   wx.u.getArticleDetail(options.id).then(res=>{
    that.setData({
      ['content.labels']:res.result.category.objectId,
      ['content.title']:res.result.title,
      ['content.author']:res.result.author,
      article_img:res.result.listPic,
      ['content.openid']:res.result.objectId,
      ['article_content.content']:res.result.mdcontent
    });
   })          
  },

  textInput: function(e) {
    this.setData({
      ['article_content.content']: e.detail.value
    });
  },
  
  upload_img: function(e) {
    var that = this;
    that.setData({
      showActionsheet: !this.data.showActionsheet
    });
  },
  
  titleInput: function(e) {
    this.setData({
      ['content.title']: e.detail.value
    });
  },
  show_article: function() {
    var that = this;  
    if (!this.data.content.title || !this.data.content.author  ||  !this.data.article_content.content || !this.data.content.openid || !this.data.content.labels) {
      $Toast({
        content: '参数不全!',
        type: 'error'
      });
    } else {
      var param = {
				title: this.data.content.title,
				author: this.data.content.author,
				labels: this.data.content.labels,
				main_pic: this.data.article_img,
				openid: this.data.content.openid,
				gist: this.data.article_content
			};

			//将输入文本手动转化成html，设置div的class支持MD插件美化
			var content = '<div class="markdown-text">';
		
				if (this.data.article_content.content != '') {
					//使用p标签将每一段内容包住
					content = content + '<p>' + this.data.article_content.content + '</p>'
				}

				//如果本段文本有插入图片，则使用img标签插入图片
				if (that.data.article_img.length> 0) {     
            content = content + '<p><img src="' + that.data.article_img + '"></p>'
					
				}

			
			content += '</div>'
			param.content = content;
     
			//将数据存入缓存
			wx.setStorage({
				key: 'showContent',
				data: param,
			});

			//跳转预览界面预览
			wx.navigateTo({
				url: '/pages/showcontent/showcontent',
			});
    }
  },

  submit_article: function() {
    var that = this;
    
    if (!this.data.content.title || !this.data.content.author  ||  !this.data.article_content.content || !this.data.content.openid || !this.data.content.labels){
      $Toast({
        content: '参数不全!',
        type: 'error'
      });
    } else {
			var param = {			
				title: this.data.content.title,
				author: this.data.content.author,
				labels: this.data.content.labels,
				main_pic: this.data.article_img,
				openid: this.data.content.openid,
				gist: this.data.article_content,
        avatar: this.data.userInfo.avatar     
			};


			//将输入文本手动转化成html，设置div的class支持MD插件美化
      var content = '<div class="markdown-text">';
				if (this.data.article_content.content != '') {
					//使用p标签将每一段内容包住
					content = content + '<p>' + this.data.article_content.content + '</p>'
				}

				//如果本段文本有插入图片，则使用img标签插入图片
				if (that.data.article_img.length> 0) {          
            content = content + '<p><img src="' + that.data.article_img + '"></p>'       
					
				}		

			content += '</div>'
			param.content = content;

        //进行发表文章
        wx.u.editArticle(param).then(res=>{
          $Toast({
            				content: '发表成功!',
            				type: 'success'
                  });
                  
                  setTimeout(()=>{
                    wx.reLaunch({
                      url: '/pages/index/index',
                    })
                  },2000)
                  
        })

    }
  }
});