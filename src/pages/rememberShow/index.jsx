import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Icon, Button } from '@tarojs/components'
import { AtImagePicker, AtNavBar } from 'taro-ui'
import { getData, setData } from '../../utils/store'
import { get, URL } from '../../service/api'
import './index.scss'
// import  Default from '../default'
export default class Index extends Component {
  /************数据初始化***************/
  constructor(props) {
    super(props);
    this.state = {}
  }
  /************页面配置部分***************/
  config = {
    navigationBarTitleText: '纪念日详情'
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
  handleRouter(bid) {
    setData('bid', bid)
    Taro.navigateTo({
      url: '/pages/aboutList/index'
    })
  }
  beforePage() {
    Taro.navigateBack({
      delta: 1 // 返回上一级页面。
    });
  }
  /************视图部分***************/
  render() {
    let { login, partner } = this.state.data ? this.state.data : getData('user');

    const scrollStyle = {
      height: getData('winHeight') * 1 - 80 + 'px'
    }

    let navBar = null
    if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
      navBar = <AtNavBar
        onClickRgIconSt={this.beforePage.bind(this)}
        onClickRgIconNd={this.beforePage.bind(this)}
        onClickLeftIcon={this.beforePage.bind(this)}
        color='#000'
        className='at-nav-s-bar'
        leftText='返回'
        leftIconType='chevron-left'
      >
      </AtNavBar>
    }
    return (
      <View>
        {navBar}
        <View className='mainw' style={scrollStyle}>
          <View className='warp'>
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
              <View className='text1'>
                {getData('remData') ? getData('remData').title : ''}
              </View>
              <View className='text2'>
                <Text className='name'>{getData('remData') ? getData('remData').day : 0}</Text>天
              </View>
              <View className="footer">
                {/* 起始日期 2019.7.14 周三 */}
                起始日期{getData('remData') ? getData('remData').startTime : '0000年00月00日'}
         </View>
            </View>
          </View>
          {
            Taro.getEnv() !== Taro.ENV_TYPE.WEB ? <Button open-type='share' className="shall">分享</Button> : ''
          }
          {/* 背景 */}
          {/* <Image className="bg" src={require('../../static/img/bgc.jpg')}></Image> */}
          <Image className="bg" src={getData("bgcData") ? URL + getData("bgcData")[2].src : URL + '/love/bgc/bgc6.jpg'}></Image>
        </View>
      </View>

    )
  }
}