
/**
 * 全局变量
 */
const globalData = {
    user: {name:'zll',url:'http://zhenglinglu.cn/_nuxt/img/ff5a451.jpg'}
}
export const setData = (key, val) => {
    globalData[key] = val
}
export const getData = key => {
    return globalData[key]
}

/**
 * 事件池(事件管理器)
 * 通过事件监听传值
 */
class Event {
    constructor() {
        this.events = {};
    }

    // 监听
    on = (eventName, callBack) => {
        if (this.events[eventName]) {
            // 存在事件
            this.events[eventName].push(callBack);
        } else {
            // 不存在事件
            this.events[eventName] = [callBack];
        }
    }

    // 触发
    emit = (eventName, params) => {
        if (this.events[eventName]) {
            this.events[eventName].map((callBack) => {
                callBack(params);
            })
        }
    }
}

export let event = new Event()

export let watch = event.on

export let emit = event.emit


