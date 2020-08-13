
Page({
  bindPickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', 5*e.detail.value)
    this.setData({
      index: e.detail.value,
      pickuptime: (5*e.detail.value)
    })
  },
  orderit: function(){
    var that = this
    var userID = wx.getStorageSync('userID')
    console.log(userID)
    console.log(that.data.meal.mealID)
    console.log(that.data.pickuptime)
    wx.request({
      url: 'http://140.143.231.173:8080/food_ordering_war4/addOrderServlet',
      method: 'post',
      data: {
        userID: userID,
        mealID: that.data.meal.mealID,
        state:'0',
        pickUpTime: that.data.pickuptime
      },
      dataType: "json",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      success(res) {
        console.log(res.data)
        if(res.data['error_code']==0){
          wx.showToast({
            title: '点餐成功',
            icon:'success'
          })
          wx.switchTab({
            url: '../orders/orders',
          })
        }
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    meal:{},
    aftertime: ['0','5', '10', '15', '20','25','30'],
    pickuptime:'',
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var meal = JSON.parse(options.meal)
    this.setData({
      meal: meal
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
