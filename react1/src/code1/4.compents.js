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
import ReactDom, { render } from "react-dom";

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
    this.state = { date: new Date().toLocaleString(), name: props.name };
    // this.handleClick = this.handleClick.bind(this);
  }
  // 组件渲染完成后会调用这个生命周期
  componentDidMount() {
    this.timer = setInterval(() => {
      // 重新设置新值，只会覆盖重新设置的（date）值，不会覆盖没有重新设置的（name）,可以更新页面
      this.setState({ date: new Date().toLocaleString() });
    }, 1000);
  }

  //卸载组件-------写在组件后要清除定时器，和绑定的方法---------------------------------------？？？？？？？？？？？？？？不能调用
  componentWillUnMount() {
    console.log(2);
    clearInterval(this.timer);
  }
  /**
   * 绑定函数方法的几种方法，（这几种方法主要解决函数中的this问题）-----3. 4 是官方推荐
   * 1.绑定时使用箭头函数 :    <p onClick={()=>{this.handleClick()}}>时间是：{this.state.date}</p>
   * 2. bind  :  <p onClick={this.handleClick.bind(this)}>时间是：{this.state.date}</p>
   * 3. 在构造函数中绑定this :    this.handleClick= this.handleClick.bind(this);
   * 4. es7语法，定义函数的时候使用箭头函数
   * 
   * handleClick=()=>{
        console.log();
      }
      标签中使用: <p onClick={this.handleClick}>时间是：{this.state.date}</p>
   */

  // handleClick() {
  //   console.log(this);
  // }
  handleClick = () => {
    ReactDom.unmountComponentAtNode(document.querySelector("#root"));
  }
  // 如果用类组件需要提供一个render方法
  render() {
    return (
      <React.Fragment>
        <p onClick={this.handleClick}>时间是：{this.state.date}</p>
        <p>姓名是：{this.state.name}</p>
      </React.Fragment>
    )
  }

}
render(<Clock name="zf" />, window.root);


/*
 * 组件的两个数据源，都可以导致页面刷新
 * 1.props(外部传入)：具有可读性，和不变性，只能通过外部传入的新的props来重新渲染组件。否则子组件的props 以及展现形式不会边
 * 2.state(自己特有)：数据状态，可以被修改,是组件的私有属性，不能被外部访问和修改，是通过setState()
 * 
 * 备注：setState 是通过enqueueUpdate 方法来更新数据的
 */