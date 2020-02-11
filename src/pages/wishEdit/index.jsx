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

  /************页面配置部分***************/
  config = {
    navigationBarTitleText: '首页'
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
  onhandle = () => {
    // this.props.onChange()
  }

  /************视图部分***************/
  render() {
    return (
      <View className='index'>
        <View className='warp'>
          <View className='content'>
            <View className='img-box'>
              <Image className='img' src={require('../../static/img/nan.jpg')}></Image>
              <View className='title'>
                白嗷嗷深V打算
              </View>
              <View className='time'>
                *2019.12.23*
              </View>
            </View>
          </View>


        </View>
        {/* 背景 */}
        <Image className="bg" src={require('../../static/img/bgc.jpg')}></Image>
      </View>
    )
  }
}