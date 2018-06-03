
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
    this.state = {};
  }

  render() {
    console.log("child:render");
    return (
      <div>
        {this.props.count}
        {this.state.a}
      </div>
    );
  }
  // 本方法代替以前的componentWillReceiveProps（默认不执行）方法，默认执行,,使用本方法，必须在constructor中初始化状态this.state={}
  static getDerivedStateFromProps() {// 静态属性，里面不能使用this
    console.log("child:getDerivedStateFromProps");
    // 本方法可以返回null，也可以返回一个对象,返回的结果会作为状态,更改的是this.state上的值，而不是参数的赋值对象this.props
    // return null;
    return { a: 1000 } // 如果this.state中已经有a属性，会覆盖原有的a属性的值，如果没有，会增加a属性
  }

  componentDidMount() {
    console.log("child:componentDidMount");
  }
  // ---如果父组件有更新重新渲染,子组件也会重新更新渲染,原因如果没有写这个生命周期,默认相当于返回true
  shouldComponentUpdate(nextProps, nextState) {
    console.log("child:shouldComponentUpdate");
    return true;
  }
  // 得到更新前的快照，一般不用此方法，此方法使用必须使用componentDidUpdate方法，
  getSnapshotBeforeUpdate() {
    console.log("child:getSnapshotBeforeUpdate");
    // return null;  返回值是null 或者对象
    return { b: 2 }
  }

  // 更新完成
  componentDidUpdate(prevProps, prevState, obj) { // 此处的obj参数，是getSnapshotBeforeUpdate方法的返回值
    console.log("child:this.componentDidUpdate");
  }

}



render(<LifeCycle />, window.root);

/**
 *组件中内置的this.props的值,是由 static defaultPorps 定义的默认值 和 构造函数中传参的props合并构成的. 
 */
