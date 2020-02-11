import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import { setData } from './utils/store'
// import { winWidth, winHeight } from './utils/common'
import 'taro-ui/dist/style/index.scss' // 全局引入一次即可
import './app.scss'

if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
  require('./apph5.scss')
}
// import './static/css/css/font-awesome.min.css'
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     ddd: false
  //   };
  // }
  componentDidMount() {
    // 获取系统信息
    Taro.getSystemInfo({
      success: function (res) {
        // 获取可使用窗口宽度
        let clientHeight = res.windowHeight;
        // // 获取可使用窗口高度
        // let clientWidth = res.windowWidth;
        // // 算出比例
        // let ratio = 750 / clientWidth;
        // // 算出高度(单位rpx)
        // let height = clientHeight * ratio;
        // 设置高度
        if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
          setData('winHeight', clientHeight + 'px')
        } else {
          setData('winHeight', clientHeight * 1 + 38 + 'px')
        }

      }
    })
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  config = {
    pages: [
      'pages/index/index',
      'pages/trend/index',
      'pages/about/index',
      'pages/photo/index',
      'pages/photoAdd/index',
      'pages/photoEdit/index',
      'pages/remember/index',
      'pages/rememberEdit/index',
      'pages/desire/index',
      'pages/photoList/index',
      'pages/wishEdit/index',
      'pages/desireEditSw/index',
      'pages/desireList/index',
      'pages/desireEdit/index',
      'pages/wishList/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      borderStyle: "black",
      selectedColor: "#000000",
      backgroundColor: "#ffffff",
      color: "#c7c7c7",
      list: [
        {
          pagePath: "pages/index/index",
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
          iconPath: "./static/img/wm2.png",
          selectedIconPath: "./static/img/wm1.png",
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
