import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Icon, Button, Picker } from '@tarojs/components'
import './index.scss'
import { AtSwitch, AtTextarea } from 'taro-ui'
// import  Default from '../default'
export default class Index extends Component {
  /************数据初始化***************/
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      timeSel: '12:01',
      dateSel: '2018-04-22'
    }
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
  handleChange(event) {
    this.setState({
      value: event.target.value
    })
  }
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
  /************视图部分***************/
  render() {
    return (
      <View className='index'>
        <View className='warp'>
          <View className='top'>
            <View className='time'>
              2012年12月12日
            </View>
            <Image className='img' src={require('../../static/img/nan.jpg')}></Image>
            <View className='title'>
              会议撒旦所
            </View>
            <View className='title'>
              下午 6:30
            </View>
          </View>
          <View className='content'>
            <View className='tip'>
              内容
            </View>
            <View className='sfm'>
              <AtTextarea
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
                maxLength={200}
                placeholder='你的问题是...'
              />
            </View>
            <View className='an-box'>
              <View className='left'>
                <Icon>as</Icon>
                <Text>提醒</Text>
              </View>
              <View className='sfm'>
                <Picker mode='time' onChange={this.onTimeChange}>
                  <View className='picker'>
                   下午： {this.state.timeSel}
                  </View>
                </Picker>
                <Icon>></Icon>
              </View>
            </View>
            <View className='an-box'>
              <View className='left'>
                <Icon>as</Icon>
                <Text>重复</Text>
              </View>
              <View className='border'>
                <AtSwitch border={false} checked={this.state.value} onChange={this.handleChange} />
              </View>
            </View>
          </View>
          <View className='button'>
            <Button className='bt-1'>忽略</Button>
            <Button className='bt-2'>完成</Button>
          </View>
        </View>
        {/* 背景 */}
        <Image className="bg" src={require('../../static/img/bgc.jpg')}></Image>
      </View>
    )
  }
}