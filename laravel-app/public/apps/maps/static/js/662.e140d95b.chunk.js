"use strict";(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[662],{59464:function(e,t,n){n.d(t,{Z:function(){return g}});var o=n(81087),i=n(88391),r=n(26294),a=n(15866),l=n(5784),s=n(40099),c=(n(9893),n(33163)),d=n(23712),u=(0,o.ZP)("div")((function(e){e.theme,e.config;return{minHeight:75,background:"url(/images/backgrounds/map_1.png) no-repeat 150px 0 #ffffff",borderBottom:"1px solid rgba(0,0,0,0.07)",display:"flex",padding:"10px 10px 10px 20px",alignItems:"center",justifyContent:"space-between",".site-logo":{height:50}}}));function f(e){var t=e.back,n=e.title,o=(0,s.TH)(),i=(0,r.O)("NAME"),f=n;return o.pathname===(0,r.O)("HOMEPAGE")&&(i=n,f=(0,r.O)("NAME")),(0,d.jsxs)(u,{children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{className:"site-nagigation",children:t&&(0,d.jsx)(a.Z,{size:"medium",onClick:function(){return l.Z.goBack()},children:(0,d.jsx)("i",{className:"fal fa-long-arrow-left text-[15px]"})})}),(0,d.jsxs)("div",{className:"flex gap-10",children:[(0,d.jsx)("img",{className:"site-logo",src:(0,r.O)("LOGO"),alt:"Logo"}),(0,d.jsxs)("div",{className:"flex flex-col uppercase gap-2",children:[(0,d.jsx)("div",{className:"site-name color-font text-2xl font-semibold",children:f}),n&&(0,d.jsxs)("div",{className:"site-title text-blue-500 text-[11px] font-semibold",children:["> ",i]})]})]})]}),(0,d.jsx)(c.Z,{className:"w-40 h-40 p-0"})]})}var m=(0,i.memo)(f),p=n(86281),h=(0,o.ZP)("div")((function(e){e.theme,e.config;return{}}));function x(e){var t=e.title,n=(e.header,e.contentToolbar),o=e.content;return(0,d.jsxs)(h,{className:"flex flex-col h-full",children:[(0,d.jsx)(m,{title:t}),n&&n,(0,d.jsx)(p.Z,{className:"flex-1 overflow-auto bg-white",children:o&&o})]})}var g=(0,i.memo)(x)},32662:function(e,t,n){n.r(t),n.d(t,{default:function(){return I}});var o=n(59464),i=n(87462),r=n(88391),a=n(4942),l=n(63366),s=n(29595),c=n(51141),d=n(76677),u=n(81087),f=n(17344),m=n(78641),p=n(56617),h=n(84922);function x(e){return(0,h.Z)("MuiAlert",e)}var g,v=(0,n(35639).Z)("MuiAlert",["root","action","icon","message","filled","filledSuccess","filledInfo","filledWarning","filledError","outlined","outlinedSuccess","outlinedInfo","outlinedWarning","outlinedError","standard","standardSuccess","standardInfo","standardWarning","standardError"]),j=n(15866),Z=n(75918),M=n(23712),A=(0,Z.Z)((0,M.jsx)("path",{d:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"}),"SuccessOutlined"),b=(0,Z.Z)((0,M.jsx)("path",{d:"M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"}),"ReportProblemOutlined"),C=(0,Z.Z)((0,M.jsx)("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"ErrorOutline"),N=(0,Z.Z)((0,M.jsx)("path",{d:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"}),"InfoOutlined"),k=(0,Z.Z)((0,M.jsx)("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close"),w=["action","children","className","closeText","color","icon","iconMapping","onClose","role","severity","variant"],y=(0,u.ZP)(p.Z,{name:"MuiAlert",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t[n.variant],t["".concat(n.variant).concat((0,m.Z)(n.color||n.severity))]]}})((function(e){var t=e.theme,n=e.ownerState,o="light"===t.palette.mode?d._j:d.$n,r="light"===t.palette.mode?d.$n:d._j,l=n.color||n.severity;return(0,i.Z)({},t.typography.body2,{backgroundColor:"transparent",display:"flex",padding:"6px 16px"},l&&"standard"===n.variant&&(0,a.Z)({color:o(t.palette[l].light,.6),backgroundColor:r(t.palette[l].light,.9)},"& .".concat(v.icon),{color:"dark"===t.palette.mode?t.palette[l].main:t.palette[l].light}),l&&"outlined"===n.variant&&(0,a.Z)({color:o(t.palette[l].light,.6),border:"1px solid ".concat(t.palette[l].light)},"& .".concat(v.icon),{color:"dark"===t.palette.mode?t.palette[l].main:t.palette[l].light}),l&&"filled"===n.variant&&{color:"#fff",fontWeight:t.typography.fontWeightMedium,backgroundColor:"dark"===t.palette.mode?t.palette[l].dark:t.palette[l].main})})),S=(0,u.ZP)("div",{name:"MuiAlert",slot:"Icon",overridesResolver:function(e,t){return t.icon}})({marginRight:12,padding:"7px 0",display:"flex",fontSize:22,opacity:.9}),z=(0,u.ZP)("div",{name:"MuiAlert",slot:"Message",overridesResolver:function(e,t){return t.message}})({padding:"8px 0"}),L=(0,u.ZP)("div",{name:"MuiAlert",slot:"Action",overridesResolver:function(e,t){return t.action}})({display:"flex",alignItems:"flex-start",padding:"4px 0 0 16px",marginLeft:"auto",marginRight:-8}),O={success:(0,M.jsx)(A,{fontSize:"inherit"}),warning:(0,M.jsx)(b,{fontSize:"inherit"}),error:(0,M.jsx)(C,{fontSize:"inherit"}),info:(0,M.jsx)(N,{fontSize:"inherit"})},R=r.forwardRef((function(e,t){var n=(0,f.Z)({props:e,name:"MuiAlert"}),o=n.action,r=n.children,a=n.className,d=n.closeText,u=void 0===d?"Close":d,p=n.color,h=n.icon,v=n.iconMapping,Z=void 0===v?O:v,A=n.onClose,b=n.role,C=void 0===b?"alert":b,N=n.severity,R=void 0===N?"success":N,E=n.variant,H=void 0===E?"standard":E,I=(0,l.Z)(n,w),P=(0,i.Z)({},n,{color:p,severity:R,variant:H}),_=function(e){var t=e.variant,n=e.color,o=e.severity,i=e.classes,r={root:["root","".concat(t).concat((0,m.Z)(n||o)),"".concat(t)],icon:["icon"],message:["message"],action:["action"]};return(0,c.Z)(r,x,i)}(P);return(0,M.jsxs)(y,(0,i.Z)({role:C,elevation:0,ownerState:P,className:(0,s.Z)(_.root,a),ref:t},I,{children:[!1!==h?(0,M.jsx)(S,{ownerState:P,className:_.icon,children:h||Z[R]||O[R]}):null,(0,M.jsx)(z,{ownerState:P,className:_.message,children:r}),null!=o?(0,M.jsx)(L,{className:_.action,children:o}):null,null==o&&A?(0,M.jsx)(L,{ownerState:P,className:_.action,children:(0,M.jsx)(j.Z,{size:"small","aria-label":u,title:u,color:"inherit",onClick:A,children:g||(g=(0,M.jsx)(k,{fontSize:"small"}))})}):null]}))})),E=!1,H=r.forwardRef((function(e,t){return E||(console.warn(["MUI: The Alert component was moved from the lab to the core.","","You should use `import { Alert } from '@mui/material'`","or `import Alert from '@mui/material/Alert'`"].join("\n")),E=!0),(0,M.jsx)(R,(0,i.Z)({ref:t},e))}));var I=function(){return(0,M.jsx)(o.Z,{title:"Th\xf4ng tin chi ti\u1ebft",content:(0,M.jsx)("div",{className:"p-12",children:(0,M.jsx)(H,{severity:"info",children:"Vui l\xf2ng t\xecm ki\u1ebfm ho\u1eb7c click l\xean b\u1ea3n \u0111\u1ed3 \u0111\u1ec3 xem th\xf4ng tin chi ti\u1ebft!"})})})}}}]);