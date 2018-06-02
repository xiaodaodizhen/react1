
import React, { Component } from "react";
import ReactDom, { render } from "react-dom";

class Counter extends Component {
  constructor(props) {
    super();
    this.state = { count: 0 };
  }

  handleClick = () => {
    // setState不足：多个状态可以批量更新，虽然调用了多次setState 但是的count值不是执行一次setState更新一次，而是等setState都执行完成后，才在handleClick方法执行前的this.state.count 的基础上更新数据最后更新页面。
    // this.setState({ count: this.state.count + 1 });
    // this.setState({ count: this.state.count + 1 });

    // 解决setState批量更新的问题,更新的下一次状态依赖于上一次的状态，要用函数表达式的方案。
    this.setState(st => ({ count: st.count + 1 }));// st 参数，代表上一次的状态this.state
    this.setState(st => ({ count: st.count + 1 }));

    // 还有另一种方式,写法比较啰嗦，不推荐，
    // this.setState({ count: this.state.count + 1 }, () => {
    //   this.setState({ count: this.state.count + 1 });
    // })
  }

  render() {
    return (
      <div>
        <p>计数器：{this.state.count}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  };
}

render(<Counter />, window.root);