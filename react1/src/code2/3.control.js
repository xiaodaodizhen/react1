//受控组件和非受控组件----区别state
// 指的都是表单元素

import React, { Component } from "react";
import ReactDom, { render } from "react-dom";

// 受控组件，通过state来控制----------好处：可以对输入进行监控，可以对表单进行默认操作
class Form extends Component {
  constructor() {
    super();
    this.state = { content: 'hello', age: 9 };
  }

  handleSubmit = (e) => { // e是事件源，经过react封装
    e.preventDefault();//指的是提交表单事件
  }

  // 更改状态，刷新视图
  handleChange = (e) => {
    let name = e.target.name;
    this.setState({ [name]: e.target.value }); // 取事件源的值
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/* 双向数据绑定 */}
        {/* react默认先将状态绑定到视图上，状态不变视图就不会刷新 */}
        <input type="text"
          required={true}
          value={this.state.content}
          onChange={this.handleChange}
          name="content"
        />
        <input type="text"
          required={true}
          value={this.state.age}
          onChange={this.handleChange}
          name="age"
        />
        <input type="submit" />
      </form>
    );
  }
}


render(<Form />, window.root);
