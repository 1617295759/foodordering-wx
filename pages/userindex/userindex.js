// pages/userindex/userindex.js
Page({
  //点击楼层后从服务器获取此楼层的菜品
  chooseloc: function(e){
    let loc = e.currentTarget.dataset.loc
    let index =  e.currentTarget.dataset.index
    this.setData({
      locidx: index
    })
    this.getMeals(loc)
  },
  //从服务器获取数据的方法
  getMeals: function(loc){
    var that = this;
    wx.request({
      url: 'http://www.foodordering.work/food_ordering_restructure/showMealServlet', 
      method: 'post',
      data: {
        location: loc
      },
      dataType:"json",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' 
      },
      success (res) {
        if(res.data.length!=undefined){
          that.setData({
            meals:res.data
          })
        }else{
          that.setData({
            meals:null
          })
        }
      }
    })
  },
  //点击某一菜品的订餐按钮的动作
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

  data: {
    swiperpic: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597465517733&di=0cd979c30027ee8826781bde7620aa22&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn05%2F290%2Fw680h410%2F20180713%2Fea14-hfhfwmu3172266.jpg', 
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597465752173&di=24c204c51175cbc05693cc2602dc3bad&imgtype=0&src=http%3A%2F%2Fp1.meituan.net%2Fdeal%2F64c10aff377fbd5281447e6d50b0c63d388180.jpg', 
    'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=522490806,439536717&fm=26&gp=0.jpg'],
    meals:{},
    locidx: 0,
    // location:['学一','学二','学三','学四','学五',
    // '教一','教二','教三','教四']
    location:['学生食堂一楼','学生食堂二楼','学生食堂三楼','学生食堂四楼','学生食堂五楼',
    '教工食堂一楼','教工食堂二楼','教工食堂三楼','教工食堂四楼'],
    tabBar:{}
  },

  onLoad: function (options) {
    var tabBar = this.selectComponent(".tabbar")
    tabBar.editTabBarUser()
    this.getMeals("学生食堂一楼")
  }
})
