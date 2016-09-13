// 在js中引入css文件了
import './Hello.css';
// 在js中引入sass文件
import './Hello.scss';

import React, {Component} from 'react';

// 直接在js中定义样式，内嵌样式，样式要按照驼峰命名去定义
let style = {
    backgroundColor: 'blue'
}

export default class Hello extends Component {
    render() {
        return (
            <div>
                <h1 style={style}>你好fdf dfd  7期！</h1>
                <br/>
                <img/>
            </div>
        )
    }
}
