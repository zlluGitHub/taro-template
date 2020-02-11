import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './loading.scss'
export default class Loading extends Taro.Component {
  constructor() {
    super(...arguments)
    this.state = {}
  }

  render() {
    return (
      <View className='loading'>
        <View className="back"></View>
        <View className="love"></View>
        <View className="love-1"></View>
        <View className="love-2"></View>
      </View>
    )
  }
}