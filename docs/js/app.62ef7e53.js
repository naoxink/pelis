(function(t){function e(e){for(var i,r,n=e[0],l=e[1],c=e[2],m=0,u=[];m<n.length;m++)r=n[m],Object.prototype.hasOwnProperty.call(s,r)&&s[r]&&u.push(s[r][0]),s[r]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(t[i]=l[i]);d&&d(e);while(u.length)u.shift()();return a.push.apply(a,c||[]),o()}function o(){for(var t,e=0;e<a.length;e++){for(var o=a[e],i=!0,n=1;n<o.length;n++){var l=o[n];0!==s[l]&&(i=!1)}i&&(a.splice(e--,1),t=r(r.s=o[0]))}return t}var i={},s={app:0},a=[];function r(e){if(i[e])return i[e].exports;var o=i[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=i,r.d=function(t,e,o){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(o,i,function(e){return t[e]}.bind(null,i));return o},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/pelis/";var n=window["webpackJsonp"]=window["webpackJsonp"]||[],l=n.push.bind(n);n.push=e,n=n.slice();for(var c=0;c<n.length;c++)e(n[c]);var d=l;a.push([0,"chunk-vendors"]),o()})({0:function(t,e,o){t.exports=o("56d7")},"48c0":function(t,e,o){},"56d7":function(t,e,o){"use strict";o.r(e);var i=o("2b0e"),s=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("Nav"),e("b-container",[e("b-row",[e("b-col",{attrs:{sm:"12",lg:"4"}},[e("Resume",{attrs:{totalSpent:t.round2decimals(t.totalSpent),totalMovies:t.totalMovies(),giftMovies:t.giftMovies(),unwatchedMovies:t.unwatchedMovies()}}),e("b-card",[e("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.add-movie-modal",modifiers:{"add-movie-modal":!0}}],attrs:{variant:"success"}},[e("b-icon-plus"),t._v(" Añadir película")],1)],1)],1),e("b-col",{attrs:{sm:"12",lg:"8"}},[e("SuggestedMovie",{on:{showDetail:t.showMovieModal}}),t.filteredResults.count?e("b-pagination",{staticClass:"mb-3",attrs:{"total-rows":t.filteredResults.count,"per-page":t.qtyPerPage,limit:10,align:"fill"},on:{change:t.changePage},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}}):t._e(),e("b-list-group",[e("b-list-group-item",{staticClass:"d-flex justify-content-between align-items-center",attrs:{variant:"dark"}},[e("h4",{staticClass:"mb-0 d-inline-block"},[t._v("Mi colección")]),e("b-button",{attrs:{size:"sm",variant:t.showFilters?"light":""},on:{click:function(e){t.showFilters=!t.showFilters}}},[e("b-icon-filter")],1)],1),t.showFilters?e("b-list-group-item",{attrs:{variant:"light"}},[e("b-row",[e("b-col",{attrs:{cols:"12"}},[e("b-input-group",{attrs:{size:"md",prepend:"Título"}},[e("b-form-input",{model:{value:t.filters.title,callback:function(e){t.$set(t.filters,"title",e)},expression:"filters.title"}})],1)],1)],1),e("b-row",{staticClass:"mt-2"},[e("b-col",{attrs:{cols:"12",md:"5"}},[e("b-input-group",{attrs:{prepend:"Precio"}},[e("b-form-select",{model:{value:t.filters.cost,callback:function(e){t.$set(t.filters,"cost",e)},expression:"filters.cost"}},[e("b-form-select-option",{attrs:{value:""}}),e("b-form-select-option",{attrs:{value:"0"}},[t._v("Gratis")]),e("b-form-select-option",{attrs:{value:"<5"}},[t._v("< 5€")]),e("b-form-select-option",{attrs:{value:"<10"}},[t._v("< 10€")]),e("b-form-select-option",{attrs:{value:"10&50"}},[t._v("> 10€ && < 50€")]),e("b-form-select-option",{attrs:{value:">50"}},[t._v("> 50€")])],1)],1)],1),e("b-col",{staticClass:"mt-2 mt-sm-0",attrs:{cols:"12",md:"5"}},[e("b-input-group",{attrs:{prepend:"Estrenada"}},[e("b-form-select",{model:{value:t.filters.watched,callback:function(e){t.$set(t.filters,"watched",e)},expression:"filters.watched"}},[e("b-form-select-option",{attrs:{value:null}},[t._v("Todas")]),e("b-form-select-option",{attrs:{value:!1}},[t._v("Sin estrenar")]),e("b-form-select-option",{attrs:{value:!0}},[t._v("Estrenadas")])],1)],1)],1)],1),e("b-row",{staticClass:"mt-2 text-center"},[e("b-col",[e("b-input-group",{attrs:{prepend:"Resultados por página"}},[e("b-form-select",{model:{value:t.qtyPerPage,callback:function(e){t.qtyPerPage=e},expression:"qtyPerPage"}},[e("b-form-select-option",{attrs:{value:15}},[t._v("15")]),e("b-form-select-option",{attrs:{value:50}},[t._v("50")]),e("b-form-select-option",{attrs:{value:100}},[t._v("100")])],1)],1)],1),e("b-col",[e("b-input-group",{attrs:{prepend:"Ordenar"}},[e("b-form-select",{model:{value:t.filters.sort.field,callback:function(e){t.$set(t.filters.sort,"field",e)},expression:"filters.sort.field"}},[e("b-form-select-option",{attrs:{value:"title"}},[t._v("Título")]),e("b-form-select-option",{attrs:{value:"cost"}},[t._v("Coste")]),e("b-form-select-option",{attrs:{value:"addDate"}},[t._v("Fecha añadida")])],1),e("b-form-select",{model:{value:t.filters.sort.order,callback:function(e){t.$set(t.filters.sort,"order",e)},expression:"filters.sort.order"}},[e("b-form-select-option",{attrs:{value:-1}},[t._v("Asc")]),e("b-form-select-option",{attrs:{value:1}},[t._v("Desc")])],1)],1)],1)],1),e("b-row",[e("b-col",[t._v("Resultados: "),e("strong",[t._v(t._s(t.filteredResults.count))])])],1)],1):t._e(),t.totalMovies()?t._e():e("b-list-group-item",{attrs:{variant:"secondary"}},[t._v("Aún no has añadido nada a tu colección :(")]),t.hasAnyFilter&&!t.filteredResults.count&&t.totalMovies()?e("b-list-group-item",{attrs:{variant:"warning"}},[t._v(" No hay resultados con estos filtros ")]):t._e(),t._l(t.filteredResults.items,(function(o,i){return e("b-list-group-item",{key:i},[e("b-row",[e("b-col",{attrs:{md:"12"}},[e("div",{staticClass:"text-truncate text-left font-weight-bold"},[e("a",{directives:[{name:"b-modal",rawName:"v-b-modal.detail-movie-modal",modifiers:{"detail-movie-modal":!0}}],attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.showMovie(o)}}},[t._v(t._s(o.title)+" ")])])]),e("b-col",{staticClass:"text-right",attrs:{md:"12"}},[e("b-row",{staticClass:"mt-3 mt-sm-0"},[e("b-col",{attrs:{cols:"6",sm:"8"}},[e("div",{staticClass:"mt-1 text-left"},[+o.watched?t._e():e("b-badge",{staticClass:"mr-2 pl-2 pr-2 text-uppercase",attrs:{variant:"warning"}},[t._v("Sin estrenar")]),e("b-badge",{staticClass:"mr-2 pl-2 pr-2",attrs:{variant:"success",title:`Coste: ${o.cost}€`}},[t._v(t._s(o.cost)+"€")]),e("b-badge",{staticClass:"mr-2 pl-2 pr-2",attrs:{variant:"secondary",title:"Añadida: "+t.formatDate(o.addDate)}},[t._v(t._s(t.formatDate(o.addDate)))])],1)]),e("b-col",{attrs:{cols:"6",sm:"4"}},[e("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.edit-movie",modifiers:{"edit-movie":!0}}],staticClass:"mr-1",attrs:{variant:"info",size:"sm"},on:{click:function(e){return t.editMovie(o.id)}}},[e("b-icon-pencil"),e("span",{staticClass:"d-none d-sm-inline-block"},[t._v("Editar")])],1),e("b-button",{attrs:{size:"sm",variant:"danger"},on:{click:function(e){return t.removeMovie(o.id)}}},[e("b-icon-trash"),e("span",{staticClass:"d-none d-sm-inline-block"},[t._v("Eliminar")])],1)],1)],1)],1)],1)],1)}))],2),t.filteredResults.count?e("b-pagination",{staticClass:"mt-3",attrs:{"total-rows":t.filteredResults.count,"per-page":t.qtyPerPage,limit:10,align:"fill"},on:{change:t.changePage},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}}):t._e()],1)],1)],1),e("AddMovieModal"),e("OptionsModal"),e("EditModal",{attrs:{movie:t.editMovieData},on:{confirmEditMovie:t.confirmEditMovie,resetEditMovie:t.resetEditMovie}}),e("DetailModal",{attrs:{movie:t.detailMovie},on:{removeMovie:function(e){return t.removeMovie(e)},editMovie:function(e){return t.editMovie(e)}}})],1)},a=[],r=o("2f62"),n=(o("f9e3"),o("2dd8"),o("5df9"),{methods:{showToast(t,e,o){this.$bvToast.toast(e,{title:t,variant:o,solid:!0,toaster:"b-toaster-top-center"})},newId(){return Math.random().toString().substring(2)+(new Date).getTime()},readImdbCSV:async function(t){const e=this.csvToArray(t);e.forEach(async(t,e)=>{if(0===e)return!1;const o=t[1],i=t[16],s=t[5],a=t[6];if(!o)return!1;this.$store.commit("addMovie",{id:o,cost:0,store:"",addDate:new Date(i).getTime(),title:s,watched:!!i,imdbLink:a})})},csvToArray(t){let e,o="",i=[""],s=[i],a=0,r=0,n=!0;for(e of t)'"'===e?(n&&e===o&&(i[a]+=e),n=!n):","===e&&n?e=i[++a]="":"\n"===e&&n?("\r"===o&&(i[a]=i[a].slice(0,-1)),i=s[++r]=[e=""],a=0):i[a]+=e,o=e;return s},round2decimals(t){return Math.round(100*(t+Number.EPSILON))/100},jsonToCsv(t){const e=t,o=(t,e)=>null===e?"":e,i=Object.keys(e[0]),s=[i.join(","),...e.map(t=>i.map(e=>JSON.stringify(t[e],o)).join(","))].join("\r\n");return s}}}),l=function(){var t=this,e=t._self._c;return t.movie.id?e("b-card",{staticClass:"mb-3"},[e("b-card-text",[e("strong",{staticClass:"mr-1"},[t._v("Película sugerida hoy:")]),e("a",{staticClass:"font-weight-bold",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.$emit("showDetail",t.movie.id)}}},[t._v(t._s(t.movie.title))]),+t.movie.watched?t._e():e("b-badge",{staticClass:"ml-1",attrs:{variant:"warning"}},[t._v("SIN ESTRENAR")])],1)],1):t._e()},c=[],d={name:"SuggestedMovie",computed:{...Object(r["b"])(["movieCollection","suggestedToday"])},watch:{suggestedToday(){this.$store.dispatch({type:"getMovie",id:this.suggestedToday.id}).then(t=>this.movie=t)}},data:function(){return{movie:{}}},mounted(){}},m=d,u=o("2877"),v=Object(u["a"])(m,l,c,!1,null,"34eaa686",null),p=v.exports,b=function(){var t=this,e=t._self._c;return t.movie?e("b-modal",{attrs:{size:"lg",id:"detail-movie-modal",title:"Detalle: "+t.movie["Título"],"ok-only":""}},[e("b-container",{attrs:{id:"detail-content"}},[t._l(t.movie,(function(o,i){return["Enlace IMDb"!==i?e("b-row",{key:i},[e("b-col",{staticClass:"text-right",attrs:{cols:"4"}},[e("strong",[t._v(t._s(i))])]),e("b-col",{attrs:{cols:"8"}},["ID"===i?e("code",{staticClass:"text-truncate d-block"},[t._v(t._s(o))]):e("span",[t._v(t._s(o))])])],1):t._e()]})),t.suggestedToday&&t.suggestedToday.id===t.movie.ID?e("b-row",[e("b-col",{attrs:{cols:"4"}}),e("b-col",{staticClass:"text-left"},[e("b-badge",{attrs:{variant:"info"}},[t._v("SUGERIDA HOY")])],1)],1):t._e(),t.imdbLink(t.movie)?e("b-row",[e("b-col",{staticClass:"text-right",attrs:{cols:"4"}},[e("strong",[t._v("Enlace IMDb")])]),e("b-col",{attrs:{cols:"8"}},[e("a",{attrs:{target:"_blank",href:t.imdbLink(t.movie)}},[t._v(t._s(t.movie["Título"]))])])],1):t._e(),e("hr"),e("b-row",[e("b-col",{staticClass:"text-right",attrs:{cols:"4"}},[t._v(" Opciones ")]),e("b-col",[e("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.edit-movie",modifiers:{"edit-movie":!0}}],staticClass:"mr-1",attrs:{variant:"info",size:"sm"},on:{click:function(e){return t.$emit("editMovie",t.movie.ID)}}},[e("b-icon-pencil"),e("span",{staticClass:"d-none d-sm-inline-block"},[t._v("Editar")])],1),e("b-button",{attrs:{size:"sm",variant:"danger"},on:{click:function(e){return t.$emit("removeMovie",t.movie.ID)}}},[e("b-icon-trash"),e("span",{staticClass:"d-none d-sm-inline-block"},[t._v("Eliminar")])],1)],1)],1)],2)],1):t._e()},f=[],h={name:"DetailModal",props:["movie"],computed:{...Object(r["b"])(["suggestedToday"])},methods:{imdbLink:t=>0===t.ID.toString().indexOf("tt")?"https://imdb.com/title/"+t.ID:t["Enlace IMDb"]?t["Enlace IMDb"]:""}},g=h,w=Object(u["a"])(g,b,f,!1,null,null,null),C=w.exports,_=function(){var t=this,e=t._self._c;return e("b-modal",{attrs:{id:"edit-movie",title:"Editar película"},on:{ok:function(e){return t.$emit("confirmEditMovie")},hidden:function(e){return t.$emit("resetEditMovie")}}},[e("b-row",[e("b-col",{attrs:{cols:"12"}},[t._v("id: "),e("code",[t._v(t._s(t.movie.id))])])],1),e("b-row",{staticClass:"mt-3"},[e("b-col",{attrs:{cols:"12"}},[e("b-input-group",{attrs:{size:"md",prepend:"Título"}},[e("b-form-input",{attrs:{id:"new-movie-title"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.$emit("confirmEditMovie")}},model:{value:t.movie.title,callback:function(e){t.$set(t.movie,"title",e)},expression:"movie.title"}})],1)],1),e("b-col",{staticClass:"mt-2",attrs:{cols:"12",sm:"6"}},[e("b-input-group",{attrs:{size:"md",prepend:"Precio",append:"€"}},[e("b-form-input",{on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.$emit("confirmEditMovie")}},model:{value:t.movie.cost,callback:function(e){t.$set(t.movie,"cost",e)},expression:"movie.cost"}})],1)],1),e("b-col",{staticClass:"mt-2",attrs:{cols:"12",sm:"6"}},[e("b-input-group",{attrs:{prepend:"Tienda"}},[e("b-form-select",{model:{value:t.movie.store,callback:function(e){t.$set(t.movie,"store",e)},expression:"movie.store"}},[e("b-form-select-option",{attrs:{value:""}}),t._l(t.stores,(function(o,i){return e("b-form-select-option",{key:i,attrs:{value:i}},[t._v(t._s(o))])}))],2)],1)],1)],1),e("b-row",{staticClass:"mt-2"},[e("b-col",[e("b-input-group",{attrs:{prepend:"Estrenada"}},[e("b-form-select",{model:{value:t.movie.watched,callback:function(e){t.$set(t.movie,"watched",e)},expression:"movie.watched"}},[e("b-form-select-option",{attrs:{value:"0"}},[t._v("No")]),e("b-form-select-option",{attrs:{value:"1"}},[t._v("Sí")])],1)],1)],1)],1),e("b-row",[e("b-col",{staticClass:"mt-2",attrs:{cols:"12"}},[e("b-input-group",{attrs:{size:"md",prepend:"Link IMDb"}},[e("b-form-input",{on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.$emit("confirmEditMovie")}},model:{value:t.movie.imdbLink,callback:function(e){t.$set(t.movie,"imdbLink",e)},expression:"movie.imdbLink"}})],1)],1)],1),e("b-row",[e("b-col",{staticClass:"mt-2",attrs:{cols:"12"}},[e("b-input-group",{attrs:{size:"md",prepend:"Fecha añadida"}},[e("b-form-datepicker",{on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.$emit("confirmEditMovie")}},model:{value:t.movie.addDate,callback:function(e){t.$set(t.movie,"addDate",e)},expression:"movie.addDate"}})],1)],1)],1)],1)},M=[],k={name:"DetailModal",props:["movie"],computed:{...Object(r["b"])(["stores"])}},y=k,D=Object(u["a"])(y,_,M,!1,null,null,null),x=D.exports,S=function(){var t=this,e=t._self._c;return e("b-modal",{attrs:{id:"options-modal",title:"Opciones","ok-only":""}},[e("b-row",{staticClass:"mb-3"},[e("b-col",[e("b-alert",{attrs:{variant:"info",show:""}},[e("h4",[t._v("Exportación")]),t.exportCode?t._e():e("b-button",{attrs:{block:"",variant:"info"},on:{click:t.exportCollection}},[t._v("Exportar colección")]),t.exportCode?e("b-textarea",{attrs:{rows:"6",value:t.exportCode}}):t._e(),t.exportCode?e("b-button",{attrs:{block:"",variant:"success"},on:{click:t.downloadExportFile}},[t._v("Descargar archivo")]):t._e(),t.exportCode?e("b-button",{attrs:{block:""},on:{click:t.clearExportCode}},[t._v("Cerrar")]):t._e()],1)],1)],1),e("b-row",{staticClass:"mb-3"},[e("b-col",[e("b-alert",{attrs:{variant:"warning",show:""}},[e("h4",[t._v("Importación")]),t.showImportTextarea?t._e():e("b-button",{attrs:{block:"",variant:"warning"},on:{click:function(e){t.showImportTextarea=!0}}},[t._v("Importar colección")]),t.showImportTextarea?e("b-textarea",{attrs:{rows:"6"},model:{value:t.importCode,callback:function(e){t.importCode=e},expression:"importCode"}}):t._e(),t.importCode.length?e("b-button",{staticClass:"mr-2",attrs:{variant:"success"},on:{click:t.importCollection}},[t._v("Importar colección")]):t._e(),t.showImportTextarea?e("b-button",{on:{click:function(e){t.importCode="",t.showImportTextarea=!1}}},[t._v("Cancelar")]):t._e(),t.importCode.length?e("div",{staticClass:"text-center mt-2"},[e("small",[e("strong",[t._v("¡Esto sobrescribirá la colección actual! ¡No se puede deshacer!")])])]):t._e(),e("hr"),e("strong",[t._v("Importar desde archivo")]),e("input",{staticClass:"mt-2",attrs:{type:"file"},on:{change:t.importCollectionFile}}),e("hr"),e("strong",[t._v("Importar CSV de IMDB")]),e("input",{staticClass:"mt-2",attrs:{type:"file"},on:{change:t.readFile}})],1)],1)],1),e("b-row",[e("b-col",[e("b-alert",{attrs:{variant:"light",show:""}},[e("b-button",{attrs:{variant:"primary"},on:{click:t.recalcTotalSpent}},[t._v("Recalcular coste total")])],1)],1)],1),e("b-row",[e("b-col",[e("b-alert",{attrs:{variant:"danger",show:""}},[e("h5",[e("b-icon-exclamation-triangle"),t._v(" Zona peligrosa ")],1),e("hr"),e("b-button",{attrs:{variant:"danger",block:""},on:{click:t.clearCollection}},[t._v("Eliminar la colección al completo")])],1)],1)],1)],1)},T=[],E={name:"OptionsModal",mixins:[n],computed:{...Object(r["b"])(["movieCollection","totalSpent"])},data:function(){return{showImportTextarea:!1,importCode:"",exportCode:"",importListUrl:""}},methods:{recalcTotalSpent(){this.$store.commit("forceRecalcTotalSpent"),this.showToast("Correcto","Se ha recalculado el gasto total con éxito","success")},downloadExportFile(){if(!this.exportCode)return!1;const t=document.createElement("a");t.download="pelis_export.csv",t.href="data:text/csv;"+this.jsonToCsv(this.movieCollection),t.click()},importCollectionFile(t){const e=new FileReader;e.onload=t=>{console.log(this.csvToArray(t.target.result))},e.readAsText(t.target.files[0])},readFile:async function(t){const e=t.target.files[0],o=new FileReader;o.onload=()=>{this.readImdbCSV(o.result)},o.readAsText(e,"UTF-8")},clearCollection(){confirm("Vas a ELIMINAR POR COMPLETO la colección ¿estás seguro/a?")&&(this.$store.commit("clearCollection"),this.showToast("Colección eliminada","Se ha eliminado la colección al completo","success"))},exportCollection(){const t=JSON.stringify({movieCollection:this.movieCollection,totalSpent:this.totalSpent});this.exportCode=btoa(t)},clearExportCode(){this.exportCode=""},importCollection(){const t=atob(this.importCode);try{const e=JSON.parse(t);e.movieCollection=e.movieCollection.map(t=>(t.id||(t.id=this.newId()),"undefined"===typeof t.watched?t.watched=1:t.watched=!!+t.watched,t.addDate?t.addDate=+t.addDate:t.addDate=Date.now(),t)),this.$store.commit("importCollection",e),this.showToast("Importado","Colección importada con éxito","success")}catch(e){console.error(e)}}}},O=E,I=Object(u["a"])(O,S,T,!1,null,null,null),$=I.exports,P=function(){var t=this,e=t._self._c;return e("b-modal",{attrs:{title:"Añadir película",id:"add-movie-modal"}},[e("b-input-group",{attrs:{size:"md",prepend:"Título"}},[e("b-form-input",{attrs:{id:"new-movie-title-modal"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.addMovie.apply(null,arguments)}},model:{value:t.movie.title,callback:function(e){t.$set(t.movie,"title",e)},expression:"movie.title"}})],1),e("b-input-group",{staticClass:"mt-2",attrs:{size:"md",prepend:"Precio",append:"€"}},[e("b-form-input",{on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.addMovie.apply(null,arguments)}},model:{value:t.movie.cost,callback:function(e){t.$set(t.movie,"cost",e)},expression:"movie.cost"}})],1),e("b-input-group",{staticClass:"mt-2",attrs:{prepend:"Tienda"}},[e("b-form-select",{model:{value:t.movie.store,callback:function(e){t.$set(t.movie,"store",e)},expression:"movie.store"}},[e("b-form-select-option",{attrs:{value:""}}),t._l(t.stores,(function(o,i){return e("b-form-select-option",{key:i,attrs:{value:i}},[t._v(t._s(o))])}))],2)],1),e("b-input-group",{staticClass:"mt-2",attrs:{size:"md",prepend:"IMDb link"}},[e("b-form-input",{on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.addMovie.apply(null,arguments)}},model:{value:t.movie.imdbLink,callback:function(e){t.$set(t.movie,"imdbLink",e)},expression:"movie.imdbLink"}})],1),e("b-row",[e("b-col",{staticClass:"text-center mt-3",attrs:{sm:"12",md:"6","offset-md":"3"}},[e("b-button",{attrs:{block:"",variant:"success"},on:{click:t.addMovie}},[t._v("Añadir a la colección")])],1)],1)],1)},j=[],L={name:"AddMovieModal",mixins:[n],computed:{...Object(r["b"])(["stores"])},data:function(){return{movie:{title:"",cost:0,store:"",imdbLink:""}}},methods:{addMovie(){const t=this;if(!this.movie.title)return!1;this.$store.commit("addMovie",{id:t.newId(),title:t.movie.title,cost:t.movie.cost,store:t.movie.store,imdbLink:t.movie.imdbLink}),document.querySelector("#new-movie-title-modal").focus(),this.showToast("Añadida",`Se ha añadido "${this.movie.title}" a la colección con un coste de ${this.movie.cost}€`,"success"),this.movie.title="",this.movie.cost=0,this.movie.store="",this.movie.imdbLink=""}}},A=L,N=Object(u["a"])(A,P,j,!1,null,null,null),R=N.exports,F=function(){var t=this,e=t._self._c;return e("b-alert",{attrs:{variant:"info",show:""}},[e("strong",[t._v("Resumen")]),e("hr"),e("div",[t._v("Total de películas: "),e("strong",[t._v(t._s(t.totalMovies))])]),t.giftMovies?e("div",[t._v("Películas que me han regalado: "),e("strong",[t._v(t._s(t.giftMovies))])]):t._e(),t.unwatchedMovies?e("div",[t._v("Películas por estrenar: "),e("strong",[t._v(t._s(t.unwatchedMovies))])]):t._e(),e("div",[t._v("Dinero total invertido: "),e("strong",[t._v(t._s(t.totalSpent)+" €")])])])},z=[],q={name:"Resume",props:["totalMovies","giftMovies","unwatchedMovies","totalSpent"]},J=q,V=Object(u["a"])(J,F,z,!1,null,null,null),B=V.exports,G=function(){var t=this,e=t._self._c;return e("nav",{staticClass:"navbar navbar-dark bg-dark mb-3"},[e("b-container",[e("a",{staticClass:"navbar-brand",attrs:{href:"#"}},[e("b-icon-film",{staticClass:"yellowgreen"}),t._v(" "),e("span",{staticClass:"d-none d-sm-inline-block"},[t._v("COLECCIÓN DE PELIS")])],1),e("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.add-movie-modal",modifiers:{"add-movie-modal":!0}}],staticClass:"d-inline-block d-sm-none",attrs:{variant:"success"}},[e("b-icon-plus")],1),e("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.options-modal",modifiers:{"options-modal":!0}}]},[e("b-icon-gear-fill"),t._v(" "),e("span",{staticClass:"d-none d-sm-inline-block"},[t._v("Opciones")])],1)],1)],1)},U=[],H={name:"Nav"},Y=H,Z=Object(u["a"])(Y,G,U,!1,null,null,null),K=Z.exports,Q={name:"App",components:{SuggestedMovie:p,DetailModal:C,EditModal:x,OptionsModal:$,AddMovieModal:R,Resume:B,Nav:K},mixins:[n],computed:{...Object(r["b"])(["movieCollection","totalSpent","suggestedToday","stores","exportCode","importCode","showImportTextarea"]),hasAnyFilter(){return this.filters.title.length||this.filters.cost.length}},watch:{movieCollection(){this.filterCollection()},hasAnyFilter(){this.filterCollection()},"filters.watched":function(){this.filterCollection()},qtyPerPage(){this.page=1,this.filterCollection()},"filters.sort.field":function(){this.filterCollection()},"filters.sort.order":function(){this.filterCollection()}},data:function(){return{page:1,qtyPerPage:15,addMovieData:{title:"",cost:0,store:"",imdbLink:""},editMovieData:{id:"",title:"",cost:"",watched:0,store:"",imdbLink:"",addDate:null},showFilters:!1,filters:{title:"",cost:"",watched:null,sort:{field:"addDate",order:-1}},detailMovie:null,filteredResults:{items:{},count:0}}},methods:{changePage(t){this.page=t,this.filterCollection()},showMovie(t){this.detailMovie={ID:t.id,"Título":t.title,Coste:t.cost+" €",Tienda:this.stores[t.store],Estrenada:+t.watched?"Sí":"No","Fecha de inclusión":this.formatDate(t.addDate),"Enlace IMDb":t.imdbLink}},totalMovies(){return this.movieCollection.length},giftMovies(){let t=0;for(let e in this.movieCollection)0===+this.movieCollection[e].cost&&t++;return t},unwatchedMovies(){return Object.values(this.movieCollection).reduce((t,e)=>(+e.watched||t++,t),0)},formatDate(t){return new Date(t).toLocaleString().split(", ").shift()},sortItems(t){const e=this.filters.sort.order;return t.sort((t,o)=>t[this.filters.sort.field]>o[this.filters.sort.field]?e:t[this.filters.sort.field]<o[this.filters.sort.field]?-1*e:0)},filterCollection(){if(!this.movieCollection||!this.movieCollection.length)return!1;let t=this.movieCollection.slice().filter(this.filterItem);this.filters.sort.field&&(t=this.sortItems(t)),t=t.reverse();const e=t.length;t=t.splice(this.qtyPerPage*(this.page-1),this.qtyPerPage),this.filteredResults={items:t,count:e}},filterItem(t){let e=!0;return this.filters.title&&(t.title.toLowerCase().includes(this.filters.title.toLowerCase())||(e=!1)),this.filters.cost&&(this.evalCostFilter(t)||(e=!1)),null!==this.filters.watched&&+this.filters.watched!==+(t.watched||0)&&(e=!1),e},evalCostFilter(t){if(this.filters.cost.includes("&")){const e=this.filters.cost.split("&");return+t.cost>+e[0]&&+t.cost<+e[1]}return this.filters.cost.includes("<")?+t.cost<+this.filters.cost.replace("<",""):this.filters.cost.includes(">")?+t.cost>+this.filters.cost.replace(">",""):+t.cost===+this.filters.cost},newId(){return Math.random().toString().substring(2)+(new Date).getTime()},addMovie(){const t=this;if(!this.addMovieData.title)return!1;this.$store.commit("addMovie",{id:t.newId(),title:t.addMovieData.title,cost:t.addMovieData.cost,store:t.addMovieData.store,imdbLink:t.addMovieData.imdbLink}),document.querySelector("#new-movie-title").focus(),this.showToast("Añadida",`Se ha añadido "${this.addMovieData.title}" a la colección con un coste de ${this.addMovieData.cost}€`,"success"),this.addMovieData.title="",this.addMovieData.cost=0,this.addMovieData.store="",this.addMovieData.imdbLink=""},clearCollection(){confirm("Vas a ELIMINAR POR COMPLETO la colección ¿estás seguro/a?")&&(this.$store.commit("clearCollection"),this.showToast("Colección eliminada","Se ha eliminado la colección al completo","success"))},removeMovie(t){this.$store.dispatch({type:"getMovie",id:t}).then(e=>{const o=e.title;confirm(`¿Eliminar de la colección "${o}"?`)&&(this.$store.commit("removeMovie",t),this.showToast("Eliminado",`Has eliminado "${o}"`,"success"))})},exportCollection(){const t=JSON.stringify({movieCollection:this.movieCollection,totalSpent:this.totalSpent});this.exportCode=btoa(t)},clearExportCode(){this.exportCode=""},importCollection(){const t=atob(this.importCode);try{const e=JSON.parse(t);e.movieCollection=e.movieCollection.map(t=>(t.id||(t.id=this.newId()),"undefined"===typeof t.watched?t.watched=1:t.watched=!!+t.watched,t.addDate?t.addDate=+t.addDate:t.addDate=Date.now(),t)),this.$store.commit("importCollection",e),this.showToast("Importado","Colección importada con éxito","success")}catch(e){console.error(e)}},editMovie(t){this.$store.dispatch({type:"getMovie",id:t}).then(t=>{this.editMovieData.id=t.id,this.editMovieData.title=t.title,this.editMovieData.cost=+t.cost,this.editMovieData.watched=+t.watched,this.editMovieData.store=t.store,this.editMovieData.imdbLink=t.imdbLink,this.editMovieData.addDate=new Date(t.addDate)})},confirmEditMovie(){this.$store.commit("editMovie",{id:this.editMovieData.id,title:this.editMovieData.title,cost:+this.editMovieData.cost,watched:+this.editMovieData.watched,store:this.editMovieData.store,imdbLink:this.editMovieData.imdbLink,addDate:this.editMovieData.addDate}),this.showToast("Editado",`Se ha editado correctamente "${this.editMovieData.title}"`,"success")},resetEditMovie(){this.editMovieData.id="",this.editMovieData.title="",this.editMovieData.cost="",this.editMovieData.store=""},showToast(t,e,o){this.$bvToast.toast(e,{title:t,variant:o,solid:!0,toaster:"b-toaster-top-center"})},showMovieModal(t){this.showMovie(t),this.$bvModal.show("detail-movie-modal")}},mounted(){this.filterCollection()}},W=Q,X=(o("ec52"),Object(u["a"])(W,s,a,!1,null,null,null)),tt=X.exports;const et=window.indexedDB.open("pelisDB",1);let ot=null;et.onerror=function(t){throw new Error(t.target.errorCode)},et.onupgradeneeded=function(t){ot=t.target.result;const e=ot.createObjectStore("collection",{keyPath:"id"});e.createIndex("id","id",{unique:!0});const o=ot.createObjectStore("lists",{keyPath:"id"});o.createIndex("id","id",{unique:!0})},et.onsuccess=function(t){ot=t.target.result,dt().then(t=>{if(baseState.movieCollection=t,!t.length)return!1;baseState.totalSpent=it(baseState);const e=ut("config.suggestedToday");if(e&&at(e.date))nt(e.id).then(e=>{if(e)baseState.suggestedToday={date:e.date,id:e.id};else{const e={date:Date.now(),id:t[st(0,t.length-1)].id};baseState.suggestedToday=e,vt("config.suggestedToday",e)}});else{const e={date:Date.now(),id:t[st(0,t.length-1)].id};baseState.suggestedToday=e,vt("config.suggestedToday",e)}})};const it=t=>t.movieCollection.reduce((t,e)=>(t+=+e.cost,t),0),st=(t,e)=>Math.round(t+Math.random()*(e-t)),at=t=>{const e=new Date(+t).toLocaleString().split(" ").shift(),o=(new Date).toLocaleString().split(" ").shift();return e===o},rt=t=>new Promise((e,o)=>{const i=ot.transaction(["collection"],"readwrite"),s=i.objectStore("collection");Array.isArray(t)?t.forEach(t=>s.add(t)):s.add(t),i.onerror=t=>o(t),i.oncomplete=t=>e(!0)}),nt=t=>new Promise((e,o)=>{const i=ot.transaction(["collection"],"readonly"),s=i.objectStore("collection");s.get(t).onsuccess=t=>e(t.target.result)}),lt=t=>new Promise((e,o)=>{const i=ot.transaction(["collection"],"readwrite"),s=i.objectStore("collection");s.delete(t).onsuccess=t=>e(t)}),ct=(t,e)=>new Promise((o,i)=>{const s=ot.transaction(["collection"],"readwrite"),a=s.objectStore("collection");a.get(t).onsuccess=t=>{const i=t.target.result,s=Object.assign({},i,e);a.put(s).onsuccess=t=>{nt(s.id).then(t=>o(t))}}}),dt=()=>new Promise((t,e)=>{const o=ot.transaction(["collection"],"readonly"),i=o.objectStore("collection");i.getAll().onsuccess=e=>{e.target.result.sort((t,e)=>+t.addDate-+e.addDate),t(e.target.result)}}),mt=()=>new Promise((t,e)=>{const o=ot.transaction(["collection"],"readwrite"),i=o.objectStore("collection");i.clear().onsuccess=e=>{t(e)}}),ut=t=>JSON.parse(window.localStorage.getItem(t)),vt=(t,e)=>window.localStorage.setItem(t,JSON.stringify(e));i["default"].use(r["a"]);const pt={movieCollection:{},totalSpent:0,suggestedToday:{date:null,id:""},stores:{amazon:"Amazon",elcorteingles:"El corte Inglés",fnac:"Fnac",cex:"Cex",carrefour:"Carrefour",selectavision:"Selecta Visión",mediamarkt:"Mediamarkt",game:"Game"}};var bt=new r["a"].Store({state:pt,mutations:{setCollection(t,e){t.movieCollection=e},addMovie:async(t,e)=>{e.addDate||(e.addDate=Date.now()),rt(e).then(()=>{t.movieCollection.push(e),t.totalSpent+=+e.cost})},clearCollection(t){mt().then(()=>{location.reload(),t.movieCollection={},t.totalSpent=0})},removeMovie(t,e){lt(e).then(()=>{const o=t.movieCollection.findIndex(t=>t.id===e);i["default"].delete(t.movieCollection,o),t.totalSpent=it(t)})},importCollection(t,e){mt().then(o=>{rt(e).then(o=>{t.movieCollection=e,t.totalSpent=it(t)})})},editMovie(t,e){ct(e.id,e).then(o=>{const s=t.movieCollection.findIndex(t=>t.id===e.id);i["default"].set(t.movieCollection,s,o),t.totalSpent=it(t)})},forceRecalcTotalSpent(t){t.totalSpent=it(t)}},actions:{getMovie({commit:t,state:e},o){return nt(o.id)}},modules:{},plugins:[]}),ft=o("5f5b"),ht=o("b1e0");i["default"].config.productionTip=!1,i["default"].use(ft["a"]),i["default"].use(ht["a"]),new i["default"]({store:bt,render:function(t){return t(tt)}}).$mount("#app")},ec52:function(t,e,o){"use strict";o("48c0")}});
//# sourceMappingURL=app.62ef7e53.js.map