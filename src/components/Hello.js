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
    constructor(props){
        super(props);
        console.log("构造函数");
        // 初始化了我们的state，这是被推荐的写法
        this.state = {
            props1:"初始化state"
        };
    }

    componentDidMount(){
        var func=this;
        setTimeout(function(){
            // 你只能用setState的方法去修改状态值
            func.setState({props1:"我在事件中修改的数据"})
        },3000)

    }

    render() {
        // 约定大于配置，如果你这样直接赋值就破坏了react中的单向数据流
        //this.state.props1="我修改了数据"
        return (
            <div>
                {/*这是我们的注释*/}
                <h1 style={style}>{this.state.props1}</h1>
                <br/>
                <img/>
            </div>
        )
    }
}
