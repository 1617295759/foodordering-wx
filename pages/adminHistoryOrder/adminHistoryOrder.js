// pages/orders/orders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderlist: {},
    state: '',
    adminDetailInfo:{}
  },
  onLoad: function(){
    this.setData({
      adminDetailInfo: wx.getStorageInfoSync('userInfo')
    })
  },
  onShow: function () {
    this.requestOrder()
  },
  onPullDownRefresh() {
    this.requestOrder()
    wx.stopPullDownRefresh()//得到结果后关掉刷新动画
  },
  requestOrder: function () {
    var that = this
    var admin = that.data.adminDetailInfo
    wx.request({
      url: 'http://www.foodordering.work/food_ordering_restructure/queryAdminOrderServlet',
      method: 'post',
      data: {
        phone: admin.phone,
        state:1
      },
      dataType: "json",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      success(res) {
        if (!res.data['error_code']) {
          that.setData({
            orderlist: res.data
          })
        }
      }
    })

  },
})