(this.webpackJsonpad_network=this.webpackJsonpad_network||[]).push([[15],{503:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var r={baseApiUrl:"https://192.241.153.53:3005/"}},505:function(e,t,a){"use strict";var r,n=a(506),s=a.n(n),o=a(503),l=0;s.a.interceptors.request.use((function(e){var t=JSON.parse(localStorage.getItem("ad_network_auth"));return e.headers.Authorization="Barier "+(t?t.access_token:""),e.headers["content-md5"]=t?t.secret_key:"",e.data&&e.url!=o.a.baseApiUrl+"User/getAuthTokens"&&(e.data.end_user_key=t?t.secret_key:""),e.url!=o.a.baseApiUrl+"User/getAccessTokenByRefreshToken"?((r={}).url=e.url,r.body=e.data,r.method=e.method,r.headers=e.headers):console.log("config",e),e}),(function(e){console.log("error: ",e)})),s.a.interceptors.response.use((function(e){var t=JSON.parse(localStorage.getItem("ad_network_auth")),a=0;if(void 0==e.data.token)return e;0==l&&(l=1,s.a.post(o.a.baseApiUrl+"User/getAccessTokenByRefreshToken",{refresh_token:t.refresh_token,username:t.username?t.username:t.email_id}).then((function(t){localStorage.setItem("ad_network_auth",JSON.stringify(t.data.data)),0==a&&(a=1,r.headers.Authorization="Barier "+(t.data.data?t.data.data.access_token:""),s.a[r.method](r.url,r.body,{headers:r.headers}).then((function(t){return e=t})).catch((function(e){return e})))})).catch((function(e){console.log("intercepting error of refresh token",e)})))}),(function(e){var t=e.config,a=JSON.parse(localStorage.getItem("ad_network_auth"));return 401===e.response.status?(window.location.href="/login",Promise.reject(e)):(401!==e.response.status||t._retry||(t._retry=!0,s.a.defaults.headers.post.Authorization="Barier "+(a?a.refresh_token:"")),Promise.reject(e))}));t.a={login:function(e){return s.a.post(o.a.baseApiUrl+"User/getAuthTokens",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},getUserDetail:function(e){return s.a.post(o.a.baseApiUrl+"User/currentUser",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},changePassword:function(e){return s.a.post(o.a.baseApiUrl+"User/changePassword",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},ForgotPassword:function(e){return s.a.post(o.a.baseApiUrl+"User/forgotPassword",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},updateUserDetail:function(e){return s.a.post(o.a.baseApiUrl+"User/updateUserDetailsById",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},getUserDetailsByUserGroupId:function(e){return s.a.post(o.a.baseApiUrl+"User/getUserDetailsByUserGroupId",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},addUserRole:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/registerUserRole",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},getUserRoleData:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/getUserRole",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},deleteUserRole:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/deleteUserRole",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},editUserRole:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/updateUserRole",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},searchUserRole:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/searchUserRole",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},countUserRole:function(){return s.a.post(o.a.baseApiUrl+"UserRole/countUserRole").then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},getUserRoleDetailsPg:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/getUserRoleDetailsPg",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},addUserRight:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/registerUserRight",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},getUserRightData:function(){return s.a.post(o.a.baseApiUrl+"UserRole/getUserRight").then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},deleteUserRight:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/deleteUserRight",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},editUserRight:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/updateUserRight",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},searchUserRight:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/searchUserRight",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},countUserRight:function(){return s.a.post(o.a.baseApiUrl+"UserRole/countUserRight").then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},getUserRightDetailsPg:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/getUserRightDetailsPg",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},getUserRoleToRightData:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/getUserRoleToRight",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},updateUserRightToRoleData:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/registerUserRoleToRight",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},uploadIcon:function(e){return s.a.post(o.a.baseApiUrl+"Application/uploadApplicationIcon",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},createApp:function(e){return s.a.post(o.a.baseApiUrl+"Application/insertApplication",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},getApplication:function(){return s.a.post(o.a.baseApiUrl+"Application/getApplication").then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},getApplicationCountData:function(){return s.a.post(o.a.baseApiUrl+"Application/countApplication").then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},getApplicationPageDataPg:function(e){return s.a.post(o.a.baseApiUrl+"Application/applicationByPg",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},searchAppData:function(e){return s.a.post(o.a.baseApiUrl+"Application/applicationBySearch",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},getApp:function(e){return s.a.post(o.a.baseApiUrl+"Application/getApplication",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},editApp:function(e){return s.a.post(o.a.baseApiUrl+"Application/updateApplication",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},deleteAppData:function(e){return s.a.post(o.a.baseApiUrl+"Application/deleteApplication",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},uploadImage:function(e){return console.log("data",e.get("file_name")),s.a.post(o.a.baseApiUrl+"User/uploadUserImage",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})}}},522:function(e,t,a){"use strict";var r=a(26),n=a(103),s=a(3),o=a.n(s),l=a(58),c=a.n(l),i=a(501),u=a.n(i),d=a(502),h={children:c.a.node,row:c.a.bool,check:c.a.bool,inline:c.a.bool,disabled:c.a.bool,tag:d.e,className:c.a.string,cssModule:c.a.object},p=function(e){var t=e.className,a=e.cssModule,s=e.row,l=e.disabled,c=e.check,i=e.inline,h=e.tag,p=Object(n.a)(e,["className","cssModule","row","disabled","check","inline","tag"]),g=Object(d.c)(u()(t,!!s&&"row",c?"form-check":"form-group",!(!c||!i)&&"form-check-inline",!(!c||!l)&&"disabled"),a);return"fieldset"===h&&(p.disabled=l),o.a.createElement(h,Object(r.a)({},p,{className:g}))};p.propTypes=h,p.defaultProps={tag:"div"},t.a=p},523:function(e,t,a){"use strict";var r=a(26),n=a(103),s=a(3),o=a.n(s),l=a(58),c=a.n(l),i=a(501),u=a.n(i),d=a(502),h=c.a.oneOfType([c.a.number,c.a.string]),p=c.a.oneOfType([c.a.string,c.a.number,c.a.shape({size:h,order:h,offset:h})]),g={children:c.a.node,hidden:c.a.bool,check:c.a.bool,size:c.a.string,for:c.a.string,tag:d.e,className:c.a.string,cssModule:c.a.object,xs:p,sm:p,md:p,lg:p,xl:p,widths:c.a.array},m={tag:"label",widths:["xs","sm","md","lg","xl"]},f=function(e,t,a){return!0===a||""===a?e?"col":"col-"+t:"auto"===a?e?"col-auto":"col-"+t+"-auto":e?"col-"+a:"col-"+t+"-"+a},b=function(e){var t=e.className,a=e.cssModule,s=e.hidden,l=e.widths,c=e.tag,i=e.check,h=e.size,p=e.for,g=Object(n.a)(e,["className","cssModule","hidden","widths","tag","check","size","for"]),m=[];l.forEach((function(t,r){var n=e[t];if(delete g[t],n||""===n){var s,o=!r;if(Object(d.a)(n)){var l,c=o?"-":"-"+t+"-";s=f(o,t,n.size),m.push(Object(d.c)(u()(((l={})[s]=n.size||""===n.size,l["order"+c+n.order]=n.order||0===n.order,l["offset"+c+n.offset]=n.offset||0===n.offset,l))),a)}else s=f(o,t,n),m.push(s)}}));var b=Object(d.c)(u()(t,!!s&&"sr-only",!!i&&"form-check-label",!!h&&"col-form-label-"+h,m,!!m.length&&"col-form-label"),a);return o.a.createElement(c,Object(r.a)({htmlFor:p},g,{className:b}))};b.propTypes=g,b.defaultProps=m,t.a=b},528:function(e,t,a){"use strict";var r=a(26),n=a(103),s=a(3),o=a.n(s),l=a(58),c=a.n(l),i=a(501),u=a.n(i),d=a(502),h={className:c.a.string,cssModule:c.a.object,size:c.a.string,bordered:c.a.bool,borderless:c.a.bool,striped:c.a.bool,dark:c.a.bool,hover:c.a.bool,responsive:c.a.oneOfType([c.a.bool,c.a.string]),tag:d.e,responsiveTag:d.e,innerRef:c.a.oneOfType([c.a.func,c.a.string,c.a.object])},p=function(e){var t=e.className,a=e.cssModule,s=e.size,l=e.bordered,c=e.borderless,i=e.striped,h=e.dark,p=e.hover,g=e.responsive,m=e.tag,f=e.responsiveTag,b=e.innerRef,v=Object(n.a)(e,["className","cssModule","size","bordered","borderless","striped","dark","hover","responsive","tag","responsiveTag","innerRef"]),U=Object(d.c)(u()(t,"table",!!s&&"table-"+s,!!l&&"table-bordered",!!c&&"table-borderless",!!i&&"table-striped",!!h&&"table-dark",!!p&&"table-hover"),a),R=o.a.createElement(m,Object(r.a)({},v,{ref:b,className:U}));if(g){var E=Object(d.c)(!0===g?"table-responsive":"table-responsive-"+g,a);return o.a.createElement(f,{className:E},R)}return R};p.propTypes=h,p.defaultProps={tag:"table",responsiveTag:"div"},t.a=p},562:function(e,t,a){"use strict";var r=a(26),n=a(103),s=a(3),o=a.n(s),l=a(58),c=a.n(l),i=a(501),u=a.n(i),d=a(502),h=a(151),p=a(46),g={className:c.a.string,id:c.a.oneOfType([c.a.string,c.a.number]).isRequired,label:c.a.node,valid:c.a.bool,invalid:c.a.bool,bsSize:c.a.string,htmlFor:c.a.string,cssModule:c.a.object,onChange:c.a.func,children:c.a.oneOfType([c.a.node,c.a.array,c.a.func]),innerRef:c.a.oneOfType([c.a.object,c.a.string,c.a.func])},m=function(e){function t(t){var a;return(a=e.call(this,t)||this).state={files:null},a.onChange=a.onChange.bind(Object(h.a)(a)),a}Object(p.a)(t,e);var a=t.prototype;return a.onChange=function(e){var t=e.target,a=this.props.onChange,r=this.getSelectedFiles(t);"function"===typeof a&&a.apply(void 0,arguments),this.setState({files:r})},a.getSelectedFiles=function(e){if(this.props.multiple&&e.files)return[].slice.call(e.files).map((function(e){return e.name})).join(", ");if(-1!==e.value.indexOf("fakepath")){var t=e.value.split("\\");return t[t.length-1]}return e.value},a.render=function(){var e=this.props,t=e.className,a=e.label,s=e.valid,l=e.invalid,c=e.cssModule,i=e.children,h=(e.bsSize,e.innerRef),p=e.htmlFor,g=(e.type,e.onChange,e.dataBrowse),m=Object(n.a)(e,["className","label","valid","invalid","cssModule","children","bsSize","innerRef","htmlFor","type","onChange","dataBrowse"]),f=Object(d.c)(u()(t,"custom-file"),c),b=Object(d.c)(u()(l&&"is-invalid",s&&"is-valid"),c),v=p||m.id,U=this.state.files;return o.a.createElement("div",{className:f},o.a.createElement("input",Object(r.a)({type:"file"},m,{ref:h,className:u()(b,Object(d.c)("custom-file-input",c)),onChange:this.onChange})),o.a.createElement("label",{className:Object(d.c)("custom-file-label",c),htmlFor:v,"data-browse":g},U||a||"Choose file"),i)},t}(o.a.Component);m.propTypes=g;var f=m,b={className:c.a.string,id:c.a.oneOfType([c.a.string,c.a.number]).isRequired,type:c.a.string.isRequired,label:c.a.node,inline:c.a.bool,valid:c.a.bool,invalid:c.a.bool,bsSize:c.a.string,htmlFor:c.a.string,cssModule:c.a.object,children:c.a.oneOfType([c.a.node,c.a.array,c.a.func]),innerRef:c.a.oneOfType([c.a.object,c.a.string,c.a.func])};function v(e){var t=e.className,a=e.label,s=e.inline,l=e.valid,c=e.invalid,i=e.cssModule,h=e.children,p=e.bsSize,g=e.innerRef,m=e.htmlFor,b=Object(n.a)(e,["className","label","inline","valid","invalid","cssModule","children","bsSize","innerRef","htmlFor"]),v=b.type,U=Object(d.c)(u()(t,"custom-"+v,!!p&&"custom-"+v+"-"+p),i),R=Object(d.c)(u()(c&&"is-invalid",l&&"is-valid"),i),E=m||b.id;if("select"===v){b.type;var k=Object(n.a)(b,["type"]);return o.a.createElement("select",Object(r.a)({},k,{ref:g,className:u()(R,U)}),h)}if("file"===v)return o.a.createElement(f,e);if("checkbox"!==v&&"radio"!==v&&"switch"!==v)return o.a.createElement("input",Object(r.a)({},b,{ref:g,className:u()(R,U)}));var S=u()(U,Object(d.c)(u()("custom-control",{"custom-control-inline":s}),i));return o.a.createElement("div",{className:S},o.a.createElement("input",Object(r.a)({},b,{type:"switch"===v?"checkbox":v,ref:g,className:u()(R,Object(d.c)("custom-control-input",i))})),o.a.createElement("label",{className:Object(d.c)("custom-control-label",i),htmlFor:E},a),h)}v.propTypes=b;t.a=v},577:function(e,t,a){"use strict";var r=a(26),n=a(103),s=a(151),o=a(46),l=a(3),c=a.n(l),i=a(58),u=a.n(i),d=a(501),h=a.n(d),p=a(502),g={children:u.a.node,inline:u.a.bool,tag:p.e,innerRef:u.a.oneOfType([u.a.object,u.a.func,u.a.string]),className:u.a.string,cssModule:u.a.object},m=function(e){function t(t){var a;return(a=e.call(this,t)||this).getRef=a.getRef.bind(Object(s.a)(a)),a.submit=a.submit.bind(Object(s.a)(a)),a}Object(o.a)(t,e);var a=t.prototype;return a.getRef=function(e){this.props.innerRef&&this.props.innerRef(e),this.ref=e},a.submit=function(){this.ref&&this.ref.submit()},a.render=function(){var e=this.props,t=e.className,a=e.cssModule,s=e.inline,o=e.tag,l=e.innerRef,i=Object(n.a)(e,["className","cssModule","inline","tag","innerRef"]),u=Object(p.c)(h()(t,!!s&&"form-inline"),a);return c.a.createElement(o,Object(r.a)({},i,{ref:l,className:u}))},t}(l.Component);m.propTypes=g,m.defaultProps={tag:"form"},t.a=m},581:function(e,t,a){"use strict";var r=a(26),n=a(103),s=a(3),o=a.n(s),l=a(58),c=a.n(l),i=a(501),u=a.n(i),d=a(502),h={tag:d.e,className:c.a.string,cssModule:c.a.object},p=function(e){var t=e.className,a=e.cssModule,s=e.tag,l=Object(n.a)(e,["className","cssModule","tag"]),c=Object(d.c)(u()(t,"card-title"),a);return o.a.createElement(s,Object(r.a)({},l,{className:c}))};p.propTypes=h,p.defaultProps={tag:"div"},t.a=p},812:function(e,t,a){"use strict";a.r(t);var r=a(152),n=a(153),s=a(156),o=a(154),l=a(151),c=a(155),i=a(3),u=a.n(i),d=a(541),h=a(505),p=a(643),g=a(644),m=a(577),f=a(522),b=a(523),v=a(562),U=a(645),R=a(649),E=a(581),k=a(646),S=a(528),w=a(510),y=a.n(w),A=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(s.a)(this,Object(o.a)(t).call(this,e))).state={userrole:[],userright:[],userid:"",selectroledata:"",_maincheck:!1,noData:!1,auth:JSON.parse(localStorage.getItem("ad_network_auth"))},a.handleMainChange=a.handleMainChange.bind(Object(l.a)(a)),a.handleChange=a.handleChange.bind(Object(l.a)(a)),a.editUserRoleToRight=a.editUserRoleToRight.bind(Object(l.a)(a)),a.onItemSelect=a.onItemSelect.bind(Object(l.a)(a)),a}return Object(c.a)(t,e),Object(n.a)(t,[{key:"componentDidMount",value:function(){var e=this,t={userRole_id:this.state.auth.user_role_id,user_type:this.state.auth.type};h.a.getUserRoleData(t).then((function(t){t?(e.setState({userrole:t.data.data}),console.log("user response===",e.state.userrole)):y.a.fire("Something went wrong!","","warning")})).catch((function(e){y.a.fire("Something went wrong!","","warning")})),h.a.getUserRightData().then((function(t){t?(e.setState({userright:t.data.data}),console.log("user response===",e.state.userright)):y.a.fire("Something went wrong!","","warning")})).catch((function(e){y.a.fire("Something went wrong!","","warning")}))}},{key:"checkMaster",value:function(e){var t=0;e.forEach((function(e){1==e.read&&1==e.write&&1==e.delete&&1==e.import&&1==e.export?(console.log("inside all true"),e._rowChecked=!0,t++):(console.log("inside all false"),e._rowChecked=!1)})),t==e.length?this.setState({_maincheck:!0}):this.setState({_maincheck:!1}),this.setState({selectroledata:e})}},{key:"onItemSelect",value:function(e){var t=this,a=e.target.options[e.target.selectedIndex].value,r=e.target.options[e.target.selectedIndex].innerHTML;this.setState({userid:this.state.userid=a}),this.setState({selectroledata:[]}),this.state.userid?(this.setState({noData:this.state.noData=!1}),h.a.getUserRoleToRightData({userRole:this.state.userid}).then((function(e){if(e){var n=e.data.data;console.log("data",n);for(var s=[],o=function(e){var o=t.state.userright[e],l=n.findIndex((function(e){return e.id==o.id}));l>-1?(o.read=!!n[l].read,o.write=!!n[l].write,o.delete=!!n[l].delete,o.import=!!n[l].import,o.export=!!n[l].export,o.role_id=n[0].role_id,o.role_name=n[0].role_name):(o.read=!1,o.write=!1,o.delete=!1,o.import=!1,o.export=!1,o.role_id=n[0]?n[0].role_id:a,o.role_name=n[0]?n[0].role_name:r),s.push(o)},l=0;l<t.state.userright.length;l++)o(l);console.log("newData",s);var c=0;s.forEach((function(e){1==e.read&&1==e.write&&1==e.delete&&1==e.import&&1==e.export?(e._rowChecked=!0,c++):e._rowChecked=!1})),t.setState({selectroledata:s}),c==s.length?t.setState({_maincheck:!0}):t.setState({_maincheck:!1})}else y.a.fire("Something went wrong!","","warning")})).catch((function(e){y.a.fire("Something went wrong!","","warning")}))):this.setState({noData:this.state.noData=!0})}},{key:"handleMainChange",value:function(e){var t=e.target.checked;this.state.selectroledata.forEach((function(e){e._rowChecked=t,e.read=1==t,e.write=1==t,e.delete=1==t,e.import=1==t,e.export=1==t})),this.setState({selectroledata:this.state.selectroledata}),this.setState({_maincheck:t})}},{key:"handleChange",value:function(e,t,a){var r=e.id,n=t,s=this.state.selectroledata.findIndex((function(e){return e.id==r})),o=this.state.selectroledata;if(s>-1){if("read"!=n&&"write"!=n&&"delete"!=n&&"import"!=n&&"export"!=n){var l=!e._rowChecked;o[s]._rowChecked=l,l?(o[s].read=!0,o[s].write=!0,o[s].delete=!0,o[s].import=!0,o[s].export=!0):(o[s].read=!1,o[s].write=!1,o[s].delete=!1,o[s].import=!1,o[s].export=!1)}else{var c=!e[n];o[s][n]=c}this.setState({selectroledata:o})}this.checkMaster(o)}},{key:"editUserRoleToRight",value:function(){var e=this,t={userRole:this.state.userid,right:this.state.selectroledata};console.log("obj",t),h.a.updateUserRightToRoleData(t).then((function(t){t?(y.a.fire("Rights Allocated Successfully!","","success"),e.componentDidMount()):y.a.fire("Something went wrong!","","warning")})).catch((function(e){y.a.fire("Something went wrong!","","warning")}))}},{key:"render",value:function(){var e=this;return u.a.createElement("div",null,u.a.createElement(p.a,null,u.a.createElement(g.a,{md:"4"},u.a.createElement(m.a,null,u.a.createElement(f.a,null,u.a.createElement(b.a,{for:"exampleCustomSelect"},u.a.createElement("b",null,"Select Role To Manage The All Rights:")),u.a.createElement(v.a,{type:"select",id:"exampleCustomSelect",name:"customSelect",onChange:this.onItemSelect},u.a.createElement("option",{value:""},"Select UserRole:"),this.state.userrole.length>0?this.state.userrole.map((function(e,t){return u.a.createElement("option",{key:e.id,value:e.id},e.name)})):""))),this.state.selectroledata&&!this.state.noData?u.a.createElement(d.a,{className:"mb-2 mr-2",color:"primary",onClick:this.editUserRoleToRight},"Assign Rights"):null),this.state.selectroledata&&!this.state.noData?u.a.createElement(g.a,{md:"8"},u.a.createElement(U.a,{className:"main-card mb-3"},u.a.createElement(R.a,null,u.a.createElement(E.a,{className:"font"},"User Role To Right")),u.a.createElement(k.a,null,u.a.createElement(S.a,{hover:!0,className:"mb-0",bordered:!0},u.a.createElement("thead",null,u.a.createElement("tr",null,u.a.createElement("th",{className:"centers"},u.a.createElement(v.a,{name:"name",value:"value",type:"checkbox",id:"exampleCustomCheckbox",onChange:this.handleMainChange,checked:this.state._maincheck})),u.a.createElement("th",null,"Right"),u.a.createElement("th",null,"Read"),u.a.createElement("th",null,"Write"),u.a.createElement("th",null,"Delete"),u.a.createElement("th",null,"Import"),u.a.createElement("th",null,"Export"))),u.a.createElement("tbody",null,this.state.selectroledata?this.state.selectroledata.map((function(t,a){return u.a.createElement("tr",{key:a},u.a.createElement("td",{className:"centers"},u.a.createElement(v.a,{name:t.module,value:1==e.state.selectroledata[a]._rowChecked?1:0,type:"checkbox",id:t.id,onChange:function(a){return e.handleChange(t,"row",a)},checked:1==e.state.selectroledata[a]._rowChecked})),u.a.createElement("td",null,u.a.createElement("span",null,t.name)),u.a.createElement("td",{className:"centers"},u.a.createElement(v.a,{name:"read",value:1==e.state.selectroledata[a].read?1:0,type:"checkbox",id:t.id+"read",data_type:"read",onChange:function(a){return e.handleChange(t,"read",a)},checked:1==e.state.selectroledata[a].read})),u.a.createElement("td",{className:"centers"},u.a.createElement(v.a,{name:"write",value:1==e.state.selectroledata[a].write?1:0,type:"checkbox",id:t.id+"write",data_type:"write",onChange:function(a){return e.handleChange(t,"write",a)},checked:1==e.state.selectroledata[a].write})),u.a.createElement("td",{className:"centers"},u.a.createElement(v.a,{name:"delete",value:1==e.state.selectroledata[a].delete?1:0,type:"checkbox",id:t.id+"delete",data_type:"delete",onChange:function(a){return e.handleChange(t,"delete",a)},checked:1==e.state.selectroledata[a].delete})),u.a.createElement("td",{className:"centers"},u.a.createElement(v.a,{name:"import",value:1==e.state.selectroledata[a].import?1:0,type:"checkbox",id:t.id+"import",data_type:"import",onChange:function(a){return e.handleChange(t,"import",a)},checked:1==e.state.selectroledata[a].import})),u.a.createElement("td",{className:"centers"},u.a.createElement(v.a,{name:"export",value:1==e.state.selectroledata[a].export?1:0,type:"checkbox",id:t.id+"export",data_type:"export",onChange:function(a){return e.handleChange(t,"export",a)},checked:1==e.state.selectroledata[a].export})))})):null))))):null))}}]),t}(u.a.Component);t.default=A}}]);
//# sourceMappingURL=15.e9813af6.chunk.js.map