import Taro, { Component } from '@tarojs/taro'
import { View,Image, Text, Button, Icon } from '@tarojs/components'
import { AtInput, AtNavBar, AtTextarea, AtMessage, AtToast } from 'taro-ui'
import { post, get, URL } from '../../service/api'
import { getData, setData } from '../../utils/store'
import './index.scss'
// import  Default from '../default'
export default class Index extends Component {
  /************数据初始化***************/
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      isTop: false
    }
  }
  /************页面配置部分***************/
  config = {
    navigationBarTitleText: '新建蜜语'
  }

  /************生命周期函数部分***************/
  componentWillMount() {
    console.log('componentWillMount');
    // this.setState({ name: 'asda' })
  }

  componentDidMount() {
    if (getData('bid')) {
      this.setState({ isTop: true })
      get('/zll/love/trend/get', { id: getData('bid'), loveCode: getData('user').login.loveCode }).then(e => {
        if (e.data.result) {
          let data = e.data.list[0]
          this.setState({ content: data.content, isTop: false })
        } else {
          Taro.atMessage({
            message: '数据加载失败！',
            type: 'error',
          })
        }
      }).catch((e) => {
        console.log(e);
      })
    }
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  componentDidShow() {
    console.log('componentDidShow');
  }

  componentDidHide() {
    this.setState({})
  }

  /************自定义状态函数部分 ***************/

  // //相册标题
  // titleChange(event) {
  //   console.log(event);
  //   this.setState({
  //     title: event
  //   })
  // }
  //内容
  contentChange(event) {
    this.setState({
      content: event.target.value
    })
  }
  //上传数据
  uploadData() {
    this.setState({
      isTop: true,
      text: '正在上传...'
    })
    let user = getData('user')
    if (!this.state.content) {
      Taro.atMessage({
        message: '请输入内容！',
        type: 'error',
      })
    } else {
      let data = {
        content: this.state.content
      }
      if (getData('bid')) {
        data.bid = getData('bid')
        post('/zll/love/trend/update', data).then(e => {
          if (e.data.result) {
            this.setState({ isTop: false })
            // 跳转到目的页面，打开新页面
            Taro.navigateTo({
              url: `/pages/trend/index`
            })
          } else {
            Taro.atMessage({
              message: '发布失败！',
              type: 'error',
            })
          }
        }).catch(e => {
          console.log(e);
        })
      } else {
        data.author = getData('user').login.author
        data.url = getData('user').login.url
        data.loveCode = getData('user').login.loveCode
        post('/zll/love/trend/add', data).then(e => {
          if (e.data.result) {
            this.setState({ isTop: false })
            // 跳转到目的页面，打开新页面
            Taro.navigateTo({
              url: `/pages/trend/index`
            })
          } else {
            Taro.atMessage({
              message: '发布失败！',
              type: 'error',
            })
          }
        }).catch(e => {
          console.log(e);
        })
      }




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
        <View>编辑动态</View>
      </AtNavBar>
    }
    return (
      <View className='index'>
        {navBar}
        <View className='warp3'>
          {/* <View className='name border'>
            <AtInput
              type='text'
              border={false}
              placeholder='相册名称...'
              value={this.state.title}
              onChange={this.titleChange.bind(this)}
            />
          </View> */}
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
                placeholder='请输入内容...'
              />
            </View>
          </View>

          <View className='button'>
            <Button type='primary' onClick={this.uploadData.bind(this)}>立即发布</Button>
          </View>
        </View>
        <AtMessage />
        {/* 提示按钮 */}
        <AtToast isOpened={this.state.isTop} text={this.state.text} status={this.state.status} icon={this.state.icon} duration={0}></AtToast>
        {/* 背景 */}
        <Image className="bg" src={getData("bgcData") ? URL + getData("bgcData")[9].src : URL + '/love/bgc/bgc2.jpg'}></Image>
        {/* <Image className="bg" src={URL + '/' + 'love/bgc/bgc6.jpg'}></Image> */}
      </View>
    )
  }
}