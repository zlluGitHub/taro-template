import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Icon, Button, ScrollView } from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction, AtInput, AtNavBar } from 'taro-ui'
import { getData, setData } from '../../utils/store'
import { post, get, URL } from '../../service/api'
import './index.scss'
// import  Default from '../default'
export default class Index extends Component {
  /************数据初始化***************/
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      state: 'no',
      wishArr: [],
      isOpened: false
    };
  }

  /************页面配置部分***************/
  config = {
    navigationBarTitleText: '愿望单'
  }

  /************生命周期函数部分***************/
  componentWillMount() {
    console.log('componentWillMount');
    // this.setState({ name: 'asda' })
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  componentDidShow() {
    this.getData();
  }

  componentDidHide() {
    console.log('componentDidHide');
  }

  /************自定义状态函数部分 ***************/
  getData() {
    get('/zll/love/wish/get', { loveCode: getData('user').login.loveCode }).then(e => {
      if (e.data.result) {
        this.setState({ wishArr: e.data.list, loading: false })
      } else {
        Taro.atMessage({
          message: '数据加载失败！',
          type: 'error',
        })
      }
    }).catch(e => {
      console.log(e);
    })
  }
  handleRouter(obj) {
    setData('bid', obj.bid)
    Taro.navigateTo({
      url: '/pages/wishEdit/index'
    })
  }
  // 添加按钮
  handleAdd() {
    this.setState({
      isOpened: true,
      value: '',
      state: 'no'
    })
  }
  //触发关闭时的事件	
  handleClose() {
    this.setState({ isOpened: false })
  }
  //点击取消按钮触发的事件	
  handleCancel() {
    this.setState({ isOpened: false })
  }
  //点击确认按钮触发的事件
  handleConfirm() {
    let user = getData('user').login
    if (!this.state.value) {
      Taro.atMessage({
        message: '请输入内容！',
        type: 'error',
      })
    } else {
      let data = {
        state: this.state.state,
        content: this.state.value,
        author: user.author,
        loveCode: getData('user').login.loveCode,
        url: user.url
      }
      post('/zll/love/wish/add', data).then(e => {
        if (e.data.result) {
          this.getData();
          this.setState({ isOpened: false })
        } else {
          Taro.atMessage({
            message: '创建失败！',
            type: 'error'
          })
        }
      }).catch((e) => {
        console.log(e);
      })
    }
  }
  //input表单
  handleChange(value) {
    this.setState({
      value
    })
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return value
  }
  beforePage() {
    Taro.navigateBack({
      delta: 1 // 返回上一级页面。
    });
  }
  /************视图部分***************/
  render() {
    let wishArr = this.state.wishArr
    let content = wishArr.map(item => {
      return <View className='item' onClick={this.handleRouter.bind(this, item)}>
        {item.state === 'yes' ? <Image className='img' src={require('../../static/img/love-1.png')}></Image> : <Image className='img' src={require('../../static/img/love-2.png')}></Image>}
        <Text className='text'>{item.content}</Text>
      </View>
    })

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
        <View>愿望列表</View>
      </AtNavBar>
    }

    let heightStyle = {
      height: getData('winHeight') + 'px'
    }
    return (
      <View className='index2'>
        {navBar}
        <ScrollView
          className='scrollview'
          scrollY
          scrollWithAnimation
          scrollTop={0}
          style={heightStyle}
          lowerThreshold={20}
          upperThreshold={20}
          // onScrollToUpper={this.onScrollToUpper.bind(this)} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
          onScroll={this.onScroll}
        >  
         <View className='content wish'>
            {content}
          </View>
        </ScrollView>
        {/* 弹窗 */}
        <AtModal isOpened={this.state.isOpened} onClose={this.handleClose.bind(this)}>
          <AtModalHeader>新建愿望</AtModalHeader>
          <AtModalContent>
            <AtInput
              type='text'
              className='center'
              placeholder='请输入内容'
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
            />
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.handleCancel.bind(this)}>取消</Button>
            <Button onClick={this.handleConfirm.bind(this)}>确定</Button>
          </AtModalAction>
        </AtModal>

        {/* 新建按钮 */}
        <View className='menu'>
          <View className='warp-me' onClick={this.handleAdd.bind(this)}>
            <Icon className='icon-add'></Icon>
          </View>
        </View>
        {/* 背景 */}
        <Image className="bg" src={getData("bgcData") ? URL + getData("bgcData")[4].src : URL + '/love/bgc/bgc2.jpg'}></Image>
        {/* <Image className="bg" src={URL+'/'+'love/bgc/bgc2.jpg'}></Image> */}
      </View>
    )
  }
}