import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Icon, Picker, Button } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'
import './index.scss'
// import  Default from '../default'
export default class Index extends Component {
  /************数据初始化***************/
  constructor(props) {
    super(props);
    this.state = {
      value1: '',
      dateSel: '2018-04-22',
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
  onChange = e => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    })
  }
  onTimeChange = e => {
    this.setState({
      timeSel: e.detail.value
    })
  }
  onDateChange = e => {
    this.setState({
      dateSel: e.detail.value
    })
  }
  handleChange(value) {
    this.setState({
      value
    })
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return value
  }
  /************视图部分***************/
  render() {
    return (
      <View className='index'>
        <View className='warp'>
          <View className='item'>
            <Icon className='icon1'></Icon>
            <AtInput
              border={false}
              name='value1'
              type='text'
              placeholder='标题'
              value={this.state.value1}
              onChange={this.handleChange.bind(this)}
            />
          </View>
          <View className='item'>
            <Icon className='icon2'></Icon>
            <Picker className='picker' mode='date' onChange={this.onDateChange}>
              {this.state.dateSel}
            </Picker>
          </View>
          <View className='button'>
            <Button className='bt-1'>关闭</Button>
            <Button className='bt-2'>确定</Button>
          </View>
        </View>

        {/* 背景 */}
        <Image className="bg" src={require('../../static/img/bgc.jpg')}></Image>
      </View>
    )
  }
}