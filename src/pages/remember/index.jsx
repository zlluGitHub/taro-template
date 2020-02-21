import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Icon, ScrollView } from '@tarojs/components'
import { AtActionSheet, AtActionSheetItem, AtNavBar, AtModal, AtMessage } from 'taro-ui'
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
      isOpened: false,
      isDelete: false,
      current: 0,
      // tabList: [{ title: '全部' }, { title: '未完成' }, { title: '已完成' }],
      // color: ['#FF7066', '#748F9D', '#67B867', '#599DF1', '#6B7BF4', '#AB96EF', '#AB96EF', '#F98296', '#DC7FB8']
    }
  }
  /************页面配置部分***************/
  config = {
    navigationBarTitleText: '纪念日'
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
    setData('remData', '')
    this.getData()
  }

  componentDidHide() {
    console.log('componentDidHide');
  }

  /************自定义状态函数部分 ***************/
  getData() {
    setData('bid', '')
    setData('remData', '')
    get('/zll/love/remember/get', { loveCode: getData('user').login.loveCode }).then(e => {
      if (e.data.result) {
        let data = e.data.list.map(item => {
          if (item.startTime) {
            let arr = item.startTime.slice(0, 10).split('-')
            let timeSt = arr[0] + '-' + arr[1] + '-' + arr[2]
            item.startTime = arr[0] + '年' + arr[1] + '月' + arr[2] + '日'
            let time = Date.parse(new Date());
            let lasttime = Date.parse(timeSt);
            let day = parseInt((time - lasttime) / (1000 * 60 * 60 * 24))
            item.day = day.toString().indexOf('-') >= -1 ? day.toString().replace('-', "") : day
          } else {
            item.day = ''
          }
          return item
        })
        this.setState({ data, isOpened: false, isDelete: false })
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
  handleClick(key) {
    let _this = this
    switch (key) {
      case 'bianji':
        _this.handleCancel()
        Taro.navigateTo({
          url: '/pages/rememberEdit/index'
        })
        break;
      case 'delete':
        _this.setState({ isDelete: true, isOpened: false })
        break;

      default:
        break;
    }

  }
  handleClose() {
    this.setState({ isDelete: false })
  }
  handleConfirm() {
    if (getData('remData').is === '1') {
      post('/zll/love/remember/delete', { idArr: JSON.stringify([getData('remData').bid]) }).then(e => {
        if (e.data.result) {
          this.getData()
        } else {
          Taro.atMessage({
            message: '数据删除失败！',
            type: 'error',
          })
        }
      }).catch((e) => {
        console.log(e);
      })
    } else {
      this.handleClose()
      Taro.atMessage({
        message: '此项不允许删除！',
        type: 'error',
      })
    }

  }
  handleCancel() {
    this.setState({ isOpened: false })
  }
  handleRouter(val) {
    setData('remData', val)
    if (val) {
      this.setState({ isOpened: true })
    } else {
      Taro.navigateTo({
        url: '/pages/rememberEdit/index'
      })
    }
  }
  handleRouterSort(val) {
    setData('remData', val)
    if (val.startTime) {
      Taro.navigateTo({
        url: '/pages/rememberShow/index'
      })
    } else {
      Taro.navigateTo({
        url: '/pages/rememberEdit/index'
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
    let content = this.state.data.map(item => {
      return <View className='item' onLongPress={this.handleRouter.bind(this, item)} onClick={this.handleRouterSort.bind(this, item)}>
        <View className='flex'>
          <View className='left'>
            <Image className='img' src={URL + item.src}></Image>
          </View>
          <View className='right'>
            <Text className='ct-title'>{item.title}</Text>
            {item.startTime !== '' ? <Text className='ct-xq'>{item.startTime}</Text> : ''}
          </View>
        </View>
        {item.day ? <View className='icon-text'><Text className='text'>{item.day}</Text>天</View> : <View className='icon-text'> <Image className='img' src={require('../../static/img/add1.png')}></Image> </View>}
      </View>
    })
    const scrollStyle = {
      height: getData('winHeight') - 75 + 'px'
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
        <View>纪念日列表</View>
      </AtNavBar>
    }
    return (
      <View className='indexre'>
        {navBar}
        <View className='warp'>
          <ScrollView
            className='scrollview'
            scrollY
            scrollWithAnimation
            scrollTop={0}
            style={scrollStyle}
            lowerThreshold={20}
            upperThreshold={20}
          >
            <View className='content'>
              {content}
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
          <View className='warp-me' onClick={this.handleRouter.bind(this, '')}>
            <Icon className='icon-add'></Icon>
          </View>
        </View>
        <AtMessage />
        <Image className="bg" src={getData("bgcData") ? URL + getData("bgcData")[6].src : URL + '/love/bgc/bgc6.jpg'}></Image>
        {/* <Image className="bg" src={URL + '/' + 'love/bgc/bgc6.jpg'}></Image> */}
      </View>
    )
  }
}