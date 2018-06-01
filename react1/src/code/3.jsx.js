import React from "react";
import { render } from "react-dom";
//----------------------------------------------------------------------------render(方法，容器)
// let age = 9;
// let name = 'dd';
// function sh(age, name) {
//   return <div>{name}:{age}</div> 
// }
// render(sh(age, name), window.root);


//------------------------------------------------------------------------------------render(数组，容器)
// let dinner = ['汉堡', '薯条', '可乐'];

// // 渲染列表要使用map, foreach不能使用，因为没有返回值
// let el = dinner.map((e, index) => (
//   <li key={index}>{e}</li>
// ));
// // el 是三个平级的li,并且在最外层，但是此处不需要<React.Fragment>标签进行包裹，---原因：数组可以直接渲染到页面上
// render(el, window.root);