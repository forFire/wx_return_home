//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    text: "XXXX",
    html: '<div class="div_class" style="line-height: 40px; color: red;text-align:center ">发布信息</div>',
    html1: '<div class="div_class" style="line-height: 40px; color: red;text-align:center ">我的信息</div>',
    iftrue: true,
    pageBackgroundColor1: 'white' ,
    pageBackgroundColor2: 'gray',
    date: '2019-11-28',

    // nodes: [{
    //   name: 'div',
    //   attrs: {
    //     class: 'div_class',
    //     style: 'line-height: 60px; color: red;'
    //   },
    //   children: [{
    //     type: 'text',
    //     text: 'Hello&nbsp;World'
    //   }]
    // }],

    checkboxItems: [
      { start: '北京市昌平区回龙观109号', tel: '18263729011', sates: '1', end: '山东省青岛市市南区', img: "../image/green_tri.png" },
      { start: '北京市昌平区回龙观109号', tel: '18263729012', sates: '2', end: '山东省青岛市市南区', img: "image/green_tri.png" },
      { start: '北京市昌平区回龙观109号', tel: '18263729013', sates: '3', end: '山东省青岛市市南区', img: "image/green_tri.png" },
      { start: '北京市昌平区回龙观109号', tel: '18263729045', sates: '2', end: '山东省青岛市市南区', img: "image/green_tri.png" },
      { start: '北京市昌平区回龙观109号', tel: '1826371234', sates: '2', end: '山东省青岛市市南区', img: "image/green_tri.png" }
    ],


    region: ['广东省', '广州市', '海珠区']


  },

  //点击tap
  tap(event) {

  //  console.log(event)
    // console.log(event.target.id);       // 可获得
  //  console.log(event.target.name);     // 无法获得, 通过target只能直接获取id
   // console.log(event.target.dataset);  // 要获得其它属性, 需要从dataset(数据集)中获取
    // console.log(event.target.dataset.userXxx);  // userxxx为自定义的属性名, 但命名方式为:data-userxxx
   // console.log(event.target.dataset.userXxx == 100); 


    var bgColor1 = this.data.pageBackgroundColor1 == 'white' ? 'gray' : 'white';
    var bgColor2 = this.data.pageBackgroundColor2 == 'gray' ? 'white' : 'gray';

    // 设置背景颜色数据

    this.setData({
      pageBackgroundColor1: bgColor1,
      pageBackgroundColor2: bgColor2
    });


    if (event.target.dataset.userXxx==100){
      this.setData({
          checkboxItems: [
          { start: '北京市昌平区回龙观109号', tel: '18263729011', sates: '1', end: '山东省青岛市市南区', img: "../image/green_tri.png" },
          { start: '北京市昌平区回龙观109号', tel: '18263729012', sates: '2', end: '山东省青岛市市南区', img: "image/green_tri.png" },
          { start: '北京市昌平区回龙观109号', tel: '18263729013', sates: '3', end: '山东省青岛市市南区', img: "image/green_tri.png" },
          { start: '北京市昌平区回龙观109号', tel: '18263729045', sates: '2', end: '山东省青岛市市南区', img: "image/green_tri.png" },
          { start: '北京市昌平区回龙观109号', tel: '1826371234', sates: '2', end: '山东省青岛市市南区', img: "image/green_tri.png" }
          ],
         })
   
    }else{
      this.setData({
        checkboxItems: [
          { start: '回龙观东大街A口', tel: '18263729011', sates: '2', end: '山东省枣庄市峄城区', img: "../image/green_tri.png" }
        ]
    
      })
    }
  },

  adddetial() {
    wx.navigateTo({ //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
      url: "/pages/publish/publish"
    })
  },


  tel(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.mobile,
    })
  },

  //搜索
  search(e){
    console.info(this.data.date)
    console.info(this.data.startName)
    var params = {
      date: this.date,
      startName: this.data.startName,
      endName: this.data.endName
    };

    this.setData({
      checkboxItems: [
        { start: '北京市海淀区', tel: '18263729011', sates: '2', end: '山东省枣庄市峄城区', img: "../image/green_tri.png" }
      ]

    })

    wx.request({
      url: this.data.serverUri + "tool-mobile-api/mmobileApi/wxLoc/sendWxMsg.do",
      data: "p=" + params,
      method: "post",
      header: {
        "Content-Type":
        "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.info(res);


      },
      fail: function (res) {

     

      },
      complete: function () {
      }
    })
  },

  getStart(e) {
    console.log("============>" + e.detail.value);
    if (e.detail.value=="北"){
      this.setData({
        startName: "北京"
      });
    } else if (e.detail.value =="山"){
      this.setData({
        startName: "山东"
      });
    }
   
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  submitInfo: function (e) {

    console.log("============>"+e.detail.formId);
    console.info(this.data.serverUri);

    var params = {
      formId: e.detail.formId,
      code: this.data.code
    };

    wx.request({
      url: this.data.serverUri + "tool-mobile-api/mmobileApi/wxLoc/sendWxMsg.do",
      data: "p=" + params,
      method: "post",
      header: {
        "Content-Type":
        "application/x-www-form-urlencoded"
      },
      success: function (res) {
        wx.showModal({
          title: '友情提示',
          showCancel: false,
          content: "接口错误",
          success: function (res) {

          }
        })
      },
      fail: function (res) {
        requestHandler.fail(res)
      },
      complete: function () {
      }
    })

  },

  bindStartNameChange: function (e) {
    this.setData({
      startName: e.detail.value
    })
  },

  bindEndNameChange: function (e) {
    this.setData({
      endName: e.detail.value
    })
  }

})

