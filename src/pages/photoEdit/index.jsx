import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Icon, Button } from '@tarojs/components'
import { AtImagePicker, AtNavBar, AtToast, AtMessage } from 'taro-ui'
import { URL } from '../../service/api'
import { getData } from '../../utils/store'
import './index.scss'
export default class Index extends Component {
  /************数据初始化***************/
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      value: '',
      bid: '',
      files: []
    }
  }
  /************页面配置部分***************/
  config = {
    navigationBarTitleText: '上传照片'
  }

  /************生命周期函数部分***************/
  componentWillMount() {

  }

  componentDidMount() {
    let _this = this
    Taro.chooseImage({
      count: 36,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        let tempFilePaths = res.tempFilePaths
        let files = tempFilePaths.map(item => {
          return {
            url: item
          }
        })
        _this.setState({ files })
      },
      fail(res) {
        console.log(res);
      }
    })
  }

  componentWillUnmount() {
    Taro.navigateTo({
      url: '/pages/phono/index'
    })
  }

  componentDidShow() {
    console.log('componentDidShow');
  }

  componentDidHide() {
    this.setState({ files: [] })
  }

  /************自定义状态函数部分 ***************/
  onChange(files) {
    this.setState({ files })
  }
  onFail(mes) {
    console.log(mes)
  }
  onImageClick(index, file) {
    //图片预览
    Taro.previewImage({
      current: file.url, // 当前显示图片的http链接
      urls: this.state.files.map(item => {
        return item.url
      })
    })
  }

  uploadFile() {
    let files = this.state.files
    if (files.length !== 0) {
      let user = getData('user').login
      let count = 0
      this.setState({ isLoading: true })
      files.forEach((item, i) => {
        Taro.uploadFile({
          url: URL + '/zll/love/img/add',
          filePath: item.url,
          name: 'file',
          formData: {
            bid: getData('bid'),
            author: user.author,
            url: user.url,
            loveCode: getData('user').login.loveCode
          },
          success: res => {
            count = count + 1
            if (files.length == count) {
              let timeId = setTimeout(() => {
                this.setState({ isLoading: false })
                Taro.navigateTo({
                  url: '/pages/photoList/index'
                })
                clearTimeout(timeId)
              }, 800)
            }
          }
        })
      })
    } else {
      Taro.atMessage({
        message: '请先选择要上传的照片哦！',
        type: 'error',
      })
    }
    // let time = setInterval(() => {

    // }, 500)
  }
  beforePage() {
    Taro.navigateBack({
      delta: 1 // 返回上一级页面。
    });
  }
  /************视图部分***************/
  render() {
    let files = this.state.files;
    let isLoading = this.state.isLoading;
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
        <View>照片上传</View>
      </AtNavBar>
    }
    return (
      <View className='index'>
        {navBar}
        <View className='warp2'>
          <AtImagePicker
            mode='aspectFit'
            multiple
            count={12}
            files={files}
            onChange={this.onChange.bind(this)}
            onFail={this.onFail.bind(this)}
            onImageClick={this.onImageClick.bind(this)}
          />
          <View className='button'>
            <Button type='primary' onClick={this.uploadFile.bind(this)}>立即上传</Button>
          </View>
          <AtToast isOpened={isLoading} text="上传中..." duration={0} status='loading' hasMask></AtToast>
        </View>
        <AtMessage />
        {/* 背景 */}
        <Image className="bg" src={getData("bgcData") ? URL + getData("bgcData")[3].src : URL + '/love/bgc/bgc4.jpg'}></Image>
      </View>
    )
  }
}