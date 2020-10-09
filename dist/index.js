"use strict";var e,t=(e=require("level"))&&"object"==typeof e&&"default"in e?e.default:e;function r(e,t,r,n,o,i,a){try{var c=e[i](a),s=c.value}catch(e){return void r(e)}c.done?t(s):Promise.resolve(s).then(n,o)}function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e){return function(e){if(Array.isArray(e))return c(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return c(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return c(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}require("encoding-down");var s="undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{};var u=function(e,t,r){return e(r={path:t,exports:{},require:function(e,t){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==t&&r.path)}},r.exports),r.exports}((function(e){var t=e.exports=function(e){return new r(e)};function r(e){this.value=e}function n(e,t,r){var n=[],a=[],l=!0;return function e(f){var p=r?o(f):f,h={},d=!0,E={node:p,node_:f,path:[].concat(n),parent:a[a.length-1],parents:a,key:n.slice(-1)[0],isRoot:0===n.length,level:n.length,circular:null,update:function(e,t){E.isRoot||(E.parent.node[E.key]=e),E.node=e,t&&(d=!1)},delete:function(e){delete E.parent.node[E.key],e&&(d=!1)},remove:function(e){c(E.parent.node)?E.parent.node.splice(E.key,1):delete E.parent.node[E.key],e&&(d=!1)},keys:null,before:function(e){h.before=e},after:function(e){h.after=e},pre:function(e){h.pre=e},post:function(e){h.post=e},stop:function(){l=!1},block:function(){d=!1}};if(!l)return E;function m(){if("object"==typeof E.node&&null!==E.node){E.keys&&E.node_===E.node||(E.keys=i(E.node)),E.isLeaf=0==E.keys.length;for(var e=0;e<a.length;e++)if(a[e].node_===f){E.circular=a[e];break}}else E.isLeaf=!0,E.keys=null;E.notLeaf=!E.isLeaf,E.notRoot=!E.isRoot}m();var y=t.call(E,E.node);return void 0!==y&&E.update&&E.update(y),h.before&&h.before.call(E,E.node),d?("object"!=typeof E.node||null===E.node||E.circular||(a.push(E),m(),s(E.keys,(function(t,o){n.push(t),h.pre&&h.pre.call(E,E.node[t],t);var i=e(E.node[t]);r&&u.call(E.node,t)&&(E.node[t]=i.node),i.isLast=o==E.keys.length-1,i.isFirst=0==o,h.post&&h.post.call(E,i),n.pop()})),a.pop()),h.after&&h.after.call(E,E.node),E):E}(e).node}function o(e){if("object"==typeof e&&null!==e){var t;if(c(e))t=[];else if("[object Date]"===a(e))t=new Date(e.getTime?e.getTime():e);else if(function(e){return"[object RegExp]"===a(e)}(e))t=new RegExp(e);else if(function(e){return"[object Error]"===a(e)}(e))t={message:e.message};else if(function(e){return"[object Boolean]"===a(e)}(e))t=new Boolean(e);else if(function(e){return"[object Number]"===a(e)}(e))t=new Number(e);else if(function(e){return"[object String]"===a(e)}(e))t=new String(e);else if(Object.create&&Object.getPrototypeOf)t=Object.create(Object.getPrototypeOf(e));else if(e.constructor===Object)t={};else{var r=e.constructor&&e.constructor.prototype||e.__proto__||{},n=function(){};n.prototype=r,t=new n}return s(i(e),(function(r){t[r]=e[r]})),t}return e}r.prototype.get=function(e){for(var t=this.value,r=0;r<e.length;r++){var n=e[r];if(!t||!u.call(t,n)){t=void 0;break}t=t[n]}return t},r.prototype.has=function(e){for(var t=this.value,r=0;r<e.length;r++){var n=e[r];if(!t||!u.call(t,n))return!1;t=t[n]}return!0},r.prototype.set=function(e,t){for(var r=this.value,n=0;n<e.length-1;n++){var o=e[n];u.call(r,o)||(r[o]={}),r=r[o]}return r[e[n]]=t,t},r.prototype.map=function(e){return n(this.value,e,!0)},r.prototype.forEach=function(e){return this.value=n(this.value,e,!1),this.value},r.prototype.reduce=function(e,t){var r=1===arguments.length,n=r?this.value:t;return this.forEach((function(t){this.isRoot&&r||(n=e.call(this,n,t))})),n},r.prototype.paths=function(){var e=[];return this.forEach((function(t){e.push(this.path)})),e},r.prototype.nodes=function(){var e=[];return this.forEach((function(t){e.push(this.node)})),e},r.prototype.clone=function(){var e=[],t=[];return function r(n){for(var a=0;a<e.length;a++)if(e[a]===n)return t[a];if("object"==typeof n&&null!==n){var c=o(n);return e.push(n),t.push(c),s(i(n),(function(e){c[e]=r(n[e])})),e.pop(),t.pop(),c}return n}(this.value)};var i=Object.keys||function(e){var t=[];for(var r in e)t.push(r);return t};function a(e){return Object.prototype.toString.call(e)}var c=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},s=function(e,t){if(e.forEach)return e.forEach(t);for(var r=0;r<e.length;r++)t(e[r],r,e)};s(i(r.prototype),(function(e){t[e]=function(t){var n=[].slice.call(arguments,1),o=new r(t);return o[e].apply(o,n)}}));var u=Object.hasOwnProperty||function(e,t){return t in e}}));function l(e){const t=e=>new Promise(((t,r)=>e instanceof Promise?t(e):("string"==typeof e&&(e={gte:e,lte:e+"￮"}),n(e).then(t)))),r=(...e)=>Promise.all(e.map((e=>t(e)))).then((e=>{var t=(e=[].concat.apply([],e)).reduce(((e,t)=>(e[t._id]=e[t._id]||[],e[t._id].push(t.match),e)),{});return Object.keys(t).map((e=>({_id:e,match:t[e]})))})),n=t=>new Promise(((r,n)=>{const o={};e.createReadStream(t).on("data",(e=>e.value.forEach((t=>{o[t]=o[t]||[],o[t].push(e.key)})))).on("end",(()=>r(Object.keys(o).map((e=>({_id:e,match:o[e]}))))))}));return{AGGREGATE:(...e)=>Promise.all(e).then((e=>{var t=new Set(e[1].map((e=>e._id)));return e[0].map((e=>({match:e.match,_id:[...new Set([...e._id].filter((e=>t.has(e))))]}))).filter((e=>e._id.length))})),BUCKET:e=>t(e).then((t=>({match:e,_id:[...t.reduce(((e,t)=>e.add(t._id)),new Set)].sort()}))),GET:t,INTERSECTION:(...e)=>r(...e).then((t=>t.filter((t=>t.match.length===e.length)))),SET_DIFFERENCE:(e,r)=>("string"==typeof e&&(e=t(e)),"string"==typeof r&&(r=t(r)),Promise.all([e,r]).then((e=>{var[t,r]=e;return r=r.map((e=>e._id)),t.filter((e=>r.indexOf(e._id)))}))),UNION:r}}function f(e){return{OBJECT:t=>Promise.all(t.map((t=>e.get("￮DOC￮"+t._id+"￮"))))}}function p(e){return{DIST:t=>{"string"==typeof t&&(t={gte:t,lte:t+"￮"});const r=[];return new Promise(((n,o)=>{e.createKeyStream(t).on("data",(e=>{r.push(e)})).on("end",(()=>n(r)))}))},MAX:t=>{var r={limit:1,lte:t+"￮",reverse:!0};return new Promise(((t,n)=>{e.createKeyStream(r).on("data",t)}))},MIN:t=>{var r={limit:1,gte:t+"!"};return new Promise(((t,n)=>{e.createKeyStream(r).on("data",t)}))}}}var h=0;const d=function(e){var t=[];return u(e).forEach((function(e){var r=!0;if(this.path.forEach((e=>{"!"===e.substring(0,1)&&(r=!1),"_id"===e&&(r=!1)})),r&&this.isLeaf){var n=this.path.join(".")+":"+this.node;Array.isArray(this.parent.node)&&(n=this.path.slice(0,this.path.length-1).join(".")+":"+this.node),t.push(n)}})),{_id:e._id||++h,keys:t}},E=(e,t)=>(t.keys.forEach((r=>{e[r]=e[r]||[],e[r].push(t._id)})),e),m=e=>("string"==typeof e._id||"number"==typeof e._id||(e._id=h++),e),y=(e,t,r)=>(e=e.map(m),new Promise(((n,o)=>{((e,t,r)=>{const n=Object.keys(e);return Promise.all(n.map((e=>new Promise(((r,n)=>{t.get(e).then(r).catch((e=>r([])))}))))).then((t=>t.map(((t,o)=>{var i=new Set(t),a=new Set(e[n[o]]);if("put"===r)return{key:n[o],type:r,value:[...new Set([...i,...a])].sort()};if("del"===r){var c=[...new Set([...i].filter((e=>!a.has(e))))];return{key:n[o],type:0===c.length?"del":"put",value:c}}}))))})((e=>e.map(d).reduce(E,{}))(e),t,r).then((o=>{t.batch(o.concat(((e,t)=>e.map((e=>({key:"￮DOC￮"+e._id+"￮",type:t,value:e}))))(e,r)),(t=>n(e)))}))})));function v(e){return{DELETE:t=>f(e).OBJECT(t.map((e=>({_id:e})))).then((t=>y(t,e,"del"))),PUT:t=>y(t,e,"put")}}const b=e=>({AGGREGATE:l(e).AGGREGATE,AND:l(e).INTERSECTION,BUCKET:l(e).BUCKET,BUCKETFILTER:l(e).AGGREGATE,DELETE:v(e).DELETE,DISTINCT:p(e).DIST,GET:l(e).GET,MAX:p(e).MAX,MIN:p(e).MIN,NOT:l(e).SET_DIFFERENCE,OBJECT:f(e).OBJECT,OR:l(e).UNION,PUT:v(e).PUT,STORE:e});function T(e,r){return e=Object.assign({},{name:"fii"},e),r?e.store?r(new Error('When initing with a store use "lazy loading"'),null):void t(e.name,{valueEncoding:"json"},((e,t)=>r(e,b(t)))):b(e.store||t(e.name,{valueEncoding:"json"}))}function g(e){const t=()=>{const t=[];return new Promise(((r,n)=>{e.STORE.createKeyStream({gte:"￮FIELD!",lte:"￮FIELD￮￮"}).on("data",(e=>t.push(e.split("￮")[2]))).on("end",(()=>r(s.searchableFields=t)))}))},r=()=>{var t=0;return new Promise(((r,n)=>{e.STORE.createKeyStream({gte:"￮DOC￮!",lte:"￮DOC￮￮"}).on("data",(e=>t++)).on("end",(()=>r(s.D=t)))}))},n=()=>{if(e.STORE.isOpen())return t().then(r);setTimeout(n,1e3)};return{countDocs:r,prefetchSearchableFields:t,calibrate:n}}function O(e){const t=function(e){var t={};return u(e).forEach((function(e){if(void 0!==e){var r=!0;this.path.forEach((e=>{"_id"===e&&(r=!1),"!"===e.substring(0,1)&&(r=!1)})),r&&this.isLeaf&&(t[this.path.filter((e=>isNaN(e))).join(".")]=(this.node+"").split(" "))}})),t},r=e=>Object.keys(e).reduce(((t,r)=>{if(1===e[r].length&&!isNaN(e[r][0])){const n=e[r][0];return t[r]={},t[r][n]=n,t}return t[r]=function(e,t){t=Object.assign({},{ngramLengths:[1]},t);const r=e.reduce(((e,r,n,o)=>(t.ngramLengths.forEach((t=>{var i=o.slice(n,n+t);i.length===t&&(r=JSON.stringify(i),e[r]=e[r]||[],e[r].push(n))})),e)),{});return Object.keys(r).map((e=>({term:JSON.parse(e),positions:r[e]}))).sort(((e,t)=>e.term[0]>t.term[0]))}(e[r]).reduce(((e,t,r,n)=>(e[t.term]=(t.positions.length/n.length).toFixed(2),e)),{}),t}),{}),n=t=>new Promise(((r,n)=>{const o=new Set([].concat.apply([],t.map(Object.keys)));o.delete("_id"),o.delete("!doc"),e.STORE.batch(Array.from(o).map((e=>({type:"put",key:"￮FIELD￮"+e+"￮",value:!0}))),(t=>{t&&console.log(t),g(e).calibrate().then(r)}))}));return{DELETE:(...t)=>e.DELETE(...t),PUT:o=>e.PUT(o.map(t).map(r).map(((e,t)=>(e._id=o[t]._id,e["!doc"]=o[t],e)))).then(n)}}function S(e){return e.resultSet.map(((e,t,r)=>{const n=Math.log((s.D+1)/r.length);return e.score=+e.match.reduce(((e,t)=>e+n*+t.split(":")[1]),0).toFixed(2),e})).sort(((e,t)=>t.score-e.score)).slice(e.offset,e.limit)}function w(e){return e.resultSet.map(((t,r,n)=>(t.score=+t.match.filter((t=>t.startsWith(e.fieldName)))[0].split(":")[1],t))).sort(e.sort).slice(e.offset,e.limit)}s.D=0,s.searchableFields=[];const R=e=>{const t=O(e),r=function(e){const t=e=>[].concat.apply([],e),r=e=>e.map((e=>(e.match=t(e.match),e.match=t(e.match),e))),n=t=>new Promise(((r,n)=>e.OBJECT(t).then((e=>r(t.map(((t,r)=>(t.obj=e[r]["!doc"],t)))))))),o=function(...t){return e.AND(...t.map(a)).then(r)},i=(...n)=>e.OR(...t(n.map(a))).then(r),a=t=>t instanceof Promise?t:":*"===t.slice(-2)?e.GET(t.replace(":*",".")):t.indexOf(":")>-1?e.GET(t.replace(":",".")+":"):i(...s.searchableFields.map((e=>e+":"+t)));return{AND:o,BUCKET:e.BUCKET,BUCKETFILTER:e.BUCKETFILTER,DICTIONARY:t=>new Promise(((r,n)=>{const o=new Set;(t="string"==typeof t?{gte:t,lte:t+"￮"}:Object.assign({gte:"",lte:"￮"},t)).lte="￮"===t.lte.substr(-1)?t.lte:t.lte+"￮";const i=e.STORE.createKeyStream(t);i.on("data",(e=>o.add(e.split(":")[0].split(".").pop()))),i.on("end",(()=>r(Array.from(o).sort())))})),DISTINCT:t=>e.DISTINCT(t).then((e=>[...e.reduce(((e,t)=>(e.add(t.split(":")[0]),e)),new Set)])),DOCUMENTS:n,GET:a,OR:i,SCORENUMERIC:w,SCORETFIDF:S,SEARCH:(...e)=>o(...e).then((e=>S({resultSet:e,offset:0,limit:10}))).then((e=>n(e))),SET_DIFFERENCE:(e,t)=>("string"==typeof e&&(e=a(e)),"string"==typeof t&&(t=a(t)),Promise.all([e,t]).then((e=>{var[t,r]=e;return r=r.map((e=>e._id)),t.filter((e=>r.indexOf(e._id)))})))}}(e);return{AND:r.AND,BUCKET:r.BUCKET,BUCKETFILTER:r.BUCKETFILTER,DELETE:t.DELETE,DICTIONARY:r.DICTIONARY,DISTINCT:r.DISTINCT,DOCUMENTS:r.DOCUMENTS,GET:r.GET,INDEX:e,NOT:r.SET_DIFFERENCE,OR:r.OR,PUT:t.PUT,SCORENUMERIC:r.SCORENUMERIC,SCORETFIDF:r.SCORETFIDF,SEARCH:r.SEARCH}};var j,C={rxdb:!0,prototypes:{RxCollection:function(e){e.search=function(){var e,t=(e=regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(j){e.next=2;break}throw new Error("Search Index (search-index) is not.");case 2:return e.prev=2,e.next=5,(r=j).SEARCH.apply(r,a(t.split(" ")));case 5:return e.abrupt("return",e.sent);case 8:e.prev=8,e.t0=e.catch(2),console.error("Error while searching: ",e.t0);case 11:case"end":return e.stop()}}),e,null,[[2,8]])})),function(){var t=this,n=arguments;return new Promise((function(o,i){var a=e.apply(t,n);function c(e){r(a,o,i,c,s,"next",e)}function s(e){r(a,o,i,c,s,"throw",e)}c(void 0)}))});return function(e){return t.apply(this,arguments)}}()}},hooks:{createRxDatabase:function(e){var t=e.name;j=function(e,t){if(!t){let t=e.fii||T(e);return g(t).calibrate(),R(t)}T(e,((e,r)=>{g(r).calibrate().then((()=>t(e,R(r))))}))}({name:t}),Object.assign(e,{idb:j})},createRxDocument:function(e){if(j){var t=e._data;try{j.PUT([i({},t)])}catch(e){console.error("Could not PUT",t,e)}}}}};module.exports=C;
