
/**
 * 全局变量
 */
const globalData = {
    user: {
        login: {
            author: "香香",
            bid: "1314",
            loveCode: "5201314",
            name: "我",
            password: "5201314",
            "describe": "俺不也多发，问我非常",
            time: "2020-02-15 13:14:02",
            url: "http://localhost:3000/love/users/nan.png"
        },
        partner: {
            "author": "韦茹月",
            "url": "http://localhost:3000/love/users/nv.png",
            "name": "宝贝",
            "password": "5201314",
            "loveCode": "5201314",
            "describe": "俺不也多发，问我非常",
            "time": "2020-02-15 13:14:02",
            "bid": "520"
        },
        startTime:'2019-07-14'
    }
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


