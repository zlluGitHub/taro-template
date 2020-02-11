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
        <View className='harder'>
          <View className='top'>
            <View className='lf'>
              <Image className="img" src={require('../../static/img/bgc.jpg')}></Image>
              <Text className='name'>阿斯达</Text>
            </View>
            <View className='mi'>
              <Icon className='icon'></Icon>
              <View className='wb'>
                相爱<Text className='text'>200</Text>天
              </View>
            </View>
            <View className='rt'>
              <Image className="img" src={require('../../static/img/bgc.jpg')}></Image>
              <Text className='name'>阿飞</Text>
            </View>
          </View>
          {/* <View className='bottom'>
            <View className='lf'>
              <Image className="img" src={require('../../static/img/bgc.jpg')}></Image>
              <Text>0 条</Text>
            </View>
            <View className='rt'>
              <Image className="img" src={require('../../static/img/bgc.jpg')}></Image>
              <Text>0 张</Text>
            </View>
          </View> */}
        </View>
        <View className='footer'>
          <View className='item'>
            <View className='lf'>
              <Image className="img" src={require('../../static/img/love7.png')}></Image>
              <Text className='name'>修改自己昵称</Text>
            </View>
            <Icon className='rt'></Icon>
          </View>
        
          <View className='item'>
            <View className='lf'>
              <Image className="img" src={require('../../static/img/love7.png')}></Image>
              <Text className='name'>修改对方昵称</Text>
            </View>
            <Icon className='rt'></Icon>
          </View>
          <View className='item'>
            <View className='lf'>
              <Image className="img" src={require('../../static/img/love7.png')}></Image>
              <Text className='name'>更换背景主题</Text>
            </View>
            <Icon className='rt'></Icon>
          </View>
        </View>

        {/* 背景 */}
        <Image className="bg" src={require('../../static/img/bgc.jpg')}></Image>
      </View >
    )
  }
}