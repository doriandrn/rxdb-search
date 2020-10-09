"use strict";var e,t=(e=require("level"))&&"object"==typeof e&&"default"in e?e.default:e;function n(e,t,n,r,o,i,a){try{var c=e[i](a),s=c.value}catch(e){return void n(e)}c.done?t(s):Promise.resolve(s).then(r,o)}function r(e){return function(){var t=this,r=arguments;return new Promise((function(o,i){var a=e.apply(t,r);function c(e){n(a,o,i,c,s,"next",e)}function s(e){n(a,o,i,c,s,"throw",e)}c(void 0)}))}}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e){return function(e){if(Array.isArray(e))return s(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return s(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}require("encoding-down");var u="undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{};var l=function(e,t,n){return e(n={path:t,exports:{},require:function(e,t){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==t&&n.path)}},n.exports),n.exports}((function(e){var t=e.exports=function(e){return new n(e)};function n(e){this.value=e}function r(e,t,n){var r=[],a=[],l=!0;return function e(f){var p=n?o(f):f,h={},d=!0,E={node:p,node_:f,path:[].concat(r),parent:a[a.length-1],parents:a,key:r.slice(-1)[0],isRoot:0===r.length,level:r.length,circular:null,update:function(e,t){E.isRoot||(E.parent.node[E.key]=e),E.node=e,t&&(d=!1)},delete:function(e){delete E.parent.node[E.key],e&&(d=!1)},remove:function(e){c(E.parent.node)?E.parent.node.splice(E.key,1):delete E.parent.node[E.key],e&&(d=!1)},keys:null,before:function(e){h.before=e},after:function(e){h.after=e},pre:function(e){h.pre=e},post:function(e){h.post=e},stop:function(){l=!1},block:function(){d=!1}};if(!l)return E;function m(){if("object"==typeof E.node&&null!==E.node){E.keys&&E.node_===E.node||(E.keys=i(E.node)),E.isLeaf=0==E.keys.length;for(var e=0;e<a.length;e++)if(a[e].node_===f){E.circular=a[e];break}}else E.isLeaf=!0,E.keys=null;E.notLeaf=!E.isLeaf,E.notRoot=!E.isRoot}m();var y=t.call(E,E.node);return void 0!==y&&E.update&&E.update(y),h.before&&h.before.call(E,E.node),d?("object"!=typeof E.node||null===E.node||E.circular||(a.push(E),m(),s(E.keys,(function(t,o){r.push(t),h.pre&&h.pre.call(E,E.node[t],t);var i=e(E.node[t]);n&&u.call(E.node,t)&&(E.node[t]=i.node),i.isLast=o==E.keys.length-1,i.isFirst=0==o,h.post&&h.post.call(E,i),r.pop()})),a.pop()),h.after&&h.after.call(E,E.node),E):E}(e).node}function o(e){if("object"==typeof e&&null!==e){var t;if(c(e))t=[];else if("[object Date]"===a(e))t=new Date(e.getTime?e.getTime():e);else if(function(e){return"[object RegExp]"===a(e)}(e))t=new RegExp(e);else if(function(e){return"[object Error]"===a(e)}(e))t={message:e.message};else if(function(e){return"[object Boolean]"===a(e)}(e))t=new Boolean(e);else if(function(e){return"[object Number]"===a(e)}(e))t=new Number(e);else if(function(e){return"[object String]"===a(e)}(e))t=new String(e);else if(Object.create&&Object.getPrototypeOf)t=Object.create(Object.getPrototypeOf(e));else if(e.constructor===Object)t={};else{var n=e.constructor&&e.constructor.prototype||e.__proto__||{},r=function(){};r.prototype=n,t=new r}return s(i(e),(function(n){t[n]=e[n]})),t}return e}n.prototype.get=function(e){for(var t=this.value,n=0;n<e.length;n++){var r=e[n];if(!t||!u.call(t,r)){t=void 0;break}t=t[r]}return t},n.prototype.has=function(e){for(var t=this.value,n=0;n<e.length;n++){var r=e[n];if(!t||!u.call(t,r))return!1;t=t[r]}return!0},n.prototype.set=function(e,t){for(var n=this.value,r=0;r<e.length-1;r++){var o=e[r];u.call(n,o)||(n[o]={}),n=n[o]}return n[e[r]]=t,t},n.prototype.map=function(e){return r(this.value,e,!0)},n.prototype.forEach=function(e){return this.value=r(this.value,e,!1),this.value},n.prototype.reduce=function(e,t){var n=1===arguments.length,r=n?this.value:t;return this.forEach((function(t){this.isRoot&&n||(r=e.call(this,r,t))})),r},n.prototype.paths=function(){var e=[];return this.forEach((function(t){e.push(this.path)})),e},n.prototype.nodes=function(){var e=[];return this.forEach((function(t){e.push(this.node)})),e},n.prototype.clone=function(){var e=[],t=[];return function n(r){for(var a=0;a<e.length;a++)if(e[a]===r)return t[a];if("object"==typeof r&&null!==r){var c=o(r);return e.push(r),t.push(c),s(i(r),(function(e){c[e]=n(r[e])})),e.pop(),t.pop(),c}return r}(this.value)};var i=Object.keys||function(e){var t=[];for(var n in e)t.push(n);return t};function a(e){return Object.prototype.toString.call(e)}var c=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},s=function(e,t){if(e.forEach)return e.forEach(t);for(var n=0;n<e.length;n++)t(e[n],n,e)};s(i(n.prototype),(function(e){t[e]=function(t){var r=[].slice.call(arguments,1),o=new n(t);return o[e].apply(o,r)}}));var u=Object.hasOwnProperty||function(e,t){return t in e}}));function f(e){const t=e=>new Promise(((t,n)=>e instanceof Promise?t(e):("string"==typeof e&&(e={gte:e,lte:e+"￮"}),r(e).then(t)))),n=(...e)=>Promise.all(e.map((e=>t(e)))).then((e=>{var t=(e=[].concat.apply([],e)).reduce(((e,t)=>(e[t._id]=e[t._id]||[],e[t._id].push(t.match),e)),{});return Object.keys(t).map((e=>({_id:e,match:t[e]})))})),r=t=>new Promise(((n,r)=>{const o={};e.createReadStream(t).on("data",(e=>e.value.forEach((t=>{o[t]=o[t]||[],o[t].push(e.key)})))).on("end",(()=>n(Object.keys(o).map((e=>({_id:e,match:o[e]}))))))}));return{AGGREGATE:(...e)=>Promise.all(e).then((e=>{var t=new Set(e[1].map((e=>e._id)));return e[0].map((e=>({match:e.match,_id:[...new Set([...e._id].filter((e=>t.has(e))))]}))).filter((e=>e._id.length))})),BUCKET:e=>t(e).then((t=>({match:e,_id:[...t.reduce(((e,t)=>e.add(t._id)),new Set)].sort()}))),GET:t,INTERSECTION:(...e)=>n(...e).then((t=>t.filter((t=>t.match.length===e.length)))),SET_DIFFERENCE:(e,n)=>("string"==typeof e&&(e=t(e)),"string"==typeof n&&(n=t(n)),Promise.all([e,n]).then((e=>{var[t,n]=e;return n=n.map((e=>e._id)),t.filter((e=>n.indexOf(e._id)))}))),UNION:n}}function p(e){return{OBJECT:t=>Promise.all(t.map((t=>e.get("￮DOC￮"+t._id+"￮"))))}}function h(e){return{DIST:t=>{"string"==typeof t&&(t={gte:t,lte:t+"￮"});const n=[];return new Promise(((r,o)=>{e.createKeyStream(t).on("data",(e=>{n.push(e)})).on("end",(()=>r(n)))}))},MAX:t=>{var n={limit:1,lte:t+"￮",reverse:!0};return new Promise(((t,r)=>{e.createKeyStream(n).on("data",t)}))},MIN:t=>{var n={limit:1,gte:t+"!"};return new Promise(((t,r)=>{e.createKeyStream(n).on("data",t)}))}}}var d=0;const E=function(e){var t=[];return l(e).forEach((function(e){var n=!0;if(this.path.forEach((e=>{"!"===e.substring(0,1)&&(n=!1),"_id"===e&&(n=!1)})),n&&this.isLeaf){var r=this.path.join(".")+":"+this.node;Array.isArray(this.parent.node)&&(r=this.path.slice(0,this.path.length-1).join(".")+":"+this.node),t.push(r)}})),{_id:e._id||++d,keys:t}},m=(e,t)=>(t.keys.forEach((n=>{e[n]=e[n]||[],e[n].push(t._id)})),e),y=e=>("string"==typeof e._id||"number"==typeof e._id||(e._id=d++),e),v=(e,t,n)=>(e=e.map(y),new Promise(((r,o)=>{((e,t,n)=>{const r=Object.keys(e);return Promise.all(r.map((e=>new Promise(((n,r)=>{t.get(e).then(n).catch((e=>n([])))}))))).then((t=>t.map(((t,o)=>{var i=new Set(t),a=new Set(e[r[o]]);if("put"===n)return{key:r[o],type:n,value:[...new Set([...i,...a])].sort()};if("del"===n){var c=[...new Set([...i].filter((e=>!a.has(e))))];return{key:r[o],type:0===c.length?"del":"put",value:c}}}))))})((e=>e.map(E).reduce(m,{}))(e),t,n).then((o=>{t.batch(o.concat(((e,t)=>e.map((e=>({key:"￮DOC￮"+e._id+"￮",type:t,value:e}))))(e,n)),(t=>r(e)))}))})));function T(e){return{DELETE:t=>p(e).OBJECT(t.map((e=>({_id:e})))).then((t=>v(t,e,"del"))),PUT:t=>v(t,e,"put")}}const g=e=>({AGGREGATE:f(e).AGGREGATE,AND:f(e).INTERSECTION,BUCKET:f(e).BUCKET,BUCKETFILTER:f(e).AGGREGATE,DELETE:T(e).DELETE,DISTINCT:h(e).DIST,GET:f(e).GET,MAX:h(e).MAX,MIN:h(e).MIN,NOT:f(e).SET_DIFFERENCE,OBJECT:p(e).OBJECT,OR:f(e).UNION,PUT:T(e).PUT,STORE:e});function b(e,n){return e=Object.assign({},{name:"fii"},e),n?e.store?n(new Error('When initing with a store use "lazy loading"'),null):void t(e.name,{valueEncoding:"json"},((e,t)=>n(e,g(t)))):g(e.store||t(e.name,{valueEncoding:"json"}))}function O(e){const t=()=>{const t=[];return new Promise(((n,r)=>{e.STORE.createKeyStream({gte:"￮FIELD!",lte:"￮FIELD￮￮"}).on("data",(e=>t.push(e.split("￮")[2]))).on("end",(()=>n(u.searchableFields=t)))}))},n=()=>{var t=0;return new Promise(((n,r)=>{e.STORE.createKeyStream({gte:"￮DOC￮!",lte:"￮DOC￮￮"}).on("data",(e=>t++)).on("end",(()=>n(u.D=t)))}))},r=()=>{if(e.STORE.isOpen())return t().then(n);setTimeout(r,1e3)};return{countDocs:n,prefetchSearchableFields:t,calibrate:r}}function S(e){const t=function(e){var t={};return l(e).forEach((function(e){if(void 0!==e){var n=!0;this.path.forEach((e=>{"_id"===e&&(n=!1),"!"===e.substring(0,1)&&(n=!1)})),n&&this.isLeaf&&(t[this.path.filter((e=>isNaN(e))).join(".")]=(this.node+"").split(" "))}})),t},n=e=>Object.keys(e).reduce(((t,n)=>{if(1===e[n].length&&!isNaN(e[n][0])){const r=e[n][0];return t[n]={},t[n][r]=r,t}return t[n]=function(e,t){t=Object.assign({},{ngramLengths:[1]},t);const n=e.reduce(((e,n,r,o)=>(t.ngramLengths.forEach((t=>{var i=o.slice(r,r+t);i.length===t&&(n=JSON.stringify(i),e[n]=e[n]||[],e[n].push(r))})),e)),{});return Object.keys(n).map((e=>({term:JSON.parse(e),positions:n[e]}))).sort(((e,t)=>e.term[0]>t.term[0]))}(e[n]).reduce(((e,t,n,r)=>(e[t.term]=(t.positions.length/r.length).toFixed(2),e)),{}),t}),{}),r=t=>new Promise(((n,r)=>{const o=new Set([].concat.apply([],t.map(Object.keys)));o.delete("_id"),o.delete("!doc"),e.STORE.batch(Array.from(o).map((e=>({type:"put",key:"￮FIELD￮"+e+"￮",value:!0}))),(t=>{t&&console.log(t),O(e).calibrate().then(n)}))}));return{DELETE:(...t)=>e.DELETE(...t),PUT:o=>e.PUT(o.map(t).map(n).map(((e,t)=>(e._id=o[t]._id,e["!doc"]=o[t],e)))).then(r)}}function w(e){return e.resultSet.map(((e,t,n)=>{const r=Math.log((u.D+1)/n.length);return e.score=+e.match.reduce(((e,t)=>e+r*+t.split(":")[1]),0).toFixed(2),e})).sort(((e,t)=>t.score-e.score)).slice(e.offset,e.limit)}function R(e){return e.resultSet.map(((t,n,r)=>(t.score=+t.match.filter((t=>t.startsWith(e.fieldName)))[0].split(":")[1],t))).sort(e.sort).slice(e.offset,e.limit)}u.D=0,u.searchableFields=[];const C=e=>{const t=S(e),n=function(e){const t=e=>[].concat.apply([],e),n=e=>e.map((e=>(e.match=t(e.match),e.match=t(e.match),e))),r=t=>new Promise(((n,r)=>e.OBJECT(t).then((e=>n(t.map(((t,n)=>(t.obj=e[n]["!doc"],t)))))))),o=function(...t){return e.AND(...t.map(a)).then(n)},i=(...r)=>e.OR(...t(r.map(a))).then(n),a=t=>t instanceof Promise?t:":*"===t.slice(-2)?e.GET(t.replace(":*",".")):t.indexOf(":")>-1?e.GET(t.replace(":",".")+":"):i(...u.searchableFields.map((e=>e+":"+t)));return{AND:o,BUCKET:e.BUCKET,BUCKETFILTER:e.BUCKETFILTER,DICTIONARY:t=>new Promise(((n,r)=>{const o=new Set;(t="string"==typeof t?{gte:t,lte:t+"￮"}:Object.assign({gte:"",lte:"￮"},t)).lte="￮"===t.lte.substr(-1)?t.lte:t.lte+"￮";const i=e.STORE.createKeyStream(t);i.on("data",(e=>o.add(e.split(":")[0].split(".").pop()))),i.on("end",(()=>n(Array.from(o).sort())))})),DISTINCT:t=>e.DISTINCT(t).then((e=>[...e.reduce(((e,t)=>(e.add(t.split(":")[0]),e)),new Set)])),DOCUMENTS:r,GET:a,OR:i,SCORENUMERIC:R,SCORETFIDF:w,SEARCH:(...e)=>o(...e).then((e=>w({resultSet:e,offset:0,limit:10}))).then((e=>r(e))),SET_DIFFERENCE:(e,t)=>("string"==typeof e&&(e=a(e)),"string"==typeof t&&(t=a(t)),Promise.all([e,t]).then((e=>{var[t,n]=e;return n=n.map((e=>e._id)),t.filter((e=>n.indexOf(e._id)))})))}}(e);return{AND:n.AND,BUCKET:n.BUCKET,BUCKETFILTER:n.BUCKETFILTER,DELETE:t.DELETE,DICTIONARY:n.DICTIONARY,DISTINCT:n.DISTINCT,DOCUMENTS:n.DOCUMENTS,GET:n.GET,INDEX:e,NOT:n.SET_DIFFERENCE,OR:n.OR,PUT:t.PUT,SCORENUMERIC:n.SCORENUMERIC,SCORETFIDF:n.SCORETFIDF,SEARCH:n.SEARCH}};var j={rxdb:!0,prototypes:{RxCollection:function(e){e.search=function(){var e=r(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=this.si){e.next=3;break}throw new Error("Search Index (search-index) is not.");case 3:return e.prev=3,e.next=6,n.SEARCH.apply(n,c(t.split(" ")));case 6:return e.abrupt("return",e.sent);case 9:e.prev=9,e.t0=e.catch(3),console.error("Error while searching: ",e.t0);case 12:case"end":return e.stop()}}),e,this,[[3,9]])})));return function(t){return e.apply(this,arguments)}}(),e.index=r(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.find().exec();case 2:t=e.sent,this.si.PUT(t.map((function(e){return e._data})));case 4:case"end":return e.stop()}}),e,this)})))}},hooks:{createRxCollection:function(e){var t=e.name;e.si=function(e,t){if(!t){let t=e.fii||b(e);return O(t).calibrate(),C(t)}b(e,((e,n)=>{O(n).calibrate().then((()=>t(e,C(n))))}))}({name:t})},createRxDocument:function(e){var t=e._data,n=e.collection.si;try{n.PUT([a({},t)])}catch(e){console.error("Could not PUT",t,e)}}}};module.exports=j;
