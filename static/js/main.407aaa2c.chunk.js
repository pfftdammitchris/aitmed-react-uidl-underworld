(this["webpackJsonpaitmed-react-uidl-underworld"]=this["webpackJsonpaitmed-react-uidl-underworld"]||[]).push([[0],{153:function(e,t,n){e.exports=n(211)},211:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),i=n(22),c=n.n(i),l=n(139),r=n(53),s=n(39),u=n(40);function d(){var e=Object(s.a)(["\n  body {\n    /* background: rgba(11, 12, 14, 0.8); */\n    margin: 0;\n    padding: 25px;\n    overflow-x: hidden;\n    box-sizing: border-box;\n    font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Oxygen',\n      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n      sans-serif;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    font-weight: 500;\n  }\n\n  code, textarea {\n    font-family: Consolas !important;\n  }\n\n  button:hover {\n    opacity: 0.8;\n  }\n\n  .modal {\n    width: 100%;\n    height: 100%;\n    outline: none;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n  }\n\n  .modal-body {\n    /* max-height: 500px; */\n    background: red;\n  }\n\n\n  /* .modal; */\n\n  input::placeholder {\n    opacity: 0.6;\n  }\n"]);return d=function(){return e},e}var p=Object(u.a)(d()),v=n(23),m=n(14),g=n(27),b=n(132),f=n(242),h=n(138),y=n.n(h),O=n(241),j=n(240),x=n(243);function E(){var e=Object(s.a)(["\n  textarea {\n    color: #333;\n    font-size: 13px;\n  }\n  .input {\n    color: #333;\n    box-shadow: 1px 1px 10px rgba(25, 37, 45, 0.15);\n  }\n  .label {\n    color: rgba(0, 0, 0, 0.7);\n  }\n  .notchedOutline {\n    border-color: #37506c;\n  }\n"]);return E=function(){return e},e}var w=u.b.div(E());var S=function(e){return o.a.createElement(w,null,o.a.createElement(x.a,Object.assign({name:"page",rows:15,rowsMax:30,label:"Editor",InputLabelProps:{classes:{root:"label"}},variant:"outlined",color:"secondary",spellCheck:!1,InputProps:{classes:{root:"input",notchedOutline:"notchedOutline"}},margin:"normal",autoFocus:!0,multiline:!0,fullWidth:!0},e)))};n(70);var P=function(e){e.autoSave;var t=e.storedKey,n=void 0===t?"":t,a=e.storedObj,i=e.render,c=e.children,l=(e.interval,o.a.useState(null)),r=Object(v.a)(l,2),s=r[0],u=(r[1],o.a.useRef(),o.a.useMemo((function(){return"autosave-".concat(n)}),[n]));return console.log(a),o.a.useEffect((function(){var e;try{(e=window.localStorage.getItem(u))&&(e=JSON.parse(e)||{})}catch(t){console.error(t)}}),[s,u]),i?i({cache:s,id:u}):c?"function"===typeof c?c({cache:s,id:u}):c:null},I=n(245);function k(){var e=Object(s.a)(["\n  border: 1px solid #37506c;\n  border-radius: 4px;\n  margin: 8px 0 10px;\n  padding: 12px;\n  color: #37506c;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  opacity: 0.35;\n  box-shadow: 1px 1px 10px rgba(25, 37, 45, 0.15);\n  user-select: none;\n  height: ",";\n"]);return k=function(){return e},e}var C=Object(u.b)(I.a)(k(),(function(e){return e.height}));function D(e){var t=e.label,n=e.sublabel;return n?o.a.createElement(j.a,{align:"center"},o.a.createElement(j.a,{style:{display:"block"},variant:"button"},t),o.a.createElement(j.a,{variant:"caption",style:{display:"block"},align:"center"},n)):o.a.createElement(j.a,{variant:"button"},t)}var z=function(e){var t=e.label,n=e.sublabel,a=e.children,i=Object(g.a)(e,["label","sublabel","children"]);return o.a.createElement(C,Object.assign({margin:"normal"},i),o.a.createElement(D,{label:t,sublabel:n}),a)};function Y(){var e=Object(s.a)(["\n  width: 6px;\n  height: auto;\n  display: inline-block;\n"]);return Y=function(){return e},e}function _(){var e=Object(s.a)(["\n  margin: ",";\n  display: flex;\n  align-items: center;\n\n  button,\n  input,\n  select {\n    flex-grow: 1;\n  }\n"]);return _=function(){return e},e}var F=u.b.div(_(),(function(e){var t=e.margin;return"undefined"!==typeof t?t:"10px auto"})),L=u.b.div(Y());var V=function(e){var t=e.component,n=void 0===t?F:t,a=e.children,i=e.margin,c=Object(g.a)(e,["component","children","margin"]),l=o.a.Children.toArray(a);return l=l.map((function(e,t){return o.a.isValidElement(e)?o.a.createElement(o.a.Fragment,{key:"actions_action".concat(t)},o.a.cloneElement(e,Object(m.a)({},e.props)),t+1<l.length&&o.a.createElement(L,null)):null})),o.a.createElement(n,Object.assign({margin:i},c),l)},A=n(244);function U(){var e=Object(s.a)(["\n  option,\n  select {\n    color: #333;\n  }\n  .input {\n    color: #333;\n    box-shadow: 1px 1px 10px rgba(25, 37, 45, 0.15);\n  }\n  .outline {\n    color: #333;\n    border: 1px #37506c solid;\n  }\n  .label {\n    color: rgba(0, 0, 0, 0.7);\n  }\n"]);return U=function(){return e},e}var B=Object(u.b)(x.a)(U());var N=function(e){var t=e.options,n=e.InputProps,a=e.InputLabelProps,i=e.SelectProps,c=Object(g.a)(e,["options","InputProps","InputLabelProps","SelectProps"]);return o.a.createElement(B,Object.assign({margin:"dense",InputProps:Object(m.a)({},n,{classes:{root:"input",notchedOutline:"outline"}}),InputLabelProps:Object(m.a)({},a,{classes:Object(m.a)({root:"label"},null===a||void 0===a?void 0:a.classes),shrink:!0}),SelectProps:Object(m.a)({},i,{classes:Object(m.a)({outlined:"outlined"},null===i||void 0===i?void 0:i.classes)}),variant:"outlined",color:"secondary",select:!0,fullWidth:!0},c),t.map((function(e){var t=e.value,n=e.key,a=void 0===n?t:n,i=e.label;return o.a.createElement(A.a,{key:a,value:t},i)})))},M=n(141);function R(e,t,n){var a,o=["%c".concat(e)];if(e&&"object"===typeof e){var i=e;o=["%c".concat(i.msg)];var c="font-weight:bold;";i.color&&(c+="color:".concat(i.color,";")),o.push(c),i.data&&o.push(i.data)}else{if(t)if("string"===typeof t)o.push(t);else{var l="font-weight:bold;";t.color&&(l+="color:".concat(t.color,";")),o.push(l)}n&&o.push(n)}(a=console.log).bind.apply(a,[window.console].concat(Object(M.a)(o)))}var J=n(5),W=n.n(J),H=n(64);n(104);var T=function(e){e.type;var t,n,a,i,c=e.style,l=(e.componentId,e.children),r=e.src,s=e.uidl,u=Object(g.a)(e,["type","style","componentId","children","src","uidl"]),d=Object(m.a)({outline:"none",cursor:"pointer",fontSize:null===s||void 0===s||null===(t=s.css.base)||void 0===t?void 0:t.fontSize,borderStyle:null===s||void 0===s||null===(n=s.css.button)||void 0===n?void 0:n.borderStyle,backgroundColor:null===s||void 0===s||null===(a=s.css)||void 0===a||null===(i=a.base)||void 0===i?void 0:i.backgroundColor},c,{},{});return o.a.createElement("button",Object.assign({type:"button",style:d},u),l," ",r&&o.a.createElement("img",{src:r,alt:"'",style:{width:"35%",height:"35%"}}))};var K=function(e){var t,n,a,i=e.children,c=(e.type,e.style),l=e.src,r=(e.componentId,e.uidl),s=Object(g.a)(e,["children","type","style","src","componentId","uidl"]);i&&R({msg:"Image has children",color:"#c33a0b",data:i});var u,d=Object(m.a)({},null===r||void 0===r||null===(t=r.css)||void 0===t?void 0:t.image,{},c,{},{});return i?((null===(n=i.props)||void 0===n||null===(a=n.uidl)||void 0===a?void 0:a.component)&&(u=null===r||void 0===r?void 0:r.parseComponent(i.props.uidl.component)),o.a.createElement("div",{style:Object(m.a)({},d,{position:"relative"})},o.a.createElement("img",Object.assign({src:l,title:l,alt:"",style:{border:"1px solid red",width:"100%",height:"100%"}},s)),u)):o.a.createElement("img",Object.assign({src:l,alt:"",style:d},s))};var G=function(e){var t,n,a=e.type,i=void 0===a?"":a,c=e.style,l=e.componentId,r=e.inputType,s=void 0===r?"text":r,u=e.children,d=e.uidl,p=e.onChange,b=Object(g.a)(e,["type","style","componentId","inputType","children","uidl","onChange"]),f=o.a.useState("string"===typeof u?u:""),h=Object(v.a)(f,2),y=h[0],O=h[1],j={type:s,style:Object(m.a)({},null===d||void 0===d||null===(t=d.css)||void 0===t?void 0:t.textField,{},c,{},{})};return u&&R({msg:"Input has children. ".concat(l?"Component ID: "+l:""),color:"#c92fb5",data:u}),-1!==i.indexOf(".")&&"date"===(null===(n=i.split("."))||void 0===n?void 0:n[1])&&(j.type="date"),o.a.createElement("input",Object.assign({id:l,value:y,onChange:function(e){var t;"function"===typeof p&&p(e),O(null===(t=e.target)||void 0===t?void 0:t.value)}},b,j))};var X=function(e){var t,n,a,i,c,l=e.style,r=(e.type,e.componentId,e.children),s=e.uidl,u=Object(g.a)(e,["style","type","componentId","children","uidl"]),d=Object(m.a)({fontSize:null===(t=s.css)||void 0===t||null===(n=t.base)||void 0===n?void 0:n.fontSize,color:null===(a=s.css)||void 0===a||null===(i=a.base)||void 0===i?void 0:i.color},null===(c=s.css)||void 0===c?void 0:c.label,{},l,{},{});return o.a.createElement("div",Object.assign({style:d},u),r)};var $=function(e){var t,n,a,i,c=e.style,l=e.children,r=e.componentId,s=e.uidl,u=Object(m.a)({color:null===s||void 0===s||null===(t=s.css)||void 0===t||null===(n=t.base)||void 0===n?void 0:n.color,fontSize:null===s||void 0===s||null===(a=s.css)||void 0===a||null===(i=a.base)||void 0===i?void 0:i.fontSize},c,{},{});return o.a.createElement("div",{id:r,style:u},Array.isArray(l)&&l.map((function(e,t){return o.a.createElement(o.a.Fragment,{key:"uidlc-".concat(t)},e)})))};var q=function(e){e.type;var t=e.style,n=(e.componentId,e.uidl,e.selectOptions),a=void 0===n?[]:n,i=Object(g.a)(e,["type","style","componentId","uidl","selectOptions"]),c=o.a.useState(""),l=Object(v.a)(c,2),r=l[0],s=l[1],u=Object(m.a)({},t,{},{});return o.a.createElement("select",Object.assign({style:u,value:r,onChange:function(e){var t;s(null===(t=e.target)||void 0===t?void 0:t.value)}},i),a.map((function(e){return o.a.createElement("option",{key:e.value,value:e.value},e.label)})))},Q=n(133),Z=n.n(Q),ee=n(93),te=new(n(134).a)({apiVersion:"v1beta1",env:"development"}),ne=n(101),ae=n.n(ne),oe={yml:"",parsedYml:{},cache:{}};var ie=function(e){var t=e.initialValue,n=void 0===t?"":t,a=e.delay,i=void 0===a?50:a,c=(e.pageName,Object(ee.a)(oe)),l=Object(v.a)(c,2),r=l[0],s=l[1],u=o.a.useState(i),d=Object(v.a)(u,2),p=d[0],g=d[1];function b(e){try{return ae.a.parse(e)}catch(t){return console.error(t),e}}return o.a.useEffect((function(){n&&s((function(e){var t=ae.a.parse(n);e.yml=n,e.parsedYml=t}))}),[n,s]),Object(m.a)({},r,{delay:p,setDelay:g,setYml:function(e){"string"===typeof e?e!==r.yml&&s((function(t){t.yml=e,t.parsedYml=b(e)})):(e.persist(),e.target.value!==r.yml&&s((function(t){t.yml=e.target.value,t.parsedYml=b(e.target.value)})))}})};function ce(e){return e.map((function(e){return{key:e,value:e,label:e}}))}var le=function(e){var t=e.name,n=void 0===t?"":t,a=e.pages,i=void 0===a?[]:a,c=e.navigate,l=void 0===c?function(){}:c,r=e.onChange,s=o.a.useState(n),u=Object(v.a)(s,2),d=u[0],p=u[1],m=o.a.useCallback((function(e){l("string"===typeof e?"/"+e:"/"+e.target.value)}),[l]);return o.a.useEffect((function(){d!==n&&(p(n),r&&r(n))}),[d,n,r]),{selectedPage:d,selectPage:m,selectPageOptions:ce(i)}},re={galaxyS5:{label:"Galaxy S5",sizes:{width:360,height:640}},iPhone5:{label:"iPhone 5",sizes:{width:320,height:568}},iPhone6_7_8:{label:"iPhone 6, 7, 8",sizes:{width:375,height:667}},iPhone6_7_8_Plus:{label:"iPhone 6, 7, 8 Plus",sizes:{width:414,height:736}},iPad:{label:"iPad",sizes:{width:768,height:1024}}},se=Object.keys(re).map((function(e){return{key:e,value:e,label:re[e].label}}));var ue=function(e){var t=e.initialValue,n=void 0===t?"galaxyS5":t,a=o.a.useState(n),i=Object(v.a)(a,2),c=i[0],l=i[1];return{selectDevice:function(e){"string"===typeof e?l(e):(e.persist(),l(e.target.value))},selectedDevice:c,selectDeviceOptions:se}},de={config:null,baseCss:null,basePage:null,pages:[],initialPageYml:""};var pe=function(e){var t=e.baseUrl,n=e.location,a=e.params,i=void 0===a?{}:a,c=e.navigate,l=e.uidlEndpoint,r=Object(ee.a)(de),s=Object(v.a)(r,2),u=s[0],d=s[1],p=ue({initialValue:"galaxyS5"}),g=p.selectedDevice,b=p.selectDevice,f=p.selectDeviceOptions,h=le({name:(null===i||void 0===i?void 0:i.page)||"1_SignIn",pages:u.pages,navigate:c}),y=h.selectedPage,O=h.selectPage,j=ie({initialValue:"",pageName:(null===i||void 0===i?void 0:i.page)||"1_SignIn"}),x=j.yml,E=j.parsedYml,w=j.setYml;return o.a.useEffect((function(){function e(){return(e=Object(H.a)(W.a.mark((function e(){var t,a,o,i,r,s,u,p;return W.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("undefined"===typeof window){e.next=19;break}if(!(t=window.localStorage.getItem("uidl-uw"))){e.next=6;break}t=JSON.parse(t),e.next=10;break;case 6:return e.next=8,te.uidl.getUIDL(l);case 8:t=e.sent,window.localStorage.setItem("uidl-uw",JSON.stringify(t));case 10:return o=(a=t).baseUrl,i=void 0===o?"":o,r=a.page,s=void 0===r?[]:r,e.next=13,te.uidl.getUIDL("".concat(i,"BaseCSS.yml"));case 13:return u=e.sent,e.next=16,te.uidl.getUIDL("".concat(i,"BasePage_en.yml"));case 16:p=e.sent,"/"===(null===n||void 0===n?void 0:n.pathname)&&c(t.startPage||"1_SignIn"),d((function(e){e.config=t,e.baseCss=u,e.basePage=p,e.pages=s}));case 19:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),o.a.useEffect((function(){function e(){return(e=Object(H.a)(W.a.mark((function e(){var n,a,o,i;return W.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a="".concat((null===(n=u.config)||void 0===n?void 0:n.baseUrl)||t).concat(y,"_en.yml"),e.next=4,Z.a.get(a);case 4:o=e.sent,i=o.data,w(i),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0),window.alert(e.t0.message);case 13:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}R({msg:'Fetching uidl page "'.concat(y,'"'),color:"#a80a7a"}),function(){e.apply(this,arguments)}()}),[y]),Object(m.a)({},u,{selectDevice:b,selectedDevice:g,selectDeviceOptions:f,selectPage:O,selectedPage:y,yml:x,parsedYml:E,setYml:w,onSelectDevice:function(e){b(e)},onSelectPage:function(e){O(e)}})},ve="".concat("https://public.aitmed.com/alpha/","uidlEndpoint.yml");function me(e){var t=e.style,n=Object(g.a)(e,["style"]),a=Object(m.a)({},t,{},"bodyContainer"===n.componentId?{background:"#fff"}:void 0,{},"header"===n.componentId?{background:"#fff"}:void 0);return o.a.createElement($,Object.assign({style:a},n))}var ge=function(e){var t=e.history,n=e.location,a=e.match,i=o.a.useState(re.galaxyS5.sizes.width),c=Object(v.a)(i,2),l=c[0],r=c[1],s=o.a.useState(re.galaxyS5.sizes.height),u=Object(v.a)(s,2),d=u[0],p=u[1],m=y()(),g=Object(O.a)(m.breakpoints.only("xl")),h=pe({baseUrl:"https://public.aitmed.com/alpha/",uidlEndpoint:ve,location:n,params:null===a||void 0===a?void 0:a.params,navigate:t.push}),x=h.config,E=h.baseCss,w=h.basePage,I=h.pages,k=h.selectDevice,C=h.selectedDevice,D=h.selectDeviceOptions,Y=h.selectedPage,_=(h.initialPageYml,h.yml),F=h.parsedYml,L=h.setYml,A=(h.onSelectDevice,h.onSelectPage);return o.a.useEffect((function(){var e=re[C];r(e.sizes.width),p(e.sizes.height)}),[C]),o.a.createElement(f.a,{style:{width:"100%",height:"100%",minHeight:"100vh",overflowX:"hidden"},justify:"center",direction:"iPad"!==C||g?"row":"column",container:!0},o.a.createElement(f.a,{xs:12,sm:6,md:6,lg:4,xl:5,item:!0},o.a.createElement(z,{component:f.a,label:"Component Board",sublabel:"Draggable components",height:"60%"})),o.a.createElement(f.a,{style:{paddingLeft:12,paddingRight:12,overflow:"hidden"},xs:12,sm:6,md:6,lg:6,xl:5,item:!0},o.a.createElement(V,null,o.a.createElement(N,{name:"device",label:"Select Device",value:C,onChange:k,options:D})),o.a.createElement(N,{name:"page",label:"Select Page",value:Y,onChange:A,options:ce(I)}),o.a.createElement(z,{label:"Functions",sublabel:"Detected Functions"}),o.a.createElement(z,{label:"Assets",sublabel:"Detected Assets"})),o.a.createElement(f.a,{style:{overflow:"hidden"},xs:12,sm:12,md:6,lg:4,xl:5,item:!0},o.a.createElement(j.a,{component:"div",align:"center",variant:"caption",color:"secondary"},l,"px / ",d,"px"),o.a.createElement("div",{style:{margin:"auto",position:"relative",width:l,height:d,border:"2px solid magenta"}},o.a.createElement(b.a,{baseCss:E,basePage:w,page:F,config:x,components:{Button:T,Image:K,Input:G,Label:X,Div:me,Select:q},viewportWidth:l,viewportHeight:d}))),o.a.createElement(f.a,{style:{paddingLeft:12,paddingRight:12},xs:12,sm:6,md:6,lg:6,xl:5,item:!0},o.a.createElement(S,{value:_,onChange:L}),o.a.createElement(z,{label:"History",sublabel:"(Saves every 15 seconds. Maximum 8 items in stack)"},o.a.createElement(P,{storedKey:F&&F.pageName||"",storedObj:{data:_},render:function(e){var t=e.cache,n=e.id;return console.log("autosave cache: ",t),console.log("autosave id: ",n),null}}))))},be=o.a.createContext(void 0),fe={authenticated:!1,status:null,verification:{code:null,pending:!1,timedOut:!1,error:null},creating:{pending:!1,confirmingPassword:!1}};function he(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:fe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"set-authenticated":return Object(m.a)({},e,{authenticated:t.authenticated});case"set-vcode":return Object(m.a)({},e,{verification:Object(m.a)({},e.verification,{code:t.code})});case"set-vcode-in-process":return Object(m.a)({},e,{verification:Object(m.a)({},e.verification,{pending:t.pending,timedOut:!1})});case"set-vcode-timed-out":return Object(m.a)({},e,{verification:Object(m.a)({},e.verification,{timedOut:t.timedOut})});case"set-vcode-error":return Object(m.a)({},e,{verification:Object(m.a)({},e.verification,{error:t.error})});case"set-creating-in-process":return Object(m.a)({},e,{creating:Object(m.a)({},e.creating,{pending:t.creating})});case"set-creating-confirming-password":return Object(m.a)({},e,{creating:Object(m.a)({},e.creating,{confirmingPassword:t.confirming})});default:return e}}var ye=function(e){var t=e.children,n=o.a.useReducer(he,fe),a=Object(v.a)(n,2),i=a[0],c=a[1];o.a.useEffect((function(){var e;!i.authenticated&&(null===(e=i.status)||void 0===e||e.code)}),[i.authenticated,i.status]);var l=Object(m.a)({},i,{setAuthenticated:function(e){c({type:"set-authenticated",authenticated:e})},setCreatingAccount:function(e){c({type:"set-creating-in-process",creating:e})},setConfirmingPassword:function(e){c({type:"set-creating-confirming-password",confirming:e})},setVcode:function(e){c({type:"set-vcode",code:e})},setPendingVCode:function(e){c({type:"set-vcode-in-process",pending:e})},setTimedOutVCode:function(e){c({type:"set-vcode-timed-out",timedOut:e})},setErrorVCode:function(e){c({type:"set-vcode-error",error:e})}});return o.a.createElement(Oe.Provider,{value:l},t)},Oe=o.a.createContext(fe),je={modal:{name:"",opened:!1,title:"",subtitle:""},css:null};function xe(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:je,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"open-modal":return Object(m.a)({},e,{modal:Object(m.a)({},e.modal,{},t.modal,{opened:!0})});case"close-modal":return Object(m.a)({},e,{modal:Object(m.a)({},e.modal,{},t.modal,{opened:!1})});case"set-css":return Object(m.a)({},e,{css:t.css});default:return e}}var Ee=function(e){var t=e.children,n=o.a.useReducer(xe,je),a=Object(v.a)(n,2),i=a[0],c=a[1],l=o.a.useContext(Oe);o.a.useEffect((function(){var e;l&&!l.authenticated&&(null===(e=l.status)||void 0===e||e.code)}),[l]),o.a.useEffect((function(){R({msg:"AppProviderState:",data:i,color:"olive"})}),[i]);var r=Object(m.a)({},i,{openModal:function(e){c({type:"open-modal",modal:e})},closeModal:function(e){c({type:"close-modal",modal:e})},setCss:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;c({type:"set-css",css:e})}});return o.a.createElement(be.Provider,{value:r},t)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(o.a.Fragment,null,o.a.createElement(p,null),o.a.createElement(ye,null,o.a.createElement(Ee,null,o.a.createElement(l.a,null,o.a.createElement(r.c,null,o.a.createElement(r.a,{path:"/",component:ge,exact:!0}),o.a.createElement(r.a,{path:"/:page",component:ge})))))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[153,1,2]]]);
//# sourceMappingURL=main.407aaa2c.chunk.js.map