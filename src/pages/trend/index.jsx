import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Swiper, SwiperItem, Icon, Button, ScrollView } from '@tarojs/components'
import { AtActionSheet, AtActionSheetItem, AtModal } from 'taro-ui'
import { post, get, URL } from '../../service/api'
import { getData, setData } from '../../utils/store'
import './index.scss'
// import  Default from '../default'
export default class Index extends Component {
  /************数据初始化***************/
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      name: '0',
      isDelete: false,
      isOpened: false,
      swiperArr: [
        URL + '/love/banners/banner3.jpg',
        URL + '/love/banners/banner1.jpg',
        //  URL + '/love/banners/banner2.jpg'
        ]
    };
  }
  /************页面配置部分***************/
  config = {
    navigationBarTitleText: '动态'
  }

  /************生命周期函数部分***************/
  componentWillMount() {
    console.log('componentWillMount');
    // this.setState({ name: 'asda' })
  }

  componentDidMount() {
    this.getData()
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

  getData() {
    setData('bid', '')
    get('/zll/love/trend/get', { loveCode: getData('user').login.loveCode }).then(e => {
      if (e.data.result) {
        this.setState({ data: e.data.list, isOpened: false, isDelete: false })
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

  handleClick(key) {
    let _this = this
    switch (key) {
      case 'bianji':
        _this.handleCancel()
        Taro.navigateTo({
          url: '/pages/trendAdd/index'
        })
        break;
      case 'delete':
        _this.setState({ isDelete: true, isOpened: false })

        break;

      default:
        break;
    }

  }
  handleCancel() {
    this.setState({ isOpened: false })
  }
  handleRouter(val) {
    setData('bid', val)
    if (val) {
      this.setState({ isOpened: true })
    } else {
      Taro.navigateTo({
        url: '/pages/trendAdd/index'
      })
    }
  }
  handleClose() {
    this.setState({ isDelete: false })
  }
  handleConfirm() {
    post('/zll/love/trend/delete', { idArr: JSON.stringify([getData('bid')]) }).then(e => {
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
    let { startTime, partner, login } = getData('user');
    // let time = Date.parse(new Date());
    // let lasttime = Date.parse(startTime);
    // let day = parseInt((time - lasttime) / (1000 * 60 * 60 * 24));
 
    
    const scrollStyle = {}
    if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
      scrollStyle.height = getData('winHeight') * 1- 255 + 'px'
    } else {
      scrollStyle.height = getData('winHeight') * 1- 205 + 'px'
    }
    // onLongPress
    let content = this.state.data.map(item => {
      return <View className='item' onLongPress={this.handleRouter.bind(this, item.bid)}>
        <View className='tops'>
          <Image className='imga' src={item.url}></Image>
          <Text className='text'>{item.author}</Text>
        </View>
        <View className='bottom'> {item.content} </View>
        <View className='time'>
          <Icon className='icon'>
          </Icon><Text className='text'>{item.time}</Text>
        </View>
      </View>
    })
    let swiperData = this.state.swiperArr.map(item => {
      return <SwiperItem>
        <Image className='img' src={item}></Image>
      </SwiperItem>
    })
    return (
      <View className='indextr'>
        <View className='top'>
          <View className="touxiang">
            <Image className="img" src={login.url}></Image>
            <Image className="img-love" src={require('../../static/img/love.png')}></Image>
            <Image className="img" src={partner.url}></Image>
          </View>
          <View className="i-title">
            <View>我们蜜语共</View>
            <Text className="i-day">{this.state.data.length}</Text>
            <Text className="i-t">条啦！</Text>
          </View>
        </View>
        <Swiper
          className='sw-swiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay>
          {swiperData}
          {/* <SwiperItem>
            <Image className='img' src={require('../../static/img/bgc.jpg')}></Image>
          </SwiperItem>
          <SwiperItem>
            <Image className='img' src={require('../../static/img/bgc.jpg')}></Image>
          </SwiperItem> */}
        </Swiper>
        <View className='content'>
          <ScrollView
            className='scrollview'
            scrollY
            scrollWithAnimation
            scrollTop={0}
            style={scrollStyle}
            lowerThreshold={20}
            upperThreshold={20}
          >
            {content}
            <View className='tip-bottom'>
              没有更多啦~
          </View>
          </ScrollView>
        </View>

        {/* 动作面板 */}
        <AtActionSheet isOpened={this.state.isOpened} cancelText='关闭' onCancel={this.handleCancel.bind(this)} onClose={this.handleCancel.bind(this)}>
          <AtActionSheetItem onClick={this.handleClick.bind(this, 'bianji')}>
            编辑
          </AtActionSheetItem>
          <AtActionSheetItem onClick={this.handleClick.bind(this, 'delete')}>
            删除
          </AtActionSheetItem>
        </AtActionSheet>
        {/* 菜单 添加按钮 */}
        <View className='menu'>
          <View className='warp-me' onClick={this.handleRouter.bind(this, '')}>
            <Icon className='icon-add'></Icon>
          </View>
        </View>
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
        {/* 背景 */}
        {/* <Image className="bg" src={URL+'/'+'love/bgc/bgc2.jpg'}></Image> */}
        <Image className="bg" src={getData("bgcData") ? URL + getData("bgcData")[8].src : URL + '/love/bgc/bgc2.jpg'}></Image>
      </View>
    )
  }
}