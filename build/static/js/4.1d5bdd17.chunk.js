(this.webpackJsonphrms=this.webpackJsonphrms||[]).push([[4],{1095:function(t,e,a){"use strict";a.r(e),a.d(e,"default",(function(){return w}));var r=a(1),n=a(27),l=a.n(n),c=a(87),s=a(404),u=(a(30),a(7)),o=a.n(u),i=a(9),p=a(12),d=a(16),f=a(13),y=a(565),b=a(26),j=a.n(b),h=a(37);function O(){return(O=Object(p.a)(o.a.mark((function t(e){var a,r;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,j.a.get("".concat(f.B,"?fi=").concat(e));case 2:return a=t.sent,r=a.data,t.abrupt("return",r);case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function m(t){var e=Object(r.useState)("all"),a=Object(i.a)(e,2),n=a[0],l=a[1],c=Object(r.useState)(""),s=Object(i.a)(c,2),u=s[0],o=s[1],p=Object(r.useCallback)((function(t){return Object(y.a)(t,n)}),[n]),f=Object(d.useQuery)([h.a.payrunstatus,u],(function(){return function(t){return O.apply(this,arguments)}(u)}),{select:"all"!==n?p:void 0}).data;return{payrunstatus:void 0===f?[]:f,filter:n,setFilter:l,setPayrunStatusId:o}}var v=a(2);function w(t){var e=t.status,a=g(),n=m(),c=n.payrunstatus,u=n.setPayrunStatusId,o=Object(r.useMemo)((function(){return[{title:"Payrun Batch",field:"payrun",type:"date",dateSetting:{locale:"en-GB"}},{title:"Total Wages",field:"totalwages",type:"currency"},{title:"TAP Amount",field:"totaltap",type:"currency"},{title:"SCP Amount",field:"totalscp",type:"currency"},{title:"Site Allowances",field:"totalsitesallows",type:"currency"},{title:"Expenses Claims",field:"totalexpensesclaims",type:"currency"},{title:"Total Allowances",field:"totalallows",type:"currency"},{title:"Total Deductions",field:"totaldeducts",type:"currency"},{title:"Total Payroll",field:"totalpayroll",type:"currency"},{title:"Status",field:"status"}]}),[]);return Object(r.useEffect)((function(){u(e)}),[]),Object(v.jsx)("div",{className:a.root,children:Object(v.jsx)(s.b,{maxW:"100%",pt:"5px",overflow:"Scroll",children:Object(v.jsx)(l.a,{columns:o,data:c,title:"Payslips",options:{filtering:!1,search:!1,toolbar:!1,paging:!1,headerStyle:{backgroundColor:"rgba(75, 192, 192, 1)",color:"#FFF"},showTitle:!1}})})})}var g=Object(c.a)((function(t){return{root:{padding:0}}}))}}]);
//# sourceMappingURL=4.1d5bdd17.chunk.js.map