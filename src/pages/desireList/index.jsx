import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Icon } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtModal, AtModalHeader, AtInput, AtModalAction } from 'taro-ui'
import './index.scss'
// import  Default from '../default'
export default class Index extends Component {
  /************数据初始化***************/
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      current: 0,
      tabList: [{ title: '全部' }, { title: '未完成' }, { title: '已完成' }],
      color: ['#FF7066', '#748F9D', '#67B867', '#599DF1', '#6B7BF4', '#AB96EF', '#AB96EF', '#F98296', '#DC7FB8']
    }
  }
  /************页面配置部分***************/
  // config = {
  //   navigationBarTitleText: '首页'
  // }

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
  handleClick(value) {
    this.setState({
      current: value
    })
  }
  handleAddClick(key, e) {
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
  handleRouter() {
    Taro.navigateTo({
      url: '/pages/desireEditSw/index'
    })
  }

  /************视图部分***************/
  render() {
    const tabList = this.state.tabList;
    const color = this.state.color;
    return (
      <View className='index'>
        <View className='warp'>
          <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
            <AtTabsPane current={this.state.current} index={0} >
              <View className='content'>
                <View className='item' onClick={this.handleRouter.bind(this)}>
                  <Icon className='icon' style={'background-color:' + color[1] + ';'}></Icon>
                  <View className='left'>
                    <Image className='img' src={require('../../static/img/db1.png')}></Image>
                    <Text className='time' style={'color:' + color[1] + ';'}>12:32</Text>
                  </View>
                  <View className='right'>
                    <Text className='ct-title'>标题1</Text>
                    <Text className='ct-xq'>阿萨上大学再次时卡顿。。。</Text>
                  </View>
                  <Image className='icon-img' src={require('../../static/img/ywc.png')}></Image>
                </View>
                <View className='item' onClick={this.handleAddClick.bind(this, 'open')}>
                  <Icon className='icon' style={'background-color:' + color[2] + ';'}></Icon>
                  <View className='left'>
                    <Image className='img' src={require('../../static/img/db1.png')}></Image>
                    <Text className='time' style={'color:' + color[2] + ';'}>12:32</Text>
                  </View>
                  <View className='right'>
                    <Text className='ct-title'>标题1</Text>
                    <Text className='ct-xq'>阿萨上大学再次时卡顿。。。</Text>
                  </View>
                  <Image className='icon-img dwc' src={require('../../static/img/dwc1.png')}></Image>
                </View>
                <View className='item'>
                  <Icon className='icon' style={'background-color:' + color[3] + ';'}></Icon>
                  <View className='left'>
                    <Image className='img' src={require('../../static/img/db1.png')}></Image>
                    <Text className='time' style={'color:' + color[3] + ';'}>12:32</Text>
                  </View>
                  <View className='right'>
                    <Text className='ct-title'>标题1</Text>
                    <Text className='ct-xq'>阿萨上大学再次时卡顿。。。</Text>
                  </View>
                </View>
              </View>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={1}>
              <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页二的内容</View>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={2}>
              <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页三的内容</View>
            </AtTabsPane>
          </AtTabs>
        </View>

        {/* 添加输入框 */}
        <AtModal isOpened={this.state.isOpened}>
          {/* <AtModalHeader>新建相册</AtModalHeader> */}
          <View className='modal-input'>
            是否已完成？
          </View>
          <AtModalAction>
            <Button onClick={this.handleAddClick.bind(this, 'close')}>取消</Button>
            <Button>编辑</Button>
            <Button>已完成</Button>
          </AtModalAction>
        </AtModal>

        {/* 新建按钮 */}
        <View className='menu'>
          <View className='warp-me'>
            <Icon className='icon-add'></Icon>
          </View>
        </View>
      </View>
    )
  }
}