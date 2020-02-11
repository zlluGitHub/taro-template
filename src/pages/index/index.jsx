import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Icon } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'
// import  Default from '../default'
export default class Index extends Component {
  /************数据初始化***************/
  constructor(props) {
    super(props);
    this.state = {
      name: '0'
    };
  }
  data = {
    sex: '123'
  }

  /************页面配置部分***************/
  config = {
    navigationBarTitleText: '爱的小窝'
  }

  /************生命周期函数部分***************/
  componentWillMount() {
    console.log('componentWillMount');
    // this.setState({ name: 'asda' })
  }

  componentDidMount() {


    console.log('componentDidMount');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  componentDidShow() {
    console.log('componentDidShow');
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
    console.log('render');
    return (
      <View className='index'>
        <View className='top'>
          <View className="touxiang">
            <Image className="img" src={require('../../static/img/nan.jpg')}></Image>
            <Image className="img-love" src={require('../../static/img/love.png')}></Image>
            <Image className="img" src={require('../../static/img/nv.jpg')}></Image>
          </View>
          <View className="i-title">
            <View className="title-top">世不遇你，生无可喜</View>
            <View className="title-bottom">我们相爱<Text className="i-day">200</Text>天啦！</View>
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
            <Icon className="ic-photo"></Icon>
            <Text className="center-text">回忆录</Text>
          </View>
          <View className="i-li bgc2" onClick={this.handleRouter.bind(this, 2)}>
            <Icon className="ic-list"></Icon>
            <Text className="center-text">愿望单</Text>
          </View>
          <View className="i-li bgc3" onClick={this.handleRouter.bind(this, 3)}>
            <Icon className="ic-day"></Icon>
            <Text className="center-text">纪念日</Text>
          </View>

        </View>
        {/* 回忆册  愿望录 纪念日
 动态 
   足迹*/}
        {/* 背景 */}
        <Image className="bg" src={require('../../static/img/bgc.jpg')}></Image>
      </View>
    )
  }
}