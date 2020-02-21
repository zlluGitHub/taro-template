import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Icon } from '@tarojs/components'
import { getData, setData, emit } from '../../utils/store'
import { get, post, URL } from '../../service/api'
import './index.scss'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction, AtInput, AtButton, AtMessage } from 'taro-ui'
// import  Default from '../default'
export default class LoginPage extends Component {
  /************数据初始化***************/
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      author: "宝贝",
      loading: false,
      isYaoQing: false
    };
  }
  /************页面配置部分***************/
  config = {
    navigationBarTitleText: '登录'
  }

  /************生命周期函数部分***************/
  componentWillMount() {
    Taro.showShareMenu({
      withShareTicket: true
    })
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  componentDidShow() {
    this.setState({ data: getData('user') })
  }

  componentDidHide() {
    console.log('componentDidHide');
  }

  /************自定义状态函数部分 ***************/

  // handleAuthor(value) {
  //   this.setState({ author: value })
  //   return value
  // }
  handlePassword(value) {
    this.setState({ password: value })
    return value
  }

  getLoading() {
    if (this.state.password) {

      this.setState({ loading: true })
      let _this = this
      // 授权获取当前用户唯一id
      Taro.login().then(response => {
        post('/zll/love/login', { code: response.code }).then(e => {
          if (e.data.result) {
            // console.log(e.data.massge);
            //  let info =  e.data.massge.openid
            //  let info =  e.data.massge.session_key
            setData('info', e.data.massge)
            // 获取信息
            _this.handLogin()
          } else {
            Taro.showToast({
              title: '发生错误，请重试!',
              icon: 'none'
            })
          }
        }).catch(e => {
          console.log(e);
          Taro.showToast({
            title: '发生错误，请重试!',
            icon: 'none'
          })
        })
      }).catch(err => {
        console.log(err);
        Taro.showToast({
          title: '发生错误，请重试!',
          icon: 'none'
        })
      })

    } else {
      Taro.atMessage({
        message: '请输入情侣密码！',
        type: 'error'
      })
    }
  }

  handLogin() {
    // this.setState({ loading: true })
    let _this = this
    //获取用户信息
    Taro.getUserInfo({
      success: function (res) {
        let userInfo = res.userInfo;
        // 获取用户登录信息
        let data = {
          bid: getData('info').openid,
          // password: this.state.password,
          // author: this.state.author,
          loveCode: _this.state.password,
          reId: "1e20ba2fc76e370008136da1b6a2ff",
          userInfo: JSON.stringify(userInfo),
        }
        // setData('ap', data)
        post('/zll/love/user/get', data).then(e => {
          if (e.data.result) {
            let result = e.data.user
            if (!result.partner) {
              Taro.atMessage({
                message: '情侣密码已生成！'
              })
              _this.setState({ loading: false, isYaoQing: true })
            } else {
              result.login.url = result.login.url.indexOf('http') > -1 ? result.login.url : URL + '/' + result.login.url
              result.partner.url = result.partner.url.indexOf('http') > -1 ? result.partner.url : URL + '/' + result.partner.url
              setData("bgcData", e.data.bgc)
              setData('user', result)
              setData('isLogin', 'yes')
              _this.setState({ loading: false, isYaoQing: false })
              emit('isLogin', false);
              Taro.reLaunch({
                url: '/pages/home/index'
              })
            }
          } else {
            Taro.atMessage({
              message: '账号或密码错误，请重新输入！',
              type: 'error'
            })
            _this.setState({ loading: false, isYaoQing: false })
          }
        }).catch(e => {
          console.log(e);
        })
      }
    })
  }
  handleCancel() {
    this.setState({ isYaoQing: false, password: '' })
  }
  // handleConfirm(e) {
  // }
  /************视图部分***************/
  render() {
    const heightStyle = {
      height: getData('winHeight') + 'px'
    }
    return (
      <View className='indexl' style={heightStyle}>
        {
          this.state.isYaoQing ?
            <AtModal isOpened={true} onClose={this.handleCancel.bind(this)}>
              <AtModalHeader>情侣密码</AtModalHeader>
              <AtModalContent>
                <Text className='text'>
                  {this.state.password}
                </Text>
              </AtModalContent>
              <AtModalAction>
                <Button onClick={this.handleCancel.bind(this)}>取消</Button>
                <Button open-type="share">邀请</Button>
              </AtModalAction>
            </AtModal>
            :
            <View className='login'>
              <Text className='text'>情侣密码</Text>
              <AtInput
                name='input2'
                className='center'
                border={false}
                type='text'
                placeholder='请输入情侣密码...'
                value={this.state.password}
                onChange={this.handlePassword.bind(this)}
              />
              <AtButton type='secondary' size='small' loading={this.state.loading} onClick={this.getLoading.bind(this)}>立即进入</AtButton>
            </View>
        }
        <AtMessage />
        {/* 背景 */}
        <Image className="bg" src={URL + '/love/bgc/bgc20.jpg'} style={heightStyle}></Image>
        {/* <Image className="bg" src={getData("bgcData") ? URL + getData("bgcData")[14].src : URL + '/love/bgc/bgc13.jpg'}  style={heightStyle}></Image> */}
      </View>
    )
  }
}