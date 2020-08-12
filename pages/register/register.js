// pages/register/register.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number: "",
    userID: "",
    username: ""
  },
  numberinput: function (e) {
    this.data.number = e.detail.value;
    var that = this
    var phonereg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    if (!phonereg.test(that.data.number)) {
      wx.showToast({
        title: '手机号错误',
        icon: 'none'
      })
    }
  },
  userIDinput: function (e) {
    this.data.userID = e.detail.value;
    var that = this
    var userIDreg = /^20\d{8}$/;
    if (!userIDreg.test(that.data.userID)) {
      wx.showToast({
        title: '学号错误',
        icon: 'none'
      })
    }
  },
  usernameinput: function (e) {
    this.data.username = e.detail.value;
  },
  regist: function (e) {
    var that = this
    var app = getApp()
    var userIDreg = /^20\d{8}$/;
    var phonereg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    if(userIDreg.test(that.data.userID)&&(phonereg.test(that.data.number))&&(!username)){
      wx.request({
        url: 'http://140.143.231.173:8080/food_ordering_war4/registerServlet',
        method: 'post',
        data: {
          userID: that.data.userID,
          phone: that.data.phone,
          userName: that.data.username,
          avatarURL: app.globalData.userInfo.avatarUrl
        },
        dataType: "json",
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        success(res) {
          if(res.data['error_code']==0){
            wx.showToast({
              title: '注册成功',
              icon: 'success'
            })
            wx.setStorageSync('userstate', "2")
            wx.setStorageSync('userID', that.data.userID)
            wx.setStorageSync('phone', that.data.number)
            wx.setStorageSync('username', that.data.username)
            wx.setStorageSync('avatarURL', app.globalData.userInfo.avatarUrl)
            
            wx.switchTab({
              url: '../mine/mine',
            })
          }
        },
        fail(res) {
          wx.showToast({
            title: '服务器响应失败',
            icon: 'none'
          })
        }
      })
    }else{
      wx.showToast({
        title: '输入信息错误',
        icon:'none'
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})