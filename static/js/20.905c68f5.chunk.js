(this.webpackJsonpad_network=this.webpackJsonpad_network||[]).push([[20],{503:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var n={baseApiUrl:"https://192.241.153.53:3005/"}},505:function(e,t,r){"use strict";var n,a=r(506),s=r.n(a),o=r(503),l=0;s.a.interceptors.request.use((function(e){var t=JSON.parse(localStorage.getItem("ad_network_auth"));return e.headers.Authorization="Barier "+(t?t.access_token:""),e.headers["content-md5"]=t?t.secret_key:"",e.data&&e.url!=o.a.baseApiUrl+"User/getAuthTokens"&&(e.data.end_user_key=t?t.secret_key:""),e.url!=o.a.baseApiUrl+"User/getAccessTokenByRefreshToken"?((n={}).url=e.url,n.body=e.data,n.method=e.method,n.headers=e.headers):console.log("config",e),e}),(function(e){console.log("error: ",e)})),s.a.interceptors.response.use((function(e){var t=JSON.parse(localStorage.getItem("ad_network_auth")),r=0;if(void 0==e.data.token)return e;0==l&&(l=1,s.a.post(o.a.baseApiUrl+"User/getAccessTokenByRefreshToken",{refresh_token:t.refresh_token,username:t.username?t.username:t.email_id}).then((function(t){localStorage.setItem("ad_network_auth",JSON.stringify(t.data.data)),0==r&&(r=1,n.headers.Authorization="Barier "+(t.data.data?t.data.data.access_token:""),s.a[n.method](n.url,n.body,{headers:n.headers}).then((function(t){return e=t})).catch((function(e){return e})))})).catch((function(e){console.log("intercepting error of refresh token",e)})))}),(function(e){var t=e.config,r=JSON.parse(localStorage.getItem("ad_network_auth"));return 401===e.response.status?(window.location.href="/login",Promise.reject(e)):(401!==e.response.status||t._retry||(t._retry=!0,s.a.defaults.headers.post.Authorization="Barier "+(r?r.refresh_token:"")),Promise.reject(e))}));t.a={login:function(e){return s.a.post(o.a.baseApiUrl+"User/getAuthTokens",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},getUserDetail:function(e){return s.a.post(o.a.baseApiUrl+"User/currentUser",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},changePassword:function(e){return s.a.post(o.a.baseApiUrl+"User/changePassword",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},ForgotPassword:function(e){return s.a.post(o.a.baseApiUrl+"User/forgotPassword",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},updateUserDetail:function(e){return s.a.post(o.a.baseApiUrl+"User/updateUserDetailsById",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},getUserDetailsByUserGroupId:function(e){return s.a.post(o.a.baseApiUrl+"User/getUserDetailsByUserGroupId",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},addUserRole:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/registerUserRole",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},getUserRoleData:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/getUserRole",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},deleteUserRole:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/deleteUserRole",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},editUserRole:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/updateUserRole",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},searchUserRole:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/searchUserRole",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},countUserRole:function(){return s.a.post(o.a.baseApiUrl+"UserRole/countUserRole").then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},getUserRoleDetailsPg:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/getUserRoleDetailsPg",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},addUserRight:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/registerUserRight",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},getUserRightData:function(){return s.a.post(o.a.baseApiUrl+"UserRole/getUserRight").then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},deleteUserRight:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/deleteUserRight",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},editUserRight:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/updateUserRight",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},searchUserRight:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/searchUserRight",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},countUserRight:function(){return s.a.post(o.a.baseApiUrl+"UserRole/countUserRight").then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},getUserRightDetailsPg:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/getUserRightDetailsPg",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},getUserRoleToRightData:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/getUserRoleToRight",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},updateUserRightToRoleData:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/registerUserRoleToRight",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},uploadIcon:function(e){return s.a.post(o.a.baseApiUrl+"Application/uploadApplicationIcon",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},createApp:function(e){return s.a.post(o.a.baseApiUrl+"Application/insertApplication",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},getApplication:function(){return s.a.post(o.a.baseApiUrl+"Application/getApplication").then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},getApplicationCountData:function(){return s.a.post(o.a.baseApiUrl+"Application/countApplication").then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},getApplicationPageDataPg:function(e){return s.a.post(o.a.baseApiUrl+"Application/applicationByPg",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},searchAppData:function(e){return s.a.post(o.a.baseApiUrl+"Application/applicationBySearch",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},getApp:function(e){return s.a.post(o.a.baseApiUrl+"Application/getApplication",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},editApp:function(e){return s.a.post(o.a.baseApiUrl+"Application/updateApplication",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},deleteAppData:function(e){return s.a.post(o.a.baseApiUrl+"Application/deleteApplication",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},uploadImage:function(e){return console.log("data",e.get("file_name")),s.a.post(o.a.baseApiUrl+"User/uploadUserImage",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})}}},803:function(e,t,r){"use strict";r.r(t);var n=r(152),a=r(153),s=r(156),o=r(154),l=r(151),c=r(155),u=r(3),i=r.n(u),p=r(500),g=r(568),h=r(643),m=r(644),f=r(801),U=r(645),d=r(649),A=r(646),E=r(577),v=r(647),R=r(648),b=r(540),S=r(519),I=r(541),y=r(505),k=r(510),_=r.n(k),w=function(e){function t(e){var r;return Object(n.a)(this,t),(r=Object(s.a)(this,Object(o.a)(t).call(this,e))).validate=function(){var e="";return r.state.username||(e="please enter username or email"),!e||(r.setState({usernameerror:e}),!1)},r.state={username:"",usernameerror:""},r.ForgotPassword=r.ForgotPassword.bind(Object(l.a)(r)),r.handleChangeEvent=r.handleChangeEvent.bind(Object(l.a)(r)),r}return Object(c.a)(t,e),Object(a.a)(t,[{key:"handleChangeEvent",value:function(e){e.preventDefault();var t=this.state;t[e.target.name]=e.target.value,this.setState(t)}},{key:"ForgotPassword",value:function(){if(this.validate()&&(console.log(this.state),this.setState({username:"",usernameerror:""}),this.state.username)){var e={username:this.state.username};y.a.ForgotPassword(e).then((function(e){_.a.fire("Email sent Successfully!","","success")})).catch({status:500,message:"Internal Server Error"})}}},{key:"render",value:function(){return i.a.createElement("div",{className:"app flex-row align-items-center"},i.a.createElement(g.a,null,i.a.createElement(h.a,{className:"justify-content-center"},i.a.createElement(m.a,{md:"4"},i.a.createElement(f.a,null,i.a.createElement(U.a,null,i.a.createElement(d.a,null,i.a.createElement("strong",null,"ForgotPassword")),i.a.createElement(A.a,{style:{padding:"30px 20px 20px 20px"}},i.a.createElement(E.a,{style:{minHeight:"55px"}},i.a.createElement(v.a,{className:"mb-3"},i.a.createElement(R.a,{addonType:"prepend"},i.a.createElement(b.a,null,i.a.createElement("i",{className:"icon-user"}))),i.a.createElement(S.a,{type:"text",name:"username",className:"form-control",value:this.state.username,onChange:this.handleChangeEvent,placeholder:"Username or Email",autoComplete:"username"})),i.a.createElement("div",{style:{fontSize:12,color:"red"}},this.state.usernameerror)),i.a.createElement(h.a,null,i.a.createElement(m.a,{xs:"12",sm:"6",md:"6",lg:"6",xl:"6",style:{paddingTop:"10px"}},i.a.createElement(I.a,{type:"button",color:"primary",className:"px-4",onClick:this.ForgotPassword},"Send")),i.a.createElement(m.a,{xs:"12",sm:"6",md:"6",lg:"6",xl:"6",className:"text-right",style:{paddingTop:"10px"}},i.a.createElement(p.Link,{to:"/login"},i.a.createElement(I.a,{type:"button",color:"primary",className:"px-4"},"Back To Login")),"                      ")))))))))}}]),t}(u.Component);t.default=w}}]);
//# sourceMappingURL=20.905c68f5.chunk.js.map