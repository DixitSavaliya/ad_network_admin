(this.webpackJsonpad_network=this.webpackJsonpad_network||[]).push([[25],{799:function(e,a,t){"use strict";t.r(a);var r=t(153),n=t(154),s=t(157),l=t(155),o=t(152),c=t(156),m=t(2),i=t.n(m),u=t(158),d=t(567),p=t(642),h=t(643),E=t(800),g=t(644),w=t(645),v=t(576),f=t(646),N=t(647),y=t(539),b=t(518),k=t(540),S=(t(81),t(504)),x=function(e){function a(e){var t;return Object(r.a)(this,a),(t=Object(s.a)(this,Object(l.a)(a).call(this,e))).validate=function(){var e="",a="";return t.state.username||(a="please enter username"),t.state.password||(e="please enter password"),!a&&!e||(t.setState({usernameerror:a,passworderror:e}),!1)},t.state={username:"",usernameerror:"",password:"",passworderror:"",user_group:"",user:""},t.handleChangeEvent=t.handleChangeEvent.bind(Object(o.a)(t)),t.Login=t.Login.bind(Object(o.a)(t)),t}return Object(c.a)(a,e),Object(n.a)(a,[{key:"handleChangeEvent",value:function(e){e.preventDefault();var a=this.state;a[e.target.name]=e.target.value,this.setState(a)}},{key:"Login",value:function(){var e=this;if(this.validate()&&(console.log(this.state),this.setState({password:"",passworderror:"",username:"",usernameerror:""})),this.state.username&&this.state.password){var a={username:this.state.username,password:this.state.password,user_group:"admin"};S.a.login(a).then((function(a){if(a){e.setState({user:a.data.data}),console.log("login response===",e.state.user),localStorage.setItem("ad_network_auth",JSON.stringify(e.state.user));var t=JSON.parse(localStorage.getItem("ad_network_auth"));console.log("auth",t),setTimeout(window.location.href="/",6e3)}})).catch((function(e){}))}}},{key:"render",value:function(){return i.a.createElement("div",{className:"app flex-row align-items-center"},i.a.createElement(d.a,null,i.a.createElement(p.a,{className:"justify-content-center"},i.a.createElement(h.a,{md:"8"},i.a.createElement(E.a,null,i.a.createElement(g.a,{className:"p-4"},i.a.createElement(w.a,null,i.a.createElement(v.a,null,i.a.createElement("h1",null,"Login"),i.a.createElement("p",{className:"text-muted"},"Sign In to your account"),i.a.createElement(f.a,{className:"mb-3"},i.a.createElement(N.a,{addonType:"prepend"},i.a.createElement(y.a,null,i.a.createElement("i",{className:"icon-user"}))),i.a.createElement(b.a,{type:"text",name:"username",className:"form-control",value:this.state.username,onChange:this.handleChangeEvent,placeholder:"Username",autoComplete:"username"}),i.a.createElement("div",{style:{fontSize:12,color:"red"}},this.state.usernameerror)),i.a.createElement(f.a,{className:"mb-4"},i.a.createElement(N.a,{addonType:"prepend"},i.a.createElement(y.a,null,i.a.createElement("i",{className:"icon-lock"}))),i.a.createElement(b.a,{type:"password",name:"password",className:"form-control",value:this.state.password,onChange:this.handleChangeEvent,placeholder:"Password",autoComplete:"current-password"}),i.a.createElement("div",{style:{fontSize:12,color:"red"}},this.state.passworderror)),i.a.createElement(p.a,null,i.a.createElement(h.a,{xs:"6"},i.a.createElement(k.a,{type:"button",color:"primary",className:"px-4",onClick:this.Login},"Login")),i.a.createElement(h.a,{xs:"6",className:"text-right"},i.a.createElement(u.Link,{to:"/ForgotPassword"}," ",i.a.createElement(k.a,{color:"link",className:"px-0"},"Forgot password?"))))))),i.a.createElement(g.a,{className:"text-white bg-primary py-5 d-md-down-none",style:{width:"44%"}},i.a.createElement(w.a,{className:"text-center"},i.a.createElement("div",null,i.a.createElement("h2",null,"Sign up"),i.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."),i.a.createElement(u.Link,{to:"/register"},i.a.createElement(k.a,{color:"primary",className:"mt-3",active:!0,tabIndex:-1},"Register Now!"))))))))))}}]),a}(m.Component);a.default=x}}]);
//# sourceMappingURL=25.f12f12ec.chunk.js.map