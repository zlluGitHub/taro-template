import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Icon, ScrollView } from '@tarojs/components'
import { getData, setData, emit } from '../../utils/store'
import './index.scss'
import { AtModal, AtActionSheet, AtActionSheetItem } from 'taro-ui'
import { post, URL } from '../../service/api'
// import  Default from '../default'
export default class Index extends Component {
  /************数据初始化***************/
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      isBgcOpened: false,
      islogin: false
    };
  }
  /************页面配置部分***************/
  config = {
    navigationBarTitleText: '关于我们'
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
  // getData() {
  //   post('/zll/love/user/get', getData('ap')).then(e => {
  //     if (e.data.result) {
  //       let result = e.data.user
  //       result.login.url = result.login.url.indexOf('http') > -1 ? result.login.url : URL + '/' + result.login.url
  //       result.partner.url = result.partner.url.indexOf('http') > -1 ? result.partner.url : URL + '/' + result.partner.url
  //       setData('user', result)
  //     } else {
  //       Taro.atMessage({
  //         message: '数据加载失败！',
  //         type: 'error'
  //       })
  //     }
  //   }).catch(e => {
  //     console.log(e);
  //   })
  // }
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
    emit('isLogin', true);
    Taro.navigateTo({
      url: '/pages/login/index'
    })
  }

  // handleCancel() {
  //   this.setState({ isBgcOpened: false })
  // }
  handleClick(type) {
    Taro.navigateTo({
      url: '/pages/aboutBgcList/index'
    })
  }
  /************视图部分***************/
  render() {
    let { login, partner, startTime } = this.state.data ? this.state.data : getData('user');
    let time = Date.parse(new Date());
    let lasttime = Date.parse(startTime);
    let day = parseInt((time - lasttime) / (1000 * 60 * 60 * 24));

    const scrollStyle = {
      height: getData('winHeight') * 1 - 55 + 'px'
    }
    return (
      <View className='index3'>
        <ScrollView
          className='scrollview'
          scrollY
          scrollWithAnimation
          scrollTop={0}
          style={scrollStyle}
          lowerThreshold={20}
          upperThreshold={20}
        >
          <View className='box'>
            <View className='harder'>
              <View className='top'>
                <View className='lf'>
                  <Image className="img b1" src={login.url} onClick={this.handleRouter.bind(this, login.bid)}></Image>
                  <Text className='name'>{login.name}</Text>
                </View>
                <View className='mi'>
                  <Icon className='icon'></Icon>
                </View>
                <View className='rt'>
                  <Image className="img b2" src={partner.url} onClick={this.handleRouter.bind(this, partner.bid)}></Image>
                  <Text className='name'>{partner.name}</Text>
                </View>
              </View>
              <View className='bottom'>
                我们相恋<Text className='name'>{day}</Text>天
           </View>
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
              <View className='item' onClick={this.handleConfirm.bind(this)}>
                <View className='lf'>
                  <Image className="img" src={require('../../static/img/love7.png')} ></Image>
                  <Text className='name'>情侣密码</Text>
                </View>
                <View className='text'>
                  <Icon className='rt'></Icon>
                </View>
              </View>
              <View className='item' onClick={this.handleClick.bind(this, 'bgc')}>
                <View className='lf'>
                  <Image className="img" src={require('../../static/img/love7.png')}></Image>
                  <Text className='name'>更换背景主题</Text>
                </View>
                <Icon className='rt'></Icon>
              </View>
              <View className='item no' onClick={this.handleOpenLogin.bind(this)}>
                <View className='lf'>
                  <Image className="img" src={require('../../static/img/love7.png')}></Image>
                  <Text className='name'>登录操作</Text>
                </View>
                <Icon className='rt'></Icon>
              </View>
            </View>
          </View>
        </ScrollView>
        <AtModal
          isOpened={this.state.isOpened}
          title='情侣密码'
          cancelText='取消'
          confirmText='确认'
          onClose={this.handleClose.bind(this)}
          onCancel={this.handleClose.bind(this)}
          onConfirm={this.handleConfirm.bind(this)}
          content={login.loveCode}
        />

        {/* 动作面板 */}
        <AtActionSheet isOpened={this.state.islogin} cancelText='关闭' onCancel={this.handleClose.bind(this)} onClose={this.handleClose.bind(this)}>
          <AtActionSheetItem onClick={this.handleLogin.bind(this)}>
            退出登录
          </AtActionSheetItem>
        </AtActionSheet>

        {/* 背景 动作面板 */}
        {/* <AtActionSheet isOpened={this.state.isBgcOpened} cancelText='关闭' onCancel={this.handleCancel.bind(this)} onClose={this.handleCancel.bind(this)}>
          <AtActionSheetItem onClick={this.handleClick.bind(this, 'fd')}>
            查看大图
          </AtActionSheetItem>
          <AtActionSheetItem onClick={this.handleClick.bind(this, 'album')}>
            从相册选择
          </AtActionSheetItem>
          <AtActionSheetItem onClick={this.handleClick.bind(this, 'camera')}>
            拍照上传
          </AtActionSheetItem>
        </AtActionSheet> */}

        {/* 背景 */}
        <Image className="bg" src={getData("bgcData") ? URL + getData("bgcData")[10].src : URL + '/love/bgc/bgc6.jpg'}></Image>
        {/* <Image className="bg" src={URL + '/' + 'love/bgc/bgc6.jpg'}></Image> */}
      </View >
    )
  }
}