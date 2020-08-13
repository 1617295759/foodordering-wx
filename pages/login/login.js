// pages/login/login.js
Page({
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
  login: function(){
    var that = this
    var app = getApp()
    var userIDreg = /^20\d{8}$/;
    var phonereg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    if(userIDreg.test(that.data.userID)&&(phonereg.test(that.data.number))){
      wx.request({
        url: 'http://140.143.231.173:8080/food_ordering_war4/loginServlet',
        method: 'post',
        data: {
          userID: that.data.userID,
          phone: that.data.number
        },
        dataType: "json",
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        success(res) {
          var that = this
          var user = res.data['user']
          if(res.data['error_code']==0){
            wx.showToast({
              title: '登录成功',
              icon: 'success'
            })
            //将获取的信息保存在存储
            wx.setStorageSync('userstate', '2')
            wx.setStorageSync('username', user.userName)
            wx.setStorageSync('phone', user.phone)
            wx.setStorageSync('userID', user.userID)
            wx.switchTab({
              url: '../mine/mine',
            })
          }else{
            wx.showModal({
              title: '信息错误',
              cancelText: '再试一次',
              confirmText:'去注册',
              success(res){
                 if(res.confirm){
                  wx.navigateTo({
                    url: '../register/register',
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
  /**
   * 页面的初始数据
   */
  data: {
    number: "",
    userID: "",
    username: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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