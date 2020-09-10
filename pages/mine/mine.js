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
    wx.reLaunch({
      url: '../mine/mine'
  })
},
  data: {
    userInfo: {},
    userdetail:{},
    userstate: null,
    phone: "",
    userID: "",
    username: "",
    tabBar:{}
  },

  onLoad: function (options) {
    var tabBar = this.selectComponent(".tabbar")
    tabBar.editTabBarUser()
    
    var state = wx.getStorageSync('userstate')
    var user = wx.getStorageSync('public_info')
    this.setData({
      userInfo: user,
      userstate: state
    })
  },

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
  toRegister: function(e){
    wx.navigateTo({
      url: '../register/register',
    })
  }
})