import{l as m,b as h,c as o,d as n,F as c,m as f,e,t as d,w as g,p as k,g as v,q as C}from"./index-BgZp6ebe.js";const L={class:"todoList_label"},b=["onUpdate:modelValue","onClick"],w=["onClick"],x={class:"todoList_statistics"},B={__name:"AllTodo",props:["todoList","doneCount"],emits:["delTodo","toggleStatus"],setup(a,{emit:r}){const u=a,i=r,p=m(()=>u.todoList.filter(l=>!l.status).length||0);return(l,V)=>{const _=h("font-awesome-icon");return o(),n(c,null,[(o(!0),n(c,null,f(a.todoList,t=>(o(),n("li",{key:t.id},[e("label",L,[g(e("input",{class:"todoList_input",type:"checkbox","onUpdate:modelValue":s=>t.status=s,onClick:s=>i("toggleStatus",t.id)},null,8,b),[[k,t.status]]),e("span",null,d(t.content),1)]),e("a",{href:"#",onClick:C(s=>i("delTodo",t.id),["prevent"])},[v(_,{icon:["fas","times"]})],8,w)]))),128)),e("div",x,[e("p",null,d(p.value)+" 個待完成項目",1)])],64)}}};export{B as default};
