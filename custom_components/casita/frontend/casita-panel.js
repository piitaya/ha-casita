/* Casita panel for Home Assistant. Lit (BSD-3-Clause, Google LLC) bundled. */
var R9=Object.defineProperty;var F9=Object.getOwnPropertyDescriptor;var Y=(M,V,L,r)=>{for(var t=r>1?void 0:r?F9(V,L):V,i=M.length-1,n;i>=0;i--)(n=M[i])&&(t=(r?n(V,L,t):n(t))||t);return r&&t&&R9(V,L,t),t};var O3=globalThis,b3=O3.ShadowRoot&&(O3.ShadyCSS===void 0||O3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e0=Symbol(),w7=new WeakMap,J5=class{constructor(V,L,r){if(this._$cssResult$=!0,r!==e0)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=V,this.t=L}get styleSheet(){let V=this.o,L=this.t;if(b3&&V===void 0){let r=L!==void 0&&L.length===1;r&&(V=w7.get(L)),V===void 0&&((this.o=V=new CSSStyleSheet).replaceSync(this.cssText),r&&w7.set(L,V))}return V}toString(){return this.cssText}},P7=M=>new J5(typeof M=="string"?M:M+"",void 0,e0),R2=(M,...V)=>{let L=M.length===1?M[0]:V.reduce((r,t,i)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(t)+M[i+1],M[0]);return new J5(L,M,e0)},B7=(M,V)=>{if(b3)M.adoptedStyleSheets=V.map(L=>L instanceof CSSStyleSheet?L:L.styleSheet);else for(let L of V){let r=document.createElement("style"),t=O3.litNonce;t!==void 0&&r.setAttribute("nonce",t),r.textContent=L.cssText,M.appendChild(r)}},M0=b3?M=>M:M=>M instanceof CSSStyleSheet?(V=>{let L="";for(let r of V.cssRules)L+=r.cssText;return P7(L)})(M):M;var{is:_9,defineProperty:E9,getOwnPropertyDescriptor:D9,getOwnPropertyNames:I9,getOwnPropertySymbols:N9,getPrototypeOf:W9}=Object,k3=globalThis,T7=k3.trustedTypes,U9=T7?T7.emptyScript:"",$9=k3.reactiveElementPolyfillSupport,C3=(M,V)=>M,H3={toAttribute(M,V){switch(V){case Boolean:M=M?U9:null;break;case Object:case Array:M=M==null?M:JSON.stringify(M)}return M},fromAttribute(M,V){let L=M;switch(V){case Boolean:L=M!==null;break;case Number:L=M===null?null:Number(M);break;case Object:case Array:try{L=JSON.parse(M)}catch{L=null}}return L}},w3=(M,V)=>!_9(M,V),R7={attribute:!0,type:String,converter:H3,reflect:!1,useDefault:!1,hasChanged:w3};Symbol.metadata??=Symbol("metadata"),k3.litPropertyMetadata??=new WeakMap;var F2=class extends HTMLElement{static addInitializer(V){this._$Ei(),(this.l??=[]).push(V)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(V,L=R7){if(L.state&&(L.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(V)&&((L=Object.create(L)).wrapped=!0),this.elementProperties.set(V,L),!L.noAccessor){let r=Symbol(),t=this.getPropertyDescriptor(V,r,L);t!==void 0&&E9(this.prototype,V,t)}}static getPropertyDescriptor(V,L,r){let{get:t,set:i}=D9(this.prototype,V)??{get(){return this[L]},set(n){this[L]=n}};return{get:t,set(n){let u=t?.call(this);i?.call(this,n),this.requestUpdate(V,u,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(V){return this.elementProperties.get(V)??R7}static _$Ei(){if(this.hasOwnProperty(C3("elementProperties")))return;let V=W9(this);V.finalize(),V.l!==void 0&&(this.l=[...V.l]),this.elementProperties=new Map(V.elementProperties)}static finalize(){if(this.hasOwnProperty(C3("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C3("properties"))){let L=this.properties,r=[...I9(L),...N9(L)];for(let t of r)this.createProperty(t,L[t])}let V=this[Symbol.metadata];if(V!==null){let L=litPropertyMetadata.get(V);if(L!==void 0)for(let[r,t]of L)this.elementProperties.set(r,t)}this._$Eh=new Map;for(let[L,r]of this.elementProperties){let t=this._$Eu(L,r);t!==void 0&&this._$Eh.set(t,L)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(V){let L=[];if(Array.isArray(V)){let r=new Set(V.flat(1/0).reverse());for(let t of r)L.unshift(M0(t))}else V!==void 0&&L.push(M0(V));return L}static _$Eu(V,L){let r=L.attribute;return r===!1?void 0:typeof r=="string"?r:typeof V=="string"?V.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(V=>this.enableUpdating=V),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(V=>V(this))}addController(V){(this._$EO??=new Set).add(V),this.renderRoot!==void 0&&this.isConnected&&V.hostConnected?.()}removeController(V){this._$EO?.delete(V)}_$E_(){let V=new Map,L=this.constructor.elementProperties;for(let r of L.keys())this.hasOwnProperty(r)&&(V.set(r,this[r]),delete this[r]);V.size>0&&(this._$Ep=V)}createRenderRoot(){let V=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return B7(V,this.constructor.elementStyles),V}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(V=>V.hostConnected?.())}enableUpdating(V){}disconnectedCallback(){this._$EO?.forEach(V=>V.hostDisconnected?.())}attributeChangedCallback(V,L,r){this._$AK(V,r)}_$ET(V,L){let r=this.constructor.elementProperties.get(V),t=this.constructor._$Eu(V,r);if(t!==void 0&&r.reflect===!0){let i=(r.converter?.toAttribute!==void 0?r.converter:H3).toAttribute(L,r.type);this._$Em=V,i==null?this.removeAttribute(t):this.setAttribute(t,i),this._$Em=null}}_$AK(V,L){let r=this.constructor,t=r._$Eh.get(V);if(t!==void 0&&this._$Em!==t){let i=r.getPropertyOptions(t),n=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:H3;this._$Em=t;let u=n.fromAttribute(L,i.type);this[t]=u??this._$Ej?.get(t)??u,this._$Em=null}}requestUpdate(V,L,r,t=!1,i){if(V!==void 0){let n=this.constructor;if(t===!1&&(i=this[V]),r??=n.getPropertyOptions(V),!((r.hasChanged??w3)(i,L)||r.useDefault&&r.reflect&&i===this._$Ej?.get(V)&&!this.hasAttribute(n._$Eu(V,r))))return;this.C(V,L,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(V,L,{useDefault:r,reflect:t,wrapped:i},n){r&&!(this._$Ej??=new Map).has(V)&&(this._$Ej.set(V,n??L??this[V]),i!==!0||n!==void 0)||(this._$AL.has(V)||(this.hasUpdated||r||(L=void 0),this._$AL.set(V,L)),t===!0&&this._$Em!==V&&(this._$Eq??=new Set).add(V))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(L){Promise.reject(L)}let V=this.scheduleUpdate();return V!=null&&await V,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[t,i]of this._$Ep)this[t]=i;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[t,i]of r){let{wrapped:n}=i,u=this[t];n!==!0||this._$AL.has(t)||u===void 0||this.C(t,void 0,i,u)}}let V=!1,L=this._$AL;try{V=this.shouldUpdate(L),V?(this.willUpdate(L),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(L)):this._$EM()}catch(r){throw V=!1,this._$EM(),r}V&&this._$AE(L)}willUpdate(V){}_$AE(V){this._$EO?.forEach(L=>L.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(V)),this.updated(V)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(V){return!0}update(V){this._$Eq&&=this._$Eq.forEach(L=>this._$ET(L,this[L])),this._$EM()}updated(V){}firstUpdated(V){}};F2.elementStyles=[],F2.shadowRootOptions={mode:"open"},F2[C3("elementProperties")]=new Map,F2[C3("finalized")]=new Map,$9?.({ReactiveElement:F2}),(k3.reactiveElementVersions??=[]).push("2.1.2");var n0=globalThis,F7=M=>M,P3=n0.trustedTypes,_7=P3?P3.createPolicy("lit-html",{createHTML:M=>M}):void 0,U7="$lit$",J2=`lit$${Math.random().toFixed(9).slice(2)}$`,$7="?"+J2,G9=`<${$7}>`,p5=document,L3=()=>p5.createComment(""),e3=M=>M===null||typeof M!="object"&&typeof M!="function",d0=Array.isArray,Q9=M=>d0(M)||typeof M?.[Symbol.iterator]=="function",r0=`[ 	
\f\r]`,V3=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,E7=/-->/g,D7=/>/g,n5=RegExp(`>|${r0}(?:([^\\s"'>=/]+)(${r0}*=${r0}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),I7=/'/g,N7=/"/g,G7=/^(?:script|style|textarea|title)$/i,p0=M=>(V,...L)=>({_$litType$:M,strings:V,values:L}),w1=p0(1),w6=p0(2),P6=p0(3),l5=Symbol.for("lit-noChange"),f1=Symbol.for("lit-nothing"),W7=new WeakMap,d5=p5.createTreeWalker(p5,129);function Q7(M,V){if(!d0(M)||!M.hasOwnProperty("raw"))throw Error("invalid template strings array");return _7!==void 0?_7.createHTML(V):V}var z9=(M,V)=>{let L=M.length-1,r=[],t,i=V===2?"<svg>":V===3?"<math>":"",n=V3;for(let u=0;u<L;u++){let m=M[u],f,O,c=-1,I=0;for(;I<m.length&&(n.lastIndex=I,O=n.exec(m),O!==null);)I=n.lastIndex,n===V3?O[1]==="!--"?n=E7:O[1]!==void 0?n=D7:O[2]!==void 0?(G7.test(O[2])&&(t=RegExp("</"+O[2],"g")),n=n5):O[3]!==void 0&&(n=n5):n===n5?O[0]===">"?(n=t??V3,c=-1):O[1]===void 0?c=-2:(c=n.lastIndex-O[2].length,f=O[1],n=O[3]===void 0?n5:O[3]==='"'?N7:I7):n===N7||n===I7?n=n5:n===E7||n===D7?n=V3:(n=n5,t=void 0);let E=n===n5&&M[u+1].startsWith("/>")?" ":"";i+=n===V3?m+G9:c>=0?(r.push(f),m.slice(0,c)+U7+m.slice(c)+J2+E):m+J2+(c===-2?u:E)}return[Q7(M,i+(M[L]||"<?>")+(V===2?"</svg>":V===3?"</math>":"")),r]},M3=class M{constructor({strings:V,_$litType$:L},r){let t;this.parts=[];let i=0,n=0,u=V.length-1,m=this.parts,[f,O]=z9(V,L);if(this.el=M.createElement(f,r),d5.currentNode=this.el.content,L===2||L===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(t=d5.nextNode())!==null&&m.length<u;){if(t.nodeType===1){if(t.hasAttributes())for(let c of t.getAttributeNames())if(c.endsWith(U7)){let I=O[n++],E=t.getAttribute(c).split(J2),T=/([.?@])?(.*)/.exec(I);m.push({type:1,index:i,name:T[2],strings:E,ctor:T[1]==="."?i0:T[1]==="?"?o0:T[1]==="@"?a0:w5}),t.removeAttribute(c)}else c.startsWith(J2)&&(m.push({type:6,index:i}),t.removeAttribute(c));if(G7.test(t.tagName)){let c=t.textContent.split(J2),I=c.length-1;if(I>0){t.textContent=P3?P3.emptyScript:"";for(let E=0;E<I;E++)t.append(c[E],L3()),d5.nextNode(),m.push({type:2,index:++i});t.append(c[I],L3())}}}else if(t.nodeType===8)if(t.data===$7)m.push({type:2,index:i});else{let c=-1;for(;(c=t.data.indexOf(J2,c+1))!==-1;)m.push({type:7,index:i}),c+=J2.length-1}i++}}static createElement(V,L){let r=p5.createElement("template");return r.innerHTML=V,r}};function k5(M,V,L=M,r){if(V===l5)return V;let t=r!==void 0?L._$Co?.[r]:L._$Cl,i=e3(V)?void 0:V._$litDirective$;return t?.constructor!==i&&(t?._$AO?.(!1),i===void 0?t=void 0:(t=new i(M),t._$AT(M,L,r)),r!==void 0?(L._$Co??=[])[r]=t:L._$Cl=t),t!==void 0&&(V=k5(M,t._$AS(M,V.values),t,r)),V}var t0=class{constructor(V,L){this._$AV=[],this._$AN=void 0,this._$AD=V,this._$AM=L}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(V){let{el:{content:L},parts:r}=this._$AD,t=(V?.creationScope??p5).importNode(L,!0);d5.currentNode=t;let i=d5.nextNode(),n=0,u=0,m=r[0];for(;m!==void 0;){if(n===m.index){let f;m.type===2?f=new r3(i,i.nextSibling,this,V):m.type===1?f=new m.ctor(i,m.name,m.strings,this,V):m.type===6&&(f=new A0(i,this,V)),this._$AV.push(f),m=r[++u]}n!==m?.index&&(i=d5.nextNode(),n++)}return d5.currentNode=p5,t}p(V){let L=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(V,r,L),L+=r.strings.length-2):r._$AI(V[L])),L++}},r3=class M{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(V,L,r,t){this.type=2,this._$AH=f1,this._$AN=void 0,this._$AA=V,this._$AB=L,this._$AM=r,this.options=t,this._$Cv=t?.isConnected??!0}get parentNode(){let V=this._$AA.parentNode,L=this._$AM;return L!==void 0&&V?.nodeType===11&&(V=L.parentNode),V}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(V,L=this){V=k5(this,V,L),e3(V)?V===f1||V==null||V===""?(this._$AH!==f1&&this._$AR(),this._$AH=f1):V!==this._$AH&&V!==l5&&this._(V):V._$litType$!==void 0?this.$(V):V.nodeType!==void 0?this.T(V):Q9(V)?this.k(V):this._(V)}O(V){return this._$AA.parentNode.insertBefore(V,this._$AB)}T(V){this._$AH!==V&&(this._$AR(),this._$AH=this.O(V))}_(V){this._$AH!==f1&&e3(this._$AH)?this._$AA.nextSibling.data=V:this.T(p5.createTextNode(V)),this._$AH=V}$(V){let{values:L,_$litType$:r}=V,t=typeof r=="number"?this._$AC(V):(r.el===void 0&&(r.el=M3.createElement(Q7(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===t)this._$AH.p(L);else{let i=new t0(t,this),n=i.u(this.options);i.p(L),this.T(n),this._$AH=i}}_$AC(V){let L=W7.get(V.strings);return L===void 0&&W7.set(V.strings,L=new M3(V)),L}k(V){d0(this._$AH)||(this._$AH=[],this._$AR());let L=this._$AH,r,t=0;for(let i of V)t===L.length?L.push(r=new M(this.O(L3()),this.O(L3()),this,this.options)):r=L[t],r._$AI(i),t++;t<L.length&&(this._$AR(r&&r._$AB.nextSibling,t),L.length=t)}_$AR(V=this._$AA.nextSibling,L){for(this._$AP?.(!1,!0,L);V!==this._$AB;){let r=F7(V).nextSibling;F7(V).remove(),V=r}}setConnected(V){this._$AM===void 0&&(this._$Cv=V,this._$AP?.(V))}},w5=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(V,L,r,t,i){this.type=1,this._$AH=f1,this._$AN=void 0,this.element=V,this.name=L,this._$AM=t,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=f1}_$AI(V,L=this,r,t){let i=this.strings,n=!1;if(i===void 0)V=k5(this,V,L,0),n=!e3(V)||V!==this._$AH&&V!==l5,n&&(this._$AH=V);else{let u=V,m,f;for(V=i[0],m=0;m<i.length-1;m++)f=k5(this,u[r+m],L,m),f===l5&&(f=this._$AH[m]),n||=!e3(f)||f!==this._$AH[m],f===f1?V=f1:V!==f1&&(V+=(f??"")+i[m+1]),this._$AH[m]=f}n&&!t&&this.j(V)}j(V){V===f1?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,V??"")}},i0=class extends w5{constructor(){super(...arguments),this.type=3}j(V){this.element[this.name]=V===f1?void 0:V}},o0=class extends w5{constructor(){super(...arguments),this.type=4}j(V){this.element.toggleAttribute(this.name,!!V&&V!==f1)}},a0=class extends w5{constructor(V,L,r,t,i){super(V,L,r,t,i),this.type=5}_$AI(V,L=this){if((V=k5(this,V,L,0)??f1)===l5)return;let r=this._$AH,t=V===f1&&r!==f1||V.capture!==r.capture||V.once!==r.once||V.passive!==r.passive,i=V!==f1&&(r===f1||t);t&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,V),this._$AH=V}handleEvent(V){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,V):this._$AH.handleEvent(V)}},A0=class{constructor(V,L,r){this.element=V,this.type=6,this._$AN=void 0,this._$AM=L,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(V){k5(this,V)}};var K9=n0.litHtmlPolyfillSupport;K9?.(M3,r3),(n0.litHtmlVersions??=[]).push("3.3.3");var z7=(M,V,L)=>{let r=L?.renderBefore??V,t=r._$litPart$;if(t===void 0){let i=L?.renderBefore??null;r._$litPart$=t=new r3(V.insertBefore(L3(),i),i,void 0,L??{})}return t._$AI(M),t};var l0=globalThis,J1=class extends F2{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let V=super.createRenderRoot();return this.renderOptions.renderBefore??=V.firstChild,V}update(V){let L=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(V),this._$Do=z7(L,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return l5}};J1._$litElement$=!0,J1.finalized=!0,l0.litElementHydrateSupport?.({LitElement:J1});var q9=l0.litElementPolyfillSupport;q9?.({LitElement:J1});(l0.litElementVersions??=[]).push("4.2.2");var j9={attribute:!0,type:String,converter:H3,reflect:!1,hasChanged:w3},Y9=(M=j9,V,L)=>{let{kind:r,metadata:t}=L,i=globalThis.litPropertyMetadata.get(t);if(i===void 0&&globalThis.litPropertyMetadata.set(t,i=new Map),r==="setter"&&((M=Object.create(M)).wrapped=!0),i.set(L.name,M),r==="accessor"){let{name:n}=L;return{set(u){let m=V.get.call(this);V.set.call(this,u),this.requestUpdate(n,m,M,!0,u)},init(u){return u!==void 0&&this.C(n,void 0,M,u),u}}}if(r==="setter"){let{name:n}=L;return function(u){let m=this[n];V.call(this,u),this.requestUpdate(n,m,M,!0,u)}}throw Error("Unsupported decorator location: "+r)};function m1(M){return(V,L)=>typeof L=="object"?Y9(M,V,L):((r,t,i)=>{let n=t.hasOwnProperty(i);return t.constructor.createProperty(i,r),n?Object.getOwnPropertyDescriptor(t,i):void 0})(M,V,L)}function n2(M){return m1({...M,state:!0,attribute:!1})}var m5=(M,V,L)=>(L.configurable=!0,L.enumerable=!0,Reflect.decorate&&typeof V!="object"&&Object.defineProperty(M,V,L),L);function d2(M,V){return(L,r,t)=>{let i=n=>n.renderRoot?.querySelector(M)??null;if(V){let{get:n,set:u}=typeof r=="object"?L:t??(()=>{let m=Symbol();return{get(){return this[m]},set(f){this[m]=f}}})();return m5(L,r,{get(){let m=n.call(this);return m===void 0&&(m=i(this),(m!==null||this.hasUpdated)&&u.call(this,m)),m}})}return m5(L,r,{get(){return i(this)}})}}var C5=(M,V)=>{customElements.get(M)||customElements.define(M,V)};var X9="http://www.w3.org/2000/svg",V4="M120,109.38c0,4.12-3.38,7.5-7.5,7.5H7.5c-4.12,0-7.5-3.38-7.5-7.5v-45c0-4.12,2.39-9.89,5.3-12.8L54.7,2.19c2.92-2.92,7.69-2.92,10.61,0l49.39,49.39c2.92,2.92,5.3,8.68,5.3,12.8v45Z",T5="#f2f4f9",g0={blue:"#18bcf2",red:"#ed1c24",orange:"#f7931e",gray:"#999999"},_2=60,P5=116.88,J9=8,Q1=120,K7=90,B3=40,b2=Math.PI*2,C6="M108.97,24.83h-5.52c0-4.56-3.71-8.28-8.28-8.28v-5.52c7.61,0,13.79,6.19,13.79,13.79Z",H6="M120,24.83h-5.52c0-10.65-8.66-19.31-19.31-19.31V0c13.69,0,24.83,11.14,24.83,24.83Z",V6="M111.91,12.57c0,2.03-.66,3.7-1.99,5.03-.69.69-1.37,1.31-2.05,1.87-.85.69-1.46,1.25-1.81,1.68s-.56.9-.62,1.4v.69h-4.52v-.91c.02-.48.09-.93.22-1.35s.27-.78.44-1.09.42-.64.74-1,.63-.66.92-.92.68-.6,1.19-1.02c.73-.6,1.29-1.09,1.67-1.47s.68-.8.91-1.23.34-.9.34-1.4c0-.86-.3-1.59-.89-2.18s-1.37-.89-2.34-.89c-1.04,0-1.9.33-2.58,1s-1.03,1.48-1.03,2.45h-4.58c0-2.25.78-4.14,2.34-5.67s3.5-2.29,5.82-2.29c1.44,0,2.75.29,3.93.88s2.13,1.44,2.84,2.56c.71,1.12,1.06,2.41,1.06,3.86ZM106.06,26.89c0,.71-.25,1.3-.76,1.78s-1.16.72-1.95.72-1.4-.24-1.91-.73-.77-1.07-.77-1.77.26-1.3.77-1.79,1.15-.74,1.91-.74,1.4.25,1.93.74.79,1.09.79,1.79Z",L6="M93.5,21.29l9.04-9.55h-9.04v-4.91h16v4.95l-9.27,9.51h9.27v4.95h-16v-4.95Z",q7=[[91.66,28.34,3.66],[100.8,19.2,5.49],[112.69,7.31,7.31]],m0=[92,90.885,6],j7=[[104,91.885,6],[16,100.885,6]],Z0={heart:"M0,-9.77c-3.12,-3.12 -8.19,-3.12 -11.31,0c-3.12,3.12 -3.12,8.19 0,11.31L0,12.86L11.31,1.54c3.12,-3.12 3.12,-8.19 0,-11.31c-3.12,-3.12 -8.19,-3.12 -11.31,0Z",z:"M-8,4.76l9.04,-9.55h-9.04v-4.91h16v4.95l-9.27,9.51h9.27v4.95h-16v-4.95Z",sparkle:"M0,-7C1,-1.4 1.4,-1 7,0C1.4,1 1,1.4 0,7C-1,1.4 -1.4,1 -7,0C-1.4,-1 -1,-1.4 0,-7Z",star:(()=>{let M="";for(let V=0;V<10;V++){let L=-Math.PI/2+V*Math.PI/5,r=V%2?2.6:6.4;M+=(V?"L":"M")+(r*Math.cos(L)).toFixed(2)+","+(r*Math.sin(L)).toFixed(2)}return M+"Z"})(),steam:"M-4,0a4,4 0 1,0 8,0a4,4 0 1,0 -8,0Z",tear:"M0,-8.49L4.24,-4.24A6,6 0 1,1 -4.24,-4.24Z",note:"M0,-9C2,-7 6,-6.5 5,-2C4.5,-4.5 2.5,-5 1.6,-5L1.6,5.2C1.6,7.6 -1.2,9 -3.6,8.6C-6.2,8.2 -6.6,5.6 -4.4,4.2C-2.8,3.2 -1,3.2 0,3.8Z",dot:"M-2.5,0a2.5,2.5 0 1,0 5,0a2.5,2.5 0 1,0 -5,0Z",puff:"M-7.5,3.2a3.6,3.6 0 0,1 0.6,-6.4a4.6,4.6 0 0,1 8.4,-2.6a4,4 0 0,1 6.6,3.4a3.2,3.2 0 0,1 -0.8,5.6Z"},D2=(M,V,L)=>M<V?V:M>L?L:M,R1=M=>D2(M,0,1),x2=(M,V,L)=>M+(V-M)*L,E1=(M,V)=>M+Math.random()*(V-M),H5=M=>(M=R1(M),M*M*(3-2*M)),G=M=>Math.abs(M)<.005?"0":(Math.round(M*100)/100).toString(),T3=M=>M-Math.floor(M);function e6(M){M=String(M).replace("#",""),M.length===3&&(M=M.split("").map(L=>L+L).join(""));let V=parseInt(M,16);return[V>>16&255,V>>8&255,V&255]}var s0=M=>(M/=255,M<=.04045?M/12.92:Math.pow((M+.055)/1.055,2.4)),v0=M=>(M=D2(M,0,1),M=M<=.0031308?12.92*M:1.055*Math.pow(M,1/2.4)-.055,D2(Math.round(M*255),0,255));function M6(M){let V=s0(M[0]),L=s0(M[1]),r=s0(M[2]),t=Math.cbrt(.4122214708*V+.5363325363*L+.0514459929*r),i=Math.cbrt(.2119034982*V+.6806995451*L+.1073969566*r),n=Math.cbrt(.0883024619*V+.2817188376*L+.6299787005*r);return[.2104542553*t+.793617785*i-.0040720468*n,1.9779984951*t-2.428592205*i+.4505937099*n,.0259040371*t+.7827717662*i-.808675766*n]}function S0(M,V,L){let r=M+.3963377774*V+.2158037573*L,t=M-.1055613458*V-.0638541728*L,i=M-.0894841775*V-1.291485548*L,n=r*r*r,u=t*t*t,m=i*i*i;return[v0(4.0767416621*n-3.3077115913*u+.2309699292*m),v0(-1.2684380046*n+2.6097574011*u-.3413193965*m),v0(-.0041960863*n-.7034186147*u+1.707614701*m)]}var _3=M=>M6(e6(M)),x0=_3(T5);function Y7(M){return M&&typeof M=="object"&&!Array.isArray(M)}function E2(...M){let V={};for(let L of M)if(Y7(L))for(let r of Object.keys(L))V[r]=Y7(L[r])?E2(V[r],L[r]):L[r];return V}var o3=new Float64Array(Q1),a3=new Float64Array(Q1);for(let M=0;M<Q1;M++)o3[M]=Math.cos(b2*M/Q1),a3[M]=Math.sin(b2*M/Q1);function X7(M,V,L,r,t,i,n){let u=M-t,m=V-i,f=u*L+m*r,O=u*u+m*m-n*n,c=f*f-O;return c<0?0:-f+Math.sqrt(c)}var R3=[-4,-1.88],h0=new Float64Array(Q1),L4=new Float64Array(Q1),e4=new Float64Array(Q1);(function(){let[M,V]=R3,L=8*Math.SQRT2,r=-4,t=1.665;for(let u=0;u<Q1;u++){let m=o3[u],f=a3[u],O=Math.max(X7(M,V,m,f,-9.655,-3.995,8),X7(M,V,m,f,1.655,-3.995,8)),c=1/0;for(let I of[-1,1])for(let E of[-1,1]){let T=I*m+E*f;T>1e-9&&(c=Math.min(c,(L+I*r+E*t-(I*M+E*V))/T))}c!==1/0&&(O=Math.max(O,c)),h0[u]=O}for(let u=0;u<Q1;u++)L4[u]=h0[((Q1/2-u)%Q1+Q1)%Q1];let i=12*Math.SQRT2,n=3;for(let u=0;u<Q1;u++){let m=0;for(let f of[Math.PI/4,-Math.PI/4]){let O=o3[u]*Math.cos(f)+a3[u]*Math.sin(f),c=-o3[u]*Math.sin(f)+a3[u]*Math.cos(f);m=Math.max(m,Math.min(Math.abs(O)>1e-9?i/Math.abs(O):1/0,Math.abs(c)>1e-9?n/Math.abs(c):1/0))}e4[u]=m}})();function J7(M,V,L,r,t){let i=[],n=M.length;if(n<6)return i;let u=M[n-2],m=M[n-1],f=(u-V)*r+(m-L)*t;for(let O=0;O<n;O+=2){let c=M[O],I=M[O+1],E=(c-V)*r+(I-L)*t;if(E>=0){if(f<0){let T=f/(f-E);i.push(u+(c-u)*T,m+(I-m)*T)}i.push(c,I)}else if(f>=0){let T=f/(f-E);i.push(u+(c-u)*T,m+(I-m)*T)}u=c,m=I,f=E}return i}function u0(M){if(!M||M.length<6)return"";let V="M"+G(M[0])+","+G(M[1]);for(let L=2;L<M.length;L+=2)V+="L"+G(M[L])+","+G(M[L+1]);return V+"Z"}function r6(M,V){let L=M.s;if(!(L>.01))return null;let r=J9*L,t=R1(M.heart),i=R1(M.cross),n=V<0?h0:L4,u=M.x+(V<0?R3[0]:-R3[0])*L,m=M.y+R3[1]*L,f=M.x,O=M.y+.5*L,c=new Array(Q1*2);for(let A=0;A<Q1;A++){let M1=o3[A],C2=a3[A],F1=M.x+r*M1,u2=M.y+r*C2;if(t>0){let t1=n[A]*L;F1=x2(F1,u+t1*M1,t),u2=x2(u2,m+t1*C2,t)}if(i>0){let t1=e4[A]*L;F1=x2(F1,f+t1*M1,i),u2=x2(u2,O+t1*C2,i)}c[2*A]=F1,c[2*A+1]=u2}let I=1-Math.max(t,i),E=R1(M.top)*I,T=R1(M.bot)*I;if(E+T>1){let A=1/(E+T);E*=A,T*=A}if(E>.001||Math.abs(M.ang*I)>.05){let A=(V<0?M.ang:-M.ang)*I*Math.PI/180;c=J7(c,M.x,M.y-r+2*r*E,-Math.sin(A),Math.cos(A))}T>.001&&(c=J7(c,M.x,M.y+r-2*r*T,0,-1));let s1=Math.max(.1,M.open);if(Math.abs(s1-1)>1e-4)for(let A=1;A<c.length;A+=2)c[A]=M.y+(c[A]-M.y)*s1;return c}function c0(M,V,L,r){if(L<=1e-6||r<=1e-6)return 0;let t=Math.abs(M-V);if(t>L)return 0;let i=Math.min(r,L),n=L-i;if(t<=n)return r;let u=t-n;return r-i+Math.sqrt(Math.max(0,i*i-u*u))}function R5(M,V,L,r,t,i,n,u,m){r=Math.max(0,r),t=Math.max(0,t),n=Math.max(0,n);let f=Math.abs(i),O=i<0?-1:1;for(let c=0;c<u;c++){let I=m?u-1-c:c,E=V-r*Math.cos(Math.PI*I/(u-1)),T=n>1e-4?Math.max(c0(E,V-n,t,f),c0(E,V+n,t,f)):c0(E,V,t,f);M.push(E,L+O*T)}}function t6(M){return[M.x,(M.tY+M.bY)/2+(Math.max(M.tH,M.bH,0)+Math.min(M.tH,M.bH,0))/2]}function M4(M,V){let[L,r]=t6(V),t=V.s,i=V.rot*Math.PI/180,n=Math.cos(i),u=Math.sin(i);if(Math.abs(t-1)<1e-4&&Math.abs(i)<1e-5)return M;for(let m=0;m<M.length;m+=2){let f=(M[m]-L)*t,O=(M[m+1]-r)*t;M[m]=L+f*n-O*u,M[m+1]=r+f*u+O*n}return M}function i6(M){if(!(M.s>.01))return null;let V=D2(M.talk,0,1.6),L=M.tH-5*V,r=M.bH+9*V,t=V>0?Math.max(M.bR,M.tR*V+M.bR*(1-V)):M.bR,i=[];return R5(i,M.x,M.tY,M.tR,M.tA,L,M.tD,K7,!1),R5(i,M.x,M.bY,t,Math.max(M.bA,V>0?x2(M.bA,M.tA,R1(V)):0),r,M.bD,K7,!0),M4(i,M)}function o6(M){let V=M.tongue;if(!(V>.01)||!(M.s>.01))return null;let L=12*V,r=Math.abs(M.tgH)*V,t=M.tgH<0,i=M.tgY+(t?0:6*D2(M.talk,0,1.6)),n=[];return t?(R5(n,M.tgX,i,L,L,-r,0,B3,!1),R5(n,M.tgX,i+1.2,L,L,0,0,B3,!0)):(R5(n,M.tgX,i-1.2,L,L,0,0,B3,!1),R5(n,M.tgX,i,L,L,r,0,B3,!0)),M4(n,M)}function C4(M,V,L){if(!(L>.05))return"";let r=L*Math.SQRT1_2;return"M"+G(M)+","+G(V-L*Math.SQRT2)+"L"+G(M+r)+","+G(V-r)+"A"+G(L)+","+G(L)+" 0 1 1 "+G(M-r)+","+G(V-r)+"Z"}var a6=["x","y","s","top","bot","ang","heart","cross","shine","open"],r4=["x","s","rot","tY","tR","tA","tH","tD","bY","bR","bA","bH","bD","tongue","tgX","tgY","tgH","talk"],t4=["bubbles","wifi","question","z","tear","sweat"],k2=[];["x","y","rot","sx","sy","skew"].forEach(M=>k2.push(["body."+M,"body"]));["L","A","B"].forEach(M=>k2.push(["body."+M,"color"]));["x","y"].forEach(M=>k2.push(["face."+M,"face"]));for(let M of["eyeL","eyeR"])a6.forEach(V=>k2.push([M+"."+V,V==="x"||V==="y"?"eyePos":V==="top"||V==="bot"||V==="ang"?"lids":"eyes"]));k2.push(["dot.s","eyes"]);k2.push(["dot.dy","eyePos"]);r4.forEach(M=>k2.push(["mouth."+M,M==="talk"?"talk":"mouth"]));t4.forEach(M=>k2.push(["acc."+M,"acc"]));var F5=k2.map(M=>M[0]),H4=k2.map(M=>M[1]),B={};F5.forEach((M,V)=>{B[M]=V});var O2=F5.length,f0={snappy:[420,30],soft:[150,21],bouncy:[300,13],heavy:[70,12],crisp:[700,52]},A6={body:[200,17],color:[90,19],face:[190,24],eyes:[480,34],lids:[520,44],eyePos:[650,46],mouth:[360,29],talk:[1300,66],acc:[230,15]},n6=["body","eyes","mouth","acc"],d6={body:0,color:0,face:0,eyes:60,lids:60,eyePos:60,mouth:110,talk:110,acc:170},A1={smile:(M=80.88)=>({tY:M,tR:13,tA:13,tH:13,tD:0,bY:M,bR:19,bA:19,bH:19,bD:0}),frown:(M=96.88)=>({tY:M,tR:19,tA:19,tH:-19,tD:0,bY:M,bR:13,bA:13,bH:-13,bD:0}),openD:(M=80.88)=>({tY:M,tR:20,tA:20,tH:0,tD:0,bY:M,bR:20,bA:20,bH:20,bD:0}),openFrown:(M=94.88)=>({tY:M,tR:20,tA:20,tH:-20,tD:0,bY:M,bR:20,bA:20,bH:0,bD:0}),O:(M,V)=>({tY:V,tR:M,tA:M,tH:-M,tD:0,bY:V,bR:M,bA:M,bH:M,bD:0}),line:M=>({tY:M-3,tR:20,tA:20,tH:0,tD:0,bY:M+3,bR:20,bA:20,bH:0,bD:0}),grin:()=>({tY:89.88,tR:35,tA:35,tH:-8,tD:0,bY:89.88,bR:35,bA:35,bH:8,bD:0}),uwu:()=>({tY:80.88,tR:19,tA:5,tH:5,tD:8,bY:80.88,bR:19,bA:11,bH:11,bD:8}),none:()=>Object.assign(A1.smile(),{s:0})},t3=(M,V=12)=>({tongue:1,tgX:68,tgY:M,tgH:V}),F3={breath:{rate:.23,amp:.012},blink:{on:!0,min:2200,max:5600,double:.18,close:95,hold:45,open:150},saccade:{on:!0,min:650,max:2600,range:2.4,micro:.18},sway:{amp:.55,rate:.28},gaze:{eye:4.2,face:1.6,rot:4,skew:-1.2,bx:2}},i3={blink:{on:!1},saccade:{on:!1}},I2={Normal:{label:"Content",mouth:A1.smile()},Alert:{label:"Alerte",mouth:A1.O(15,87.88),spring:"snappy",life:{blink:{min:3200,max:7e3},saccade:{min:350,max:1200,range:3.2},breath:{rate:.45,amp:.016}}},Angry:{label:"En colère",color:"red",eyes:{top:.5},mouth:A1.openFrown(94.88),spring:"snappy",life:{breath:{rate:.5,amp:.02},saccade:{range:1,min:1500,max:4e3},blink:{min:4e3,max:8e3},sway:{amp:.25}}},Scared:{label:"Effrayé",color:"red",mouth:A1.openFrown(94.88),spring:"snappy",life:{breath:{rate:.7,amp:.018},saccade:{min:250,max:900,range:3.4},sway:{amp:.9,rate:1.4}}},Cheeky:{label:"Taquin",mouth:Object.assign(A1.line(83.88),t3(86.88)),spring:"bouncy"},DeadAss:{label:"Blasé",eyeR:{top:.5},mouth:Object.assign(A1.line(83.88),t3(86.88)),life:{saccade:{range:1.2,min:2e3,max:5e3},breath:{rate:.16}}},Dead:{label:"K.O.",color:"red",eyes:{cross:1},mouth:Object.assign(A1.line(87.88),t3(90.88)),life:E2(i3,{breath:{rate:.12,amp:.006},sway:{amp:.2}})},Devious:{label:"Malicieux",eyes:{top:.5},mouth:A1.smile(),life:{saccade:{range:1.8,min:900,max:2400}}},Focusing:{label:"Concentré",mouth:Object.assign(A1.line(91.88),t3(88.88,-12)),acc:{bubbles:1},life:{saccade:{range:1.2,min:1400,max:3600},blink:{min:3500,max:7e3}}},Grateful:{label:"Reconnaissant",eyes:{bot:.5,y:69.88},mouth:A1.openD(76.88),spring:"soft"},Grinning:{label:"Rayonnant",mouth:A1.grin(),spring:"bouncy",life:{breath:{rate:.3,amp:.016}}},Happy:{label:"Heureux",mouth:A1.openD(80.88),spring:"bouncy",life:{breath:{rate:.3,amp:.016}}},Hurt:{label:"Blessé",color:"red",eyes:{cross:1},mouth:A1.openFrown(98.88),spring:"snappy",life:E2(i3,{breath:{rate:.6,amp:.014},sway:{amp:.6,rate:1.1}})},Initializing:{label:"Démarrage",eyes:{s:0},mouth:A1.none(),life:i3},Loading:{label:"Chargement",dot:1,mouth:A1.none(),life:i3},Loving:{label:"Amoureux",eyes:{heart:1},mouth:A1.openD(80.88),spring:"bouncy",life:{blink:{min:2600,max:5e3,double:.35},saccade:{range:1.4},breath:{rate:.2,amp:.016}}},NoInternet:{label:"Hors ligne",color:"orange",mouth:A1.frown(),acc:{wifi:1}},Pleading:{label:"Suppliant",color:"orange",eyes:{s:1.5},mouth:A1.frown(),acc:{tear:1},spring:"soft",life:{blink:{min:1800,max:3600,double:.5,close:130,open:220},saccade:{range:1}}},Problem:{label:"Problème",color:"orange",mouth:A1.frown(),acc:{question:1}},Sad:{label:"Triste",color:"orange",mouth:A1.frown(),spring:"heavy",life:{breath:{rate:.17,amp:.01},saccade:{range:1.6,min:1500,max:4e3},blink:{close:140,open:240}}},Silly:{label:"Farceur",eyeR:{y:59.88},mouth:Object.assign(A1.line(83.88),t3(86.88)),spring:"bouncy"},Sleeping:{label:"Endormi",color:"gray",eyes:{top:.5},mouth:A1.O(10,86.88),acc:{z:1},spring:"heavy",life:E2(i3,{breath:{rate:.13,amp:.03},sway:{amp:.3,rate:.15}})},Smiling:{label:"Souriant",eyes:{bot:.5,y:69.88},mouth:A1.smile(),spring:"soft"},Sweating:{label:"En sueur",mouth:A1.openD(80.88),acc:{sweat:1},life:{breath:{rate:.55,amp:.016},saccade:{min:400,max:1400,range:3}}},UwU:{label:"UwU",mouth:A1.uwu(),spring:"bouncy"},WTF:{label:"WTF",color:"orange",eyes:{top:.5},mouth:A1.line(87.88),life:{saccade:{range:.8,min:2500,max:6e3}}},Winking:{label:"Clin d'œil",eyeR:{top:.5},mouth:A1.openD(80.88),spring:"bouncy"},WinkingSmile:{label:"Clin d'œil souriant",eyeR:{top:.5},mouth:A1.smile(),spring:"bouncy"}};function i4(){let M={};Object.assign(M,{"body.x":0,"body.y":0,"body.rot":0,"body.sx":1,"body.sy":1,"body.skew":0,"face.x":0,"face.y":0,"dot.s":0,"dot.dy":0});for(let[V,L]of[["eyeL",33],["eyeR",87]])Object.assign(M,{[V+".x"]:L,[V+".y"]:65.88,[V+".s"]:1,[V+".top"]:0,[V+".bot"]:0,[V+".ang"]:0,[V+".heart"]:0,[V+".cross"]:0,[V+".shine"]:0,[V+".open"]:1});Object.assign(M,{"mouth.x":60,"mouth.s":1,"mouth.rot":0,"mouth.tongue":0,"mouth.talk":0});for(let V of t4)M["acc."+V]=0;return M}var B5={};for(let M of Object.keys(I2)){let V=I2[M],L=i4(),[r,t,i]=_3(g0[V.color||"blue"]);L["body.L"]=r,L["body.A"]=t,L["body.B"]=i;for(let n of["eyeL","eyeR"]){let u=Object.assign({},V.eyes||{},V[n]||{});for(let m of Object.keys(u))L[n+"."+m]=u[m]}V.dot&&(L["dot.s"]=V.dot);for(let n of Object.keys(V.mouth||{}))L["mouth."+n]=V.mouth[n];for(let n of Object.keys(V.acc||{}))L["acc."+n]=V.acc[n];B5[M]=L}var p6=Object.keys(I2).map(M=>({id:M,label:I2[M].label,color:g0[I2[M].color||"blue"]}));function l6(M,V){let L=Object.assign({expression:"Normal",life:!0,autoplay:!0,viewBox:"-50 -60 220 230",reducedMotion:null,floor:null,palette:null},V||{}),r=Object.assign({spark:"#ffd23f",star:"#ffd23f",steam:"#c9d3df",puff:"#ffffff",puffEdge:"#b9c6d2",shine:"#ffffff"},L.palette||{}),t=(L.reducedMotion!=null?L.reducedMotion:globalThis.matchMedia&&globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches)?.4:1;for(;M.firstChild;)M.removeChild(M.firstChild);M.setAttribute("viewBox",L.viewBox),M.getAttribute("role")||M.setAttribute("role","img");let i=(d,v,p)=>{let S=document.createElementNS(X9,d);for(let y in v)S.setAttribute(y,v[y]);return p&&p.appendChild(S),S},n=i("g",{class:"casita"},M),u=i("g",{class:"casita-body"},n),m=i("path",{d:V4,class:"casita-house"},u),f=i("g",{class:"casita-face",fill:T5},u),O=[i("path",{},f),i("path",{},f)],c=[0,1,2,3].map(()=>i("circle",{r:0},f)),I=i("circle",{cx:60,cy:65.88,r:0},f),E=i("path",{},f),T=i("path",{},f),s1=i("path",{},f),A=i("g",{class:"casita-acc"},u),M1=j7.map(()=>i("path",{fill:T5},A)),C2=q7.map(([d,v])=>i("circle",{cx:d,cy:v,r:0},A)),F1=i("g",{},A),u2=i("circle",{cx:95.17,cy:24.83,r:2.76},F1),t1=i("path",{d:C6},F1),U3=i("path",{d:H6},F1),$2=i("path",{d:V6},A),$3=[0,1,2].map(()=>i("path",{d:L6},A)),a=i("g",{class:"casita-particles"},n),q=new Float64Array(O2),H2=new Float64Array(O2),y1=new Float64Array(O2),Q=new Float64Array(O2),H1=new Float64Array(O2),p3=new Float64Array(O2),D5=new Float64Array(O2),W1={},p2=null,J=0,i2=!1,U1=!!L.life,s5=!1,V2=[],L2={},c1=E2(F3),r1=new Map,o2=[],c2={},g=null,j1=null,i1={ax:0,ay:0,since:0,hold:1700,fade:1e3,peak:1,lastReset:-1e9,k:1,init:!1},n1=Array.from({length:8},()=>E1(0,b2)),I5=E1(0,b2),l3=0,v5=E1(800,2500),N5=400,e1=0,e2={x:0,y:0},Y1={x:0,y:0},O1=[null,null],G2=[],L5=new Set,Z2=Object.assign(i4(),{"mouth.tgX":68,"mouth.tgY":86.88,"mouth.tgH":12});Object.assign(Z2,B5[L.expression]||B5.Normal),F5.forEach((d,v)=>{Q[v]=Z2[d]!=null?Z2[d]:0,q[v]=Q[v]}),W5(null);function W5(d){for(let v=0;v<O2;v++){let p=H4[v],S=A6[p];d&&f0[d]&&n6.includes(p)&&(S=f0[d]);let y=W1[F5[v]]||W1[p];y&&(S=[y.k!=null?y.k:S[0],y.c!=null?y.c:S[1]]),p3[v]=S[0],D5[v]=S[1]}}let C1=null;function e5(d,...v){(c2[d]||[]).slice().forEach(p=>{try{p(...v)}catch(S){console.error(S)}})}function m3(d){let v=B[d];return v==null&&!L5.has(d)&&(L5.add(d),console.warn("[Casita] unknown param",d)),v}function Q2(d,v){v=v||{};let p=B5[d];if(!p)return console.warn("[Casita] unknown expression",d),p1;let S=p2;p2=d,c1=E2(F3,I2[d].life,L2,v.life),C1=v.spring||I2[d].spring||null,W5(C1);let y=v.stagger!==!1&&!v.instant&&S!=null,W=v.staggerScale!=null?v.staggerScale:1;V2=[];let j={};for(let K of Object.keys(p)){let a1=B[K];if(a1==null)continue;if(v.instant){Q[a1]=p[K],q[a1]=p[K],H2[a1]=0;continue}let b=y?d6[H4[a1]]*W:0;if(b<=0){Q[a1]=p[K];continue}(j[b]=j[b]||[]).push([a1,p[K]])}for(let K of Object.keys(j))V2.push({at:J+Number(K),items:j[K]});return S!==d&&e5("expression",d,S),i2&&K2(f2()),p1}function a2(){o2=[...r1.values()].sort((d,v)=>d.priority-v.priority)}function z2(d,v){v=v||{};let p=r1.get(d);if(!p)p={name:d,priority:v.priority||0,post:!!v.post,w:1,fade:null,setV:new Map,addV:new Map,expires:0},p.api={set(S,y){for(let W in S){let j=m3(W);j!=null&&p.setV.set(j,S[W])}return y!=null&&(p.w=y),p.api},add(S,y){for(let W in S){let j=m3(W);j!=null&&p.addV.set(j,S[W])}return y!=null&&(p.w=y),p.api},unset(...S){for(let y of S){let W=B[y];p.setV.delete(W),p.addV.delete(W)}return p.api},clear(){return p.setV.clear(),p.addV.clear(),p.expires=0,p.api},weight(S,y){return y?p.fade={from:p.w,to:S,t0:J,dur:y}:(p.w=S,p.fade=null),p.api},ttl(S){return p.expires=J+S,p.api},remove(){r1.delete(d),a2()},get weightValue(){return p.w}},r1.set(d,p),a2();else{let S=!1;v.priority!=null&&v.priority!==p.priority&&(p.priority=v.priority,S=!0),v.post!=null&&(p.post=!!v.post),S&&a2()}return p.api}function S2(d,v){for(let p of o2){if(p.post!==v||p.w<=0)continue;let S=p.w;p.setV.forEach((y,W)=>{d[W]=S>=1?y:x2(d[W],y,S)}),p.addV.forEach((y,W)=>{d[W]+=y*S})}}let x5=(d,v)=>.55*Math.sin(d+n1[v])+.3*Math.sin(d*2.13+n1[v+1])+.15*Math.sin(d*4.37+n1[v+2]);function w2(d,v){v=v||{};let p=c1.blink,S={t0:J,close:v.close||p.close,hold:v.hold!=null?v.hold:p.hold,open:v.open||p.open};return d!=="R"&&(O1[0]=Object.assign({},S)),d!=="L"&&(O1[1]=Object.assign({},S)),S.close+S.hold+S.open}function U5(d){if(!d)return 1;let v=J-d.t0;if(v<0)return 1;if(v<d.close){let W=v/d.close;return 1-W*W}if(v<d.close+d.hold)return 0;let p=(v-d.close-d.hold)/d.open;if(p>=1)return 1;let S=1.3;return 1+(S+1)*Math.pow(p-1,3)+S*Math.pow(p-1,2)}function A2(){let d=0,v=0;if(g){let p=_2+q[B["body.x"]],S=70+q[B["body.y"]],y=g[0]-p,W=g[1]-S,j=Math.hypot(y,W);if(j>.001){let K=j/(j+38);d=y/j*K*c1.gaze.eye,v=W/j*K*c1.gaze.eye*.75}}else U1&&c1.saccade.on&&(d=e2.x,v=e2.y);return U1&&(c1.saccade.on||g)&&(d+=Y1.x,v+=Y1.y),[d*(g?1:t),v*(g?1:t)]}let M5=[],R=[];function $5(d,v){let p=Z0[d]||Z0.dot,S=R.pop();S||(S=i("path",{},a)),S.setAttribute("d",p),S.style.display="";let y=Object.assign({kind:d,el:S,age:0,life:1.6,x:60,y:20,vx:0,vy:-16,ax:0,gravity:0,drag:0,rot:0,vrot:0,s0:.4,s1:.6,color:null,sway:0,swayF:3,swayPh:E1(0,b2),fadeIn:.12,fadeOut:.35,orbit:null,opacity:1},v),W=y.color&&r[y.color]?r[y.color]:y.color;S.setAttribute("fill",W||l2);let j=y.stroke&&r[y.stroke]?r[y.stroke]:y.stroke;return j?(S.setAttribute("stroke",j),S.setAttribute("stroke-width",y.strokeWidth||1),S.setAttribute("vector-effect","non-scaling-stroke")):(S.removeAttribute("stroke"),S.removeAttribute("vector-effect")),M5.push(y),y}let z={heart:{x:60,y:30,vy:-22,life:1.9,s0:.22,s1:.42,sway:4,spread:18},z:{x:100,y:18,vx:7,vy:-14,life:2.6,s0:.25,s1:.55,sway:2.5,spread:4},sparkle:{x:60,y:50,vy:-6,life:.9,s0:.2,s1:.65,vrot:120,spread:50,color:"spark"},star:{x:60,y:30,life:2.2,s0:.75,s1:.75,vrot:160,color:"star"},steam:{x:60,y:4,vy:-18,life:1.2,s0:.5,s1:1.4,sway:3,spread:70,color:"steam",fadeOut:.6},puff:{x:60,y:4,vy:-16,life:1.1,s0:.55,s1:1.25,sway:2.5,spread:70,color:"puff",stroke:"puffEdge",strokeWidth:1.2,fadeOut:.55},tear:{x:33,y:72,vy:4,gravity:90,life:1.1,s0:.45,s1:.4,color:T5,fadeOut:.3},note:{x:78,y:70,vx:10,vy:-16,life:1.8,s0:.45,s1:.6,sway:3,spread:10},dot:{x:60,y:40,vy:-10,life:1,s0:.6,s1:.2}};function u5(d,v){v=v||{};let p=Object.assign({},z[d]||{},v),S=Math.max(1,Math.round((v.count||1)*(t<1?.5:1))),y=p.spread||0,W=[];for(let j=0;j<S;j++){let K=Object.assign({},p),a1=p.x+(y?E1(-y/2,y/2):0),b=p.y+(y?E1(-y/6,y/6):0),l=p.space==="world"?[a1,b]:S5(a1,b);if(K.x=l[0],K.y=l[1],K.vx=(p.vx||0)+(y?E1(-4,4):0),K.vy=(p.vy||0)*(S>1?E1(.8,1.2):1),K.life=p.life*(S>1?E1(.85,1.15):1),p.orbit&&(K.orbit=Object.assign({cx:60,cy:18,r:34,ry:.35,speed:3.2,phase:j*b2/S},p.orbit)),K.orbit&&p.space!=="world"){let F=S5(K.orbit.cx,K.orbit.cy);K.orbit.cx=F[0],K.orbit.cy=F[1]}delete K.count,delete K.spread,delete K.space,W.push($5(d,K))}return W}function c5(d){for(let v=M5.length-1;v>=0;v--){let p=M5[v];p.age+=d;let S=p.age/p.life;if(S>=1){p.el.style.display="none",R.push(p.el),M5.splice(v,1);continue}let y,W;if(p.orbit){let b=p.orbit.phase+p.orbit.speed*p.age;y=p.orbit.cx+p.orbit.r*Math.cos(b),W=p.orbit.cy+p.orbit.r*p.orbit.ry*Math.sin(b)}else p.vx+=p.ax*d,p.vy+=p.gravity*d,p.drag&&(p.vx*=1-p.drag*d,p.vy*=1-p.drag*d),p.x+=p.vx*d,p.y+=p.vy*d,y=p.x+p.sway*Math.sin(p.age*p.swayF+p.swayPh),W=p.y;p.rot+=p.vrot*d;let j=S<.15?1+.25*Math.sin(S/.15*Math.PI):1,K=x2(p.s0,p.s1,H5(S))*j,a1=R1(S/Math.max(.001,p.fadeIn))*(1-H5((S-(1-p.fadeOut))/Math.max(.001,p.fadeOut)))*p.opacity;p.el.setAttribute("transform","translate("+G(y)+" "+G(W)+") rotate("+G(p.rot)+") scale("+G(K)+")"),p.el.setAttribute("opacity",G(a1))}}function Z5(d){return{x:d[B["body.x"]],y:d[B["body.y"]],rot:d[B["body.rot"]],sx:d[B["body.sx"]],sy:d[B["body.sy"]],skew:d[B["body.skew"]]}}let h2=q;function S5(d,v){let p=Z5(h2),S=(d-_2)*p.sx,y=(v-P5)*p.sy;S=S+y*Math.tan(p.skew*Math.PI/180);let W=p.rot*Math.PI/180,j=Math.cos(W),K=Math.sin(W);return[_2+p.x+S*j-y*K,P5+p.y+S*K+y*j]}function r5(d,v){let p=Z5(h2),S=d-_2-p.x,y=v-P5-p.y,W=-p.rot*Math.PI/180,j=Math.cos(W),K=Math.sin(W),a1=S*j-y*K,b=S*K+y*j;return S=a1-b*Math.tan(p.skew*Math.PI/180),y=b,[_2+S/(p.sx||1e-6),P5+y/(p.sy||1e-6)]}function s3(d){if(s5)return;if(d=D2(d||0,0,1/20),J+=d*1e3,i2){K2(f2()),e5("frame",d,J);return}V2.length&&(V2=V2.filter(b=>{if(J>=b.at){for(let[l,F]of b.items)Q[l]=F;return!1}return!0}));for(let b of o2){if(b.fade){let l=R1((J-b.fade.t0)/b.fade.dur);b.w=x2(b.fade.from,b.fade.to,H5(l)),l>=1&&(b.fade=null)}b.expires&&J>=b.expires&&(b.setV.clear(),b.addV.clear(),b.expires=0)}if(U1){let b=c1.saccade;if(b.on&&!g&&J>=N5){let F=e2.x;if(Math.random()<.35)e2.x=0,e2.y=0;else{let $=E1(0,b2),Z1=E1(.35,1)*b.range;e2.x=Math.cos($)*Z1,e2.y=Math.sin($)*Z1*.6}N5=J+E1(b.min,b.max),c1.blink.on&&Math.abs(e2.x-F)>b.range*.9&&Math.random()<.25&&w2("both")}if(J>=e1){let F=(b.micro||0)*1;Y1.x=E1(-F,F),Y1.y=E1(-F,F)*.7,e1=J+E1(140,420)}let l=c1.blink;if(l.on&&J>=v5){let F=w2("both");Math.random()<l.double&&G2.push(J+F+E1(50,110)),v5=J+E1(l.min,l.max)}G2.length&&J>=G2[0]&&(G2.shift(),w2("both",{close:c1.blink.close*.8,open:c1.blink.open*.8}))}y1.set(Q),S2(y1,!1);let[v,p]=A2(),S=1;if(g)if(j1!=null)S=j1;else{let b=Math.hypot(g[0]-_2-q[B["body.x"]],g[1]-70-q[B["body.y"]]);S=R1(1-(b-90)/170)}{g&&(i1.lastTargetAt=J);let b=!g&&J-(i1.lastTargetAt||-1e9)<1e3,l=b?i1.ax:g?g[0]:v*10,F=b?i1.ay:g?g[1]:p*10;(!i1.init||Math.hypot(l-i1.ax,F-i1.ay)>15)&&(i1.peak=J-i1.lastReset>3e3?1:.85,i1.ax=l,i1.ay=F,i1.since=J,i1.lastReset=J,i1.init=!0,i1.hold=E1(1500,2e3),i1.fade=E1(800,1200));let $=J-i1.since;i1.k=$<i1.hold?i1.peak:i1.peak*(1-H5(($-i1.hold)/i1.fade))}let y=S*i1.k;if(v||p){let b=c1.gaze,l=g?D2((g[0]-_2-q[B["body.x"]])/70,-1,1):v/(b.eye||1);y1[B["eyeL.x"]]+=v,y1[B["eyeR.x"]]+=v,y1[B["eyeL.y"]]+=p,y1[B["eyeR.y"]]+=p;let F=(b.face||0)/(b.eye||1)*(.4+.6*S);y1[B["face.x"]]+=v*F,y1[B["face.y"]]+=p*F,y1[B["body.rot"]]+=l*(b.rot||0)*t*y,y1[B["body.skew"]]+=l*(b.skew||0)*t*y,y1[B["body.x"]]+=l*(b.bx||0)*t*y}let W=Math.max(1,Math.ceil(d/(1/240))),j=d/W;for(let b=0;b<W;b++)for(let l=0;l<O2;l++){let F=p3[l]*(y1[l]-q[l])-D5[l]*H2[l];H2[l]+=F*j,q[l]+=H2[l]*j}for(let b=0;b<O2;b++)Number.isFinite(q[b])||(q[b]=y1[b],H2[b]=0);if(H1.set(q),S2(H1,!0),U1){let b=J/1e3;I5+=d*b2*c1.breath.rate*(1+.18*x5(b*.7,0));let l=Math.sin(I5+.25*Math.sin(I5))*c1.breath.amp*t;H1[B["body.sy"]]*=1+l,H1[B["body.sx"]]*=1-l*.55;let F=c1.sway.amp*t*x5(b*b2*c1.sway.rate*.35,3);H1[B["body.rot"]]+=F*.3,H1[B["body.skew"]]-=F*1.4,H1[B["body.y"]]+=.35*t*x5(b*b2*c1.sway.rate*.27,5),l3+=d}H1[B["body.sy"]]=D2(H1[B["body.sy"]],.86,1.12),H1[B["body.sx"]]=D2(H1[B["body.sx"]],.94,1.08),L.floor!=null&&H1[B["body.y"]]>L.floor&&(H1[B["body.y"]]=L.floor);let K=U5(O1[0]),a1=U5(O1[1]);H1[B["eyeL.open"]]*=K,H1[B["eyeR.open"]]*=a1,O1[0]&&J-O1[0].t0>O1[0].close+O1[0].hold+O1[0].open&&(O1[0]=null),O1[1]&&J-O1[1].t0>O1[1].close+O1[1].hold+O1[1].open&&(O1[1]=null),h2=H1,K2(H1),c5(d),e5("frame",d,J)}function f2(){let d=B5[p2],v=new Float64Array(Q);for(let p of Object.keys(d))v[B[p]]=d[p];return h2=v,v}let l2=T5;function v3(d,v){return{x:d[B[v+".x"]],y:d[B[v+".y"]],s:d[B[v+".s"]],top:d[B[v+".top"]],bot:d[B[v+".bot"]],ang:d[B[v+".ang"]],heart:d[B[v+".heart"]],cross:d[B[v+".cross"]],shine:d[B[v+".shine"]],open:d[B[v+".open"]]}}function V1(d){let v={};for(let p of r4)v[p]=d[B["mouth."+p]];return v}function K2(d){let v=U1&&!i2,[p,S,y]=S0(d[B["body.L"]],d[B["body.A"]],d[B["body.B"]]);l2="rgb("+p+","+S+","+y+")",m.setAttribute("fill",l2);let W=Z5(d);u.setAttribute("transform","translate("+G(W.x+_2)+" "+G(W.y+P5)+") rotate("+G(W.rot)+") skewX("+G(W.skew)+") scale("+Math.round(W.sx*1e4)/1e4+" "+Math.round(W.sy*1e4)/1e4+") translate("+-_2+" "+-P5+")"),f.setAttribute("transform","translate("+G(d[B["face.x"]])+" "+G(d[B["face.y"]])+")");let j=[v3(d,"eyeL"),v3(d,"eyeR")];for(let b=0;b<2;b++){let l=j[b];O[b].setAttribute("d",u0(r6(l,b?1:-1)));let F=R1(l.shine)*Math.max(0,l.s)*R1(l.open)*(1-R1(l.heart))*(1-R1(l.cross));if(F>.01){let _1=.34*F,w=[d[B["body.L"]],d[B["body.A"]],d[B["body.B"]]],[h5,s2,t5]=S0(x2(x0[0],w[0],_1),x2(x0[1],w[1],_1),x2(x0[2],w[2],_1));O[b].setAttribute("fill","rgb("+h5+","+s2+","+t5+")")}else O[b].hasAttribute("fill")&&O[b].removeAttribute("fill");let $=c[2*b],Z1=c[2*b+1];$.setAttribute("cx",G(l.x+2.7*l.s)),$.setAttribute("cy",G(l.y-2.7*l.s*R1(l.open))),$.setAttribute("r",G(2.3*F)),Z1.setAttribute("cx",G(l.x-2.5*l.s)),Z1.setAttribute("cy",G(l.y+2.4*l.s*R1(l.open))),Z1.setAttribute("r",G(1.15*F)),$.setAttribute("fill",r.shine),Z1.setAttribute("fill",r.shine)}let K=d[B["dot.s"]];I.setAttribute("cx",G(60+(j[0].x-33+(j[1].x-87))/2)),I.setAttribute("cy",G(65.88+(j[0].y-65.88+(j[1].y-65.88))/2+d[B["dot.dy"]])),I.setAttribute("r",G(Math.max(0,8*K)));let a1=V1(d);E.setAttribute("d",u0(i6(a1))),T.setAttribute("d",u0(o6(a1))),N(d,v)}function N(d,v){let p=l3,S=l=>d[B["acc."+l]],y=S("bubbles");for(let l=0;l<3;l++){let[F,$,Z1]=q7[l],_1=Math.max(0,(y-l*.25)/(1-l*.25)),w=0;v&&_1>0&&(_1*=1+.08*t*Math.sin(p*2.4-l*1.1),w=-1.2*t*Math.sin(p*1.5-l*.8)),C2[l].setAttribute("r",G(Z1*_1)),C2[l].setAttribute("cy",G($+w)),C2[l].setAttribute("fill",l2)}let W=S("wifi");if(W>.005){F1.style.display="",F1.setAttribute("transform","translate(95.17 24.83) scale("+G(Math.max(0,W))+") translate(-95.17 -24.83)"),F1.setAttribute("fill",l2);let l=1,F=1;if(v){let $=T3(p/1.9);l=$>=.2&&$<.75?1:.2,F=$>=.4&&$<.75?1:.2}t1.setAttribute("opacity",G(l)),U3.setAttribute("opacity",G(F)),u2.setAttribute("opacity","1"),F1.setAttribute("opacity",G(R1(W*1.5)))}else F1.style.display="none";let j=S("question");if(j>.005){$2.style.display="";let l=v?9*t*Math.sin(p*2.2):0,F=v?-1.4*t*Math.abs(Math.sin(p*2.2)):0;$2.setAttribute("transform","translate(104.5 "+G(29.4+F)+") rotate("+G(l)+") scale("+G(Math.max(0,j))+") translate(-104.5 -29.4)"),$2.setAttribute("fill",l2)}else $2.style.display="none";let K=S("z");for(let l=0;l<3;l++){let F=$3[l];if(K<=.005||l>0&&!v){F.style.display="none";continue}if(F.style.display="",F.setAttribute("fill",l2),l===0){let $=v?-1.2*t*Math.sin(p*1.4):0,Z1=v?4*t*Math.sin(p*.9):0;F.setAttribute("transform","translate(101.5 "+G(16.5+$)+") rotate("+G(Z1)+") scale("+G(Math.max(0,K))+") translate(-101.5 -16.5)"),F.setAttribute("opacity",G(R1(K*1.5)))}else{let $=T3(p/3+l*.5),Z1=101.5+8+$*14+2*Math.sin($*7+l),_1=16.5-6-$*26,w=K*(.32+.3*$);F.setAttribute("transform","translate("+G(Z1)+" "+G(_1)+") rotate("+G(-8+16*$)+") scale("+G(w)+") translate(-101.5 -16.5)"),F.setAttribute("opacity",G(R1($/.2)*R1((1-$)/.4)*R1(K)))}}let a1=S("tear");if(a1>.005){let l=a1,F=0,$=1,Z1=1;if(v){let _1=T3(p/4.2);if(_1<.25)l*=.45+.55*H5(_1/.25);else if(_1>.68){let w=(_1-.68)/.32;F=16*w*w,$=1-H5((w-.4)/.6)}Z1=1+.05*Math.sin(p*9)}s1.setAttribute("d",C4(m0[0],m0[1]+F,m0[2]*l*Z1)),s1.setAttribute("opacity",G($))}else s1.setAttribute("d","");let b=S("sweat");for(let l=0;l<2;l++){let[F,$,Z1]=j7[l];if(b<=.005){M1[l].setAttribute("d","");continue}let _1=b,w=0,h5=1;if(v){let s2=T3(p/(2.4+l*.5)+l*.37);if(s2<.2)_1*=.5+.5*H5(s2/.2);else if(s2>.55){let t5=(s2-.55)/.45;w=9*t5*t5,h5=1-H5((t5-.5)/.5)}}M1[l].setAttribute("d",C4(F,$+w,Z1*_1)),M1[l].setAttribute("opacity",G(h5))}}let $1=0,d1=0,M2=!1;function D1(d){$1=globalThis.requestAnimationFrame(D1),d1||(d1=d);let v=(d-d1)/1e3;d1=d,s3(v)}function P2(){M2||s5||(M2=!0,d1=0,$1=globalThis.requestAnimationFrame(D1))}function X1(){M2=!1,$1&&globalThis.cancelAnimationFrame($1),$1=0}function m2(){document.hidden?M2&&(X1(),M2="paused"):M2==="paused"&&(M2=!1,P2())}L.autoplay&&(document.addEventListener("visibilitychange",m2),P2());let p1={el:{svg:M,world:n,body:u,house:m,face:f,eyes:O,mouth:E,tongue:T,particles:a},get expression(){return p2},get frozen(){return i2},get lifeOn(){return U1},get clock(){return J},setExpression:Q2,layer:z2,lookAt(d,v,p){return g=d==null?null:[d,v],j1=p&&p.lean!=null?R1(p.lean):null,p1},get gazeLean(){return{habituation:i1.k,explicit:j1}},get looking(){return g?g.slice():null},blink(d){return d=d||{},w2(d.eye||"both",d),d.double&&G2.push(J+(d.close||c1.blink.close)+(d.hold||c1.blink.hold)+(d.open||c1.blink.open)+70),p1},wink(d){return w2(d==="L"?"L":"R",{close:90,hold:220,open:200}),p1},impulse(d){d=d||{};let v={x:"body.x",y:"body.y",rot:"body.rot",sx:"body.sx",sy:"body.sy",skew:"body.skew",fx:"face.x",fy:"face.y"};for(let p in d){let S=v[p]||p,y=B[S];y!=null&&(H2[y]+=d[p])}return p1},squash(d,v){return z2("_squash",{priority:50}).add({"body.sy":-d,"body.sx":d*.6}).ttl(v||90),p1},life(d){return U1=d==null?!U1:!!d,U1||(e2.x=e2.y=Y1.x=Y1.y=0),p1},setLife(d){return L2=E2(L2,d),c1=E2(F3,I2[p2].life,L2),p1},get lifeProfile(){return E2(c1)},freeze(d){if(i2=d==null?!i2:!!d,i2)M5.splice(0).forEach(v=>{v.el.style.display="none",R.push(v.el)}),K2(f2());else{let v=f2();q.set(v),H2.fill(0),Q.set(v),V2=[]}return p1},accessory(d,v){let p=z2("_acc",{priority:90});return v==null?p.unset("acc."+d):p.set({["acc."+d]:v===!0?1:v===!1?0:v}),p1},emit:u5,tint(d,v){let p=z2("_tint",{priority:80});if(d==null)return p.clear(),p1;let[S,y,W]=_3(d);return p.set({"body.L":S,"body.A":y,"body.B":W},v??1),p1},setPalette(d){return Object.assign(r,d||{}),p1},setState(d,v,p){let S=B[d];return S!=null&&(q[S]=v,p!=null&&(H2[S]=p)),p1},spring(d,v){return W1[d]=v,W5(C1),p1},get(d){return h2[B[d]]},target(d){return y1[B[d]]},velocity(d){return H2[B[d]]},get params(){return F5.slice()},get bodyColor(){return l2},houseToWorld:S5,worldToHouse:r5,clientToSvg(d,v){let p=M.getScreenCTM();if(!p)return[0,0];let S=M.createSVGPoint();S.x=d,S.y=v;let y=S.matrixTransform(p.inverse());return[y.x,y.y]},on(d,v){return(c2[d]=c2[d]||[]).push(v),p1},off(d,v){return c2[d]=(c2[d]||[]).filter(p=>p!==v),p1},step(d){return s3(d),p1},start:P2,stop:X1,destroy(){for(s5=!0,X1(),document.removeEventListener("visibilitychange",m2);M.firstChild;)M.removeChild(M.firstChild)}};return p2=null,Q2(B5[L.expression]?L.expression:"Normal",{instant:!0}),K2(q),p1}var V5={hexToOklab:_3,oklabToRgb:S0,create:l6,EXPRESSIONS:p6,POSES:I2,COLORS:g0,FACE:T5,HOUSE_D:V4,SHAPES:Object.keys(Z0),PARAMS:F5.slice(),PRESETS:Object.keys(f0),LIFE_DEFAULT:F3};var N2=class extends J1{constructor(){super(...arguments);this.expression="Normal";this.controlled=!1;this.reducedMotion=!1;this.label="Casita"}get face(){return this._face}firstUpdated(){this._create()}connectedCallback(){super.connectedCallback(),this.hasUpdated&&!this._face&&this._create()}disconnectedCallback(){super.disconnectedCallback(),this._face?.destroy(),this._face=void 0}updated(L){L.has("expression")&&this._face&&!this.controlled&&this._face.expression!==this.expression&&this._face.setExpression(this.expression)}_create(){this._face=V5.create(this.svg,{expression:this.expression,life:!0,autoplay:!this.controlled,reducedMotion:this.reducedMotion,floor:0}),this.dispatchEvent(new CustomEvent("face-ready",{detail:{face:this._face}}))}render(){return w1`<svg role="img" aria-label=${this.label} part="svg"></svg>`}};N2.styles=R2`
    :host {
      display: block;
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: visible;
      display: block;
    }
    .casita-shadow {
      fill: var(--shadow, #16324a);
      fill-opacity: 0.16;
    }
  `,Y([m1()],N2.prototype,"expression",2),Y([m1({type:Boolean})],N2.prototype,"controlled",2),Y([m1({type:Boolean,attribute:"reduced-motion"})],N2.prototype,"reducedMotion",2),Y([m1()],N2.prototype,"label",2),Y([d2("svg",!0)],N2.prototype,"svg",2);C5("casita-face",N2);var _5=["joy","excitement","energy","affection","irritation","curiosity"],m6=["Normal","Alert","Angry","Scared","Cheeky","DeadAss","Dead","Devious","Focusing","Grateful","Grinning","Happy","Hurt","Initializing","Loading","Loving","NoInternet","Pleading","Problem","Sad","Silly","Sleeping","Smiling","Sweating","UwU","WTF","Winking","WinkingSmile"],A3=M=>typeof M=="string"&&m6.includes(M),a4=async M=>{let V=await M.callWS({type:"casita/info"});return V&&Array.isArray(V.entries)?{version:V.version,entries:V.entries.filter(L=>L&&L.entry_id)}:V&&V.entry_id?{version:V.version,entries:[{title:"Casita",...V}]}:{version:V?.version,entries:[]}},D3=(M,V)=>V?M?.entries.find(L=>L.conversation_entity===V):void 0,A4=(M,V)=>D3(M,V)??M?.entries[0],n4=(M,V,L)=>{let r=M.title||"Casita";if(V.filter(i=>(i.title||"Casita")===r).length<2)return r;let t=M.llm_agent?L?.states[M.llm_agent]?.attributes.friendly_name||M.llm_agent:void 0;return`${r} (${t??M.conversation_entity??M.entry_id})`};var d4=(M,V)=>{if(!V)return;let L={},r=0;for(let t of _5){let i=V.mood_entities[t],n=i?M.states[i]:void 0,u=n?parseFloat(n.state):NaN;Number.isFinite(u)&&(L[t]=u,r++)}return r?L:void 0},E3=class{constructor(V,L=2e3){this._send=V;this._windowMs=L;this._last=new Map;this._pending=new Map;this._timers=new Map}report(V,L=.5){let r=Date.now(),t=this._last.get(V)??-1/0,i=Math.max(0,Math.min(1,L));if(r-t>=this._windowMs&&!this._timers.has(V)){this._last.set(V,r),this._send(V,o4(i));return}if(this._pending.set(V,Math.min(1,(this._pending.get(V)??0)+i)),!this._timers.has(V)){let n=Math.max(0,t+this._windowMs-r);this._timers.set(V,setTimeout(()=>{this._timers.delete(V);let u=this._pending.get(V)??0;this._pending.delete(V),u>0&&(this._last.set(V,Date.now()),this._send(V,o4(u)))},n))}}dispose(){this._timers.forEach(V=>clearTimeout(V)),this._timers.clear(),this._pending.clear()}},o4=M=>Math.round(M*100)/100;var W2=class extends J1{constructor(){super(...arguments);this.heading="";this.narrow=!1;this._prev=new Map;this._lit=new Map}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._litTimer),this._prev.clear(),this._lit.clear()}willUpdate(L){if(!L.has("hass")&&!L.has("entry"))return;let r=L.has("entry"),t=Date.now();for(let i of _5){let n=this._value(i),u=this._prev.get(i);n!==void 0&&(!r&&u!==void 0&&Math.abs(n-u)>=.005&&this._lit.set(i,t),this._prev.set(i,n))}r&&this._lit.clear(),[...this._lit.values()].some(i=>t-i<1e3)&&(clearTimeout(this._litTimer),this._litTimer=setTimeout(()=>this.requestUpdate(),1e3))}_value(L){let r=this.entry?.mood_entities[L],t=r?this.hass?.states[r]:void 0,i=t?parseFloat(t.state):NaN;return Number.isFinite(i)?i:void 0}render(){let L=this.strings,r=_5.map(i=>[i,this._value(i)]),t=r.some(([,i])=>i!==void 0);return w1`
      <div class="hud" role="group" aria-label=${this.heading?`${L.mood} — ${this.heading}`:L.mood}>
        ${this.heading?w1`<p class="heading">${this.heading}</p>`:""}
        ${t?r.map(([i,n])=>{let u=i==="joy",m=n??0,f=u?Math.abs(m)*50:Math.max(0,Math.min(1,m))*100,O=u?m<0?50-f:50:0,c=n===void 0?"—":u?`${m>=0?"+":"−"}${Math.abs(m).toFixed(2)}`:m.toFixed(2),I=this.entry?.mood_entities[i],E=Date.now()-(this._lit.get(i)??0)<1e3;return w1`<div class="row ${u?"div":""} ${E?"lit":""} m-${i}" title=${I??""}>
                <span class="name">${L.moodNames[i]}</span>
                <span class="bar" role="meter" aria-label=${L.moodNames[i]} aria-valuemin=${u?-1:0} aria-valuemax="1" aria-valuenow=${m.toFixed(2)}
                  ><i style="left:${O}%;width:${f}%"></i
                ></span>
                <span class="val">${c}</span>
              </div>`}):w1`<p class="empty">${L.moodUnavailable}</p>`}
      </div>
    `}};W2.styles=R2`
    :host {
      display: block;
      --hud-bar: var(--primary-color, #18bcf2);
    }
    .hud {
      background: var(--ha-card-background, var(--card-background-color, #fff));
      color: var(--primary-text-color, #13212c);
      border-radius: var(--ha-card-border-radius, 12px);
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      box-shadow: var(--ha-card-box-shadow, 0 4px 16px rgba(0, 0, 0, 0.12));
      padding: 8px 14px;
      width: 248px;
      box-sizing: border-box;
    }
    .row {
      display: grid;
      grid-template-columns: 82px minmax(0, 1fr) 42px;
      align-items: center;
      gap: 8px;
      padding: 5px 0;
      font-size: 13px;
    }
    .row {
      margin: 0 -8px;
      padding-left: 8px;
      padding-right: 8px;
      border-radius: 6px;
      transition: background-color 0.6s ease-out;
    }
    .row.lit {
      background-color: color-mix(in srgb, var(--hud-bar) 16%, transparent);
      transition-duration: 0.15s;
    }
    .row + .row {
      border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.08));
    }
    .name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .bar {
      position: relative;
      height: 6px;
      border-radius: 6px;
      background: var(--secondary-background-color, #eef2f5);
      overflow: hidden;
    }
    .bar i {
      position: absolute;
      top: 0;
      bottom: 0;
      background: var(--hud-bar);
      border-radius: 6px;
      transition: width 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), left 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .m-irritation .bar i {
      background: var(--error-color, #db4437);
    }
    .div .bar::after {
      content: "";
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 1px;
      background: var(--secondary-text-color, #5a6a77);
      opacity: 0.5;
    }
    .val {
      font-variant-numeric: tabular-nums;
      text-align: right;
      font-size: 12px;
      color: var(--secondary-text-color, #5a6a77);
    }
    .heading {
      margin: 2px 0 4px;
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color, #5a6a77);
    }
    :host([narrow]) .heading {
      display: none;
    }
    .empty {
      margin: 6px 0;
      font-size: 13px;
      color: var(--secondary-text-color, #5a6a77);
      max-width: 220px;
    }
    /* narrow: a strip under the header, 3 × 2 so the names stay whole at 390 px */
    :host([narrow]) .hud {
      width: 100%;
      border-radius: 0;
      border-width: 0 0 1px;
      box-shadow: none;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 6px 14px;
      padding: 6px 16px 8px;
    }
    :host([narrow]) .row {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      grid-template-areas: "name val" "bar bar";
      gap: 2px 6px;
      margin: 0 -4px;
      padding: 2px 4px;
      border: 0;
      font-size: 12px;
      min-width: 0;
    }
    :host([narrow]) .name {
      grid-area: name;
    }
    :host([narrow]) .val {
      grid-area: val;
      font-size: 11px;
    }
    :host([narrow]) .bar {
      grid-area: bar;
      height: 4px;
    }
    :host([narrow]) .empty {
      grid-column: 1 / -1;
      max-width: none;
      margin: 0;
    }
    @media (prefers-reduced-motion: reduce) {
      .bar i {
        transition: none;
      }
    }
  `,Y([m1({attribute:!1})],W2.prototype,"hass",2),Y([m1({attribute:!1})],W2.prototype,"entry",2),Y([m1()],W2.prototype,"heading",2),Y([m1({attribute:!1})],W2.prototype,"strings",2),Y([m1({type:Boolean,reflect:!0})],W2.prototype,"narrow",2);C5("casita-mood-hud",W2);var y0="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";var O0="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z";var b0="M7.5,4A5.5,5.5 0 0,0 2,9.5C2,10 2.09,10.5 2.22,11H6.3L7.57,7.63C7.87,6.83 9.05,6.75 9.43,7.63L11.5,13L12.09,11.58C12.22,11.25 12.57,11 13,11H21.78C21.91,10.5 22,10 22,9.5A5.5,5.5 0 0,0 16.5,4C14.64,4 13,4.93 12,6.34C11,4.93 9.36,4 7.5,4V4M3,12.5A1,1 0 0,0 2,13.5A1,1 0 0,0 3,14.5H5.44L11,20C12,20.9 12,20.9 13,20L18.56,14.5H21A1,1 0 0,0 22,13.5A1,1 0 0,0 21,12.5H13.4L12.47,14.8C12.07,15.81 10.92,15.67 10.55,14.83L8.5,9.5L7.54,11.83C7.39,12.21 7.05,12.5 6.6,12.5H3Z";var k0="M7,10L12,15L17,10H7Z";var w0="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z";var P0="M2,21L23,12L2,3V10L17,12L2,14V21Z";var B0="M18,18H6V6H18V18Z";var t2=class extends J1{constructor(){super(...arguments);this.open=!1;this._onClose=()=>{this.dispatchEvent(new CustomEvent("closed"))};this._backdrop=L=>{L.target===this._dialog&&this._close()}}updated(L){let r=this._dialog;!L.has("open")||!r||(this.open&&!r.open?(r.showModal(),r.querySelector("select")?.focus()):!this.open&&r.open&&r.close())}_change(L){let r=L.target.value,t=r?{pipeline_id:r}:{};this.dispatchEvent(new CustomEvent("settings-changed",{detail:{settings:t}}))}_close(){this._dialog?.close()}render(){let L=this.strings;if(!L||!this.hass)return w1`<dialog></dialog>`;let r=this.pipelines?.pipelines??[],t=this.pipelines?.preferred_pipeline,i=r.find(m=>m.id===(this.defaultId??t)),n=i?`${i.name} (${i.id===t?L.preferred:L.byDefault})`:`Assist (${L.preferred})`,u=this.settings?.pipeline_id;return w1`
      <dialog aria-labelledby="title" @close=${this._onClose} @click=${this._backdrop}>
        <div class="head">
          <h2 id="title">${L.settingsTitle}</h2>
          <button class="icon" type="button" aria-label=${L.close} @click=${this._close}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d=${y0}></path></svg>
          </button>
        </div>
        <div class="body">
          <div class="field">
            <div class="select">
              <label for="pipeline">${L.pipeline}</label>
              <select id="pipeline" aria-describedby="pipeline-help" .value=${u??""} @change=${this._change}>
                <option value="" ?selected=${!u}>${n}</option>
                ${r.map(m=>w1`<option value=${m.id} ?selected=${u===m.id}>${m.name}</option>`)}
              </select>
              <svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d=${k0}></path></svg>
            </div>
            <span class="help" id="pipeline-help">${L.pipelineHelp}</span>
            ${this.warning?w1`<span class="warning" role="note">${this.warning}</span>`:""}
            ${this.note?w1`<span class="note" role="note">${this.note}</span>`:""}
          </div>
          <p class="foot">${L.savedUser}</p>
        </div>
      </dialog>
    `}};t2.styles=R2`
    dialog {
      border: 0;
      padding: 0;
      width: min(440px, calc(100vw - 32px));
      max-height: calc(100vh - 48px);
      border-radius: var(--ha-dialog-border-radius, 24px);
      background: var(--ha-dialog-surface-background, var(--mdc-theme-surface, var(--card-background-color, #fff)));
      color: var(--primary-text-color, #13212c);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
      font-family: var(--ha-font-family-body, Roboto, system-ui, sans-serif);
    }
    dialog::backdrop {
      background: var(--mdc-dialog-scrim-color, rgba(0, 0, 0, 0.32));
    }
    .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 12px 4px 24px;
    }
    h2 {
      margin: 0;
      font-size: var(--ha-font-size-2xl, 22px);
      font-weight: var(--ha-font-weight-normal, 400);
    }
    .body {
      padding: 12px 24px 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      overflow: auto;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    /* a filled select like ha-select: floating label, value below, chevron, bottom line */
    .select {
      position: relative;
      border-radius: 4px 4px 0 0;
      background: var(--mdc-text-field-fill-color, var(--input-fill-color, var(--secondary-background-color, #f5f5f5)));
      box-shadow: inset 0 -1px 0 var(--mdc-text-field-idle-line-color, var(--input-idle-line-color, rgba(0, 0, 0, 0.42)));
      transition: box-shadow 0.15s;
    }
    .select:hover {
      box-shadow: inset 0 -1px 0 var(--mdc-text-field-hover-line-color, var(--input-hover-line-color, rgba(0, 0, 0, 0.87)));
    }
    .select:focus-within {
      box-shadow: inset 0 -2px 0 var(--primary-color, #009ac7);
    }
    .select label {
      position: absolute;
      left: 16px;
      top: 8px;
      font-size: 12px;
      line-height: 16px;
      color: var(--mdc-text-field-label-ink-color, var(--secondary-text-color, #727272));
      pointer-events: none;
    }
    .select:focus-within label {
      color: var(--primary-color, #009ac7);
    }
    select {
      appearance: none;
      -webkit-appearance: none;
      display: block;
      width: 100%;
      box-sizing: border-box;
      font: inherit;
      font-size: 16px;
      line-height: 24px;
      color: var(--mdc-text-field-ink-color, var(--primary-text-color, #212121));
      background: transparent;
      border: 0;
      padding: 24px 44px 8px 16px;
      min-height: 56px;
      cursor: pointer;
    }
    select:focus {
      outline: none;
    }
    select option {
      color: var(--primary-text-color, #212121);
      background: var(--card-background-color, #fff);
    }
    .arrow {
      position: absolute;
      right: 12px;
      top: 50%;
      width: 24px;
      height: 24px;
      margin-top: -12px;
      fill: var(--secondary-text-color, #727272);
      pointer-events: none;
    }
    .select:focus-within .arrow {
      fill: var(--primary-color, #009ac7);
    }
    .help,
    .note,
    .foot {
      font-size: 12px;
      line-height: 1.4;
      color: var(--secondary-text-color, #727272);
      padding: 0 16px;
    }
    .foot {
      margin: 0;
      padding: 0;
    }
    .warning {
      font-size: 12px;
      line-height: 1.4;
      margin-top: 4px;
      padding: 6px 10px;
      border-radius: 8px;
      background: color-mix(in srgb, var(--warning-color, #ffa600) 16%, transparent);
      border-left: 3px solid var(--warning-color, #ffa600);
    }
    .note {
      font-style: italic;
    }
    .icon {
      width: 40px;
      height: 40px;
      border: 0;
      border-radius: 50%;
      background: transparent;
      color: var(--secondary-text-color, #5a6a77);
      display: grid;
      place-items: center;
      cursor: pointer;
    }
    .icon:hover {
      background: rgba(127, 127, 127, 0.12);
    }
    .icon:focus-visible {
      outline: 2px solid var(--primary-color, #18bcf2);
    }
    .icon svg {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }
    @media (prefers-reduced-motion: reduce) {
      .select {
        transition: none;
      }
    }
  `,Y([m1({attribute:!1})],t2.prototype,"hass",2),Y([m1({attribute:!1})],t2.prototype,"strings",2),Y([m1({attribute:!1})],t2.prototype,"settings",2),Y([m1({attribute:!1})],t2.prototype,"pipelines",2),Y([m1()],t2.prototype,"warning",2),Y([m1()],t2.prototype,"note",2),Y([m1()],t2.prototype,"defaultId",2),Y([m1({type:Boolean})],t2.prototype,"open",2),Y([d2("dialog")],t2.prototype,"_dialog",2);C5("casita-settings-dialog",t2);var n3=(M,V)=>{switch(M){case"sunny":return V==="night"?"clear":"sun";case"clear-night":return"clear";case"partlycloudy":return"partly";case"cloudy":case"exceptional":return"cloud";case"rainy":return"rain";case"pouring":return"pour";case"lightning":case"lightning-rainy":return"storm";case"snowy":return"snow";case"snowy-rainy":return"sleet";case"hail":return"hail";case"fog":return"fog";case"windy":case"windy-variant":return"wind";default:return"clear"}};var p4=M=>/^fr\b/i.test(M??"")?"fr":"en",s6={title:"Casita",mood:"Humeur",moodShow:"Afficher l’humeur",moodHide:"Masquer l’humeur",settings:"Réglages",close:"Fermer",chatLabel:"Parle à Casita",chatPh:"Parle à Casita…",send:"Envoyer",micStart:"Parler à Casita au micro",micStop:"Arrêter l’écoute",stageLabel:"Casita, dans sa pièce",stageHelp:"Espace ou Entrée pour le piquer, flèches pour le faire regarder ailleurs.",exprAria:"Casita, expression : ",settingsTitle:"Réglages de Casita",pipeline:"Assistant",pipelineHelp:"L’assistant utilisé quand tu parles à Casita ici.",preferred:"préféré",notCasita:"Cet assistant n’utilise pas Casita : il parlera sans personnalité ni émotions.",byDefault:"par défaut",emptyTalk:"Pour me parler, crée un assistant qui m’utilise comme agent de conversation.",createAssistant:"Créer l’assistant Casita",creating:"Création…",openAssistants:"Régler dans les assistants",askAdmin:"Demande à un administrateur de créer un assistant Casita.",createFailed:"Impossible de créer l’assistant.",assistantReady:"Merci ! On peut parler maintenant.",localWarning:"Désactive « Préférer gérer les commandes localement » pour que Casita réagisse aussi aux commandes locales.",none:"Aucun",savedUser:"Enregistré pour ton utilisateur.",moodNames:{joy:"Joie",excitement:"Excitation",energy:"Énergie",affection:"Affection",irritation:"Agacement",curiosity:"Curiosité"},moodUnavailable:"Capteurs d’humeur indisponibles : Casita utilise son humeur locale.",micUnsupported:"Le micro demande une connexion sécurisée (HTTPS).",micDenied:"Accès au micro refusé.",micNotFound:"Aucun micro trouvé.",micInUse:"Le micro est déjà utilisé.",micError:"Le micro ne répond pas.",noPipeline:"Aucun assistant vocal configuré.",noTts:"Cet assistant n’a pas de synthèse vocale : Casita répond par écrit.",ouch:"Aïe !",hey:"Hé…",stop:"Arrête !",hmph:"Pfff.",more:"Encore ?",tooMuch:"Trop !",achoo:"Atchoum !",back:"Te revoilà !",missed:"Tu m’as manqué !",hello:"Salut ! Moi c’est Casita.",late:"Il est tard…",re:"Re !",reName:"Re, {n} !",shyHi:"Oh… coucou.",notUnderstood:"Je n’ai pas compris.",oops:"Oups, ça n’a pas marché.",oopsNet:"Oups, je n’arrive pas à joindre la maison.",hugLines:["Encore un peu…","Mmmh.","Je t’aime bien, toi."],rain:["Oh, il pleut…","Il pleut."],snow:["De la neige !","Il neige !"],thunder:["Ouh !","Eek !"],sun:["Il fait beau !"],goodMorning:"Bonjour !",labels:{Normal:"Content",Alert:"En alerte",Angry:"Fâché",Scared:"Apeuré",Cheeky:"Coquin",DeadAss:"Blasé",Dead:"K.O.",Devious:"Espiègle",Focusing:"Concentré",Grateful:"Reconnaissant",Grinning:"Rayonnant",Happy:"Heureux",Hurt:"Blessé",Initializing:"Démarrage",Loading:"Réfléchit",Loving:"Amoureux",NoInternet:"Hors ligne",Pleading:"Suppliant",Problem:"Perplexe",Sad:"Triste",Silly:"Rigolo",Sleeping:"Endormi",Smiling:"Souriant",Sweating:"Gêné",UwU:"UwU",WTF:"Interloqué",Winking:"Clin d’œil",WinkingSmile:"Clin d’œil souriant"}},v6={title:"Casita",mood:"Mood",moodShow:"Show mood",moodHide:"Hide mood",settings:"Settings",close:"Close",chatLabel:"Talk to Casita",chatPh:"Talk to Casita…",send:"Send",micStart:"Talk to Casita with the microphone",micStop:"Stop listening",stageLabel:"Casita, in his room",stageHelp:"Space or Enter to poke him, arrow keys to make him look around.",exprAria:"Casita, expression: ",settingsTitle:"Casita settings",pipeline:"Assistant",pipelineHelp:"The assistant used when you talk to Casita here.",preferred:"preferred",notCasita:"This assistant doesn’t use Casita: he’ll talk without personality or emotions.",byDefault:"default",emptyTalk:"To talk with me, create an assistant that uses me as its conversation agent.",createAssistant:"Create Casita assistant",creating:"Creating…",openAssistants:"Set up in assistants",askAdmin:"Ask an administrator to create a Casita assistant.",createFailed:"Couldn’t create the assistant.",assistantReady:"Thanks! We can talk now.",localWarning:'Turn off "Prefer handling commands locally" so Casita also reacts to local commands.',none:"None",savedUser:"Saved for your user.",moodNames:{joy:"Joy",excitement:"Excitement",energy:"Energy",affection:"Affection",irritation:"Irritation",curiosity:"Curiosity"},moodUnavailable:"Mood sensors unavailable: Casita uses his local mood.",micUnsupported:"The microphone needs a secure connection (HTTPS).",micDenied:"Microphone access denied.",micNotFound:"No microphone found.",micInUse:"The microphone is already in use.",micError:"The microphone does not respond.",noPipeline:"No voice assistant set up.",noTts:"This assistant has no text-to-speech: Casita answers in writing.",ouch:"Ouch!",hey:"Hey…",stop:"Stop it!",hmph:"Hmph.",more:"More?",tooMuch:"Too much!",achoo:"Achoo!",back:"You’re back!",missed:"I missed you!",hello:"Hi! I’m Casita.",late:"It’s late…",re:"Hey again!",reName:"Hey again, {n}!",shyHi:"Oh… hi.",notUnderstood:"I didn’t get that.",oops:"Oops, that didn’t work.",oopsNet:"Oops, I can’t reach the house.",hugLines:["A little longer…","Mmmh.","I like you."],rain:["Oh, it’s raining…","Rain."],snow:["Snow!","It’s snowing!"],thunder:["Eek!","Whoa!"],sun:["Sunshine!"],goodMorning:"Good morning!",labels:{Normal:"Content",Alert:"Alert",Angry:"Angry",Scared:"Scared",Cheeky:"Cheeky",DeadAss:"Deadpan",Dead:"K.O.",Devious:"Devious",Focusing:"Focused",Grateful:"Grateful",Grinning:"Grinning",Happy:"Happy",Hurt:"Hurt",Initializing:"Starting up",Loading:"Thinking",Loving:"In love",NoInternet:"Offline",Pleading:"Pleading",Problem:"Puzzled",Sad:"Sad",Silly:"Silly",Sleeping:"Asleep",Smiling:"Smiling",Sweating:"Sweating",UwU:"UwU",WTF:"WTF",Winking:"Winking",WinkingSmile:"Wink & smile"}},U2={fr:s6,en:v6};function l4(M,V){let L="http://www.w3.org/2000/svg",r=(C,H,e)=>C<H?H:C>e?e:C,t=C=>r(C,0,1),i=(C,H,e)=>C+(H-C)*e,n=(C,H)=>C+Math.random()*(H-C),u=C=>C[Math.floor(Math.random()*C.length)],m=C=>(C=t(C),C*C*(3-2*C)),f=C=>C<=0||C>=1?0:Math.sin(Math.PI*C),O=V.reducedMotion,c=O?.35:1,I=V5.FACE,E=V5.EXPRESSIONS.map(C=>C.id),{stage:T,svg:s1,face:A,bubble:M1,bubbleText:C2}=M,F1=V.lang,u2=U2[F1],t1=C=>u2[C],U3=(C,H)=>String(t1(C)).replace("{n}",H),$2=V.userName,$3=Array.from({length:16},()=>n(0,6.283)),a=0,q=0,H2=0,y1=[];function Q(C,H,e){y1.push({at:a+C,fn:H,tag:e||null})}function H1(C){for(let H=y1.length-1;H>=0;H--)y1[H].tag===C&&y1.splice(H,1)}function p3(){for(let C=0;C<y1.length;C++)if(a>=y1[C].at){let H=y1.splice(C,1)[0];C--;try{H.fn()}catch(e){console.error(e)}}}let D5="casita.v1",W1=(()=>{let C=null;try{C=JSON.parse(localStorage.getItem(D5)||"null")}catch{C=null}return(!C||typeof C!="object")&&(C={}),Object.assign({visits:0,firstSeen:null,lastSeen:null,affection:.3,pokesTotal:0,petsSeconds:0},C)})();function p2(){W1.lastSeen=Date.now(),W1.affection=g.F;try{localStorage.setItem(D5,JSON.stringify(W1))}catch{}}let J=(()=>{let C=new Date().getHours();return C>=6&&C<9?"dawn":C>=9&&C<18?"day":C>=18&&C<21?"dusk":"night"})(),i2=null,U1=()=>J==="night";function s5(){return J==="dawn"?.8:J==="day"?.7:J==="dusk"?.5:.25}let V2=["V","A","E","F","I","C"],L2={V:[-1,1],A:[0,1],E:[0,1],F:[0,1],I:[0,1],C:[0,1]},c1={V:"joy",A:"excitement",E:"energy",F:"affection",I:"irritation",C:"curiosity"},r1={V:.25,A:.35,E:s5(),F:t(W1.affection),I:0,C:.3};r1.V=.25+.1*r1.F;let o2={V:0,A:0,E:0,F:0,I:0,C:0},c2={V:0,A:0,E:0,F:0,I:0,C:0},g={...r1,asleep:!1},j1=!1;function i1(){for(let C of V2)g[C]=r(r1[C]+o2[C]+c2[C],L2[C][0],L2[C][1])}function n1(C){for(let H of V2){let e=C[H];e&&(j1?o2[H]=r(o2[H]+e,L2[H][0]-r1[H],L2[H][1]-r1[H]):r1[H]=r(r1[H]+e,L2[H][0],L2[H][1]))}i1()}function I5(C){if(j1){let H=Math.exp(-C/6);for(let e of V2)o2[e]*=H}else{let H=(e,o,Z)=>e+(o-e)*(1-Math.exp(-C/Z));r1.V=H(r1.V,.25+.1*r1.F,40),r1.A=H(r1.A,.35,12),r1.E=H(r1.E,s5(),120),g.asleep&&(r1.E=t(r1.E+.02*C)),r1.I=H(r1.I,0,8),r1.C=H(r1.C,.3,15)}i1()}function l3(C){if(!C){if(j1)for(let H of V2)r1[H]=g[H],o2[H]=0;j1=!1;return}for(let H of V2){let e=C[c1[H]];if(e==null||!Number.isFinite(e))continue;let o=r(e,L2[H][0],L2[H][1]);j1&&Math.abs(o-r1[H])>.005&&(o2[H]*=.3),r1[H]=o}if(!j1)for(let H of V2)o2[H]=0;j1=!0,i1()}function v5(C){if(!O||!C)return C;let H={};for(let e in C)H[e]=e.startsWith("body.")&&e!=="body.L"&&e!=="body.A"&&e!=="body.B"||e==="face.x"||e==="face.y"?C[e]*c:C[e];return H}{let C=A.impulse;A.impulse=H=>C(v5(H))}let N5=V5.hexToOklab(V5.COLORS.blue);A.spring("dot.s",{k:900,c:60});let e1={s:2,x0:-60,y0:-80,w:240,h:230,pxW:480,pxH:460},e2=.76,Y1={left:0,top:0,right:0,bottom:0};function O1(){let C=s1.getBoundingClientRect();Y1={left:C.left,top:C.top,right:C.right,bottom:C.bottom}}function G2(){let C=T.getBoundingClientRect(),H=Math.max(200,C.width),e=Math.max(240,C.height),o=r(Math.min(H*.5,e*.42),120,340),Z=o/120,h=H/Z,_=e/Z;e1.s=Z,e1.w=h,e1.h=_,e1.pxW=H,e1.pxH=e,e1.x0=60-h/2,e1.y0=116.88-e2*_,s1.setAttribute("viewBox",[e1.x0,e1.y0,h,_].map(D=>D.toFixed(2)).join(" ")),T.style.setProperty("--floor-y",(e2*100).toFixed(1)+"%"),T.style.setProperty("--house-w",o.toFixed(1)+"px"),O1()}let L5=(C,H)=>[(C-e1.x0)*e1.s,(H-e1.y0)*e1.s];function Z2(C,H){return[e1.x0+(C-Y1.left)/e1.s,e1.y0+(H-Y1.top)/e1.s]}function W5(C,H){let e=Math.max(0,Y1.left-C,C-Y1.right,Y1.top-H,H-Y1.bottom);return e>0?t(1-e/120)*.7:1}let C1=(C,H,e)=>{let o=document.createElementNS(L,C);for(let Z in H)o.setAttribute(Z,String(H[Z]));return e&&e.appendChild(o),o},e5=C1("defs",{});s1.insertBefore(e5,s1.firstChild);let m3=C1("clipPath",{id:"casita-house-clip"},e5);C1("path",{d:V5.HOUSE_D},m3);let Q2=C1("ellipse",{cx:60,cy:117.6,rx:54,ry:4.6,class:"casita-shadow"});s1.insertBefore(Q2,A.el.world);let a2=C1("g",{class:"casita-extras"},A.el.body),z2=C1("radialGradient",{id:"casita-glow-grad"},e5);C1("stop",{offset:"0",style:"stop-color: var(--glow); stop-opacity: .75"},z2),C1("stop",{offset:"0.55",style:"stop-color: var(--glow); stop-opacity: .28"},z2),C1("stop",{offset:"1",style:"stop-color: var(--glow); stop-opacity: 0"},z2);let S2=C1("ellipse",{cx:60,cy:64,rx:0,ry:0,fill:"url(#casita-glow-grad)"});A.el.world.insertBefore(S2,A.el.body);let x5=C1("g",{class:"casita-extras-face"});A.el.face.insertBefore(x5,A.el.face.firstChild);let w2={cloud:"#9fb0c0"};function U5(){let C=getComputedStyle(T),H=(e,o)=>C.getPropertyValue(e).trim()||o;w2={cloud:H("--cloud","#9fb0c0")},A.setPalette({spark:H("--spark","#ffd23f"),star:H("--star-fx","#ffd23f"),steam:H("--steam","#8fa3b5"),puff:H("--puff","#ffffff"),puffEdge:H("--puff-edge","#b9c6d2"),shine:H("--shine","#ffffff")})}let A2=(C,H)=>({x:0,v:0,t:0,k:C||260,c:H||18});function M5(C,H){let e=C.k*(C.t-C.x)-C.c*C.v;return C.v+=e*H,C.x+=C.v*H,C.x}let R={blush:{g:C1("g",{opacity:0},x5),sp:A2(80,16)},bang:{g:C1("g",{},a2),sp:A2(320,14)},vein:{g:C1("g",{},a2),sp:A2(260,16)},dots:{g:C1("g",{},a2),sp:A2(200,20)},bandage:{g:C1("g",{},a2),sp:A2(300,15)},cloud:{g:C1("g",{},a2),sp:A2(60,14)},dream:{g:C1("g",{},a2),sp:A2(160,14)},rings:{g:C1("g",{},a2),sp:A2(120,18)},scan:{g:C1("g",{"clip-path":"url(#casita-house-clip)"},a2),sp:A2(120,22)},glow:{g:S2,sp:A2(40,12)}};C1("ellipse",{cx:22,cy:80,rx:6,ry:3.2,style:"fill: var(--blush)"},R.blush.g),C1("ellipse",{cx:98,cy:80,rx:6,ry:3.2,style:"fill: var(--blush)"},R.blush.g),R.bangEls=[C1("rect",{x:-2.6,y:-16,width:5.2,height:12,rx:2.6},R.bang.g),C1("circle",{cx:0,cy:1,r:2.8},R.bang.g)],C1("path",{d:"M-7,-2.5Q-2.5,-2.5 -2.5,-7M2.5,-7Q2.5,-2.5 7,-2.5M7,2.5Q2.5,2.5 2.5,7M-2.5,7Q-2.5,2.5 -7,2.5",fill:"none",stroke:I,"stroke-width":2.4,"stroke-linecap":"round"},R.vein.g),R.dotEls=[0,1,2].map(C=>C1("circle",{cx:48+C*12,cy:-10,r:0},R.dots.g));for(let C of[45,-45])C1("rect",{x:-9,y:-3,width:18,height:6,rx:3,fill:I,transform:"rotate("+C+")"},R.bandage.g);R.cloudBody=C1("path",{d:"M-16,4a7,7 0 0,1 2,-13.6a9,9 0 0,1 17,-2.6a7,7 0 0,1 12,6.2a5.6,5.6 0 0,1 -1,10Z"},R.cloud.g),R.rain=[0,1,2].map(C=>C1("rect",{x:-9+C*9,y:8,width:2,height:5,rx:1},R.cloud.g)),R.dreamEls={a:C1("circle",{cx:96,cy:8,r:2.6},R.dream.g),b:C1("circle",{cx:103,cy:-2,r:4.2},R.dream.g),c:C1("circle",{cx:116,cy:-22,r:15},R.dream.g),icon:C1("path",{fill:I,d:""},R.dream.g)};let $5={heart:"M116,-15.5l-6.4,-6.4a4,4 0 0,1 6.4,-4.9a4,4 0 0,1 6.4,4.9Z",sun:"M116,-26.5a4.5,4.5 0 1,0 0.01,0ZM116,-34v3M116,-13v3M104,-22h3M125,-22h3M107.5,-30.5l2,2M122.5,-15.5l2,2M107.5,-13.5l2,-2M122.5,-28.5l2,-2",bulb:"M116,-31a6.5,6.5 0 0,1 4,11.6v2.4h-8v-2.4a6.5,6.5 0 0,1 4,-11.6ZM112.5,-15h7v2.4h-7Z",house:"M107.5,-14v-8.5l8.5,-8l8.5,8v8.5Z"};R.ringEls=[0,1].map(()=>C1("path",{d:"M-10,-4A12,12 0 0,1 10,-4",fill:"none","stroke-width":2.4,"stroke-linecap":"round"},R.rings.g)),R.scanEl=C1("rect",{x:0,y:0,width:120,height:10,fill:I,opacity:.12},R.scan.g);let z={blush:0,bang:0,vein:0,dots:0,bandage:0,cloud:0,dream:0,rings:0,scan:0,glow:0},u5=0,c5=1,Z5=-9,h2="heart",S5=0;function r5(){Z5=a,R.bang.sp.x=0,R.bang.sp.v=0}function s3(C){let H=A.bodyColor;for(let o1 of Object.keys(z))R[o1].sp.t=z[o1];let e=a-Z5<1.2;R.bang.sp.t=e?1:0;for(let o1 of Object.keys(z))M5(R[o1].sp,Math.min(C,1/30));let o=o1=>Math.max(0,R[o1].sp.x);R.blush.g.setAttribute("opacity",(t(o("blush"))*(.42+.08*Math.sin(a*1.9))).toFixed(3));let Z=o("bang");R.bang.g.setAttribute("transform","translate(108 "+(-14-1.5*Math.sin(a*5)).toFixed(2)+") rotate(12) scale("+Z.toFixed(3)+")"),R.bangEls.forEach(o1=>o1.setAttribute("fill",H)),R.bang.g.style.display=Z<.01?"none":"";let h=o("vein");R.vein.g.setAttribute("transform","translate(84 44) scale("+(h*(1+.18*(.5+.5*Math.sin(a*9.4)))).toFixed(3)+")"),R.vein.g.style.display=h<.01?"none":"";let _=o("dots");R.dotEls.forEach((o1,q1)=>{let K1=t(a%2.4/.4-q1);o1.setAttribute("r",(3*_*m(K1)).toFixed(2)),o1.setAttribute("fill",H)});let D=o("bandage");R.bandage.g.setAttribute("transform","translate(76 26) rotate(-8) scale("+D.toFixed(3)+")"),R.bandage.g.style.display=D<.01?"none":"";let h1=o("cloud");R.cloud.g.setAttribute("transform","translate("+(60+3*Math.sin(a*.6)).toFixed(2)+" -26) scale("+h1.toFixed(3)+")"),R.cloud.g.style.display=h1<.01?"none":"",R.cloudBody.setAttribute("fill",w2.cloud),R.rain.forEach((o1,q1)=>{let K1=(a*1.3+q1*.37)%1;o1.setAttribute("y",(8+K1*14).toFixed(2)),o1.setAttribute("opacity",(1-K1).toFixed(2)),o1.setAttribute("fill",w2.cloud)});let L1=o("dream");if(R.dream.g.style.display=L1<.01?"none":"",L1>=.01){R.dream.g.setAttribute("opacity",t(L1).toFixed(3));let o1=1.2*Math.sin(a*1.7);R.dreamEls.a.setAttribute("r",(2.6*t(L1*3)).toFixed(2)),R.dreamEls.b.setAttribute("r",(4.2*t(L1*3-1)).toFixed(2)),R.dreamEls.c.setAttribute("r",(15*t(L1*3-2)).toFixed(2)),R.dreamEls.c.setAttribute("cy",(-22+o1).toFixed(2));for(let q1 of["a","b","c"])R.dreamEls[q1].setAttribute("fill",H);R.dreamEls.icon.setAttribute("d",$5[h2]),R.dreamEls.icon.setAttribute("transform","translate(0 "+o1.toFixed(2)+")"),R.dreamEls.icon.setAttribute("opacity",t(L1*3-2).toFixed(2)),R.dreamEls.icon.setAttribute("stroke",h2==="sun"?I:"none"),R.dreamEls.icon.setAttribute("stroke-width","2")}let g1=o("rings");R.rings.g.style.display=g1<.01?"none":"",g1>=.01&&(S5+=C*c5,R.ringEls.forEach((o1,q1)=>{let K1=(S5/.8+q1*.5)%1,T9=1+.9*K1,k7=q1?1:-1;o1.setAttribute("transform","translate("+(60+k7*30)+" "+(22-8*K1)+") rotate("+k7*38+") scale("+T9.toFixed(3)+")"),o1.setAttribute("stroke",H),o1.setAttribute("opacity",(g1*(1-K1)).toFixed(3))}));let x1=o("scan");if(R.scan.g.style.display=x1<.01?"none":"",x1>=.01){let o1=a/1.6%1;R.scanEl.setAttribute("y",(-10+o1*130).toFixed(2)),R.scanEl.setAttribute("opacity",(.14*x1).toFixed(3))}let v2=o("glow");if(S2.style.display=v2<.01?"none":"",v2>=.01){let o1=A.get("body.x")||0,q1=A.get("body.y")||0,K1=1+.04*Math.sin(a*7)*Math.sin(a*2.3);S2.setAttribute("cx",(60+o1).toFixed(2)),S2.setAttribute("cy",(64+q1).toFixed(2)),S2.setAttribute("rx",(110*v2*K1).toFixed(2)),S2.setAttribute("ry",(100*v2*K1).toFixed(2))}let T2=A.get("body.x")||0,a5=A.get("body.y")||0,A5=1/(1+Math.max(0,-a5)/55);Q2.setAttribute("cx",(60+T2).toFixed(2)),Q2.setAttribute("rx",(54*A5*(A.get("body.sx")||1)).toFixed(2)),Q2.setAttribute("ry",(4.6*A5).toFixed(2)),Q2.setAttribute("opacity",(.9*A5).toFixed(3))}let f2=[],l2=-9,v3={heart:1.9,z:2.6,sparkle:.9,star:2.2,steam:1.2,puff:1.1,tear:1.1,note:1.8,dot:1};function V1(C,H,e){H=H||{};for(let h=f2.length-1;h>=0;h--)f2[h]<=a&&f2.splice(h,1);let o=H.count||1;if(!e&&f2.length+o>7)return!1;if(O&&!e){if(a-l2<.5)return!1;l2=a}A.emit(C,H);let Z=H.life||v3[C]||2;for(let h=0;h<o;h++)f2.push(a+Z*1.15);return!0}let K2=A.layer("posture",{priority:5}),N=A.layer("sig",{priority:10}),$1=A.layer("sigp",{priority:10,post:!0}),d1=A.layer("act",{priority:20}),M2=A.layer("actp",{priority:20,post:!0}),D1=A.layer("react",{priority:30}),P2=A.layer("reactp",{priority:30,post:!0}),X1=A.layer("mood",{priority:32}),m2=A.layer("sys",{priority:35}),p1=A.layer("talk",{priority:40}),d=A.layer("drag",{priority:60});for(let C of[N,$1,d1,M2,D1,P2,X1,m2]){let H=C.add;C.add=(e,o)=>H(v5(e),o)}let v=A.layer("dragp",{priority:60,post:!0}),p=A.layer("weather",{priority:31});{let C=p.add;p.add=(H,e)=>C(v5(H),e)}let S={Happy:{"body.sy":.02},Grinning:{"body.sy":.02},Grateful:{"body.y":.5},DeadAss:{"body.sy":-.02},Devious:{"eyeL.ang":8,"eyeR.ang":8,"body.L":-.035},Alert:{"body.sy":.04,"eyeL.s":.1,"eyeR.s":.1},Scared:{"body.sy":-.05,"body.y":2,"eyeL.s":-.12,"eyeR.s":-.12},Angry:{"body.sy":.04,"eyeL.ang":12,"eyeR.ang":12},Hurt:{"body.sy":-.03,"body.rot":-4},Sad:{"body.sy":-.03,"body.y":1.5,"eyeL.y":2.5,"eyeR.y":2.5,"eyeL.top":.16,"eyeR.top":.16,"eyeL.ang":-12,"eyeR.ang":-12},NoInternet:{"body.rot":3},Pleading:{"body.rot":-5,"eyeL.shine":1,"eyeR.shine":1},Focusing:{"eyeL.ang":-6,"eyeR.ang":-6},Sleeping:{"body.sy":-.03,"body.y":1},Initializing:{"body.A":-.4*N5[1],"body.B":-.4*N5[2]}},y={Loving:"heart",Dead:"cross",Hurt:"cross",Initializing:"none",Angry:"half",Sleeping:"half",WTF:"half",Devious:"half",Smiling:"low",Grateful:"low",DeadAss:"wink",Winking:"wink",WinkingSmile:"wink",Pleading:"big"},W=C=>y[C]||"circle";function j(C){let H=4/C;A.spring("color",{k:H*H,c:2*H})}let K=C=>{let H={};for(let e in C)H["mouth."+e]=C[e];return H},a1=(C,H)=>K({tY:H,tR:C,tA:C,tH:-C,tD:0,bY:H,bR:C,bA:C,bH:C,bD:0,tongue:0,s:1,rot:0}),b=(C,H)=>K({tY:C-3,tR:H,tA:H,tH:0,tD:0,bY:C+3,bR:H,bA:H,bH:0,bD:0,tongue:0}),l={system:null,acute:null,flavor:null,auto:"Normal",autoAt:-99,flavorCool:0,lastFlavor:null,miss:!1,source:"auto"},F=V.autonomous,$="Normal",Z1=0,_1={};function w(C,H,e){l.acute=Object.assign({id:C,until:a+H},e||{})}function h5(){return l.system?(l.source=l.system.tag,l.system.id):l.acute&&a<l.acute.until?(l.source="react",l.acute.id):(l.acute=null,l.source="mood",g.asleep?"Sleeping":l.flavor&&q<l.flavor.until?l.flavor.id:(l.flavor=null,l.miss?"Sad":l.auto))}function s2(C,H){H=H||{};let e=$;if(e===C)return;j(C==="Sleeping"?1.5:C==="Sad"||e==="Sad"?.6:C==="Angry"||C==="Hurt"||C==="Scared"?.12:e==="Sleeping"?.8:.3),W(e)!==W(C)&&!H.noBlink&&A.blink({close:80,hold:70,open:140}),A.setExpression(C,{spring:H.spring}),e==="Loading"&&(A.setState("dot.s",0,0),A.layer("dotOff",{priority:98}).set({"dot.s":0}).ttl(250)),$=C,Z1=a,_1={},K2.clear(),S[C]&&K2.add(S[C]),t5(C,e,H),M.onExpression?.(C)}function t5(C,H,e){H==="Sleeping"&&C!=="Sleeping"&&!e.quiet&&e.startle&&(A.impulse({y:-200*c,sy:3}),r5(),A.blink({double:!0})),C==="Angry"&&(A.impulse({sy:2.4*c,sx:1.2*c}),A.layer("flush",{priority:33}).set({"body.L":-.06}).weight(1).weight(0,420),V1("puff",{count:2,x:60,y:6})),C==="Sad"&&A.impulse({sy:-1.6*c,y:30*c}),(C==="Happy"||C==="Grinning"||C==="Loving")&&!e.noHop&&i5(.9),C==="Loving"&&V1("heart",{count:3,x:60,y:2,spread:60}),C==="Dead"&&A.impulse({sy:-3.5*c,rot:60*c}),C==="Alert"&&(A.impulse({y:-110*c,sy:1.8*c}),r5()),(C==="Winking"||C==="WinkingSmile")&&V1("sparkle",{x:104,y:56,life:.5,color:A.bodyColor})}let E0=A.layer("hop",{priority:55,post:!0}),q2={on:!1,t0:0,H:6};function i5(C){C=(C||1)*c,!(q2.on&&a-q2.t0<.5)&&Object.assign(q2,{on:!0,t0:a,H:6*C+1.5})}function k4(){if(E0.clear(),!q2.on)return;let C=a-q2.t0,H=.12,e=.17+.03*q2.H,o=.18,Z=0,h=0;if(C<H)h=-.06*m(C/H);else if(C<H+e){let _=(C-H)/e;Z=-q2.H*4*_*(1-_),h=_<.5?.06*(1-_*2):.03*(_-.5)*2}else if(C<H+e+o){let _=(C-H-e)/o;h=-.07*Math.sin(Math.PI*Math.min(1,_*1.6))*(1-_)}else{q2.on=!1,A.impulse({sy:1.2});return}E0.add({"body.y":Z,"body.sy":h*c,"body.sx":-h*.5*c})}let D0=-9;function w4(){let C=l.auto,H=e=>C===e?.08:0;return g.I>.75-H("Angry")?"Angry":g.I>.45-H("WTF")-H("DeadAss")?g.E<.4?"DeadAss":"WTF":g.A>.85-H("Scared")&&g.V<-.2+H("Scared")?"Scared":g.V>.7-H("Loving")&&g.F>.6-H("Loving")?"Loving":g.V>.6-H("Grinning")-H("Happy")&&g.A>.6-H("Grinning")-H("Happy")?C==="Happy"||C==="Grinning"?C:Math.random()<.5?"Grinning":"Happy":g.V>.4-H("Happy")-H("Smiling")?g.A>.45?"Happy":"Smiling":g.V<-.4+H("Sad")?"Sad":g.V<-.15+H("Problem")&&g.C>.5-H("Problem")?"Problem":"Normal"}function P4(){if(q-D0<.7)return;D0=q;let C=w4();if(C!==l.auto&&q-l.autoAt>=2.5&&(l.auto=C,l.autoAt=q),F&&!l.flavor&&q>l.flavorCool&&(l.auto==="Normal"||l.auto==="Smiling"||l.auto==="Happy")&&g.V>.3&&!g.asleep&&Math.random()<.12){let H=["Cheeky","Silly","UwU","WinkingSmile"].concat(g.I>.1?["Devious"]:[]).filter(o=>o!==l.lastFlavor),e=u(H);l.flavor={id:e,until:q+n(4,7)},l.lastFlavor=e,l.flavorCool=l.flavor.until+8}}let x={inside:!1,type:"mouse",cx:0,cy:0,wx:60,wy:60,vx:0,vy:0,speed:0,samples:[],press:null,lastMove:-9,leftAt:null,hoverHouse:!1,lean:1},j2=0;function G1(C){if(!(k1.forced&&!C)){if(j2=q,k1.on&&J0(),S1.name==="fallAsleep"&&(C||!k1.forced)){o5(null),X2(C==="sudden"?"startle":"gentle");return}g.asleep&&C&&X2(C==="sudden"?"startle":"gentle")}}function B4(C,H,e){if(e=e||0,C<-e||C>120+e||H>116.88+e||H<-e)return!1;if(H>=52)return!0;let o=Math.abs(C-60)-2;return H>=o-e*1.4}function x3(C,H,e){let[o,Z]=A.worldToHouse(C,H),h=B4(o,Z,e||0),_=null;return h&&(Math.hypot(o-33,Z-65.88)<9.5||Math.hypot(o-87,Z-65.88)<9.5?_="eye":_=Z<52?"roof":"face"),{hit:h,hx:o,hy:Z,region:_}}function f5(C,H,e){let o=x.samples,Z=a-C,h=0,_=0;for(let D=1;D<o.length;D++){if(o[D].t<Z)continue;let h1=e==="y"?o[D].y-o[D-1].y:o[D].x-o[D-1].x,L1=Math.max(.001,o[D].t-o[D-1].t);if(Math.abs(h1)<2||Math.abs(h1)/L1<H)continue;let g1=Math.sign(h1);_&&g1!==_&&h++,_=g1}return h}function I0(C){let H=x.samples,e=a-C,o=0;for(let Z=1;Z<H.length;Z++)H[Z].t>=e&&(o+=Math.hypot(H[Z].x-H[Z-1].x,H[Z].y-H[Z-1].y));return o}let S1={name:null,t0:0,dur:0,run:null,end:null,st:{}};function o5(C,H,e,o){if(S1.end&&S1.name)try{S1.end(S1.st,!0)}catch(Z){console.error(Z)}if(D1.clear(),P2.clear(),!C){Object.assign(S1,{name:null,run:null,end:null,st:{}});return}Object.assign(S1,{name:C,t0:a,dur:H,run:e,end:o,st:{}})}function T4(C){if(D1.clear(),P2.clear(),!S1.name)return;let H=a-S1.t0;if(H>=S1.dur){let e=S1.end,o=S1.st;S1.name=null,S1.run=null,S1.end=null,e&&e(o,!1);return}S1.run&&S1.run(H,H/S1.dur,S1.st,C)}let I1=(C,H)=>{try{M.onInteract(C,t(H))}catch{}},g2=[];function N0(C){G1("sudden");let H=C&&C.hx!=null?C.hx<60?1:-1:Math.random()<.5?1:-1;A.impulse({rot:H*150*c,sy:-2.8*c,sx:1.4*c}),A.squash(.08*c,90),A.blink({close:50,hold:60,open:120}),W1.pokesTotal++;for(let Z=g2.length-1;Z>=0;Z--)a-g2[Z]>4&&g2.splice(Z,1);let e=!g2.length||a-g2[g2.length-1]>1.5;if(g2.push(a),n1(e?{V:.03,A:.2,I:.08,C:.1}:{V:-.05,A:.15,I:.18}),I1("poke",C&&C.region==="eye"?.5:e?.25:.35),C&&C.region==="eye"){n1({I:.1}),w("Hurt",.7),B1(t1("ouch"),{short:!0});return}C&&C.region==="roof"&&V1("star",{x:C.hx,y:C.hy-8,life:.7,s0:.6,s1:.2,vy:-20},!0);let o=g2.length;o===1?w("Alert",.9):o===2?w(Math.random()<.5?"Cheeky":"Silly",1.5):o<=4?(w("WTF",1.5),o===4&&B1(t1("hey"),{short:!0})):o<=7?(w("Angry",2.5),o===5&&B1(t1("stop"),{short:!0}),V1("puff",{count:2,x:60,y:4})):R4()}function R4(){w("WTF",3.4),B1(t1("hmph"),{short:!0}),o5("sulk",3.4,C=>{let H=m(C/.4)*(1-m((C-2.9)/.5));D1.add({"body.rot":-8*H,"eyeL.top":.5*H,"eyeR.top":.5*H,"face.x":-4*H}),C>2.6&&C<3.1&&D1.add({"eyeR.top":-.4})},()=>{g2.length=0})}function F4(){G1("sudden"),g2.pop(),I1("poke",.1),Math.random()<.7?(w("Winking",1.1),Q(.15,()=>A.wink("R"))):w("Devious",1.1)}let B2=null;function _4(){G1("gentle"),B2={t0:a},w("Smiling",30),z.blush=1}function E4(){if(!B2)return;let C=m((a-B2.t0)/1);D1.add({"body.sy":-.12*C*c,"body.sx":.06*C*c}),n1({V:.002,F:7e-4,I:-.002})}function W0(){if(!B2)return;let C=a-B2.t0;B2=null,z.blush=0,A.impulse({sy:3.2*c}),n1({V:.15,F:.04,I:-.1}),I1("hug",r(C/3,.3,1)),g.F>.4?(w("Loving",2),V1("heart",{count:3,x:60,y:0,spread:70})):g.F<.2?w("Sweating",1.5):w("Happy",1.4),C>2&&B1(u(t1("hugLines")),{short:!0})}let P1={on:!1,t0:0,last:-9,px:0,total:0,heartAt:0,reportAt:0};function u3(C){P1.on||(P1.on=!0,P1.t0=a,P1.heartAt=a+1.5,P1.reportAt=a+.5,G1("gentle")),P1.last=a,P1.px=C}function D4(C){if(!P1.on)return;if(a-P1.last>1){P1.on=!1,z.blush=0,g.F>.5&&a-P1.t0>1.5&&(w("Pleading",.8),B1(t1("more"),{short:!0}),Q(.8,()=>w("Happy",1.2)));return}let H=a-P1.t0;P1.total+=C,W1.petsSeconds+=C,n1({V:.12*C,A:-.05*C,F:.05*C,I:-.15*C}),a>=P1.reportAt&&(P1.reportAt=a+.5,I1("pet",.15)),z.blush=t(H/.8);let e=m(H/.5),o=r((P1.px-(60+(A.get("body.x")||0)))/40,-1,1)*5;D1.add({"eyeL.bot":.5*e,"eyeR.bot":.5*e,"eyeL.y":4*e,"eyeR.y":4*e,"body.rot":o}),O||P2.add({"body.x":.25*Math.sin(a*2*Math.PI*24),"body.sy":.012*Math.sin(a*2.4)}),w(H>4?"Loving":"Smiling",1.2),H>1.5&&a>=P1.heartAt&&(V1("heart",{x:n(30,90),y:-2,count:1}),P1.heartAt=a+.8)}let b1={on:!1,t0:0,last:-9,px:60,over:!1,refract:0,reportAt:0};function c3(C){a<b1.refract||(b1.on||(b1.on=!0,b1.t0=a,b1.over=!1,b1.reportAt=a+.5,G1("sudden")),b1.last=a,b1.px=C)}function I4(C){if(!b1.on)return;if(a-b1.last>.6){b1.on=!1,b1.over||w("Happy",1.2);return}let H=a-b1.t0;if(n1({V:.15*C,A:.2*C,E:-.03*C,F:.01*C,I:-.05*C}),a>=b1.reportAt&&(b1.reportAt=a+.5,I1("tickle",.2)),H>6&&!b1.over){b1.over=!0,b1.on=!1,b1.refract=a+4,I1("tickle",.6),w("Dead",2.6),B1(t1("tooMuch"),{short:!0}),Q(2.6,()=>w("Happy",1.4));return}w("Grinning",.8);let e=r((60+(A.get("body.x")||0)-b1.px)/30,-1,1)*6;D1.add({"eyeL.bot":.45,"eyeR.bot":.45,"eyeL.y":3,"eyeR.y":3,"body.rot":e}),O||P2.add({"body.y":1.2*Math.sin(a*2*Math.PI*8),"body.rot":1.2*Math.sin(a*2*Math.PI*6.5)}),z.blush=1,H>3&&Math.random()<C*1.2&&V1("tear",{x:u([22,98]),y:70,count:1})}let N1={since:null,on:!1,t0:0,until:0,cool:0,id:null};function U0(){return!x.inside||x.press||!x.hoverHouse||x.type!=="mouse"||P1.on||b1.on||B2||U.on||k.on||S1.name||l.acute&&l.acute.tag!=="shy"||l.system||g.I>.3||g.asleep||$==="Angry"||$==="Sleeping"}function N4(){if(N1.on){if(a>N1.until||U0()||x.speed>400){N1.on=!1,N1.cool=a+14,l.acute&&l.acute.tag==="shy"&&(l.acute=null);return}let C=a-N1.t0;z.blush=1,X1.add({"eyeL.bot":.35,"eyeR.bot":.35,"eyeL.y":2.5,"eyeR.y":2.5,"body.rot":C<.6?-2:1});return}if(U0()||x.speed>150||a<N1.cool){N1.since=null;return}N1.since==null&&(N1.since=a),a-N1.since>.8&&(N1.on=!0,N1.t0=a,N1.until=a+2.6,N1.since=null,N1.id=g.F>.6?"Loving":g.F<.3?"Sweating":"Smiling",w(N1.id,2.6,{tag:"shy"}),G1("gentle"))}let U={on:!1,bx0:0,by0:0,wx0:0,wy0:0,vx:0,vy:0,revs:[],shaken:!1,lastDir:0,t0:0,tx:null,ty:null},k={on:!1,x:0,y:0,vx:0,vy:0,rot:0,vr:0,impacts:0,hard:0,shaken:!1,settleT:0},W4=[[0,116.88],[0,64],[5.3,51.6],[54.7,2.2],[60,0],[65.3,2.2],[114.7,51.6],[120,64],[120,116.88]];function G3(C,H,e,o,Z,h){let _=e*Math.PI/180,D=Math.cos(_),h1=Math.sin(_),L1=Math.tan((h||0)*Math.PI/180),g1=1/0,x1=-1/0,v2=1/0,T2=-1/0;for(let[a5,b7]of W4){let A5=(a5-60)*o,o1=(b7-116.88)*Z;A5+=o1*L1;let q1=60+C+A5*D-o1*h1,K1=116.88+H+A5*h1+o1*D;q1<g1&&(g1=q1),q1>x1&&(x1=q1),K1<v2&&(v2=K1),K1>T2&&(T2=K1)}return{x0:g1,x1,y0:v2,y1:T2}}function $0(){return{L:e1.x0+4,R:e1.x0+e1.w-4,T:e1.y0+5,F:116.88}}function G0(C){let H=$0(),e=0,o=0;return C.x0<H.L?e=H.L-C.x0:C.x1>H.R&&(e=H.R-C.x1),C.y0<H.T?o=H.T-C.y0:C.y1>H.F&&(o=H.F-C.y1),[e,o]}let y2=(C,H)=>{let e=A.get(C);return e??H},Q0=A.layer("clampp",{priority:99,post:!0}),G5=[0,0];function U4(){let C=y2("body.x",0)-G5[0],H=y2("body.y",0)-G5[1],[e,o]=G0(G3(C,H,y2("body.rot",0),y2("body.sx",1),y2("body.sy",1),y2("body.skew",0)));G5=[e,o],Q0.clear(),(e||o)&&Q0.add({"body.x":G5[0],"body.y":G5[1]})}function Q3(C,H){G1("sudden"),k.on=!1,Object.assign(U,{on:!0,bx0:A.get("body.x")||0,by0:A.get("body.y")||0,wx0:C,wy0:H,vx:0,vy:0,revs:[],shaken:!1,lastDir:0,t0:a,tx:null,ty:null}),A.spring("body.x",{k:260,c:22}),A.spring("body.y",{k:260,c:22}),T.classList.add("grabbing"),w("Alert",99),n1({A:.2,C:.1})}function Z3(C,H,e,o){let Z=U.bx0+(C-U.wx0),h=Math.min(0,U.by0+(H-U.wy0)),_=r(e/80,-15,15)*c,D=1+r(Math.abs(o)/2e3,0,.12)*c,[h1,L1]=G0(G3(Z,h,_,1,D,0));Z+=h1,h+=L1,U.tx=Z,U.ty=h,U.vx=e,U.vy=o;let g1=Math.hypot(e,o),x1=Math.sign(e);for(Math.abs(e)>900&&x1&&x1!==U.lastDir&&(U.lastDir&&U.revs.push(a),U.lastDir=x1);U.revs.length&&a-U.revs[0]>.9;)U.revs.shift();U.revs.length>=4&&(U.shaken=!0),U.shaken?w("Dead",99):g1>1800?w("Scared",99):g1>300&&g.V>.3?w("Grinning",99):a-U.t0>.4&&w("Alert",99),g1>1800&&n1({A:.01})}function $4(){if(!U.on)return;d.set({"body.x":U.tx!=null?U.tx:U.bx0,"body.y":U.ty!=null?U.ty:U.by0,"body.rot":r(U.vx/80,-15,15)}),v.add({"body.sy":r(Math.abs(U.vy)/2e3,0,.12)*c,"body.sx":-r(Math.abs(U.vy)/4e3,0,.06)*c});let C=r(U.vx/500,-1,1),H=r(U.vy/500,-1,1);A.lookAt(60+(A.get("body.x")||0)+C*80,66+(A.get("body.y")||0)+H*80)}function z0(){if(!U.on)return;U.on=!1,T.classList.remove("grabbing");let C=e1.s,H=r(U.vx,-3e3,3e3)/C,e=r(U.vy,-3e3,3e3)/C,o=U.shaken;if(o&&(n1({V:-.25,A:.4,E:-.05,F:-.05,I:.35}),I1("shake",.8)),O||Math.hypot(H,e)<60/C){d.clear(),K0(),o?q0(n(2.5,4)):w(g.V>.3?"Happy":"Normal",.8);return}d.clear(),Object.assign(k,{on:!0,x:A.get("body.x")||0,y:A.get("body.y")||0,vx:H,vy:e,rot:A.get("body.rot")||0,vr:H*.9,impacts:0,hard:0,shaken:o,settleT:0}),n1({V:.05,A:.3,E:-.02,C:.1}),o||I1("throw",r(Math.hypot(U.vx,U.vy)/3e3,.2,1)),w(Math.hypot(U.vx,U.vy)>1800?"Scared":g.V>.3?"Grinning":"Alert",99)}function G4(C){if(!k.on)return;let H=e1.s,e=2600/H,o=$0();k.vy+=e*C,k.x+=k.vx*C,k.y+=k.vy*C,k.vr*=Math.exp(-C*1.2),k.rot+=k.vr*C,k.rot=r(k.rot,-25*c,25*c);let Z=G3(k.x,k.y,k.rot,y2("body.sx",1),y2("body.sy",1),0),h=D=>{let h1=Math.abs(D)*H;h1>300&&(k.impacts++,A.impulse({sy:-Math.min(h1/4e3,.14)*30*c,sx:Math.min(h1/4e3,.14)*15*c}),h1>1400?(k.hard++,k.hard>=2&&(w("Hurt",1),n1({V:-.25,A:.4,I:.35}),k.hard===2&&I1("shake",.5),z.bandage=1,Q(4,()=>{z.bandage=0}))):h1>700&&w("Alert",.6))};Z.x0<o.L&&(k.x+=o.L-Z.x0,k.vx<0&&(h(k.vx),k.vx=-k.vx*.45,k.vr=-k.vr*.6)),Z.x1>o.R&&(k.x-=Z.x1-o.R,k.vx>0&&(h(k.vx),k.vx=-k.vx*.45,k.vr=-k.vr*.6)),Z.y0<o.T&&(k.y+=o.T-Z.y0,k.vy<0&&(h(k.vy),k.vy=-k.vy*.45));let _=!1;Z.y1>o.F&&(k.y-=Z.y1-o.F,_=!0,k.vy>0&&(h(k.vy),k.vy=-k.vy*.45,k.vx*=.85,k.vr*=.6,Math.abs(k.vy)*H<160&&(k.vy=0)),k.rot*=.82),k.y=Math.min(0,k.y),_&&Math.abs(k.vy)<1&&(k.settleT+=C),A.setState("body.x",k.x,k.vx),A.setState("body.y",k.y,k.vy),d.set({"body.x":k.x,"body.y":k.y,"body.rot":k.rot}),k.settleT>.25&&Math.abs(k.vx)*H<120&&(k.on=!1,d.clear(),K0(),k.shaken?q0(n(2.5,4)):k.hard>=2?w("Hurt",1.2):w(g.V>.2?"Happy":"Normal",1))}function K0(){A.spring("body.x",{k:60,c:14}),A.spring("body.y",{k:60,c:14}),Q(2.2,()=>{A.spring("body.x",null),A.spring("body.y",null)},"home"),A.lookAt(null)}function q0(C){w("Dead",C),V1("star",{count:3,orbit:{cx:60,cy:-6,r:22,ry:.27,speed:4.5},life:C},!0),o5("dizzy",C,(H,e)=>{D1.add({"body.rot":4*Math.sin(H*3.8),"body.x":1.5*Math.sin(H*3.8+1.57)}),H>C-.5&&D1.add({"body.rot":8*Math.sin(H*44)*(1-e)*4})})}function X(C,H,e,o,Z){let h="n_"+H;if(C[h]==null){C[h]=a+n(e,o);return}a>=C[h]&&(Z(),C[h]=a+n(e,o))}function v1(C,H){let e=C[H+"T"];return e==null?-1:a-e}let j0={Normal(C){N.add({"body.rot":1*Math.sin(a*.75+$3[0]),"mouth.s":.04*Math.sin(a*1.2)}),X(C,"sq",8,15,()=>{C.sqT=a});let H=v1(C,"sq");H>=0&&H<.6&&N.add({"eyeL.bot":.15*f(H/.6),"eyeR.bot":.15*f(H/.6)})},Smiling(C){z.blush=Math.max(z.blush,.75),X(C,"sq",4,8,()=>{C.sqT=a});let H=v1(C,"sq");H>=0&&H<.15&&N.add({"eyeL.bot":.12,"eyeR.bot":.12}),N.add({"body.y":-1.2*(.5+.5*Math.sin(a*2.8)),"body.rot":Q4(2)})},Happy(C){X(C,"hop",2.5,4.5,()=>i5(.7)),X(C,"sp",3,6,()=>V1("sparkle",{x:u([8,112]),y:36,life:.45,spread:0,color:A.bodyColor})),N.add({"mouth.bH":1.5*Math.sin(a*2)})},Grinning(C){X(C,"g",3,6,()=>{C.gT=a,C.gD=n(.4,.7)});let H=v1(C,"g");H>=0&&H<C.gD&&(O||$1.add({"body.y":.8*Math.sin(a*2*Math.PI*8)}),N.add({"eyeL.bot":.25,"eyeR.bot":.25,"mouth.tR":1,"mouth.bR":1,"mouth.tA":1,"mouth.bA":1}),z.blush=Math.max(z.blush,1))},Grateful(C){X(C,"bow",5,8,()=>{C.bowT=a});let H=v1(C,"bow");if(H>=0&&H<1.1){let e=f(H/1.1);N.add({"body.sy":-.04*e,"body.y":1.5*e,"face.y":1*e})}X(C,"h",4,7,()=>V1("heart",{x:60,y:-4,life:1.8}))},Loving(C){z.blush=Math.max(z.blush,1);let H=P1.on?.52:C.per||(C.per=n(.7,.85)),e=a%H/H,o=e<.13?.18*Math.sin(e/.13*Math.PI):e>.29&&e<.42?.12*Math.sin((e-.29)/.13*Math.PI):0;$1.add({"eyeL.s":o*c,"eyeR.s":o*c}),N.add({"body.rot":2*Math.sin(a*2.5)}),X(C,"h",.9,1.6,()=>V1("heart",{x:u([6,114]),y:40,vx:0,vy:-20,life:1.6,spread:6}))},UwU(C){z.blush=Math.max(z.blush,1),X(C,"side",4,7,()=>{C.side=-(C.side||1)}),N.add({"body.rot":6*(C.side||1)}),X(C,"mlem",3,5,()=>{C.mlemT=a});let H=v1(C,"mlem");H>=0&&H<1&&N.add({"mouth.rot":5*Math.sin(H*2*Math.PI*2),"mouth.bH":1.5*Math.sin(H*12.6)})},Winking(C,H){X(C,"w",4,7,()=>{C.wT=a,V1("sparkle",{x:104,y:56,life:.4,color:A.bodyColor})});let e=v1(C,"w");if(e>=0&&e<.32){let o=e<.08?e/.08:1-(e-.08)/.24;N.add({"eyeR.top":.5*t(o),"body.rot":3*t(o)}),H&&N.add({"mouth.rot":-3*t(o)})}N.add({"body.rot":H?3:4})},WinkingSmile(C){j0.Winking(C,!0)},Cheeky(C){X(C,"tilt",2,4,()=>{C.tilt=-(C.tilt||1)}),N.add({"body.rot":3*(C.tilt||1)}),X(C,"wig",1.6,3,()=>{C.wigT=a});let H=v1(C,"wig");H>=0&&H<.8&&N.add({"mouth.tgX":2*Math.sin(H*2*Math.PI*3)}),X(C,"blep",6,10,()=>{C.blepT=a});let e=v1(C,"blep");e>=0&&e<.24&&N.set({"mouth.tongue":e<.12?0:1.25})},Silly(C){N.add({"body.rot":2.5*Math.sin(a*6.3)}),X(C,"swap",5,9,()=>{C.swap=!C.swap});let H=Math.sin(a*7.5);C.swap?N.add({"eyeL.y":-6+2*H,"eyeR.y":6-2*H}):N.add({"eyeR.y":2*H,"eyeL.y":-2*H}),X(C,"wig",1.2,2.4,()=>{C.wigT=a});let e=v1(C,"wig");e>=0&&e<.8&&N.add({"mouth.tgX":2*Math.sin(e*2*Math.PI*4.5)})},DeadAss(C){N.add({"mouth.tgX":1*Math.sin(a*1.9)}),X(C,"slump",6,10,()=>{C.slumpT=a,A.blink({close:150,hold:380,open:250})});let H=v1(C,"slump");H>=0&&H<1.4&&N.add({"body.sy":-.02*f(H/1.4)}),X(C,"sigh",10,16,()=>{C.sighT=a,Q(.7,()=>V1("puff",{x:84,y:88,vy:-6,vx:10,life:.9,s0:.3,s1:.8}))});let e=v1(C,"sigh");e>=0&&e<1.6&&N.add({"body.sy":e<.7?.03*m(e/.7):.03-.06*m((e-.7)/.9)*(1-m((e-1.2)/.4))})},Devious(C){X(C,"slide",1.2,2.2,()=>{C.dir=C.dir===1?-1:1}),N.add({"eyeL.x":3*(C.dir||1),"eyeR.x":3*(C.dir||1)}),X(C,"heh",4,7,()=>{C.hehT=a});let H=v1(C,"heh");H>=0&&H<.9&&(N.add({"mouth.s":.1*f(H/.9),"eyeL.top":.12,"eyeR.top":.12}),!O&&H>.4&&$1.add({"body.y":-1*Math.abs(Math.sin((H-.4)*Math.PI*6))}))},Alert(){N.add({"mouth.s":.06*Math.sin(a*5)})},Scared(C){O||$1.add({"body.x":.6*Math.sin(a*113)*Math.sin(a*7.1)}),X(C,"look",2,3,()=>{C.lookT=a,C.lookDir=Math.random()<.5?-1:1});let H=v1(C,"look");H>=0&&H<.6&&N.add({"eyeL.x":4*C.lookDir,"eyeR.x":4*C.lookDir}),N.add({"body.L":.02*Math.sin(a*6)}),a-Z1>2&&X(C,"drop",2.5,4,()=>V1("tear",{x:108,y:60,vy:6,gravity:40,life:1.2}))},Angry(C){O||$1.add({"body.x":.4*Math.sin(a*75)}),N.add({"body.L":-.03*(.5+.5*Math.sin(a*3.1))}),z.vein=1,X(C,"huff",3,5,()=>A.impulse({sy:-2.2*c})),X(C,"steam",1.4,2.4,()=>{V1("puff",{x:30,y:34,vx:-10,vy:-18,spread:0}),V1("puff",{x:90,y:34,vx:10,vy:-18,spread:0})}),x.inside&&!U.on&&!l.system&&A.lookAt(x.wx,x.wy,{lean:x.lean})},Hurt(C){X(C,"w",1,2,()=>{C.wT=a});let H=v1(C,"w");H>=0&&H<.3&&(N.add({"eyeL.s":-.1,"eyeR.s":-.1}),O||$1.add({"body.x":.5*Math.sin(a*88)*(1-H/.3)})),a-Z1>1&&(z.bandage=1),X(C,"tear",1.5,3,()=>V1("tear",{x:u([33,87]),y:76}))},Dead(C){N.add({"body.rot":4*Math.sin(a*3.8),"body.x":1.5*Math.cos(a*3.8)}),X(C,"tw",3,6,()=>{C.twT=a,C.twE=Math.random()<.5?"eyeL.s":"eyeR.s"});let H=v1(C,"tw");H>=0&&H<.08&&N.add({[C.twE]:.15}),(!C.stars||a>C.stars)&&(V1("star",{count:3,orbit:{cx:60,cy:-6,r:22,ry:.27,speed:4.5},life:2.6},!0),C.stars=a+2.5)},Sad(C){X(C,"sigh",9,13,()=>{C.sighT=a});let H=v1(C,"sigh");H>=0&&H<2.3&&N.add({"body.sy":H<.9?.025*m(H/.9):.025-.055*m((H-.9)/1.4)*(1-m((H-1.9)/.4)),"eyeL.top":H>.9?.1:0,"eyeR.top":H>.9?.1:0}),X(C,"tear",6,10,()=>V1("tear",{x:u([30,90]),y:74,vy:2,gravity:30,life:1.6})),x.inside&&!U.on&&!l.system&&A.lookAt(60+(60-x.wx),160,{lean:.3*(x.lean||0)}),z.cloud=a-Z1>20?1:0},Problem(C){X(C,"tilt",1.5,2.5,()=>{C.tilt=-(C.tilt||1)}),N.add({"body.rot":6*(C.tilt||1)}),X(C,"scr",4,7,()=>{C.scrT=a});let H=v1(C,"scr");H>=0&&H<.3&&!O&&$1.add({"body.rot":2*Math.sin(a*63)}),X(C,"up",2,4,()=>{C.upT=a});let e=v1(C,"up");e>=0&&e<.9&&N.add({"eyeL.x":3,"eyeR.x":3,"eyeL.y":-3,"eyeR.y":-3})},NoInternet(C){X(C,"up",2,4,()=>{C.upT=a});let H=v1(C,"up");H>=0&&H<.8&&N.add({"eyeL.x":3.5,"eyeR.x":3.5,"eyeL.y":-3,"eyeR.y":-3}),X(C,"reach",6,9,()=>{C.reachT=a});let e=v1(C,"reach");e>=0&&e<.9&&N.add({"body.sy":.06*f(e/.9),"body.rot":2*f(e/.9)}),C.cyc==null&&(C.cyc=Math.floor(a/1.9));let o=Math.floor(a/1.9);o!==C.cyc&&(C.cyc=o,Math.random()<.6&&A.blink({double:!0}))},Pleading(C){O||$1.add({"eyeL.s":.03*Math.sin(a*37.7),"eyeR.s":.03*Math.sin(a*37.7+.6)}),X(C,"pp",3,5,()=>{C.ppT=a});let H=v1(C,"pp");H>=0&&H<.5&&N.add({"body.y":-1.5*Math.abs(Math.sin(H*Math.PI*4))})},Sweating(C){X(C,"drop",5,8,()=>V1("tear",{x:92,y:40,vy:8,vx:4,gravity:60,life:1.1})),X(C,"laugh",2.5,4.5,()=>{C.lT=a});let H=v1(C,"laugh");H>=0&&H<.5&&!O&&$1.add({"body.y":.4*Math.sin(a*56)})},WTF(C){N.add({"body.rot":-.6*Math.sin(a*.6)}),X(C,"dt",6,10,()=>{C.dtT=a});let H=v1(C,"dt");H>=0&&H<.9&&(H<.2&&N.set({"eyeL.top":0,"eyeR.top":0}),N.add({"body.rot":3*Math.sin(H*Math.PI*4)*(H>.2?1:0)})),X(C,"dots",7,11,()=>{C.dotsT=a});let e=v1(C,"dots");z.dots=e>=0&&e<2.6?1:0},Focusing(C){let H=a%3.2/3.2,e=H<.25?m(H/.25):H<.62?1:H<.85?1-m((H-.62)/.23):0;N.set({"acc.bubbles":e}),N.add({"eyeL.x":3,"eyeR.x":3,"eyeL.y":-2.5,"eyeR.y":-2.5,"body.rot":1.5*Math.sin(a*1.57),"mouth.tgX":1.5*Math.sin(a*9.4)}),X(C,"lb",5,8,()=>A.blink({close:110,hold:400,open:180}))},Loading(C){let H=_=>{let D=(a-_*.12)%.9/.9;return D<.45?Math.sin(D/.45*Math.PI):0},e=H(0),o=H(1),Z=H(2);N.add({"eyeL.y":-5*e*c,"eyeL.s":.15*e,"dot.dy":-5*o*c,"dot.s":.15*o,"eyeR.y":-5*Z*c,"eyeR.s":.15*Z}),X(C,"bl",4,7,()=>{C.blT=a});let h=v1(C,"bl");h>=0&&h<.18&&N.add({"eyeL.open":-.8,"eyeR.open":-.8,"dot.s":-.7})},Initializing(){z.scan=1,N.add({"body.L":.03*Math.sin(a*5)})},Sleeping(C){let e=a%4.2/4.2,Z=e<.43?m(e/.43):1-m((e-.43)/.57);N.add({"mouth.s":-.3+.5*Z,"body.sy":.02*Z}),X(C,"dream",8,20,()=>{C.dreamT=a,C.dreamK=Math.random()<.12?"bubble":u(["flutter","smile","mumble","giggle"]),C.dreamK==="bubble"&&(h2=u(Object.keys($5)))});let h=v1(C,"dream");if(h>=0){let _=C.dreamK;_==="flutter"&&h<.36&&N.add({"eyeL.top":-.18*Math.abs(Math.sin(h*Math.PI/.12)),"eyeR.top":-.18*Math.abs(Math.sin(h*Math.PI/.12))}),_==="smile"&&h<.6&&N.set({"mouth.tH":10,"mouth.bH":14,"mouth.tR":12,"mouth.bR":14,"mouth.tA":12,"mouth.bA":14}),_==="mumble"&&h<.8&&N.add({"mouth.s":.2*Math.sin(h*Math.PI*6),"mouth.rot":6*Math.sin(h*9)}),_==="giggle"&&h<.5&&N.add({"body.y":-1.5*Math.abs(Math.sin(h*Math.PI*4))}),z.dream=_==="bubble"&&h<4.5?1:0}}};function Q4(C){return x.inside?r((x.wx-60-(A.get("body.x")||0))/80,-1,1)*C*(x.lean||0)*A.gazeLean.habituation:0}let Y0={lookAround:{dur:[2,3.5],cd:6,w:()=>10*(1+g.C)*X0("look"),run(C,H,e){(!e.n||C>e.n)&&(e.n=C+n(.4,.9),e.p=[60+n(-1,1)*140,60+n(-1,1)*90]),A.lookAt(e.p[0],e.p[1])},end(){A.lookAt(null)}},glanceAtCursor:{dur:[.8,1.5],cd:4,w:()=>x.inside?8*(1+g.F):0,run(C,H,e){A.lookAt(x.wx,x.wy,{lean:x.lean}),!e.b&&C>.3&&(e.b=1,Math.random()<.15&&A.blink({close:120,hold:500,open:200}))},end(){A.lookAt(null)}},lookUp:{dur:[1.6,2.6],cd:25,w:()=>(O5()!=="clear"?3:1)*(1+g.C),run(){let C=C0();A.lookAt(C[0],C[1],{lean:.5})},end(){A.lookAt(null)}},peekRoof:{dur:[1.5,1.5],cd:20,w:()=>3*(1+g.C),run(C,H){let e=f(H);A.lookAt(60,-300),d1.add({"body.sy":.03*e,"body.rot":2*e})},end(){A.lookAt(null)}},yawn:{dur:[2.2,2.2],cd:25,w:()=>2*(g.E<.4?4:1)*X0("yawn")*(U1()?1.5:1),run(C){let H=C<.9?i(6,17,m(C/.9)):C<1.3?17:i(17,6,m((C-1.3)/.5)),e=C<1.8?m(C/.3):1-m((C-1.8)/.4);d1.set(a1(H,88),e),d1.add({"eyeL.top":.3*e,"eyeR.top":.3*e,"eyeL.bot":.3*e,"eyeR.bot":.3*e,"body.sy":.06*e*c})},end(){A.blink({close:140,hold:300,open:240})}},stretch:{dur:[1.6,1.6],cd:30,w:()=>2,run(C){C<.6?d1.add({"body.sy":.1*m(C/.6)*c,"body.sx":-.04*m(C/.6)}):C>1.2&&!O&&M2.add({"body.x":.6*Math.sin(C*90)})},start(){Q(.62,()=>A.impulse({sy:-2*c}))}},hum:{dur:[3,5],cd:18,w:()=>g.V>.3?4*(1+g.V):0,run(C,H,e){d1.add({"mouth.s":.06*Math.sin(C*15.7),"body.rot":3*Math.sin(C*6.28)*f(H)}),(!e.n||C>e.n)&&(e.n=C+n(.9,1.5),V1("note",{x:114,y:72,vx:12,vy:-14}))}},whistle:{dur:[2.5,2.5],cd:25,w:()=>g.V>.2?2:0,run(C,H,e){let o=f(H)>.2?1:f(H)*5;d1.set(a1(5,86),o),d1.add({"body.sx":.02*o}),(!e.n||C>e.n)&&(e.n=C+1.1,V1("note",{x:112,y:76,vx:14,vy:-12}))}},sneeze:{dur:[1.8,1.8],cd:60,w:()=>.6,run(C,H,e){if(C<.9){let o=C<.3?.5:1;d1.add({"eyeL.top":.25*o,"eyeR.top":.25*o,"eyeL.bot":.25*o,"eyeR.bot":.25*o,"body.sy":.06*m(C/.9)*c}),d1.set(a1(4+4*o,88))}else e.c||(e.c=1,A.impulse({sy:-4*c,y:60*c}),V1("dot",{x:60,y:92,count:3,vy:10,spread:30,gravity:80,life:.7,color:I}),B1(t1("achoo"),{short:!0})),d1.add({"body.rot":6*Math.sin((C-.9)*22)*(1-(C-.9)/.9)*c})}},shiver:{dur:[1.2,1.2],cd:40,w:()=>.8*(U1()&&g.E<.3?3:1)*(O5()==="wind"||O5()==="snow"?2.5:1),run(){O||M2.add({"body.x":.7*Math.sin(a*88)}),d1.add({"body.sy":-.03,"eyeL.top":.2,"eyeR.top":.2,"eyeL.bot":.2,"eyeR.bot":.2})}},daydream:{dur:[4,6],cd:30,w:()=>g.V>=0?3:0,start(){h2=u(Object.keys($5))},run(C,H){let e=f(H)>.15?1:f(H)/.15;A.lookAt(140,-120),d1.add({"eyeL.bot":.35*e,"eyeR.bot":.35*e}),d1.set({"acc.bubbles":t(C/.7)*(1-m((H-.85)/.15))}),z.dream=H>.15&&H<.9?1:0},end(){A.lookAt(null),z.dream=0}},peekaboo:{dur:[2,2],cd:45,w:()=>x.inside&&g.F>.5?2:0,run(C,H,e){C<1?d1.add({"eyeL.bot":.5,"eyeR.bot":.5,"eyeL.y":4,"eyeR.y":4,"body.sy":-.05}):e.p||(e.p=1,i5(.8),A.lookAt(x.wx,x.wy,{lean:x.lean}),r5())},end(){A.lookAt(null)}},tinyDance:{dur:[3,4],cd:40,w:()=>g.E>.6&&g.V>.5?1.5:0,run(C,H,e){let o=Math.floor(C*2);d1.add({"body.rot":7*(o%2?1:-1)*c,"eyeL.bot":.5,"eyeR.bot":.5,"eyeL.y":4,"eyeR.y":4}),e.b!==o&&(e.b=o,A.impulse({y:-70*c}))}},suspicious:{dur:[1.2,1.2],cd:20,w:()=>g.I>.2||g.C>.6?1.5:0,run(C,H){let e=f(H)>.2?1:f(H)*5;x.inside&&A.lookAt(x.wx,x.wy,{lean:x.lean}),d1.add({"eyeR.top":.35*e,"body.rot":-2*e})},end(){A.lookAt(null)}},headBob:{dur:[2,4],cd:15,w:()=>g.E>.4?3:0,run(C){d1.add({"face.y":1.2*Math.sin(C*9.4),"body.rot":1.5*Math.sin(C*9.4)})}},sigh:{dur:[1.6,1.6],cd:14,w:()=>q-j2>20?4:0,run(C){d1.add({"body.sy":C<.7?.03*m(C/.7):.03-.06*m((C-.7)/.9)})},start(){Q(.7,()=>V1("puff",{x:84,y:88,vx:10,vy:-6,life:.9,s0:.3,s1:.8}))}}},z4=new Set(["Sleeping","Dead","Hurt","Initializing","Loading","Angry","Scared"]);function X0(C){return q-j2<20?1:C==="look"?2:C==="yawn"?3:1}let l1={act:null,name:null,t0:0,dur:0,st:{},nextAt:2,cool:{}};function S3(C){let H=Y0[C];return H?(Y2(!0),l1.act=H,l1.name=C,l1.t0=a,l1.dur=n(H.dur[0],H.dur[1]),l1.st={},l1.cool[C]=q+H.cd,H.start&&H.start(l1.st),!0):!1}function Y2(C){if(!l1.act)return;let H=l1.act;l1.act=null,l1.name=null,d1.clear(),M2.clear(),H.end&&H.end(l1.st,C),l1.nextAt=q+n(1.5,4)}function K4(){if(d1.clear(),M2.clear(),l1.act){let C=a-l1.t0;C>=l1.dur||l.system||l.acute||U.on||k.on||s.on?Y2(C<l1.dur):l1.act.run(C,C/l1.dur,l1.st)}}function q4(){if(!F||l1.act||q<l1.nextAt||l.system||l.acute||U.on||k.on||s.on||P.phase||g.asleep||k1.on||z4.has($))return;let C=[],H=0;for(let[o,Z]of Object.entries(Y0)){if((l1.cool[o]||0)>q)continue;let h=Z.w();h>0&&(C.push([o,h]),H+=h)}if(!H){l1.nextAt=q+2;return}let e=Math.random()*H;for(let[o,Z]of C)if(e-=Z,e<=0){S3(o);return}}let k1={on:!1,t0:0,nodT:0,forced:!1,jerked:!1};function j4(){if(!F||g.asleep||l.system||P.phase||s.on||U.on||k.on||B2)return;let C=(U1()?.5:1)*(g.E<.2?.6:1),H=q-j2;!k1.on&&H>45*C&&!l.acute&&(k1.on=!0,k1.t0=q,k1.nodT=q+1,Y2(!0)),k1.on&&(H>60*C||k1.forced&&q-k1.t0>6)&&X4(!0)}function Y4(){if(!k1.on)return;let C=q-k1.t0,H=.25+.15*(.5+.5*Math.sin(a*1.3));X1.add({"eyeL.top":H,"eyeR.top":H});let e=(q-k1.t0)%4/4;e<.4&&X1.add({"body.sy":-.03*m(e/.4),"body.y":1.5*m(e/.4)}),e>.4&&e<.45&&X1.add({"eyeL.top":-H,"eyeR.top":-H}),C>0&&e>.4&&!k1.jerked&&(k1.jerked=!0,A.impulse({y:-40*c})),e<.4&&(k1.jerked=!1)}function J0(){k1.on=!1,k1.forced=!1,X1.clear()}let C7=0;function X4(C){k1.on=!1,k1.forced=!1,X1.clear(),o5("fallAsleep",3.2,H=>{let e=[.2,.35,.25,.45,.4,.5],o=Math.min(e.length-1,Math.floor(H/.45));if(D1.add({"eyeL.top":e[o],"eyeR.top":e[o],"body.sy":-.03*m(H/3)}),H>1&&H<2.4){let Z=H-1,h=Z<.6?i(6,15,m(Z/.6)):i(15,8,m((Z-.6)/.8));D1.set(a1(h,88))}},(H,e)=>{e||(g.asleep=!0,C7=q+n(100,160)*(U1()?2.5:1),C&&I1("ignore",.5))}),w("Normal",3.2)}function X2(C,H){let e=g.asleep;if(g.asleep=!1,j2=q,e&&!H&&I1("wake",C==="startle"?.8:.4),C==="startle"){s2("Alert",{startle:!0}),w("Alert",1.1),n1({A:.3});return}w("Smiling",2.6),o5("wakeGentle",2.6,o=>{if(o<.6)D1.add({"body.sy":.08*m(o/.6)*c});else if(o<1.4){let Z=(o-.6)/.8;D1.set(a1(i(6,14,f(Z)),88),f(Z))}D1.add({"eyeL.bot":.3*(1-m((o-2)/.6)),"eyeR.bot":.3*(1-m((o-2)/.6))})})}let s={on:!1,kind:"line",vis:[],t0:0,total:0,text:"",shownChars:-1,idx:-1,done:null,short:!1,nextBob:0,nextLook:0,f:1};function H7(C){let H=C.toLowerCase(),e=[],o=F1==="fr"?{eau:[.8,.75,1.25],ou:[.4,.65,1.25],au:[.8,.75,1.25],eu:[.6,1,1.25],on:[.8,.75,1.25],an:[.55,.95,1.25],en:[.55,.95,1.25],in:[.55,.95,1.25],ch:[.35,.95,.7],oi:[.75,.85,1.25],ai:[.6,1,1.25]}:{oo:[.4,.65,1.25],ee:[.35,1.15,1.25],ea:[.4,1.1,1.25],ou:[.6,.8,1.25],ow:[.7,.75,1.25],oa:[.75,.75,1.25],ai:[.6,1,1.25],ay:[.6,1,1.25],th:[.25,1,.7],sh:[.35,.85,.7],ch:[.35,.9,.7],ng:[.3,1,.7]},Z=0;for(;Z<H.length;){let D=H[Z],h1=1,L1=.25,g1=1,x1=80*.7,v2=null,T2=H.substr(Z,3),a5=H.substr(Z,2);o[T2]?(h1=3,[L1,g1]=o[T2],x1=80*o[T2][2]):o[a5]?(h1=2,[L1,g1]=o[a5],x1=80*o[a5][2]):"aàâ".includes(D)?(L1=1,x1=100):"eéèêë".includes(D)?(L1=.6,x1=100):"iîïy".includes(D)?(L1=.35,g1=1.15,x1=100):"oôö".includes(D)?(L1=.8,g1=.75,x1=100):"uùûü".includes(D)?(L1=.4,g1=.65,x1=100):"mbp".includes(D)?(L1=0,g1=.95,x1=60):"fv".includes(D)?L1=.15:"lndtsz".includes(D)?L1=.3:"kgrjcqx".includes(D)?(L1=.35,g1=.95):D===" "||D===`
`?(L1=.1,x1=40):",;:".includes(D)?(L1=0,x1=180):".!?…".includes(D)?(L1=0,x1=350,v2=D):/[0-9]/.test(D)?(L1=.5,x1=90):/[a-zà-ÿ]/.test(D)||(L1=.1,x1=30),L1=t(L1*n(.9,1.1)),e.push({len:h1,open:L1,wf:g1,d:x1/1e3,kind:v2}),Z+=h1}let h=0,_=0;for(let D of e)D.t=h,D.ci=_,h+=D.d,_+=D.len;return e}let V7={Happy:1,Grinning:1,Loving:1,Grateful:.9,Winking:.9,WinkingSmile:.8,Smiling:.8,UwU:.7,Cheeky:.6,Silly:.6,Devious:.6,Normal:.5,Sweating:.3,Loading:.3,Initializing:.3,Alert:0,Focusing:0,Dead:0,Sleeping:0,WTF:-.1,DeadAss:-.1,Problem:-.5,NoInternet:-.6,Pleading:-.7,Scared:-.7,Angry:-.8,Hurt:-.8,Sad:-.9},z3=C=>String(C||"").replace(/\s+/g," ").trim();function L7(C){M1.hidden=!1,M1.classList.remove("out"),M1.classList.toggle("short",C)}function h3(C,H){let e=V7[$]!=null?V7[$]:.4,o=1+C*7,Z=14*H*(1+.12*e),h=86-1.5*e;p1.set(K({tY:h,tR:Z,tA:Z,tH:-o+3.5*e,tD:0,bY:h,bR:Z,bA:Z,bH:o+3.5*e,bD:0,tongue:0,s:1,rot:0,talk:0}))}function B1(C,H){if(H=H||{},C=z3(C),!C||s.on&&s.kind==="stream"&&H.short)return;let e=H7(C),o=e.length?e[e.length-1].t+e[e.length-1].d:.5,Z=Math.max(.8,Math.min(5,C.length/38)),h=Math.min(1,Z/o);if(h<1)for(let _ of e)_.t*=h,_.d*=h;Object.assign(s,{on:!0,kind:"line",f:h,vis:e,t0:a,total:e.length?e[e.length-1].t+e[e.length-1].d:.5,text:C,shownChars:-1,idx:-1,done:H.done||null,short:!!H.short,nextBob:a+.3,nextLook:a}),L7(s.short),C2.textContent="",M.srSpeech.textContent=C,A.spring("mouth",{k:700,c:40}),A.setState("mouth.tongue",Math.min(y2("mouth.tongue",0),.2),0),H1("bubble"),Y2(!0)}function Q5(){s.on=!1,p1.clear(),s.playback&&(s.playback=null),C2.textContent=s.text,s.text?z5():M1.hidden=!0,A.spring("mouth",null),A.blink({close:80,hold:40,open:140});let C=s.short?1.4:Math.min(9,2.5+.06*s.text.length);if(s.text&&Q(C,()=>{M1.classList.add("out"),Q(.22,()=>{s.on||(M1.hidden=!0)},"bubble")},"bubble"),s.done){let H=s.done;s.done=null,H()}}function J4(){let C=a-s.t0;if(C>=s.total){Q5();return}let H=s.idx<0?0:s.idx;for(;H+1<s.vis.length&&s.vis[H+1].t<=C;)H++;let e=s.vis[H];H!==s.idx&&(s.idx=H,e7(e));let o=e.ci+e.len;o!==s.shownChars&&(s.shownChars=o,C2.textContent=s.text.slice(0,o),z5());let Z=e.open,h=e.wf;if(s.f<.8){let _=M7(H,C);Z=_[0],h=_[1]}h3(Z,h)}function e7(C){C.kind?(A.blink({close:70,hold:40,open:120}),C.kind==="!"&&A.impulse({y:-60*c}),C.kind==="?"&&A.impulse({rot:30*c})):a>s.nextBob&&C.open>.5&&(A.impulse({rot:(Math.random()<.5?-1:1)*14*c}),s.nextBob=a+n(.25,.45))}function M7(C,H){let e=s.vis[C],o=0,Z=0,h=0;for(let D=Math.max(0,C-2);D<=Math.min(s.vis.length-1,C+2);D++)o=Math.max(o,s.vis[D].open),Z+=s.vis[D].wf,h++;return[!!e.kind||e.open===0&&e.d>.05?0:o*(.5+.5*Math.abs(Math.sin(H*Math.PI*7.5))),h?Z/h:1]}let C9=C=>{let H=s.vis,e=0,o=H.length-1;for(;e<o;){let Z=e+o+1>>1;H[Z].ci<=C?e=Z:o=Z-1}return e};function H9(C){H1("bubble"),Object.assign(s,{on:!0,kind:"stream",text:"",vis:[],rev:0,budget:0,pauseUntil:0,mouth:0,mbudget:0,mpauseUntil:0,replay:!1,final:!1,mode:C.expectAudio?"silent":"flap",playback:null,holdUntil:a+(C.hold||0),rate:38,shownChars:-1,idx:-1,done:null,short:!1,nextBob:a+.3,nextLook:a,waitAudioUntil:1/0,lastLevel:0,quietSince:a,blinked:!0,t0:a}),C2.textContent="",M1.hidden=!0,A.spring("mouth",{k:700,c:40}),A.setState("mouth.tongue",Math.min(y2("mouth.tongue",0),.2),0),Y2(!0)}function f3(C){s.text=C,s.vis=H7(C),s.rev>C.length&&(s.rev=C.length)}function V9(C){if(!C)return;let H=s.text+C;s.text||(H=H.replace(/^\s+/,"")),f3(H.replace(/\s+/g," "))}function L9(C,H){let e=z3(C),o=z3(s.text);if(e&&e!==o)if(!o)f3(e);else if(e.startsWith(o))f3(e);else{let Z=0;for(;Z<Math.min(e.length,o.length)&&e[Z]===o[Z];)Z++;s.rev=Math.min(s.rev,Z),f3(e)}s.final=!0,s.done=H||null,s.mode==="silent"&&(s.waitAudioUntil=a+8),M.srSpeech.textContent=s.text}function e9(){let C=s.text;if(a>=s.holdUntil&&a>=s.pauseUntil&&s.rev<C.length)for(s.budget+=H2*s.rate;s.budget>=1&&s.rev<C.length;){s.budget-=1;let H=C[s.rev];s.rev++;let e=C[s.rev];if(".!?…".includes(H)&&(e===void 0||e===" ")){s.pauseUntil=a+.22,s.budget=0;break}if(",;:".includes(H)){s.pauseUntil=a+.08,s.budget=0;break}}if(s.rev!==s.shownChars&&(s.shownChars=s.rev,s.rev>0&&(M1.hidden&&L7(!1),C2.textContent=C.slice(0,s.rev),z5())),s.mode==="flap"){let H=s.replay?s.mouth:s.rev;if(s.replay&&a>=s.mpauseUntil&&s.mouth<C.length)for(s.mbudget+=H2*38;s.mbudget>=1&&s.mouth<C.length;){s.mbudget-=1;let o=C[s.mouth++];if(".!?…".includes(o)){s.mpauseUntil=a+.22,s.mbudget=0;break}}let e=H>=C.length||a<s.holdUntil;if(C.length&&!e){let o=C9(Math.max(0,H-1));o!==s.idx&&(s.idx=o,e7(s.vis[o]));let Z=a<(s.replay?s.mpauseUntil:s.pauseUntil),[h,_]=M7(o,a-s.t0);h3(Z?0:h,_)}else p1.clear()}else if(s.mode==="audio"){let H=s.playback,e=H?H.level():0;e>.55&&s.lastLevel<=.55&&a>s.nextBob&&(A.impulse({rot:(Math.random()<.5?-1:1)*14*c}),s.nextBob=a+n(.25,.45)),e>.08?(s.quietSince=a,s.blinked=!1):!s.blinked&&a-s.quietSince>.4&&(s.blinked=!0,A.blink({close:70,hold:40,open:120})),s.lastLevel=e,h3(e,.9+.2*e)}else p1.clear();if(s.final&&s.rev>=C.length&&s.mode!=="audio"&&(!C||s.mode==="flap"&&(!s.replay||s.mouth>=C.length)&&a>=s.pauseUntil||s.mode==="silent"&&a>s.waitAudioUntil))return Q5()}function M9(){p1.clear(),s.on&&(s.kind==="line"?J4():e9(),s.on&&a>=s.nextLook&&!U.on&&(s.nextLook=a+n(1,2),x.inside||A.lookAt(60+n(-8,8),140+n(-6,6))))}function z5(){if(M1.hidden)return;let C=M1.offsetWidth,H=M1.offsetHeight,e=A.houseToWorld(88,12),o=A.houseToWorld(32,12),[Z,h]=L5(e[0],e[1]),_=!1;if(Z+6+C>e1.pxW-10){let D=L5(o[0],o[1]);D[0]-6-C>10?(Z=D[0]-6-C,h=D[1],_=!0):Z=r(e1.pxW/2-C/2,10,e1.pxW-C-10)}else Z=Z+6;h=r(h-H-8,8,e1.pxH-H-8),M1.classList.toggle("flip",_),M1.style.transform="translate("+Z.toFixed(1)+"px,"+h.toFixed(1)+"px)"}let P={phase:null,t0:0,voice:!1,level:0,nod:0,source:"panel",typingAt:-9,offline:!1,satState:"idle"},r7=!1;function g3(C=0){H1("conv");let H=()=>{P.phase=null,P.voice=!1,z.rings=0,c5=1,l.system&&l.system.tag!=="offline"&&(l.system=P.offline?{id:"NoInternet",tag:"offline"}:null),A.lookAt(null)};C>0?Q(C,H,"conv"):H()}function r9(){M1.hidden||(H1("bubble"),M1.classList.add("out"),Q(.22,()=>{s.on||(M1.hidden=!0)},"bubble"))}function K3(){s.on&&(s.on=!1,s.done=null,p1.clear(),A.spring("mouth",null)),r9()}function t7(C){H1("conv"),K3(),G1("sudden"),Y2(!0),z1.on=!1,P.phase="listen",P.t0=a,P.voice=!1,P.level=0,P.source=C.source||"panel",C.wake?(l.system={id:"Alert",tag:"pipe"},A.impulse({y:-90*c}),r5(),Q(.6,()=>{P.phase==="listen"&&(l.system={id:"Focusing",tag:"listen"})},"conv")):l.system={id:"Focusing",tag:"listen"}}function q3(){P.phase!=="wait"&&(z.rings=0,c5=1,P.phase="wait",P.t0=a,Y2(!0))}function t9(){H1("conv"),z1.fired.clear(),z1.on=!1,K3(),G1("sudden"),A.squash(.03,150),A.blink(),n1({V:.05,A:.1,F:.01,C:.15}),P.phase=null,q3()}function j3(C,H,e){H1("conv"),P.phase="talk",P.voice=!1,z.rings=0,l.system={id:C&&E.includes(C)?C:"Normal",tag:"chat"},H9({expectAudio:H,hold:e})}let i9={Loving:.2,Grateful:.2,Happy:.15,Grinning:.15,Smiling:.1,Sad:-.2,Angry:-.15,Hurt:-.2,Scared:-.1};function Y3(C){let H=E.includes(C.emotion)?C.emotion:"Normal";s.on&&s.kind==="stream"&&P.phase==="talk"?l.system={id:H,tag:"chat"}:j3(H,!!C.expectAudio,C.expectAudio?1.2:.25),n1({V:i9[H]||0}),(H==="Loving"||H==="Grateful")&&n1({F:.03,I:-.2}),C.success&&V1("sparkle",{count:6,x:60,y:30,spread:110,life:.6,color:A.bodyColor},!0),L9(C.text,()=>{C.done?.(),g3(4)})}function o9(C){(!s.on||s.kind!=="stream")&&(j3(l.system?.id,!0,0),s.final=!0),s.mode="audio",s.playback=C,s.holdUntil=0;let H=s.text.length-s.rev,e=C.duration();s.rate=H>0?Number.isFinite(e)&&e>.6?r(H/(e-.3),10,38):16:38}function a9(){!s.on||s.kind!=="stream"||(s.playback=null,s.rev=s.text.length,s.final=!0,Q5())}function A9(){!s.on||s.kind!=="stream"||(s.playback=null,s.mode="flap",s.holdUntil=0,s.rate=38,s.rev>0&&(s.replay=!0,s.mouth=0,s.mbudget=0))}function n9(C,H,e){s.on&&s.kind==="stream"&&P.phase==="talk"?H&&E.includes(H)&&(l.system={id:H,tag:"chat"}):j3(H,!!e,0),V9(C)}function d9(C){K3(),H1("conv"),P.phase="error",z.rings=0,l.system={id:C.offline?"NoInternet":"Problem",tag:"pipe"},C.offline&&void 0,Q(.2,()=>B1(C.text||(C.offline?t1("oopsNet"):t1("notUnderstood")),{short:!0}),"conv-say"),g3(C.offline?3:2.2)}function p9(C=0){s.on&&s.kind==="stream"||g3(C)}function l9(C){C!==P.offline&&(P.offline=C,C?P.phase||(l.system={id:"NoInternet",tag:"offline"}):(l.system&&l.system.tag==="offline"&&(l.system=null),w("Grinning",1.6),m9()))}function m9(){let C=0,H=()=>{A.accessory("wifi",C%2?null:1),C++,C<6?Q(.18,H):A.accessory("wifi",null)};H()}function f6(){}let g5=null;function X3(){H1("sat-pending");let C=g5;g5=null,C&&Y3({text:C.text,emotion:C.emotion,expectAudio:!1})}function s9(C){let H=P.satState;P.satState=C,C!==H&&(C==="listening"?(g5=null,t7({wake:!0,source:"satellite"})):C==="processing"?(P.phase!=="talk"&&q3(),P.source="satellite"):C==="responding"?(P.source="satellite",g5?X3():s.on&&s.kind==="stream"||(P.phase="murmur",P.t0=a,l.system={id:l.system&&l.system.tag==="chat"?l.system.id:"Normal",tag:"chat"})):C==="idle"&&(g5?X3():(P.phase==="murmur"||P.phase==="listen"||P.phase==="wait")&&g3(P.phase==="murmur"?.6:0)))}function v9(C,H,e){if(E.includes(C)){if(e&&(P.phase==="murmur"||P.satState==="responding")){Y3({text:H||"",emotion:C,expectAudio:!1});return}if(e&&(P.phase==="wait"||P.phase==="listen"||P.satState==="processing"||P.satState==="listening")){g5={emotion:C,text:H||""},l.system={id:C,tag:"chat"},P.phase="hold",H1("sat-pending"),Q(2.5,X3,"sat-pending");return}P.phase||(G1("sudden"),w(C,3),H&&Q(.25,()=>B1(H)))}}function x9(){m2.clear();let C=r7&&a-P.typingAt<2&&!!M.input()?.value;if(P.phase==="listen"){z.rings=1,c5=P.voice?1.9:1;let H=P.level;m2.set({"acc.bubbles":0}).add({"eyeL.s":.06+.06*H,"eyeR.s":.06+.06*H,"body.sy":.02+.03*H,"eyeL.y":-1,"eyeR.y":-1}),m2.set(Object.assign(b(86,10),{"mouth.s":1})),(!P.nod||a>P.nod)&&(P.nod=a+(P.voice?n(.45,.8):n(.8,1.4)),A.impulse({rot:12*c,y:20*c})),P.level*=.9;return}if(z.rings=0,P.phase==="wait"){let H=a-P.t0,e="Focusing";H<.6?(m2.set({"acc.bubbles":0}),A.lookAt(60,240)):H<2.5?e="Loading":H<8?e=Math.floor((H-2.5)/3)%2?"Focusing":"Loading":e="Sweating",l.system={id:e,tag:"chat"},H>.6&&H<.7&&A.lookAt(null);return}if(P.phase==="murmur"){let H=a-P.t0,e=.25+.5*Math.abs(Math.sin(H*Math.PI*3.1))*(.6+.4*Math.sin(H*1.7));s.on||h3(e,1);return}if(!P.phase)if(C||z1.on&&a<z1.until){z1.on&&a<z1.until?(l.system={id:z1.id,tag:"typing"},z1.fn&&z1.fn(a-z1.t0)):(z1.on=!1,l.system={id:"Focusing",tag:"typing"},m2.set({"acc.bubbles":0}).add({"eyeL.s":.05,"eyeR.s":.05}));let H=S9();if(H){let[e,o]=Z2(H[0],H[1]);A.lookAt(e,o,{lean:.25})}G1("gentle")}else l.system&&l.system.tag==="typing"&&(l.system=P.offline?{id:"NoInternet",tag:"offline"}:null,A.lookAt(null),M.input()?.value&&w("Normal",1.2))}let z1={on:!1,id:null,t0:0,until:0,fn:null,fired:new Set},i7=C=>{let H=C<.9?i(6,16,m(C/.9)):C<1.3?16:i(16,6,m((C-1.3)/.6)),e=C<1.9?m(C/.3):1-m((C-1.9)/.3);m2.set(a1(H,88),e),m2.add({"eyeL.top":.3*e,"eyeR.top":.3*e,"eyeL.bot":.3*e,"eyeR.bot":.3*e,"body.sy":.05*e*c})},u9=[["merci",/\b(thanks|thank you|thx)\b/i,"Grateful",1.8,()=>V1("heart",{x:60,y:-4})],["love",/(love you|luv you|adore you|\bxoxo\b)/i,"Loving",2.2,()=>V1("heart",{count:3,x:60,y:0,spread:70})],["vexe",/\b(stupid|dumb|idiot|mean|ugly|useless)\b/i,"Sad",1.8,()=>n1({V:-.1,I:.05})],["dodo",/\b(sleep|sleepy|bedtime|tired|nap)\b/i,"Normal",2.2,null,i7],["lumiere",/\b(light|lights|lamp|turn on)\b/i,"Grinning",2.4,()=>{u5=a+3.2}],["salut",/\b(hello|hi|hey)\b/i,"Happy",1.4,()=>i5(.6)],["wifi",/(wi-?fi|internet|network)/i,"NoInternet",1.6,null]],c9=[["merci",/\bmerci\b/i,"Grateful",1.8,()=>V1("heart",{x:60,y:-4})],["love",/(t['’]aime|t['’]adore|je t['’]kiffe|bisou)/i,"Loving",2.2,()=>V1("heart",{count:3,x:60,y:0,spread:70})],["vexe",/\b(nul|nulle|bête|bete|idiot|idiote|méchant|méchante|moche)\b/i,"Sad",1.8,()=>n1({V:-.1,I:.05})],["dodo",/\b(dodo|dormir|sommeil|fatigu[ée]e?|sieste)\b/i,"Normal",2.2,null,i7],["lumiere",/(lumi[eè]re|lampe|allume|éclaire|eclaire)/i,"Grinning",2.4,()=>{u5=a+3.2}],["salut",/\b(bonjour|salut|coucou|hello)\b/i,"Happy",1.4,()=>i5(.6)],["wifi",/(wi-?fi|internet|réseau)/i,"NoInternet",1.6,null]];function Z9(C){for(let[H,e,o,Z,h,_]of F1==="fr"?c9:u9)if(!(z1.fired.has(H)||!e.test(C))){z1.fired.add(H),Object.assign(z1,{on:!0,id:o,t0:a,until:a+Z,fn:_||null}),h&&h();return}}let K5=null;function S9(){let C=M.input();if(!C)return null;K5||(K5=document.createElement("canvas").getContext("2d"));let H=C.getBoundingClientRect(),e=getComputedStyle(C);if(!K5)return[H.left+H.width/2,H.top+H.height/2];K5.font=e.fontWeight+" "+e.fontSize+" "+e.fontFamily;let o=C.selectionStart==null?C.value.length:C.selectionStart,Z=K5.measureText(C.value.slice(0,o)).width,h=H.left+parseFloat(e.paddingLeft)+Z-C.scrollLeft;return[r(h,H.left,H.right),H.top+H.height/2]}function h9(C){l.system={id:"Initializing",tag:"boot"};let H=A.layer("boot",{priority:36});o5("boot",2.5,e=>{if(z.scan=e<1.6?1:0,e>=.3&&e<1.6){let o=e<.75?.1:1;H.set({"eyeL.s":1,"eyeR.s":1,"eyeL.open":o,"eyeR.open":o}),e>.95&&e<1.15?A.lookAt(-200,60):e>1.15&&e<1.35?A.lookAt(320,60):A.lookAt(null),e>1.4&&!H.blinked&&(H.blinked=!0,A.blink({double:!0}))}e>=1.6&&l.system&&l.system.id==="Initializing"&&(H.clear(),l.system={id:"Normal",tag:"boot"}),e>2.2&&!H.hopped&&(H.hopped=!0,i5(.6))},()=>{H.clear(),z.scan=0,l.system&&l.system.tag==="boot"&&(l.system=null),A.lookAt(null),C&&C()})}function o7(C,H){let e=a,o=x.samples[x.samples.length-1];if(o){let Z=Math.max(.001,e-o.t),h=(C-o.x)/Z,_=(H-o.y)/Z;x.vx=i(x.vx,h,.5),x.vy=i(x.vy,_,.5),x.speed=Math.hypot(x.vx,x.vy)}for(x.samples.push({x:C,y:H,t:e});x.samples.length>60||x.samples.length&&e-x.samples[0].t>1.6;)x.samples.shift()}function a7(C){x.type=C.pointerType||"mouse",x.cx=C.clientX,x.cy=C.clientY;let[H,e]=Z2(C.clientX,C.clientY);x.wx=H,x.wy=e,x.lean=W5(C.clientX,C.clientY),o7(C.clientX,C.clientY),x.lastMove=a,x.mvx=x.vx,x.mvy=x.vy,x.inside||f9(),x.inside=!0,x.leftAt=null;let o=x3(H,e,6);if(x.hoverHouse=o.hit,T.classList.toggle("over",o.hit&&x.type==="mouse"),x.press)return y9(C,o);if(x.type!=="mouse")return;let Z=Math.hypot(H-(60+(A.get("body.x")||0)),e-(66+(A.get("body.y")||0)));x.speed>1500&&Z<80&&!U.on&&!k.on&&a-(x.flybyAt||-9)>3&&(x.flybyAt=a,w("Alert",.5),A.impulse({y:-80*c}),G1("sudden"),n1({A:.15})),o.hit&&o.region==="roof"&&x.speed>60&&x.speed<700&&(f5(1.5,60)>=3||I0(1.2)>250)?u3(H):o.hit&&(o.region==="face"||o.region==="eye")&&f5(.7,400)>=5&&c3(H),o.hit&&!x.wasOver&&n1({V:.05,A:.15,C:.2}),x.wasOver=o.hit,a-(x.lastInputPing||0)>.3&&(x.lastInputPing=a,G1(o.hit?"hover":null))}function f9(){l.miss?(l.miss=!1,w("Alert",.3),Q(.3,()=>w("Happy",1.2))):x.leftAt!=null&&a-x.leftAt>3&&(w("Alert",.3),Q(.3,()=>w("Happy",1)))}function J3(){if(x.press||U.on)return;if(x.inside=!1,x.leftAt=a,x.hoverHouse=!1,x.type!=="mouse"){A.lookAt(null);return}let C=x.wx,H=x.wy;Q(.4,()=>{x.inside||A.lookAt(C+(C-60)*2,H+(H-60))},"leave"),Q(1.2,()=>{x.inside||(A.lookAt(null),F&&!l.system&&S3("lookAround"))},"leave")}let q5={dir:1,next:0};function g9(){x.inside||x.leftAt==null||x.type!=="mouse"||!F||l.system||l.acute||g.asleep||U.on||k.on||a-x.leftAt<3||l.miss||(a>q5.next&&(q5.dir=-q5.dir,q5.next=a+n(1.5,2.5)),X1.add({"body.rot":6*q5.dir*c}))}function A7(C){if(C.button!=null&&C.button>0)return;O1();let[H,e]=Z2(C.clientX,C.clientY);x.wx=H,x.wy=e,x.type=C.pointerType||"mouse",x.samples.length=0,o7(C.clientX,C.clientY);let o=x3(H,e,x.type==="touch"?8:3);if(!o.hit){A.lookAt(H,e),G1("sudden"),n1({C:.15}),H1("look"),Q(1.2,()=>{x.press||A.lookAt(null)},"look");return}C.preventDefault();try{T.setPointerCapture(C.pointerId)}catch{}x.press={id:C.pointerId,t0:a,cx0:C.clientX,cy0:C.clientY,wx0:H,wy0:e,region:o.region,info:o,mode:null,moved:0},Q(.55,()=>{let Z=x.press;Z&&!Z.mode&&Z.moved<6&&(Z.mode="hug",_4())},"press")}function y9(C,H){let e=x.press,o=Math.hypot(C.clientX-e.cx0,C.clientY-e.cy0);if(e.moved=Math.max(e.moved,o),e.mode==="drag"){Z3(x.wx,x.wy,x.vx,x.vy);return}if(e.mode==="pet"){(H.hit||Math.abs(C.clientY-e.cy0)<40)&&u3(x.wx),Math.abs(C.clientY-e.cy0)>60&&(e.mode="drag",Q3(e.wx0,e.wy0),Z3(x.wx,x.wy,x.vx,x.vy));return}if(e.mode==="tickle"){c3(x.wx);return}if(e.mode==="hug")return;let Z=x.type==="touch"?14:6;if(x.type!=="mouse"){let h=C.clientX-e.cx0,_=C.clientY-e.cy0,D=a-e.t0,h1=I0(a-e.t0+.05),L1=o>60&&h1<o*1.15;if(e.region==="roof"&&D<.2&&Math.abs(h)>6&&Math.abs(h)>Math.abs(_)*1.3){e.mode="pet",H1("press"),u3(x.wx);return}if(e.region==="roof"&&!(D>=.2||L1||Math.abs(_)>28))return;if(e.region!=="roof"&&(e.region==="face"||e.region==="eye")&&f5(.7,300)>=3&&o<40){e.mode="tickle",H1("press"),c3(x.wx);return}o>Z&&!(o<24&&f5(.5,200)>=2)&&(e.mode="drag",H1("press"),Q3(e.wx0,e.wy0),Z3(x.wx,x.wy,x.vx,x.vy));return}if(e.region==="roof"&&f5(1.5,40)>=2&&Math.abs(C.clientY-e.cy0)<30){e.mode="pet",H1("press"),u3(x.wx);return}if((e.region==="face"||e.region==="eye")&&f5(.7,300)>=4&&o<40){e.mode="tickle",H1("press"),c3(x.wx);return}o>(e.region==="roof"?Math.max(Z,22):Z)&&(e.mode="drag",H1("press"),Q3(e.wx0,e.wy0),Z3(x.wx,x.wy,x.vx,x.vy))}let j5={t:-9,x:0,y:0};function n7(C){let H=x.press;if(H){x.press=null,H1("press");try{T.releasePointerCapture(C.pointerId)}catch{}if(H.mode==="drag"){a-x.lastMove>.12&&(U.vx=0,U.vy=0),z0();return}if(H.mode==="hug"){W0();return}if(!(H.mode==="pet"||H.mode==="tickle")){if(a-H.t0<.35&&H.moved<8){if(a-j5.t<.3&&Math.hypot(C.clientX-j5.x,C.clientY-j5.y)<30){j5.t=-9,F4();return}j5={t:a,x:C.clientX,y:C.clientY},N0(H.info)}x.type!=="mouse"&&(x.inside=!1,A.lookAt(null))}}}function d7(){if(x.press){let C=x.press;x.press=null,C.mode==="drag"&&z0(),C.mode==="hug"&&W0()}}let y5={ticks:[]};function p7(C){let[H,e]=Z2(C.clientX,C.clientY);if(x3(H,e,6).hit){for(C.preventDefault(),G1("sudden"),y5.ticks.push(a);y5.ticks.length&&a-y5.ticks[0]>1.5;)y5.ticks.shift();A.lookAt(60+(A.get("body.x")||0),66+(C.deltaY>0?300:-300)),H1("wheel"),Q(.5,()=>A.lookAt(null),"wheel"),y5.ticks.length>12&&(y5.ticks.length=0,I1("shake",.3),w("Dead",1.2),V1("star",{count:3,orbit:{cx:60,cy:-6,r:22,ry:.27,speed:4.5},life:1.2},!0))}}function l7(C){if(C.target!==T)return;(C.key===" "||C.key==="Enter")&&(C.preventDefault(),N0({hx:n(30,90),hy:90,region:"face"}));let H={ArrowLeft:[-300,66],ArrowRight:[420,66],ArrowUp:[60,-300],ArrowDown:[60,400]};H[C.key]&&(C.preventDefault(),A.lookAt(H[C.key][0],H[C.key][1]),G1("gentle"),H1("look"),Q(1.2,()=>A.lookAt(null),"look"))}function m7(C){let H=C.touches[0];if(!H)return;O1();let[e,o]=Z2(H.clientX,H.clientY);x3(e,o,8).hit&&C.preventDefault()}function s7(C){x.press&&C.preventDefault()}let v7=C=>C.preventDefault(),x7=C=>{C.relatedTarget||J3()},T1={contactSince:null,awayUntil:0,glanceUntil:0,gx:0,gy:0};function Y5(C,H,e,o=.15){T1.glanceUntil=a+(e||.4),T1.gx=C,T1.gy=H,T1.lean=o,A.lookAt(C,H,{lean:o})}function O9(){if(a<T1.glanceUntil){A.lookAt(T1.gx,T1.gy,{lean:T1.lean??.15});return}if(T1.glanceUntil&&a-T1.glanceUntil<.05&&(T1.glanceUntil=0,A.lookAt(null)),!(U.on||k.on||l1.act&&["lookAround","glanceAtCursor","peekRoof","daydream","suspicious","peekaboo","lookUp"].includes(l1.name))&&!(P.phase==="wait"||l.system&&l.system.tag==="typing")&&!(g.asleep||$==="Sleeping"||$==="Dead"||$==="Initializing"||$==="Angry"||$==="Sad")){if(S1.name==="sulk"){A.lookAt(-300,80);return}if(!(!x.inside||x.type!=="mouse")){if(a<T1.awayUntil){A.lookAt(null);return}if(T1.contactSince==null&&(T1.contactSince=a),a-T1.contactSince>n(1.5,3)&&x.speed<40&&Math.random()<.3){T1.awayUntil=a+n(.6,1.2),T1.contactSince=null;return}x.speed>40&&(T1.contactSince=a),A.lookAt(x.wx,x.wy,{lean:x.lean})}}}function C0(){return[60+(A.get("body.x")||0)+30,e1.y0+6]}function O5(C=i2){switch(C){case"rainy":case"pouring":case"hail":return"rain";case"lightning":case"lightning-rainy":return"storm";case"snowy":case"snowy-rainy":return"snow";case"sunny":return"sun";case"fog":return"fog";case"windy":case"windy-variant":return"wind";case"cloudy":case"partlycloudy":return"cloud";default:return"clear"}}function u7(C){let H=C0();Y5(H[0],H[1],C,.5)}function b9(){let C=O5();c2.V=C==="sun"&&(J==="day"||J==="dawn")?.12:0,c2.A=C==="storm"||C==="snow"?.05:0,c2.E=0,i1()}let c7=-9;function k9(C,H,e){let o=J,Z=O5(i2);if(J=C,i2=H,b9(),j1||(r1.E=t(r1.E)),e||!L0)return;let h=O5(H);o!==C&&C==="dawn"&&g.asleep&&F&&Q(n(4,12),()=>{g.asleep&&X2("gentle",!0)}),!(h===Z||g.asleep||l.system)&&(h==="rain"?(H0("rain",3.4),Q(.9,()=>{Math.random()<.6&&B1(u(t1("rain")),{short:!0})})):h==="snow"?(H0("snow",2.6),Q(.5,()=>{i5(.8),V1("sparkle",{count:3,x:60,y:10,spread:80,life:.6,color:A.bodyColor}),B1(u(t1("snow")),{short:!0})}),n1({A:.15})):h==="storm"||(h==="sun"&&(C==="day"||C==="dawn")?(H0("sun",2.8),Q(.5,()=>{u5=a+1.6,(Z==="rain"||Z==="storm")&&B1(u(t1("sun")),{short:!0})})):(h==="fog"||h==="wind")&&(u7(1.2),h==="wind"&&F&&Q(.8,()=>S3("shiver")))))}let r2={kind:null,t0:0,dur:0,from:[60,66]};function H0(C,H){Object.assign(r2,{kind:C,t0:a,dur:H,from:[60+(A.get("body.x")||0),66+(A.get("body.y")||0)]})}function w9(){if(p.clear(),!r2.kind)return;let C=a-r2.t0;if(C>=r2.dur||l.system||g.asleep||U.on||k.on){r2.kind=null;return}let H=m(C/.6)*(1-m((C-(r2.dur-.7))/.7)),e=C0();if(r2.kind==="rain"){if(p.add({"eyeL.top":.32*H,"eyeR.top":.32*H,"body.sy":-.02*H,"mouth.s":-.08*H,"mouth.bH":-3*H}),C<r2.dur-.6){let o=m((C-.15)/1.5);Y5(i(r2.from[0],e[0],o),i(r2.from[1],e[1],o),.1,.35)}}else r2.kind==="snow"?(p.add({"eyeL.shine":H,"eyeR.shine":H,"eyeL.s":.12*H,"eyeR.s":.12*H,"body.sy":.02*H}),C<1.2&&Y5(e[0],e[1],.1,.6)):r2.kind==="sun"&&(p.add({"eyeL.bot":.15*H,"eyeR.bot":.15*H,"mouth.bH":2.5*H,"mouth.s":.06*H}),C<1.1&&Y5(e[0],e[1],.1,.5))}function P9(){if(!(!L0||a-c7<4)){if(c7=a,g.asleep){Math.random()<.3&&(G1("sudden"),B1(u(t1("thunder")),{short:!0}));return}l.system||(w("Alert",.9),A.impulse({y:-120*c,sy:2*c}),A.layer("thunder",{priority:34}).set({"eyeL.s":1.2,"eyeR.s":1.2}).ttl(450),r5(),n1({A:.15}),Q(.9,()=>u7(1)))}}let y3=null;function Z7(){if(document.hidden){y3=Date.now(),p2(),g7();return}if(V0&&f7(),y3==null)return;let C=(Date.now()-y3)/1e3;y3=null,C>300&&n1({V:-.1}),!P.phase&&(C<30?w("Alert",.4):C<300?(g.asleep&&X2("gentle"),w("Happy",1.5),Q(.3,()=>B1(t1("back"),{short:!0}))):(g.asleep=!0,Q(.6,()=>{X2("gentle",!0),I1("greet",.5),Q(2.6,()=>{g.F>.6?(w("Pleading",.9),Q(.9,()=>{w("Loving",2),B1(t1("missed"),{short:!0})})):w("Happy",1.4)})})),j2=q)}function B9(){let C=Date.now(),H=W1.lastSeen?(C-W1.lastSeen)/1e3:null;W1.visits=(W1.visits||0)+1,W1.firstSeen||(W1.firstSeen=C);let e=U1();H==null?(s2("Initializing",{noBlink:!0}),h9(()=>{w("Alert",.8),Q(.8,()=>{B1(t1("hello")),w("Happy",2.4)})}),I1("greet",.6)):e&&H>600?(g.asleep=!0,s2("Sleeping",{noBlink:!0}),Q(1.2,()=>{X2("gentle",!0),Q(2.4,()=>B1(t1("late"),{short:!0}))}),I1("greet",.3)):H<600?(w("Happy",1.2),A.blink()):H<86400?(w("Happy",2),Q(.5,()=>B1($2?U3("reName",$2):t1("re"),{short:!0})),I1("greet",.5)):g.F>.5?(w("Loving",2.4),Q(.4,()=>{V1("heart",{count:3,x:60,y:0,spread:70}),B1(t1("missed"),{short:!0})}),I1("greet",.8)):(w("Pleading",1),Q(1,()=>{w("Smiling",2),B1(t1("shyHi"),{short:!0})}),I1("greet",.6)),W1.visits%10===0&&Q(2.5,()=>{S3("tinyDance");for(let o=0;o<24;o++)A.emit("dot",{x:n(0,120),y:-10,vx:n(-30,30),vy:n(-60,-20),gravity:120,life:1.2,color:o%2?I:A.bodyColor,s0:.9,s1:.6})}),p2()}let b5=0,X5=0,S7=0,V0=!1,L0=!1;function h7(C){b5=requestAnimationFrame(h7),X5||(X5=C);let H=Math.min(.05,(C-X5)/1e3);if(X5=C,H2=H,a+=H,q+=H,a-x.lastMove>.12)x.speed=0,x.vx=0,x.vy=0;else if(a-x.lastMove>.04){let Z=Math.exp(-H/.03);x.vx*=Z,x.vy*=Z,x.speed*=Z}p3(),I5(H),X1.clear(),x9(),P4(),F&&(q4(),j4()),g.asleep&&F&&q>C7&&!l.system&&!U1()&&X2("gentle",!0),Y4(),K4(),T4(H),E4(),D4(H),I4(H),N4(),$4(),G4(H),w9(),O9(),g9(),F&&x.type==="mouse"&&!x.inside&&x.leftAt!=null&&a-x.leftAt>20&&g.F>.5&&!l.miss&&!P.phase&&(l.miss=!0),U1()&&!g.asleep&&!l.system&&!l.acute&&!k1.on&&q-j2>8&&X1.add({"eyeL.top":.1,"eyeR.top":.1}),z.glow=a<u5?1:0,z.vein=0,z.cloud=0,z.dots=z.dots&&$==="WTF"?z.dots:0,z.scan=S1.name==="boot"?z.scan:0,!P1.on&&!B2&&!N1.on&&!b1.on&&(z.blush=0),N1.on&&(z.blush=1);let e=h5();e!==$&&s2(e,{startle:l.acute&&l.acute.id==="Alert"&&$==="Sleeping"}),N.clear(),$1.clear(),$!=="Dead"&&$!=="Hurt"&&(z.bandage=k.hard>=2&&a-Z1<4?z.bandage:0);let o=j0[$];o&&o(_1),$==="Initializing"&&(z.scan=1),M9(),k4(),U4(),A.step(H),s3(H),(s.on||!M1.hidden)&&z5(),a-S7>30&&(S7=a,p2())}function f7(){b5||document.hidden||(X5=0,b5=requestAnimationFrame(h7))}function g7(){b5&&cancelAnimationFrame(b5),b5=0}let y7={passive:!0};T.addEventListener("pointerdown",A7),T.addEventListener("keydown",l7),T.addEventListener("wheel",p7,{passive:!1}),T.addEventListener("touchstart",m7,{passive:!1}),T.addEventListener("touchmove",s7,{passive:!1}),T.addEventListener("contextmenu",v7),document.addEventListener("pointermove",a7,y7),document.addEventListener("pointerup",n7),document.addEventListener("pointercancel",d7),document.documentElement.addEventListener("pointerleave",J3),document.addEventListener("mouseout",x7),document.addEventListener("visibilitychange",Z7),window.addEventListener("scroll",O1,y7),U5(),G2(),A.step(.016);let O7={start(){V0=!0,L0=!0,f7()},stop(){V0=!1,g7(),p2()},destroy(){O7.stop(),T.removeEventListener("pointerdown",A7),T.removeEventListener("keydown",l7),T.removeEventListener("wheel",p7),T.removeEventListener("touchstart",m7),T.removeEventListener("touchmove",s7),T.removeEventListener("contextmenu",v7),document.removeEventListener("pointermove",a7),document.removeEventListener("pointerup",n7),document.removeEventListener("pointercancel",d7),document.documentElement.removeEventListener("pointerleave",J3),document.removeEventListener("mouseout",x7),document.removeEventListener("visibilitychange",Z7),window.removeEventListener("scroll",O1)},layout(){G2(),U5(),M1.hidden||z5()},setLang(C){C!==F1&&(F1=C,u2=U2[C])},setUserName(C){$2=C},setAutonomous(C){F=C,C?j2=q:(Y2(!0),J0(),l.flavor=null,(g.asleep||S1.name==="fallAsleep")&&(o5(null),X2("gentle",!0)))},setMood:l3,setAmbience:k9,lightning:P9,greet:B9,typing(C,H=!0){P.typingAt=a,C?!P.phase&&H&&Z9(C):z1.fired.clear()},inputFocus(C){if(r7=C,C){let H=M.input();if(H){let e=H.getBoundingClientRect(),[o,Z]=Z2(e.left+40,e.top+e.height/2);Y5(o,Z,.4)}}},userSent:t9,listen:t7,voice(C){P.voice=C,C&&P.phase==="listen"&&(A.impulse({y:-40*c}),A.blink({close:60,hold:30,open:100})),!C&&P.phase==="listen"&&A.impulse({rot:10*c,y:30*c})},voiceLevel(C){P.level=Math.max(P.level,t((C-.01)*8))},think:q3,streamText:n9,reply:Y3,speak:o9,speechEnded:a9,speechFailed:A9,fail:d9,endConversation:p9,setOffline:l9,satellite:s9,react:v9,get expression(){return $},get conversing(){return!!P.phase},get talking(){return s.on},anchorPx(){let C=A.houseToWorld(60,0);return L5(C[0],C[1])},houseToPx(C,H){let e=A.houseToWorld(C,H);return L5(e[0],e[1])},debug(){return{expression:$,source:l.source,phase:P.phase,talk:s.on?{kind:s.kind,mode:s.mode,text:s.text,rev:s.rev}:null,mood:{...g},backend:j1,delta:{...o2},weather:i2,dayPhase:J,weatherFx:r2.kind,glance:a<T1.glanceUntil?{x:T1.gx,y:T1.gy,top:e1.y0,height:e1.h}:null,bodyColor:A.bodyColor,asleep:g.asleep,act:l1.name,reaction:S1.name,auto:F}}};return O7}var x6=`
class CasitaRecorder extends AudioWorkletProcessor {
  constructor() {
    super();
    this.ratio = sampleRate / 16000;
    this.acc = 0; this.n = 0; this.pos = 0;
    this.out = new Int16Array(320); this.o = 0; this.sq = 0;
  }
  process(inputs) {
    const input = inputs[0];
    if (!input || !input.length) return true;
    const ch = input[0];
    for (let i = 0; i < ch.length; i++) {
      // box filter over each output sample's span of input samples
      this.acc += ch[i]; this.n++; this.pos += 1;
      if (this.pos >= this.ratio) {
        this.pos -= this.ratio;
        let s = this.acc / this.n; this.acc = 0; this.n = 0;
        s = s < -1 ? -1 : s > 1 ? 1 : s;
        this.sq += s * s;
        this.out[this.o++] = s < 0 ? s * 0x8000 : s * 0x7fff;
        if (this.o === this.out.length) {
          this.port.postMessage({ pcm: this.out, rms: Math.sqrt(this.sq / this.o) });
          this.out = new Int16Array(this.out.length); this.o = 0; this.sq = 0;
        }
      }
    }
    return true;
  }
}
registerProcessor("casita-recorder", CasitaRecorder);
`,u6=M=>{switch(M){case"NotAllowedError":case"SecurityError":return"permission_denied";case"NotFoundError":case"OverconstrainedError":return"not_found";case"NotReadableError":return"in_use";default:return"unknown"}},E5=class M{constructor(V){this._onChunk=V;this._active=!1;this.sampleRate=16e3}static get isSupported(){return window.isSecureContext&&"AudioContext"in window&&"AudioWorkletNode"in window&&!!navigator.mediaDevices?.getUserMedia}get active(){return this._active}async start(){if(!M.isSupported)return"not_supported";if(this._context&&this._stream&&this._node){this._stream.getTracks().forEach(L=>L.enabled=!0),await this._context.resume(),this._active=!0;return}let V;try{let L=new AudioContext;this._context=L,this._stream=await navigator.mediaDevices.getUserMedia({audio:{channelCount:1,echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}}),V=URL.createObjectURL(new Blob([x6],{type:"application/javascript"})),await L.audioWorklet.addModule(V),this._source=L.createMediaStreamSource(this._stream),this._node=new AudioWorkletNode(L,"casita-recorder"),this._node.port.onmessage=r=>{this._active&&this._onChunk(r.data.pcm,r.data.rms)},this._source.connect(this._node),this._active=!0;return}catch(L){return this.close(),u6(L instanceof DOMException?L.name:void 0)}finally{V&&URL.revokeObjectURL(V)}}async stop(){this._active=!1,this._stream?.getTracks().forEach(V=>V.enabled=!1);try{await this._context?.suspend()}catch{}}close(){this._active=!1,this._stream?.getTracks().forEach(V=>V.stop()),this._node&&(this._node.port.onmessage=null),this._source?.disconnect(),this._context?.close().catch(()=>{}),this._stream=void 0,this._source=void 0,this._node=void 0,this._context=void 0}};var N3=M=>M.callWS({type:"assist_pipeline/pipeline/list"}),T0=(M,V,L)=>M.connection.subscribeMessage(V,{...L,type:"assist_pipeline/run"}),d3="conversation.casita",s4=(M,V)=>M.callWS({type:"assist_pipeline/pipeline/create",...V}),v4=M=>M.callWS({type:"conversation/agent/list"}),x4=(M,V)=>/connection|network|unreachable|disconnect|cloud|timeout|stream-failed|socket|lost/i.test(`${M??""} ${V??""}`),u4=/^\s*\[\s*emotion\s*:\s*([A-Za-z]+)\s*\]\s*/i,m4="[emotion:",I3=class{constructor(){this._buf="";this._open=!0}newMessage(){this._open=!0,this._buf=""}push(V){if(!this._open)return V;this._buf+=V;let L=this._buf.match(u4);if(L){A3(L[1])&&(this.emotion=L[1]);let n=this._buf.slice(L[0].length);return this._open=!1,this._buf="",n}let r=this._buf.toLowerCase().replace(/\s+/g,"");if(r.length===0||m4.startsWith(r)||r.startsWith(m4)&&!r.includes("]")&&r.length<40)return"";this._open=!1;let i=this._buf;return this._buf="",i}flush(){let V=this._buf;return this._buf="",this._open=!1,V}},c4=M=>{let V=M.match(u4);return V?{text:M.slice(V[0].length),emotion:A3(V[1])?V[1]:void 0}:{text:M}};var R0,Z4=()=>{if(!R0)try{R0=new AudioContext}catch{return}return R0},F0=()=>{let M=Z4();M&&M.state==="suspended"&&M.resume().catch(()=>{})},S4=(M,V={})=>{let L=new Audio;L.preload="auto";let r,t,i,n=0,u=!1,m=!1,f=!1,O=Z4();if(O)try{i=O.createMediaElementSource(L),r=O.createAnalyser(),r.fftSize=1024,r.smoothingTimeConstant=.1,t=new Float32Array(r.fftSize),i.connect(r),r.connect(O.destination)}catch{r=void 0}let c=E=>{if(!f){f=!0,m=!1;try{L.pause(),L.removeAttribute("src"),L.load()}catch{}try{i?.disconnect(),r?.disconnect()}catch{}E!==void 0?V.onError?.(E):V.onEnd?.()}},I={level(){if(!r||!t||!m)return 0;r.getFloatTimeDomainData(t);let E=0;for(let M1=0;M1<t.length;M1++)E+=t[M1]*t[M1];let T=Math.sqrt(E/t.length);T>.004&&(u=!0);let s1=Math.max(0,T-.01)*5,A=Math.min(1,s1/(.35+s1)*1.35);return n+=(A-n)*(A>n?.6:.25),n},get heard(){return u},get playing(){return m},duration(){return L.duration},stop(){c()}};return L.addEventListener("playing",()=>{f||m||(m=!0,V.onStart?.(I))}),L.addEventListener("ended",()=>c()),L.addEventListener("error",()=>c(L.error??new Error("audio error"))),L.src=M,O&&O.state==="suspended"&&O.resume().catch(()=>{}),L.play().catch(E=>c(E??new Error("play rejected"))),I};var c6=900,W3=class{constructor(V,L){this._host=V;this._deps=L;this.listening=!1;this.busy=!1;this.conversationId=null;this._n=0;V.addController(this)}hostDisconnected(){this.cancel(),this._recorder?.close(),this._recorder=void 0}get micSupported(){return E5.isSupported}cancel(){let V=this._run;this._run=void 0,V&&!V.ended&&(V.ended=!0,Promise.resolve(V.unsub?.()).catch(()=>{})),this._stopListening(),this._stopAudio(),this._setBusy(!1)}async sendText(V){V=V.trim();let L=this._deps.hass();if(!V||!L)return;F0(),this.cancel(),this._deps.life()?.userSent();let r=this._deps.pipeline(),t=this._newRun(!1,r);try{t.unsub=await T0(L,i=>this._onEvent(t,i),{start_stage:"intent",end_stage:t.expectAudio?"tts":"intent",input:{text:V},pipeline:r?.id,conversation_id:this.conversationId}),t.ended&&Promise.resolve(t.unsub()).catch(()=>{})}catch(i){this._failRun(t,String(i?.code??"connection"),i?.message)}}toggleMic(){this.listening?this._finishSpeaking():this.startListening()}async startListening(){let V=this._deps.hass();if(!V)return;if(F0(),this.cancel(),!E5.isSupported){this._deps.note(this._deps.strings().micUnsupported);return}let L=this._deps.pipeline(),r=this._newRun(!0,L);this._recorder||(this._recorder=new E5((i,n)=>{this._deps.life()?.voiceLevel(n),this._audioBuffer?this._audioBuffer.push(i):this._sendAudioChunk(i)})),this._handlerId=void 0,this._audioBuffer=[];let t=await this._recorder.start();if(r===this._run){if(t){this._audioBuffer=void 0,this._run=void 0,this._setBusy(!1),this._deps.note(this._micError(t));return}this.listening=!0,this._host.requestUpdate(),this._deps.life()?.listen({wake:!0,source:"panel"});try{r.unsub=await T0(V,i=>this._onEvent(r,i),{start_stage:"stt",end_stage:r.expectAudio?"tts":"intent",input:{sample_rate:this._recorder.sampleRate},pipeline:L?.id,conversation_id:this.conversationId}),r.ended&&Promise.resolve(r.unsub()).catch(()=>{})}catch(i){this._stopListening(),this._failRun(r,String(i?.code??"connection"),i?.message)}}}_micError(V){let L=this._deps.strings();switch(V){case"not_supported":return L.micUnsupported;case"permission_denied":return L.micDenied;case"not_found":return L.micNotFound;case"in_use":return L.micInUse;default:return L.micError}}_finishSpeaking(){this._stopListening()}_stopListening(){if(this._recorder?.stop(),this._handlerId!=null){if(this._audioBuffer)for(let V of this._audioBuffer)this._sendAudioChunk(V);this._sendAudioChunk(new Int16Array),this._handlerId=void 0}this._audioBuffer=void 0,this.listening&&(this.listening=!1,this._host.requestUpdate())}_sendAudioChunk(V){let L=this._deps.hass()?.connection.socket;if(this._handlerId==null||!L)return;L.binaryType="arraybuffer";let r=new Uint8Array(1+V.length*2);r[0]=this._handlerId,r.set(new Uint8Array(V.buffer,V.byteOffset,V.byteLength),1),L.send(r)}onCasitaEmotion(V){let L=this._run;if(!L||!L.intentStarted||L.emotionEvent||L.ended&&!L.waiters.length)return!1;let r=Date.now()-L.intentStarted<12e4,t=L.pipeline?.conversation_engine;return V.agent_id&&t&&V.agent_id!==t||!(V.conversation_id?V.conversation_id===L.convId:!V.device_id&&r)?!1:(L.emotionEvent=V,L.waiters.splice(0).forEach(u=>u(V)),!0)}_waitEmotion(V){return V.emotionEvent?Promise.resolve(V.emotionEvent):new Promise(L=>{let r=setTimeout(()=>{V.waiters=V.waiters.filter(i=>i!==t),L(void 0)},c6),t=i=>{clearTimeout(r),L(i)};V.waiters.push(t)})}_newRun(V,L){let r={n:++this._n,voice:V,pipeline:L,expectAudio:!!L?.tts_engine,audioStarted:!1,stripper:new I3,streamed:!1,replied:!1,ended:!1,continueConversation:!1,waiters:[],intentStarted:0,casita:!1};return r.casita=this._isCasita(r),this._run=r,this._setBusy(!0),r}_isCasita(V){let L=V.pipeline?.conversation_engine,r=this._deps.info();return!!L&&(L===d3||!!r?.entries.some(t=>t.conversation_entity===L))}_onEvent(V,L){if(V!==this._run||V.ended)return;let r=this._deps.life();switch(L.type){case"run-start":this._handlerId=L.data.runner_data?.stt_binary_handler_id??void 0,L.data.tts_output?.url&&(V.ttsUrl=L.data.tts_output.url),L.data.conversation_id&&(V.convId=L.data.conversation_id);break;case"wake_word-end":r?.listen({wake:!0,source:"panel"});break;case"stt-start":if(this._audioBuffer){for(let t of this._audioBuffer)this._sendAudioChunk(t);this._audioBuffer=void 0}break;case"stt-vad-start":r?.voice(!0);break;case"stt-vad-end":r?.voice(!1);break;case"stt-end":{this._handlerId=void 0,this._stopListening();let t=L.data.stt_output?.text?.trim();t&&this._deps.note(`« ${t} »`),r?.think();break}case"intent-start":V.intentStarted=Date.now(),L.data.conversation_id&&(V.convId=L.data.conversation_id),r?.think();break;case"intent-progress":{L.data.tts_start_streaming&&V.ttsUrl&&V.expectAudio&&this._startAudio(V,V.ttsUrl);let t=L.data.chat_log_delta;if(!t)break;if(t.role&&(V.role=t.role,t.role==="assistant"&&V.stripper.newMessage()),V.role==="assistant"&&t.content){let i=V.stripper.push(t.content);i&&(V.streamed=!0,r?.streamText(i,V.casita?V.stripper.emotion:void 0,V.expectAudio))}break}case"intent-end":this._onIntentEnd(V,L.data.intent_output,!!L.data.processed_locally),V.expectAudio||this._endRun(V);break;case"tts-start":break;case"tts-end":!V.audioStarted&&L.data.tts_output?.url&&this._startAudio(V,L.data.tts_output.url);break;case"run-end":this._endRun(V);break;case"error":this._failRun(V,L.data.code,L.data.message);break}}async _onIntentEnd(V,L,r){let t=this._deps.life();V.replied=!0,L?.conversation_id&&(this.conversationId=L.conversation_id,V.convId=V.convId??L.conversation_id),V.continueConversation=!!L?.continue_conversation;let i=L?.response?.speech?.plain?.speech??"",n=V.stripper.flush();n&&!i&&t?.streamText(n,V.casita?V.stripper.emotion:void 0,V.expectAudio);let{text:u,emotion:m}=c4(i),f="Normal";if(V.casita&&!r){let c=await this._waitEmotion(V);if(V!==this._run)return;f=(c&&A3(c.emotion)?c.emotion:void 0)??V.stripper.emotion??m??"Normal"}let O=V.expectAudio&&!!u;t?.reply({text:u,emotion:f,expectAudio:O,success:V.casita&&!r&&L?.response?.response_type==="action_done",done:()=>{(!V.expectAudio||!u)&&this._maybeContinue(V)}})}_startAudio(V,L){let r=this._deps.hass();if(!r||V.audioStarted)return;V.audioStarted=!0,this._stopAudio();let t=this._deps.life();this._playback=S4(r.hassUrl(L),{onStart:i=>{V!==this._run&&this._run||(t?.speak(i),clearTimeout(this._heardTimer),this._heardTimer=setTimeout(()=>{i.playing&&!i.heard&&t?.speechFailed()},900))},onEnd:()=>{clearTimeout(this._heardTimer),this._playback=void 0,t?.speechEnded(),this._maybeContinue(V)},onError:()=>{clearTimeout(this._heardTimer),this._playback=void 0,t?.speechFailed()}})}_stopAudio(){clearTimeout(this._heardTimer);let V=this._playback;this._playback=void 0,V?.stop()}_maybeContinue(V){!V.continueConversation||V.n!==this._n||(V.continueConversation=!1,V.voice&&setTimeout(()=>this.startListening(),350))}_endRun(V){V.ended||(V.ended=!0,Promise.resolve(V.unsub?.()).catch(()=>{}),V===this._run&&(this._stopListening(),this._setBusy(!1),V.replied||this._deps.life()?.endConversation()))}_failRun(V,L,r){if(V!==this._run)return;let t=this._deps.strings();this._stopListening(),this._stopAudio(),V.ended=!0,Promise.resolve(V.unsub?.()).catch(()=>{}),this._run=void 0,this._setBusy(!1);let i=x4(L,r)||this._deps.hass()?.connected===!1,n=L==="stt-no-text-recognized"?t.notUnderstood:i?t.oopsNet:t.oops;this._deps.life()?.fail({offline:i,text:n})}_setBusy(V){this.busy!==V&&(this.busy=V,this._host.requestUpdate())}};var f4={},g4="casita",y4="casita.settings",h4=M=>{let V={};if(!M||typeof M!="object"||Array.isArray(M))return V;let L=M;return typeof L.pipeline_id=="string"&&L.pipeline_id&&(V.pipeline_id=L.pipeline_id),V},Z6=()=>{try{return JSON.parse(localStorage.getItem(y4)||"null")}catch{return null}},S6=M=>{try{localStorage.setItem(y4,JSON.stringify(M))}catch{}},O4=async M=>{try{let V=await M.callWS({type:"frontend/get_user_data",key:g4});if(V&&V.value!=null)return h4(V.value)}catch{}return h4(Z6())},_0=async(M,V)=>{S6(V);try{await M.callWS({type:"frontend/set_user_data",key:g4,value:V})}catch{}};var h6=()=>!!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,b4=M=>{if(!M){let L=new Date().getHours();return L>=6&&L<9?"dawn":L>=9&&L<18?"day":L>=18&&L<21?"dusk":"night"}let V=Number(M.attributes.elevation);return Number.isFinite(V)?V>8?"day":V<-6?"night":M.attributes.rising?"dawn":"dusk":M.state==="above_horizon"?"day":"night"},u1=class extends J1{constructor(){super(...arguments);this.narrow=!1;this._settings={...f4};this._hudOpen=!1;this._settingsOpen=!1;this._expression="Normal";this._phase=b4(void 0);this._condition=null;this._creating=!1;this._lang="en";this._rm=h6();this._conv=new W3(this,{hass:()=>this.hass,life:()=>this._life,pipeline:()=>this._pipeline,info:()=>this._info,strings:()=>U2[this._lang],note:L=>this._showNote(L)});this._throttle=new E3((L,r)=>this._interact(L,r));this._seen={states:{}};this._recentEmotions=[];this._ready=!1;this._faceReady=!1;this._onVisible=()=>{!document.hidden&&this._ready&&this._refreshPipelines()};this._onKeyDown=L=>{L.key==="Escape"&&this._hudOpen&&!this._settingsOpen&&(L.stopPropagation(),this._hudOpen=!1,this._moodBtn?.focus())};this._ambienceInitial=!0}connectedCallback(){super.connectedCallback(),this._ready&&(this._life?.start(),this._subscribeEvents(),this._observe(),this._refreshPipelines(),this._scheduleStorm()),document.addEventListener("visibilitychange",this._onVisible)}disconnectedCallback(){super.disconnectedCallback(),this._life?.stop(),this._resize?.disconnect(),this._resize=void 0,this._unsubscribeEvents(),clearTimeout(this._noteTimer),clearTimeout(this._stormTimer),this._stormTimer=void 0,document.removeEventListener("visibilitychange",this._onVisible)}async _refreshPipelines(){if(this.hass)try{this._pipelines=await N3(this.hass),this._processHass(!1)}catch{}}willUpdate(L){if(L.has("hass")&&this.hass){let r=p4(this.hass.locale?.language??this.hass.language);r!==this._lang&&(this._lang=r,this._life?.setLang(r)),this.toggleAttribute("dark",!!this.hass.themes?.darkMode),this._ready?this._processHass(!1):this._faceReady&&queueMicrotask(()=>this._init())}}async firstUpdated(){await this._faceEl.updateComplete,this._faceReady=!0,this._init()}_init(){let L=this._faceEl?.face;this._ready||!this._faceReady||!L||!this.hass||(this._life=l4({stage:this._room,svg:this._faceEl.svg,face:L,bubble:this._bubble,bubbleText:this._bubbleText,srSpeech:this._srSpeech,input:()=>this._input,onInteract:(r,t)=>this._throttle.report(r,t),onExpression:r=>{this._expression=r}},{lang:this._lang,reducedMotion:this._rm,autonomous:!0,userName:this.hass.user?.name?.split(" ")[0]}),this._ready=!0,this._observe(),this._processHass(!0),this._life.greet(),this._life.start(),this._subscribeEvents(),this._load())}updated(L){let r=L;if(r.has("_condition")||r.has("_phase")){let t=n3(r.has("_condition")?r.get("_condition"):this._condition,r.has("_phase")?r.get("_phase"):this._phase);n3(this._condition,this._phase)==="storm"&&t!=="storm"&&!this._ambienceInitial&&this.strike(),this._scheduleStorm()}this._ambienceInitial=!1,L.has("hass")&&L.get("hass")?.themes?.darkMode!==this.hass?.themes?.darkMode&&requestAnimationFrame(()=>this._life?.layout())}_observe(){this._resize||!this._room||(this._resize=new ResizeObserver(()=>this._life?.layout()),this._resize.observe(this._room))}async _load(){let L=this.hass,[r,t,i]=await Promise.allSettled([a4(L),O4(L),N3(L)]);t.status==="fulfilled"&&(this._settings=t.value),i.status==="fulfilled"&&(this._pipelines=i.value),r.status==="fulfilled"&&(this._info=r.value),this._processHass(!0)}get _casitaPipelines(){return(this._pipelines?.pipelines??[]).filter(L=>L.conversation_engine===d3||!!D3(this._info,L.conversation_engine))}get _defaultPipeline(){let L=this._pipelines;if(!L)return;let r=L.pipelines.find(i=>i.id===L.preferred_pipeline),t=this._casitaPipelines;return(r&&t.includes(r)?r:t[0])??r??L.pipelines[0]}get _pipeline(){return this._pipelines?.pipelines.find(L=>L.id===this._settings.pipeline_id)??this._defaultPipeline}get _empty(){return!!this._pipelines&&!this._casitaPipelines.length}get _entry(){return A4(this._info,this._pipeline?.conversation_engine)}get _casitaPipeline(){let L=this._pipeline?.conversation_engine;return!!L&&(L===d3||!!D3(this._info,L))}get _localWarning(){return this._casitaPipeline&&!!this._pipeline?.prefer_local_intents}get _weatherEntity(){let L=this._entry?.weather_entity;if(L)return L;let r=Object.keys(this.hass?.states??{}).filter(t=>t.startsWith("weather."));return r.length===1?r[0]:void 0}get _satellites(){let L=this.hass,r=this._entry,t=this._pipelines;if(!L?.entities||!r?.conversation_entity||!t)return[];if(this._satCache?.entities!==L.entities){let n=new Map;for(let m of Object.values(L.entities))m.device_id&&m.entity_id.startsWith("select.")&&(m.translation_key==="pipeline"||m.translation_key==="pipeline_n"&&!n.has(m.device_id))&&n.set(m.device_id,m.entity_id);let u=[];for(let m of Object.values(L.entities)){let f=m.device_id&&m.entity_id.startsWith("assist_satellite.")?n.get(m.device_id):void 0;f&&u.push([m.entity_id,m.device_id,f])}this._satCache={entities:L.entities,pairs:u}}let i=t.pipelines.find(n=>n.id===t.preferred_pipeline);return this._satCache.pairs.filter(([,,n])=>{let u=L.states[n]?.state;return(u==="preferred"?i:t.pipelines.find(f=>f.name===u))?.conversation_engine===r.conversation_entity}).map(([n,u])=>[n,u])}_changed(L){if(!L)return!1;let r=this.hass.states[L];return this._seen.states[L]===r?!1:(this._seen.states[L]=r,r)}_processHass(L){let r=this._life,t=this.hass;if(!r||!t)return;L&&(this._seen.states={});let i=t.connected!==!1;this._seen.connected!==i&&(this._seen.connected=i,r.setOffline(!i));let n=this._info,u=this._entry,m=u?.entry_id!==this._seen.entry;this._seen.entry=u?.entry_id;let f=!1;if(u){for(let E of _5){let T=u.mood_entities[E];T&&this._changed(T)!==!1&&(f=!0)}(f||L||m)&&r.setMood(d4(t,u))}else(L||m)&&r.setMood(void 0);let O=this._changed("sun.sun"),c=this._weatherEntity,I=this._changed(c);if(L||O!==!1||I!==!1||!c&&this._condition!==null){let E=b4(t.states["sun.sun"]),T=c?t.states[c]?.state??null:null,s1=T==="unavailable"||T==="unknown"?null:T;(L||E!==this._phase||s1!==this._condition)&&(L&&(this._ambienceInitial=!0),this._phase=E,this._condition=s1,r.setAmbience(E,s1,L))}for(let[E]of this._satellites){let T=this._changed(E);T&&!L&&r.satellite(T.state)}for(let E of n?.entries??[]){let T=this._changed(E.emotion_entity);if(!T)continue;let s1=T.attributes,A={emotion:T.state,text:s1.text,conversation_id:s1.conversation_id,device_id:s1.device_id,agent_id:s1.agent_id||E.conversation_entity,source:s1.source,updated:s1.updated};L?this._remember(A):this._onEmotion(A)}}_emotionKey(L){return`${L.agent_id??""}|${L.updated??""}|${L.emotion}|${L.conversation_id??""}`}_remember(L){let r=this._emotionKey(L);return this._recentEmotions.includes(r)?!1:(this._recentEmotions.push(r),this._recentEmotions.length>12&&this._recentEmotions.shift(),!0)}_onEmotion(L){if(!L?.emotion||!this._remember(L)||this._conv.onCasitaEmotion(L))return;let r=this._entry;if(L.agent_id&&r&&L.agent_id!==r.conversation_entity)return;let t=!!L.device_id&&this._satellites.some(([,i])=>i===L.device_id);this._life?.react(L.emotion,L.text||void 0,t)}_subscribeEvents(){this._unsubEvents||!this.hass?.user?.is_admin||(this._unsubEvents=this.hass.connection.subscribeEvents(L=>this._onEmotion(L.data),"casita_emotion").catch(()=>{}))}_unsubscribeEvents(){let L=this._unsubEvents;this._unsubEvents=void 0,L?.then(r=>r?.()).catch(()=>{})}_interact(L,r){let t=this._entry;!this.hass||!t||this.hass.callService("casita","interact",{kind:L,intensity:r,entry_id:t.entry_id}).catch(()=>{})}_showNote(L){clearTimeout(this._noteTimer),this._note=L,L&&(this._noteTimer=setTimeout(()=>this._note=void 0,5e3))}_submit(L){L.preventDefault();let r=this._input.value;r.trim()&&(this._input.value="",this._life?.typing(""),!this._pipelines?.pipelines.length&&this._pipelines&&this._showNote(U2[this._lang].noPipeline),this._conv.sendText(r))}_onInput(){this._life?.typing(this._input.value,this._casitaPipeline)}_toggleMic(){this._conv.toggleMic()}_toggleHud(){this._hudOpen=!this._hudOpen}_openSettings(){this._settingsOpen=!0,this._refreshPipelines()}_settingsChanged(L){let r=this._weatherEntity,t=this._satellites.map(([i])=>i);this._settings=L.detail.settings,_0(this.hass,this._settings);for(let i of[r,this._weatherEntity,...t])i&&delete this._seen.states[i];this._processHass(!1)}_scheduleStorm(){clearTimeout(this._stormTimer),this._stormTimer=void 0,!(!this.isConnected||n3(this._condition,this._phase)!=="storm")&&(this._stormTimer=setTimeout(()=>{document.hidden||this.strike(),this._scheduleStorm()},6e3+Math.random()*9e3))}strike(){let L=this.renderRoot.querySelector(".flash");L&&(L.classList.remove("on"),L.offsetWidth,L.classList.add("on")),setTimeout(()=>this._life?.lightning(),160)}_openAssistants(L){L.preventDefault(),history.pushState(null,"","/config/voice-assistants/assistants"),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1},bubbles:!0,composed:!0}))}async _createAssistant(){let L=this.hass,r=U2[this._lang],t=this._entry;if(!(!L||this._creating)){if(this._createError=void 0,!t?.conversation_entity){this._createError=r.createFailed;return}this._creating=!0;try{let i=this._pipelines??await N3(L),n=i.pipelines.find(I=>I.id===i.preferred_pipeline),u=L.config?.language||L.language||"en",m=u;try{let{agents:I}=await v4(L);I.find(E=>E.id===t.conversation_entity)?.supported_languages==="*"&&(m="*")}catch{}let f=new Set(i.pipelines.map(I=>I.name)),O="Casita";for(let I=2;f.has(O);I++)O=`Casita ${I}`;let c=await s4(L,{name:O,language:n?.language??u,conversation_engine:t.conversation_entity,conversation_language:m,prefer_local_intents:!1,stt_engine:n?.stt_engine??null,stt_language:n?.stt_language??null,tts_engine:n?.tts_engine??null,tts_language:n?.tts_language??null,tts_voice:n?.tts_voice??null,wake_word_entity:n?.wake_word_entity??null,wake_word_id:n?.wake_word_id??null});this._settings={pipeline_id:c.id},_0(L,this._settings),this._pipelines={...i,pipelines:[...i.pipelines.filter(I=>I.id!==c.id),c]},this._processHass(!1),this._life?.react("Happy",r.assistantReady),this._refreshPipelines()}catch(i){this._createError=i?.message?`${r.createFailed} ${i.message}`:r.createFailed}finally{this._creating=!1}}}_renderEmpty(){let L=U2[this._lang],r=!!this.hass?.user?.is_admin;return w1`<div class="empty" role="note">
      <p class="empty-text">${L.emptyTalk}</p>
      ${this._pipeline?w1`<p class="empty-note">${L.notCasita}</p>`:f1}
      ${r?w1`<div class="empty-actions">
            <button type="button" class="empty-btn" ?disabled=${this._creating} @click=${this._createAssistant}>
              ${this._creating?L.creating:L.createAssistant}
            </button>
            <a class="empty-link" href="/config/voice-assistants/assistants" @click=${this._openAssistants}>${L.openAssistants}</a>
          </div>`:w1`<p class="empty-note">${L.askAdmin}</p>`}
      ${this._createError?w1`<p class="empty-error" role="alert">${this._createError}</p>`:f1}
    </div>`}render(){let L=U2[this._lang],r=n3(this._condition,this._phase),t=this._conv.listening;return w1`
      <div class="toolbar" @keydown=${this._onKeyDown}>
        <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
        <div class="main-title">${L.title}</div>
        <button
          id="mood-btn"
          class="icon-btn"
          type="button"
          aria-label=${this._hudOpen?L.moodHide:L.moodShow}
          title=${L.mood}
          aria-expanded=${this._hudOpen?"true":"false"}
          aria-controls="hud"
          @click=${this._toggleHud}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d=${b0}></path></svg>
        </button>
        <button class="icon-btn" type="button" aria-label=${L.settings} title=${L.settings} aria-haspopup="dialog" @click=${this._openSettings}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d=${O0}></path></svg>
        </button>
      </div>
      <div class="content" @keydown=${this._onKeyDown}>
        <div
          class="room"
          tabindex="0"
          role="group"
          aria-label=${L.stageLabel}
          aria-describedby="room-help"
          data-phase=${this._phase}
          data-sky=${r}
        >
          <div class="ambience" aria-hidden="true">
            <i class="l l-dawn"></i><i class="l l-dusk"></i><i class="l l-sun"></i><i class="l l-cloud"></i><i class="l l-fog"></i>
            <i class="l l-rain"></i><i class="l l-snow"></i><i class="l l-night"></i><i class="l l-glow"></i>
          </div>
          <casita-face controlled ?reduced-motion=${this._rm} .label=${L.exprAria+(L.labels[this._expression]??this._expression)}></casita-face>
          <div class="flash" aria-hidden="true"></div>
          <div class="bubble" hidden aria-hidden="true"><span class="bubble-text"></span></div>
        </div>
        ${this._hudOpen?w1`<casita-mood-hud
              id="hud"
              class="hud"
              .hass=${this.hass}
              .entry=${this._entry}
              .strings=${L}
              .heading=${(this._info?.entries.length??0)>1&&this._entry?n4(this._entry,this._info.entries,this.hass):""}
              ?narrow=${this.narrow}
            ></casita-mood-hud>`:f1}
        <p id="room-help" class="sr-only">${L.stageHelp}</p>
        <div id="sr-speech" class="sr-only" aria-live="polite"></div>
        <div class="bottom">
          ${this._empty?this._renderEmpty():f1}
          ${this._note?w1`<p class="note" role="status">${this._note}</p>`:f1}
          <form class="chat" autocomplete="off" @submit=${this._submit}>
            <label for="chat-input" class="sr-only">${L.chatLabel}</label>
            <input
              id="chat-input"
              type="text"
              maxlength="400"
              placeholder=${L.chatPh}
              enterkeyhint="send"
              @input=${this._onInput}
              @focus=${()=>this._life?.inputFocus(!0)}
              @blur=${()=>this._life?.inputFocus(!1)}
            />
            <button
              type="button"
              class="round mic ${t?"on":""}"
              aria-pressed=${t?"true":"false"}
              aria-label=${t?L.micStop:L.micStart}
              title=${t?L.micStop:L.micStart}
              @click=${this._toggleMic}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d=${t?B0:w0}></path></svg>
            </button>
            <button type="submit" class="round send" aria-label=${L.send} title=${L.send}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d=${P0}></path></svg>
            </button>
          </form>
        </div>
      </div>
      <casita-settings-dialog
        .hass=${this.hass}
        .strings=${L}
        .settings=${this._settings}
        .pipelines=${this._pipelines}
        .warning=${this._localWarning?L.localWarning:void 0}
        .note=${this._pipeline&&!this._casitaPipeline?L.notCasita:void 0}
        .defaultId=${this._defaultPipeline?.id}
        .open=${this._settingsOpen}
        @settings-changed=${this._settingsChanged}
        @closed=${()=>this._settingsOpen=!1}
      ></casita-settings-dialog>
    `}};u1.styles=R2`
    :host {
      /* Casita's room keeps its own palette; the chrome uses the HA theme */
      --room-top: #fafcfe;
      --room-bottom: #e5eef5;
      --grid: rgba(24, 188, 242, 0.09);
      --floor: #dbe6ee;
      --floor-line: #c5d5e1;
      --shadow: #16324a;
      --steam: #8ea2b4;
      --cloud: #9db0c1;
      --bubble: #ffffff;
      --bubble-ink: #13212c;
      --bubble-line: #d8e2ea;
      --bubble-shadow: rgba(10, 30, 50, 0.12);
      /* room light: weather and time of day only tint the light, discreetly */
      --sun-a: rgba(255, 196, 120, 0.2);
      --sun-b: rgba(255, 222, 170, 0.1);
      --cloud-l: rgba(150, 146, 140, 0.13);
      --fog-a: rgba(240, 239, 236, 0.5);
      --fog-b: rgba(212, 210, 206, 0.2);
      --rain-a: rgba(72, 92, 118, 0.16);
      --rain-b: rgba(72, 92, 118, 0.1);
      --snow-a: rgba(226, 240, 255, 0.55);
      --snow-b: rgba(236, 246, 255, 0.5);
      --dawn: rgba(255, 158, 92, 0.2);
      --dusk: rgba(255, 140, 96, 0.2);
      --night-a: rgba(16, 30, 64, 0.22);
      --night-b: rgba(16, 30, 64, 0.17);
      --glow-l: rgba(255, 168, 76, 0.34);
      --blush: #ff7aa8;
      --glow: #ffcf3f;
      --spark: #f5b800;
      --star-fx: #f5b800;
      --puff: #ffffff;
      --puff-edge: #aab9c7;
      --shine: #ffffff;
      display: flex;
      flex-direction: column;
      /* ha-panel-custom, the parent, has no height: fill the viewport like HA's iframe panels */
      height: 100vh;
      height: 100dvh;
      position: relative;
      overflow: hidden;
      background: var(--primary-background-color, #fafafa);
      color: var(--primary-text-color, #212121);
      font-family: var(--ha-font-family-body, Roboto, system-ui, sans-serif);
      -webkit-font-smoothing: var(--ha-font-smoothing, antialiased);
    }
    :host([dark]) {
      --room-top: #162430;
      --room-bottom: #0f1921;
      --grid: rgba(24, 188, 242, 0.07);
      --floor: #122029;
      --floor-line: #1c3140;
      --shadow: #000000;
      --steam: #7a90a2;
      --cloud: #5d7385;
      --bubble: #1d2c37;
      --bubble-ink: #e4ecf2;
      --bubble-line: #243440;
      --bubble-shadow: rgba(0, 0, 0, 0.35);
      --sun-a: rgba(255, 186, 108, 0.1);
      --sun-b: rgba(255, 206, 150, 0.04);
      --cloud-l: rgba(170, 160, 148, 0.07);
      --fog-a: rgba(196, 196, 194, 0.1);
      --fog-b: rgba(170, 170, 168, 0.05);
      --rain-a: rgba(6, 18, 40, 0.3);
      --rain-b: rgba(10, 24, 46, 0.22);
      --snow-a: rgba(170, 205, 250, 0.11);
      --snow-b: rgba(190, 215, 250, 0.07);
      --dawn: rgba(255, 150, 80, 0.12);
      --dusk: rgba(255, 130, 90, 0.12);
      --night-a: rgba(0, 4, 12, 0.36);
      --night-b: rgba(0, 4, 12, 0.3);
      --glow-l: rgba(255, 160, 70, 0.16);
      --blush: #ff8db6;
      --glow: #ffd45c;
      --spark: #ffd23f;
      --star-fx: #ffd23f;
      --puff: #f2f6fa;
      --puff-edge: #6f8394;
    }

    /* HA toolbar */
    .toolbar {
      display: flex;
      align-items: center;
      flex: none;
      height: var(--header-height, 56px);
      padding: 0 4px 0 12px;
      padding-top: var(--safe-area-inset-top, 0px);
      box-sizing: content-box;
      font-size: var(--ha-font-size-xl, 20px);
      font-weight: var(--ha-font-weight-normal, 400);
      color: var(--app-header-text-color, var(--primary-text-color, #212121));
      background-color: var(--app-header-background-color, var(--primary-background-color, #fafafa));
      border-bottom: var(--app-header-border-bottom, 1px solid var(--divider-color, rgba(0, 0, 0, 0.12)));
      position: relative;
      z-index: 4;
    }
    .main-title {
      margin: var(--margin-title, 0 0 0 12px);
      line-height: var(--ha-line-height-normal, 20px);
      flex-grow: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    :host([narrow]) .main-title {
      margin-left: 4px;
    }
    .icon-btn {
      width: 48px;
      height: 48px;
      flex: none;
      border: 0;
      border-radius: 50%;
      background: transparent;
      color: inherit;
      display: grid;
      place-items: center;
      cursor: pointer;
      padding: 0;
    }
    .icon-btn svg {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }
    .icon-btn:hover {
      background: rgba(127, 127, 127, 0.12);
    }
    .icon-btn[aria-expanded="true"] {
      background: rgba(127, 127, 127, 0.18);
      color: var(--primary-color, #18bcf2);
    }
    .icon-btn:focus-visible,
    .round:focus-visible {
      outline: 2px solid var(--primary-color, #18bcf2);
      outline-offset: 2px;
    }

    .content {
      position: relative;
      flex: 1;
      min-height: 0;
    }

    /* the room */
    .room {
      position: absolute;
      inset: 0;
      overflow: hidden;
      touch-action: pan-y pinch-zoom;
      user-select: none;
      -webkit-user-select: none;
      -webkit-touch-callout: none;
      outline: none;
      background:
        linear-gradient(
          to bottom,
          transparent calc(var(--floor-y, 76%) - 1px),
          var(--floor-line) calc(var(--floor-y, 76%) - 1px),
          var(--floor-line) calc(var(--floor-y, 76%) + 1px),
          var(--floor) calc(var(--floor-y, 76%) + 1px)
        ),
        repeating-linear-gradient(0deg, var(--grid) 0 1px, transparent 1px 28px),
        repeating-linear-gradient(90deg, var(--grid) 0 1px, transparent 1px 28px),
        linear-gradient(var(--room-top), var(--room-bottom));
    }
    .room:focus-visible {
      box-shadow: inset 0 0 0 3px var(--primary-color, #18bcf2);
    }
    .room.over {
      cursor: grab;
    }
    .room.grabbing {
      cursor: grabbing;
    }
    /* light layers, cross-faded over several seconds (--ambience-transition) */
    .ambience,
    .ambience .l {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    .ambience .l {
      opacity: 0;
      transition: opacity var(--ambience-transition, 6s) ease-in-out;
    }
    .l-sun {
      background: linear-gradient(160deg, var(--sun-a), var(--sun-b) 50%, transparent 92%);
    }
    .l-cloud {
      background: var(--cloud-l);
    }
    .l-fog {
      background: linear-gradient(var(--fog-a), var(--fog-b));
    }
    .l-rain {
      background: linear-gradient(var(--rain-a), var(--rain-b));
    }
    .l-snow {
      background: linear-gradient(var(--snow-a), var(--snow-b));
    }
    .l-dawn {
      background: radial-gradient(140% 100% at 88% 0%, var(--dawn), transparent 80%);
    }
    .l-dusk {
      background: radial-gradient(140% 100% at 12% 0%, var(--dusk), transparent 80%);
    }
    .l-night {
      background: linear-gradient(var(--night-a), var(--night-b));
    }
    /* night: a small warm light around Casita */
    .l-glow {
      background: radial-gradient(
        calc(var(--house-w, 200px) * 1.25) calc(var(--house-w, 200px) * 0.95) at 50% calc(var(--floor-y, 76%) - var(--house-w, 200px) * 0.32),
        var(--glow-l),
        transparent
      );
    }
    .room:is([data-phase="day"], [data-phase="dawn"], [data-phase="dusk"])[data-sky="sun"] .l-sun {
      opacity: 1;
    }
    .room:is([data-phase="dawn"], [data-phase="dusk"])[data-sky="sun"] .l-sun,
    .room:not([data-phase="night"])[data-sky="partly"] .l-sun {
      opacity: 0.55;
    }
    .room[data-sky="cloud"] .l-cloud,
    .room[data-sky="fog"] .l-fog {
      opacity: 1;
    }
    .room:is([data-sky="partly"], [data-sky="wind"]) .l-cloud {
      opacity: 0.45;
    }
    .room[data-sky="fog"] .l-cloud {
      opacity: 0.7;
    }
    .room:is([data-sky="rain"], [data-sky="pour"], [data-sky="hail"], [data-sky="storm"]) .l-rain {
      opacity: 1;
    }
    .room[data-sky="sleet"] .l-rain {
      opacity: 0.7;
    }
    .room[data-sky="snow"] .l-snow {
      opacity: 1;
    }
    .room[data-sky="sleet"] .l-snow {
      opacity: 0.5;
    }
    .room[data-phase="dawn"] .l-dawn,
    .room[data-phase="dusk"] .l-dusk,
    .room[data-phase="night"] .l-night,
    .room[data-phase="night"] .l-glow {
      opacity: 1;
    }
    .flash {
      position: absolute;
      inset: 0;
      background: #f4f8ff;
      opacity: 0;
      pointer-events: none;
    }
    .flash.on {
      animation: flash 0.45s ease-out;
    }
    :host([dark]) .flash {
      background: #dfe8ff;
    }
    @keyframes flash-soft {
      50% {
        opacity: 0.16;
      }
    }
    @keyframes flash {
      0% {
        opacity: 0;
      }
      15% {
        opacity: 0.32;
      }
      30% {
        opacity: 0.05;
      }
      45% {
        opacity: 0.22;
      }
      100% {
        opacity: 0;
      }
    }

    /* speech bubble */
    .bubble {
      position: absolute;
      left: 0;
      top: 0;
      max-width: min(300px, 70%);
      padding: 9px 13px;
      border-radius: 16px;
      background: var(--bubble);
      color: var(--bubble-ink);
      border: 1px solid var(--bubble-line);
      box-shadow: 0 6px 18px var(--bubble-shadow);
      font-size: 17px;
      font-weight: 500;
      line-height: 1.35;
      pointer-events: none;
      transform-origin: 0 100%;
      animation: pop 0.26s cubic-bezier(0.3, 1.6, 0.5, 1);
      will-change: transform;
      z-index: 2;
      overflow-wrap: anywhere;
    }
    .bubble[hidden] {
      display: none;
    }
    .bubble.short {
      font-size: 18px;
      font-weight: 600;
    }
    .bubble::after {
      content: "";
      position: absolute;
      left: 14px;
      bottom: -7px;
      width: 12px;
      height: 12px;
      background: var(--bubble);
      border-right: 1px solid var(--bubble-line);
      border-bottom: 1px solid var(--bubble-line);
      transform: rotate(45deg);
      border-bottom-right-radius: 3px;
    }
    .bubble.flip::after {
      left: auto;
      right: 14px;
    }
    .bubble.out {
      opacity: 0;
      transition: opacity 0.2s;
    }
    @keyframes pop {
      from {
        opacity: 0;
        scale: 0.85;
      }
      to {
        opacity: 1;
        scale: 1;
      }
    }

    /* mood HUD: under the Mood button, or a thin strip on narrow */
    .hud {
      position: absolute;
      top: 8px;
      right: 12px;
      z-index: 3;
    }
    :host([narrow]) .hud {
      top: 0;
      left: 0;
      right: 0;
    }

    /* bottom chat pill */
    .bottom {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 0 max(16px, var(--safe-area-inset-right, 0px)) max(16px, calc(var(--safe-area-inset-bottom, 0px) + 12px))
        max(16px, var(--safe-area-inset-left, 0px));
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      pointer-events: none;
      z-index: 3;
    }
    .bottom > * {
      pointer-events: auto;
    }
    .chat {
      display: flex;
      align-items: center;
      gap: 4px;
      width: min(560px, 100%);
      box-sizing: border-box;
      padding: 4px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--card-background-color, #fff) 86%, transparent);
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      box-shadow: 0 10px 30px var(--bubble-shadow);
    }
    .chat input {
      flex: 1;
      min-width: 0;
      font: inherit;
      font-size: 16px;
      padding: 9px 14px;
      border: 0;
      border-radius: 999px;
      background: transparent;
      color: var(--primary-text-color, #212121);
    }
    .chat input::placeholder {
      color: var(--secondary-text-color, #727272);
    }
    .chat input:focus {
      outline: none;
    }
    .chat:focus-within {
      border-color: var(--primary-color, #18bcf2);
      box-shadow: 0 0 0 1px var(--primary-color, #18bcf2), 0 10px 30px var(--bubble-shadow);
    }
    .round {
      width: 40px;
      height: 40px;
      flex: none;
      border-radius: 50%;
      border: 0;
      display: grid;
      place-items: center;
      cursor: pointer;
      padding: 0;
      position: relative;
    }
    .round svg {
      width: 22px;
      height: 22px;
      fill: currentColor;
    }
    .mic {
      background: transparent;
      color: var(--primary-color, #18bcf2);
    }
    .mic:hover {
      background: rgba(127, 127, 127, 0.12);
    }
    .mic.on {
      background: var(--primary-color, #18bcf2);
      color: var(--text-primary-color, #fff);
    }
    .mic.on::before {
      content: "";
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      border: 2px solid var(--primary-color, #18bcf2);
      animation: ring 1.2s ease-out infinite;
    }
    @keyframes ring {
      from {
        opacity: 0.8;
        transform: scale(0.9);
      }
      to {
        opacity: 0;
        transform: scale(1.35);
      }
    }
    .send {
      background: var(--primary-color, #18bcf2);
      color: var(--text-primary-color, #fff);
    }
    .note {
      margin: 0;
      font-size: 13px;
      color: var(--secondary-text-color, #5a6a77);
      text-align: center;
      padding: 4px 12px;
      border-radius: 999px;
      max-width: min(560px, 100%);
      background: color-mix(in srgb, var(--card-background-color, #fff) 80%, transparent);
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
    }
    /* no assistant talks to Casita yet */
    .empty {
      width: min(560px, 100%);
      box-sizing: border-box;
      padding: 10px 14px;
      border-radius: 16px;
      background: color-mix(in srgb, var(--card-background-color, #fff) 88%, transparent);
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      font-size: 14px;
      line-height: 1.4;
      text-align: center;
    }
    .empty p {
      margin: 0;
    }
    .empty-note {
      margin-top: 2px !important;
      font-size: 13px;
      color: var(--secondary-text-color, #5a6a77);
    }
    .empty-error {
      margin-top: 6px !important;
      font-size: 13px;
      color: var(--error-color, #db4437);
    }
    .empty-actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 4px 14px;
      margin-top: 8px;
    }
    .empty-btn {
      font: inherit;
      font-size: 14px;
      font-weight: var(--ha-font-weight-medium, 500);
      border: 0;
      border-radius: 999px;
      padding: 8px 16px;
      min-height: 36px;
      cursor: pointer;
      background: var(--primary-color, #18bcf2);
      color: var(--text-primary-color, #fff);
    }
    .empty-btn[disabled] {
      opacity: 0.6;
      cursor: progress;
    }
    .empty-link {
      font-size: 13px;
      color: var(--primary-color, #18bcf2);
      text-decoration: underline;
      text-underline-offset: 2px;
      padding: 6px 2px;
    }
    .empty-btn:focus-visible,
    .empty-link:focus-visible {
      outline: 2px solid var(--primary-color, #18bcf2);
      outline-offset: 2px;
    }
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0 0 0 0);
      white-space: nowrap;
    }
    @media (prefers-reduced-motion: reduce) {
      .bubble {
        animation: none;
      }
      .mic.on::before {
        animation: none;
      }
      /* one soft pulse instead of a flicker */
      .flash.on {
        animation: flash-soft 0.9s ease-in-out;
      }
    }
  `,Y([m1({attribute:!1})],u1.prototype,"hass",2),Y([m1({type:Boolean,reflect:!0})],u1.prototype,"narrow",2),Y([m1({attribute:!1})],u1.prototype,"route",2),Y([m1({attribute:!1})],u1.prototype,"panel",2),Y([n2()],u1.prototype,"_info",2),Y([n2()],u1.prototype,"_settings",2),Y([n2()],u1.prototype,"_pipelines",2),Y([n2()],u1.prototype,"_hudOpen",2),Y([n2()],u1.prototype,"_settingsOpen",2),Y([n2()],u1.prototype,"_note",2),Y([n2()],u1.prototype,"_expression",2),Y([n2()],u1.prototype,"_phase",2),Y([n2()],u1.prototype,"_condition",2),Y([n2()],u1.prototype,"_creating",2),Y([n2()],u1.prototype,"_createError",2),Y([d2(".room",!0)],u1.prototype,"_room",2),Y([d2("casita-face",!0)],u1.prototype,"_faceEl",2),Y([d2(".bubble",!0)],u1.prototype,"_bubble",2),Y([d2(".bubble-text",!0)],u1.prototype,"_bubbleText",2),Y([d2("#sr-speech",!0)],u1.prototype,"_srSpeech",2),Y([d2("#chat-input",!0)],u1.prototype,"_input",2),Y([d2("#mood-btn",!0)],u1.prototype,"_moodBtn",2);C5("casita-panel",u1);export{u1 as CasitaPanel,b4 as phaseFrom};
