import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Icon, Button, Picker } from '@tarojs/components'
import { post, get, URL } from '../../service/api'
import { AtInput, AtActionSheet, AtActionSheetItem, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtToast, AtNavBar ,AtMessage} from "taro-ui"
import { getData, setData } from '../../utils/store'
import Loading from '../../components/loading.jsx'
import './index.scss'
// import  Default from '../default'
export default class Index extends Component {
  /************数据初始化***************/
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      isSubmit: false,
      isDelete: false,
      isTitleOpened: false,
      content: '',
      src: '',
      time: '2020年12月12日',
      data: {
        author: "",
        bid: "",
        content: "",
        state: "",
        time: "2020-02-12 11:43:21",
        src: "love/imgs/1581390781319.jpg"
      },
      // 提示
      isTop: false,
      text: '加载中...',
      status: 'loading',
      icon: null
    };
  }

  /************页面配置部分***************/
  config = {
    navigationBarTitleText: '愿望详情'
  }

  /************生命周期函数部分***************/
  componentWillMount() {
    console.log('componentWillMount');
    // this.setState({ name: 'asda' })
  }

  componentDidMount() {
    this.getData();
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
  handleOpen() {
    this.setState({ isOpened: true })
  }
  handleCancel() {
    this.setState({ isOpened: false })
  }
  getData = () => {
    this.setState({ isTop: true })
    get('/zll/love/wish/get', { id: getData('bid'), loveCode: getData('user').login.loveCode }).then((e) => {
      if (e.data.result) {
        let data = e.data.list[0]
        let time = data.time
        data.src = URL + '/' + data.src
        let arr = data.time.slice(0, 10).split('-')
        data.time = arr[0] + '年' + arr[1] + '月' + arr[2] + '日'
        this.setState({ time, data, isSubmit: false, src: '', isTop: false })
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
  //活动按钮
  handleClick(type) {
    let _this = this
    switch (type) {
      case 'album' || 'camera':
        Taro.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: [type],
          success(res) {
            let tempFilePaths = res.tempFilePaths
            let data = _this.state.data
            data.src = tempFilePaths[0]
            _this.setState({ data, isOpened: false, isSubmit: true, src: tempFilePaths[0] })
          },
          fail(res) {
            console.log(res);
          }
        })
        break;
      case 'fd':
        let src = _this.state.data.src
        Taro.previewImage({
          current: src, // 当前显示图片的http链接
          urls: [src]
        })
        this.setState({ isOpened: false })
        break;
      case 'delete':
        this.setState({ isDelete: true, isOpened: false })
        break;

      default:
        break;
    }
  }
  //时间确定按钮
  onDateChange = e => {
    let arr = e.detail.value.split('-')
    arr = arr.map(item => {
      return item.length == 1 ? '0' + item : item
    })
    let data = this.state.data
    let time = arr[0] + '-' + arr[1] + '-' + arr[2]
    data.time = arr[0] + '年' + arr[1] + '月' + arr[2] + '日'
    this.setState({ data, time, isSubmit: true })
  }
  //保存数据
  handleSubmit() {
    this.setState({
      isTop: true,
      text: '正在上传...'
    })
    let data = {
      is: this.state.src ? 'yes' : '',
      bid: this.state.data.bid,
      content: this.state.data.content,
      loveCode: getData('user').login.loveCode,
      time: this.state.time
    }
    Taro.uploadFile({
      url: URL + '/zll/love/wish/update',
      filePath: this.state.src,
      name: 'file',
      formData: data,
      success: res => {
        this.getData()
      },
      fail: res => {
        post('/zll/love/wish/update', data).then(e => {
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
      },

    })
  }
  //标题修改
  onContentChange(content) {
    this.setState({
      content
    })
    return content
  }
  handleIsTitleYes() {
    let data = this.state.data
    data.content = this.state.content
    this.setState({ isTitleOpened: false, data, isSubmit: true })
  }
  handleIsTitleClose() {
    this.setState({ isTitleOpened: false, content: this.state.data.content })
  }
  handleOpenIsTitleOpened() {
    this.setState({ isTitleOpened: true, content: this.state.data.content })
  }
  // 删除提示
  handleConfirm() {
    this.setState({ isDelete: false })
    post('/zll/love/wish/delete', { idArr: JSON.stringify([getData('bid')]) }).then(e => {
      if (e.data.result) {
        Taro.navigateTo({
          url: '/pages/wishList/index'
        })
      } else {
        Taro.atMessage({
          message: '数据删除失败！',
          type: 'error',
        })
      }
    }).catch((e) => {
      console.log(e);
    })
  }
  handleClose() {
    this.setState({ isDelete: false })
  }

  beforePage() {
    Taro.navigateBack({
      delta: 1 // 返回上一级页面。
    });
  }

  /************视图部分***************/
  render() {
    let data = this.state.data
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
        <View>愿望单</View>
      </AtNavBar>
    }
    return (
      <View className='index'>
        {navBar}
        <View className='warp'>
          <View className='content'>
            <View className='img-box'>
              {data.state === 'yes' && data.src ? <View className='img' onClick={this.handleOpen.bind(this)} style={'background:url(' + data.src + ') center center no-repeat;background-size:cover;'}></View> : <View className='img' onClick={this.handleOpen.bind(this)} style={'background:url(' + URL + '/love/imgs/xcwj.png' + ') center center no-repeat;background-size:cover;'}></View>}
              {/* <Image className='img' src={require('../../static/img/nan.jpg')}></Image> */}
              <View className='title' onClick={this.handleOpenIsTitleOpened.bind(this)}>
                {data.content}
              </View>
              <View className='time'>
                <Picker mode='date' onChange={this.onDateChange}>
                  <View className='picker'>
                    * {data.time} *
                  </View>
                </Picker>
              </View>
              {/* <View className='icon-box'>
                <View className='delete'><View className='icon'></View></View>
                <View className='look'><View className='icon'></View></View>
              </View> */}
            </View>
          </View>
        </View>
        {/* 弹窗 */}
        <AtModal isOpened={this.state.isTitleOpened} onClose={this.handleIsTitleClose.bind(this)}>
          <AtModalHeader>修改标题</AtModalHeader>
          <AtModalContent>
            <AtInput
              type='text'
              className='center'
              placeholder='请输入内容'
              value={this.state.content}
              onChange={this.onContentChange.bind(this)}
            />
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.handleIsTitleClose.bind(this)}>取消</Button>
            <Button onClick={this.handleIsTitleYes.bind(this)}>确定</Button>
          </AtModalAction>
        </AtModal>

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
        {/* 提示按钮 */}
        <AtToast isOpened={this.state.isTop} text={this.state.text} status={this.state.status} icon={this.state.icon} duration={0}></AtToast>
        {/* 保存按钮 */}
        {
          this.state.isSubmit ? <View className='button' >
            <Button type='primary' onClick={this.handleSubmit.bind(this)}>立即保存</Button>
          </View> : ''
        }
         <AtMessage />
        {/* 背景 */}
        <Image className="bg" src={getData("bgcData") ? URL + getData("bgcData")[5].src : URL + '/love/bgc/bgc2.jpg'}></Image>
        {/* <Image className="bg" src={URL+'/'+'love/bgc/bgc2.jpg'}></Image> */}
      </View>
    )
  }
}