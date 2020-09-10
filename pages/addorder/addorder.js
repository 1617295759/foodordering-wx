
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
    wx.request({
      url: 'http://www.foodordering.work/food_ordering_war4/addOrderServlet',
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
        if(res.data['error_code']==0){
          wx.showToast({
            title: '点餐成功'
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
    pickuptime:'0',
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
  }
})
