import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Icon, ScrollView } from '@tarojs/components'
import { AtActionSheet, AtActionSheetItem, AtNavBar, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtInput } from 'taro-ui'
import { getData, setData } from '../../utils/store'
import { post, get, URL } from '../../service/api'
import './index.scss'
// import  Default from '../default'
export default class Index extends Component {
  /************数据初始化***************/
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      idData: {},
      isSetName: false,
      name: "",
      src: "",
      data: [],
      confirm: { title: '修改昵称', mark: '1' }
    };
  }
  /************页面配置部分***************/
  config = {
    navigationBarTitleText: '修改背景'
  }

  /************生命周期函数部分***************/
  componentWillMount() {
    this.getData()
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
  getData() {
    get('/zll/love/bgc/get', { loveCode: getData('user').login.loveCode }).then(e => {
      if (e.data.result) {
        this.setState({ data: e.data.list })
        setData('bgcData', e.data.list)
      } else {
        Taro.atMessage({
          message: '数据加载失败！',
          type: 'error'
        })
      }
    }).catch(e => {
      console.log(e);
    })
  }
  handleConfirm() {
    let _this = this
    let data = {
      bid: getData('bid'),
      loveCode: getData('user').login.loveCode
    }
    switch (this.state.confirm.mark) {
      case '2':
        data.name = this.state.name
        break;
      case '3':
        data.author = this.state.name
        break;
      case '4':
        data.password = this.state.name
        break;
      default:
        break;
    }
    post('/zll/love/user/update', data).then(e => {
      if (e.data.result) {
        _this.getData()
      } else {
        Taro.atMessage({
          message: '数据加载失败！',
          type: 'error'
        })
      }
    })
  }
  handleOpen(key) {
    this.setState({ isOpened: true, idData: key })
  }
  handleChange(value) {
    this.setState({
      name: value
    })
    return value
  }
  handleCancel() {
    this.setState({ isOpened: false, isSetName: false, name: '' })
  }
  handleClick(type) {
    let _this = this
    switch (type) {
      case 'album' || 'camera':
        Taro.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: [type],
          success(res) {
            let tempFilePaths = res.tempFilePaths[0]
            //上传图片
            let data = {
              bid: _this.state.idData.bid,
              mark: 'file',
              loveCode: getData('user').login.loveCode,
            }
            Taro.uploadFile({
              url: URL + '/zll/love/bgc/update',
              filePath: tempFilePaths,
              name: 'file',
              formData: data,
              success: e => {
                _this.getData()
                _this.setState({ isOpened: false, src: tempFilePaths[0] })
              },
              fail: res => {
                // _this.setState({ isOpened: false, src: tempFilePaths[0] })
              },
            })
          },
          fail(res) {
            console.log(res);
          }
        })
        break;
      case 'fd':
        let src = URL + '/' + _this.state.idData.src
        Taro.previewImage({
          current: src, // 当前显示图片的http链接
          urls: [src]
        })
        this.setState({ isOpened: false })
        break;
      case 'fwq':
        Taro.navigateTo({
          url: '/pages/bgcList/index'
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
    // Taro.navigateBack({
    //   delta: 1 // 返回上一级页面。
    // });
  }
  /************视图部分***************/
  render() {
    let data = this.state.data;
    let content = data.map(item => {
      return <View className='item' onClick={this.handleOpen.bind(this, item)}>
        <View className='lf'>
          <Text className='name'>{item.describe}</Text>
        </View>
        <View className='rt'>
          <Image className="img" src={URL + '/' + item.src}></Image>
          <Icon className='icon'></Icon>
        </View>
      </View>
    })

    const scrollStyle = {
      height: getData('winHeight')*1 + 40 + 'px'
    }
    // let { author, loveCode, name, password, describe, bid, url } = this.state.data;
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
        <View>背景主题设置</View>
      </AtNavBar>
    }
    return (
      <View className='index6'>
        {navBar}
        <View className='content2'>
          <ScrollView
            className='scrollview'
            scrollY
            scrollWithAnimation
            scrollTop={0}
            style={scrollStyle}
            lowerThreshold={20}
            upperThreshold={20}
            // onScrollToUpper={this.onScrollToUpper.bind(this)} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
            // onScroll={this.onScroll}
          >
            <View className='mar-top'>
              {content}
            </View>
          </ScrollView>
        </View>

        {/* 动作面板 */}
        <AtActionSheet isOpened={this.state.isOpened} title={'“' + this.state.idData.describe + '”' + '背景主题设置'} cancelText='关闭' onCancel={this.handleCancel.bind(this)} onClose={this.handleCancel.bind(this)}>
          <AtActionSheetItem onClick={this.handleClick.bind(this, 'fd')}>
            查看大图
          </AtActionSheetItem>
          <AtActionSheetItem onClick={this.handleClick.bind(this, 'album')}>
            从相册选择
          </AtActionSheetItem>
          {/* <AtActionSheetItem onClick={this.handleClick.bind(this, 'fwq')}>
            从已上传选择（待定）
          </AtActionSheetItem> */}
          <AtActionSheetItem onClick={this.handleClick.bind(this, 'camera')}>
            拍照上传
          </AtActionSheetItem>
        </AtActionSheet>

        {/* 修改昵称弹窗 */}
        {/* <AtModal isOpened={this.state.isSetName} onClose={this.handleCancel.bind(this)}>
          <AtModalHeader>{this.state.confirm.title}</AtModalHeader>
          <AtModalContent>
            <AtInput
              type='text'
              className='center'
              placeholder='请输入内容'
              value={this.state.name}
              onChange={this.handleChange.bind(this)}
            />
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.handleCancel.bind(this)}>取消</Button>
            <Button onClick={this.handleConfirm.bind(this)}>确定</Button>
          </AtModalAction>
        </AtModal> */}
        {/* 背景 */}
        <Image className="bg" src={getData("bgcData") ? URL + getData("bgcData")[12].src : URL + '/love/bgc/bgc6.jpg'}></Image>
        {/* <Image className="bg" src={URL + '/' + 'love/bgc/bgc6.jpg'}></Image> */}
      </View >
    )
  }
}