// import React from "react";
// import { render } from "react-dom";

// jsx语法，javascript 和xml 的集合体,facebook 发明的
// let ele = (
//   <h1 className="go">
//     <span>dddd</span>hello
//   </h1>
// )

// 转换为
// var ele = React.createElement(
//   "h1",
//   { className: "go" },
//   React.createElement(
//     "span",
//     null,
//     "dddd"
//   ),
//   "hello"
// );

// 在转换为对象
// let obj = {
//   type: 'h1',
//   props: {
//     className: "go",
//     children: [
//       { type: 'span', props: { children: 'dddd' } },
//       "hello"
//     ]
//   }
// }

// ----------------------------------------------------------------备注：先将 jsx 语法转换为crateElement格式，在转换成对象obj---》 render 方法渲染
// render(ele, document.getElementById('root'));





// ----------------------------------------------- 实现 React.createElement  转换为对象obj 内部实现源码-----------------------


class Element {
  constructor(type, props) {
    this.type = type;
    this.props = props;
  }
}

let React = {
  createElement(type, props, ...children) {// ...children 剩余参数
    if (children.length === 1) {
      children = children[0];
    }
    return new Element(type, { ...props, children }); // ...props 对象结构， 将props 对象放到 新对象中  -----例如{ className: "go" }  放到新对象中 { className: "go" ,children:children}
  }
}

var ele = React.createElement( //  -------用这个来测试下
  "h1",
  { className: "go" },
  React.createElement(
    "span",
    null,
    "dddd" 
  ),
  "hello"                                                    
);



// ----------------------------------------------- 实现  render 方法渲染-------------------------

function render(eleObj, container) {
  // console.log(ele);  // 可以打印出ele的属性和值
  let { type, props } = eleObj; // type 是html 标签
  // 创建 了一个标签
  let ele = document.createElement(type);
  for (let key in props) {
    if (key !== "children") { // 不是children说明是标签属性
      //   <h1 className="go"> 因为页面中添加样式属性不能用class ,而是用className ，标签其他属性不受影响，同html书写方式
      //     <span>dddd</span>hello
      //   </h1>
      if (key === "className") {//所以解析的时候判断下是不是className,如果是就需要给class赋值
        ele.setAttribute('class', props[key]);
      } else {
        ele.setAttribute(key, props[key]);
      }
    } else { // 子元素
      let children = props[key];
      if (Array.isArray(children)) { // children:["文本节点","标签节点"]
        // 数组
        children.forEach((e) => {
          if (e instanceof Element) { // 标签节点
            render(e, ele);
          } else { // 文本节点
            ele.appendChild(document.createTextNode(e));
          }
        });
      } else {  // children:"这是文本节点，或标签节点"
        if (children instanceof Element) { // 标签节点
          render(children, ele);
        } else { // 文本节点
          ele.appendChild(document.createTextNode(children));
        }
      }
    }
  }
  //并添加到页面  
  container.appendChild(ele);
}

render(ele, document.getElementById('root'));  // ------------可以用这个来测试下