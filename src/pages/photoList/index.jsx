import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Icon, Swiper, SwiperItem, ScrollView } from '@tarojs/components'
import { AtImagePicker, AtButton } from 'taro-ui'
import { get, URL } from '../../service/api'
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
  // config = {
  //   navigationBarTitleText: '首页'
  // }

  /************生命周期函数部分***************/
  componentWillMount() {
    // this.$router.params.id
    get('/zll/love/img/get', { id: getData('bid') }).then((e) => {
      if (e.data.result) {
        this.setState({ imgArr: e.data.list, loading: false })
      } else {
        Taro.atMessage({
          message: '数据加载失败！',
          type: 'error',
        })
      }
    }).catch((e) => {
      console.log(e);
    })

    get('/zll/love/photo/get', { id: getData('bid') }).then((e) => {
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

  //轮播图点击预览 点击触发
  lookImg(e) {
    let src = e.currentTarget.dataset.src;
    //图片预览
    Taro.previewImage({
      current: src, // 当前显示图片的http链接
      urls: this.state.imgArr.map(item => {
        return URL + '/' + item.src
      }) // 需要预览的图片http链接列表
    })
  }
  // 删除 长按触发
  longTap() {
    console.log('sax');
  }
  //添加按钮事件
  handleAddClick() {
    Taro.navigateTo({
      url: '/pages/photoEdit/index'
    })
  }
  /************视图部分***************/
  render() {
    let imgArr = this.state.imgArr
    let data = this.state.data
    const content = imgArr.map(item => {
      return <View className='item h5-item'>
        <Image className='img' data-src={URL + '/' + item.src} onClick={this.lookImg.bind(this)} onLongPress={this.longTap} src={URL + '/' + item.src} lazyLoad={true}></Image>
      </View>
    })
    const scrollStyle = {
      height: getData('winHeight')
    }
    return (
      <View className='index'>
         {this.state.loading ? <Loading /> : ''}
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
            <View className='icon' style={'background:url(' + URL + '/' + data.src + ') 0% 0% / 100% no-repeat;'}></View>
            <Text className='title'>{data.title}</Text>
            <Text className='content'>{data.content}</Text>
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

        {/* 背景 */}
        {/* <Image className="bg" src={require('../../static/img/bgc.jpg')}></Image> */}
      </View>
    )
  }
}