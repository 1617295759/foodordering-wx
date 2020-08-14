// pages/orders/orders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderlist:{},
    state:''
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
      success(res){
        if(res.data[0]!='{'){
          that.setData({
            orderlist: res.data
          })
          
        }
      }
    })
  },
})