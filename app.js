//app.js
App({
  onLaunch: function () {

  },
  globalData: {
    userInfo: null,
    //0-初始，1，学生未认证，2-学生已认证，3-管理员已认证
    userstate: 0,
    authenticationInfo: null,
    server:'https://www.foodordering.work/food_ordering_restructure/'
  }
})