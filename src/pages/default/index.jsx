import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, Image } from '@tarojs/components'
import './index.scss'
import { setData, getData, emit } from '../../utils/store';
import { get } from '../../service/api'

import Child from './child'
const process = process.env.TARO_ENV;//运行环境
export default class Index extends Component {
  /************数据初始化***************/
  constructor(props) {
    super(props);
    this.state = {
      name: '0',
      text: 'qweqw',
      val: '',
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
    if (process === 'h5') {
      console.log('现在的运行环境是web端');
    } else {
      console.log('现在的运行环境是其他端');
    }
    console.log('componentWillMount-首页');
    // this.setState({ name: 'asda' })
  }

  componentDidMount() {
    get('/zll/article/list').then((e) => {
      console.log(e);
    }).catch((e) => {
      console.log(e);
    })
    // console.log(a);

    this.setState({ name: '2' }, () => {
      console.log(this.state.name);
      // 在这个函数内你可以拿到 setState 之后的值
    })
    console.log('componentDidMount-首页');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount-首页');
  }

  componentDidShow() {
    // get()
    console.log('componentDidShow-首页');
  }

  componentDidHide() {
    console.log('componentDidHide-首页');
  }

  componentWillUpdate() {
    console.log('componentWillUpdate-state数据将要更新-首页');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate-state数据已更新完-首页');
  }

  shouldComponentUpdate(oldVal, newVal) {
    console.log('shouldComponentUpdate-首页');
    /* oldVal更新之前的值  newVal更新之后的值 */
    // 检查setState是否进行render调用
    // 一般用来控制setState多次调用，提升render性能
    return true; //默认返回 true
  }

  componentWillReceiveProps(oldVal, newVal) {
    //父组件传递给子组件时才会执行
    console.log('componentWillReceiveProps-首页');
  }
  /************自定义状态函数部分 ***************/
  handleData(){
    emit('mark',{name:'qwe'})
  }
  handleData1(){
    emit('mark1',{name:'qwe111'})
  }
  // handleRouter(param,e) {
  //   console.log(param);//传过来的值
  //   console.log(e);//操作事件
  //   console.log(this); //需要使用bind进行绑定 例如：this.handleRouter.bind(this,param)
  // 阻止事件冒泡：e.stopPropagation()
  // }
  handleRouter = () => {
    // this.props.onChange()
    // 跳转到目的页面，打开新页面
    Taro.navigateTo({
      url: '/pages/default/page?id=1'
    })

    // 跳转到目的页面，在当前页面打开
    // Taro.redirectTo({
    //   url: 'pages/default/page'
    // })
  }
  // 跳转页面
  toPage() {
    console.log(Taro.getEnv(), Taro.ENV_TYPE);

    // if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
    //   Taro.navigateTo({
    //     url: '/pages/test1/index',
    //   })
    // } else {
    //   Taro.switchTab({
    //     url: '/pages/test1/index',
    //   })
    // }
  }
  testEvent = () => {
    this.setState({ val: '我是子组件传过来的值！' })
  }
  /************视图部分***************/
  render() {
    console.log('render-首页');
    return (
      <View className='index'>
        <Text className="text">首页</Text>
        <Button onClick={this.handleData}>数据监听</Button>
        <Button onClick={this.handleData1}>数据监听1</Button>
        <Button onClick={this.handleRouter}>跳转页面1</Button>
        <Button onClick={this.toPage}>测试跳转</Button>
        <Text>{this.state.val}</Text>
        <Child text={this.state.text} onTestEvent={this.testEvent}></Child>
        {/* <Image src={require("")}></Image> */}
      </View>
    )
  }
}

// 设置默认属性值
// Index.defaultProps = {
//   name: '0'
// }