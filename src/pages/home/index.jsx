import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Icon } from '@tarojs/components'
import { getData, setData, watch } from '../../utils/store'
import { post, URL } from '../../service/api'
import { AtButton } from 'taro-ui'
import './index.scss'
import Loading from '../../components/loading.jsx'
export default class MainPage extends Component {
  /************数据初始化***************/
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      isLogin: true
    };
  }
  /************页面配置部分***************/
  config = {
    navigationBarTitleText: '爱的小窝'
  }

  /************生命周期函数部分***************/
  componentWillMount() {
    Taro.showShareMenu({
      withShareTicket: true
    })
    if (!getData('user').login) {
      Taro.reLaunch({
        url: '/pages/home/index'
      })
    }
  }

  componentDidMount() {
    watch('isLogin', () => {
      this.setState({ isLogin: false, loading: false })
    })
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  componentDidShow() {
    this.setState({ data: getData('user') })
  }

  componentDidHide() {
    console.log('componentDidHide');
  }

  /************自定义状态函数部分 ***************/
  handleRouter(key, e) {
    switch (key) {
      case 1:
        Taro.navigateTo({
          url: '/pages/photo/index'
        })
        break;
      case 2:
        Taro.navigateTo({
          // url: '/pages/desire/index'
          url: '/pages/wishList/index'
        })
        break;
      case 3:
        Taro.navigateTo({
          url: '/pages/remember/index'
        })
        break;

      default:
        break;
    }

    // this.props.onChange()

  }

  /************视图部分***************/
  render() {
    let { login, partner, startTime } = this.state.data ? this.state.data : getData('user');
    let time = Date.parse(new Date());
    let lasttime = Date.parse(startTime);
    let day = parseInt((time - lasttime) / (1000 * 60 * 60 * 24));
    const scrollStyle = {}
    if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
      scrollStyle.height = getData('winHeight') * 1 - 50 + 'px'
    } else {
      scrollStyle.height = getData('winHeight') * 1 - 55 + 'px'
    }
    return (
      <View className='indexa' style={scrollStyle}>
        {/* {this.state.loading ? <Loading /> : ''} */}
        <View className='top'>
          <View className="touxiang">
            <Image className="img" src={login.url}></Image>
            <Image className="img-love" src={require('../../static/img/love.png')}></Image>
            <Image className="img" src={partner.url}></Image>
          </View>
          <View className="i-title">
            <View className="title-top">{login.describe}</View>
            <View className="title-bottom">我们相爱<Text className="i-day">{day}</Text>天啦！</View>
          </View>
        </View>
        <View className="i-love">
          <View className="i-warp">
            {/* <Text className="center-text">想他</Text> */}
            <Image className="img" src={require('../../static/img/big-love.png')}></Image>
          </View>
        </View>
        <View className="i-ul">
          <View className="i-li bgc1" onClick={this.handleRouter.bind(this, 1)}>
            <Icon className="ic-photo" style={'background: url(' + require('../../static/img/xc.png') + ') center center no-repeat;background-size: 100%;'}></Icon>
            <Text className="center-text">回忆录</Text>
          </View>
          <View className="i-li bgc2" onClick={this.handleRouter.bind(this, 2)}>
            <Icon className="ic-list12" style={'background: url(' + require('../../static/img/ywd1.png') + ') center center no-repeat;background-size: 100%;'}></Icon>
            <Text className="center-text">愿望单</Text>
          </View>
          <View className="i-li bgc3" onClick={this.handleRouter.bind(this, 3)}>
            <Icon className="ic-day12" style={'background: url(' + require('../../static/img/jnr.png') + ') center center no-repeat;background-size: 100%;'}></Icon>
            <Text className="center-text">纪念日</Text>
          </View>
        </View>

        {/* 背景 */}
        <Image className="bg" src={getData("bgcData") ? URL + getData("bgcData")[0].src : URL + '/love/bgc/bgc4.jpg'}></Image>
        {/* <Image className="bg" src={URL+'/'+'love/bgc/bgc4.jpg'}></Image> */}
      </View>
    )
  }
}