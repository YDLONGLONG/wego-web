(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3e2090be"],{"16bc":function(e,t,a){"use strict";a("1a7c")},"1a7c":function(e,t,a){},f21c:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"bg"}),a("div",{staticClass:"main"},[a("div",{staticClass:"left"},[a("div",{staticClass:"title"},[a("div",{staticClass:"title-left"},[a("el-avatar",{attrs:{size:64,src:e.headurl}}),a("router-link",{attrs:{to:"/mine/"+e.user.userid}},[a("span",{staticClass:"span"},[e._v(e._s(e.user.username))])]),a("span",[e._v(e._s(e._f("fullDateFormat")(e.trend.createdate)))])],1),a("div",[e._v(" 管理 ")])]),a("div",{staticClass:"left-main"},[a("div",{staticClass:"left-title"},[e._v(e._s(e.trend.title))]),a("div",{staticClass:"left-article",domProps:{innerHTML:e._s(e.trend.content)}})]),a("div",{staticClass:"comment"},[a("el-row",{staticClass:"textarea",attrs:{type:"flex",align:"middle"}},[a("el-col",{attrs:{span:1}}),a("el-col",{attrs:{span:18}},[a("el-input",{attrs:{type:"textarea",resize:"none",autosize:{minRows:8,maxRows:8},placeholder:"在这里写点什么吧！"},model:{value:e.content,callback:function(t){e.content=t},expression:"content"}})],1),a("el-col",{staticStyle:{"padding-left":"2rem"},attrs:{span:4}},[e.userId?a("el-button",{attrs:{type:"primary"},on:{click:e.sendComment}},[e._v("发表评论")]):e._e()],1)],1),e._l(e.comment,(function(t,r){return a("el-row",{key:t.commentid,staticClass:"readcomment"},[a("el-col",{attrs:{span:2}}),a("el-col",{staticClass:"item",staticStyle:{"border-top":"1px solid #E5E9EF","padding-top":"1rem","margin-top":"1rem"},attrs:{span:22}},[a("router-link",{attrs:{to:"/mine/"+t[0].commentator}},[a("b",[e._v(e._s(t[0].username))])]),a("div",[e._v(e._s(t[0].content))]),a("p",[a("span",[e._v(e._s(e._f("fullDateFormat")(t[0].createdate)))]),a("span",[t[0].commentator==e.userName?a("span",{staticClass:"replySpan",on:{click:function(a){return e.deleteComment(t[0].commentid)}}},[e._v("删除")]):e._e()])]),e._l(t[0].reply,(function(t){return a("el-row",{key:t._id,staticStyle:{margin:"0"}},[a("el-col",{attrs:{span:1}}),a("el-col",{attrs:{span:23}},[a("b",[e._v(e._s(t.username))]),a("span",{staticStyle:{"font-size":"1.2rem",margin:"0 0.4rem"}},[e._v("回复")]),a("b",[e._v(e._s(t.commentator))]),a("span",{staticStyle:{"margin-left":"1rem"}},[e._v(e._s(t.reply_content))]),a("p")])],1)}))],2)],1)}))],2)]),a("div",{staticClass:"right"},[a("div",{staticClass:"title"},[a("div",{staticClass:"title-header"},[a("el-avatar",{attrs:{size:64,src:e.headurl,shape:"square"}}),a("router-link",{attrs:{to:"/mine/"+e.user.userid}},[a("span",[e._v(e._s(e.user.username))])])],1),e._m(0)])])])])},n=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"title-footer"},[a("span",[e._v("主题"),a("div",[e._v("123")])]),a("span",[e._v("点赞"),a("div",[e._v("123")])]),a("span",[e._v("关注"),a("div",[e._v("123")])]),a("span",[e._v("粉丝"),a("div",[e._v("123")])])])}],s=a("1da1"),c=a("5530"),i=(a("ac1f"),a("5319"),a("96cf"),a("2f62")),o=a("ac1b"),l=a("c24f"),u={data:function(){return{trend:{},user:{},content:"",headurl:"",comment:[],commentator:[],reply:[],replyer:[]}},computed:Object(c["a"])({},Object(i["c"])(["userId","userName"])),created:function(){this.init()},methods:{sendComment:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(""!=e.content){t.next=3;break}return e.$message.error("评论不能为空"),t.abrupt("return");case 3:return a=e.$route.params.trendid,t.next=6,Object(o["j"])({trendid:a,commentator:e.userName,content:e.content});case 6:r=t.sent,0==r.errCode?(e.$message.success(r.message),setTimeout((function(){location.reload()}),2e3)):e.$message.error(r.message);case 8:case"end":return t.stop()}}),t)})))()},deleteComment:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(!confirm("确定删除吗")){a.next=5;break}return a.next=3,Object(o["b"])(e);case 3:r=a.sent,0==r.errCode?(t.$message.success(r.message),setTimeout((function(){location.reload()}),2e3)):t.$message.error(r.message);case 5:case"end":return a.stop()}}),a)})))()},init:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a,r,n,s,c,i,u;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=e.$route.params.trendid,t.next=3,Object(o["f"])(a);case 3:return r=t.sent,e.trend=r.data[0],t.next=7,Object(l["e"])(e.trend.userid);case 7:return n=t.sent,e.headurl=e.$apiServer+n.data[0].avatar,t.next=11,Object(l["a"])(e.trend.userid);case 11:return s=t.sent,e.user=s.data[0],t.next=15,Object(o["d"])(e.trend.trendid);case 15:c=t.sent,i=0;case 17:if(!(i<=c.data.length)){t.next=27;break}if(void 0!=c.data[i]){t.next=20;break}return t.abrupt("break",27);case 20:return t.next=22,Object(o["c"])(c.data[i].commentid);case 22:u=t.sent,e.comment.push(u.data);case 24:i++,t.next=17;break;case 27:e.trend.content=e.trend.content.replace(/<img/g,"<img style='max-width:100%;height:auto;'");case 28:case"end":return t.stop()}}),t)})))()}}},d=u,m=(a("16bc"),a("2877")),p=Object(m["a"])(d,r,n,!1,null,"2d85dcfc",null);t["default"]=p.exports}}]);
//# sourceMappingURL=chunk-3e2090be.ff741a01.js.map