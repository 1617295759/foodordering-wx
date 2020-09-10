// pages/orders/orders.js
Page({

  takeit: function (e) {
    var orderID = e.currentTarget.dataset.orderid
    wx.request({
      url: 'http://www.foodordering.work/food_ordering_restructure/modifyOrderServlet',
      method: 'post',
      data: {
        orderID: orderID,
        state: '2'
      },
      dataType: "json",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      success(res) {
        if (res.data['error_code'] == '0') {
          wx.showModal({
            title: '用餐愉快！',
            showCancel: false,
            confirmText: '返回主页',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../userindex/userindex'
                })
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
    tabBar: {}
  },

  onLoad: function (options) {
    var tabBar = this.selectComponent(".tabbar")
    tabBar.editTabBarUser()
  },

  onShow: function () {
    var that = this
    var userID = wx.getStorageSync('userID')
    if (wx.getStorageSync('userstate') == 2) {
      wx.request({
        url: 'http://www.foodordering.work/food_ordering_restructure/queryUserOrderServlet',
        method: 'post',
        data: {
          userID: userID
        },
        dataType: "json",
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        success(res) {
          console.log(res.data)
          if (!res.data['error_code']) {
            console.log(res.data);
            that.setData({
              orderlist: res.data
            })
          }
        }
      })
    } else {
      that.setData({
        orderlist: {}
      })
    }
  },
})