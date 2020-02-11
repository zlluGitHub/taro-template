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
  handleRouter() {
    Taro.navigateTo({
      url: '/pages/rememberEdit/index'
    })
  }
  /************视图部分***************/
  render() {
    return (
      <View className='index'>
        <View className='warp'>
          <View className='item' onClick={this.handleRouter.bind(this)}>
            <View className='lf'>
              <Icon className='icon'>xs</Icon>
              <View className='tx'>
                <Text className='tx-1'>我的生日还有</Text>
                <Text className='tx-2'>2019年12月1日</Text>
              </View>
            </View>
            <View className='rt'>
              <Text className='tx-3'>120</Text>
              <Text className='tx-4'>天</Text>
            </View>
          </View>
          <View className='item'>
            <View className='lf'>
              <Icon className='icon'>xs</Icon>
              <View className='tx'>
                <Text className='tx-1'>我的生日还有</Text>
                <Text className='tx-2'>2019年12月1日</Text>
              </View>
            </View>
            <View className='rt'>
              <Text className='tx-3'>120</Text>
              <Text className='tx-4'>天</Text>
            </View>
          </View>
          <View className='item'>
            <View className='lf'>
              <Icon className='icon'>xs</Icon>
              <View className='tx'>
                <Text className='tx-1'>我的生日还有</Text>
                <Text className='tx-2'>2019年12月1日</Text>
              </View>
            </View>
            <View className='rt'>
              <Text className='tx-3'>120</Text>
              <Text className='tx-4'>天</Text>
            </View>
          </View>

        </View>

        {/* 背景 */}
        <Image className="bg" src={require('../../static/img/bgc.jpg')}></Image>
      </View>
    )
  }
}