import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Icon, Swiper, SwiperItem, ScrollView } from '@tarojs/components'
import { AtModal, AtActionSheet, AtActionSheetItem, AtNavBar } from 'taro-ui'
import { get, URL, post } from '../../service/api'
import { getData, setData } from '../../utils/store'
import Loading from '../../components/loading.jsx'
import './index.scss'
// import  Default from '../default'
export default class Index extends Component {
  /************数据初始化***************/
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isDelete: false,
      isOpened: false,
      bid: '',
      imgArr: [],
      data: {
        content: "加载中...",
        src: "love/imgs/1581390781319.jpg",
        time: "2020-02-10 18:7:16",
        title: "加载中...",
      }
    }
  }
  /************页面配置部分***************/
  config = {
    navigationBarTitleText: '回忆录列表'
  }

  /************生命周期函数部分***************/
  componentWillMount() {
    // this.$router.params.id
    this.getData()

    get('/zll/love/photo/get', { id: getData('bid'), loveCode: getData('user').login.loveCode }).then(e => {
      if (e.data.result) {
        this.setState({
          data: e.data.list[0]
        })
      } else {
        Taro.atMessage({
          message: '数据加载失败！',
          type: 'error',
        })
      }
    }).catch((e) => {
      console.log(e);
    })
    // this.setState({ name: 'asda' })
  }

  componentDidMount() {
    // console.log(this.$router.params.id);

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
    get('/zll/love/img/get', { id: getData('bid'), loveCode: getData('user').login.loveCode }).then(e => {
      if (e.data.result) {
        this.setState({
          imgArr: e.data.list, loading: false, isDelete: false,
          isOpened: false,
          bid: '',
        })
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
  //轮播图点击预览 点击触发
  lookImg(src) {
    // let src = e.currentTarget.dataset.src;
    //图片预览
    Taro.previewImage({
      current: src, // 当前显示图片的http链接
      urls: this.state.imgArr.map(item => {
        return URL + '/' + item.src
      }) // 需要预览的图片http链接列表
    })
  }
  // 删除 长按触发
  // longTap() {
  //   console.log('sax');
  // }
  //添加按钮事件
  handleAddClick() {
    Taro.navigateTo({
      url: '/pages/photoEdit/index'
    })
  }
  beforePage() {
    Taro.navigateBack({
      delta: 1 // 返回上一级页面。
    });
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
    post('/zll/love/img/delete', { idArr: JSON.stringify([this.state.bid]) }).then(e => {
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
    let imgArr = this.state.imgArr
    let data = this.state.data
    const content = imgArr.map(item => {
      return <View className='item h5-item' onLongPress={this.handleOpen.bind(this, item.bid)}>
        <View className="img" style={'background: url(' + URL + '/' + item.src + ') center center no-repeat;background-size: cover;'} onClick={this.lookImg.bind(this, URL + '/' + item.src)} ></View>
        {/* <Image className='img' data-src={URL + '/' + item.src} onClick={this.lookImg.bind(this)}  src={URL + '/' + item.src} lazyLoad={true}></Image> */}
      </View>
    })
    const scrollStyle = {
      height: getData('winHeight') - 55 + 'px'
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
        <View>回忆录列表</View>
      </AtNavBar>
    }
    return (
      <View className='index1'>
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
        >
          {/* <Swiper
            className='sw-swiper'
            indicatorColor='#999'
            indicatorActiveColor='#333'
            circular
            indicatorDots
            autoplay>
            <SwiperItem>
              <Image className='img' src={require('../../static/img/bgc.jpg')}></Image>
            </SwiperItem>
            <SwiperItem>
              <Image className='img' src={require('../../static/img/bgc.jpg')}></Image>
            </SwiperItem>
            <SwiperItem>
              <Image className='img' src={require('../../static/img/bgc.jpg')}></Image>
            </SwiperItem>
          </Swiper> */}
          <View className='banner'>
            <View className="icon" style={'background: url(' + URL + '/' + data.src + ') center center no-repeat;background-size: cover;'}></View>
            {/* <View className='icon' style={'background:url(' + URL + '/' + data.src + ') 0% 0% / 100% no-repeat;'}></View> */}
            <View className='title'> <Text className="text">{data.title}</Text></View>
            <View className='content'> <Text className="text">{data.content}</Text></View>
          </View>
          <View className='warp'>
            {content}
          </View>
        </ScrollView>
        {/* 菜单 添加按钮 */}
        <View className='menu'>
          <View className='warp-me' onClick={this.handleAddClick.bind(this)}>
            <Icon className='icon-add'></Icon>
          </View>
        </View>
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
        {/* 背景 */}
        <Image className="bg" src={getData("bgcData") ? URL + getData("bgcData")[2].src : URL + '/love/bgc/bgc4.jpg'}></Image>
      </View>
    )
  }
}