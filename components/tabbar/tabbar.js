Component({
  properties: {
  },
  options: {
    addGlobalClass: true,
  },
  data: {
        //版本1底部导航栏显示
        tabbarUser: {
          "color": "#9E9E9E",
          "list": [
            {   
              "pagePath": "/pages/userindex/userindex",
              "text": "首页",
              "iconPath": "/image/tabbar/index.png",
              "selectedIconPath": "/image/tabbar/selectedindex.png",
              "clas": "tab-item",
              "selectedColor": "#2F4F4F",
              "active": true
            },
            {
              "pagePath": "/pages/orders/orders",
              "text": "订单",
              "iconPath": "/image/tabbar/order.png",
              "selectedIconPath": "/image/tabbar/selectedorder.png",
              "selectedColor": "#2F4F4F",
              "clas": "tab-item",
              "active": false
            },
            {
              "pagePath": "/pages/mine/mine",
              "text": "我的",
              "iconPath": "/image/tabbar/mine.png",
              "selectedIconPath": "/image/tabbar/selectedmine.png",
              "selectedColor": "#2F4F4F",
              "clas": "tab-item",
              "active": false
            }
          ],
          "position": "bottom"
        },
        //版本2底部导航栏显示
        tabbarAdmin: {
          "color": "#9E9E9E",
          "list": [   
            {
              "pagePath": "/pages/adminOrder/adminOrder",
              "text": "订单",
              "iconPath": "../../image/tabbar/order.png",
              "selectedIconPath": "../../image/tabbar/selectedorder.png",
              "clas": "tab-item",
              "selectedColor": "#2F4F4F",
              "active": true
            },
            {
              "pagePath": "/pages/adminMine/adminMine",
              "text": "我的",
              "iconPath": "../../image/tabbar/mine.png",
              "selectedIconPath": "../../image/tabbar/selectedmine.png",
              "selectedColor": "#2F4F4F",
              "clas": "tab-item",
              "active": false
            }
          ],
          "position": "bottom"
        }
  },
  methods: {
    //底部导航版本1  
    editTabBarUser: function() {
      //使用getCurrentPages可以获取当前加载中所有的页面对象的一个数组，数组最后一个就是当前页面。
      var curPageArr = getCurrentPages(); //获取加载的页面
      var curPage = curPageArr[curPageArr.length - 1]; //获取当前页面的对象
      var pagePath = curPage.route; //当前页面url
      if (pagePath.indexOf('/') != 0) {
        pagePath = '/' + pagePath;
      }
      var tabBar = this.data.tabbarUser;
      for (var i = 0; i < tabBar.list.length; i++) {
        tabBar.list[i].active = false;
        if (tabBar.list[i].pagePath == pagePath) {
          tabBar.list[i].active = true; //根据页面地址设置当前页面状态    
        }
      }
      curPage.setData({
        tabBar: tabBar
      });
    },
    //底部导航版本2
    editTabBarAdmin: function() {
      var curPageArr = getCurrentPages();
      var curPage = curPageArr[curPageArr.length - 1];
      var pagePath = curPage.route;
      if (pagePath.indexOf('/') != 0) {
        pagePath = '/' + pagePath;
      }
      var tabBar = this.data.tabbarAdmin;
      for (var i = 0; i < tabBar.list.length; i++) {
        tabBar.list[i].active = false;
        if (tabBar.list[i].pagePath == pagePath) {
          tabBar.list[i].active = true;
        }
      }
      curPage.setData({
        tabBar: tabBar
      });
    }
    }
})
