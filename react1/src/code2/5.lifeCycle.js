
import React, { Component } from "react";
import ReactDom, { render } from "react-dom";

// 生命周期是同步执行
class LifeCycle extends Component {
  //定义this.props 的默认值,,defaultProps名字固定,不能随意更改
  static defaultProps = {
    name: 'xg'
  };
  // 构造函数的参数props 其实是this.props
  constructor(props) {
    // 虽然props 实质上就是本组件的this.props 但是在构造内部,不能使用this.props,只能使用props
    super();
    this.state = { name: props.name, count: 0 };
  }

  handleAdd = () => {
    // this.setState({ count: 0 });  本代码是为了配合shouldComponentUpdate 体现代码优化效果
    this.setState({ count: this.state.count + 1 });
  }

  componentDidMount() {
    console.log("father:componentDidMount");
  }
  // 能够更新   :shouldComponentUpdate 可以做优化
  shouldComponentUpdate(nextProps, nextState) {// 如果没有写这个生命周期,默认相当于返回true
    console.log("father:shouldComponentUpdate");
    if (nextState.count === this.state.count) { // 代码优化,如果值没有改变返回false ,不会重新渲染
      return false;
    }
    return true;
  }
  // 将要更新   :本方法其实没啥用,已经被弃用, 版本16.3又增加了一个新方法,代替他
  // shouldComponentUpdate 方法返回true,执行本方法
  componentWillUpdate() {
    console.log("father:componentWillUpdate");
  }
  // 更新完成
  componentDidUpdate() {
    console.log("father:this.componentDidUpdate");
  }


  render() {
    console.log('father:render');
    return (
      <div>
        {this.props.name}
        {this.state.name}
        <p>点赞数:{this.state.count}</p>
        <p onClick={this.handleAdd}>点赞</p>
        <div>
          <Child count={this.state.count} />
        </div>
      </div>
    );
  }



}




// 子组件
class Child extends Component {
  constructor() {
    super();
  }
  componentWillMount() {
    console.log("child:componentWillMount");
  }

  render() {
    console.log("child:render");
    return (
      <div>
        {this.props.count}
      </div>
    );
  }

  componentDidMount() {
    console.log("child:componentDidMount");
  }
  // ---如果父组件有更新重新渲染,子组件也会重新更新渲染,原因如果没有写这个生命周期,默认相当于返回true
  shouldComponentUpdate(nextProps, nextState) {
    console.log("child:shouldComponentUpdate");
    return true;
  }
  // shouldComponentUpdate 方法返回true,执行本方法
  componentWillUpdate() {
    console.log("child:componentWillUpdate");
  }
  // 更新完成
  componentDidUpdate() {
    console.log("child:this.componentDidUpdate");
  }
  // 16.3以后的版本更新了此方法,改了名字----------接受到了新的参数执行完此方法才会执行render方法
  componentWillReceiveProps(newProps) {// 此方法中可以调用setState()方法进行更新,其他的不行
    console.log("child:componentWillReceiveProps");
  }
}



render(<LifeCycle />, window.root);

/**
 *组件中内置的this.props的值,是由 static defaultPorps 定义的默认值 和 构造函数中传参的props合并构成的. 
 */
