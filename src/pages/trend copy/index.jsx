import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Swiper, SwiperItem, Icon ,Button} from '@tarojs/components'
import { AtModal, AtModalHeader, AtInput, AtModalAction } from 'taro-ui'
import './index.scss'
// import  Default from '../default'
export default class Index extends Component {
  /************数据初始化***************/
  constructor(props) {
    super(props);
    this.state = {
      name: '0',
      isOpened: false,
    };
  }
  /************页面配置部分***************/
  config = {
    navigationBarTitleText: '首页'
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
    console.log('componentDidHide');
  }

  /************自定义状态函数部分 ***************/
  handleClick(key, e) {
    let _this = this;
    switch (key) {
      case 'open':
        _this.setState({ isOpened: true })
        break;
      case 'close':
        _this.setState({ isOpened: false })
        break;
      default:
        break;
    }
  }
  handleChange(){

  }
  /************视图部分***************/
  render() {
    console.log('render');
    return (
      <View className='indextr'>
        <View className='top'>
          <View className="touxiang">
            <Image className="img" src={require('../../static/img/nan.jpg')}></Image>
            <Image className="img-love" src={require('../../static/img/love.png')}></Image>
            <Image className="img" src={require('../../static/img/nv.jpg')}></Image>
          </View>
          <View className="i-title">
            <View>我们相爱</View>
            <Text className="i-day">200</Text>天
          </View>
        </View>
        <Swiper
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
        </Swiper>
        <View className='content'>
          <View className='ct-item'>
            <View className='it-left'>
              <Icon className='it-le-top'></Icon>
            </View>
          </View>

          <View className='ct-item'>
            <View className='it-left'>
              <View className='it-le-warp'>
                <View><Text className='it-text'>4</Text>日</View>
                <View>2019/04</View>
              </View>
              <View className='it-le-icon'>
                <Icon className='icon-heart img-1'></Icon>
              </View>
            </View>
            <View className='it-right'>
              <View className='it-ri-warp'>
                <View className='it-ri-top'>
                  sdfsdfs
                </View>
                <View className='it-ri-bottom'>
                  <Text>24:32</Text>
                  <Text>剛剛</Text>
                </View>
              </View>
            </View>
          </View>
          <View className='ct-item'>
            <View className='it-left'>
              <View className='it-le-warp'>
                <View><Text className='it-text'>4</Text>日</View>
                <View>2019/04</View>
              </View>
              <View className='it-le-icon'>
                <Icon className='icon-heart img-2'></Icon>
              </View>
            </View>
            <View className='it-right'>
              <View className='it-ri-warp'>
                <View className='it-ri-top'>
                  sdfsdfs
                </View>
                <View className='it-ri-bottom'>
                  <Text className='time'>24:32</Text>
                  <Text>剛剛</Text>
                </View>
              </View>
            </View>
          </View>
          <View className='ct-item'>
            <View className='it-left'>
              <View className='it-le-warp'>
                <View><Text className='it-text'>4</Text>日</View>
                <View>2019/04</View>
              </View>
              <View className='it-le-icon'>
                <Icon className='icon-heart img-1'></Icon>
              </View>
            </View>
            <View className='it-right'>
              <View className='it-ri-warp'>
                <View className='it-ri-top'>
                  sdfsdfs
                </View>
                <View className='it-ri-bottom'>
                  <Text className='time'>24:32</Text>
                  <Text>剛剛</Text>
                </View>
              </View>
            </View>
          </View>

        </View>

        {/* 菜单 添加按钮 */}
        <View className='menu'>
          <View className='warp-me' onClick={this.handleClick.bind(this,'open')}>
            <Icon className='icon-add'></Icon>
          </View>
        </View>

        {/* 添加输入框 */}
        <AtModal isOpened={this.state.isOpened}>
          <AtModalHeader>新建相册</AtModalHeader>
          <View className='modal-input'>
            <AtInput
              type='text'
              placeholder='请输入相册名称'
              clear
              border
              value={this.state.textValue}
              onChange={this.handleChange.bind(this)}
            />
          </View>
          <AtModalAction>
            <Button onClick={this.handleClick.bind(this, 'close')}>取消</Button>
            <Button>确定</Button>
          </AtModalAction>
        </AtModal>
        {/* 背景 */}
        {/* <Image className="bg" src={require('../../static/img/bgc.jpg')}></Image> */}
      </View>
    )
  }
}