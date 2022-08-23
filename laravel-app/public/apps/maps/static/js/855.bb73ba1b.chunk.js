/*! For license information please see 855.bb73ba1b.chunk.js.LICENSE.txt */
(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[855],{41855:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return W}});var n=r(1413),i=r(29439),a=r(16785),o=r(23107),s=r(81129),l=r(92182),c=r(57194),u=r(51225),f=r(40099),d=r(77410),h=r(31417),m=r(76677),p=r(21134),g=function(e){(0,p.Z)((function(){e()}))},v=r(49993),b=r.n(v),x=r(88391),y=r(30387),N=r(45063);var j=function(e){var t=[];return"FeatureCollection"===e.type?(0,y.By)(e,(function(e){(0,y.pZ)(e,(function(r){t.push((0,N.xm)(r,e.properties))}))})):(0,y.pZ)(e,(function(r){t.push((0,N.xm)(r,e.properties))})),(0,N.uf)(t)};function w(e){var t=[1/0,1/0,-1/0,-1/0];return(0,y.pZ)(e,(function(e){t[0]>e[0]&&(t[0]=e[0]),t[1]>e[1]&&(t[1]=e[1]),t[2]<e[0]&&(t[2]=e[0]),t[3]<e[1]&&(t[3]=e[1])})),t}w.default=w;var F=w;var M=function(e,t){void 0===t&&(t={});var r=F(e),n=(r[0]+r[2])/2,i=(r[1]+r[3])/2;return(0,N.xm)([n,i],t.properties,t)},Z=r(47849),B=r(88865);var k=function(e,t,r){void 0===r&&(r={});var n=(0,B.c9)(e),i=(0,B.c9)(t),a=(0,N.Ht)(i[1]-n[1]),o=(0,N.Ht)(i[0]-n[0]),s=(0,N.Ht)(n[1]),l=(0,N.Ht)(i[1]),c=Math.pow(Math.sin(a/2),2)+Math.pow(Math.sin(o/2),2)*Math.cos(s)*Math.cos(l);return(0,N.DL)(2*Math.atan2(Math.sqrt(c),Math.sqrt(1-c)),r.units)};var C=function(e,t){if(!e)throw new Error("targetPoint is required");if(!t)throw new Error("points is required");var r,n=1/0,i=0;return(0,y.By)(t,(function(t,r){var a=k(e,t);a<n&&(i=r,n=a)})),(r=(0,Z.Z)(t.features[i])).properties.featureIndex=i,r.properties.distanceToPoint=n,r};function P(e,t,r){if(void 0===r&&(r={}),!e)throw new Error("point is required");if(!t)throw new Error("polygon is required");var n=(0,B.c9)(e),i=(0,B.wA)(t),a=i.type,o=t.bbox,s=i.coordinates;if(o&&!1===function(e,t){return t[0]<=e[0]&&t[1]<=e[1]&&t[2]>=e[0]&&t[3]>=e[1]}(n,o))return!1;"Polygon"===a&&(s=[s]);for(var l=!1,c=0;c<s.length&&!l;c++)if(T(n,s[c][0],r.ignoreBoundary)){for(var u=!1,f=1;f<s[c].length&&!u;)T(n,s[c][f],!r.ignoreBoundary)&&(u=!0),f++;u||(l=!0)}return l}function T(e,t,r){var n=!1;t[0][0]===t[t.length-1][0]&&t[0][1]===t[t.length-1][1]&&(t=t.slice(0,t.length-1));for(var i=0,a=t.length-1;i<t.length;a=i++){var o=t[i][0],s=t[i][1],l=t[a][0],c=t[a][1];if(e[1]*(o-l)+s*(l-e[0])+c*(e[0]-o)===0&&(o-e[0])*(l-e[0])<=0&&(s-e[1])*(c-e[1])<=0)return!r;s>e[1]!==c>e[1]&&e[0]<(l-o)*(e[1]-s)/(c-s)+o&&(n=!n)}return n}function L(e,t,r,n,i,a){return Math.sqrt((i-r)*(i-r)+(a-n)*(a-n))===Math.sqrt((e-r)*(e-r)+(t-n)*(t-n))+Math.sqrt((i-e)*(i-e)+(a-t)*(a-t))}var S=function(e){for(var t=function(e){if("FeatureCollection"!==e.type)return"Feature"!==e.type?(0,N.uf)([(0,N.zL)(e)]):(0,N.uf)([e]);return e}(e),r=M(t),n=!1,i=0;!n&&i<t.features.length;){var a,o=t.features[i].geometry,s=!1;if("Point"===o.type)r.geometry.coordinates[0]===o.coordinates[0]&&r.geometry.coordinates[1]===o.coordinates[1]&&(n=!0);else if("MultiPoint"===o.type){var l=!1;for(a=0;!l&&a<o.coordinates.length;)r.geometry.coordinates[0]===o.coordinates[a][0]&&r.geometry.coordinates[1]===o.coordinates[a][1]&&(n=!0,l=!0),a++}else if("LineString"===o.type)for(a=0;!s&&a<o.coordinates.length-1;)L(r.geometry.coordinates[0],r.geometry.coordinates[1],o.coordinates[a][0],o.coordinates[a][1],o.coordinates[a+1][0],o.coordinates[a+1][1])&&(s=!0,n=!0),a++;else if("MultiLineString"===o.type)for(var c=0;c<o.coordinates.length;){s=!1,a=0;for(var u=o.coordinates[c];!s&&a<u.length-1;)L(r.geometry.coordinates[0],r.geometry.coordinates[1],u[a][0],u[a][1],u[a+1][0],u[a+1][1])&&(s=!0,n=!0),a++;c++}else"Polygon"!==o.type&&"MultiPolygon"!==o.type||P(r,o)&&(n=!0);i++}if(n)return r;var f=(0,N.uf)([]);for(i=0;i<t.features.length;i++)f.features=f.features.concat(j(t.features[i]).features);return(0,N.xm)(C(r,f).geometry.coordinates)},E=r(32273),$=r(12444),q=r(99498),z=r(29595),I=r(67217),O=r(15866),D=(r(33784),r(23712));var G=function(e){var t=e.className,r=e.title,n=e.text,i=e.iconClass,a=e.onClick,o=e.visible;return void 0===o||o?(0,D.jsx)($.Z,{title:r,children:n?(0,D.jsxs)(q.Z,{className:(0,z.Z)("text-[12px] flex gap-6",t),onClick:a,children:[(0,D.jsx)(I.Z,{className:(0,z.Z)("text-[18px] text-gray-600",i)}),n]}):(0,D.jsx)(O.Z,{className:(0,z.Z)(t),onClick:a,children:(0,D.jsx)(I.Z,{className:(0,z.Z)("text-[18px] text-gray-600",i)})})}):null},H=r(74931),R=r(87850),A=r(51024),Q=r.n(A),V=r(26640),X=r(63387),Y=r.n(X),K=r(43391);function U(e){var t=e.title,r=(0,x.useState)(!0),p=(0,i.Z)(r,2);p[0],p[1];(0,u.ZQ)(t);var v=(0,H.I0)(),y=(0,f.UO)().id,N=(0,f.s0)(),j=(0,d.Z)("loading, feature, getById, toggleFavorite"),w=(0,i.Z)(j,4),F=w[0],M=w[1],Z=w[2],k=w[3];g((function(){M?N("/maps/thong-tin-thua-dat/".concat(M.id)):y&&Z(y)})),function(e){var t=(0,V.useQuery)("getCurrentIp",(function(){return Y().get("/api/ip").then((function(e){var t,r;return null!==(t=null===(r=e.data)||void 0===r?void 0:r.ip)&&void 0!==t?t:e.data}))}),{refetchOnWindowFocus:!1,refetchOnMount:!1}).data;(0,x.useEffect)((function(){if(!e||!t)return function(){};var r=Q().get("thudatViewIPs")||{};r[e]||(r[e]=t,Q().set("thudatViewIPs",r,{ttl:21600}),K.Z.increaseThudatViewCount(e))}),[t,e])}(y);var C=(0,x.useMemo)((function(){return null!==M&&void 0!==M&&M.geometry?(0,B.r7)((0,E.Z)(S(null===M||void 0===M?void 0:M.geometry))).join(","):""}),[null===M||void 0===M?void 0:M.geometry]),P=!0;return(0,D.jsx)(a.Z,{title:t,loading:F,toolbar:(0,D.jsxs)("div",{className:"flex justify-between px-6 py-2",children:[(0,D.jsx)("div",{className:"flex",children:(0,D.jsxs)(o.Z,{spacing:1,direction:"row",divider:(0,D.jsx)(s.Z,{orientation:"vertical",sx:{height:30},className:"self-center"}),children:[(0,D.jsx)(o.Z,{spacing:.5,direction:"row",alignItems:"center",children:[{title:"L\u01b0u",iconClass:"fa-duotone fa-box-archive text-blue-500",visible:P,onClick:function(){return v((0,R.G3)({name:"save-thuadat",heading:"L\u01b0u th\xf4ng tin th\u1eeda \u0111\u1ea5t"}))}},{title:"Ch\u1ec9nh s\u1eeda",iconClass:"fa-duotone fa-pen-to-square text-green-500",visible:P,onClick:function(){return v((0,R.G3)({name:"save-thuadat",heading:"C\u1eadp nh\u1eadt th\xf4ng tin th\u1eeda \u0111\u1ea5t"}))}},{title:"X\xf3a",iconClass:"fa-duotone fa-trash text-red-500",visible:P,onClick:function(){return v((0,R.G3)({name:"delete-confirmation"}))}}].map((function(e,t){return(0,D.jsx)(G,(0,n.Z)({},e),t)}))}),(0,D.jsx)(o.Z,{spacing:.5,direction:"row",alignItems:"center",children:[{title:"Y\xeau th\xedch",iconClass:(0,z.Z)({"fa-solid":null===M||void 0===M?void 0:M.is_favorited,"fa-regular":!(null!==M&&void 0!==M&&M.is_favorited)},"fa-heart text-red-500 w-auto"),visible:P,onClick:function(){return k(null===M||void 0===M?void 0:M.id)}}].map((function(e,t){return(0,D.jsx)(G,(0,n.Z)({},e),t)}))})]})}),(0,D.jsx)(o.Z,{spacing:.5,direction:"row",alignItems:"center",children:[{title:"Xem v\u1ecb tr\xed",iconClass:"fa-light fa-location-arrow",visible:!!C,onClick:function(){return window.open("https://www.google.com/maps/search/".concat(C))}},{title:"D\u1eabn \u0111\u01b0\u1eddng",iconClass:"fa-light fa-diamond-turn-right",visible:!!C,onClick:function(){return window.open("https://www.google.com/maps/dir/?api=1&destination=".concat(C,"&travelmode=driving"))}},{title:"Chia s\u1ebd",iconClass:"fa-light fa-share-nodes",visible:!!C,onClick:function(){return v((0,R.G3)({name:"share"}))}}].map((function(e,t){return(0,D.jsx)(G,(0,n.Z)({},e),t)}))})]}),content:(0,D.jsxs)("div",{className:"w-full p-12",children:[(0,D.jsxs)(l.Z,{severity:"warning",className:"text-base leading-6",icon:!1,children:[(0,D.jsx)("span",{className:"font-semibold",children:"L\u01b0u \xfd"}),": Th\xf4ng tin quy ho\u1ea1ch ch\u1ec9 mang t\xednh tham kh\u1ea3o. Qu\xfd kh\xe1ch c\xf3 nhu c\u1ea7u ",(0,D.jsx)("span",{className:"font-semibold",children:"x\xe1c minh th\u1eeda \u0111\u1ea5t, \u0111o \u0111\u1ea1c, l\u1eadp h\u1ecda \u0111\u1ed3"}),"  b\u1ea3ng v\u1ebd n\u1ed9i nghi\u1ec7p, c\u1eadp nh\u1eadt s\u1ed1 m\u1edbi b\u1edfi c\u01a1 quan nh\xe0 n\u01b0\u1edbc. ",(0,D.jsx)("br",{}),"Xin vui l\xf2ng li\xean h\u1ec7 ",(0,D.jsx)("span",{className:"text-red-500 font-semibold",children:"1900-1700, 028-9999-1700"})," \u0111\u1ec3 \u0111\u01b0\u1ee3c t\u01b0 v\u1ea5n th\xeam. Ho\u1eb7c \u0111i\u1ec1n m\u1eabu sau"]}),(0,D.jsx)(q.Z,{variant:"outlined",color:"primary",className:"mt-12",size:"medium",fullWidth:!0,children:"Nh\u1eadp th\xf4ng tin li\xean h\u1ec7"}),M&&(0,D.jsxs)("div",{className:"pl-6",children:[(0,D.jsx)("div",{className:"font-semibold text-lg mt-12",children:(0,D.jsx)("span",{className:"text-primary",children:"Th\xf4ng tin th\u1eeda \u0111\u1ea5t"})}),(0,D.jsx)(s.Z,{className:"my-6"}),(0,D.jsx)("table",{children:(0,D.jsxs)("tbody",{children:[(0,D.jsxs)("tr",{children:[(0,D.jsx)("td",{className:"py-4 pr-24",children:"T\u1ec9nh/Th\xe0nh"}),(0,D.jsx)("td",{className:"font-semibold",children:M.tinh_tp})]}),(0,D.jsxs)("tr",{children:[(0,D.jsx)("td",{className:"py-4 pr-24",children:"Qu\u1eadn/Huy\u1ec7n"}),(0,D.jsx)("td",{className:"font-semibold",children:M.quanhuyen})]}),(0,D.jsxs)("tr",{children:[(0,D.jsx)("td",{className:"py-4 pr-24",children:"Ph\u01b0\u1eddng/X\xe3"}),(0,D.jsx)("td",{className:"font-semibold",children:M.phuongxa})]}),(0,D.jsxs)("tr",{children:[(0,D.jsx)("td",{className:"py-4 pr-24",children:"S\u1ed1 th\u1eeda"}),(0,D.jsx)("td",{className:"font-semibold",children:M.sothua})]}),(0,D.jsxs)("tr",{children:[(0,D.jsx)("td",{className:"py-4 pr-24",children:"S\u1ed1 t\u1edd"}),(0,D.jsx)("td",{className:"font-semibold",children:M.soto})]}),(0,D.jsxs)("tr",{children:[(0,D.jsx)("td",{className:"py-4 pr-24",children:"Di\u1ec7n t\xedch l\xf4 \u0111\u1ea5t"}),(0,D.jsxs)("td",{className:"font-semibold",children:[b()(M.dientich).format("0,0")," m",(0,D.jsx)("sup",{children:"2"})]})]})]})}),(0,D.jsx)("div",{className:"font-semibold text-lg mt-24",children:(0,D.jsx)("span",{className:"text-primary",children:"Ch\u1ee9c n\u0103ng s\u1eed d\u1ee5ng \u0111\u1ea5t"})}),(0,D.jsx)(s.Z,{className:"my-6"}),(0,D.jsx)("div",{className:"mb-6",children:"Nh\u1ea5n v\xe0o c\xe1c \xf4 ch\u1ee9c n\u0103ng \u0111\u1ec3 xem chi ti\u1ebft"}),(0,D.jsx)(h.Z,{children:(0,D.jsx)(o.Z,{spacing:1.5,children:M.quyhoachs.map((function(e,t){return(0,D.jsx)(c.ZP,{button:!0,sx:{background:"linear-gradient(0deg,".concat((0,m._j)(e.fill_color,.07),",").concat(e.fill_color,")"),color:"black","&.MuiListItem-root:hover":{backgroundColor:e.fill_color}},disablePadding:!0,className:"rounded-xl",children:(0,D.jsxs)("div",{className:"flex text-gray-900",children:[(0,D.jsx)("div",{className:"min-w-60 flex items-center justify-center text-3xl",style:{backgroundColor:"hsla(0,0%,100%,.2)"},children:t+1}),(0,D.jsxs)("div",{className:"p-12 leading-7",children:[(0,D.jsx)("div",{className:"px-6",children:e.ma_sdd}),(0,D.jsx)("div",{className:"px-6 font-semibold",children:e.ten_sdd}),(0,D.jsxs)("div",{className:"px-6",children:[b()(e.dientich).format("0,0")," m",(0,D.jsx)("sup",{children:"2"})]})]})]})},t)}))})}),(0,D.jsx)("div",{className:"font-semibold text-lg mt-12",children:(0,D.jsx)("span",{className:"text-primary",children:"T\u1ecda \u0111\u1ed9 v\u1ec7 tinh"})}),(0,D.jsx)(s.Z,{className:"my-6"}),(0,D.jsx)("div",{className:"font-medium",children:C.split(",").map((function(e){return _.toNumber(e).toFixed(8)})).join(", ")})]})]})})}U.defaultProps={title:"Th\xf4ng tin quy ho\u1ea1ch"};var W=U},49993:function(e,t,r){var n,i;n=function(){var e,t,r="2.0.6",n={},i={},a={currentLocale:"en",zeroFormat:null,nullFormat:null,defaultFormat:"0,0",scalePercentBy100:!0},o={currentLocale:a.currentLocale,zeroFormat:a.zeroFormat,nullFormat:a.nullFormat,defaultFormat:a.defaultFormat,scalePercentBy100:a.scalePercentBy100};function s(e,t){this._input=e,this._value=t}return(e=function(r){var i,a,l,c;if(e.isNumeral(r))i=r.value();else if(0===r||"undefined"===typeof r)i=0;else if(null===r||t.isNaN(r))i=null;else if("string"===typeof r)if(o.zeroFormat&&r===o.zeroFormat)i=0;else if(o.nullFormat&&r===o.nullFormat||!r.replace(/[^0-9]+/g,"").length)i=null;else{for(a in n)if((c="function"===typeof n[a].regexps.unformat?n[a].regexps.unformat():n[a].regexps.unformat)&&r.match(c)){l=n[a].unformat;break}i=(l=l||e._.stringToNumber)(r)}else i=Number(r)||null;return new s(r,i)}).version=r,e.isNumeral=function(e){return e instanceof s},e._=t={numberToFormat:function(t,r,n){var a,o,s,l,c,u,f,d=i[e.options.currentLocale],h=!1,m=!1,p=0,g="",v=1e12,b=1e9,x=1e6,y=1e3,N="",_=!1;if(t=t||0,o=Math.abs(t),e._.includes(r,"(")?(h=!0,r=r.replace(/[\(|\)]/g,"")):(e._.includes(r,"+")||e._.includes(r,"-"))&&(c=e._.includes(r,"+")?r.indexOf("+"):t<0?r.indexOf("-"):-1,r=r.replace(/[\+|\-]/g,"")),e._.includes(r,"a")&&(a=!!(a=r.match(/a(k|m|b|t)?/))&&a[1],e._.includes(r," a")&&(g=" "),r=r.replace(new RegExp(g+"a[kmbt]?"),""),o>=v&&!a||"t"===a?(g+=d.abbreviations.trillion,t/=v):o<v&&o>=b&&!a||"b"===a?(g+=d.abbreviations.billion,t/=b):o<b&&o>=x&&!a||"m"===a?(g+=d.abbreviations.million,t/=x):(o<x&&o>=y&&!a||"k"===a)&&(g+=d.abbreviations.thousand,t/=y)),e._.includes(r,"[.]")&&(m=!0,r=r.replace("[.]",".")),s=t.toString().split(".")[0],l=r.split(".")[1],u=r.indexOf(","),p=(r.split(".")[0].split(",")[0].match(/0/g)||[]).length,l?(e._.includes(l,"[")?(l=(l=l.replace("]","")).split("["),N=e._.toFixed(t,l[0].length+l[1].length,n,l[1].length)):N=e._.toFixed(t,l.length,n),s=N.split(".")[0],N=e._.includes(N,".")?d.delimiters.decimal+N.split(".")[1]:"",m&&0===Number(N.slice(1))&&(N="")):s=e._.toFixed(t,0,n),g&&!a&&Number(s)>=1e3&&g!==d.abbreviations.trillion)switch(s=String(Number(s)/1e3),g){case d.abbreviations.thousand:g=d.abbreviations.million;break;case d.abbreviations.million:g=d.abbreviations.billion;break;case d.abbreviations.billion:g=d.abbreviations.trillion}if(e._.includes(s,"-")&&(s=s.slice(1),_=!0),s.length<p)for(var j=p-s.length;j>0;j--)s="0"+s;return u>-1&&(s=s.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1"+d.delimiters.thousands)),0===r.indexOf(".")&&(s=""),f=s+N+(g||""),h?f=(h&&_?"(":"")+f+(h&&_?")":""):c>=0?f=0===c?(_?"-":"+")+f:f+(_?"-":"+"):_&&(f="-"+f),f},stringToNumber:function(e){var t,r,n,a=i[o.currentLocale],s=e,l={thousand:3,million:6,billion:9,trillion:12};if(o.zeroFormat&&e===o.zeroFormat)r=0;else if(o.nullFormat&&e===o.nullFormat||!e.replace(/[^0-9]+/g,"").length)r=null;else{for(t in r=1,"."!==a.delimiters.decimal&&(e=e.replace(/\./g,"").replace(a.delimiters.decimal,".")),l)if(n=new RegExp("[^a-zA-Z]"+a.abbreviations[t]+"(?:\\)|(\\"+a.currency.symbol+")?(?:\\))?)?$"),s.match(n)){r*=Math.pow(10,l[t]);break}r*=(e.split("-").length+Math.min(e.split("(").length-1,e.split(")").length-1))%2?1:-1,e=e.replace(/[^0-9\.]+/g,""),r*=Number(e)}return r},isNaN:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(e){return"number"===typeof e&&isNaN(e)})),includes:function(e,t){return-1!==e.indexOf(t)},insert:function(e,t,r){return e.slice(0,r)+t+e.slice(r)},reduce:function(e,t){if(null===this)throw new TypeError("Array.prototype.reduce called on null or undefined");if("function"!==typeof t)throw new TypeError(t+" is not a function");var r,n=Object(e),i=n.length>>>0,a=0;if(3===arguments.length)r=arguments[2];else{for(;a<i&&!(a in n);)a++;if(a>=i)throw new TypeError("Reduce of empty array with no initial value");r=n[a++]}for(;a<i;a++)a in n&&(r=t(r,n[a],a,n));return r},multiplier:function(e){var t=e.toString().split(".");return t.length<2?1:Math.pow(10,t[1].length)},correctionFactor:function(){return Array.prototype.slice.call(arguments).reduce((function(e,r){var n=t.multiplier(r);return e>n?e:n}),1)},toFixed:function(e,t,r,n){var i,a,o,s,l=e.toString().split("."),c=t-(n||0);return i=2===l.length?Math.min(Math.max(l[1].length,c),t):c,o=Math.pow(10,i),s=(r(e+"e+"+i)/o).toFixed(i),n>t-i&&(a=new RegExp("\\.?0{1,"+(n-(t-i))+"}$"),s=s.replace(a,"")),s}},e.options=o,e.formats=n,e.locales=i,e.locale=function(e){return e&&(o.currentLocale=e.toLowerCase()),o.currentLocale},e.localeData=function(e){if(!e)return i[o.currentLocale];if(e=e.toLowerCase(),!i[e])throw new Error("Unknown locale : "+e);return i[e]},e.reset=function(){for(var e in a)o[e]=a[e]},e.zeroFormat=function(e){o.zeroFormat="string"===typeof e?e:null},e.nullFormat=function(e){o.nullFormat="string"===typeof e?e:null},e.defaultFormat=function(e){o.defaultFormat="string"===typeof e?e:"0.0"},e.register=function(e,t,r){if(t=t.toLowerCase(),this[e+"s"][t])throw new TypeError(t+" "+e+" already registered.");return this[e+"s"][t]=r,r},e.validate=function(t,r){var n,i,a,o,s,l,c,u;if("string"!==typeof t&&(t+="",console.warn&&console.warn("Numeral.js: Value is not string. It has been co-erced to: ",t)),(t=t.trim()).match(/^\d+$/))return!0;if(""===t)return!1;try{c=e.localeData(r)}catch(f){c=e.localeData(e.locale())}return a=c.currency.symbol,s=c.abbreviations,n=c.delimiters.decimal,i="."===c.delimiters.thousands?"\\.":c.delimiters.thousands,(null===(u=t.match(/^[^\d]+/))||(t=t.substr(1),u[0]===a))&&(null===(u=t.match(/[^\d]+$/))||(t=t.slice(0,-1),u[0]===s.thousand||u[0]===s.million||u[0]===s.billion||u[0]===s.trillion))&&(l=new RegExp(i+"{2}"),!t.match(/[^\d.,]/g)&&!((o=t.split(n)).length>2)&&(o.length<2?!!o[0].match(/^\d+.*\d$/)&&!o[0].match(l):1===o[0].length?!!o[0].match(/^\d+$/)&&!o[0].match(l)&&!!o[1].match(/^\d+$/):!!o[0].match(/^\d+.*\d$/)&&!o[0].match(l)&&!!o[1].match(/^\d+$/)))},e.fn=s.prototype={clone:function(){return e(this)},format:function(t,r){var i,a,s,l=this._value,c=t||o.defaultFormat;if(r=r||Math.round,0===l&&null!==o.zeroFormat)a=o.zeroFormat;else if(null===l&&null!==o.nullFormat)a=o.nullFormat;else{for(i in n)if(c.match(n[i].regexps.format)){s=n[i].format;break}a=(s=s||e._.numberToFormat)(l,c,r)}return a},value:function(){return this._value},input:function(){return this._input},set:function(e){return this._value=Number(e),this},add:function(e){var r=t.correctionFactor.call(null,this._value,e);function n(e,t,n,i){return e+Math.round(r*t)}return this._value=t.reduce([this._value,e],n,0)/r,this},subtract:function(e){var r=t.correctionFactor.call(null,this._value,e);function n(e,t,n,i){return e-Math.round(r*t)}return this._value=t.reduce([e],n,Math.round(this._value*r))/r,this},multiply:function(e){function r(e,r,n,i){var a=t.correctionFactor(e,r);return Math.round(e*a)*Math.round(r*a)/Math.round(a*a)}return this._value=t.reduce([this._value,e],r,1),this},divide:function(e){function r(e,r,n,i){var a=t.correctionFactor(e,r);return Math.round(e*a)/Math.round(r*a)}return this._value=t.reduce([this._value,e],r),this},difference:function(t){return Math.abs(e(this._value).subtract(t).value())}},e.register("locale","en",{delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(e){var t=e%10;return 1===~~(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th"},currency:{symbol:"$"}}),e.register("format","bps",{regexps:{format:/(BPS)/,unformat:/(BPS)/},format:function(t,r,n){var i,a=e._.includes(r," BPS")?" ":"";return t*=1e4,r=r.replace(/\s?BPS/,""),i=e._.numberToFormat(t,r,n),e._.includes(i,")")?((i=i.split("")).splice(-1,0,a+"BPS"),i=i.join("")):i=i+a+"BPS",i},unformat:function(t){return+(1e-4*e._.stringToNumber(t)).toFixed(15)}}),function(){var t={base:1e3,suffixes:["B","KB","MB","GB","TB","PB","EB","ZB","YB"]},r={base:1024,suffixes:["B","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"]},n=t.suffixes.concat(r.suffixes.filter((function(e){return t.suffixes.indexOf(e)<0}))).join("|");n="("+n.replace("B","B(?!PS)")+")",e.register("format","bytes",{regexps:{format:/([0\s]i?b)/,unformat:new RegExp(n)},format:function(n,i,a){var o,s,l,c=e._.includes(i,"ib")?r:t,u=e._.includes(i," b")||e._.includes(i," ib")?" ":"";for(i=i.replace(/\s?i?b/,""),o=0;o<=c.suffixes.length;o++)if(s=Math.pow(c.base,o),l=Math.pow(c.base,o+1),null===n||0===n||n>=s&&n<l){u+=c.suffixes[o],s>0&&(n/=s);break}return e._.numberToFormat(n,i,a)+u},unformat:function(n){var i,a,o=e._.stringToNumber(n);if(o){for(i=t.suffixes.length-1;i>=0;i--){if(e._.includes(n,t.suffixes[i])){a=Math.pow(t.base,i);break}if(e._.includes(n,r.suffixes[i])){a=Math.pow(r.base,i);break}}o*=a||1}return o}})}(),e.register("format","currency",{regexps:{format:/(\$)/},format:function(t,r,n){var i,a,o=e.locales[e.options.currentLocale],s={before:r.match(/^([\+|\-|\(|\s|\$]*)/)[0],after:r.match(/([\+|\-|\)|\s|\$]*)$/)[0]};for(r=r.replace(/\s?\$\s?/,""),i=e._.numberToFormat(t,r,n),t>=0?(s.before=s.before.replace(/[\-\(]/,""),s.after=s.after.replace(/[\-\)]/,"")):t<0&&!e._.includes(s.before,"-")&&!e._.includes(s.before,"(")&&(s.before="-"+s.before),a=0;a<s.before.length;a++)switch(s.before[a]){case"$":i=e._.insert(i,o.currency.symbol,a);break;case" ":i=e._.insert(i," ",a+o.currency.symbol.length-1)}for(a=s.after.length-1;a>=0;a--)switch(s.after[a]){case"$":i=a===s.after.length-1?i+o.currency.symbol:e._.insert(i,o.currency.symbol,-(s.after.length-(1+a)));break;case" ":i=a===s.after.length-1?i+" ":e._.insert(i," ",-(s.after.length-(1+a)+o.currency.symbol.length-1))}return i}}),e.register("format","exponential",{regexps:{format:/(e\+|e-)/,unformat:/(e\+|e-)/},format:function(t,r,n){var i=("number"!==typeof t||e._.isNaN(t)?"0e+0":t.toExponential()).split("e");return r=r.replace(/e[\+|\-]{1}0/,""),e._.numberToFormat(Number(i[0]),r,n)+"e"+i[1]},unformat:function(t){var r=e._.includes(t,"e+")?t.split("e+"):t.split("e-"),n=Number(r[0]),i=Number(r[1]);function a(t,r,n,i){var a=e._.correctionFactor(t,r);return t*a*(r*a)/(a*a)}return i=e._.includes(t,"e-")?i*=-1:i,e._.reduce([n,Math.pow(10,i)],a,1)}}),e.register("format","ordinal",{regexps:{format:/(o)/},format:function(t,r,n){var i=e.locales[e.options.currentLocale],a=e._.includes(r," o")?" ":"";return r=r.replace(/\s?o/,""),a+=i.ordinal(t),e._.numberToFormat(t,r,n)+a}}),e.register("format","percentage",{regexps:{format:/(%)/,unformat:/(%)/},format:function(t,r,n){var i,a=e._.includes(r," %")?" ":"";return e.options.scalePercentBy100&&(t*=100),r=r.replace(/\s?\%/,""),i=e._.numberToFormat(t,r,n),e._.includes(i,")")?((i=i.split("")).splice(-1,0,a+"%"),i=i.join("")):i=i+a+"%",i},unformat:function(t){var r=e._.stringToNumber(t);return e.options.scalePercentBy100?.01*r:r}}),e.register("format","time",{regexps:{format:/(:)/,unformat:/(:)/},format:function(e,t,r){var n=Math.floor(e/60/60),i=Math.floor((e-60*n*60)/60),a=Math.round(e-60*n*60-60*i);return n+":"+(i<10?"0"+i:i)+":"+(a<10?"0"+a:a)},unformat:function(e){var t=e.split(":"),r=0;return 3===t.length?(r+=60*Number(t[0])*60,r+=60*Number(t[1]),r+=Number(t[2])):2===t.length&&(r+=60*Number(t[0]),r+=Number(t[1])),Number(r)}}),e},void 0===(i="function"===typeof n?n.call(t,r,t,e):n)||(e.exports=i)}}]);