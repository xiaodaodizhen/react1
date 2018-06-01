import React from "react";
import { render } from "react-dom";

/**
 * jsx 和html 写法的区别（部分标注在以下代码中）
 * jsx 元素可以嵌套
 * jsx里可以放js,区分是否是js根据{}
 * dangerouslyySetInnerHTML 会导致xss攻击
 */

let css = { background: 'red' };
let age = 9;
let name = "xg";
let ele = (
  // 第一级相邻的react元素，不能不被包裹使用，必须加一层嵌套
  <React.Fragment>
    {/* htmlFor代替普通html中的for */}
    <label htmlFor="bd">获取label看效果</label>
    <input id="bd" type="radio"/>

    {/* 添加类样式用className而不是class */}
    <h1 className="go">
      <span>dddd</span>hello
    </h1>
    <div>
      {/* style样式可以放一个变了，也可以直接放一个对象，但是得用{}包裹，大{}内部写的是js内容，，，，本行的样式，是注释 */}
      <p style={css}>{name}:{age}</p>
      <p style={{ background: 'red' }}></p>
    </div>
    <div dangerouslyySetInnerHTML={{ _html: "<h1>nihao</h1>" }}></div>
  </React.Fragment>
)
render(ele, document.getElementById('root'));