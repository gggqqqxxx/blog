const util = require('../../utils/util.js');
const app = getApp();
const {
  $Toast
} = require('../../dist/base/index');

Page({
  data: {
    article: {}
  },

  onLoad: function(options) {
    var that = this;
    that.getDetails();
  },

	__bind_tap: function (e) {
		var that = this;
		var res = e.currentTarget.dataset._el.attr.src;
		if (res) {
			var list = this.data.previewImgList || [];

			if (list.indexOf(res) == -1) {
				list.push(res);
			}

			wx.previewImage({
				current: res,
				urls: list
			});
		}
	},

  wxmlTagATap(e) {
    console.log(e);
  },
  getDetails: function() {
    var that = this;

    //将markdown内容转换为towxml数据
		let data = app.towxml.toJson(wx.getStorageSync("showContent").content, 'markdown');
		//设置文档显示主题，默认'light'
		data.theme = 'dark';

    this.setData({
      article: wx.getStorageSync("showContent")
    });
		this.setData({
			['article.content']: data
		});
  }
});