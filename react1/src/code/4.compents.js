/**
 * 组件---------------- 区分组件 和jsx元素----组件(名字首字母大写School)---jsx(首字母小写---school)
 * 1.函数组件
 *  1) 没有this,
 *  2) 没有生命周期
 *  3) 没有状态
 * 
 * 2. 类组件
 */

import React, { Component } from "react";
import { render } from "react-dom";

//-------------------------------------------------------------------------------------------函数组件---------------------------------

// 组件必须有返回值，返回值null 是合法的（undefined不行）
function School(props) {
  // return null;
  return <h1>{props.name}:{props.age}</h1>
}
// 组件可以通过属性进行传值<School name="xg" age="9"></School> ， 其实相当于School({name:'xg',age='9'})方法执行
// render(<School name="xg" age="9"></School>, window.root);



//-------------------------------------------------------------------------------------------类组件------------------------------------

//（react可以根据更改来渲染部分页面，不是全部页面，  domdiff）
// 组件要继承React组件，因为React封装了好多方法。


class Clock extends Component {
  constructor(props) {
    super();
    this.state = { date: new Date().toLocaleString(), name: props.name }
  }
  // 如果用类组件需要提供一个render方法
  render() {
    return (
      <React.Fragment>
        <p>时间是：{this.state.date}</p>
        <p>姓名是：{this.state.name}</p>
      </React.Fragment>
    )
  }
  // 组件渲染完成后会调用这个生命周期
  componentDidMount() {
    setInterval(() => {
      // 重新设置新值，只会覆盖重新设置的（date）值，不会覆盖没有重新设置的（name）
      this.setState({ date: new Date().toLocaleString() });
    }, 1000);
  }
}
render(<Clock name="zf" />, window.root);

