(this.webpackJsonphrms=this.webpackJsonphrms||[]).push([[0],{1092:function(t,e,a){"use strict";a.r(e),a.d(e,"default",(function(){return x}));var n=a(1),r=a(27),o=a.n(r),i=a(87),c=a(404),l=a(23),s=a(30),u=a(7),d=a.n(u),f=a(9),p=a(12),b=a(16),j=a(13),h=a(322),y=a(26),O=a.n(y),m=a(37);function w(){return(w=Object(p.a)(d.a.mark((function t(e){var a,n;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,O.a.get("".concat(j.c,"?fv=").concat(e));case 2:return a=t.sent,n=a.data,t.abrupt("return",n);case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function v(){var t=Object(n.useState)("all"),e=Object(f.a)(t,2),a=e[0],r=e[1],o=Object(n.useState)(""),i=Object(f.a)(o,2),c=i[0],l=i[1],s=Object(n.useCallback)((function(t){return Object(h.a)(t,a)}),[a]),u=Object(b.useQuery)([m.a.dailyallowsperiod,c],(function(){return function(t){return w.apply(this,arguments)}(c)}),{select:"all"!==a?s:void 0}).data;return{dailyallowsperiod:void 0===u?[]:u,filter:a,setFilter:r,setDailyAllowsPeriodId:l}}var g=a(2);function x(t){var e=t.month,a=t.year,r=k(),i="".concat(a,"-").concat(e),u=Object(l.d)(s.d),d="Site Allowances (".concat(u,")"),f=v(),p=f.dailyallowsperiod,b=f.setDailyAllowsPeriodId,j=Object(n.useMemo)((function(){return[{title:"Name",field:"name"},{title:"Period",field:"period"},{title:"Location",field:"location"},{title:"Manager",field:"manager"},{title:"Days",field:"no_of_days",type:"numeric"},{title:"Amount",field:"amount",type:"currency"},{title:"Status",field:"status"}]}),[]);return Object(n.useEffect)((function(){b(i)}),[]),Object(g.jsx)("div",{className:r.root,children:Object(g.jsx)(c.b,{maxW:"100%",pt:"5px",overflow:"scroll",children:Object(g.jsx)(o.a,{columns:j,data:p,title:d,options:{filtering:!1,search:!1,toolbar:!1,paging:!1,headerStyle:{backgroundColor:"rgba(75, 192, 192, 1)",color:"#FFF"},showTitle:!1}})})})}var k=Object(i.a)((function(t){return{root:{padding:0},dialog:{width:1e3}}}))}}]);
//# sourceMappingURL=0.686763a7.chunk.js.map