import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Icon, ScrollView } from '@tarojs/components'
import { getData, setData } from '../../utils/store'
import { get, URL } from '../../service/api'
import './index.scss'
import { AtNavBar, AtActionSheet, AtActionSheetItem } from 'taro-ui'
import Loading from '../../components/loading.jsx'
export default class Index extends Component {
  /************数据初始化***************/
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      photoArr: []
    }
  }
  /************页面配置部分***************/
  // config = {
  //   navigationBarTitleText: '首页'
  // }

  /************生命周期函数部分***************/
  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  componentDidShow() {
    get('/zll/love/file/bgc').then(e => {
      if (e.data.result) {
        this.setState({ photoArr: e.data.list, loading: false })
      } else {
        Taro.atMessage({
          message: '数据加载失败！',
          type: 'error',
        })
      }
    }).catch(e => {
      console.log(e);
    })
  }

  componentDidHide() {
    console.log('componentDidHide');
  }

  /************自定义状态函数部分 ***************/
  handleRouter(key, item) {

    // setData('bid', item.bid)
    // switch (key) {
    //   case 'l':
    //     Taro.navigateTo({
    //       url: '/pages/photoList/index'
    //     })
    //     break;
    //   case 'open':
    //     Taro.navigateTo({
    //       url: '/pages/photoAdd/index'
    //     })
    //     break;
    //   default:
    //     break;
    // }
  }
  handleCancel() {
    this.setState({ isBgcOpened: false })
  }
  handleClick(type) {
    let _this = this
    switch (type) {
      case 'fd':
        let src = _this.state.src ? _this.state.src : URL + '/' + this.state.data.login.bgc
        Taro.previewImage({
          current: src, // 当前显示图片的http链接
          urls: [src]
        })
        this.setState({ isOpened: false })
        break;
      case 'bgc':
        Taro.navigateTo({
          url: '/pages/aboutBgcList/index'
        })
        break;
      default:
        break;
    }
  }


  beforePage() {
    Taro.navigateTo({
      url: '/pages/about/index'
    })
  }
  /************视图部分***************/

  render() {
    let photoArr = this.state.photoArr
    let content = photoArr.map(item => {
      return <View className='item h5-item' onClick={this.handleRouter.bind(this, item)}>
        <Image className='img' src={URL + '/' + item.src}></Image>
      </View>
    })

    const scrollStyle = {
      height: getData('winHeight') * 1 - 50 + 'px'
    }

    let navBar = null
    if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
      navBar = <AtNavBar
        onClickRgIconSt={this.beforePage.bind(this)}
        onClickRgIconNd={this.beforePage.bind(this)}
        onClickLeftIcon={this.beforePage.bind(this)}
        color='#000'
        leftText='返回'
        leftIconType='chevron-left'
      >
        <View>回忆录</View>
      </AtNavBar>
    }
    return (
      <View className='index'>
        {this.state.loading ? <Loading /> : ''}
        {navBar}
        <ScrollView
          className='scrollview'
          scrollY
          scrollWithAnimation
          scrollTop={0}
          style={scrollStyle}
          lowerThreshold={20}
          upperThreshold={20}
          // onScrollToUpper={this.onScrollToUpper.bind(this)} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
          onScroll={this.onScroll}
        >
          <View className='warp1'>
            {content}
          </View>
          <View className='tip-bottom'>
            没有更多啦~
           </View>
        </ScrollView>
        {/* 背景 动作面板 */}
        <AtActionSheet isOpened={this.state.isBgcOpened} cancelText='关闭' onCancel={this.handleCancel.bind(this)} onClose={this.handleCancel.bind(this)}>
          <AtActionSheetItem onClick={this.handleClick.bind(this, 'fd')}>
            选择此背景
          </AtActionSheetItem>
        </AtActionSheet>
        {/* 背景 */}
        <Image className="bg" src={getData("bgcData") ? URL + getData("bgcData")[1].src : URL + '/love/bgc/bgc4.jpg'}></Image>
        {/* <Image className="bg" src={URL + '/' + 'love/bgc/bgc4.jpg'}></Image> */}
      </View>
    )
  }
}
