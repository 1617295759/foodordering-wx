// pages/orders/orders.js
Page({

  takeit: function (e) {
    var orderID = e.currentTarget.dataset.orderid
    wx.request({
      url: 'http://140.143.231.173:8080/food_ordering_war4/modifyOrderServlet',
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
        if(res.data['error_code']=='0'){
          wx.showModal({
            title: '用餐愉快！',
            showCancel: false,
            confirmText: '返回主页',
            success (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '../userindex/userindex'
                })
              } 
              }
          })
        }
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    orderlist: {},
    state: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    var userID = wx.getStorageSync('userID')
    if (wx.getStorageSync('userstate') == 2) {
      wx.request({
        url: 'http://140.143.231.173:8080/food_ordering_war4/queryOrderServlet',
        method: 'post',
        data: {
          userID: userID
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
    }else{
      that.setData({
        orderlist: {}
      })
    }
  },
})