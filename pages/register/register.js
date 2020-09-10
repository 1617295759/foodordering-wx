// pages/register/register.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    userID: "",
    username: ""
  },
  numberinput: function (e) {
    this.data.phone = e.detail.value;
    var that = this
    var phonereg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    if (!phonereg.test(that.data.phone)) {
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
    if(userIDreg.test(that.data.userID)&&(phonereg.test(that.data.phone))&&
    (that.data.username)){
      wx.request({
        url: 'http://www.foodordering.work/food_ordering_restructure/registerServlet',
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
          console.log(res.data)
          if(res.data['error_code']==0){
            wx.showToast({
              title: '注册成功',
              icon: 'success'
            })
            wx.setStorageSync('userstate', "2")
            wx.setStorageSync('userID', that.data.userID)
            wx.setStorageSync('phone', that.data.phone)
            wx.setStorageSync('username', that.data.username)
            wx.setStorageSync('avatarURL', app.globalData.userInfo.avatarUrl)
            
            wx.setStorageSync('userDetail', 1)
            wx.reLaunch({
              url: '../mine/mine',
            })
          }else{
            wx.showModal({
              title: '该学号已注册',
              showCancel: false,
              confirmText:'去登陆',
              success(res){
                 if(res.confirm){
                  wx.navigateTo({
                    url: '../login/login',
                  })
                }
              }
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
  signin: function(){
    wx.navigateTo({
      url: '../login/login',
    })
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