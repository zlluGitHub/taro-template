import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button, Icon } from '@tarojs/components'
import { AtInput, AtNavBar, AtTextarea, AtMessage } from 'taro-ui'
import { post ,URL} from '../../service/api'
import { getData, setData } from '../../utils/store'
import './index.scss'
// import  Default from '../default'
export default class Index extends Component {
  /************数据初始化***************/
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: ''
    }
  }
  /************页面配置部分***************/
  config = {
    navigationBarTitleText: '新建相册'
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
    this.setState({})
    Taro.navigateTo({
      url: '/pages/phono/index'
    })
  }

  /************自定义状态函数部分 ***************/

  //相册标题
  titleChange(event) {
    console.log(event);
    this.setState({
      title: event
    })
  }
  // 相册描述
  contentChange(event) {
    console.log(event.target.value);
    this.setState({
      content: event.target.value
    })
  }
  //上传数据
  uploadData() {
    let user = getData('user')
    if (!this.state.title) {
      Taro.atMessage({
        message: '请输入相册名称！',
        type: 'error',
      })
    } else if (!this.state.content) {
      Taro.atMessage({
        message: '请输入相册描述！',
        type: 'error',
      })
    } else {
      let data = {
        title: this.state.title,
        content: this.state.content,
        author: user.name,
        loveCode: getData('user').login.loveCode,
        url: user.url
      }
      post('/zll/love/photo/add', data).then((e) => {
        if (e.data.result) {
          setData('bid', e.data.bid)
          // 跳转到目的页面，打开新页面
          Taro.navigateTo({
            url: `/pages/photo/index`
          })
        } else {
          Taro.atMessage({
            message: '创建失败！',
            type: 'error',
          })
        }
      }).catch((e) => {
        console.log(e);
      })
    }
  }
  beforePage() {
    Taro.navigateBack({
      delta: 1 // 返回上一级页面。
    });
  }
  /************视图部分***************/
  render() {
    let navBar = null
    if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
      navBar = <AtNavBar
        onClickRgIconSt={this.beforePage.bind(this)}
        onClickRgIconNd={this.beforePage.bind(this)}
        onClickLeftIcon={this.beforePage.bind(this)}
        color='#000'
        leftText='返回'
        leftIconType='chevron-left'
      >
        <View>新建相册</View>
      </AtNavBar>
    }
    return (
      <View className='index'>
        {navBar}
        <View className='warp3'>
          <View className='name border'>
            <AtInput
              type='text'
              border={false}
              placeholder='相册名称...'
              value={this.state.title}
              onChange={this.titleChange.bind(this)}
            />
          </View>
          <View className='content'>
            {/* <Text className='label'>
              描述：
            </Text> */}
            <View className='border'>
              <AtTextarea
                value={this.state.content}
                border={false}
                onChange={this.contentChange.bind(this)}
                maxLength={200}
                placeholder='相册描述...'
              />
            </View>
          </View>

          <View className='button'>
            <Button type='primary' onClick={this.uploadData.bind(this)}>立即创建</Button>
          </View>
        </View>
        <AtMessage />
        {/* 背景 */}
        {/* <Image className="bg" src={require('../../static/img/bgc.jpg')}></Image> */}
        <Image className="bg" src={getData("bgcData") ? URL + getData("bgcData")[13].src : URL + '/love/bgc/bgc4.jpg'}></Image>
      </View>
    )
  }
}