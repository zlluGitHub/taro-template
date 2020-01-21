import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

import  Default from '../default'
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
    console.log('render');
    return (
      <View className='index'>
        <Text>zll</Text>
        <Default renderHeader={<View className='welcome-message'>Welcome!</View>}></Default>
      </View>
    )
  }
}