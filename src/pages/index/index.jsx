import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { watch ,getData} from '../../utils/store'
import LoginPage from '../login/index.jsx'
import MainPage from '../home/index.jsx'
export default class Main extends Component {
  /************数据初始化***************/
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true
    };
  }

  componentDidMount() {
    let _this = this
    this.isLogin()
    watch('isLogin', (e) => {
      _this.isLogin()
    });
  }
  isLogin() {
    let _this = this
    if (getData('isLogin') == 'yes') {
      _this.setState({ isLogin: false })
    } else {
      _this.setState({ isLogin: true })
    }
  }
  render() {
    return (
      <View>
        {/* <MainPage /> */}
        {this.state.isLogin ? <LoginPage /> : <MainPage />}
      </View>
    )
  }
}