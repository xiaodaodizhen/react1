// 非受控组件

import React, { Component } from "react";
import ReactDom, { render } from "react-dom";
// 1.函数的方式：  
// class Form extends Component {
//   constructor() {
//     super();
//   }

//   componentDidMount() {
//     this.text.focus();
//   }

//   render() {
//     return (
//       <div>
//         {/*(input) => { this.text = input },参数input是整个输入框，相当于把整个输入框的dom赋值给了this.text*/}
//         {/* <input type="text" ref={(input) => { this.text = input }} /> */}
//       </div>
//     );
//   }
// }

// 2.Reat.createRef() （要求版本16.3+）
class Form extends Component {
  constructor() {
    super();
    this.text = React.createRef();
  }

  componentDidMount() {
    this.text.current.focus();
  }

  render() {
    return (
      <div>
      {/* 会自动的将当前的输入框,放到this.text.current(系统自带)上, */}
        <input type="text" ref={this.text} />
      </div>
    );
  }
}


render(<Form />, window.root);

/**
 * 非受控组件
 * 1. 可以操作dom,取得真实dom
 * 2.可以和第三方库结合
 * 3.不需要对当前输入的内容进行校验，也不需要默认值
 */