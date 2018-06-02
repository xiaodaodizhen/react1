import React, { Component } from "react";
import ReactDom, { render } from "react-dom";
import PropTypes from "prop-types";
class Person extends Component {
  constructor(props) {
    super();
  }
  // 静态属性-es7----校验功能只是提示，不能中断页面渲染
  static propTypes = { // propTypes 名字不能改变，改变后失效--------------------------？？？？不知是不是内部处理
    name: PropTypes.string.isRequired,// 数据类型.必填
    age: PropTypes.number,
    gender: PropTypes.oneOf(["男", "女"]),
    hobby: PropTypes.array,
    salary: function (props, key, com) { // ------------------------props, key, com这三个参数是不是自动传入？？？？？？？？？？？？？？？，本方法自动调用？？？？？？？？？
      if (props[key] < 2000) {
        console.log(`${key} 不能小于 ${props[key]}`);
      }
    },
    pos: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    })
  };

  //类组件传参的props，会挂在到this.props
  render() {
    let { name, age } = this.props;
    return (

      <React.Fragment>
        <p>name:{name}</p>
        <p>age:{age}</p>
      </React.Fragment>
    );
  };
}

let preson = {
  name: 'xd',
  age: 12,
  gender: '男',
  salary: 1000,
  hobby: ['shopping'],
  pos: {
    x: 10,
    y: 20
  }
};

render(<Person {...preson} />, window.root);