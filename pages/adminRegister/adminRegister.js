// pages/adminRegister/adminRegister.js
const app = getApp();
Page({

  data: {
    is_disabled: false,
    username: "",
    phonenumber: "",
    adminID: "",
  },

  onLoad: function(){
    try {
      var userstate = wx.setStorageSync('userstate', '3')
    } catch (e) {}
    if(userstate == 3){
      wx.reLaunch({
        url: '../adminMine/adminMine',
      })
    }
  },
  signin: function() {
    wx.navigateTo({
      url: '/pages/adminLogin/adminLogin'
    })
  },

  regist: function(e) {
    if(app.globalData.userInfo==null){
      app.globalData.userInfo = e.detail.userInfo;
    }
    var that = this;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (that.data.username == '') {
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '请输入姓名！',
        success: function(res) {}
      })
    } else if (that.data.phonenumber == '') {
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '请输入手机号码！',
        success: function(res) {}
      })
    } else if (that.data.phonenumber.length != 11) {
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '手机号长度有误，请重新输入！',
        success: function(res) {}
      })
    } else if (!myreg.test(that.data.phonenumber)) {
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '请输入正确的手机号码！',
        success: function(res) {}
      })
    }else {
      wx.request({
        url: getApp().globalData.server + 'adminRegisterServlet',
        data: {
          adminName: that.data.username,
          phone: that.data.phonenumber,
          adminID: that.data.adminID,
          avatarURL: app.globalData.userInfo.avatarUrl,
        },
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function(res) {
          console.log(res.data)
          if (res.data.error_code == 1) {
            wx.showModal({
              title: '提示！',
              showCancel: false,
              content: res.data.msg,
              success: function (res) { }
            })
          } else if (res.data.error_code != 0) {
            wx.showModal({
              title: '哎呀～',
              showCancel: false,
              content: '出错了呢！' + res.data.msg,
              success: function(res) { }
            })
          } else if (res.data.error_code == 0) {
            wx.setStorageSync('userstate', "3")
            wx.setStorageSync('userInfo',{
              adminID:that.data.adminID,
              adminName:that.data.username,
              avatarUrL:app.globalData.userInfo.avatarUrl,
              phone:that.data.phonenumber
            })
            wx.showModal({
              title: '恭喜！',
              showCancel: false,
              content: '注册成功',
              success: function(res) { },
              complete: function(res) {
                wx.redirectTo({
                  url: "../adminMine/adminMine"
                })
              }
            })
          }
        },
        fail: function(res) {
          wx.showModal({
            title: '哎呀～',
            content: '网络不在状态呢！',
            success: function(res) { }
          })
        }
      })
    }
  },

  usernameInput: function(e) {
    this.data.username = e.detail.value
  },

  phonenumberInput: function(e) {
    this.data.phonenumber = e.detail.value
  },

  adminIDInput: function(e) {
    this.data.adminID = e.detail.value
  }
})