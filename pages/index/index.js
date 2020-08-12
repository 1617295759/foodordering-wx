//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '三餐邮你',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //跳转日志
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //点击用户登陆按钮，转到用户页面，更改状态
  UserLog: function (e) {
   if(e.detail.userInfo){
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.switchTab({
      url: '../userindex/userindex',
    })
    try {
      wx.setStorageSync('userstate', '1')
    } catch (e) {}
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
      wx.navigateTo({
        url: '../admindex/admindex',
      })
      try {
        wx.setStorageSync('userstate', '3')
      } catch (e) {}
    }
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      //在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    //根据存储中的用户状态转到相应页面
    try {
      var value = wx.getStorageSync('userstate')
      if (value) {
        switch (value) {
          case "1":
            wx.switchTab({
              url: '../userindex/userindex',
            })
            break
          case "2":
            wx.switchTab({
              url: '../userindex/userindex',
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