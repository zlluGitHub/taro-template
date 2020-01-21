import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'
import { getData } from '../../utils/store';
import { watch } from '../../utils/store';
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
    navigationBarTitleText: '首页'
  }

  /************生命周期函数部分***************/
  componentWillMount() {
    // const abc = this.$router.params.abc
    // this.setState({
    //   abc
    // })
    console.log('componentWillMount-子组件');
    // this.setState({ name: 'asda' })
  }

  componentDidMount() {
    watch('mark',e=>{
      console.log(e);
    })
    watch('mark1',e=>{
      console.log(e);
    })
    console.log('componentDidMount-子组件');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount-子组件');
  }

  componentDidShow() {
    console.log('componentDidShow-子组件');
  }

  componentDidHide() {
    setData('test', 1);
    console.log(getData('test'));
    console.log('componentDidHide-子组件');
  }

  componentWillReceiveProps(oldVal, newVal) {
    //父组件传递给子组件时才会执行
    console.log('componentWillReceiveProps-首页');

  }
  /************自定义状态函数部分 ***************/
  onChange = () => {
    this.setState({ name: '2' }, () => {
      // 在这个函数内你可以拿到 setState 之后的值
    })
  }
  handleEmit = () => {
    this.props.onTestEvent()
  }
  /************视图部分***************/
  render() {
    console.log('componentDidHide-子组件-render');
    let { text } = this.props;
    return (
      <View className='defaut'>
        {/* <Button openType="share" className="share-btn">
        <Text className="kzw-iconfont g-block share-icon">&#xe716;</Text>
    </Button> */}
        <h4>我是子组件</h4>
        <Text>父组件传过来的值：{text}</Text>
        <Button onClick={this.handleEmit}>向父组件传值</Button>
        {/* <Text onClick={this.onChange}>{this.state.name}</Text> */}
        {/* <Text>{this.data.sex}</Text> */}
      </View>
    )
  }
}