// pages/userindex/userindex.js
Page({
  //点击楼层后从服务器获取此楼层的菜品
  chooseloc: function(e){
    let loc = e.currentTarget.dataset.loc
    this.getMeals(loc)
  },
  //从服务器获取数据的方法
  getMeals: function(loc){
    var that = this;
    wx.request({
      url: 'http://140.143.231.173:8080/food_ordering_war4/showMealServlet', 
      method: 'post',
      data: {
        location: loc
      },
      dataType:"json",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' 
      },
      success (res) {
        if(res.data[0]!='{'){
          that.setData({
            meals:res.data
          })
        }
      }
    })
  },
  wantit: function(e){
    let meal = JSON.stringify(e.currentTarget.dataset.meal)
    var that = this
    var state = wx.getStorageSync('userstate')
    if(state=='2'){
      wx.navigateTo({
        url: '../addorder/addorder?meal='+ meal
      })
    }else{
      wx.showModal({
        cancelColor: 'cancelColor',
        title: '请前往认证',
        cancelText:'先不认证',
        confirmText:'现在就去',
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
  /**
   * 页面的初始数据
   */
  data: {
    meals:{},
    location:['学生食堂一楼','学生食堂二楼','学生食堂三楼','学生食堂四楼','学生食堂五楼',
    '教工食堂一楼','教工食堂二楼','教工食堂三楼','教工食堂四楼']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMeals("学生食堂一楼")
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
