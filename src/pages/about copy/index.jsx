import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Icon, Button } from '@tarojs/components'
import { getData, setData } from '../../utils/store'
import './index.scss'
import { AtModal, AtActionSheet, AtActionSheetItem } from 'taro-ui'
import { post ,URL} from '../../service/api'
// import  Default from '../default'
export default class Index extends Component {
  /************数据初始化***************/
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      islogin: false
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
    console.log('componentWillUnmount1111111');
  }

  componentDidShow() {
    this.setState({ data: getData('user') })
  }

  componentDidHide() {
    console.log('componentDidHide');
  }

  /************自定义状态函数部分 ***************/
  handleRouter(bid) {
    setData('bid', bid)
    Taro.navigateTo({
      url: '/pages/aboutList/index'
    })
  }
  handleClose() {
    this.setState({ isOpened: false, islogin: false })
  }
  handleConfirm() {
    this.setState({ isOpened: true, islogin: false })
  }
  handleOpenLogin() {
    this.setState({ isOpened: false, islogin: true })
  }
  handleLogin() {
    this.setState({ islogin: false })
  }
  /************视图部分***************/
  render() {
    let { login, partner, startTime } = this.state.data ? this.state.data : getData('user');
    let time = Date.parse(new Date());
    let lasttime = Date.parse(startTime);
    let day = parseInt((time - lasttime) / (1000 * 60 * 60 * 24));
    return (
      <View className='index3'>
        <View className='harder'>
          <View className='top'>
            <View className='lf'>
              <Image className="img b1" src={login.url} onClick={this.handleRouter.bind(this, login.bid)}></Image>
              <Text className='name'>{login.name}</Text>
            </View>
            <View className='mi'>
              <Icon className='icon'></Icon>
              <View className='wb'>
                相爱<Text className='text'>{day}</Text>天
              </View>
            </View>
            <View className='rt'>
              <Image className="img b2" src={partner.url} onClick={this.handleRouter.bind(this, partner.bid)}></Image>
              <Text className='name'>{partner.name}</Text>
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
          <View className='item' onClick={this.handleRouter.bind(this, login.bid)}>
            <View className='lf'>
              <Image className="img" src={require('../../static/img/love7.png')}></Image>
              <Text className='name'>修改{login.name}资料</Text>
            </View>
            <Icon className='rt'></Icon>
          </View>

          <View className='item' onClick={this.handleRouter.bind(this, partner.bid)}>
            <View className='lf'>
              <Image className="img" src={require('../../static/img/love7.png')}></Image>
              <Text className='name'>修改{partner.name}资料</Text>
            </View>
            <Icon className='rt'></Icon>
          </View>
          <View className='item no' onClick={this.handleConfirm.bind(this)}>
            <View className='lf'>
              <Image className="img" src={require('../../static/img/love7.png')} ></Image>
              <Text className='name'>情侣密码</Text>
            </View>
            <View className='text'>
              <Text className='name'>{login.loveCode}</Text>
              <Icon className='rt'></Icon>
            </View>

          </View>
          <View className='item no' onClick={this.handleOpenLogin.bind(this)}>
            <View className='lf'>
              <Image className="img" src={require('../../static/img/love7.png')}></Image>
              <Text className='name'>登录操作</Text>
            </View>
            <Icon className='rt'></Icon>
          </View>
          {/* <View className='item'>
            <View className='lf'>
              <Image className="img" src={require('../../static/img/love7.png')}></Image>
              <Text className='name'>更换背景主题</Text>
            </View>
            <Icon className='rt'></Icon>
          </View> */}
        </View>
        {/* <View className='button'>
            <Button type='primary' onClick={this.handleClick.bind(this)}>退出登录</Button>
          </View> */}

        <AtModal
          isOpened={this.state.isOpened}
          title='情侣密码'
          cancelText='取消'
          confirmText='确认'
          onClose={this.handleClose.bind(this)}
          onCancel={this.handleClose.bind(this)}
          onConfirm={this.handleConfirm.bind(this)}
          content={'您的情侣密码为：' + login.loveCode}
        />

        {/* 动作面板 */}
        <AtActionSheet isOpened={this.state.islogin} cancelText='关闭' onCancel={this.handleClose.bind(this)} onClose={this.handleClose.bind(this)}>
          <AtActionSheetItem onClick={this.handleLogin.bind(this)}>
            退出登录
          </AtActionSheetItem>
        </AtActionSheet>
        {/* 背景 */}
        <Image className="bg" src={URL + '/' + 'love/bgc/bgc6.jpg'}></Image>
      </View >
    )
  }
}