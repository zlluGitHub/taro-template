import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Icon, ScrollView } from '@tarojs/components'
import { getData, setData } from '../../utils/store'
import { get, URL, post } from '../../service/api'
import './index.scss'
import { AtModal, AtActionSheet, AtActionSheetItem, AtNavBar } from 'taro-ui'
import Loading from '../../components/loading.jsx'
export default class Index extends Component {
  /************数据初始化***************/
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isDelete: false,
      isOpened: false,
      bid: '',
      photoArr: []
    }
  }
  /************页面配置部分***************/
  config = {
    navigationBarTitleText: '回忆录'
  }

  /************生命周期函数部分***************/
  componentWillMount() {

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
    get('/zll/love/photo/get', { loveCode: getData('user').login.loveCode }).then(e => {
      if (e.data.result) {
        this.setState({
          photoArr: e.data.list, loading: false, isDelete: false,
          isOpened: false,
          bid: '',
        })
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
  handleRouter(key, item) {
    setData('bid', item.bid)
    switch (key) {
      case 'l':
        // this.setState({ isOpened: true })
        Taro.navigateTo({
          url: '/pages/photoList/index'
        })
        break;
      case 'open':
        Taro.navigateTo({
          url: '/pages/photoAdd/index'
        })
        break;
      default:
        break;
    }
  }
  beforePage() {
    Taro.navigateTo({
      url: '/pages/about/index'
    })
  }

  handleClick(key) {
    this.setState({ isDelete: true, isOpened: false })
  }
  handleOpen(bid) {
    this.setState({ bid })
    this.setState({ isOpened: true })
  }
  handleCancel() {
    this.setState({ isOpened: false })
  }

  handleClose() {
    this.setState({ isDelete: false })
  }
  handleConfirm() {
    post('/zll/love/photo/delete', { idArr: JSON.stringify([this.state.bid]) }).then(e => {
      if (e.data.result) {
        this.getData()
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
  /************视图部分***************/

  render() {
    let photoArr = this.state.photoArr
    let content = photoArr.map(item => {
      return <View className='item h5-item' onClick={this.handleRouter.bind(this, 'l', item)} onLongPress={this.handleOpen.bind(this, item.bid)}>
        <View className="img" style={'background: url(' + URL + '/' + item.src + ') center center no-repeat;background-size: cover;'}></View>

        <View className="text-warp">
          <Text className='text-1'>{item.title}</Text>
          {/* <Text className='text-2'>2张</Text>*/}
        </View>
      </View>
    })

    const scrollStyle = {}
    if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
      scrollStyle.height = getData('winHeight') * 1 - 50 + 'px'
    } else {
      scrollStyle.height = getData('winHeight') + 'px'
    }

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
        <View>回忆录</View>
      </AtNavBar>
    }
    return (
      <View className='index'>
        {this.state.loading ? <Loading /> : ''}
        {navBar}
        <ScrollView
          className='scrollview'
          scrollY
          scrollWithAnimation
          scrollTop={0}
          style={scrollStyle}
          lowerThreshold={20}
          upperThreshold={20}
          // onScrollToUpper={this.onScrollToUpper.bind(this)} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
          onScroll={this.onScroll}
        >
          <View className='warp1'>
            {content}
          </View>
          <View className='tip-bottom'>
            没有更多啦~
           </View>
        </ScrollView>

        {/* 动作面板 */}
        <AtActionSheet isOpened={this.state.isOpened} cancelText='关闭' onCancel={this.handleCancel.bind(this)} onClose={this.handleCancel.bind(this)}>
          <AtActionSheetItem onClick={this.handleClick.bind(this, 'delete')}>
            删除
          </AtActionSheetItem>
        </AtActionSheet>
        {/* 删除提示框 */}
        <AtModal
          isOpened={this.state.isDelete}
          title='删除提示'
          cancelText='取消'
          confirmText='确定'
          onClose={this.handleClose.bind(this)}
          onCancel={this.handleClose.bind(this)}
          onConfirm={this.handleConfirm.bind(this)}
          content='确定删除？'
        />
        {/* 新建按钮 */}
        <View className='menu'>
          <View className='warp-me' onClick={this.handleRouter.bind(this, 'open')}>
            <Icon className='icon-add'></Icon>
            <Text className='menu-add'>新建相册</Text>
          </View>
        </View>

        {/* 背景 */}
        <Image className="bg" src={getData("bgcData") ? URL + getData("bgcData")[1].src : URL + '/love/bgc/bgc4.jpg'}></Image>
        {/* <Image className="bg" src={URL + '/' + 'love/bgc/bgc4.jpg'}></Image> */}
      </View>
    )
  }
}
