import{m as Ue,p as b,q as A,t as Le,v as He,w as ge,x as V,y as $e,z as P,S as Ie,A as k,U as Y,B as Ne,C as U,D as we,F as q,G as Be,H as ze,I as We,J as se,K as ie,E as Je,L as Xe,M as Ge,N as Ve,O as Ye,P as ve,Q as Qe,T as Ke,V as Ze,W as qe,X as et,Y as tt,Z as nt,_ as rt,r as O,$ as at,j as g,a0 as st,u as Se,a1 as it,a2 as ot,a3 as lt,a4 as ut}from"./components-DHPpVo2E.js";/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */var ct=ft,dt=mt,ht=Object.prototype.toString,D=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function ft(e,t){if(typeof e!="string")throw new TypeError("argument str must be a string");for(var n={},r=t||{},a=r.decode||pt,s=0;s<e.length;){var o=e.indexOf("=",s);if(o===-1)break;var i=e.indexOf(";",s);if(i===-1)i=e.length;else if(i<o){s=e.lastIndexOf(";",o-1)+1;continue}var l=e.slice(s,o).trim();if(n[l]===void 0){var u=e.slice(o+1,i).trim();u.charCodeAt(0)===34&&(u=u.slice(1,-1)),n[l]=wt(u,a)}s=i+1}return n}function mt(e,t,n){var r=n||{},a=r.encode||yt;if(typeof a!="function")throw new TypeError("option encode is invalid");if(!D.test(e))throw new TypeError("argument name is invalid");var s=a(t);if(s&&!D.test(s))throw new TypeError("argument val is invalid");var o=e+"="+s;if(r.maxAge!=null){var i=r.maxAge-0;if(isNaN(i)||!isFinite(i))throw new TypeError("option maxAge is invalid");o+="; Max-Age="+Math.floor(i)}if(r.domain){if(!D.test(r.domain))throw new TypeError("option domain is invalid");o+="; Domain="+r.domain}if(r.path){if(!D.test(r.path))throw new TypeError("option path is invalid");o+="; Path="+r.path}if(r.expires){var l=r.expires;if(!gt(l)||isNaN(l.valueOf()))throw new TypeError("option expires is invalid");o+="; Expires="+l.toUTCString()}if(r.httpOnly&&(o+="; HttpOnly"),r.secure&&(o+="; Secure"),r.partitioned&&(o+="; Partitioned"),r.priority){var u=typeof r.priority=="string"?r.priority.toLowerCase():r.priority;switch(u){case"low":o+="; Priority=Low";break;case"medium":o+="; Priority=Medium";break;case"high":o+="; Priority=High";break;default:throw new TypeError("option priority is invalid")}}if(r.sameSite){var c=typeof r.sameSite=="string"?r.sameSite.toLowerCase():r.sameSite;switch(c){case!0:o+="; SameSite=Strict";break;case"lax":o+="; SameSite=Lax";break;case"strict":o+="; SameSite=Strict";break;case"none":o+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return o}function pt(e){return e.indexOf("%")!==-1?decodeURIComponent(e):e}function yt(e){return encodeURIComponent(e)}function gt(e){return ht.call(e)==="[object Date]"||e instanceof Date}function wt(e,t){try{return t(e)}catch{return e}}/**
 * @remix-run/server-runtime v2.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const oe={};function _e(e,t){!e&&!oe[t]&&(oe[t]=!0,console.warn(t))}/**
 * @remix-run/server-runtime v2.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const vt=({sign:e,unsign:t})=>(n,r={})=>{let{secrets:a=[],...s}={path:"/",sameSite:"lax",...r};return Ct(n,s.expires),{get name(){return n},get isSigned(){return a.length>0},get expires(){return typeof s.maxAge<"u"?new Date(Date.now()+s.maxAge*1e3):s.expires},async parse(o,i){if(!o)return null;let l=ct(o,{...s,...i});return n in l?l[n]===""?"":await _t(t,l[n],a):null},async serialize(o,i){return dt(n,o===""?"":await St(e,o,a),{...s,...i})}}},ee=e=>e!=null&&typeof e.name=="string"&&typeof e.isSigned=="boolean"&&typeof e.parse=="function"&&typeof e.serialize=="function";async function St(e,t,n){let r=Tt(t);return n.length>0&&(r=await e(r,n[0])),r}async function _t(e,t,n){if(n.length>0){for(let r of n){let a=await e(t,r);if(a!==!1)return le(a)}return null}return le(t)}function Tt(e){return btoa(Rt(encodeURIComponent(JSON.stringify(e))))}function le(e){try{return JSON.parse(decodeURIComponent(bt(atob(e))))}catch{return{}}}function bt(e){let t=e.toString(),n="",r=0,a,s;for(;r<t.length;)a=t.charAt(r++),/[\w*+\-./@]/.exec(a)?n+=a:(s=a.charCodeAt(0),s<256?n+="%"+ue(s,2):n+="%u"+ue(s,4).toUpperCase());return n}function ue(e,t){let n=e.toString(16);for(;n.length<t;)n="0"+n;return n}function Rt(e){let t=e.toString(),n="",r=0,a,s;for(;r<t.length;){if(a=t.charAt(r++),a==="%"){if(t.charAt(r)==="u"){if(s=t.slice(r+1,r+5),/^[\da-f]{4}$/i.exec(s)){n+=String.fromCharCode(parseInt(s,16)),r+=5;continue}}else if(s=t.slice(r,r+2),/^[\da-f]{2}$/i.exec(s)){n+=String.fromCharCode(parseInt(s,16)),r+=2;continue}}n+=a}return n}function Ct(e,t){_e(!t,`The "${e}" cookie has an "expires" property set. This will cause the expires value to not be updated when the session is committed. Instead, you should set the expires value when serializing the cookie. You can use \`commitSession(session, { expires })\` if using a session storage object, or \`cookie.serialize("value", { expires })\` if you're using the cookie directly.`)}function L(e){const t=unescape(encodeURIComponent(e));return Uint8Array.from(t,(n,r)=>t.charCodeAt(r))}function xt(e){const t=String.fromCharCode.apply(null,e);return decodeURIComponent(escape(t))}function j(...e){const t=new Uint8Array(e.reduce((r,a)=>r+a.length,0));let n=0;for(const r of e)t.set(r,n),n+=r.length;return t}function Et(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}function ce(e){return e instanceof Uint8Array?t=>e[t]:e}function J(e,t,n,r,a){const s=ce(e),o=ce(n);for(let i=0;i<a;++i)if(s(t+i)!==o(r+i))return!1;return!0}function kt(e){const t=new Array(256).fill(e.length);if(e.length>1)for(let n=0;n<e.length-1;n++)t[e[n]]=e.length-1-n;return t}const T=Symbol("Match");class te{constructor(t){this._lookbehind=new Uint8Array,typeof t=="string"?this._needle=t=L(t):this._needle=t,this._lastChar=t[t.length-1],this._occ=kt(t)}feed(t){let n=0,r;const a=[];for(;n!==t.length;)[n,...r]=this._feed(t,n),a.push(...r);return a}end(){const t=this._lookbehind;return this._lookbehind=new Uint8Array,t}_feed(t,n){const r=[];let a=-this._lookbehind.length;if(a<0){for(;a<0&&a<=t.length-this._needle.length;){const s=this._charAt(t,a+this._needle.length-1);if(s===this._lastChar&&this._memcmp(t,a,this._needle.length-1))return a>-this._lookbehind.length&&r.push(this._lookbehind.slice(0,this._lookbehind.length+a)),r.push(T),this._lookbehind=new Uint8Array,[a+this._needle.length,...r];a+=this._occ[s]}if(a<0)for(;a<0&&!this._memcmp(t,a,t.length-a);)a++;if(a>=0)r.push(this._lookbehind),this._lookbehind=new Uint8Array;else{const s=this._lookbehind.length+a;return s>0&&(r.push(this._lookbehind.slice(0,s)),this._lookbehind=this._lookbehind.slice(s)),this._lookbehind=Uint8Array.from(new Array(this._lookbehind.length+t.length),(o,i)=>this._charAt(t,i-this._lookbehind.length)),[t.length,...r]}}for(a+=n;a<=t.length-this._needle.length;){const s=t[a+this._needle.length-1];if(s===this._lastChar&&t[a]===this._needle[0]&&J(this._needle,0,t,a,this._needle.length-1))return a>n&&r.push(t.slice(n,a)),r.push(T),[a+this._needle.length,...r];a+=this._occ[s]}if(a<t.length){for(;a<t.length&&(t[a]!==this._needle[0]||!J(t,a,this._needle,0,t.length-a));)++a;a<t.length&&(this._lookbehind=t.slice(a))}return a>0&&r.push(t.slice(n,a<t.length?a:t.length)),[t.length,...r]}_charAt(t,n){return n<0?this._lookbehind[this._lookbehind.length+n]:t[n]}_memcmp(t,n,r){return J(this._charAt.bind(this,t),n,this._needle,0,r)}}class Ot{constructor(t,n){this._readableStream=n,this._search=new te(t)}async*[Symbol.asyncIterator](){const t=this._readableStream.getReader();try{for(;;){const r=await t.read();if(r.done)break;yield*this._search.feed(r.value)}const n=this._search.end();n.length&&(yield n)}finally{t.releaseLock()}}}const At=Function.prototype.apply.bind(j,void 0),Te=L("--"),E=L(`\r
`);function Dt(e){const t=e.split(";").map(r=>r.trim());if(t.shift()!=="form-data")throw new Error('malformed content-disposition header: missing "form-data" in `'+JSON.stringify(t)+"`");const n={};for(const r of t){const a=r.split("=",2);if(a.length!==2)throw new Error("malformed content-disposition header: key-value pair not found - "+r+" in `"+e+"`");const[s,o]=a;if(o[0]==='"'&&o[o.length-1]==='"')n[s]=o.slice(1,-1).replace(/\\"/g,'"');else if(o[0]!=='"'&&o[o.length-1]!=='"')n[s]=o;else if(o[0]==='"'&&o[o.length-1]!=='"'||o[0]!=='"'&&o[o.length-1]==='"')throw new Error("malformed content-disposition header: mismatched quotations in `"+e+"`")}if(!n.name)throw new Error("malformed content-disposition header: missing field name in `"+e+"`");return n}function Pt(e){const t=[];let n=!1,r;for(;typeof(r=e.shift())<"u";){const a=r.indexOf(":");if(a===-1)throw new Error("malformed multipart-form header: missing colon");const s=r.slice(0,a).trim().toLowerCase(),o=r.slice(a+1).trim();switch(s){case"content-disposition":n=!0,t.push(...Object.entries(Dt(o)));break;case"content-type":t.push(["contentType",o])}}if(!n)throw new Error("malformed multipart-form header: missing content-disposition");return Object.fromEntries(t)}async function jt(e,t){let n=!0,r=!1;const a=[[]],s=new te(E);for(;;){const o=await e.next();if(o.done)throw new Error("malformed multipart-form data: unexpected end of stream");if(n&&o.value!==T&&Et(o.value.slice(0,2),Te))return[void 0,new Uint8Array];let i;if(o.value!==T)i=o.value;else if(!r)i=t;else throw new Error("malformed multipart-form data: unexpected boundary");if(!i.length)continue;n&&(n=!1);const l=s.feed(i);for(const[u,c]of l.entries()){const p=c===T;if(!(!p&&!c.length)){if(r&&p)return l.push(s.end()),[a.filter(f=>f.length).map(At).map(xt),j(...l.slice(u+1).map(f=>f===T?E:f))];(r=p)?a.push([]):a[a.length-1].push(c)}}}}async function*Mt(e,t){const n=j(Te,L(t)),r=new Ot(n,e)[Symbol.asyncIterator]();for(;;){const s=await r.next();if(s.done)return;if(s.value===T)break}const a=new te(E);for(;;){let u=function(y){const h=[];for(const d of a.feed(y))l&&h.push(E),(l=d===T)||h.push(d);return j(...h)};const[s,o]=await jt(r,n);if(!s)return;async function i(){const y=await r.next();if(y.done)throw new Error("malformed multipart-form data: unexpected end of stream");return y}let l=!1,c=!1;async function p(){const y=await i();let h;if(y.value!==T)h=y.value;else if(!l)h=E;else return c=!0,{value:a.end()};return{value:u(h)}}const f=[{value:u(o)}];for(yield{...Pt(s),data:{[Symbol.asyncIterator](){return this},async next(){for(;;){const y=f.shift();if(!y)break;if(y.value.length>0)return y}for(;;){if(c)return{done:c,value:void 0};const y=await p();if(y.value.length>0)return y}}}};!c;)f.push(await p())}}/**
 * @remix-run/server-runtime v2.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ft(...e){return async t=>{for(let n of e){let r=await n(t);if(typeof r<"u"&&r!==null)return r}}}async function Ut(e,t){let n=e.headers.get("Content-Type")||"",[r,a]=n.split(/\s*;\s*boundary=/);if(!e.body||!a||r!=="multipart/form-data")throw new TypeError("Could not parse content as FormData.");let s=new FormData,o=Mt(e.body,a);for await(let i of o){if(i.done)break;typeof i.filename=="string"&&(i.filename=i.filename.split(/[/\\]/).pop());let l=await t(i);typeof l<"u"&&l!==null&&s.append(i.name,l)}return s}/**
 * @remix-run/server-runtime v2.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Lt(e){return Object.keys(e).reduce((t,n)=>(t[n]=e[n].module,t),{})}/**
 * @remix-run/server-runtime v2.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function de(e,t){if(e===!1||e===null||typeof e>"u")throw console.error("The following error is a bug in Remix; please open an issue! https://github.com/remix-run/remix/issues/new"),new Error(t)}/**
 * @remix-run/server-runtime v2.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Q(e,t,n){let r=Ue(e,t,n);return r?r.map(a=>({params:a.params,pathname:a.pathname,route:a.route})):null}/**
 * @remix-run/server-runtime v2.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */async function Ht({loadContext:e,action:t,params:n,request:r,routeId:a,singleFetch:s}){let o=await t({request:s?Re(M(r)):be(M(r)),context:e,params:n});if(o===void 0)throw new Error(`You defined an action for route "${a}" but didn't return anything from your \`action\` function. Please return a value or \`null\`.`);return s||b(o)?o:A(o)}async function $t({loadContext:e,loader:t,params:n,request:r,routeId:a,singleFetch:s}){let o=await t({request:s?Re(M(r)):be(M(r)),context:e,params:n});if(o===void 0)throw new Error(`You defined a loader for route "${a}" but didn't return anything from your \`loader\` function. Please return a value or \`null\`.`);return Le(o)?o.init&&He(o.init.status||200)?ge(new Headers(o.init.headers).get("Location"),o.init):o:s||b(o)?o:A(o)}function M(e){let t=new URL(e.url),n=t.searchParams.getAll("index");t.searchParams.delete("index");let r=[];for(let s of n)s&&r.push(s);for(let s of r)t.searchParams.append("index",s);let a={method:e.method,body:e.body,headers:e.headers,signal:e.signal};return a.body&&(a.duplex="half"),new Request(t.href,a)}function be(e){let t=new URL(e.url);t.searchParams.delete("_data");let n={method:e.method,body:e.body,headers:e.headers,signal:e.signal};return n.body&&(n.duplex="half"),new Request(t.href,n)}function Re(e){let t=new URL(e.url);t.searchParams.delete("_routes");let n={method:e.method,body:e.body,headers:e.headers,signal:e.signal};return n.body&&(n.duplex="half"),new Request(t.href,n)}/**
 * @remix-run/server-runtime v2.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ce(e){let t={};return Object.values(e).forEach(n=>{let r=n.parentId||"";t[r]||(t[r]=[]),t[r].push(n)}),t}function xe(e,t="",n=Ce(e)){return(n[t]||[]).map(r=>({...r,children:xe(e,r.id,n)}))}function Ee(e,t,n="",r=Ce(e)){return(r[n]||[]).map(a=>{let s={hasErrorBoundary:a.id==="root"||a.module.ErrorBoundary!=null,id:a.id,path:a.path,loader:a.module.loader?(o,i)=>$t({request:o.request,params:o.params,loadContext:o.context,loader:a.module.loader,routeId:a.id,singleFetch:t.v3_singleFetch===!0}):void 0,action:a.module.action?(o,i)=>Ht({request:o.request,params:o.params,loadContext:o.context,action:a.module.action,routeId:a.id,singleFetch:t.v3_singleFetch===!0}):void 0,handle:a.module.handle};return a.index?{index:!0,...s}:{caseSensitive:a.caseSensitive,children:Ee(e,t,a.id,r),...s}})}/**
 * @remix-run/server-runtime v2.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const It={"&":"\\u0026",">":"\\u003e","<":"\\u003c","\u2028":"\\u2028","\u2029":"\\u2029"},Nt=/[&><\u2028\u2029]/g;function Bt(e){return e.replace(Nt,t=>It[t])}/**
 * @remix-run/server-runtime v2.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function he(e){return Bt(JSON.stringify(e))}var zt={};/**
 * @remix-run/server-runtime v2.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */async function Wt(e,t){if(t??(t=zt.REMIX_DEV_ORIGIN),!t)throw Error("Dev server origin not set");let n=new URL(t);n.pathname="ping";let r=await fetch(n.href,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({buildHash:e.assets.version})}).catch(a=>{throw console.error(`Could not reach Remix dev server at ${n}`),a});if(!r.ok)throw console.error(`Could not reach Remix dev server at ${n} (${r.status})`),Error(await r.text())}function Jt(e){console.log(`[REMIX DEV] ${e.assets.version} ready`)}const ke="__remix_devServerHooks";function Xt(e){globalThis[ke]=e}function fe(){return globalThis[ke]}/**
 * @remix-run/server-runtime v2.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Gt(e,t){return`⚠️ REMIX FUTURE CHANGE: Resource routes will no longer be able to return raw JavaScript objects in v3 when Single Fetch becomes the default. You can prepare for this change at your convenience by wrapping the data returned from your \`${e}\` function in the \`${t}\` route with \`json()\`.  For instructions on making this change see https://remix.run/docs/en/v2.9.2/guides/single-fetch#resource-routes`}/**
 * @remix-run/server-runtime v2.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function me(e,t){var n,r;let a=xe(e.routes),s=Ee(e.routes,e.future),o=Ve(t)?t:k.Production,i=Ye(s,{basename:e.basename,future:{v7_relativeSplatPath:((n=e.future)===null||n===void 0?void 0:n.v3_relativeSplatPath)===!0,v7_throwAbortReason:((r=e.future)===null||r===void 0?void 0:r.v3_throwAbortReason)===!0}}),l=e.entry.module.handleError||((u,{request:c})=>{o!==k.Test&&!c.signal.aborted&&console.error(U(u)&&u.error?u.error:u)});return{routes:a,dataRoutes:s,serverMode:o,staticHandler:i,errorHandler:l}}const Vt=(e,t)=>{let n,r,a,s,o;return async function(l,u={}){if(n=typeof e=="function"?await e():e,t??(t=n.mode),typeof e=="function"){let m=me(n,t);r=m.routes,a=m.serverMode,s=m.staticHandler,o=m.errorHandler}else if(!r||!a||!s||!o){let m=me(n,t);r=m.routes,a=m.serverMode,s=m.staticHandler,o=m.errorHandler}let c=new URL(l.url),p={},f=m=>{if(t===k.Development){var w,v;(w=fe())===null||w===void 0||(v=w.processRequestError)===null||v===void 0||v.call(w,m)}o(m,{context:u,params:p,request:l})},y=`${n.basename??"/"}/__manifest`.replace(/\/+/g,"/");if(c.pathname===y)try{return await Yt(n,r,c)}catch(m){return f(m),new Response("Unknown Server Error",{status:500})}let h=Q(r,c.pathname,n.basename);h&&h.length>0&&Object.assign(p,h[0].params);let d;if(c.searchParams.has("_data")){n.future.v3_singleFetch&&f(new Error("Warning: Single fetch-enabled apps should not be making ?_data requests, this is likely to break in the future"));let m=c.searchParams.get("_data");d=await Qt(a,n,s,m,l,u,f),n.entry.module.handleDataRequest&&(d=await n.entry.module.handleDataRequest(d,{context:u,params:p,request:l}),V(d)&&(d=De(d,n.basename)))}else if(n.future.v3_singleFetch&&c.pathname.endsWith(".data")){let m=new URL(l.url);m.pathname=m.pathname.replace(/\.data$/,"").replace(/^\/_root$/,"/");let w=Q(r,m.pathname,n.basename);if(d=await Kt(a,n,s,l,m,u,f),n.entry.module.handleDataRequest&&(d=await n.entry.module.handleDataRequest(d,{context:u,params:w?w[0].params:{},request:l}),V(d))){let v=$e(d.status,d.headers,n.basename);l.method==="GET"&&(v={[ve]:v});let R=new Headers(d.headers);return R.set("Content-Type","text/x-script"),new Response(P(v,l.signal,n.entry.module.streamTimeout,a),{status:Ie,headers:R})}}else if(h&&h[h.length-1].route.module.default==null&&h[h.length-1].route.module.ErrorBoundary==null)d=await qt(a,n,s,h.slice(-1)[0].route.id,l,u,f);else{var S,x;let m=t===k.Development?await((S=fe())===null||S===void 0||(x=S.getCriticalCss)===null||x===void 0?void 0:x.call(S,n,c.pathname)):void 0;d=await Zt(a,n,s,l,u,f,m)}return l.method==="HEAD"?new Response(null,{headers:d.headers,status:d.status,statusText:d.statusText}):d}};async function Yt(e,t,n){let r={};if(n.searchParams.has("p")){for(let a of n.searchParams.getAll("p")){let s=Q(t,a,e.basename);if(s)for(let o of s){let i=o.route.id;r[i]=e.assets.routes[i]}}return A(r,{headers:{"Cache-Control":"public, max-age=31536000, immutable"}})}return new Response("Invalid Request",{status:400})}async function Qt(e,t,n,r,a,s,o){try{let i=await n.queryRoute(a,{routeId:r,requestContext:s});if(V(i))return De(i,t.basename);if(Y in i){let l=i[Y],u=Ne(l,a.signal,e),c=l.init||{},p=new Headers(c.headers);return p.set("Content-Type","text/remix-deferred"),p.set("X-Remix-Response","yes"),c.headers=p,new Response(u,c)}return i=K(i,"X-Remix-Response","yes"),i}catch(i){if(b(i))return K(i,"X-Remix-Catch","yes");if(U(i))return o(i),Oe(i,e);let l=i instanceof Error||i instanceof DOMException?i:new Error("Unexpected Server Error");return o(l),we(q(l,e),{status:500,headers:{"X-Remix-Error":"yes"}})}}async function Kt(e,t,n,r,a,s,o){let{result:i,headers:l,status:u}=r.method!=="GET"?await Be(t,e,n,r,a,s,o):await ze(t,e,n,r,a,s,o),c=new Headers(l);return c.set("X-Remix-Response","yes"),u===304?new Response(null,{status:304,headers:c}):(c.set("Content-Type","text/x-script"),new Response(P(i,r.signal,t.entry.module.streamTimeout,e),{status:u||200,headers:c}))}async function Zt(e,t,n,r,a,s,o){let i;try{i=await n.query(r,{requestContext:a})}catch(f){return s(f),new Response(null,{status:500})}if(b(i))return i;let l=We(t,i);if(i.statusCode===304)return new Response(null,{status:304,headers:l});i.errors&&(Object.values(i.errors).forEach(f=>{(!U(f)||f.error)&&s(f)}),i.errors=se(i.errors,e));let u={loaderData:i.loaderData,actionData:i.actionData,errors:ie(i.errors,e)},c={manifest:t.assets,routeModules:Lt(t.routes),staticHandlerContext:i,criticalCss:o,serverHandoffString:he({basename:t.basename,criticalCss:o,future:t.future,isSpaMode:t.isSpaMode,...t.future.v3_singleFetch?null:{state:u}}),...t.future.v3_singleFetch?{serverHandoffStream:P(u,r.signal,t.entry.module.streamTimeout,e),renderMeta:{}}:null,future:t.future,isSpaMode:t.isSpaMode,serializeError:f=>q(f,e)},p=t.entry.module.default;try{return await p(r,i.statusCode,l,c,a)}catch(f){s(f);let y=f;if(b(f))try{let d=await en(f);y=new Je(f.status,f.statusText,d)}catch{}i=Xe(n.dataRoutes,i,y),i.errors&&(i.errors=se(i.errors,e));let h={loaderData:i.loaderData,actionData:i.actionData,errors:ie(i.errors,e)};c={...c,staticHandlerContext:i,serverHandoffString:he({basename:t.basename,future:t.future,isSpaMode:t.isSpaMode,...t.future.v3_singleFetch?null:{state:h}}),...t.future.v3_singleFetch?{serverHandoffStream:P(h,r.signal,t.entry.module.streamTimeout,e),renderMeta:{}}:null};try{return await p(r,i.statusCode,l,c,a)}catch(d){return s(d),Ae(d,e)}}}async function qt(e,t,n,r,a,s,o){try{let i=await n.queryRoute(a,{routeId:r,requestContext:s});return typeof i=="object"&&i!==null&&de(!(Y in i),`You cannot return a \`defer()\` response from a Resource Route.  Did you forget to export a default UI component from the "${r}" route?`),t.future.v3_singleFetch&&!b(i)&&(console.warn(Gt(a.method==="GET"?"loader":"action",r)),i=A(i)),de(b(i),"Expected a Response to be returned from queryRoute"),i}catch(i){return b(i)?K(i,"X-Remix-Catch","yes"):U(i)?(i&&o(i),Oe(i,e)):(o(i),Ae(i,e))}}function Oe(e,t){return we(q(e.error||new Error("Unexpected Server Error"),t),{status:e.status,statusText:e.statusText,headers:{"X-Remix-Error":"yes"}})}function Ae(e,t){let n="Unexpected Server Error";return t!==k.Production&&(n+=`

${String(e)}`),new Response(n,{status:500,headers:{"Content-Type":"text/plain"}})}function en(e){let t=e.headers.get("Content-Type");return t&&/\bapplication\/json\b/.test(t)?e.body==null?null:e.json():e.text()}function De(e,t){let n=new Headers(e.headers),r=n.get("Location");return n.set("X-Remix-Redirect",t&&Ge(r,t)||r),n.set("X-Remix-Status",String(e.status)),n.delete("Location"),e.headers.get("Set-Cookie")!==null&&n.set("X-Remix-Revalidate","yes"),new Response(null,{status:204,headers:n})}function K(e,t,n){let r=new Headers(e.headers);return r.set(t,n),new Response(e.body,{status:e.status,statusText:e.statusText,headers:r,duplex:e.body?"half":void 0})}/**
 * @remix-run/server-runtime v2.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function X(e){return`__flash_${e}__`}const ne=(e={},t="")=>{let n=new Map(Object.entries(e));return{get id(){return t},get data(){return Object.fromEntries(n)},has(r){return n.has(r)||n.has(X(r))},get(r){if(n.has(r))return n.get(r);let a=X(r);if(n.has(a)){let s=n.get(a);return n.delete(a),s}},set(r,a){n.set(r,a)},flash(r,a){n.set(X(r),a)},unset(r){n.delete(r)}}},tn=e=>e!=null&&typeof e.id=="string"&&typeof e.data<"u"&&typeof e.has=="function"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.flash=="function"&&typeof e.unset=="function",nn=e=>({cookie:t,createData:n,readData:r,updateData:a,deleteData:s})=>{let o=ee(t)?t:e((t==null?void 0:t.name)||"__session",t);return Pe(o),{async getSession(i,l){let u=i&&await o.parse(i,l),c=u&&await r(u);return ne(c||{},u||"")},async commitSession(i,l){let{id:u,data:c}=i,p=(l==null?void 0:l.maxAge)!=null?new Date(Date.now()+l.maxAge*1e3):(l==null?void 0:l.expires)!=null?l.expires:o.expires;return u?await a(u,c,p):u=await n(c,p),o.serialize(u,l)},async destroySession(i,l){return await s(i.id),o.serialize("",{...l,maxAge:void 0,expires:new Date(0)})}}};function Pe(e){_e(e.isSigned,`The "${e.name}" cookie is not signed, but session cookies should be signed to prevent tampering on the client before they are sent back to the server. See https://remix.run/utils/cookies#signing-cookies for more information.`)}/**
 * @remix-run/server-runtime v2.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const rn=e=>({cookie:t}={})=>{let n=ee(t)?t:e((t==null?void 0:t.name)||"__session",t);return Pe(n),{async getSession(r,a){return ne(r&&await n.parse(r,a)||{})},async commitSession(r,a){let s=await n.serialize(r.data,a);if(s.length>4096)throw new Error("Cookie length will exceed browser maximum. Length: "+s.length);return s},async destroySession(r,a){return n.serialize("",{...a,maxAge:void 0,expires:new Date(0)})}}};/**
 * @remix-run/server-runtime v2.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const an=e=>({cookie:t}={})=>{let n=new Map;return e({cookie:t,async createData(r,a){let s=Math.random().toString(36).substring(2,10);return n.set(s,{data:r,expires:a}),s},async readData(r){if(n.has(r)){let{data:a,expires:s}=n.get(r);if(!s||s>new Date)return a;s&&n.delete(r)}return null},async updateData(r,a,s){n.set(r,{data:a,expires:s})},async deleteData(r){n.delete(r)}})};/**
 * @remix-run/server-runtime v2.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */class je extends Error{constructor(t,n){super(`Field "${t}" exceeded upload size of ${n} bytes.`),this.field=t,this.maxBytes=n}}/**
 * @remix-run/server-runtime v2.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function sn({filter:e,maxPartSize:t=3e6}={}){return async({filename:n,contentType:r,name:a,data:s})=>{if(e&&!await e({filename:n,contentType:r,name:a}))return;let o=0,i=[];for await(let l of s){if(o+=l.byteLength,o>t)throw new je(a,t);i.push(l)}return typeof n=="string"?new File(i,n,{type:r}):await new Blob(i,{type:r}).text()}}/**
 * @remix-run/server-runtime v2.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const on=Object.freeze(Object.defineProperty({__proto__:null,MaxPartSizeExceededError:je,UNSAFE_SingleFetchRedirectSymbol:ve,broadcastDevReady:Wt,createCookieFactory:vt,createCookieSessionStorageFactory:rn,createMemorySessionStorageFactory:an,createRequestHandler:Vt,createSession:ne,createSessionStorageFactory:nn,data:Qe,defer:Ke,isCookie:ee,isSession:tn,json:A,logDevReady:Jt,redirect:ge,redirectDocument:Ze,replace:qe,unstable_composeUploadHandlers:Ft,unstable_createMemoryUploadHandler:sn,unstable_parseMultipartFormData:Ut,unstable_setDevServerHooks:Xt},Symbol.toStringTag,{value:"Module"}));/**
 * @remix-run/react v2.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let pe="positions";function ln({getKey:e,...t}){let{isSpaMode:n}=et(),r=tt(),a=nt();rt({getKey:e,storageKey:pe});let s=O.useMemo(()=>{if(!e)return null;let i=e(r,a);return i!==r.key?i:null},[]);if(n)return null;let o=((i,l)=>{if(!window.history.state||!window.history.state.key){let u=Math.random().toString(32).slice(2);window.history.replaceState({key:u},"")}try{let c=JSON.parse(sessionStorage.getItem(i)||"{}")[l||window.history.state.key];typeof c=="number"&&window.scrollTo(0,c)}catch(u){console.error(u),sessionStorage.removeItem(i)}}).toString();return O.createElement("script",at({},t,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${o})(${JSON.stringify(pe)}, ${JSON.stringify(s)})`}}))}const un="/assets/styles-GLwjd8WB.css";var F={},H={},$={},I={};Object.defineProperty(I,"__esModule",{value:!0});I.useBroadcastChannel=void 0;const Z=O;function cn(e,t,n){const r=(0,Z.useRef)(typeof window<"u"&&"BroadcastChannel"in window?new BroadcastChannel(e+"-channel"):null);return ye(r,"message",t),ye(r,"messageerror",n),(0,Z.useCallback)(a=>{var s;(s=r==null?void 0:r.current)===null||s===void 0||s.postMessage(a)},[r])}I.useBroadcastChannel=cn;function ye(e,t,n=()=>{}){(0,Z.useEffect)(()=>{const r=e.current;if(r)return r.addEventListener(t,n),()=>r.removeEventListener(t,n)},[e,t,n])}var N={};Object.defineProperty(N,"__esModule",{value:!0});N.useCorrectCssTransition=void 0;const dn=O;function hn(e){const t=document.createElement("style");t.appendChild(document.createTextNode(`* {
       -webkit-transition: none !important;
       -moz-transition: none !important;
       -o-transition: none !important;
       -ms-transition: none !important;
       transition: none !important;
    }`)),document.head.appendChild(t),e(),setTimeout(()=>{window.getComputedStyle(t).transition,document.head.removeChild(t)},0)}function fn({disableTransitions:e=!1}={}){return(0,dn.useCallback)(t=>{e?hn(()=>{t()}):t()},[e])}N.useCorrectCssTransition=fn;(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.isTheme=e.useTheme=e.PreventFlashOnWrongTheme=e.ThemeProvider=e.mediaQuery=e.themes=e.Theme=void 0;const t=g,n=O,r=I,a=N;var s;(function(h){h.DARK="dark",h.LIGHT="light"})(s=e.Theme||(e.Theme={})),e.themes=Object.values(s);const o=(0,n.createContext)(void 0);o.displayName="ThemeContext";const i="(prefers-color-scheme: light)",l=()=>window.matchMedia(i).matches?s.LIGHT:s.DARK;e.mediaQuery=typeof window<"u"?window.matchMedia(i):null;function u({children:h,specifiedTheme:d,themeAction:S,disableTransitionOnThemeChange:x=!1}){const m=(0,a.useCorrectCssTransition)({disableTransitions:x}),[w,v]=(0,n.useState)(()=>d?e.themes.includes(d)?d:null:typeof window!="object"?null:l()),[R,z]=(0,n.useState)(d?"USER":"SYSTEM"),W=(0,r.useBroadcastChannel)("remix-themes",_=>{m(()=>{v(_.data.theme),z(_.data.definedBy)})});(0,n.useEffect)(()=>{if(R==="USER")return()=>{};const _=C=>{m(()=>{v(C.matches?s.LIGHT:s.DARK)})};return e.mediaQuery===null||e.mediaQuery===void 0||e.mediaQuery.addEventListener("change",_),()=>e.mediaQuery===null||e.mediaQuery===void 0?void 0:e.mediaQuery.removeEventListener("change",_)},[m,R]);const re=(0,n.useCallback)(_=>{const C=typeof _=="function"?_(w):_;if(C===null){const ae=l();m(()=>{v(ae),z("SYSTEM"),W({theme:ae,definedBy:"SYSTEM"})}),fetch(`${S}`,{method:"POST",body:JSON.stringify({theme:null})})}else m(()=>{v(C),z("USER"),W({theme:C,definedBy:"USER"})}),fetch(`${S}`,{method:"POST",body:JSON.stringify({theme:C})})},[W,m,w,S]),Fe=(0,n.useMemo)(()=>[w,re,{definedBy:R}],[w,re,R]);return(0,t.jsx)(o.Provider,{value:Fe,children:h})}e.ThemeProvider=u;const c=String.raw`
(() => {
  const theme = window.matchMedia(${JSON.stringify(i)}).matches
    ? 'light'
    : 'dark';
  
  const cl = document.documentElement.classList;
  const dataAttr = document.documentElement.dataset.theme;

  if (dataAttr != null) {
    const themeAlreadyApplied = dataAttr === 'light' || dataAttr === 'dark';
    if (!themeAlreadyApplied) {
      document.documentElement.dataset.theme = theme;
    }
  } else {
    const themeAlreadyApplied = cl.contains('light') || cl.contains('dark');
    if (!themeAlreadyApplied) {
      cl.add(theme);
    }
  }
  
  const meta = document.querySelector('meta[name=color-scheme]');
  if (meta) {
    if (theme === 'dark') {
      meta.content = 'dark light';
    } else if (theme === 'light') {
      meta.content = 'light dark';
    }
  }
})();
`;function p({ssrTheme:h,nonce:d}){const[S]=f();return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("meta",{name:"color-scheme",content:S==="light"?"light dark":"dark light"}),h?null:(0,t.jsx)("script",{dangerouslySetInnerHTML:{__html:c},nonce:d,suppressHydrationWarning:!0})]})}e.PreventFlashOnWrongTheme=p;function f(){const h=(0,n.useContext)(o);if(h===void 0)throw new Error("useTheme must be used within a ThemeProvider");return h}e.useTheme=f;function y(h){return typeof h=="string"&&e.themes.includes(h)}e.isTheme=y})($);Object.defineProperty(H,"__esModule",{value:!0});H.createThemeSessionResolver=void 0;const mn=$,pn=e=>async n=>{const r=await e.getSession(n.headers.get("Cookie"));return{getTheme:()=>{const a=r.get("theme");return(0,mn.isTheme)(a)?a:null},setTheme:a=>r.set("theme",a),commit:()=>e.commitSession(r),destroy:()=>e.destroySession(r)}};H.createThemeSessionResolver=pn;var B={};const yn=st(on);Object.defineProperty(B,"__esModule",{value:!0});B.createThemeAction=void 0;const G=yn,gn=$,wn=e=>async({request:n})=>{const r=await e(n),{theme:a}=await n.json();return a?(0,gn.isTheme)(a)?(r.setTheme(a),(0,G.json)({success:!0},{headers:{"Set-Cookie":await r.commit()}})):(0,G.json)({success:!1,message:`theme value of ${a} is not a valid theme.`}):(0,G.json)({success:!0},{headers:{"Set-Cookie":await r.destroy()}})};B.createThemeAction=wn;(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.createThemeAction=e.PreventFlashOnWrongTheme=e.isTheme=e.Theme=e.themes=e.useTheme=e.ThemeProvider=e.createThemeSessionResolver=void 0;var t=H;Object.defineProperty(e,"createThemeSessionResolver",{enumerable:!0,get:function(){return t.createThemeSessionResolver}});var n=$;Object.defineProperty(e,"ThemeProvider",{enumerable:!0,get:function(){return n.ThemeProvider}}),Object.defineProperty(e,"useTheme",{enumerable:!0,get:function(){return n.useTheme}}),Object.defineProperty(e,"themes",{enumerable:!0,get:function(){return n.themes}}),Object.defineProperty(e,"Theme",{enumerable:!0,get:function(){return n.Theme}}),Object.defineProperty(e,"isTheme",{enumerable:!0,get:function(){return n.isTheme}}),Object.defineProperty(e,"PreventFlashOnWrongTheme",{enumerable:!0,get:function(){return n.PreventFlashOnWrongTheme}});var r=B;Object.defineProperty(e,"createThemeAction",{enumerable:!0,get:function(){return r.createThemeAction}})})(F);function Me(e){var t,n,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e)){var a=e.length;for(t=0;t<a;t++)e[t]&&(n=Me(e[t]))&&(r&&(r+=" "),r+=n)}else for(n in e)e[n]&&(r&&(r+=" "),r+=n);return r}function vn(){for(var e,t,n=0,r="",a=arguments.length;n<a;n++)(e=arguments[n])&&(t=Me(e))&&(r&&(r+=" "),r+=t);return r}const Tn=()=>[{rel:"preconnect",href:"https://fonts.googleapis.com"},{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"},{rel:"stylesheet",href:un}];function Sn(){const e=Se(),[t]=F.useTheme();return g.jsxs("html",{lang:"en",className:vn(t),children:[g.jsxs("head",{children:[g.jsx("meta",{charSet:"utf-8"}),g.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),g.jsx(it,{}),g.jsx(F.PreventFlashOnWrongTheme,{ssrTheme:!!e.theme}),g.jsx(ot,{})]}),g.jsxs("body",{children:[g.jsx(lt,{}),g.jsx(ln,{}),g.jsx(ut,{})]})]})}function bn(){const e=Se();return g.jsx(F.ThemeProvider,{specifiedTheme:e.theme,themeAction:"/action/set-theme",children:g.jsx(Sn,{})})}export{bn as default,Tn as links};
