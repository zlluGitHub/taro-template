import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Icon, Picker, Button } from '@tarojs/components'
import { AtInput, AtNavBar, AtToast, AtMessage } from 'taro-ui'
import { post, get, URL } from '../../service/api'
import { getData, setData } from '../../utils/store'
import './index.scss'
// import  Default from '../default'
export default class Index extends Component {
  /************数据初始化***************/
  constructor(props) {
    super(props);
    this.state = {
      // 提示
      isTop: false,
      text: '加载中...',
      status: 'loading',
      icon: null,
      title: '',
      dateSel: ''
    }
  }
  /************页面配置部分***************/
  config = {
    navigationBarTitleText: '新建纪念日'
  }

  /************生命周期函数部分***************/
  componentWillMount() {
    console.log('componentWillMount');

  }

  componentDidMount() {
    if (getData('remData')) {
      this.setState({ isTop: true })
      get('/zll/love/remember/get', { id: getData('remData').bid, loveCode: getData('user').login.loveCode }).then(e => {
        if (e.data.result) {
          let data = e.data.list[0]
          this.setState({ title: data.title, dateSel: data.startTime ? data.startTime : '0000-00-00', isTop: false })
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

  }

  /************自定义状态函数部分 ***************/
  onDateChange = e => {
    let arr = e.detail.value.split('-')
    arr = arr.map(item => {
      return item.length == 1 ? '0' + item : item
    })
    let time = arr[0] + '-' + arr[1] + '-' + arr[2]
    this.setState({ dateSel: time })
  }
  handleChange(value) {
    this.setState({
      title: value
    })
    return value
  }

  handleClose() {
    Taro.navigateTo({
      url: '/pages/remember/index'
    })
  }

  //保存数据
  handleSubmit() {

    if (this.state.title) {
      this.setState({
        isTop: true,
        text: '正在上传...'
      })
      let data = {
        title: this.state.title,
        startTime: getData('remData') ? this.state.dateSel : ''
      }
      if (getData('remData')) {
        data.bid = getData('remData').bid
        post('/zll/love/remember/update', data).then(e => {
          if (e.data.result) {
            this.setState({ isTop: false })
            Taro.navigateTo({
              url: '/pages/remember/index'
            })
          } else {
            // Taro.atMessage({
            //   message: '数据删除失败！',
            //   type: 'error',
            // })
          }
        }).catch((e) => {
          console.log(e);
        })
      } else {
        data.author = getData('user').login.author
        data.url = getData('user').login.url
        data.loveCode = getData('user').login.loveCode
        post('/zll/love/remember/add', data).then(e => {
          if (e.data.result) {
            this.setState({ isTop: false })
            Taro.navigateTo({
              url: '/pages/remember/index'
            })
          } else {
            // Taro.atMessage({
            //   message: '数据删除失败！',
            //   type: 'error',
            // })
          }
        }).catch((e) => {
          console.log(e);
        })
      }

      // Taro.uploadFile({
      //   url: URL + '/zll/love/wish/update',
      //   filePath: this.state.src,
      //   name: 'file',
      //   formData: data,
      //   success: res => {
      //     this.getData()
      //   },
      //   fail: res => {

      //   },

      // })

    } else {
      Taro.atMessage({
        message: '请输入标题内容！',
        type: 'error'
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
        <View>编辑列表</View>
      </AtNavBar>
    }
    return (
      <View className='indexed'>
        {navBar}
        <View className='warp'>
          <View className='item border'>
            {/* <Icon className='icon1'></Icon> */}
            <AtInput
              border={false}
              type='text'
              placeholder='请输入标题...'
              border={false}
              value={this.state.title}
              onChange={this.handleChange.bind(this)}
            />
          </View>
          {
            getData('remData') ? <View className='item border'>
              <Picker className='picker' border={false} mode='date' onChange={this.onDateChange}>
                {this.state.dateSel}
              </Picker>
            </View> : ''
          }


        </View>
        <View className='button'>
          <Button onClick={this.handleSubmit.bind(this)}>确定</Button>
        </View>
        <AtMessage />
        {/* 提示按钮 */}
        <AtToast isOpened={this.state.isTop} text={this.state.text} status={this.state.status} icon={this.state.icon} duration={0}></AtToast>
        {/* 背景 */}
        <Image className="bg" src={getData("bgcData") ? URL + getData("bgcData")[7].src : URL + '/love/bgc/bgc6.jpg'}></Image>
        {/* <Image className="bg" src={URL + '/' + 'love/bgc/bgc6.jpg'}></Image> */}
      </View>
    )
  }
}