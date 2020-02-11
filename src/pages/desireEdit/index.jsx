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
        <View className='title'>
          <Text>比翼之约</Text>
        </View>
        <View className='content'>
          <View className='item'>
            <Text className='text'>撒的发生的结案数导出方式</Text>
          </View>
          <View className='item'>
            <Text className='text'>阿斯达</Text>
          </View>
          <View className='item'>
            <Text className='text'>撒撒而非色股份</Text>
          </View>
          <View className='item'>
            <Text className='text'>AS从大三</Text>
          </View>
          <View className='item'>
            <Text className='text'>aS擦十多万</Text>
          </View>
          <View className='item'>
            <Text className='text'>阿萨德多v</Text>
          </View>
          <View className='item'>
            <Text className='text'>撒大大</Text>
          </View>
          <View className='item'>
            <Text className='text'>威风威风</Text>
          </View>
          <View className='item'>
            <Text className='text'>速度史蒂夫we</Text>
          </View>
          <View className='item'>
            <Text className='text'>撒的发生的结案数导出方式</Text>
          </View>
        </View>
        {/* 背景 */}
        <Image className="bg" src={require('../../static/img/bgc.jpg')}></Image>
      </View>
    )
  }
}