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
    labels:[],
    content: {
      labels:'',
      title:'',
      author:'',
      openid:''
    },
    tip: '文件上传中',
    loadding: false,
    text_flag: true,
    labelIndex: 0,
    error: '',
    showActionsheet: false,
    
    // actions: [{
    //     text: '图片',
    //     value: 1
    //   },
    //   {
    //     text: '视频',
    //     value: 2
    //   }
    // ],
		show: false,
		// updateActions: [
		// 	{
		// 		index: 0,
		// 		name: '更换'
		// 	},
		// 	{
		// 		index: 1,
		// 		name: '删除',
		// 		subname: '操作无法撤销',
		// 	}
		// ]
  },
  getUrl:function(e){
    this.setData({
      article_img:e.detail.value
    })
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


  close: function() {
    this.setData({
      showActionsheet: false
    });
  },

  btnClick(e) {
    //选择图片上传
    if (e.detail.index == 0) {
      this.selected_img();
    }

    //选择视频上传
    if (e.detail.index == 1) {
      this.selected_video();
    }

    //关闭actionsheet弹框
    this.close();
  },

  

  bindLabelChange: function(e) { 
      this.setData({
        labelIndex: e.detail.value,
        ['content.labels']: this.data.labels[e.detail.value]
      });
  },

  onLoad: function(options) { 
    this.getCategories();
    
  },

  textInput: function(e) {
    this.setData({
      ['article_content.content']: e.detail.value
    });
  },
  getCategories: function() {
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
      
    } else {           
          //创作新文章
          this.setData({
            userInfo: userInfo,
            ['content.author']: userInfo.nickName,
            ['content.openid']: userInfo.objectId
          });
     
      wx.u.getCategoryList().then(res => {
        var labels = [];
        res.result.forEach(label => {
               labels.push(label.name);
        });
                that.setData({
                  labels: labels,
                  ['content.labels']:labels[0]
                });                           
      })     
    }
  },

  // getSelectLabels: function(e) {
  //   this.setData({
  //     ['content.labels']: e.detail
  //   });
  //   console.log(content.labels)
  // },

  // selected_video: function() {
  //   var that = this;
  //   wx.chooseVideo({
  //     sourceType: ['album', 'camera'],
  //     maxDuration: 60,
  //     camera: 'back',
  //     success: function(res) {
  //       console.log(res)
  //       var tempFilePaths = res.tempFilePath;

  //       that.setData({
  //         loading: true,
  //         increase: false
  //       });

  //       wx.uploadFile({
  //         url: util.basePath + '/users/upload_video',
  //         filePath: tempFilePaths,
  //         name: 'mp4_url',
  //         headers: {
  //           'Content-Type': 'form-data'
  //         },

  //         success: function(res) {
  //           if (res.statusCode == 413) {
  //             that.setData({
  //               loading: false
  //             });

  //             $Toast({
  //               content: '视频过大，请重新上传',
  //               type: 'error'
  //             });
  //           } else {
  //             that.setData({
  //               loading: false
  //             });

  //             var result = JSON.parse(res.data);
  //             if (result.status == 200) {
  //               //如果article_img是默认图片，则article_img置空
  //               var article_img = that.data.article_img;
  //               var file_type = that.data.file_type;
	// 							var article_content = that.data.article_content || [];
	// 							article_img[that.data.location_index] ? article_img[that.data.location_index] = result.payload : article_img.push(result.payload);
	// 							file_type[that.data.location_index] ? file_type[that.data.location_index] = 2 : file_type.push(2);
	// 							article_content[that.data.location_index] ? '' : article_content.push('');

  //               that.setData({
  //                 article_img: article_img,
	// 								file_type: file_type,
	// 								article_content: article_content,
	// 								location_index: null
  //               });
  //             } else {
  //               $Toast({
  //                 content: result.err,
  //                 type: 'error'
  //               });
  //             }
  //           }
  //         }
  //       });
  //     }
  //   });
  // },

  // selected_img: function() {
  //   var that = this;
		
  //   wx.chooseImage({
  //     count: 1, // 默认9
  //     sizeType: [ 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  //     success(res) {
  //       const tempFilePaths = res.tempFilePaths;
  //       that.setData({
	// 				showActionsheet: false,
  //         loading: true
  //       });

  //       if(tempFilePaths.length>0){
  //         var name="1.jpg";//上传的图片的别名，建议可以用日期命名

  //         var file=new Bmob.File(name,tempFilePaths);
  //         file.save().then(function(res){
  //           console.log(res.url());
  //         },function(error){
  //           console.log(error);
  //         })
  //     }

        // wx.uploadFile({
        //   url: util.basePath + '/users/upload_avatar',
        //   filePath: tempFilePaths[0],
        //   name: 'avatar',
        //   success(res) {
        //     that.setData({
        //       loading: false
        //     });
        //     var result = JSON.parse(res.data);
        //     if (result.status == 200) {
        //       //如果article_img是默认图片，则article_img置空
        //       var article_img = that.data.article_img || [];
				// 			var file_type = that.data.file_type || [];
				// 			var article_content = that.data.article_content || [];
				// 			article_img[that.data.location_index] ? article_img[that.data.location_index] = result.payload.avatar_path : article_img.push(result.payload.avatar_path);
				// 			file_type[that.data.location_index] ? file_type[that.data.location_index] = 1 : file_type.push(1);
				// 			article_content[that.data.location_index] ? '' : article_content.push('');

        //       that.setData({
        //         article_img: article_img,
				// 				file_type: file_type,
				// 				article_content: article_content,
				// 				location_index: null
        //       });
        //     } else {
				// 			console.log(result.err);
        //       $Toast({
        //         content: result.err,
        //         type: 'error'
        //       });
        //     }
          // }
        // });
  //     }
  //   });
  // },

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
    if (!this.data.content.title || !this.data.content.author  ||  !this.data.article_content.content || !this.data.content.openid || !this.data.labels) {
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
			// var count = 0;
			// this.data.article_content.forEach(article => {   
				if (this.data.article_content.content != '') {
					//使用p标签将每一段内容包住
					content = content + '<p>' + this.data.article_content.content + '</p>'
				}

				//如果本段文本有插入图片，则使用img标签插入图片
				if (that.data.article_img.length> 0) {     
            content = content + '<p><img src="' + that.data.article_img + '"></p>'
					
				}

				// //如果本段文本有插入视频，则使用video标签插入视频
				// if (that.data.article_img[count] != '/images/plus.png' && that.data.file_type[count] == 2) {
				// 	content = content + '<p><video src="' + that.data.article_img[count] + '"></p>'
				// }

				// count++;
			// });

			content += '</div>'
			param.content = content;
      // console.log(param)  
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
    
    if (!this.data.content.title || !this.data.content.author  ||  !this.data.article_content.content || !this.data.content.openid || !this.data.labels){
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

			//如果文章id存在，则修改文章，否则更新文章
			// if (this.data.content.id) {
			// 	wx.request({
			// 		url: util.basePath + '/article/v1/updateArticle',
			// 		method: "post",
			// 		data: param,
			// 		header: {
			// 			'content-type': 'application/json'
			// 		},
			// 		success(res) {
			// 			if (res.data.status == 200) {
			// 				if (wx.getStorageSync('alterArticle')) {
			// 					wx.removeStorage({
			// 						key: 'alterArticle',
			// 						success: function (res) { },
			// 					});
			// 				}

			// 				if (wx.getStorageSync('isEdit')) {
			// 					wx.removeStorage({
			// 						key: 'isEdit',
			// 						success: function (res) { },
			// 					});
			// 				}

			// 				$Toast({
			// 					content: '发表成功!',
			// 					type: 'success'
			// 				});

			// 				wx.reLaunch({
			// 					url: '/pages/index/index'
			// 				});
			// 			} else {
			// 				$Toast({
			// 					content: res.data.err,
			// 					type: 'error'
			// 				});
			// 			}
			// 		}
			// 	});
			// } else {
        //进行发表文章
        wx.u.addArticle(param).then(res=>{
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

        
				// wx.request({
				// 	url: util.basePath + '/article/v1/saveContent',
				// 	method: "post",
				// 	data: param,
				// 	header: {
				// 		'content-type': 'application/json'
				// 	},
				// 	success(res) {
				// 		if (res.data.status == 200) {
				// 			$Toast({
				// 				content: '发表成功!',
				// 				type: 'success'
				// 			});

				// 			wx.reLaunch({
				// 				url: '/pages/index/index',
				// 			})
				// 		} else {
				// 			$Toast({
				// 				content: res.data.err,
				// 				type: 'error'
				// 			});
				// 		}
				// 	}
				// });
			// }
    }
  }
});