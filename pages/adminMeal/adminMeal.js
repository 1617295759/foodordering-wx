// pages/orders/orders.js
Page({
  data: {
    adminDetailInfo:{},
    orderlist: {},

    buttonDisabled: false,
    modalHidden: true,
    show: false,

    price:'',
    mealID:'',
    state:''
  },
  //弹出输入修改金额弹框
  showModal: function (e) {
    this.setData({
      modalHidden: !this.data.modalHidden,
      mealID:e.currentTarget.dataset.mealid,
      state: e.currentTarget.dataset.state
    })
  },
  //确认修改价格，向后端发送数据
  modalBindaconfirm: function (e) {
    var that = this
    this.setData({
      modalHidden: !this.data.modalHidden,
      show: !this.data.show,
      //  buttonDisabled:!this.data.buttonDisabled
    })
    wx.request({
      url: 'http://www.foodordering.work/food_ordering_restructure/modifyMealServlet',
      method: 'post',
      data: {
        mealID: that.data.mealID,
        adminID: that.data.adminDetailInfo.adminID,
        price: that.data.price,
        state: that.data.state
      },
      dataType: "json",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      success(res) {
        if (res.data['error_code'] == '0') {
          wx.showModal({
            title: '修改成功',
            showCancel: false,
            confirmText: '确定',
            success(res) {
              if (res.confirm) {
                wx.startPullDownRefresh()
              }
            }
          })
        }
      }
    })
  },
  modalBindcancel: function () {
    this.setData({
      modalHidden: !this.data.modalHidden,
    })
  },
  priceInput: function (e) {
    this.setData({
      price: e.detail.value
    });
    
  },
  //修改上架下架信息
  takeit: function (e) {
    var that = this
    var mealID = e.currentTarget.dataset.mealid
    var state = e.currentTarget.dataset.state
    var price = e.currentTarget.dataset.price
    wx.request({
      url: 'http://www.foodordering.work/food_ordering_restructure/modifyMealServlet',
      method: 'post',
      data: {
        mealID:mealID,
        adminID: that.data.adminDetailInfo.adminID,
        price: price,
        state: (state==0)?1:0
      },
      dataType: "json",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      success(res) {
        if (res.data['error_code'] == '0') {
          wx.showModal({
            title: '修改成功',
            showCancel: false,
            confirmText: '确定',
            success(res) {
              if (res.confirm) {
                wx.startPullDownRefresh()
              }
            }
          })
        }
      }
    })
  },

  onLoad: function(){
    this.setData({
      adminDetailInfo: wx.getStorageSync('userInfo')
    })
  },
  onShow: function () {
    this.requestOrder()
    setInterval(() => {
      wx.startPullDownRefresh()//通过方法调用刷新
    }, 10000)
  },
  onPullDownRefresh() {
    this.requestOrder()
    wx.stopPullDownRefresh()//得到结果后关掉刷新动画
  },
  //从服务器获取菜品信息
  requestOrder: function () {
    var that = this
    var admin = that.data.adminDetailInfo
    wx.request({
      url: 'http://www.foodordering.work/food_ordering_restructure/queryAdminMealServlet',
      method: 'post',
      data: {
        adminID: admin.adminID
      },
      dataType: "json",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      success(res) {
        if (!res.data['error_code']) {
          that.setData({
            orderlist: res.data
          })
        }
      }
    })

  },
})