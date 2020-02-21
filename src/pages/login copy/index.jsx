import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Icon } from '@tarojs/components'
import { getData, setData, emit } from '../../utils/store'
import { get, post, URL } from '../../service/api'
import './index.scss'
import { AtInput, AtButton, AtMessage } from 'taro-ui'
// import  Default from '../default'
export default class LoginPage extends Component {
  /************数据初始化***************/
  constructor(props) {
    super(props);
    this.state = {
      password: "5201314",
      author: "宝贝",
      loading: false
    };
  }
  /************页面配置部分***************/
  // config = {
  //   navigationBarTitleText: '登录'
  // }

  /************生命周期函数部分***************/
  componentWillMount() {
  
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

  handleAuthor(value) {
    this.setState({ author: value })
    return value
  }
  handlePassword(value) {
    this.setState({ password: value })
    return value
  }

  handLogin() {
    this.setState({ loading: true })
    // 获取用户登录信息
    let data = {
      password: this.state.password,
      author: this.state.author,
      title: "我们在一起已经",
    }
    setData('ap', data)
    post('/zll/love/user/get', data).then(e => {
      if (e.data.result) {
        get('/zll/love/bgc/get', { loveCode: '5201314' }).then(e => {
          if (e.data.result) {
            setData("bgcData", e.data.list)
          } else {
            Taro.atMessage({
              message: '背景加载失败！',
              type: 'error'
            })
          }
        }).catch(e => {
          console.log(e);
        });
        let result = e.data.user
        result.login.url = result.login.url.indexOf('http') > -1 ? result.login.url : URL + '/' + result.login.url
        result.partner.url = result.partner.url.indexOf('http') > -1 ? result.partner.url : URL + '/' + result.partner.url
        setData('user', result)
        setData('isLogin', 'yes')
        this.setState({ loading: false })
        emit('isLogin', false);
        Taro.navigateTo({
          url: '/pages/home/index'
        })
      } else {
        Taro.atMessage({
          message: '账号或密码错误，请重新输入！',
          type: 'error'
        })

        this.setState({ loading: false })
      }
    }).catch(e => {
      console.log(e);
    })
  }
  /************视图部分***************/
  render() {
    const heightStyle = {
      height: getData('winHeight') + 'px'
    }
    return (
      <View className='indexl' style={heightStyle}>
        <View className='login'>
          <AtInput
            name='input1'
            border={false}
            title='账号：'
            type='text'
            placeholder='请输入账号...'
            value={this.state.author}
            onChange={this.handleAuthor.bind(this)}
          />
          <AtInput
            name='input2'
            border={false}
            title='密码：'
            type='password'
            placeholder='请输入密码...'
            value={this.state.password}
            onChange={this.handlePassword.bind(this)}
          />
          <AtButton type='secondary' size='small' loading={this.state.loading} onClick={this.handLogin.bind(this)}>立即登录</AtButton>
        </View>
        <AtMessage />
        {/* 背景 */}
        <Image className="bg" src={ URL + '/love/bgc/bgc13.jpg'} style={heightStyle}></Image>
        {/* <Image className="bg" src={getData("bgcData") ? URL + getData("bgcData")[14].src : URL + '/love/bgc/bgc13.jpg'}  style={heightStyle}></Image> */}
      </View>
    )
  }
}