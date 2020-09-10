// pages/adminLogin/adminLogin.js
const app = getApp();
Page({

  data: {
    is_disabled: false,
    phone: "",
    adminID: "",
  },
  onLoad: function () {
    try {
      var userstate = wx.setStorageSync('userstate', '3')
    } catch (e) {}
    if(userstate == 3){
      wx.reLaunch({
        url: '../adminOrder/adminOrder',
      })
    }
  },
  signup: function () {
    wx.navigateTo({
      url: '/pages/adminRegister/adminRegister'
    })
  },

  login: function (e) {
    if (app.globalData.userInfo == null) {
      app.globalData.userInfo = e.detail.userInfo;
    }
    var that = this;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (that.data.phone == '') {
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '请输入手机号！',
        success: function (res) {}
      })
    } else if (that.data.phone.length != 11) {
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '手机号长度有误，请重新输入！',
        success: function (res) {}
      })
    } else if (!myreg.test(that.data.phone)) {
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '请输入正确的手机号码！',
        success: function (res) {}
      })
    } else {
      wx.request({
        url: getApp().globalData.server + 'adminLoginServlet',
        data: {
          phone: that.data.phone,
          adminID: that.data.adminID,
        },
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.error_code == 1) {
            wx.showModal({
              title: '提示！',
              showCancel: false,
              content: res.data.msg,
              success: function (res) {}
            })
          } else if (res.data.error_code != 0) {
            wx.showModal({
              title: '哎呀～',
              content: '出错了呢！' + res.data.msg,
              success: function (res) {}
            })
          } else if (res.data.error_code == 0) {
            wx.setStorageSync('userstate', '3')
            wx.setStorageSync('userInfo', res.data.admin)
            wx.showModal({
              title: '恭喜！',
              showCancel: false,
              content: '登录成功',
              success: function (res) {},
              complete: function (res) {
                wx.reLaunch({
                  url: "../adminMine/adminMine"
                })
              }
            })
          }
        },
        fail: function (res) {
          wx.showModal({
            title: '哎呀～',
            content: '网络不在状态呢！',
            success: function (res) {}
          })
        }
      })
    }
  },
  phoneInput: function (e) {
    this.data.phone = e.detail.value
    //console.log(this.data.phone)
  },

  adminIDInput: function (e) {
    this.data.adminID = e.detail.value
  }
})