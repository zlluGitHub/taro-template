import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Icon, Button } from '@tarojs/components'
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
      isSetName: false,
      name: "",
      src: "",
      confirm: { title: '修改昵称', mark: '1' },
      data: {
        author: "",
        bid: "",
        loveCode: "",
        name: "",
        password: "",
        describe: "",
        time: "",
        url: ""
      }
    };
  }
  /************页面配置部分***************/
  config = {
    navigationBarTitleText: '修改资料'
  }

  /************生命周期函数部分***************/
  componentWillMount() {

  }

  componentDidMount() {
    let _this = this
    let user = getData('user')
    if (user.login.bid == getData('bid')) {
      _this.setState({ data: user.login })
    } else {
      _this.setState({ data: user.partner })
    }
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
  // getData() {
  //   let data = {
  //     if (user.login.bid == getData('bid')) {
  //       user.login.name = this.state.name
  //     } else {
  //       user.partner.name = this.state.name
  //     }
  //     setData('user', user)
  //     _this.setState({ user: user })
  //   }

  // }
  handleConfirm() {
    let _this = this
    let user = getData('user')
    let data = {
      bid: getData('bid'),
      loveCode: user.login.loveCode
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
        switch (_this.state.confirm.mark) {
          case '2':
            if (user.login.bid == getData('bid')) {
              user.login.name = this.state.name
            } else {
              user.partner.name = this.state.name
            }
            setData('user', user)
            _this.setState({ user: user })
            break;
          case '3':
            if (user.login.bid == getData('bid')) {
              user.login.author = this.state.name
            } else {
              user.partner.author = this.state.name
            }
            setData('user', user)
            _this.setState({ user: user })
            break;
          case '4':
            if (user.login.bid == getData('bid')) {
              user.login.password = this.state.name
            } else {
              user.partner.password = this.state.name
            }
            setData('user', user)
            _this.setState({ user: user })
            break;
          default:
            break;
        }
      } else {
        Taro.atMessage({
          message: '数据加载失败！',
          type: 'error'
        })
      }
    })
  }
  handleOpen(key, val) {
    let _this = this
    switch (key) {
      case '1':
        _this.setState({ isOpened: true })
        break;
      case '2':
        _this.setState({ isSetName: true, confirm: { title: '修改昵称', mark: key }, name: val })
        break;
      case '3':
        _this.setState({ isSetName: true, confirm: { title: '修改账号', mark: key }, name: val })
        break;
      case '4':
        _this.setState({ isSetName: true, confirm: { title: '重置密码', mark: key }, name: val })
        break;

      default:
        break;
    }

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
              bid: getData('bid'),
              mark: 'file',
              loveCode: getData('user').login.loveCode,
            }
            Taro.uploadFile({
              url: URL + '/zll/love/user/update',
              filePath: tempFilePaths,
              name: 'file',
              formData: data,
              success: e => {
                let user = getData('user')
                if (user.login.bid == getData('bid')) {
                  user.login.url = tempFilePaths
                } else {
                  user.partner.url = tempFilePaths
                }
                setData('user', user)
                _this.setState({ user: user, isOpened: false, src: tempFilePaths })
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
        let src = _this.state.src ? _this.state.src : this.state.data.url
        Taro.previewImage({
          current: src, // 当前显示图片的http链接
          urls: [src]
        })
        this.setState({ isOpened: false })
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
  /************视图部分***************/
  render() {
    let { author, name, password, url } = this.state.data;
    let nicheng = name
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
        <View>关于{name}的资料</View>
      </AtNavBar>
    }
    
    return (
      <View className='index6'>
        {navBar}
        <View className='content2'>
          <View className='mar-top'>
            <View className='item' onClick={this.handleOpen.bind(this, '1', '')}>
              <View className='lf'>
                <Text className='name'>头像</Text>
              </View>
              <View className='rt'>
                <Image className="img" src={url}></Image>
                <Icon className='icon'></Icon>
              </View>
            </View>
            <View className='item no' onClick={this.handleOpen.bind(this, '2', nicheng)}>
              <View className='lf'>
                <Text className='name1'>昵称</Text>
              </View>
              <View className='rt'>
                <Text className='name name1'>{nicheng}</Text>
                <Icon className='icon'></Icon>
              </View>
            </View>
          </View>
          <View className='item' onClick={this.handleOpen.bind(this, '3', author)}>
            <View className='lf'>
              <Text className='name'>登录账号</Text>
            </View>
            <View className='rt'>
              <Text className='name'>{author}</Text>
              <Icon className='icon'></Icon>
            </View>
          </View>
          <View className='item no' onClick={this.handleOpen.bind(this, '4', password)}>
            <View className='lf'>
              <Text className='name'>重置密码</Text>
            </View>
            <View className='rt'>
              <Text className='name'>******</Text>
              <Icon className='icon'></Icon>
            </View>
          </View>
        </View>

        {/* 动作面板 */}
        <AtActionSheet isOpened={this.state.isOpened} cancelText='关闭' onCancel={this.handleCancel.bind(this)} onClose={this.handleCancel.bind(this)}>
          <AtActionSheetItem onClick={this.handleClick.bind(this, 'fd')}>
            查看大图
          </AtActionSheetItem>
          <AtActionSheetItem onClick={this.handleClick.bind(this, 'album')}>
            从相册选择
          </AtActionSheetItem>
          <AtActionSheetItem onClick={this.handleClick.bind(this, 'camera')}>
            拍照上传
          </AtActionSheetItem>
        </AtActionSheet>

        {/* 修改昵称弹窗 */}
        <AtModal isOpened={this.state.isSetName} onClose={this.handleCancel.bind(this)}>
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
        </AtModal>
        {/* 背景 */}
        <Image className="bg" src={getData("bgcData") ? URL + getData("bgcData")[11].src : URL + '/love/bgc/bgc6.jpg'}></Image>
        {/* <Image className="bg" src={URL + '/' + 'love/bgc/bgc6.jpg'}></Image> */}
      </View >
    )
  }
}