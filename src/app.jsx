import Taro, { Component } from '@tarojs/taro'
import Index from './pages/home/index'
import { setData, getData, emit } from './utils/store'
import { get, post, URL } from './service/api'
import 'taro-ui/dist/style/index.scss' // 全局引入一次即可
require('./app.scss')
if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
  require('./apph5.scss')
} else {
  require('./appwe.scss')
}
// import './static/css/css/font-awesome.min.css'
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  componentWillMount() {
 
    // //判断是否授权
    // Taro.checkSession({
    //   success() {
    //     //获取用户信息
    //     Taro.getUserInfo({
    //       success: function (res) {
    //         console.log(res.userInfo);
    //       }
    //     })
    //   },
    //   fail() {
    //     // 授权获取当前用户唯一id
    //     Taro.login().then(response => {
    //       post('/zll/love/login', { code: response.code }).then(e => {
    //         if (e.data.result) {
    //           console.log(e.data.massge);

    //           Taro.setStorage({
    //             key: 'session3rd',
    //             data: e.data.massge
    //           })
    //         } else {
    //           Taro.showToast({
    //             title: '发生错误，请重试!',
    //             icon: 'none'
    //           })
    //         }
    //       }).catch(e => {
    //         console.log(e);
    //         Taro.showToast({
    //           title: '发生错误，请重试!',
    //           icon: 'none'
    //         })
    //       })
    //     }).catch(err => {
    //       console.log(err);
    //       Taro.showToast({
    //         title: '发生错误，请重试!',
    //         icon: 'none'
    //       })
    //     })
    //   }
    // })
  }

  componentDidMount() {
    // 获取系统信息
    Taro.getSystemInfo({
      success: function (res) {
        // 获取可使用窗口宽度
        let clientHeight = res.windowHeight;
        if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
          setData('winHeight', clientHeight)
        } else {
          setData('winHeight', clientHeight)
        }
      }
    })
    if (!getData('user')) {
      Taro.navigateTo({
        url: '/pages/index/index'
      })
    }
  }

  componentDidHide() { }

  componentDidCatchError() { }
  config = {
    pages: [
      'pages/login/index',
      'pages/home/index',

      //'pages/index/index',
      'pages/photo/index',
      'pages/photoAdd/index',
      'pages/photoEdit/index',
      'pages/photoList/index',

      'pages/trend/index',
      'pages/trendAdd/index',

      'pages/wishEdit/index',
      'pages/wishList/index',

      'pages/remember/index',
      'pages/rememberShow/index',
      'pages/rememberEdit/index',

      'pages/about/index',
      'pages/aboutBgcList/index',
      'pages/aboutList/index',
      'pages/bgcList/index',

      'pages/desire/index',
      'pages/desireEditSw/index',
      'pages/desireList/index',
      'pages/desireEdit/index',

    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      borderStyle: "black",
      selectedColor: "#FE8E9A",
      backgroundColor: "#ffffff",
      color: "#c7c7c7",
      list: [
        {
          pagePath: "pages/home/index",
          text: "首页",
          iconPath: "./static/img/sy2.png",
          selectedIconPath: "./static/img/sy1.png",
        },
        {
          pagePath: "pages/trend/index",
          text: "动态",
          iconPath: "./static/img/dt2.png",
          selectedIconPath: "./static/img/dt1.png",
        },
        {
          pagePath: "pages/about/index",
          text: "我们",
          iconPath: "./static/img/love8.png",
          selectedIconPath: "./static/img/love5.png",
        }
      ]
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
