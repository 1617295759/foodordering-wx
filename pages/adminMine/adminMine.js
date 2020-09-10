// pages/mine/mine.js
const app = getApp()
Page({
  data: {
    userInfo: {},
    adminDetailInfo:{},
    tabBar:{},
    userstate:0,
    public_Info:{}
  },
  onLoad: function (options) {
    var tabBar = this.selectComponent(".tabbar")
    tabBar.editTabBarAdmin()
    
    var state = wx.getStorageSync('userstate')
    var adminDetailInfo = wx.getStorageSync('userInfo')
    var public_Info = wx.getStorageSync('public_info')
    
    this.setData({
      userInfo: app.globalData.userInfo,
      adminDetailInfo: adminDetailInfo,
      userstate: state,
      public_Info:public_Info
    })
  },
  toRegister: function(e){
    wx.navigateTo({
      url: '../adminRegister/adminRegister',
    })
  },
  exit: function(){
    this.setData({
      userstate: null,
      userID: null,
      phone: null,
      username: null
    })
    wx.clearStorage()
    wx.reLaunch({
      url: '../adminLogin/adminLogin',
    })
  },
  manage: function(){
    wx.navigateTo({
      url: '../adminMeal/adminMeal'
    })
  },
  history: function(){
    wx.navigateTo({
      url: '../adminHistoryOrder/adminHistoryOrder'
    })
  }
})