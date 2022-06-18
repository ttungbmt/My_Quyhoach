"use strict";(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[983],{89983:function(e,n,t){t.r(n),t.d(n,{default:function(){return B}});var a=t(29439),r=t(88391),s=t(1413),i=t(45987),l=t(78886),c=t(38979),d=t(15866),o=t(95639),h=t(71027),u=t(23107),m=t(56240),x=t(99498),p=t(92182),j=t(72369),f=t(77410),g=(t(26640),t(63387),t(14361)),b=t(44140),v=t(23712),Z=["fields"],y=g.Ry().shape({ma_tp:g.Z_().required("B\u1eaft bu\u1ed9c ch\u1ecdn th\xf4ng tin T\u1ec9nh/TP")});function N(e){var n=e.index,t=e.actions,s=(0,r.useState)(null),i=(0,a.Z)(s,2),l=i[0],c=i[1],u=Boolean(l),m=function(){return c(null)};return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(d.Z,{size:"small",onClick:function(e){return c(e.currentTarget)},children:(0,v.jsx)(j.Z,{})}),(0,v.jsxs)(o.Z,{anchorEl:l,open:u,onClose:m,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},children:[(0,v.jsxs)(h.Z,{onClick:function(){m(),t.insert(n,{x:"",y:""})},children:[(0,v.jsx)("i",{className:"fa-solid fa-circle-plus text-blue mr-10 text-[20px]"})," Th\xeam d\xf2ng tr\xean"]}),(0,v.jsxs)(h.Z,{onClick:function(){m(),t.remove(n)},children:[(0,v.jsx)("i",{className:"fa-solid fa-circle-trash text-red mr-10 text-[20px]"})," X\xf3a d\xf2ng n\xe0y"]}),(0,v.jsxs)(h.Z,{onClick:function(){m(),t.insert(n+1,{x:"",y:""})},children:[(0,v.jsx)("i",{className:"fa-solid fa-circle-plus text-green mr-10 text-[20px]"})," Th\xeam d\xf2ng d\u01b0\u1edbi"]})]})]})}var T=function(){var e=(0,f.Z)("getThuadatByCoords"),n=(0,l.cI)({defaultValues:{toados:[{x:"",y:""},{x:"",y:""},{x:"",y:""},{x:"",y:""}]},resolver:(0,b.X)(y)}),t=n.control,a=n.handleSubmit,r=n.reset,d=(0,l.Dq)({control:t,name:"toados"}),o=d.fields,h=(0,i.Z)(d,Z);return(0,v.jsx)("div",{className:"m-12",children:(0,v.jsx)(l.RV,(0,s.Z)((0,s.Z)({},n),{},{children:(0,v.jsxs)("form",{onSubmit:a(e),children:[(0,v.jsxs)(u.Z,{spacing:2,children:[(0,v.jsx)(p.Z,{severity:"warning",className:"text-sm flex items-center",children:"S\u1eed d\u1ee5ng h\u1ec7 t\u1ecda \u0111\u1ed9 Qu\u1ed1c gia VN2000 \u0111\u1ec3 t\xecm ki\u1ebfm"}),(0,v.jsx)(c.wg,{name:"ma_tp",label:"T\u1ec9nh/ TP",url:"/api/dir/hc-tinh",queryKey:"dirTinhTp"}),(0,v.jsxs)("table",{className:"mx-12",children:[(0,v.jsx)("thead",{children:(0,v.jsxs)("tr",{children:[(0,v.jsx)("th",{className:"font-medium pr-12",children:"#"}),(0,v.jsx)("th",{className:"font-medium",children:"T\u1ecda \u0111\u1ed9 X"}),(0,v.jsx)("th",{className:"font-medium",children:"T\u1ecda \u0111\u1ed9 Y"}),(0,v.jsx)("th",{})]})}),(0,v.jsx)("tbody",{children:o.map((function(e,n){return(0,v.jsxs)("tr",{children:[(0,v.jsx)("td",{className:"w-24 pr-12 pt-8",children:(0,v.jsx)("div",{className:"rounded-full bg-blue-400 text-white p-6 text-xs flex items-center justify-center w-20 h-20",children:n+1})}),(0,v.jsx)("td",{className:"px-8 pt-8",children:(0,v.jsx)(c.nv,{type:"number",name:"toados.".concat(n,".x"),variant:"standard",placeholder:"1199748.84"})}),(0,v.jsx)("td",{className:"px-8 pt-8",children:(0,v.jsx)(c.nv,{type:"number",name:"toados.".concat(n,".y"),variant:"standard",placeholder:"611245.93"})}),(0,v.jsx)("td",{className:"pt-8",children:(0,v.jsx)(N,{index:n,actions:h})})]},e.id)}))})]}),(0,v.jsxs)(m.Z,{className:"flex justify-center gap-12",children:[(0,v.jsx)(x.Z,{color:"secondary",variant:"outlined",onClick:function(){return r()},children:"Nh\u1eadp l\u1ea1i"}),(0,v.jsx)(x.Z,{color:"primary",variant:"outlined",type:"submit",children:"T\xecm ki\u1ebfm"})]})]}),(0,v.jsx)(c.oj,{form:"toadoForm"})]})}))})},_=g.Ry().shape({ma_tp:g.Z_().required("B\u1eaft bu\u1ed9c ch\u1ecdn th\xf4ng tin T\u1ec9nh/TP"),ma_qh:g.Z_().required("B\u1eaft bu\u1ed9c ch\u1ecdn th\xf4ng tin Qu\u1eadn/Huy\u1ec7n"),ma_px:g.Z_().required("B\u1eaft bu\u1ed9c ch\u1ecdn th\xf4ng tin Ph\u01b0\u1eddng/X\xe3"),sothua:g.Z_().required("B\u1eaft bu\u1ed9c nh\u1eadp th\xf4ng tin s\u1ed1 th\u1eeda"),soto:g.Z_().required("B\u1eaft bu\u1ed9c nh\u1eadp th\xf4ng tin s\u1ed1 t\u1edd")});var q=function(){var e=(0,f.Z)("getThuadatByInfo"),n=(0,l.cI)({defaultValues:{},resolver:(0,b.X)(_)}),t=n.reset,a=n.handleSubmit;return(0,v.jsx)("div",{className:"p-12",children:(0,v.jsxs)(l.RV,(0,s.Z)((0,s.Z)({},n),{},{children:[(0,v.jsx)("form",{className:"mt-12",onSubmit:a(e),children:(0,v.jsxs)(u.Z,{spacing:1.5,children:[(0,v.jsx)(c.wg,{name:"ma_tp",label:"T\u1ec9nh/ TP",url:"/api/dir/hc-tinh",queryKey:"dirTinhTp"}),(0,v.jsx)(c.wg,{name:"ma_qh",label:"Qu\u1eadn huy\u1ec7n",url:"/api/dir/hc-quan?ma_tp={ma_tp}",depends:["ma_tp"]}),(0,v.jsx)(c.wg,{name:"ma_px",label:"Ph\u01b0\u1eddng x\xe3",url:"/api/dir/hc-phuong?ma_qh={ma_qh}",depends:["ma_qh"]}),(0,v.jsxs)("div",{className:"grid grid-cols-2 gap-12",children:[(0,v.jsx)(c.nv,{name:"sothua",label:"S\u1ed1 th\u1eeda \u0111\u1ea5t"}),(0,v.jsx)(c.nv,{name:"soto",label:"S\u1ed1 t\u1edd b\u1ea3n \u0111\u1ed3"})]}),(0,v.jsxs)(m.Z,{className:"flex justify-center gap-12 pt-12",children:[(0,v.jsx)(x.Z,{color:"secondary",variant:"outlined",onClick:function(){return t()},children:"Nh\u1eadp l\u1ea1i"}),(0,v.jsx)(x.Z,{color:"primary",variant:"outlined",type:"submit",children:"T\xecm ki\u1ebfm"})]})]})}),(0,v.jsx)(c.oj,{form:"sothuaForm"})]}))})},k=t(30817),w=t(45681),C=t(16785);var B=function(){var e=(0,f.Z)("tabIndex, setTabIndex"),n=(0,a.Z)(e,2),t=n[0],r=n[1],s=[{label:"T\u1ecda \u0111\u1ed9",content:T},{label:"S\u1ed1 th\u1eeda \u0111\u1ea5t",content:q}];return(0,v.jsx)(C.Z,{title:"T\xecm ki\u1ebfm th\u1eeda \u0111\u1ea5t",content:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(k.Z,{value:t,onChange:function(e,n){return r(n)},variant:"fullWidth",className:"border-b",children:s.map((function(e,n){var t=e.label;return(0,v.jsx)(w.Z,{className:"text-14 min-w-64 mx-4 px-12",label:t},n)}))}),(0,v.jsx)("div",{children:s.map((function(e,n){var a=e.content;return t===n&&(0,v.jsx)(a,{},n)}))})]})})}},72369:function(e,n,t){var a=t(95318);n.Z=void 0;var r=a(t(15145)),s=t(23712),i=(0,r.default)((0,s.jsx)("path",{d:"M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreVert");n.Z=i}}]);