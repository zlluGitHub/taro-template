import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'
import { getData } from '../../static/js/globle';
export default class Child extends Component {
  /************数据初始化***************/
  constructor(props) {
    super(props);
    this.state = {
      name: '0'
    };
  }
  data = {
    sex: '123'
  }

  /************页面配置部分***************/
  config = {
    navigationBarTitleText: '测试'
  }

  /************生命周期函数部分***************/
  componentWillMount() {
    console.log('componentWillMount-page');
    // this.setState({ name: 'asda' })
  }

  componentDidMount() {
    console.log(this.$router.params.id);
    console.log('componentDidMount-page');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount-page');
  }

  componentDidShow() {
    console.log('componentDidShow-page');
  }

  componentDidHide() {
    console.log('componentDidHide-page');
  }

  /************自定义状态函数部分 ***************/
  onChange = () => {
    // this.setState({ name: '2' }, () => {
    //   // 在这个函数内你可以拿到 setState 之后的值
    // })
  }

  /************视图部分***************/
  render() {
    console.log('componentDidHide-page-render');
    return (
      <View className='defaut'>
        <Text>page页面</Text>
      </View>
    )
  }
}