//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false
  },
  //点击用户登陆按钮，转到用户页面，更改状态
  UserLog: function (e) {
   console.log(e.detail.userInfo)
    if(e.detail.userInfo){
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.redirectTo({
      url: '../userindex/userindex',
    })
    try {
      wx.setStorageSync('userstate', '1')
      wx.setStorageSync('public_info', e.detail.userInfo)
    } catch (e) {}
   }else{
     this.getUserInfo()
   }
  },
  //点击管理员登陆按钮，转到管理员页面，更改用户状态
  AdmiLog: function (e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      wx.redirectTo({
        url: '../adminLogin/adminLogin',
      })
      try {
        wx.setStorageSync('public_info', e.detail.userInfo)
      } catch (e) {}
    }else{
      this.getUserInfo()
    }
  },
  onLoad: function () {
    //根据存储中的用户状态转到相应页面
    try {
      var value = wx.getStorageSync('userstate')
      if (value) {
        switch (value) {
          case "1":
            wx.redirectTo({
              url: '../userindex/userindex',
            })
            break
          case "2":
            wx.redirectTo({
              url: '../userindex/userindex',
            })
            break
          case "3":
            wx.redirectTo({
              url: '../adminOrder/adminOrder',
            })
            break
        }
      } else {
        wx.setStorage({
          key: "userstate",
          data: "0"
        })
      }
    } catch (e) {
      // Do something when catch error
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})