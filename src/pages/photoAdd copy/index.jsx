import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, Icon } from '@tarojs/components'
import { AtInput, AtButton, AtTextarea } from 'taro-ui'
import './index.scss'
// import  Default from '../default'
export default class Index extends Component {
  /************数据初始化***************/
  constructor(props) {
    super(props);
    this.state = {
      value: '',
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
  handleChange(event) {
    this.setState({
      value: event.target.value
    })
  }
  /************视图部分***************/
  render() {
    let imgArr = this.state.files;
    return (
      <View className='index'>
        <View className='warp'>
          <View className='item'>
            <Text className='label'>
              名称：
            </Text>
            <View className='content border'>
              <AtInput
                name='value'
                type='text'
                border={false}
                placeholder='相册名称...'
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
              />
            </View>
          </View>
          <View className='item'>
            <Text className='label'>
              描述：
            </Text>
            <View className='content border'>
              <AtTextarea
                value={this.state.value}
                border={false}
                onChange={this.handleChange.bind(this)}
                maxLength={200}
                placeholder='相册描述...'
              />
            </View>
          </View>

          <View className='button'>
            <Button type='primary'>立即创建</Button>
          </View>
        </View>

        {/* 背景 */}
        {/* <Image className="bg" src={require('../../static/img/bgc.jpg')}></Image> */}
      </View>
    )
  }
}