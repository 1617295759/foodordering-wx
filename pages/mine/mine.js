// pages/mine/mine.js
const app = getApp()
Page({
exit: function(){
  this.setData({
    userstate: null,
    userID: null,
    phone: null,
    username: null
  })
  wx.clearStorage()
  wx.switchTab({
    url: '../mine/mine'
  })
},
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    userstate: null,
    phone: "",
    userID: "",
    username: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var state = wx.getStorageSync('userstate')
    this.setData({
      userInfo: app.globalData.userInfo,
      userstate: state
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var state = wx.getStorageSync('userstate')
    if(state=='2'){
      var userID = wx.getStorageSync('userID')
      var phone = wx.getStorageSync('phone')
      var username = wx.getStorageSync('username')
      this.setData({
        userstate: state,
        userID: userID,
        phone: phone,
        username: username
      })
    }
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

  },

  toRegister: function(e){
    wx.navigateTo({
      url: '../register/register',
    })
  }
})