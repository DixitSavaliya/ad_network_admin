(this.webpackJsonpad_network=this.webpackJsonpad_network||[]).push([[21],{503:function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));var a={baseApiUrl:"https://192.241.153.53:3005/"}},505:function(e,t,r){"use strict";var a,n=r(506),s=r.n(n),o=r(503),l=0;s.a.interceptors.request.use((function(e){var t=JSON.parse(localStorage.getItem("ad_network_auth"));return e.headers.Authorization="Barier "+(t?t.access_token:""),e.headers["content-md5"]=t?t.secret_key:"",e.data&&e.url!=o.a.baseApiUrl+"User/getAuthTokens"&&(e.data.end_user_key=t?t.secret_key:""),e.url!=o.a.baseApiUrl+"User/getAccessTokenByRefreshToken"?((a={}).url=e.url,a.body=e.data,a.method=e.method,a.headers=e.headers):console.log("config",e),e}),(function(e){console.log("error: ",e)})),s.a.interceptors.response.use((function(e){var t=JSON.parse(localStorage.getItem("ad_network_auth")),r=0;if(void 0==e.data.token)return e;0==l&&(l=1,s.a.post(o.a.baseApiUrl+"User/getAccessTokenByRefreshToken",{refresh_token:t.refresh_token,username:t.username?t.username:t.email_id}).then((function(t){localStorage.setItem("ad_network_auth",JSON.stringify(t.data.data)),0==r&&(r=1,a.headers.Authorization="Barier "+(t.data.data?t.data.data.access_token:""),s.a[a.method](a.url,a.body,{headers:a.headers}).then((function(t){return e=t})).catch((function(e){return e})))})).catch((function(e){console.log("intercepting error of refresh token",e)})))}),(function(e){var t=e.config,r=JSON.parse(localStorage.getItem("ad_network_auth"));return 401===e.response.status?(window.location.href="/login",Promise.reject(e)):(401!==e.response.status||t._retry||(t._retry=!0,s.a.defaults.headers.post.Authorization="Barier "+(r?r.refresh_token:"")),Promise.reject(e))}));t.a={login:function(e){return s.a.post(o.a.baseApiUrl+"User/getAuthTokens",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},getUserDetail:function(e){return s.a.post(o.a.baseApiUrl+"User/currentUser",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},changePassword:function(e){return s.a.post(o.a.baseApiUrl+"User/changePassword",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},ForgotPassword:function(e){return s.a.post(o.a.baseApiUrl+"User/forgotPassword",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},updateUserDetail:function(e){return s.a.post(o.a.baseApiUrl+"User/updateUserDetailsById",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},getUserDetailsByUserGroupId:function(e){return s.a.post(o.a.baseApiUrl+"User/getUserDetailsByUserGroupId",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},addUserRole:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/registerUserRole",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},getUserRoleData:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/getUserRole",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},deleteUserRole:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/deleteUserRole",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},editUserRole:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/updateUserRole",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},searchUserRole:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/searchUserRole",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},countUserRole:function(){return s.a.post(o.a.baseApiUrl+"UserRole/countUserRole").then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},getUserRoleDetailsPg:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/getUserRoleDetailsPg",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},addUserRight:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/registerUserRight",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},getUserRightData:function(){return s.a.post(o.a.baseApiUrl+"UserRole/getUserRight").then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},deleteUserRight:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/deleteUserRight",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},editUserRight:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/updateUserRight",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},searchUserRight:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/searchUserRight",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},countUserRight:function(){return s.a.post(o.a.baseApiUrl+"UserRole/countUserRight").then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},getUserRightDetailsPg:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/getUserRightDetailsPg",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},getUserRoleToRightData:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/getUserRoleToRight",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},updateUserRightToRoleData:function(e){return s.a.post(o.a.baseApiUrl+"UserRole/registerUserRoleToRight",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},uploadIcon:function(e){return s.a.post(o.a.baseApiUrl+"Application/uploadApplicationIcon",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},createApp:function(e){return s.a.post(o.a.baseApiUrl+"Application/insertApplication",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},getApplication:function(){return s.a.post(o.a.baseApiUrl+"Application/getApplication").then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},getApplicationCountData:function(){return s.a.post(o.a.baseApiUrl+"Application/countApplication").then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},getApplicationPageDataPg:function(e){return s.a.post(o.a.baseApiUrl+"Application/applicationByPg",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},searchAppData:function(e){return s.a.post(o.a.baseApiUrl+"Application/applicationBySearch",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},getApp:function(e){return s.a.post(o.a.baseApiUrl+"Application/getApplication",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},editApp:function(e){return s.a.post(o.a.baseApiUrl+"Application/updateApplication",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},deleteAppData:function(e){return s.a.post(o.a.baseApiUrl+"Application/deleteApplication",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})},uploadImage:function(e){return console.log("data",e.get("file_name")),s.a.post(o.a.baseApiUrl+"User/uploadUserImage",e).then((function(e){return console.log("response===",e),e})).catch({status:500,message:"Internal Server Error"})}}},800:function(e,t,r){"use strict";r.r(t);var a=r(152),n=r(153),s=r(156),o=r(154),l=r(151),c=r(155),i=r(3),u=r.n(i),p=r(500),g=r(568),h=r(643),m=r(644),d=r(801),f=r(645),U=r(646),E=r(577),A=r(647),v=r(648),b=r(540),R=r(519),S=r(541),I=(r(59),r(505)),w=function(e){function t(e){var r;return Object(a.a)(this,t),(r=Object(s.a)(this,Object(o.a)(t).call(this,e))).validate=function(){var e="",t="";return r.state.username||(t="please enter username"),r.state.password||(e="please enter password"),!t&&!e||(r.setState({usernameerror:t,passworderror:e}),!1)},r.state={username:"",usernameerror:"",password:"",passworderror:"",user_group:"",user:""},r.handleChangeEvent=r.handleChangeEvent.bind(Object(l.a)(r)),r.Login=r.Login.bind(Object(l.a)(r)),r}return Object(c.a)(t,e),Object(n.a)(t,[{key:"handleChangeEvent",value:function(e){e.preventDefault();var t=this.state;t[e.target.name]=e.target.value,this.setState(t)}},{key:"Login",value:function(){var e=this;if(this.validate()&&(console.log(this.state),this.setState({password:"",passworderror:"",username:"",usernameerror:""})),this.state.username&&this.state.password){var t={username:this.state.username,password:this.state.password,user_group:"admin"};I.a.login(t).then((function(t){if(t){e.setState({user:t.data.data}),console.log("login response===",e.state.user),localStorage.setItem("ad_network_auth",JSON.stringify(e.state.user));var r=JSON.parse(localStorage.getItem("ad_network_auth"));console.log("auth",r),setTimeout(window.location.href="/",6e3)}})).catch((function(e){}))}}},{key:"render",value:function(){return u.a.createElement("div",{className:"app flex-row align-items-center"},u.a.createElement(g.a,null,u.a.createElement(h.a,{className:"justify-content-center"},u.a.createElement(m.a,{md:"8"},u.a.createElement(d.a,null,u.a.createElement(f.a,{className:"p-4"},u.a.createElement(U.a,null,u.a.createElement(E.a,null,u.a.createElement("h1",null,"Login"),u.a.createElement("p",{className:"text-muted"},"Sign In to your account"),u.a.createElement(A.a,{className:"mb-3"},u.a.createElement(v.a,{addonType:"prepend"},u.a.createElement(b.a,null,u.a.createElement("i",{className:"icon-user"}))),u.a.createElement(R.a,{type:"text",name:"username",className:"form-control",value:this.state.username,onChange:this.handleChangeEvent,placeholder:"Username",autoComplete:"username"}),u.a.createElement("div",{style:{fontSize:12,color:"red"}},this.state.usernameerror)),u.a.createElement(A.a,{className:"mb-4"},u.a.createElement(v.a,{addonType:"prepend"},u.a.createElement(b.a,null,u.a.createElement("i",{className:"icon-lock"}))),u.a.createElement(R.a,{type:"password",name:"password",className:"form-control",value:this.state.password,onChange:this.handleChangeEvent,placeholder:"Password",autoComplete:"current-password"}),u.a.createElement("div",{style:{fontSize:12,color:"red"}},this.state.passworderror)),u.a.createElement(h.a,null,u.a.createElement(m.a,{xs:"6"},u.a.createElement(S.a,{type:"button",color:"primary",className:"px-4",onClick:this.Login},"Login")),u.a.createElement(m.a,{xs:"6",className:"text-right"},u.a.createElement(p.Link,{to:"/ForgotPassword"}," ",u.a.createElement(S.a,{color:"link",className:"px-0"},"Forgot password?"))))))),u.a.createElement(f.a,{className:"text-white bg-primary py-5 d-md-down-none",style:{width:"44%"}},u.a.createElement(U.a,{className:"text-center"},u.a.createElement("div",null,u.a.createElement("h2",null,"Sign up"),u.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."),u.a.createElement(p.Link,{to:"/register"},u.a.createElement(S.a,{color:"primary",className:"mt-3",active:!0,tabIndex:-1},"Register Now!"))))))))))}}]),t}(i.Component);t.default=w}}]);
//# sourceMappingURL=21.c5969ccf.chunk.js.map