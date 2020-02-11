import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Icon, ScrollView } from '@tarojs/components'
import { getData, setData } from '../../utils/store'
import { get, URL } from '../../service/api'
import './index.scss'
import Loading from '../../components/loading.jsx'
export default class Index extends Component {
  /************数据初始化***************/
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      photoArr: []
    }
  }
  /************页面配置部分***************/
  // config = {
  //   navigationBarTitleText: '首页'
  // }

  /************生命周期函数部分***************/
  componentWillMount() {
    console.log('componentWillMount1111');

  }

  componentDidMount() {
    get('/zll/love/photo/get').then(e => {
      if (e.data.result) {
        this.setState({ photoArr: e.data.list, loading: false })
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
  handleRouter(key, item) {
    setData('bid', item.bid)
    switch (key) {
      case 'l':
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
  // handleChange(value) {
  //   this.setState({
  //     textValue: value
  //   })
  //   // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
  //   return value
  // }
  /************视图部分***************/

  render() {
    let photoArr = this.state.photoArr
    let content = photoArr.map(item => {
      return <View className='item h5-item' onClick={this.handleRouter.bind(this, 'l', item)}>
        <Image className='img' src={URL + '/' + item.src}></Image>
        <View className="text-warp">
          <Text className='text-1'>{item.title}</Text><Text className='text-2'>2张</Text></View>
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
          <View className='warp'>
            {content}
          </View>
        </ScrollView>
        {/* 新建按钮 */}
        <View className='menu'>
          <View className='warp-me' onClick={this.handleRouter.bind(this, 'open')}>
            <Icon className='icon-add'></Icon>
            <Text className='menu-add'>新建相册</Text>
          </View>
        </View>
        {/* 背景 */}
        {/* <Image className="bg" src={require('../../static/img/bgc.jpg')}></Image> */}
      </View>
    )
  }
}
