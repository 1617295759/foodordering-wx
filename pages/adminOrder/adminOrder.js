// pages/orders/orders.js
Page({

  takeit: function (e) {
    var orderID = e.currentTarget.dataset.orderid
    wx.request({
      url: 'http://www.foodordering.work/food_ordering_restructure/modifyOrderServlet',
      method: 'post',
      data: {
        orderID: orderID,
        state: '1'
      },
      dataType: "json",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      success(res) {
        if (res.data['error_code'] == '0') {
          wx.showModal({
            title: '制作完成，辛苦啦！',
            showCancel: false,
            confirmText: '下一道！',
            success(res) {
              if (res.confirm) {
                wx.startPullDownRefresh()
              }
            }
          })
        }
      }
    })
  },

  data: {
    orderlist: {},
    state: '',
    tabBar:{}
  },

  onLoad: function(){
    var tabBar = this.selectComponent(".tabbar")
    tabBar.editTabBarAdmin()
  },
  onShow: function () {
    this.requestOrder()
    setInterval(() => {
      this.requestOrder()
    }, 100000)
  },

  onPullDownRefresh() {
    this.requestOrder()
    wx.stopPullDownRefresh()//得到结果后关掉刷新动画
  },
  requestOrder: function () {
    var that = this
    var adminDetailInfo = wx.getStorageSync('userInfo')
    wx.request({
      url: 'http://www.foodordering.work/food_ordering_restructure/queryAdminOrderServlet',
      method: 'post',
      data: {
        phone: adminDetailInfo.phone
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