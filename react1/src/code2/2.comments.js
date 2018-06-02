import React, { Component } from "react";
import ReactDom, { render } from "react-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css"; //路径写全，不然找到的是js

// 父组件
class Comments extends Component {
  constructor(props) {
    super();
    this.state = { comments: [], count: 0 };
  }

  // 增加喜欢数量，传给子组件的方法
  handleAdd = (count) => {
    console.log(count);
    this.setState({ count: this.state.count + 1 });
  }

  // 页面渲染完成过后
  async componentDidMount() {
    // axios返回的是一个promise 对象，所以前面可以加await ，返回的对象{data: Array(3), status: 200, statusText: "OK", headers: {…}, config: {…}, …}
    let { data: comments } = await axios.get("/user.json"); // {data:comments}    取axios 返回对象的data属性(对象解构)，更名为 comments
    this.setState({ comments });// this.setState({ comments:comments })----对象key和key的值的变量名相等，可以简写
  }

  render() {
    // 采用组件通讯的第一种方式《属性传值》
    let arr = this.state.comments.map((item, index) => (<List key={index} index={index} {...item} parent={this.handleAdd}></List>));
    return (
      <div className="container">
        {arr}
        <Total count={this.state.count}></Total>
      </div> // 方法一：引用遍历结果
      // <div>{this.state.comments.map((item, index) => (<List key={index} index={index}></List>))}</div>  // 方法二：直接在{}中进行遍历
    );
  };
}

// 子组件
class List extends Component {
  render() {
    let { avatar, userName, content } = this.props;
    return (
      <div className="media">
        <div className="media-left">
          <img src={avatar} width="100px" height="100px" />
        </div>
        <div className="media-body">
          <h4>{userName}</h4>
          <p>
            {content}
          </p>
          {/* this.props.parent 方法传参，this.props.parent.bind(this,2) */}
          <button className="btn btn-danger" onClick={this.props.parent}>喜欢</button>
        </div>
      </div>
    );
  }
}


// 子组件
class Total extends Component {
  render() {
    return (<div>喜欢数量：{this.props.count}</div>);
  }
}

render(<Comments />, window.root);

/**
 * 组件通信方法
 * 1.通过属性传值，父-》子-》孙   ----  特点：单项数据流，只能父亲往下传，但是孙子和儿子不能改父亲的属性值
 * 2.父子通信 父亲写好一个方法，传递给子组件，子组件调用这个方法，相当于调用了父类的方法，这个方法中可以去更改状态。
 * 3.同级数据传递， 通过共同的父级，如果没有父级，就创造个父级。
 */