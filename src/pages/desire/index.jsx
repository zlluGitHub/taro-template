import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Icon } from '@tarojs/components'
import { AtImagePicker, AtButton } from 'taro-ui'
import './index.scss'
// import  Default from '../default'
export default class Index extends Component {
  /************数据初始化***************/
  constructor(props) {
    super(props);
    this.state = {
      files: [{
        url: 'http://zhenglinglu.cn/_nuxt/img/ff5a451.jpg',
      },
      {
        url: 'http://zhenglinglu.cn/_nuxt/img/ff5a451.jpg',
      },
      {
        url: 'http://zhenglinglu.cn/_nuxt/img/ff5a451.jpg',
      }]
    }
  }
  /************页面配置部分***************/
  // config = {
  //   navigationBarTitleText: '首页'
  // }

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
  onChange(files) {
    this.setState({
      files
    })
  }
  onFail(mes) {
    console.log(mes)
  }
  onImageClick(index, file) {
    console.log(index, file)
  }
  handleRouter(key, e) {
    switch (key) {
      case 1:
        Taro.navigateTo({
          url: '/pages/wishList/index'
        })
        break;
      case 2:
        Taro.navigateTo({
          url: '/pages/desireList/index'
        })
        break;
      default:
        console.log(key);
        break;
    }
  }
  /************视图部分***************/
  render() {
    return (
      <View className='index'>
        <View className='warp'>
        <View className='item bgc1' onClick={this.handleRouter.bind(this, 1)}>
            <View className='it-left'>
                <Text className='title'>在一起要做的100件事</Text>
                <Text className='miao-shu'>故事有流年，我们的未来还长远</Text>
            </View>
            <Icon className='it-right ri-img1'></Icon>
          </View>
          <View className='item bgc2' onClick={this.handleRouter.bind(this, 2)}>
            <View className='it-left'>
                <Text className='title'>工作待办事件</Text>
                <Text className='miao-shu'>待办事件相关描述</Text>
            </View>
            <Icon className='it-right ri-img2'></Icon>
          </View>
          <View className='item'>
            <View className='it-left'>
                <Text className='title'>生活待办事件</Text>
                <Text className='miao-shu'>待办事件相关描述</Text>
            </View>
            <View className='it-right'>
              图片
            </View>
          </View>
          
        </View>
      </View>
    )
  }
}