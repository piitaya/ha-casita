/* Casita panel for Home Assistant. Lit (BSD-3-Clause, Google LLC) bundled. */
var q9=Object.defineProperty;var j9=Object.getOwnPropertyDescriptor;var K=(M,V,L,r)=>{for(var t=r>1?void 0:r?j9(V,L):V,i=M.length-1,n;i>=0;i--)(n=M[i])&&(t=(r?n(V,L,t):n(t))||t);return r&&t&&q9(V,L,t),t};var T3=globalThis,R3=T3.ShadowRoot&&(T3.ShadyCSS===void 0||T3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,d0=Symbol(),N7=new WeakMap,V3=class{constructor(V,L,r){if(this._$cssResult$=!0,r!==d0)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=V,this.t=L}get styleSheet(){let V=this.o,L=this.t;if(R3&&V===void 0){let r=L!==void 0&&L.length===1;r&&(V=N7.get(L)),V===void 0&&((this.o=V=new CSSStyleSheet).replaceSync(this.cssText),r&&N7.set(L,V))}return V}toString(){return this.cssText}},W7=M=>new V3(typeof M=="string"?M:M+"",void 0,d0),I2=(M,...V)=>{let L=M.length===1?M[0]:V.reduce((r,t,i)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(t)+M[i+1],M[0]);return new V3(L,M,d0)},U7=(M,V)=>{if(R3)M.adoptedStyleSheets=V.map(L=>L instanceof CSSStyleSheet?L:L.styleSheet);else for(let L of V){let r=document.createElement("style"),t=T3.litNonce;t!==void 0&&r.setAttribute("nonce",t),r.textContent=L.cssText,M.appendChild(r)}},p0=R3?M=>M:M=>M instanceof CSSStyleSheet?(V=>{let L="";for(let r of V.cssRules)L+=r.cssText;return W7(L)})(M):M;var{is:Y9,defineProperty:X9,getOwnPropertyDescriptor:J9,getOwnPropertyNames:C6,getOwnPropertySymbols:H6,getPrototypeOf:V6}=Object,F3=globalThis,$7=F3.trustedTypes,L6=$7?$7.emptyScript:"",e6=F3.reactiveElementPolyfillSupport,L3=(M,V)=>M,e3={toAttribute(M,V){switch(V){case Boolean:M=M?L6:null;break;case Object:case Array:M=M==null?M:JSON.stringify(M)}return M},fromAttribute(M,V){let L=M;switch(V){case Boolean:L=M!==null;break;case Number:L=M===null?null:Number(M);break;case Object:case Array:try{L=JSON.parse(M)}catch{L=null}}return L}},_3=(M,V)=>!Y9(M,V),G7={attribute:!0,type:String,converter:e3,reflect:!1,useDefault:!1,hasChanged:_3};Symbol.metadata??=Symbol("metadata"),F3.litPropertyMetadata??=new WeakMap;var N2=class extends HTMLElement{static addInitializer(V){this._$Ei(),(this.l??=[]).push(V)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(V,L=G7){if(L.state&&(L.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(V)&&((L=Object.create(L)).wrapped=!0),this.elementProperties.set(V,L),!L.noAccessor){let r=Symbol(),t=this.getPropertyDescriptor(V,r,L);t!==void 0&&X9(this.prototype,V,t)}}static getPropertyDescriptor(V,L,r){let{get:t,set:i}=J9(this.prototype,V)??{get(){return this[L]},set(n){this[L]=n}};return{get:t,set(n){let Z=t?.call(this);i?.call(this,n),this.requestUpdate(V,Z,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(V){return this.elementProperties.get(V)??G7}static _$Ei(){if(this.hasOwnProperty(L3("elementProperties")))return;let V=V6(this);V.finalize(),V.l!==void 0&&(this.l=[...V.l]),this.elementProperties=new Map(V.elementProperties)}static finalize(){if(this.hasOwnProperty(L3("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(L3("properties"))){let L=this.properties,r=[...C6(L),...H6(L)];for(let t of r)this.createProperty(t,L[t])}let V=this[Symbol.metadata];if(V!==null){let L=litPropertyMetadata.get(V);if(L!==void 0)for(let[r,t]of L)this.elementProperties.set(r,t)}this._$Eh=new Map;for(let[L,r]of this.elementProperties){let t=this._$Eu(L,r);t!==void 0&&this._$Eh.set(t,L)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(V){let L=[];if(Array.isArray(V)){let r=new Set(V.flat(1/0).reverse());for(let t of r)L.unshift(p0(t))}else V!==void 0&&L.push(p0(V));return L}static _$Eu(V,L){let r=L.attribute;return r===!1?void 0:typeof r=="string"?r:typeof V=="string"?V.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(V=>this.enableUpdating=V),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(V=>V(this))}addController(V){(this._$EO??=new Set).add(V),this.renderRoot!==void 0&&this.isConnected&&V.hostConnected?.()}removeController(V){this._$EO?.delete(V)}_$E_(){let V=new Map,L=this.constructor.elementProperties;for(let r of L.keys())this.hasOwnProperty(r)&&(V.set(r,this[r]),delete this[r]);V.size>0&&(this._$Ep=V)}createRenderRoot(){let V=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return U7(V,this.constructor.elementStyles),V}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(V=>V.hostConnected?.())}enableUpdating(V){}disconnectedCallback(){this._$EO?.forEach(V=>V.hostDisconnected?.())}attributeChangedCallback(V,L,r){this._$AK(V,r)}_$ET(V,L){let r=this.constructor.elementProperties.get(V),t=this.constructor._$Eu(V,r);if(t!==void 0&&r.reflect===!0){let i=(r.converter?.toAttribute!==void 0?r.converter:e3).toAttribute(L,r.type);this._$Em=V,i==null?this.removeAttribute(t):this.setAttribute(t,i),this._$Em=null}}_$AK(V,L){let r=this.constructor,t=r._$Eh.get(V);if(t!==void 0&&this._$Em!==t){let i=r.getPropertyOptions(t),n=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:e3;this._$Em=t;let Z=n.fromAttribute(L,i.type);this[t]=Z??this._$Ej?.get(t)??Z,this._$Em=null}}requestUpdate(V,L,r,t=!1,i){if(V!==void 0){let n=this.constructor;if(t===!1&&(i=this[V]),r??=n.getPropertyOptions(V),!((r.hasChanged??_3)(i,L)||r.useDefault&&r.reflect&&i===this._$Ej?.get(V)&&!this.hasAttribute(n._$Eu(V,r))))return;this.C(V,L,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(V,L,{useDefault:r,reflect:t,wrapped:i},n){r&&!(this._$Ej??=new Map).has(V)&&(this._$Ej.set(V,n??L??this[V]),i!==!0||n!==void 0)||(this._$AL.has(V)||(this.hasUpdated||r||(L=void 0),this._$AL.set(V,L)),t===!0&&this._$Em!==V&&(this._$Eq??=new Set).add(V))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(L){Promise.reject(L)}let V=this.scheduleUpdate();return V!=null&&await V,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[t,i]of this._$Ep)this[t]=i;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[t,i]of r){let{wrapped:n}=i,Z=this[t];n!==!0||this._$AL.has(t)||Z===void 0||this.C(t,void 0,i,Z)}}let V=!1,L=this._$AL;try{V=this.shouldUpdate(L),V?(this.willUpdate(L),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(L)):this._$EM()}catch(r){throw V=!1,this._$EM(),r}V&&this._$AE(L)}willUpdate(V){}_$AE(V){this._$EO?.forEach(L=>L.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(V)),this.updated(V)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(V){return!0}update(V){this._$Eq&&=this._$Eq.forEach(L=>this._$ET(L,this[L])),this._$EM()}updated(V){}firstUpdated(V){}};N2.elementStyles=[],N2.shadowRootOptions={mode:"open"},N2[L3("elementProperties")]=new Map,N2[L3("finalized")]=new Map,e6?.({ReactiveElement:N2}),(F3.reactiveElementVersions??=[]).push("2.1.2");var c0=globalThis,Q7=M=>M,E3=c0.trustedTypes,z7=E3?E3.createPolicy("lit-html",{createHTML:M=>M}):void 0,J7="$lit$",L5=`lit$${Math.random().toFixed(9).slice(2)}$`,C4="?"+L5,M6=`<${C4}>`,s5=document,r3=()=>s5.createComment(""),t3=M=>M===null||typeof M!="object"&&typeof M!="function",Z0=Array.isArray,r6=M=>Z0(M)||typeof M?.[Symbol.iterator]=="function",l0=`[ 	
\f\r]`,M3=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,K7=/-->/g,q7=/>/g,l5=RegExp(`>|${l0}(?:([^\\s"'>=/]+)(${l0}*=${l0}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),j7=/'/g,Y7=/"/g,H4=/^(?:script|style|textarea|title)$/i,S0=M=>(V,...L)=>({_$litType$:M,strings:V,values:L}),l1=S0(1),G6=S0(2),Q6=S0(3),v5=Symbol.for("lit-noChange"),f1=Symbol.for("lit-nothing"),X7=new WeakMap,m5=s5.createTreeWalker(s5,129);function V4(M,V){if(!Z0(M)||!M.hasOwnProperty("raw"))throw Error("invalid template strings array");return z7!==void 0?z7.createHTML(V):V}var t6=(M,V)=>{let L=M.length-1,r=[],t,i=V===2?"<svg>":V===3?"<math>":"",n=M3;for(let Z=0;Z<L;Z++){let m=M[Z],g,w,u=-1,W=0;for(;W<m.length&&(n.lastIndex=W,w=n.exec(m),w!==null);)W=n.lastIndex,n===M3?w[1]==="!--"?n=K7:w[1]!==void 0?n=q7:w[2]!==void 0?(H4.test(w[2])&&(t=RegExp("</"+w[2],"g")),n=l5):w[3]!==void 0&&(n=l5):n===l5?w[0]===">"?(n=t??M3,u=-1):w[1]===void 0?u=-2:(u=n.lastIndex-w[2].length,g=w[1],n=w[3]===void 0?l5:w[3]==='"'?Y7:j7):n===Y7||n===j7?n=l5:n===K7||n===q7?n=M3:(n=l5,t=void 0);let I=n===l5&&M[Z+1].startsWith("/>")?" ":"";i+=n===M3?m+M6:u>=0?(r.push(g),m.slice(0,u)+J7+m.slice(u)+L5+I):m+L5+(u===-2?Z:I)}return[V4(M,i+(M[L]||"<?>")+(V===2?"</svg>":V===3?"</math>":"")),r]},i3=class M{constructor({strings:V,_$litType$:L},r){let t;this.parts=[];let i=0,n=0,Z=V.length-1,m=this.parts,[g,w]=t6(V,L);if(this.el=M.createElement(g,r),m5.currentNode=this.el.content,L===2||L===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(t=m5.nextNode())!==null&&m.length<Z;){if(t.nodeType===1){if(t.hasAttributes())for(let u of t.getAttributeNames())if(u.endsWith(J7)){let W=w[n++],I=t.getAttribute(u).split(L5),R=/([.?@])?(.*)/.exec(W);m.push({type:1,index:i,name:R[2],strings:I,ctor:R[1]==="."?s0:R[1]==="?"?v0:R[1]==="@"?x0:R5}),t.removeAttribute(u)}else u.startsWith(L5)&&(m.push({type:6,index:i}),t.removeAttribute(u));if(H4.test(t.tagName)){let u=t.textContent.split(L5),W=u.length-1;if(W>0){t.textContent=E3?E3.emptyScript:"";for(let I=0;I<W;I++)t.append(u[I],r3()),m5.nextNode(),m.push({type:2,index:++i});t.append(u[W],r3())}}}else if(t.nodeType===8)if(t.data===C4)m.push({type:2,index:i});else{let u=-1;for(;(u=t.data.indexOf(L5,u+1))!==-1;)m.push({type:7,index:i}),u+=L5.length-1}i++}}static createElement(V,L){let r=s5.createElement("template");return r.innerHTML=V,r}};function T5(M,V,L=M,r){if(V===v5)return V;let t=r!==void 0?L._$Co?.[r]:L._$Cl,i=t3(V)?void 0:V._$litDirective$;return t?.constructor!==i&&(t?._$AO?.(!1),i===void 0?t=void 0:(t=new i(M),t._$AT(M,L,r)),r!==void 0?(L._$Co??=[])[r]=t:L._$Cl=t),t!==void 0&&(V=T5(M,t._$AS(M,V.values),t,r)),V}var m0=class{constructor(V,L){this._$AV=[],this._$AN=void 0,this._$AD=V,this._$AM=L}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(V){let{el:{content:L},parts:r}=this._$AD,t=(V?.creationScope??s5).importNode(L,!0);m5.currentNode=t;let i=m5.nextNode(),n=0,Z=0,m=r[0];for(;m!==void 0;){if(n===m.index){let g;m.type===2?g=new o3(i,i.nextSibling,this,V):m.type===1?g=new m.ctor(i,m.name,m.strings,this,V):m.type===6&&(g=new u0(i,this,V)),this._$AV.push(g),m=r[++Z]}n!==m?.index&&(i=m5.nextNode(),n++)}return m5.currentNode=s5,t}p(V){let L=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(V,r,L),L+=r.strings.length-2):r._$AI(V[L])),L++}},o3=class M{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(V,L,r,t){this.type=2,this._$AH=f1,this._$AN=void 0,this._$AA=V,this._$AB=L,this._$AM=r,this.options=t,this._$Cv=t?.isConnected??!0}get parentNode(){let V=this._$AA.parentNode,L=this._$AM;return L!==void 0&&V?.nodeType===11&&(V=L.parentNode),V}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(V,L=this){V=T5(this,V,L),t3(V)?V===f1||V==null||V===""?(this._$AH!==f1&&this._$AR(),this._$AH=f1):V!==this._$AH&&V!==v5&&this._(V):V._$litType$!==void 0?this.$(V):V.nodeType!==void 0?this.T(V):r6(V)?this.k(V):this._(V)}O(V){return this._$AA.parentNode.insertBefore(V,this._$AB)}T(V){this._$AH!==V&&(this._$AR(),this._$AH=this.O(V))}_(V){this._$AH!==f1&&t3(this._$AH)?this._$AA.nextSibling.data=V:this.T(s5.createTextNode(V)),this._$AH=V}$(V){let{values:L,_$litType$:r}=V,t=typeof r=="number"?this._$AC(V):(r.el===void 0&&(r.el=i3.createElement(V4(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===t)this._$AH.p(L);else{let i=new m0(t,this),n=i.u(this.options);i.p(L),this.T(n),this._$AH=i}}_$AC(V){let L=X7.get(V.strings);return L===void 0&&X7.set(V.strings,L=new i3(V)),L}k(V){Z0(this._$AH)||(this._$AH=[],this._$AR());let L=this._$AH,r,t=0;for(let i of V)t===L.length?L.push(r=new M(this.O(r3()),this.O(r3()),this,this.options)):r=L[t],r._$AI(i),t++;t<L.length&&(this._$AR(r&&r._$AB.nextSibling,t),L.length=t)}_$AR(V=this._$AA.nextSibling,L){for(this._$AP?.(!1,!0,L);V!==this._$AB;){let r=Q7(V).nextSibling;Q7(V).remove(),V=r}}setConnected(V){this._$AM===void 0&&(this._$Cv=V,this._$AP?.(V))}},R5=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(V,L,r,t,i){this.type=1,this._$AH=f1,this._$AN=void 0,this.element=V,this.name=L,this._$AM=t,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=f1}_$AI(V,L=this,r,t){let i=this.strings,n=!1;if(i===void 0)V=T5(this,V,L,0),n=!t3(V)||V!==this._$AH&&V!==v5,n&&(this._$AH=V);else{let Z=V,m,g;for(V=i[0],m=0;m<i.length-1;m++)g=T5(this,Z[r+m],L,m),g===v5&&(g=this._$AH[m]),n||=!t3(g)||g!==this._$AH[m],g===f1?V=f1:V!==f1&&(V+=(g??"")+i[m+1]),this._$AH[m]=g}n&&!t&&this.j(V)}j(V){V===f1?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,V??"")}},s0=class extends R5{constructor(){super(...arguments),this.type=3}j(V){this.element[this.name]=V===f1?void 0:V}},v0=class extends R5{constructor(){super(...arguments),this.type=4}j(V){this.element.toggleAttribute(this.name,!!V&&V!==f1)}},x0=class extends R5{constructor(V,L,r,t,i){super(V,L,r,t,i),this.type=5}_$AI(V,L=this){if((V=T5(this,V,L,0)??f1)===v5)return;let r=this._$AH,t=V===f1&&r!==f1||V.capture!==r.capture||V.once!==r.once||V.passive!==r.passive,i=V!==f1&&(r===f1||t);t&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,V),this._$AH=V}handleEvent(V){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,V):this._$AH.handleEvent(V)}},u0=class{constructor(V,L,r){this.element=V,this.type=6,this._$AN=void 0,this._$AM=L,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(V){T5(this,V)}};var i6=c0.litHtmlPolyfillSupport;i6?.(i3,o3),(c0.litHtmlVersions??=[]).push("3.3.3");var L4=(M,V,L)=>{let r=L?.renderBefore??V,t=r._$litPart$;if(t===void 0){let i=L?.renderBefore??null;r._$litPart$=t=new o3(V.insertBefore(r3(),i),i,void 0,L??{})}return t._$AI(M),t};var h0=globalThis,V2=class extends N2{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let V=super.createRenderRoot();return this.renderOptions.renderBefore??=V.firstChild,V}update(V){let L=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(V),this._$Do=L4(L,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return v5}};V2._$litElement$=!0,V2.finalized=!0,h0.litElementHydrateSupport?.({LitElement:V2});var o6=h0.litElementPolyfillSupport;o6?.({LitElement:V2});(h0.litElementVersions??=[]).push("4.2.2");var a6={attribute:!0,type:String,converter:e3,reflect:!1,hasChanged:_3},A6=(M=a6,V,L)=>{let{kind:r,metadata:t}=L,i=globalThis.litPropertyMetadata.get(t);if(i===void 0&&globalThis.litPropertyMetadata.set(t,i=new Map),r==="setter"&&((M=Object.create(M)).wrapped=!0),i.set(L.name,M),r==="accessor"){let{name:n}=L;return{set(Z){let m=V.get.call(this);V.set.call(this,Z),this.requestUpdate(n,m,M,!0,Z)},init(Z){return Z!==void 0&&this.C(n,void 0,M,Z),Z}}}if(r==="setter"){let{name:n}=L;return function(Z){let m=this[n];V.call(this,Z),this.requestUpdate(n,m,M,!0,Z)}}throw Error("Unsupported decorator location: "+r)};function o1(M){return(V,L)=>typeof L=="object"?A6(M,V,L):((r,t,i)=>{let n=t.hasOwnProperty(i);return t.constructor.createProperty(i,r),n?Object.getOwnPropertyDescriptor(t,i):void 0})(M,V,L)}function L2(M){return o1({...M,state:!0,attribute:!1})}var x5=(M,V,L)=>(L.configurable=!0,L.enumerable=!0,Reflect.decorate&&typeof V!="object"&&Object.defineProperty(M,V,L),L);function s2(M,V){return(L,r,t)=>{let i=n=>n.renderRoot?.querySelector(M)??null;if(V){let{get:n,set:Z}=typeof r=="object"?L:t??(()=>{let m=Symbol();return{get(){return this[m]},set(g){this[m]=g}}})();return x5(L,r,{get(){let m=n.call(this);return m===void 0&&(m=i(this),(m!==null||this.hasUpdated)&&Z.call(this,m)),m}})}return x5(L,r,{get(){return i(this)}})}}var e5=(M,V)=>{customElements.get(M)||customElements.define(M,V)};var n6="http://www.w3.org/2000/svg",n4="M120,109.38c0,4.12-3.38,7.5-7.5,7.5H7.5c-4.12,0-7.5-3.38-7.5-7.5v-45c0-4.12,2.39-9.89,5.3-12.8L54.7,2.19c2.92-2.92,7.69-2.92,10.61,0l49.39,49.39c2.92,2.92,5.3,8.68,5.3,12.8v45Z",E5="#f2f4f9",R0={blue:"#18bcf2",red:"#ed1c24",orange:"#f7931e",gray:"#999999"},W2=60,F5=116.88,d6=8,z1=120,e4=90,D3=40,R2=Math.PI*2,p6="M108.97,24.83h-5.52c0-4.56-3.71-8.28-8.28-8.28v-5.52c7.61,0,13.79,6.19,13.79,13.79Z",l6="M120,24.83h-5.52c0-10.65-8.66-19.31-19.31-19.31V0c13.69,0,24.83,11.14,24.83,24.83Z",m6="M111.91,12.57c0,2.03-.66,3.7-1.99,5.03-.69.69-1.37,1.31-2.05,1.87-.85.69-1.46,1.25-1.81,1.68s-.56.9-.62,1.4v.69h-4.52v-.91c.02-.48.09-.93.22-1.35s.27-.78.44-1.09.42-.64.74-1,.63-.66.92-.92.68-.6,1.19-1.02c.73-.6,1.29-1.09,1.67-1.47s.68-.8.91-1.23.34-.9.34-1.4c0-.86-.3-1.59-.89-2.18s-1.37-.89-2.34-.89c-1.04,0-1.9.33-2.58,1s-1.03,1.48-1.03,2.45h-4.58c0-2.25.78-4.14,2.34-5.67s3.5-2.29,5.82-2.29c1.44,0,2.75.29,3.93.88s2.13,1.44,2.84,2.56c.71,1.12,1.06,2.41,1.06,3.86ZM106.06,26.89c0,.71-.25,1.3-.76,1.78s-1.16.72-1.95.72-1.4-.24-1.91-.73-.77-1.07-.77-1.77.26-1.3.77-1.79,1.15-.74,1.91-.74,1.4.25,1.93.74.79,1.09.79,1.79Z",s6="M93.5,21.29l9.04-9.55h-9.04v-4.91h16v4.95l-9.27,9.51h9.27v4.95h-16v-4.95Z",M4=[[91.66,28.34,3.66],[100.8,19.2,5.49],[112.69,7.31,7.31]],f0=[92,90.885,6],r4=[[104,91.885,6],[16,100.885,6]],w0={heart:"M0,-9.77c-3.12,-3.12 -8.19,-3.12 -11.31,0c-3.12,3.12 -3.12,8.19 0,11.31L0,12.86L11.31,1.54c3.12,-3.12 3.12,-8.19 0,-11.31c-3.12,-3.12 -8.19,-3.12 -11.31,0Z",z:"M-8,4.76l9.04,-9.55h-9.04v-4.91h16v4.95l-9.27,9.51h9.27v4.95h-16v-4.95Z",sparkle:"M0,-7C1,-1.4 1.4,-1 7,0C1.4,1 1,1.4 0,7C-1,1.4 -1.4,1 -7,0C-1.4,-1 -1,-1.4 0,-7Z",star:(()=>{let M="";for(let V=0;V<10;V++){let L=-Math.PI/2+V*Math.PI/5,r=V%2?2.6:6.4;M+=(V?"L":"M")+(r*Math.cos(L)).toFixed(2)+","+(r*Math.sin(L)).toFixed(2)}return M+"Z"})(),steam:"M-4,0a4,4 0 1,0 8,0a4,4 0 1,0 -8,0Z",tear:"M0,-8.49L4.24,-4.24A6,6 0 1,1 -4.24,-4.24Z",note:"M0,-9C2,-7 6,-6.5 5,-2C4.5,-4.5 2.5,-5 1.6,-5L1.6,5.2C1.6,7.6 -1.2,9 -3.6,8.6C-6.2,8.2 -6.6,5.6 -4.4,4.2C-2.8,3.2 -1,3.2 0,3.8Z",dot:"M-2.5,0a2.5,2.5 0 1,0 5,0a2.5,2.5 0 1,0 -5,0Z",puff:"M-7.5,3.2a3.6,3.6 0 0,1 0.6,-6.4a4.6,4.6 0 0,1 8.4,-2.6a4,4 0 0,1 6.6,3.4a3.2,3.2 0 0,1 -0.8,5.6Z"},$2=(M,V,L)=>M<V?V:M>L?L:M,_1=M=>$2(M,0,1),S2=(M,V,L)=>M+(V-M)*L,N1=(M,V)=>M+Math.random()*(V-M),M5=M=>(M=_1(M),M*M*(3-2*M)),Q=M=>Math.abs(M)<.005?"0":(Math.round(M*100)/100).toString(),I3=M=>M-Math.floor(M);function v6(M){M=String(M).replace("#",""),M.length===3&&(M=M.split("").map(L=>L+L).join(""));let V=parseInt(M,16);return[V>>16&255,V>>8&255,V&255]}var g0=M=>(M/=255,M<=.04045?M/12.92:Math.pow((M+.055)/1.055,2.4)),y0=M=>(M=$2(M,0,1),M=M<=.0031308?12.92*M:1.055*Math.pow(M,1/2.4)-.055,$2(Math.round(M*255),0,255));function x6(M){let V=g0(M[0]),L=g0(M[1]),r=g0(M[2]),t=Math.cbrt(.4122214708*V+.5363325363*L+.0514459929*r),i=Math.cbrt(.2119034982*V+.6806995451*L+.1073969566*r),n=Math.cbrt(.0883024619*V+.2817188376*L+.6299787005*r);return[.2104542553*t+.793617785*i-.0040720468*n,1.9779984951*t-2.428592205*i+.4505937099*n,.0259040371*t+.7827717662*i-.808675766*n]}function P0(M,V,L){let r=M+.3963377774*V+.2158037573*L,t=M-.1055613458*V-.0638541728*L,i=M-.0894841775*V-1.291485548*L,n=r*r*r,Z=t*t*t,m=i*i*i;return[y0(4.0767416621*n-3.3077115913*Z+.2309699292*m),y0(-1.2684380046*n+2.6097574011*Z-.3413193965*m),y0(-.0041960863*n-.7034186147*Z+1.707614701*m)]}var U3=M=>x6(v6(M)),O0=U3(E5);function t4(M){return M&&typeof M=="object"&&!Array.isArray(M)}function U2(...M){let V={};for(let L of M)if(t4(L))for(let r of Object.keys(L))V[r]=t4(L[r])?U2(V[r],L[r]):L[r];return V}var n3=new Float64Array(z1),d3=new Float64Array(z1);for(let M=0;M<z1;M++)n3[M]=Math.cos(R2*M/z1),d3[M]=Math.sin(R2*M/z1);function i4(M,V,L,r,t,i,n){let Z=M-t,m=V-i,g=Z*L+m*r,w=Z*Z+m*m-n*n,u=g*g-w;return u<0?0:-g+Math.sqrt(u)}var N3=[-4,-1.88],B0=new Float64Array(z1),d4=new Float64Array(z1),p4=new Float64Array(z1);(function(){let[M,V]=N3,L=8*Math.SQRT2,r=-4,t=1.665;for(let Z=0;Z<z1;Z++){let m=n3[Z],g=d3[Z],w=Math.max(i4(M,V,m,g,-9.655,-3.995,8),i4(M,V,m,g,1.655,-3.995,8)),u=1/0;for(let W of[-1,1])for(let I of[-1,1]){let R=W*m+I*g;R>1e-9&&(u=Math.min(u,(L+W*r+I*t-(W*M+I*V))/R))}u!==1/0&&(w=Math.max(w,u)),B0[Z]=w}for(let Z=0;Z<z1;Z++)d4[Z]=B0[((z1/2-Z)%z1+z1)%z1];let i=12*Math.SQRT2,n=3;for(let Z=0;Z<z1;Z++){let m=0;for(let g of[Math.PI/4,-Math.PI/4]){let w=n3[Z]*Math.cos(g)+d3[Z]*Math.sin(g),u=-n3[Z]*Math.sin(g)+d3[Z]*Math.cos(g);m=Math.max(m,Math.min(Math.abs(w)>1e-9?i/Math.abs(w):1/0,Math.abs(u)>1e-9?n/Math.abs(u):1/0))}p4[Z]=m}})();function o4(M,V,L,r,t){let i=[],n=M.length;if(n<6)return i;let Z=M[n-2],m=M[n-1],g=(Z-V)*r+(m-L)*t;for(let w=0;w<n;w+=2){let u=M[w],W=M[w+1],I=(u-V)*r+(W-L)*t;if(I>=0){if(g<0){let R=g/(g-I);i.push(Z+(u-Z)*R,m+(W-m)*R)}i.push(u,W)}else if(g>=0){let R=g/(g-I);i.push(Z+(u-Z)*R,m+(W-m)*R)}Z=u,m=W,g=I}return i}function b0(M){if(!M||M.length<6)return"";let V="M"+Q(M[0])+","+Q(M[1]);for(let L=2;L<M.length;L+=2)V+="L"+Q(M[L])+","+Q(M[L+1]);return V+"Z"}function u6(M,V){let L=M.s;if(!(L>.01))return null;let r=d6*L,t=_1(M.heart),i=_1(M.cross),n=V<0?B0:d4,Z=M.x+(V<0?N3[0]:-N3[0])*L,m=M.y+N3[1]*L,g=M.x,w=M.y+.5*L,u=new Array(z1*2);for(let A=0;A<z1;A++){let t1=n3[A],e2=d3[A],E1=M.x+r*t1,f2=M.y+r*e2;if(t>0){let a1=n[A]*L;E1=S2(E1,Z+a1*t1,t),f2=S2(f2,m+a1*e2,t)}if(i>0){let a1=p4[A]*L;E1=S2(E1,g+a1*t1,i),f2=S2(f2,w+a1*e2,i)}u[2*A]=E1,u[2*A+1]=f2}let W=1-Math.max(t,i),I=_1(M.top)*W,R=_1(M.bot)*W;if(I+R>1){let A=1/(I+R);I*=A,R*=A}if(I>.001||Math.abs(M.ang*W)>.05){let A=(V<0?M.ang:-M.ang)*W*Math.PI/180;u=o4(u,M.x,M.y-r+2*r*I,-Math.sin(A),Math.cos(A))}R>.001&&(u=o4(u,M.x,M.y+r-2*r*R,0,-1));let Z1=Math.max(.1,M.open);if(Math.abs(Z1-1)>1e-4)for(let A=1;A<u.length;A+=2)u[A]=M.y+(u[A]-M.y)*Z1;return u}function k0(M,V,L,r){if(L<=1e-6||r<=1e-6)return 0;let t=Math.abs(M-V);if(t>L)return 0;let i=Math.min(r,L),n=L-i;if(t<=n)return r;let Z=t-n;return r-i+Math.sqrt(Math.max(0,i*i-Z*Z))}function D5(M,V,L,r,t,i,n,Z,m){r=Math.max(0,r),t=Math.max(0,t),n=Math.max(0,n);let g=Math.abs(i),w=i<0?-1:1;for(let u=0;u<Z;u++){let W=m?Z-1-u:u,I=V-r*Math.cos(Math.PI*W/(Z-1)),R=n>1e-4?Math.max(k0(I,V-n,t,g),k0(I,V+n,t,g)):k0(I,V,t,g);M.push(I,L+w*R)}}function c6(M){return[M.x,(M.tY+M.bY)/2+(Math.max(M.tH,M.bH,0)+Math.min(M.tH,M.bH,0))/2]}function l4(M,V){let[L,r]=c6(V),t=V.s,i=V.rot*Math.PI/180,n=Math.cos(i),Z=Math.sin(i);if(Math.abs(t-1)<1e-4&&Math.abs(i)<1e-5)return M;for(let m=0;m<M.length;m+=2){let g=(M[m]-L)*t,w=(M[m+1]-r)*t;M[m]=L+g*n-w*Z,M[m+1]=r+g*Z+w*n}return M}function Z6(M){if(!(M.s>.01))return null;let V=$2(M.talk,0,1.6),L=M.tH-5*V,r=M.bH+9*V,t=V>0?Math.max(M.bR,M.tR*V+M.bR*(1-V)):M.bR,i=[];return D5(i,M.x,M.tY,M.tR,M.tA,L,M.tD,e4,!1),D5(i,M.x,M.bY,t,Math.max(M.bA,V>0?S2(M.bA,M.tA,_1(V)):0),r,M.bD,e4,!0),l4(i,M)}function S6(M){let V=M.tongue;if(!(V>.01)||!(M.s>.01))return null;let L=12*V,r=Math.abs(M.tgH)*V,t=M.tgH<0,i=M.tgY+(t?0:6*$2(M.talk,0,1.6)),n=[];return t?(D5(n,M.tgX,i,L,L,-r,0,D3,!1),D5(n,M.tgX,i+1.2,L,L,0,0,D3,!0)):(D5(n,M.tgX,i-1.2,L,L,0,0,D3,!1),D5(n,M.tgX,i,L,L,r,0,D3,!0)),l4(n,M)}function a4(M,V,L){if(!(L>.05))return"";let r=L*Math.SQRT1_2;return"M"+Q(M)+","+Q(V-L*Math.SQRT2)+"L"+Q(M+r)+","+Q(V-r)+"A"+Q(L)+","+Q(L)+" 0 1 1 "+Q(M-r)+","+Q(V-r)+"Z"}var h6=["x","y","s","top","bot","ang","heart","cross","shine","open"],m4=["x","s","rot","tY","tR","tA","tH","tD","bY","bR","bA","bH","bD","tongue","tgX","tgY","tgH","talk"],s4=["bubbles","wifi","question","z","tear","sweat"],F2=[];["x","y","rot","sx","sy","skew"].forEach(M=>F2.push(["body."+M,"body"]));["L","A","B"].forEach(M=>F2.push(["body."+M,"color"]));["x","y"].forEach(M=>F2.push(["face."+M,"face"]));for(let M of["eyeL","eyeR"])h6.forEach(V=>F2.push([M+"."+V,V==="x"||V==="y"?"eyePos":V==="top"||V==="bot"||V==="ang"?"lids":"eyes"]));F2.push(["dot.s","eyes"]);F2.push(["dot.dy","eyePos"]);m4.forEach(M=>F2.push(["mouth."+M,M==="talk"?"talk":"mouth"]));s4.forEach(M=>F2.push(["acc."+M,"acc"]));var I5=F2.map(M=>M[0]),A4=F2.map(M=>M[1]),_={};I5.forEach((M,V)=>{_[M]=V});var T2=I5.length,T0={snappy:[420,30],soft:[150,21],bouncy:[300,13],heavy:[70,12],crisp:[700,52]},f6={body:[200,17],color:[90,19],face:[190,24],eyes:[480,34],lids:[520,44],eyePos:[650,46],mouth:[360,29],talk:[1300,66],acc:[230,15]},g6=["body","eyes","mouth","acc"],y6={body:0,color:0,face:0,eyes:60,lids:60,eyePos:60,mouth:110,talk:110,acc:170},m1={smile:(M=80.88)=>({tY:M,tR:13,tA:13,tH:13,tD:0,bY:M,bR:19,bA:19,bH:19,bD:0}),frown:(M=96.88)=>({tY:M,tR:19,tA:19,tH:-19,tD:0,bY:M,bR:13,bA:13,bH:-13,bD:0}),openD:(M=80.88)=>({tY:M,tR:20,tA:20,tH:0,tD:0,bY:M,bR:20,bA:20,bH:20,bD:0}),openFrown:(M=94.88)=>({tY:M,tR:20,tA:20,tH:-20,tD:0,bY:M,bR:20,bA:20,bH:0,bD:0}),O:(M,V)=>({tY:V,tR:M,tA:M,tH:-M,tD:0,bY:V,bR:M,bA:M,bH:M,bD:0}),line:M=>({tY:M-3,tR:20,tA:20,tH:0,tD:0,bY:M+3,bR:20,bA:20,bH:0,bD:0}),grin:()=>({tY:89.88,tR:35,tA:35,tH:-8,tD:0,bY:89.88,bR:35,bA:35,bH:8,bD:0}),uwu:()=>({tY:80.88,tR:19,tA:5,tH:5,tD:8,bY:80.88,bR:19,bA:11,bH:11,bD:8}),none:()=>Object.assign(m1.smile(),{s:0})},a3=(M,V=12)=>({tongue:1,tgX:68,tgY:M,tgH:V}),W3={breath:{rate:.23,amp:.012},blink:{on:!0,min:2200,max:5600,double:.18,close:95,hold:45,open:150},saccade:{on:!0,min:650,max:2600,range:2.4,micro:.18},sway:{amp:.55,rate:.28},gaze:{eye:4.2,face:1.6,rot:4,skew:-1.2,bx:2}},A3={blink:{on:!1},saccade:{on:!1}},G2={Normal:{label:"Content",mouth:m1.smile()},Alert:{label:"Alerte",mouth:m1.O(15,87.88),spring:"snappy",life:{blink:{min:3200,max:7e3},saccade:{min:350,max:1200,range:3.2},breath:{rate:.45,amp:.016}}},Angry:{label:"En colère",color:"red",eyes:{top:.5},mouth:m1.openFrown(94.88),spring:"snappy",life:{breath:{rate:.5,amp:.02},saccade:{range:1,min:1500,max:4e3},blink:{min:4e3,max:8e3},sway:{amp:.25}}},Scared:{label:"Effrayé",color:"red",mouth:m1.openFrown(94.88),spring:"snappy",life:{breath:{rate:.7,amp:.018},saccade:{min:250,max:900,range:3.4},sway:{amp:.9,rate:1.4}}},Cheeky:{label:"Taquin",mouth:Object.assign(m1.line(83.88),a3(86.88)),spring:"bouncy"},DeadAss:{label:"Blasé",eyeR:{top:.5},mouth:Object.assign(m1.line(83.88),a3(86.88)),life:{saccade:{range:1.2,min:2e3,max:5e3},breath:{rate:.16}}},Dead:{label:"K.O.",color:"red",eyes:{cross:1},mouth:Object.assign(m1.line(87.88),a3(90.88)),life:U2(A3,{breath:{rate:.12,amp:.006},sway:{amp:.2}})},Devious:{label:"Malicieux",eyes:{top:.5},mouth:m1.smile(),life:{saccade:{range:1.8,min:900,max:2400}}},Focusing:{label:"Concentré",mouth:Object.assign(m1.line(91.88),a3(88.88,-12)),acc:{bubbles:1},life:{saccade:{range:1.2,min:1400,max:3600},blink:{min:3500,max:7e3}}},Grateful:{label:"Reconnaissant",eyes:{bot:.5,y:69.88},mouth:m1.openD(76.88),spring:"soft"},Grinning:{label:"Rayonnant",mouth:m1.grin(),spring:"bouncy",life:{breath:{rate:.3,amp:.016}}},Happy:{label:"Heureux",mouth:m1.openD(80.88),spring:"bouncy",life:{breath:{rate:.3,amp:.016}}},Hurt:{label:"Blessé",color:"red",eyes:{cross:1},mouth:m1.openFrown(98.88),spring:"snappy",life:U2(A3,{breath:{rate:.6,amp:.014},sway:{amp:.6,rate:1.1}})},Initializing:{label:"Démarrage",eyes:{s:0},mouth:m1.none(),life:A3},Loading:{label:"Chargement",dot:1,mouth:m1.none(),life:A3},Loving:{label:"Amoureux",eyes:{heart:1},mouth:m1.openD(80.88),spring:"bouncy",life:{blink:{min:2600,max:5e3,double:.35},saccade:{range:1.4},breath:{rate:.2,amp:.016}}},NoInternet:{label:"Hors ligne",color:"orange",mouth:m1.frown(),acc:{wifi:1}},Pleading:{label:"Suppliant",color:"orange",eyes:{s:1.5},mouth:m1.frown(),acc:{tear:1},spring:"soft",life:{blink:{min:1800,max:3600,double:.5,close:130,open:220},saccade:{range:1}}},Problem:{label:"Problème",color:"orange",mouth:m1.frown(),acc:{question:1}},Sad:{label:"Triste",color:"orange",mouth:m1.frown(),spring:"heavy",life:{breath:{rate:.17,amp:.01},saccade:{range:1.6,min:1500,max:4e3},blink:{close:140,open:240}}},Silly:{label:"Farceur",eyeR:{y:59.88},mouth:Object.assign(m1.line(83.88),a3(86.88)),spring:"bouncy"},Sleeping:{label:"Endormi",color:"gray",eyes:{top:.5},mouth:m1.O(10,86.88),acc:{z:1},spring:"heavy",life:U2(A3,{breath:{rate:.13,amp:.03},sway:{amp:.3,rate:.15}})},Smiling:{label:"Souriant",eyes:{bot:.5,y:69.88},mouth:m1.smile(),spring:"soft"},Sweating:{label:"En sueur",mouth:m1.openD(80.88),acc:{sweat:1},life:{breath:{rate:.55,amp:.016},saccade:{min:400,max:1400,range:3}}},UwU:{label:"UwU",mouth:m1.uwu(),spring:"bouncy"},WTF:{label:"WTF",color:"orange",eyes:{top:.5},mouth:m1.line(87.88),life:{saccade:{range:.8,min:2500,max:6e3}}},Winking:{label:"Clin d'œil",eyeR:{top:.5},mouth:m1.openD(80.88),spring:"bouncy"},WinkingSmile:{label:"Clin d'œil souriant",eyeR:{top:.5},mouth:m1.smile(),spring:"bouncy"}};function v4(){let M={};Object.assign(M,{"body.x":0,"body.y":0,"body.rot":0,"body.sx":1,"body.sy":1,"body.skew":0,"face.x":0,"face.y":0,"dot.s":0,"dot.dy":0});for(let[V,L]of[["eyeL",33],["eyeR",87]])Object.assign(M,{[V+".x"]:L,[V+".y"]:65.88,[V+".s"]:1,[V+".top"]:0,[V+".bot"]:0,[V+".ang"]:0,[V+".heart"]:0,[V+".cross"]:0,[V+".shine"]:0,[V+".open"]:1});Object.assign(M,{"mouth.x":60,"mouth.s":1,"mouth.rot":0,"mouth.tongue":0,"mouth.talk":0});for(let V of s4)M["acc."+V]=0;return M}var _5={};for(let M of Object.keys(G2)){let V=G2[M],L=v4(),[r,t,i]=U3(R0[V.color||"blue"]);L["body.L"]=r,L["body.A"]=t,L["body.B"]=i;for(let n of["eyeL","eyeR"]){let Z=Object.assign({},V.eyes||{},V[n]||{});for(let m of Object.keys(Z))L[n+"."+m]=Z[m]}V.dot&&(L["dot.s"]=V.dot);for(let n of Object.keys(V.mouth||{}))L["mouth."+n]=V.mouth[n];for(let n of Object.keys(V.acc||{}))L["acc."+n]=V.acc[n];_5[M]=L}var O6=Object.keys(G2).map(M=>({id:M,label:G2[M].label,color:R0[G2[M].color||"blue"]}));function b6(M,V){let L=Object.assign({expression:"Normal",life:!0,autoplay:!0,viewBox:"-50 -60 220 230",reducedMotion:null,floor:null,palette:null},V||{}),r=Object.assign({spark:"#ffd23f",star:"#ffd23f",steam:"#c9d3df",puff:"#ffffff",puffEdge:"#b9c6d2",shine:"#ffffff"},L.palette||{}),t=(L.reducedMotion!=null?L.reducedMotion:globalThis.matchMedia&&globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches)?.4:1;for(;M.firstChild;)M.removeChild(M.firstChild);M.setAttribute("viewBox",L.viewBox),M.getAttribute("role")||M.setAttribute("role","img");let i=(d,v,p)=>{let h=document.createElementNS(n6,d);for(let b in v)h.setAttribute(b,v[b]);return p&&p.appendChild(h),h},n=i("g",{class:"casita"},M),Z=i("g",{class:"casita-body"},n),m=i("path",{d:n4,class:"casita-house"},Z),g=i("g",{class:"casita-face",fill:E5},Z),w=[i("path",{},g),i("path",{},g)],u=[0,1,2,3].map(()=>i("circle",{r:0},g)),W=i("circle",{cx:60,cy:65.88,r:0},g),I=i("path",{},g),R=i("path",{},g),Z1=i("path",{},g),A=i("g",{class:"casita-acc"},Z),t1=r4.map(()=>i("path",{fill:E5},A)),e2=M4.map(([d,v])=>i("circle",{cx:d,cy:v,r:0},A)),E1=i("g",{},A),f2=i("circle",{cx:95.17,cy:24.83,r:2.76},E1),a1=i("path",{d:p6},E1),q3=i("path",{d:l6},E1),K2=i("path",{d:m6},A),j3=[0,1,2].map(()=>i("path",{d:s6},A)),a=i("g",{class:"casita-particles"},n),Y=new Float64Array(T2),M2=new Float64Array(T2),b1=new Float64Array(T2),z=new Float64Array(T2),V1=new Float64Array(T2),s3=new Float64Array(T2),U5=new Float64Array(T2),$1={},v2=null,C1=0,n2=!1,G1=!!L.life,u5=!1,r2=[],t2={},g1=U2(W3),i1=new Map,d2=[],g2={},f=null,J1=null,A1={ax:0,ay:0,since:0,hold:1700,fade:1e3,peak:1,lastReset:-1e9,k:1,init:!1},d1=Array.from({length:8},()=>N1(0,R2)),$5=N1(0,R2),v3=0,c5=N1(800,2500),G5=400,M1=0,i2={x:0,y:0},C2={x:0,y:0},k1=[null,null],q2=[],t5=new Set,y2=Object.assign(v4(),{"mouth.tgX":68,"mouth.tgY":86.88,"mouth.tgH":12});Object.assign(y2,_5[L.expression]||_5.Normal),I5.forEach((d,v)=>{z[v]=y2[d]!=null?y2[d]:0,Y[v]=z[v]}),Q5(null);function Q5(d){for(let v=0;v<T2;v++){let p=A4[v],h=f6[p];d&&T0[d]&&g6.includes(p)&&(h=T0[d]);let b=$1[I5[v]]||$1[p];b&&(h=[b.k!=null?b.k:h[0],b.c!=null?b.c:h[1]]),s3[v]=h[0],U5[v]=h[1]}}let H1=null;function i5(d,...v){(g2[d]||[]).slice().forEach(p=>{try{p(...v)}catch(h){console.error(h)}})}function x3(d){let v=_[d];return v==null&&!t5.has(d)&&(t5.add(d),console.warn("[Casita] unknown param",d)),v}function j2(d,v){v=v||{};let p=_5[d];if(!p)return console.warn("[Casita] unknown expression",d),x1;let h=v2;v2=d,g1=U2(W3,G2[d].life,t2,v.life),H1=v.spring||G2[d].spring||null,Q5(H1);let b=v.stagger!==!1&&!v.instant&&h!=null,$=v.staggerScale!=null?v.staggerScale:1;r2=[];let X={};for(let j of Object.keys(p)){let p1=_[j];if(p1==null)continue;if(v.instant){z[p1]=p[j],Y[p1]=p[j],M2[p1]=0;continue}let P=b?y6[A4[p1]]*$:0;if(P<=0){z[p1]=p[j];continue}(X[P]=X[P]||[]).push([p1,p[j]])}for(let j of Object.keys(X))r2.push({at:C1+Number(j),items:X[j]});return h!==d&&i5("expression",d,h),n2&&X2(k2()),x1}function p2(){d2=[...i1.values()].sort((d,v)=>d.priority-v.priority)}function Y2(d,v){v=v||{};let p=i1.get(d);if(!p)p={name:d,priority:v.priority||0,post:!!v.post,w:1,fade:null,setV:new Map,addV:new Map,expires:0},p.api={set(h,b){for(let $ in h){let X=x3($);X!=null&&p.setV.set(X,h[$])}return b!=null&&(p.w=b),p.api},add(h,b){for(let $ in h){let X=x3($);X!=null&&p.addV.set(X,h[$])}return b!=null&&(p.w=b),p.api},unset(...h){for(let b of h){let $=_[b];p.setV.delete($),p.addV.delete($)}return p.api},clear(){return p.setV.clear(),p.addV.clear(),p.expires=0,p.api},weight(h,b){return b?p.fade={from:p.w,to:h,t0:C1,dur:b}:(p.w=h,p.fade=null),p.api},ttl(h){return p.expires=C1+h,p.api},remove(){i1.delete(d),p2()},get weightValue(){return p.w}},i1.set(d,p),p2();else{let h=!1;v.priority!=null&&v.priority!==p.priority&&(p.priority=v.priority,h=!0),v.post!=null&&(p.post=!!v.post),h&&p2()}return p.api}function O2(d,v){for(let p of d2){if(p.post!==v||p.w<=0)continue;let h=p.w;p.setV.forEach((b,$)=>{d[$]=h>=1?b:S2(d[$],b,h)}),p.addV.forEach((b,$)=>{d[$]+=b*h})}}let Z5=(d,v)=>.55*Math.sin(d+d1[v])+.3*Math.sin(d*2.13+d1[v+1])+.15*Math.sin(d*4.37+d1[v+2]);function _2(d,v){v=v||{};let p=g1.blink,h={t0:C1,close:v.close||p.close,hold:v.hold!=null?v.hold:p.hold,open:v.open||p.open};return d!=="R"&&(k1[0]=Object.assign({},h)),d!=="L"&&(k1[1]=Object.assign({},h)),h.close+h.hold+h.open}function z5(d){if(!d)return 1;let v=C1-d.t0;if(v<0)return 1;if(v<d.close){let $=v/d.close;return 1-$*$}if(v<d.close+d.hold)return 0;let p=(v-d.close-d.hold)/d.open;if(p>=1)return 1;let h=1.3;return 1+(h+1)*Math.pow(p-1,3)+h*Math.pow(p-1,2)}function l2(){let d=0,v=0;if(f){let p=W2+Y[_["body.x"]],h=70+Y[_["body.y"]],b=f[0]-p,$=f[1]-h,X=Math.hypot(b,$);if(X>.001){let j=X/(X+38);d=b/X*j*g1.gaze.eye,v=$/X*j*g1.gaze.eye*.75}}else G1&&g1.saccade.on&&(d=i2.x,v=i2.y);return G1&&(g1.saccade.on||f)&&(d+=C2.x,v+=C2.y),[d*(f?1:t),v*(f?1:t)]}let o5=[],E=[];function K5(d,v){let p=w0[d]||w0.dot,h=E.pop();h||(h=i("path",{},a)),h.setAttribute("d",p),h.style.display="";let b=Object.assign({kind:d,el:h,age:0,life:1.6,x:60,y:20,vx:0,vy:-16,ax:0,gravity:0,drag:0,rot:0,vrot:0,s0:.4,s1:.6,color:null,sway:0,swayF:3,swayPh:N1(0,R2),fadeIn:.12,fadeOut:.35,orbit:null,opacity:1},v),$=b.color&&r[b.color]?r[b.color]:b.color;h.setAttribute("fill",$||x2);let X=b.stroke&&r[b.stroke]?r[b.stroke]:b.stroke;return X?(h.setAttribute("stroke",X),h.setAttribute("stroke-width",b.strokeWidth||1),h.setAttribute("vector-effect","non-scaling-stroke")):(h.removeAttribute("stroke"),h.removeAttribute("vector-effect")),o5.push(b),b}let q={heart:{x:60,y:30,vy:-22,life:1.9,s0:.22,s1:.42,sway:4,spread:18},z:{x:100,y:18,vx:7,vy:-14,life:2.6,s0:.25,s1:.55,sway:2.5,spread:4},sparkle:{x:60,y:50,vy:-6,life:.9,s0:.2,s1:.65,vrot:120,spread:50,color:"spark"},star:{x:60,y:30,life:2.2,s0:.75,s1:.75,vrot:160,color:"star"},steam:{x:60,y:4,vy:-18,life:1.2,s0:.5,s1:1.4,sway:3,spread:70,color:"steam",fadeOut:.6},puff:{x:60,y:4,vy:-16,life:1.1,s0:.55,s1:1.25,sway:2.5,spread:70,color:"puff",stroke:"puffEdge",strokeWidth:1.2,fadeOut:.55},tear:{x:33,y:72,vy:4,gravity:90,life:1.1,s0:.45,s1:.4,color:E5,fadeOut:.3},note:{x:78,y:70,vx:10,vy:-16,life:1.8,s0:.45,s1:.6,sway:3,spread:10},dot:{x:60,y:40,vy:-10,life:1,s0:.6,s1:.2}};function S5(d,v){v=v||{};let p=Object.assign({},q[d]||{},v),h=Math.max(1,Math.round((v.count||1)*(t<1?.5:1))),b=p.spread||0,$=[];for(let X=0;X<h;X++){let j=Object.assign({},p),p1=p.x+(b?N1(-b/2,b/2):0),P=p.y+(b?N1(-b/6,b/6):0),l=p.space==="world"?[p1,P]:g5(p1,P);if(j.x=l[0],j.y=l[1],j.vx=(p.vx||0)+(b?N1(-4,4):0),j.vy=(p.vy||0)*(h>1?N1(.8,1.2):1),j.life=p.life*(h>1?N1(.85,1.15):1),p.orbit&&(j.orbit=Object.assign({cx:60,cy:18,r:34,ry:.35,speed:3.2,phase:X*R2/h},p.orbit)),j.orbit&&p.space!=="world"){let D=g5(j.orbit.cx,j.orbit.cy);j.orbit.cx=D[0],j.orbit.cy=D[1]}delete j.count,delete j.spread,delete j.space,$.push(K5(d,j))}return $}function h5(d){for(let v=o5.length-1;v>=0;v--){let p=o5[v];p.age+=d;let h=p.age/p.life;if(h>=1){p.el.style.display="none",E.push(p.el),o5.splice(v,1);continue}let b,$;if(p.orbit){let P=p.orbit.phase+p.orbit.speed*p.age;b=p.orbit.cx+p.orbit.r*Math.cos(P),$=p.orbit.cy+p.orbit.r*p.orbit.ry*Math.sin(P)}else p.vx+=p.ax*d,p.vy+=p.gravity*d,p.drag&&(p.vx*=1-p.drag*d,p.vy*=1-p.drag*d),p.x+=p.vx*d,p.y+=p.vy*d,b=p.x+p.sway*Math.sin(p.age*p.swayF+p.swayPh),$=p.y;p.rot+=p.vrot*d;let X=h<.15?1+.25*Math.sin(h/.15*Math.PI):1,j=S2(p.s0,p.s1,M5(h))*X,p1=_1(h/Math.max(.001,p.fadeIn))*(1-M5((h-(1-p.fadeOut))/Math.max(.001,p.fadeOut)))*p.opacity;p.el.setAttribute("transform","translate("+Q(b)+" "+Q($)+") rotate("+Q(p.rot)+") scale("+Q(j)+")"),p.el.setAttribute("opacity",Q(p1))}}function f5(d){return{x:d[_["body.x"]],y:d[_["body.y"]],rot:d[_["body.rot"]],sx:d[_["body.sx"]],sy:d[_["body.sy"]],skew:d[_["body.skew"]]}}let b2=Y;function g5(d,v){let p=f5(b2),h=(d-W2)*p.sx,b=(v-F5)*p.sy;h=h+b*Math.tan(p.skew*Math.PI/180);let $=p.rot*Math.PI/180,X=Math.cos($),j=Math.sin($);return[W2+p.x+h*X-b*j,F5+p.y+h*j+b*X]}function a5(d,v){let p=f5(b2),h=d-W2-p.x,b=v-F5-p.y,$=-p.rot*Math.PI/180,X=Math.cos($),j=Math.sin($),p1=h*X-b*j,P=h*j+b*X;return h=p1-P*Math.tan(p.skew*Math.PI/180),b=P,[W2+h/(p.sx||1e-6),F5+b/(p.sy||1e-6)]}function u3(d){if(u5)return;if(d=$2(d||0,0,1/20),C1+=d*1e3,n2){X2(k2()),i5("frame",d,C1);return}r2.length&&(r2=r2.filter(P=>{if(C1>=P.at){for(let[l,D]of P.items)z[l]=D;return!1}return!0}));for(let P of d2){if(P.fade){let l=_1((C1-P.fade.t0)/P.fade.dur);P.w=S2(P.fade.from,P.fade.to,M5(l)),l>=1&&(P.fade=null)}P.expires&&C1>=P.expires&&(P.setV.clear(),P.addV.clear(),P.expires=0)}if(G1){let P=g1.saccade;if(P.on&&!f&&C1>=G5){let D=i2.x;if(Math.random()<.35)i2.x=0,i2.y=0;else{let G=N1(0,R2),y1=N1(.35,1)*P.range;i2.x=Math.cos(G)*y1,i2.y=Math.sin(G)*y1*.6}G5=C1+N1(P.min,P.max),g1.blink.on&&Math.abs(i2.x-D)>P.range*.9&&Math.random()<.25&&_2("both")}if(C1>=M1){let D=(P.micro||0)*1;C2.x=N1(-D,D),C2.y=N1(-D,D)*.7,M1=C1+N1(140,420)}let l=g1.blink;if(l.on&&C1>=c5){let D=_2("both");Math.random()<l.double&&q2.push(C1+D+N1(50,110)),c5=C1+N1(l.min,l.max)}q2.length&&C1>=q2[0]&&(q2.shift(),_2("both",{close:g1.blink.close*.8,open:g1.blink.open*.8}))}b1.set(z),O2(b1,!1);let[v,p]=l2(),h=1;if(f)if(J1!=null)h=J1;else{let P=Math.hypot(f[0]-W2-Y[_["body.x"]],f[1]-70-Y[_["body.y"]]);h=_1(1-(P-90)/170)}{f&&(A1.lastTargetAt=C1);let P=!f&&C1-(A1.lastTargetAt||-1e9)<1e3,l=P?A1.ax:f?f[0]:v*10,D=P?A1.ay:f?f[1]:p*10;(!A1.init||Math.hypot(l-A1.ax,D-A1.ay)>15)&&(A1.peak=C1-A1.lastReset>3e3?1:.85,A1.ax=l,A1.ay=D,A1.since=C1,A1.lastReset=C1,A1.init=!0,A1.hold=N1(1500,2e3),A1.fade=N1(800,1200));let G=C1-A1.since;A1.k=G<A1.hold?A1.peak:A1.peak*(1-M5((G-A1.hold)/A1.fade))}let b=h*A1.k;if(v||p){let P=g1.gaze,l=f?$2((f[0]-W2-Y[_["body.x"]])/70,-1,1):v/(P.eye||1);b1[_["eyeL.x"]]+=v,b1[_["eyeR.x"]]+=v,b1[_["eyeL.y"]]+=p,b1[_["eyeR.y"]]+=p;let D=(P.face||0)/(P.eye||1)*(.4+.6*h);b1[_["face.x"]]+=v*D,b1[_["face.y"]]+=p*D,b1[_["body.rot"]]+=l*(P.rot||0)*t*b,b1[_["body.skew"]]+=l*(P.skew||0)*t*b,b1[_["body.x"]]+=l*(P.bx||0)*t*b}let $=Math.max(1,Math.ceil(d/(1/240))),X=d/$;for(let P=0;P<$;P++)for(let l=0;l<T2;l++){let D=s3[l]*(b1[l]-Y[l])-U5[l]*M2[l];M2[l]+=D*X,Y[l]+=M2[l]*X}for(let P=0;P<T2;P++)Number.isFinite(Y[P])||(Y[P]=b1[P],M2[P]=0);if(V1.set(Y),O2(V1,!0),G1){let P=C1/1e3;$5+=d*R2*g1.breath.rate*(1+.18*Z5(P*.7,0));let l=Math.sin($5+.25*Math.sin($5))*g1.breath.amp*t;V1[_["body.sy"]]*=1+l,V1[_["body.sx"]]*=1-l*.55;let D=g1.sway.amp*t*Z5(P*R2*g1.sway.rate*.35,3);V1[_["body.rot"]]+=D*.3,V1[_["body.skew"]]-=D*1.4,V1[_["body.y"]]+=.35*t*Z5(P*R2*g1.sway.rate*.27,5),v3+=d}V1[_["body.sy"]]=$2(V1[_["body.sy"]],.86,1.12),V1[_["body.sx"]]=$2(V1[_["body.sx"]],.94,1.08),L.floor!=null&&V1[_["body.y"]]>L.floor&&(V1[_["body.y"]]=L.floor);let j=z5(k1[0]),p1=z5(k1[1]);V1[_["eyeL.open"]]*=j,V1[_["eyeR.open"]]*=p1,k1[0]&&C1-k1[0].t0>k1[0].close+k1[0].hold+k1[0].open&&(k1[0]=null),k1[1]&&C1-k1[1].t0>k1[1].close+k1[1].hold+k1[1].open&&(k1[1]=null),b2=V1,X2(V1),h5(d),i5("frame",d,C1)}function k2(){let d=_5[v2],v=new Float64Array(z);for(let p of Object.keys(d))v[_[p]]=d[p];return b2=v,v}let x2=E5;function c3(d,v){return{x:d[_[v+".x"]],y:d[_[v+".y"]],s:d[_[v+".s"]],top:d[_[v+".top"]],bot:d[_[v+".bot"]],ang:d[_[v+".ang"]],heart:d[_[v+".heart"]],cross:d[_[v+".cross"]],shine:d[_[v+".shine"]],open:d[_[v+".open"]]}}function e1(d){let v={};for(let p of m4)v[p]=d[_["mouth."+p]];return v}function X2(d){let v=G1&&!n2,[p,h,b]=P0(d[_["body.L"]],d[_["body.A"]],d[_["body.B"]]);x2="rgb("+p+","+h+","+b+")",m.setAttribute("fill",x2);let $=f5(d);Z.setAttribute("transform","translate("+Q($.x+W2)+" "+Q($.y+F5)+") rotate("+Q($.rot)+") skewX("+Q($.skew)+") scale("+Math.round($.sx*1e4)/1e4+" "+Math.round($.sy*1e4)/1e4+") translate("+-W2+" "+-F5+")"),g.setAttribute("transform","translate("+Q(d[_["face.x"]])+" "+Q(d[_["face.y"]])+")");let X=[c3(d,"eyeL"),c3(d,"eyeR")];for(let P=0;P<2;P++){let l=X[P];w[P].setAttribute("d",b0(u6(l,P?1:-1)));let D=_1(l.shine)*Math.max(0,l.s)*_1(l.open)*(1-_1(l.heart))*(1-_1(l.cross));if(D>.01){let D1=.34*D,k=[d[_["body.L"]],d[_["body.A"]],d[_["body.B"]]],[y5,c2,A5]=P0(S2(O0[0],k[0],D1),S2(O0[1],k[1],D1),S2(O0[2],k[2],D1));w[P].setAttribute("fill","rgb("+y5+","+c2+","+A5+")")}else w[P].hasAttribute("fill")&&w[P].removeAttribute("fill");let G=u[2*P],y1=u[2*P+1];G.setAttribute("cx",Q(l.x+2.7*l.s)),G.setAttribute("cy",Q(l.y-2.7*l.s*_1(l.open))),G.setAttribute("r",Q(2.3*D)),y1.setAttribute("cx",Q(l.x-2.5*l.s)),y1.setAttribute("cy",Q(l.y+2.4*l.s*_1(l.open))),y1.setAttribute("r",Q(1.15*D)),G.setAttribute("fill",r.shine),y1.setAttribute("fill",r.shine)}let j=d[_["dot.s"]];W.setAttribute("cx",Q(60+(X[0].x-33+(X[1].x-87))/2)),W.setAttribute("cy",Q(65.88+(X[0].y-65.88+(X[1].y-65.88))/2+d[_["dot.dy"]])),W.setAttribute("r",Q(Math.max(0,8*j)));let p1=e1(d);I.setAttribute("d",b0(Z6(p1))),R.setAttribute("d",b0(S6(p1))),U(d,v)}function U(d,v){let p=v3,h=l=>d[_["acc."+l]],b=h("bubbles");for(let l=0;l<3;l++){let[D,G,y1]=M4[l],D1=Math.max(0,(b-l*.25)/(1-l*.25)),k=0;v&&D1>0&&(D1*=1+.08*t*Math.sin(p*2.4-l*1.1),k=-1.2*t*Math.sin(p*1.5-l*.8)),e2[l].setAttribute("r",Q(y1*D1)),e2[l].setAttribute("cy",Q(G+k)),e2[l].setAttribute("fill",x2)}let $=h("wifi");if($>.005){E1.style.display="",E1.setAttribute("transform","translate(95.17 24.83) scale("+Q(Math.max(0,$))+") translate(-95.17 -24.83)"),E1.setAttribute("fill",x2);let l=1,D=1;if(v){let G=I3(p/1.9);l=G>=.2&&G<.75?1:.2,D=G>=.4&&G<.75?1:.2}a1.setAttribute("opacity",Q(l)),q3.setAttribute("opacity",Q(D)),f2.setAttribute("opacity","1"),E1.setAttribute("opacity",Q(_1($*1.5)))}else E1.style.display="none";let X=h("question");if(X>.005){K2.style.display="";let l=v?9*t*Math.sin(p*2.2):0,D=v?-1.4*t*Math.abs(Math.sin(p*2.2)):0;K2.setAttribute("transform","translate(104.5 "+Q(29.4+D)+") rotate("+Q(l)+") scale("+Q(Math.max(0,X))+") translate(-104.5 -29.4)"),K2.setAttribute("fill",x2)}else K2.style.display="none";let j=h("z");for(let l=0;l<3;l++){let D=j3[l];if(j<=.005||l>0&&!v){D.style.display="none";continue}if(D.style.display="",D.setAttribute("fill",x2),l===0){let G=v?-1.2*t*Math.sin(p*1.4):0,y1=v?4*t*Math.sin(p*.9):0;D.setAttribute("transform","translate(101.5 "+Q(16.5+G)+") rotate("+Q(y1)+") scale("+Q(Math.max(0,j))+") translate(-101.5 -16.5)"),D.setAttribute("opacity",Q(_1(j*1.5)))}else{let G=I3(p/3+l*.5),y1=101.5+8+G*14+2*Math.sin(G*7+l),D1=16.5-6-G*26,k=j*(.32+.3*G);D.setAttribute("transform","translate("+Q(y1)+" "+Q(D1)+") rotate("+Q(-8+16*G)+") scale("+Q(k)+") translate(-101.5 -16.5)"),D.setAttribute("opacity",Q(_1(G/.2)*_1((1-G)/.4)*_1(j)))}}let p1=h("tear");if(p1>.005){let l=p1,D=0,G=1,y1=1;if(v){let D1=I3(p/4.2);if(D1<.25)l*=.45+.55*M5(D1/.25);else if(D1>.68){let k=(D1-.68)/.32;D=16*k*k,G=1-M5((k-.4)/.6)}y1=1+.05*Math.sin(p*9)}Z1.setAttribute("d",a4(f0[0],f0[1]+D,f0[2]*l*y1)),Z1.setAttribute("opacity",Q(G))}else Z1.setAttribute("d","");let P=h("sweat");for(let l=0;l<2;l++){let[D,G,y1]=r4[l];if(P<=.005){t1[l].setAttribute("d","");continue}let D1=P,k=0,y5=1;if(v){let c2=I3(p/(2.4+l*.5)+l*.37);if(c2<.2)D1*=.5+.5*M5(c2/.2);else if(c2>.55){let A5=(c2-.55)/.45;k=9*A5*A5,y5=1-M5((A5-.5)/.5)}}t1[l].setAttribute("d",a4(D,G+k,y1*D1)),t1[l].setAttribute("opacity",Q(y5))}}let Q1=0,v1=0,o2=!1;function W1(d){Q1=globalThis.requestAnimationFrame(W1),v1||(v1=d);let v=(d-v1)/1e3;v1=d,u3(v)}function E2(){o2||u5||(o2=!0,v1=0,Q1=globalThis.requestAnimationFrame(W1))}function H2(){o2=!1,Q1&&globalThis.cancelAnimationFrame(Q1),Q1=0}function u2(){document.hidden?o2&&(H2(),o2="paused"):o2==="paused"&&(o2=!1,E2())}L.autoplay&&(document.addEventListener("visibilitychange",u2),E2());let x1={el:{svg:M,world:n,body:Z,house:m,face:g,eyes:w,mouth:I,tongue:R,particles:a},get expression(){return v2},get frozen(){return n2},get lifeOn(){return G1},get clock(){return C1},setExpression:j2,layer:Y2,lookAt(d,v,p){return f=d==null?null:[d,v],J1=p&&p.lean!=null?_1(p.lean):null,x1},get gazeLean(){return{habituation:A1.k,explicit:J1}},get looking(){return f?f.slice():null},blink(d){return d=d||{},_2(d.eye||"both",d),d.double&&q2.push(C1+(d.close||g1.blink.close)+(d.hold||g1.blink.hold)+(d.open||g1.blink.open)+70),x1},wink(d){return _2(d==="L"?"L":"R",{close:90,hold:220,open:200}),x1},impulse(d){d=d||{};let v={x:"body.x",y:"body.y",rot:"body.rot",sx:"body.sx",sy:"body.sy",skew:"body.skew",fx:"face.x",fy:"face.y"};for(let p in d){let h=v[p]||p,b=_[h];b!=null&&(M2[b]+=d[p])}return x1},squash(d,v){return Y2("_squash",{priority:50}).add({"body.sy":-d,"body.sx":d*.6}).ttl(v||90),x1},life(d){return G1=d==null?!G1:!!d,G1||(i2.x=i2.y=C2.x=C2.y=0),x1},setLife(d){return t2=U2(t2,d),g1=U2(W3,G2[v2].life,t2),x1},get lifeProfile(){return U2(g1)},freeze(d){if(n2=d==null?!n2:!!d,n2)o5.splice(0).forEach(v=>{v.el.style.display="none",E.push(v.el)}),X2(k2());else{let v=k2();Y.set(v),M2.fill(0),z.set(v),r2=[]}return x1},accessory(d,v){let p=Y2("_acc",{priority:90});return v==null?p.unset("acc."+d):p.set({["acc."+d]:v===!0?1:v===!1?0:v}),x1},emit:S5,tint(d,v){let p=Y2("_tint",{priority:80});if(d==null)return p.clear(),x1;let[h,b,$]=U3(d);return p.set({"body.L":h,"body.A":b,"body.B":$},v??1),x1},setPalette(d){return Object.assign(r,d||{}),x1},setState(d,v,p){let h=_[d];return h!=null&&(Y[h]=v,p!=null&&(M2[h]=p)),x1},spring(d,v){return $1[d]=v,Q5(H1),x1},get(d){return b2[_[d]]},target(d){return b1[_[d]]},velocity(d){return M2[_[d]]},get params(){return I5.slice()},get bodyColor(){return x2},houseToWorld:g5,worldToHouse:a5,clientToSvg(d,v){let p=M.getScreenCTM();if(!p)return[0,0];let h=M.createSVGPoint();h.x=d,h.y=v;let b=h.matrixTransform(p.inverse());return[b.x,b.y]},on(d,v){return(g2[d]=g2[d]||[]).push(v),x1},off(d,v){return g2[d]=(g2[d]||[]).filter(p=>p!==v),x1},step(d){return u3(d),x1},start:E2,stop:H2,destroy(){for(u5=!0,H2(),document.removeEventListener("visibilitychange",u2);M.firstChild;)M.removeChild(M.firstChild)}};return v2=null,j2(_5[L.expression]?L.expression:"Normal",{instant:!0}),X2(Y),x1}var r5={hexToOklab:U3,oklabToRgb:P0,create:b6,EXPRESSIONS:O6,POSES:G2,COLORS:R0,FACE:E5,HOUSE_D:n4,SHAPES:Object.keys(w0),PARAMS:I5.slice(),PRESETS:Object.keys(T0),LIFE_DEFAULT:W3};var Q2=class extends V2{constructor(){super(...arguments);this.expression="Normal";this.controlled=!1;this.reducedMotion=!1;this.label="Casita"}get face(){return this._face}firstUpdated(){this._create()}connectedCallback(){super.connectedCallback(),this.hasUpdated&&!this._face&&this._create()}disconnectedCallback(){super.disconnectedCallback(),this._face?.destroy(),this._face=void 0}updated(L){L.has("expression")&&this._face&&!this.controlled&&this._face.expression!==this.expression&&this._face.setExpression(this.expression)}_create(){this._face=r5.create(this.svg,{expression:this.expression,life:!0,autoplay:!this.controlled,reducedMotion:this.reducedMotion,floor:0}),this.dispatchEvent(new CustomEvent("face-ready",{detail:{face:this._face}}))}render(){return l1`<svg role="img" aria-label=${this.label} part="svg"></svg>`}};Q2.styles=I2`
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
  `,K([o1()],Q2.prototype,"expression",2),K([o1({type:Boolean})],Q2.prototype,"controlled",2),K([o1({type:Boolean,attribute:"reduced-motion"})],Q2.prototype,"reducedMotion",2),K([o1()],Q2.prototype,"label",2),K([s2("svg",!0)],Q2.prototype,"svg",2);e5("casita-face",Q2);var N5=["joy","excitement","energy","affection","irritation","curiosity"],k6=["Normal","Alert","Angry","Scared","Cheeky","DeadAss","Dead","Devious","Focusing","Grateful","Grinning","Happy","Hurt","Initializing","Loading","Loving","NoInternet","Pleading","Problem","Sad","Silly","Sleeping","Smiling","Sweating","UwU","WTF","Winking","WinkingSmile"],p3=M=>typeof M=="string"&&k6.includes(M),u4=async M=>{let V=await M.callWS({type:"casita/info"});return V&&Array.isArray(V.entries)?{version:V.version,entries:V.entries.filter(L=>L&&L.entry_id)}:V&&V.entry_id?{version:V.version,entries:[{title:"Casita",...V}]}:{version:V?.version,entries:[]}},G3=(M,V)=>V?M?.entries.find(L=>L.conversation_entity===V):void 0,c4=(M,V)=>G3(M,V)??M?.entries[0],Z4=(M,V,L)=>{let r=M.title||"Casita";if(V.filter(i=>(i.title||"Casita")===r).length<2)return r;let t=M.llm_agent?L?.states[M.llm_agent]?.attributes.friendly_name||M.llm_agent:void 0;return`${r} (${t??M.conversation_entity??M.entry_id})`};var S4=(M,V)=>{if(!V)return;let L={},r=0;for(let t of N5){let i=V.mood_entities[t],n=i?M.states[i]:void 0,Z=n?parseFloat(n.state):NaN;Number.isFinite(Z)&&(L[t]=Z,r++)}return r?L:void 0},$3=class{constructor(V,L=2e3){this._send=V;this._windowMs=L;this._last=new Map;this._pending=new Map;this._timers=new Map}report(V,L=.5){let r=Date.now(),t=this._last.get(V)??-1/0,i=Math.max(0,Math.min(1,L));if(r-t>=this._windowMs&&!this._timers.has(V)){this._last.set(V,r),this._send(V,x4(i));return}if(this._pending.set(V,Math.min(1,(this._pending.get(V)??0)+i)),!this._timers.has(V)){let n=Math.max(0,t+this._windowMs-r);this._timers.set(V,setTimeout(()=>{this._timers.delete(V);let Z=this._pending.get(V)??0;this._pending.delete(V),Z>0&&(this._last.set(V,Date.now()),this._send(V,x4(Z)))},n))}}dispose(){this._timers.forEach(V=>clearTimeout(V)),this._timers.clear(),this._pending.clear()}},x4=M=>Math.round(M*100)/100;var z2=class extends V2{constructor(){super(...arguments);this.heading="";this.narrow=!1;this._prev=new Map;this._lit=new Map}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._litTimer),this._prev.clear(),this._lit.clear()}willUpdate(L){if(!L.has("hass")&&!L.has("entry"))return;let r=L.has("entry"),t=Date.now();for(let i of N5){let n=this._value(i),Z=this._prev.get(i);n!==void 0&&(!r&&Z!==void 0&&Math.abs(n-Z)>=.005&&this._lit.set(i,t),this._prev.set(i,n))}r&&this._lit.clear(),[...this._lit.values()].some(i=>t-i<1e3)&&(clearTimeout(this._litTimer),this._litTimer=setTimeout(()=>this.requestUpdate(),1e3))}_value(L){let r=this.entry?.mood_entities[L],t=r?this.hass?.states[r]:void 0,i=t?parseFloat(t.state):NaN;return Number.isFinite(i)?i:void 0}render(){let L=this.strings,r=N5.map(i=>[i,this._value(i)]),t=r.some(([,i])=>i!==void 0);return l1`
      <div class="hud" role="group" aria-label=${this.heading?`${L.mood} — ${this.heading}`:L.mood}>
        ${this.heading?l1`<p class="heading">${this.heading}</p>`:""}
        ${t?r.map(([i,n])=>{let Z=i==="joy",m=n??0,g=Z?Math.abs(m)*50:Math.max(0,Math.min(1,m))*100,w=Z?m<0?50-g:50:0,u=n===void 0?"—":Z?`${m>=0?"+":"−"}${Math.abs(m).toFixed(2)}`:m.toFixed(2),W=this.entry?.mood_entities[i],I=Date.now()-(this._lit.get(i)??0)<1e3;return l1`<div class="row ${Z?"div":""} ${I?"lit":""} m-${i}" title=${W??""}>
                <span class="name">${L.moodNames[i]}</span>
                <span class="bar" role="meter" aria-label=${L.moodNames[i]} aria-valuemin=${Z?-1:0} aria-valuemax="1" aria-valuenow=${m.toFixed(2)}
                  ><i style="left:${w}%;width:${g}%"></i
                ></span>
                <span class="val">${u}</span>
              </div>`}):l1`<p class="empty">${L.moodUnavailable}</p>`}
      </div>
    `}};z2.styles=I2`
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
  `,K([o1({attribute:!1})],z2.prototype,"hass",2),K([o1({attribute:!1})],z2.prototype,"entry",2),K([o1()],z2.prototype,"heading",2),K([o1({attribute:!1})],z2.prototype,"strings",2),K([o1({type:Boolean,reflect:!0})],z2.prototype,"narrow",2);e5("casita-mood-hud",z2);var F0="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";var _0="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z";var E0="M7.5,4A5.5,5.5 0 0,0 2,9.5C2,10 2.09,10.5 2.22,11H6.3L7.57,7.63C7.87,6.83 9.05,6.75 9.43,7.63L11.5,13L12.09,11.58C12.22,11.25 12.57,11 13,11H21.78C21.91,10.5 22,10 22,9.5A5.5,5.5 0 0,0 16.5,4C14.64,4 13,4.93 12,6.34C11,4.93 9.36,4 7.5,4V4M3,12.5A1,1 0 0,0 2,13.5A1,1 0 0,0 3,14.5H5.44L11,20C12,20.9 12,20.9 13,20L18.56,14.5H21A1,1 0 0,0 22,13.5A1,1 0 0,0 21,12.5H13.4L12.47,14.8C12.07,15.81 10.92,15.67 10.55,14.83L8.5,9.5L7.54,11.83C7.39,12.21 7.05,12.5 6.6,12.5H3Z";var D0="M7,10L12,15L17,10H7Z";var I0="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z";var N0="M2,21L23,12L2,3V10L17,12L2,14V21Z";var W0="M18,18H6V6H18V18Z";var K1=class extends V2{constructor(){super(...arguments);this.warningBusy=!1;this.open=!1;this._onClose=()=>{this.dispatchEvent(new CustomEvent("closed"))};this._backdrop=L=>{L.target===this._dialog&&this._close()}}updated(L){let r=this._dialog;!L.has("open")||!r||(this.open&&!r.open?(r.showModal(),r.querySelector("select")?.focus()):!this.open&&r.open&&r.close())}_change(L){let r=L.target.value,t=r?{pipeline_id:r}:{};this.dispatchEvent(new CustomEvent("settings-changed",{detail:{settings:t}}))}_close(){this._dialog?.close()}render(){let L=this.strings;if(!L||!this.hass)return l1`<dialog></dialog>`;let r=this.pipelines?.pipelines??[],t=this.pipelines?.preferred_pipeline,i=r.find(m=>m.id===(this.defaultId??t)),n=i?`${i.name} (${i.id===t?L.preferred:L.byDefault})`:`Assist (${L.preferred})`,Z=this.settings?.pipeline_id;return l1`
      <dialog aria-labelledby="title" @close=${this._onClose} @click=${this._backdrop}>
        <div class="head">
          <h2 id="title">${L.settingsTitle}</h2>
          <button class="icon" type="button" aria-label=${L.close} @click=${this._close}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d=${F0}></path></svg>
          </button>
        </div>
        <div class="body">
          <div class="field">
            <div class="select">
              <label for="pipeline">${L.pipeline}</label>
              <select id="pipeline" aria-describedby="pipeline-help" .value=${Z??""} @change=${this._change}>
                <option value="" ?selected=${!Z}>${n}</option>
                ${r.map(m=>l1`<option value=${m.id} ?selected=${Z===m.id}>${m.name}</option>`)}
              </select>
              <svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d=${D0}></path></svg>
            </div>
            <span class="help" id="pipeline-help">${L.pipelineHelp}</span>
            ${this.warning?l1`<div class="warning" role="note">
                  <span id="warning-text">${this.warning}</span>
                  ${this.warningAction?l1`<button
                        type="button"
                        class="fix"
                        aria-describedby="warning-text"
                        ?disabled=${this.warningBusy}
                        @click=${()=>this.dispatchEvent(new CustomEvent("warning-action"))}
                      >
                        ${this.warningAction}
                      </button>`:""}
                  ${this.warningNote?l1`<span class="warning-note">${this.warningNote}</span>`:""}
                  ${this.warningError?l1`<span class="warning-error" role="alert">${this.warningError}</span>`:""}
                </div>`:""}
            ${this.note?l1`<span class="note" role="note">${this.note}</span>`:""}
          </div>
          <p class="foot">${L.savedUser}</p>
        </div>
      </dialog>
    `}};K1.styles=I2`
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
    .warning {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px 12px;
    }
    .warning > span {
      flex: 1 1 100%;
    }
    .warning-note {
      color: var(--secondary-text-color, #727272);
    }
    .warning-error {
      color: var(--error-color, #db4437);
    }
    .fix {
      font: inherit;
      font-size: 13px;
      font-weight: var(--ha-font-weight-medium, 500);
      border: 0;
      border-radius: 999px;
      padding: 6px 14px;
      min-height: 32px;
      cursor: pointer;
      background: var(--primary-color, #18bcf2);
      color: var(--text-primary-color, #fff);
    }
    .fix[disabled] {
      opacity: 0.6;
      cursor: progress;
    }
    .fix:focus-visible {
      outline: 2px solid var(--primary-color, #18bcf2);
      outline-offset: 2px;
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
  `,K([o1({attribute:!1})],K1.prototype,"hass",2),K([o1({attribute:!1})],K1.prototype,"strings",2),K([o1({attribute:!1})],K1.prototype,"settings",2),K([o1({attribute:!1})],K1.prototype,"pipelines",2),K([o1()],K1.prototype,"warning",2),K([o1()],K1.prototype,"warningAction",2),K([o1()],K1.prototype,"warningNote",2),K([o1()],K1.prototype,"warningError",2),K([o1({type:Boolean})],K1.prototype,"warningBusy",2),K([o1()],K1.prototype,"note",2),K([o1()],K1.prototype,"defaultId",2),K([o1({type:Boolean})],K1.prototype,"open",2),K([s2("dialog")],K1.prototype,"_dialog",2);e5("casita-settings-dialog",K1);var l3=(M,V)=>{switch(M){case"sunny":return V==="night"?"clear":"sun";case"clear-night":return"clear";case"partlycloudy":return"partly";case"cloudy":case"exceptional":return"cloud";case"rainy":return"rain";case"pouring":return"pour";case"lightning":case"lightning-rainy":return"storm";case"snowy":return"snow";case"snowy-rainy":return"sleet";case"hail":return"hail";case"fog":return"fog";case"windy":case"windy-variant":return"wind";default:return"clear"}};var h4=M=>/^fr\b/i.test(M??"")?"fr":"en",w6={title:"Casita",mood:"Humeur",moodShow:"Afficher l’humeur",moodHide:"Masquer l’humeur",settings:"Réglages",close:"Fermer",chatLabel:"Parle à Casita",chatPh:"Parle à Casita…",send:"Envoyer",micStart:"Parler à Casita au micro",micStop:"Arrêter l’écoute",stageLabel:"Casita, dans sa pièce",stageHelp:"Espace ou Entrée pour le piquer, flèches pour le faire regarder ailleurs.",exprAria:"Casita, expression : ",settingsTitle:"Réglages de Casita",pipeline:"Assistant",pipelineHelp:"L’assistant utilisé quand tu parles à Casita ici.",preferred:"préféré",notCasita:"Cet assistant n’utilise pas Casita : il parlera sans personnalité ni émotions.",byDefault:"par défaut",emptyTalk:"Pour me parler, crée un assistant qui m’utilise comme agent de conversation.",createAssistant:"Créer l’assistant Casita",creating:"Création…",openAssistants:"Régler dans les assistants",askAdmin:"Demande à un administrateur de créer un assistant Casita.",createFailed:"Impossible de créer l’assistant.",assistantReady:"Merci ! On peut parler maintenant.",localWarning:"Avec cet assistant, les commandes simples (« allume la lumière ») ne passent pas par Casita : il n’y réagit pas.",fixLocal:"Corriger",fixing:"Correction…",askAdminFix:"Demande à un administrateur de corriger cet assistant.",fixFailed:"Impossible de corriger l’assistant.",none:"Aucun",savedUser:"Enregistré pour ton utilisateur.",moodNames:{joy:"Joie",excitement:"Excitation",energy:"Énergie",affection:"Affection",irritation:"Agacement",curiosity:"Curiosité"},moodUnavailable:"Capteurs d’humeur indisponibles : Casita utilise son humeur locale.",micUnsupported:"Le micro demande une connexion sécurisée (HTTPS).",micDenied:"Accès au micro refusé.",micNotFound:"Aucun micro trouvé.",micInUse:"Le micro est déjà utilisé.",micError:"Le micro ne répond pas.",noPipeline:"Aucun assistant vocal configuré.",noTts:"Cet assistant n’a pas de synthèse vocale : Casita répond par écrit.",ouch:"Aïe !",hey:"Hé…",stop:"Arrête !",hmph:"Pfff.",more:"Encore ?",tooMuch:"Trop !",achoo:"Atchoum !",back:"Te revoilà !",missed:"Tu m’as manqué !",hello:"Salut ! Moi c’est Casita.",late:"Il est tard…",re:"Re !",reName:"Re, {n} !",shyHi:"Oh… coucou.",notUnderstood:"Je n’ai pas compris.",oops:"Oups, ça n’a pas marché.",oopsNet:"Oups, je n’arrive pas à joindre la maison.",hugLines:["Encore un peu…","Mmmh.","Je t’aime bien, toi."],rain:["Oh, il pleut…","Il pleut."],snow:["De la neige !","Il neige !"],thunder:["Ouh !","Eek !"],sun:["Il fait beau !"],goodMorning:"Bonjour !",labels:{Normal:"Content",Alert:"En alerte",Angry:"Fâché",Scared:"Apeuré",Cheeky:"Coquin",DeadAss:"Blasé",Dead:"K.O.",Devious:"Espiègle",Focusing:"Concentré",Grateful:"Reconnaissant",Grinning:"Rayonnant",Happy:"Heureux",Hurt:"Blessé",Initializing:"Démarrage",Loading:"Réfléchit",Loving:"Amoureux",NoInternet:"Hors ligne",Pleading:"Suppliant",Problem:"Perplexe",Sad:"Triste",Silly:"Rigolo",Sleeping:"Endormi",Smiling:"Souriant",Sweating:"Gêné",UwU:"UwU",WTF:"Interloqué",Winking:"Clin d’œil",WinkingSmile:"Clin d’œil souriant"}},P6={title:"Casita",mood:"Mood",moodShow:"Show mood",moodHide:"Hide mood",settings:"Settings",close:"Close",chatLabel:"Talk to Casita",chatPh:"Talk to Casita…",send:"Send",micStart:"Talk to Casita with the microphone",micStop:"Stop listening",stageLabel:"Casita, in his room",stageHelp:"Space or Enter to poke him, arrow keys to make him look around.",exprAria:"Casita, expression: ",settingsTitle:"Casita settings",pipeline:"Assistant",pipelineHelp:"The assistant used when you talk to Casita here.",preferred:"preferred",notCasita:"This assistant doesn’t use Casita: he’ll talk without personality or emotions.",byDefault:"default",emptyTalk:"To talk with me, create an assistant that uses me as its conversation agent.",createAssistant:"Create Casita assistant",creating:"Creating…",openAssistants:"Set up in assistants",askAdmin:"Ask an administrator to create a Casita assistant.",createFailed:"Couldn’t create the assistant.",assistantReady:"Thanks! We can talk now.",localWarning:'With this assistant, simple commands ("turn on the light") skip Casita: he won’t react to them.',fixLocal:"Fix",fixing:"Fixing…",askAdminFix:"Ask an administrator to fix this assistant.",fixFailed:"Couldn’t fix the assistant.",none:"None",savedUser:"Saved for your user.",moodNames:{joy:"Joy",excitement:"Excitement",energy:"Energy",affection:"Affection",irritation:"Irritation",curiosity:"Curiosity"},moodUnavailable:"Mood sensors unavailable: Casita uses his local mood.",micUnsupported:"The microphone needs a secure connection (HTTPS).",micDenied:"Microphone access denied.",micNotFound:"No microphone found.",micInUse:"The microphone is already in use.",micError:"The microphone does not respond.",noPipeline:"No voice assistant set up.",noTts:"This assistant has no text-to-speech: Casita answers in writing.",ouch:"Ouch!",hey:"Hey…",stop:"Stop it!",hmph:"Hmph.",more:"More?",tooMuch:"Too much!",achoo:"Achoo!",back:"You’re back!",missed:"I missed you!",hello:"Hi! I’m Casita.",late:"It’s late…",re:"Hey again!",reName:"Hey again, {n}!",shyHi:"Oh… hi.",notUnderstood:"I didn’t get that.",oops:"Oops, that didn’t work.",oopsNet:"Oops, I can’t reach the house.",hugLines:["A little longer…","Mmmh.","I like you."],rain:["Oh, it’s raining…","Rain."],snow:["Snow!","It’s snowing!"],thunder:["Eek!","Whoa!"],sun:["Sunshine!"],goodMorning:"Good morning!",labels:{Normal:"Content",Alert:"Alert",Angry:"Angry",Scared:"Scared",Cheeky:"Cheeky",DeadAss:"Deadpan",Dead:"K.O.",Devious:"Devious",Focusing:"Focused",Grateful:"Grateful",Grinning:"Grinning",Happy:"Happy",Hurt:"Hurt",Initializing:"Starting up",Loading:"Thinking",Loving:"In love",NoInternet:"Offline",Pleading:"Pleading",Problem:"Puzzled",Sad:"Sad",Silly:"Silly",Sleeping:"Asleep",Smiling:"Smiling",Sweating:"Sweating",UwU:"UwU",WTF:"WTF",Winking:"Winking",WinkingSmile:"Wink & smile"}},h2={fr:w6,en:P6};function f4(M,V){let L="http://www.w3.org/2000/svg",r=(C,H,e)=>C<H?H:C>e?e:C,t=C=>r(C,0,1),i=(C,H,e)=>C+(H-C)*e,n=(C,H)=>C+Math.random()*(H-C),Z=C=>C[Math.floor(Math.random()*C.length)],m=C=>(C=t(C),C*C*(3-2*C)),g=C=>C<=0||C>=1?0:Math.sin(Math.PI*C),w=V.reducedMotion,u=w?.35:1,W=r5.FACE,I=r5.EXPRESSIONS.map(C=>C.id),{stage:R,svg:Z1,face:A,bubble:t1,bubbleText:e2}=M,E1=V.lang,f2=h2[E1],a1=C=>f2[C],q3=(C,H)=>String(a1(C)).replace("{n}",H),K2=V.userName,j3=Array.from({length:16},()=>n(0,6.283)),a=0,Y=0,M2=0,b1=[];function z(C,H,e){b1.push({at:a+C,fn:H,tag:e||null})}function V1(C){for(let H=b1.length-1;H>=0;H--)b1[H].tag===C&&b1.splice(H,1)}function s3(){for(let C=0;C<b1.length;C++)if(a>=b1[C].at){let H=b1.splice(C,1)[0];C--;try{H.fn()}catch(e){console.error(e)}}}let U5="casita.v1",$1=(()=>{let C=null;try{C=JSON.parse(localStorage.getItem(U5)||"null")}catch{C=null}return(!C||typeof C!="object")&&(C={}),Object.assign({visits:0,firstSeen:null,lastSeen:null,affection:.3,pokesTotal:0,petsSeconds:0},C)})();function v2(){$1.lastSeen=Date.now(),$1.affection=f.F;try{localStorage.setItem(U5,JSON.stringify($1))}catch{}}let C1=(()=>{let C=new Date().getHours();return C>=6&&C<9?"dawn":C>=9&&C<18?"day":C>=18&&C<21?"dusk":"night"})(),n2=null,G1=()=>C1==="night";function u5(){return C1==="dawn"?.8:C1==="day"?.7:C1==="dusk"?.5:.25}let r2=["V","A","E","F","I","C"],t2={V:[-1,1],A:[0,1],E:[0,1],F:[0,1],I:[0,1],C:[0,1]},g1={V:"joy",A:"excitement",E:"energy",F:"affection",I:"irritation",C:"curiosity"},i1={V:.25,A:.35,E:u5(),F:t($1.affection),I:0,C:.3};i1.V=.25+.1*i1.F;let d2={V:0,A:0,E:0,F:0,I:0,C:0},g2={V:0,A:0,E:0,F:0,I:0,C:0},f={...i1,asleep:!1},J1=!1;function A1(){for(let C of r2)f[C]=r(i1[C]+d2[C]+g2[C],t2[C][0],t2[C][1])}function d1(C){for(let H of r2){let e=C[H];e&&(J1?d2[H]=r(d2[H]+e,t2[H][0]-i1[H],t2[H][1]-i1[H]):i1[H]=r(i1[H]+e,t2[H][0],t2[H][1]))}A1()}function $5(C){if(J1){let H=Math.exp(-C/6);for(let e of r2)d2[e]*=H}else{let H=(e,o,x)=>e+(o-e)*(1-Math.exp(-C/x));i1.V=H(i1.V,.25+.1*i1.F,40),i1.A=H(i1.A,.35,12),i1.E=H(i1.E,u5(),120),f.asleep&&(i1.E=t(i1.E+.02*C)),i1.I=H(i1.I,0,8),i1.C=H(i1.C,.3,15)}A1()}function v3(C){if(!C){if(J1)for(let H of r2)i1[H]=f[H],d2[H]=0;J1=!1;return}for(let H of r2){let e=C[g1[H]];if(e==null||!Number.isFinite(e))continue;let o=r(e,t2[H][0],t2[H][1]);J1&&Math.abs(o-i1[H])>.005&&(d2[H]*=.3),i1[H]=o}if(!J1)for(let H of r2)d2[H]=0;J1=!0,A1()}function c5(C){if(!w||!C)return C;let H={};for(let e in C)H[e]=e.startsWith("body.")&&e!=="body.L"&&e!=="body.A"&&e!=="body.B"||e==="face.x"||e==="face.y"?C[e]*u:C[e];return H}{let C=A.impulse;A.impulse=H=>C(c5(H))}let G5=r5.hexToOklab(r5.COLORS.blue);A.spring("dot.s",{k:900,c:60});let M1={s:2,x0:-60,y0:-80,w:240,h:230,pxW:480,pxH:460},i2=.76,C2={left:0,top:0,right:0,bottom:0};function k1(){let C=Z1.getBoundingClientRect();C2={left:C.left,top:C.top,right:C.right,bottom:C.bottom}}function q2(){let C=R.getBoundingClientRect(),H=Math.max(200,C.width),e=Math.max(240,C.height),o=r(Math.min(H*.5,e*.42),120,340),x=o/120,S=H/x,B=e/x;M1.s=x,M1.w=S,M1.h=B,M1.pxW=H,M1.pxH=e,M1.x0=60-S/2,M1.y0=116.88-i2*B,Z1.setAttribute("viewBox",[M1.x0,M1.y0,S,B].map(F=>F.toFixed(2)).join(" ")),R.style.setProperty("--floor-y",(i2*100).toFixed(1)+"%"),R.style.setProperty("--house-w",o.toFixed(1)+"px"),k1()}let t5=(C,H)=>[(C-M1.x0)*M1.s,(H-M1.y0)*M1.s];function y2(C,H){return[M1.x0+(C-C2.left)/M1.s,M1.y0+(H-C2.top)/M1.s]}function Q5(C,H){let e=Math.max(0,C2.left-C,C-C2.right,C2.top-H,H-C2.bottom);return e>0?t(1-e/120)*.7:1}let H1=(C,H,e)=>{let o=document.createElementNS(L,C);for(let x in H)o.setAttribute(x,String(H[x]));return e&&e.appendChild(o),o},i5=H1("defs",{});Z1.insertBefore(i5,Z1.firstChild);let x3=H1("clipPath",{id:"casita-house-clip"},i5);H1("path",{d:r5.HOUSE_D},x3);let j2=H1("ellipse",{cx:60,cy:117.6,rx:54,ry:4.6,class:"casita-shadow"});Z1.insertBefore(j2,A.el.world);let p2=H1("g",{class:"casita-extras"},A.el.body),Y2=H1("radialGradient",{id:"casita-glow-grad"},i5);H1("stop",{offset:"0",style:"stop-color: var(--glow); stop-opacity: .75"},Y2),H1("stop",{offset:"0.55",style:"stop-color: var(--glow); stop-opacity: .28"},Y2),H1("stop",{offset:"1",style:"stop-color: var(--glow); stop-opacity: 0"},Y2);let O2=H1("ellipse",{cx:60,cy:64,rx:0,ry:0,fill:"url(#casita-glow-grad)"});A.el.world.insertBefore(O2,A.el.body);let Z5=H1("g",{class:"casita-extras-face"});A.el.face.insertBefore(Z5,A.el.face.firstChild);let _2={cloud:"#9fb0c0"};function z5(){let C=getComputedStyle(R),H=(e,o)=>C.getPropertyValue(e).trim()||o;_2={cloud:H("--cloud","#9fb0c0")},A.setPalette({spark:H("--spark","#ffd23f"),star:H("--star-fx","#ffd23f"),steam:H("--steam","#8fa3b5"),puff:H("--puff","#ffffff"),puffEdge:H("--puff-edge","#b9c6d2"),shine:H("--shine","#ffffff")})}let l2=(C,H)=>({x:0,v:0,t:0,k:C||260,c:H||18});function o5(C,H){let e=C.k*(C.t-C.x)-C.c*C.v;return C.v+=e*H,C.x+=C.v*H,C.x}let E={blush:{g:H1("g",{opacity:0},Z5),sp:l2(80,16)},bang:{g:H1("g",{},p2),sp:l2(320,14)},vein:{g:H1("g",{},p2),sp:l2(260,16)},dots:{g:H1("g",{},p2),sp:l2(200,20)},bandage:{g:H1("g",{},p2),sp:l2(300,15)},cloud:{g:H1("g",{},p2),sp:l2(60,14)},dream:{g:H1("g",{},p2),sp:l2(160,14)},rings:{g:H1("g",{},p2),sp:l2(120,18)},scan:{g:H1("g",{"clip-path":"url(#casita-house-clip)"},p2),sp:l2(120,22)},glow:{g:O2,sp:l2(40,12)}};H1("ellipse",{cx:22,cy:80,rx:6,ry:3.2,style:"fill: var(--blush)"},E.blush.g),H1("ellipse",{cx:98,cy:80,rx:6,ry:3.2,style:"fill: var(--blush)"},E.blush.g),E.bangEls=[H1("rect",{x:-2.6,y:-16,width:5.2,height:12,rx:2.6},E.bang.g),H1("circle",{cx:0,cy:1,r:2.8},E.bang.g)],H1("path",{d:"M-7,-2.5Q-2.5,-2.5 -2.5,-7M2.5,-7Q2.5,-2.5 7,-2.5M7,2.5Q2.5,2.5 2.5,7M-2.5,7Q-2.5,2.5 -7,2.5",fill:"none",stroke:W,"stroke-width":2.4,"stroke-linecap":"round"},E.vein.g),E.dotEls=[0,1,2].map(C=>H1("circle",{cx:48+C*12,cy:-10,r:0},E.dots.g));for(let C of[45,-45])H1("rect",{x:-9,y:-3,width:18,height:6,rx:3,fill:W,transform:"rotate("+C+")"},E.bandage.g);E.cloudBody=H1("path",{d:"M-16,4a7,7 0 0,1 2,-13.6a9,9 0 0,1 17,-2.6a7,7 0 0,1 12,6.2a5.6,5.6 0 0,1 -1,10Z"},E.cloud.g),E.rain=[0,1,2].map(C=>H1("rect",{x:-9+C*9,y:8,width:2,height:5,rx:1},E.cloud.g)),E.dreamEls={a:H1("circle",{cx:96,cy:8,r:2.6},E.dream.g),b:H1("circle",{cx:103,cy:-2,r:4.2},E.dream.g),c:H1("circle",{cx:116,cy:-22,r:15},E.dream.g),icon:H1("path",{fill:W,d:""},E.dream.g)};let K5={heart:"M116,-15.5l-6.4,-6.4a4,4 0 0,1 6.4,-4.9a4,4 0 0,1 6.4,4.9Z",sun:"M116,-26.5a4.5,4.5 0 1,0 0.01,0ZM116,-34v3M116,-13v3M104,-22h3M125,-22h3M107.5,-30.5l2,2M122.5,-15.5l2,2M107.5,-13.5l2,-2M122.5,-28.5l2,-2",bulb:"M116,-31a6.5,6.5 0 0,1 4,11.6v2.4h-8v-2.4a6.5,6.5 0 0,1 4,-11.6ZM112.5,-15h7v2.4h-7Z",house:"M107.5,-14v-8.5l8.5,-8l8.5,8v8.5Z"};E.ringEls=[0,1].map(()=>H1("path",{d:"M-10,-4A12,12 0 0,1 10,-4",fill:"none","stroke-width":2.4,"stroke-linecap":"round"},E.rings.g)),E.scanEl=H1("rect",{x:0,y:0,width:120,height:10,fill:W,opacity:.12},E.scan.g);let q={blush:0,bang:0,vein:0,dots:0,bandage:0,cloud:0,dream:0,rings:0,scan:0,glow:0},S5=0,h5=1,f5=-9,b2="heart",g5=0;function a5(){f5=a,E.bang.sp.x=0,E.bang.sp.v=0}function u3(C){let H=A.bodyColor;for(let r1 of Object.keys(q))E[r1].sp.t=q[r1];let e=a-f5<1.2;E.bang.sp.t=e?1:0;for(let r1 of Object.keys(q))o5(E[r1].sp,Math.min(C,1/30));let o=r1=>Math.max(0,E[r1].sp.x);E.blush.g.setAttribute("opacity",(t(o("blush"))*(.42+.08*Math.sin(a*1.9))).toFixed(3));let x=o("bang");E.bang.g.setAttribute("transform","translate(108 "+(-14-1.5*Math.sin(a*5)).toFixed(2)+") rotate(12) scale("+x.toFixed(3)+")"),E.bangEls.forEach(r1=>r1.setAttribute("fill",H)),E.bang.g.style.display=x<.01?"none":"";let S=o("vein");E.vein.g.setAttribute("transform","translate(84 44) scale("+(S*(1+.18*(.5+.5*Math.sin(a*9.4)))).toFixed(3)+")"),E.vein.g.style.display=S<.01?"none":"";let B=o("dots");E.dotEls.forEach((r1,X1)=>{let j1=t(a%2.4/.4-X1);r1.setAttribute("r",(3*B*m(j1)).toFixed(2)),r1.setAttribute("fill",H)});let F=o("bandage");E.bandage.g.setAttribute("transform","translate(76 26) rotate(-8) scale("+F.toFixed(3)+")"),E.bandage.g.style.display=F<.01?"none":"";let c1=o("cloud");E.cloud.g.setAttribute("transform","translate("+(60+3*Math.sin(a*.6)).toFixed(2)+" -26) scale("+c1.toFixed(3)+")"),E.cloud.g.style.display=c1<.01?"none":"",E.cloudBody.setAttribute("fill",_2.cloud),E.rain.forEach((r1,X1)=>{let j1=(a*1.3+X1*.37)%1;r1.setAttribute("y",(8+j1*14).toFixed(2)),r1.setAttribute("opacity",(1-j1).toFixed(2)),r1.setAttribute("fill",_2.cloud)});let L1=o("dream");if(E.dream.g.style.display=L1<.01?"none":"",L1>=.01){E.dream.g.setAttribute("opacity",t(L1).toFixed(3));let r1=1.2*Math.sin(a*1.7);E.dreamEls.a.setAttribute("r",(2.6*t(L1*3)).toFixed(2)),E.dreamEls.b.setAttribute("r",(4.2*t(L1*3-1)).toFixed(2)),E.dreamEls.c.setAttribute("r",(15*t(L1*3-2)).toFixed(2)),E.dreamEls.c.setAttribute("cy",(-22+r1).toFixed(2));for(let X1 of["a","b","c"])E.dreamEls[X1].setAttribute("fill",H);E.dreamEls.icon.setAttribute("d",K5[b2]),E.dreamEls.icon.setAttribute("transform","translate(0 "+r1.toFixed(2)+")"),E.dreamEls.icon.setAttribute("opacity",t(L1*3-2).toFixed(2)),E.dreamEls.icon.setAttribute("stroke",b2==="sun"?W:"none"),E.dreamEls.icon.setAttribute("stroke-width","2")}let h1=o("rings");E.rings.g.style.display=h1<.01?"none":"",h1>=.01&&(g5+=C*h5,E.ringEls.forEach((r1,X1)=>{let j1=(g5/.8+X1*.5)%1,K9=1+.9*j1,I7=X1?1:-1;r1.setAttribute("transform","translate("+(60+I7*30)+" "+(22-8*j1)+") rotate("+I7*38+") scale("+K9.toFixed(3)+")"),r1.setAttribute("stroke",H),r1.setAttribute("opacity",(h1*(1-j1)).toFixed(3))}));let n1=o("scan");if(E.scan.g.style.display=n1<.01?"none":"",n1>=.01){let r1=a/1.6%1;E.scanEl.setAttribute("y",(-10+r1*130).toFixed(2)),E.scanEl.setAttribute("opacity",(.14*n1).toFixed(3))}let Y1=o("glow");if(O2.style.display=Y1<.01?"none":"",Y1>=.01){let r1=A.get("body.x")||0,X1=A.get("body.y")||0,j1=1+.04*Math.sin(a*7)*Math.sin(a*2.3);O2.setAttribute("cx",(60+r1).toFixed(2)),O2.setAttribute("cy",(64+X1).toFixed(2)),O2.setAttribute("rx",(110*Y1*j1).toFixed(2)),O2.setAttribute("ry",(100*Y1*j1).toFixed(2))}let Z2=A.get("body.x")||0,A2=A.get("body.y")||0,B2=1/(1+Math.max(0,-A2)/55);j2.setAttribute("cx",(60+Z2).toFixed(2)),j2.setAttribute("rx",(54*B2*(A.get("body.sx")||1)).toFixed(2)),j2.setAttribute("ry",(4.6*B2).toFixed(2)),j2.setAttribute("opacity",(.9*B2).toFixed(3))}let k2=[],x2=-9,c3={heart:1.9,z:2.6,sparkle:.9,star:2.2,steam:1.2,puff:1.1,tear:1.1,note:1.8,dot:1};function e1(C,H,e){H=H||{};for(let S=k2.length-1;S>=0;S--)k2[S]<=a&&k2.splice(S,1);let o=H.count||1;if(!e&&k2.length+o>7)return!1;if(w&&!e){if(a-x2<.5)return!1;x2=a}A.emit(C,H);let x=H.life||c3[C]||2;for(let S=0;S<o;S++)k2.push(a+x*1.15);return!0}let X2=A.layer("posture",{priority:5}),U=A.layer("sig",{priority:10}),Q1=A.layer("sigp",{priority:10,post:!0}),v1=A.layer("act",{priority:20}),o2=A.layer("actp",{priority:20,post:!0}),W1=A.layer("react",{priority:30}),E2=A.layer("reactp",{priority:30,post:!0}),H2=A.layer("mood",{priority:32}),u2=A.layer("sys",{priority:35}),x1=A.layer("talk",{priority:40}),d=A.layer("drag",{priority:60});for(let C of[U,Q1,v1,o2,W1,E2,H2,u2]){let H=C.add;C.add=(e,o)=>H(c5(e),o)}let v=A.layer("dragp",{priority:60,post:!0}),p=A.layer("weather",{priority:31});{let C=p.add;p.add=(H,e)=>C(c5(H),e)}let h={Happy:{"body.sy":.02},Grinning:{"body.sy":.02},Grateful:{"body.y":.5},DeadAss:{"body.sy":-.02},Devious:{"eyeL.ang":8,"eyeR.ang":8,"body.L":-.035},Alert:{"body.sy":.04,"eyeL.s":.1,"eyeR.s":.1},Scared:{"body.sy":-.05,"body.y":2,"eyeL.s":-.12,"eyeR.s":-.12},Angry:{"body.sy":.04,"eyeL.ang":12,"eyeR.ang":12},Hurt:{"body.sy":-.03,"body.rot":-4},Sad:{"body.sy":-.03,"body.y":1.5,"eyeL.y":2.5,"eyeR.y":2.5,"eyeL.top":.16,"eyeR.top":.16,"eyeL.ang":-12,"eyeR.ang":-12},NoInternet:{"body.rot":3},Pleading:{"body.rot":-5,"eyeL.shine":1,"eyeR.shine":1},Focusing:{"eyeL.ang":-6,"eyeR.ang":-6},Sleeping:{"body.sy":-.03,"body.y":1},Initializing:{"body.A":-.4*G5[1],"body.B":-.4*G5[2]}},b={Loving:"heart",Dead:"cross",Hurt:"cross",Initializing:"none",Angry:"half",Sleeping:"half",WTF:"half",Devious:"half",Smiling:"low",Grateful:"low",DeadAss:"wink",Winking:"wink",WinkingSmile:"wink",Pleading:"big"},$=C=>b[C]||"circle";function X(C){let H=4/C;A.spring("color",{k:H*H,c:2*H})}let j=C=>{let H={};for(let e in C)H["mouth."+e]=C[e];return H},p1=(C,H)=>j({tY:H,tR:C,tA:C,tH:-C,tD:0,bY:H,bR:C,bA:C,bH:C,bD:0,tongue:0,s:1,rot:0}),P=(C,H)=>j({tY:C-3,tR:H,tA:H,tH:0,tD:0,bY:C+3,bR:H,bA:H,bH:0,bD:0,tongue:0}),l={system:null,acute:null,flavor:null,auto:"Normal",autoAt:-99,flavorCool:0,lastFlavor:null,miss:!1,source:"auto"},D=V.autonomous,G="Normal",y1=0,D1={};function k(C,H,e){l.acute=Object.assign({id:C,until:a+H},e||{})}function y5(){return l.system?(l.source=l.system.tag,l.system.id):l.acute&&a<l.acute.until?(l.source="react",l.acute.id):(l.acute=null,l.source="mood",f.asleep?"Sleeping":l.flavor&&Y<l.flavor.until?l.flavor.id:(l.flavor=null,l.miss?"Sad":l.auto))}function c2(C,H){H=H||{};let e=G;if(e===C)return;X(C==="Sleeping"?1.5:C==="Sad"||e==="Sad"?.6:C==="Angry"||C==="Hurt"||C==="Scared"?.12:e==="Sleeping"?.8:.3),$(e)!==$(C)&&!H.noBlink&&A.blink({close:80,hold:70,open:140}),A.setExpression(C,{spring:H.spring}),e==="Loading"&&(A.setState("dot.s",0,0),A.layer("dotOff",{priority:98}).set({"dot.s":0}).ttl(250)),G=C,y1=a,D1={},X2.clear(),h[C]&&X2.add(h[C]),A5(C,e,H),M.onExpression?.(C)}function A5(C,H,e){H==="Sleeping"&&C!=="Sleeping"&&!e.quiet&&e.startle&&(A.impulse({y:-200*u,sy:3}),a5(),A.blink({double:!0})),C==="Angry"&&(A.impulse({sy:2.4*u,sx:1.2*u}),A.layer("flush",{priority:33}).set({"body.L":-.06}).weight(1).weight(0,420),e1("puff",{count:2,x:60,y:6})),C==="Sad"&&A.impulse({sy:-1.6*u,y:30*u}),(C==="Happy"||C==="Grinning"||C==="Loving")&&!e.noHop&&n5(.9),C==="Loving"&&e1("heart",{count:3,x:60,y:2,spread:60}),C==="Dead"&&A.impulse({sy:-3.5*u,rot:60*u}),C==="Alert"&&(A.impulse({y:-110*u,sy:1.8*u}),a5()),(C==="Winking"||C==="WinkingSmile")&&e1("sparkle",{x:104,y:56,life:.5,color:A.bodyColor})}let z0=A.layer("hop",{priority:55,post:!0}),J2={on:!1,t0:0,H:6};function n5(C){C=(C||1)*u,!(J2.on&&a-J2.t0<.5)&&Object.assign(J2,{on:!0,t0:a,H:6*C+1.5})}function N4(){if(z0.clear(),!J2.on)return;let C=a-J2.t0,H=.12,e=.17+.03*J2.H,o=.18,x=0,S=0;if(C<H)S=-.06*m(C/H);else if(C<H+e){let B=(C-H)/e;x=-J2.H*4*B*(1-B),S=B<.5?.06*(1-B*2):.03*(B-.5)*2}else if(C<H+e+o){let B=(C-H-e)/o;S=-.07*Math.sin(Math.PI*Math.min(1,B*1.6))*(1-B)}else{J2.on=!1,A.impulse({sy:1.2});return}z0.add({"body.y":x,"body.sy":S*u,"body.sx":-S*.5*u})}let K0=-9;function W4(){let C=l.auto,H=e=>C===e?.08:0;return f.I>.75-H("Angry")?"Angry":f.I>.45-H("WTF")-H("DeadAss")?f.E<.4?"DeadAss":"WTF":f.A>.85-H("Scared")&&f.V<-.2+H("Scared")?"Scared":f.V>.7-H("Loving")&&f.F>.6-H("Loving")?"Loving":f.V>.6-H("Grinning")-H("Happy")&&f.A>.6-H("Grinning")-H("Happy")?C==="Happy"||C==="Grinning"?C:Math.random()<.5?"Grinning":"Happy":f.V>.4-H("Happy")-H("Smiling")?f.A>.45?"Happy":"Smiling":f.V<-.4+H("Sad")?"Sad":f.V<-.15+H("Problem")&&f.C>.5-H("Problem")?"Problem":"Normal"}function U4(){if(Y-K0<.7)return;K0=Y;let C=W4();if(C!==l.auto&&Y-l.autoAt>=2.5&&(l.auto=C,l.autoAt=Y),D&&!l.flavor&&Y>l.flavorCool&&(l.auto==="Normal"||l.auto==="Smiling"||l.auto==="Happy")&&f.V>.3&&!f.asleep&&Math.random()<.12){let H=["Cheeky","Silly","UwU","WinkingSmile"].concat(f.I>.1?["Devious"]:[]).filter(o=>o!==l.lastFlavor),e=Z(H);l.flavor={id:e,until:Y+n(4,7)},l.lastFlavor=e,l.flavorCool=l.flavor.until+8}}let c={inside:!1,type:"mouse",cx:0,cy:0,wx:60,wy:60,vx:0,vy:0,speed:0,samples:[],press:null,lastMove:-9,leftAt:null,hoverHouse:!1,lean:1},C5=0;function B1(C){if(!(P1.forced&&!C)){if(C5=Y,P1.on&&A7(),O1.name==="fallAsleep"&&(C||!P1.forced)){d5(null),V5(C==="sudden"?"startle":"gentle");return}f.asleep&&C&&V5(C==="sudden"?"startle":"gentle")}}function $4(C,H,e){if(e=e||0,C<-e||C>120+e||H>116.88+e||H<-e)return!1;if(H>=52)return!0;let o=Math.abs(C-60)-2;return H>=o-e*1.4}function Z3(C,H,e){let[o,x]=A.worldToHouse(C,H),S=$4(o,x,e||0),B=null;return S&&(Math.hypot(o-33,x-65.88)<9.5||Math.hypot(o-87,x-65.88)<9.5?B="eye":B=x<52?"roof":"face"),{hit:S,hx:o,hy:x,region:B}}function O5(C,H,e){let o=c.samples,x=a-C,S=0,B=0;for(let F=1;F<o.length;F++){if(o[F].t<x)continue;let c1=e==="y"?o[F].y-o[F-1].y:o[F].x-o[F-1].x,L1=Math.max(.001,o[F].t-o[F-1].t);if(Math.abs(c1)<2||Math.abs(c1)/L1<H)continue;let h1=Math.sign(c1);B&&h1!==B&&S++,B=h1}return S}function q0(C){let H=c.samples,e=a-C,o=0;for(let x=1;x<H.length;x++)H[x].t>=e&&(o+=Math.hypot(H[x].x-H[x-1].x,H[x].y-H[x-1].y));return o}let O1={name:null,t0:0,dur:0,run:null,end:null,st:{}};function d5(C,H,e,o){if(O1.end&&O1.name)try{O1.end(O1.st,!0)}catch(x){console.error(x)}if(W1.clear(),E2.clear(),!C){Object.assign(O1,{name:null,run:null,end:null,st:{}});return}Object.assign(O1,{name:C,t0:a,dur:H,run:e,end:o,st:{}})}function G4(C){if(W1.clear(),E2.clear(),!O1.name)return;let H=a-O1.t0;if(H>=O1.dur){let e=O1.end,o=O1.st;O1.name=null,O1.run=null,O1.end=null,e&&e(o,!1);return}O1.run&&O1.run(H,H/O1.dur,O1.st,C)}let I1=(C,H)=>{try{M.onInteract(C,t(H))}catch{}},w2=[];function j0(C){B1("sudden");let H=C&&C.hx!=null?C.hx<60?1:-1:Math.random()<.5?1:-1;A.impulse({rot:H*150*u,sy:-2.8*u,sx:1.4*u}),A.squash(.08*u,90),A.blink({close:50,hold:60,open:120}),$1.pokesTotal++;for(let x=w2.length-1;x>=0;x--)a-w2[x]>4&&w2.splice(x,1);let e=!w2.length||a-w2[w2.length-1]>1.5;if(w2.push(a),d1(e?{V:.03,A:.2,I:.08,C:.1}:{V:-.05,A:.15,I:.18}),I1("poke",C&&C.region==="eye"?.5:e?.25:.35),C&&C.region==="eye"){d1({I:.1}),k("Hurt",.7),R1(a1("ouch"),{short:!0});return}C&&C.region==="roof"&&e1("star",{x:C.hx,y:C.hy-8,life:.7,s0:.6,s1:.2,vy:-20},!0);let o=w2.length;o===1?k("Alert",.9):o===2?k(Math.random()<.5?"Cheeky":"Silly",1.5):o<=4?(k("WTF",1.5),o===4&&R1(a1("hey"),{short:!0})):o<=7?(k("Angry",2.5),o===5&&R1(a1("stop"),{short:!0}),e1("puff",{count:2,x:60,y:4})):Q4()}function Q4(){k("WTF",3.4),R1(a1("hmph"),{short:!0}),d5("sulk",3.4,C=>{let H=m(C/.4)*(1-m((C-2.9)/.5));W1.add({"body.rot":-8*H,"eyeL.top":.5*H,"eyeR.top":.5*H,"face.x":-4*H}),C>2.6&&C<3.1&&W1.add({"eyeR.top":-.4})},()=>{w2.length=0})}function z4(){B1("sudden"),w2.pop(),I1("poke",.1),Math.random()<.7?(k("Winking",1.1),z(.15,()=>A.wink("R"))):k("Devious",1.1)}let D2=null;function K4(){B1("gentle"),D2={t0:a},k("Smiling",30),q.blush=1}function q4(){if(!D2)return;let C=m((a-D2.t0)/1);W1.add({"body.sy":-.12*C*u,"body.sx":.06*C*u}),d1({V:.002,F:7e-4,I:-.002})}function Y0(){if(!D2)return;let C=a-D2.t0;D2=null,q.blush=0,A.impulse({sy:3.2*u}),d1({V:.15,F:.04,I:-.1}),I1("hug",r(C/3,.3,1)),f.F>.4?(k("Loving",2),e1("heart",{count:3,x:60,y:0,spread:70})):f.F<.2?k("Sweating",1.5):k("Happy",1.4),C>2&&R1(Z(a1("hugLines")),{short:!0})}let T1={on:!1,t0:0,last:-9,px:0,total:0,heartAt:0,reportAt:0};function S3(C){T1.on||(T1.on=!0,T1.t0=a,T1.heartAt=a+1.5,T1.reportAt=a+.5,B1("gentle")),T1.last=a,T1.px=C}function j4(C){if(!T1.on)return;if(a-T1.last>1){T1.on=!1,q.blush=0,f.F>.5&&a-T1.t0>1.5&&(k("Pleading",.8),R1(a1("more"),{short:!0}),z(.8,()=>k("Happy",1.2)));return}let H=a-T1.t0;T1.total+=C,$1.petsSeconds+=C,d1({V:.12*C,A:-.05*C,F:.05*C,I:-.15*C}),a>=T1.reportAt&&(T1.reportAt=a+.5,I1("pet",.15)),q.blush=t(H/.8);let e=m(H/.5),o=r((T1.px-(60+(A.get("body.x")||0)))/40,-1,1)*5;W1.add({"eyeL.bot":.5*e,"eyeR.bot":.5*e,"eyeL.y":4*e,"eyeR.y":4*e,"body.rot":o}),w||E2.add({"body.x":.25*Math.sin(a*2*Math.PI*24),"body.sy":.012*Math.sin(a*2.4)}),k(H>4?"Loving":"Smiling",1.2),H>1.5&&a>=T1.heartAt&&(e1("heart",{x:n(30,90),y:-2,count:1}),T1.heartAt=a+.8)}let w1={on:!1,t0:0,last:-9,px:60,over:!1,refract:0,reportAt:0};function h3(C){a<w1.refract||(w1.on||(w1.on=!0,w1.t0=a,w1.over=!1,w1.reportAt=a+.5,B1("sudden")),w1.last=a,w1.px=C)}function Y4(C){if(!w1.on)return;if(a-w1.last>.6){w1.on=!1,w1.over||k("Happy",1.2);return}let H=a-w1.t0;if(d1({V:.15*C,A:.2*C,E:-.03*C,F:.01*C,I:-.05*C}),a>=w1.reportAt&&(w1.reportAt=a+.5,I1("tickle",.2)),H>6&&!w1.over){w1.over=!0,w1.on=!1,w1.refract=a+4,I1("tickle",.6),k("Dead",2.6),R1(a1("tooMuch"),{short:!0}),z(2.6,()=>k("Happy",1.4));return}k("Grinning",.8);let e=r((60+(A.get("body.x")||0)-w1.px)/30,-1,1)*6;W1.add({"eyeL.bot":.45,"eyeR.bot":.45,"eyeL.y":3,"eyeR.y":3,"body.rot":e}),w||E2.add({"body.y":1.2*Math.sin(a*2*Math.PI*8),"body.rot":1.2*Math.sin(a*2*Math.PI*6.5)}),q.blush=1,H>3&&Math.random()<C*1.2&&e1("tear",{x:Z([22,98]),y:70,count:1})}let U1={since:null,on:!1,t0:0,until:0,cool:0,id:null};function X0(){return!c.inside||c.press||!c.hoverHouse||c.type!=="mouse"||T1.on||w1.on||D2||N.on||O.on||O1.name||l.acute&&l.acute.tag!=="shy"||l.system||f.I>.3||f.asleep||G==="Angry"||G==="Sleeping"}function X4(){if(U1.on){if(a>U1.until||X0()||c.speed>400){U1.on=!1,U1.cool=a+14,l.acute&&l.acute.tag==="shy"&&(l.acute=null);return}let C=a-U1.t0;q.blush=1,H2.add({"eyeL.bot":.35,"eyeR.bot":.35,"eyeL.y":2.5,"eyeR.y":2.5,"body.rot":C<.6?-2:1});return}if(X0()||c.speed>150||a<U1.cool){U1.since=null;return}U1.since==null&&(U1.since=a),a-U1.since>.8&&(U1.on=!0,U1.t0=a,U1.until=a+2.6,U1.since=null,U1.id=f.F>.6?"Loving":f.F<.3?"Sweating":"Smiling",k(U1.id,2.6,{tag:"shy"}),B1("gentle"))}let N={on:!1,bx0:0,by0:0,wx0:0,wy0:0,vx:0,vy:0,revs:[],shaken:!1,lastDir:0,t0:0,tx:null,ty:null},O={on:!1,x:0,y:0,vx:0,vy:0,rot:0,vr:0,impacts:0,hard:0,shaken:!1,settleT:0},J4=[[0,116.88],[0,64],[5.3,51.6],[54.7,2.2],[60,0],[65.3,2.2],[114.7,51.6],[120,64],[120,116.88]];function Y3(C,H,e,o,x,S){let B=e*Math.PI/180,F=Math.cos(B),c1=Math.sin(B),L1=Math.tan((S||0)*Math.PI/180),h1=1/0,n1=-1/0,Y1=1/0,Z2=-1/0;for(let[A2,m2]of J4){let B2=(A2-60)*o,r1=(m2-116.88)*x;B2+=r1*L1;let X1=60+C+B2*F-r1*c1,j1=116.88+H+B2*c1+r1*F;X1<h1&&(h1=X1),X1>n1&&(n1=X1),j1<Y1&&(Y1=j1),j1>Z2&&(Z2=j1)}return{x0:h1,x1:n1,y0:Y1,y1:Z2}}function X3(){return{L:M1.x0+4,R:M1.x0+M1.w-4,T:M1.y0+5,F:116.88}}function J0(C){let H=X3(),e=0,o=0;return C.x0<H.L?e=H.L-C.x0:C.x1>H.R&&(e=H.R-C.x1),C.y0<H.T?o=H.T-C.y0:C.y1>H.F&&(o=H.F-C.y1),[e,o]}let P2=(C,H)=>{let e=A.get(C);return e??H},C7=A.layer("clampp",{priority:99,post:!0}),q5=[0,0];function C9(){let C=P2("body.x",0)-q5[0],H=P2("body.y",0)-q5[1],[e,o]=J0(Y3(C,H,P2("body.rot",0),P2("body.sx",1),P2("body.sy",1),P2("body.skew",0)));q5=[e,o],C7.clear(),(e||o)&&C7.add({"body.x":q5[0],"body.y":q5[1]})}function J3(C,H){B1("sudden"),O.on=!1,Object.assign(N,{on:!0,bx0:A.get("body.x")||0,by0:A.get("body.y")||0,wx0:C,wy0:H,vx:0,vy:0,revs:[],shaken:!1,lastDir:0,t0:a,tx:null,ty:null}),A.spring("body.x",{k:260,c:22}),A.spring("body.y",{k:260,c:22}),R.classList.add("grabbing"),k("Alert",99),d1({A:.2,C:.1})}function f3(C,H,e,o){let x=N.bx0+(C-N.wx0),S=Math.min(0,N.by0+(H-N.wy0)),B=r(e/80,-15,15)*u,F=1+r(Math.abs(o)/2e3,0,.12)*u,[c1,L1]=J0(Y3(x,S,B,1,F,0));x+=c1,S+=L1,N.tx=x,N.ty=S,N.vx=e,N.vy=o;let h1=Math.hypot(e,o),n1=Math.sign(e);for(Math.abs(e)>900&&n1&&n1!==N.lastDir&&(N.lastDir&&N.revs.push(a),N.lastDir=n1);N.revs.length&&a-N.revs[0]>.9;)N.revs.shift();N.revs.length>=4&&(N.shaken=!0),N.shaken?k("Dead",99):h1>1800?k("Scared",99):h1>300&&f.V>.3?k("Grinning",99):a-N.t0>.4&&k("Alert",99),h1>1800&&d1({A:.01})}function H9(){if(!N.on)return;d.set({"body.x":N.tx!=null?N.tx:N.bx0,"body.y":N.ty!=null?N.ty:N.by0,"body.rot":r(N.vx/80,-15,15)}),v.add({"body.sy":r(Math.abs(N.vy)/2e3,0,.12)*u,"body.sx":-r(Math.abs(N.vy)/4e3,0,.06)*u});let C=r(N.vx/500,-1,1),H=r(N.vy/500,-1,1);A.lookAt(60+(A.get("body.x")||0)+C*80,66+(A.get("body.y")||0)+H*80)}function H7(){if(!N.on)return;N.on=!1,R.classList.remove("grabbing");let C=M1.s,H=r(N.vx,-3e3,3e3)/C,e=r(N.vy,-3e3,3e3)/C,o=N.shaken;if(o&&(d1({V:-.25,A:.4,E:-.05,F:-.05,I:.35}),I1("shake",.8)),w||Math.hypot(H,e)<60/C){d.clear(),V7(),o?C0(n(2.5,4)):k(f.V>.3?"Happy":"Normal",.8);return}d.clear(),Object.assign(O,{on:!0,x:A.get("body.x")||0,y:A.get("body.y")||0,vx:H,vy:e,rot:A.get("body.rot")||0,vr:H*.9,impacts:0,hard:0,shaken:o,settleT:0}),d1({V:.05,A:.3,E:-.02,C:.1}),o||I1("throw",r(Math.hypot(N.vx,N.vy)/3e3,.2,1)),k(Math.hypot(N.vx,N.vy)>1800?"Scared":f.V>.3?"Grinning":"Alert",99)}function V9(C){if(!O.on)return;let H=M1.s,e=2600/H,o=X3();O.vy+=e*C,O.x+=O.vx*C,O.y+=O.vy*C,O.vr*=Math.exp(-C*1.2),O.rot+=O.vr*C,O.rot=r(O.rot,-25*u,25*u);let x=Y3(O.x,O.y,O.rot,P2("body.sx",1),P2("body.sy",1),0),S=F=>{let c1=Math.abs(F)*H;c1>300&&(O.impacts++,A.impulse({sy:-Math.min(c1/4e3,.14)*30*u,sx:Math.min(c1/4e3,.14)*15*u}),c1>1400?(O.hard++,O.hard>=2&&(k("Hurt",1),d1({V:-.25,A:.4,I:.35}),O.hard===2&&I1("shake",.5),q.bandage=1,z(4,()=>{q.bandage=0}))):c1>700&&k("Alert",.6))};x.x0<o.L&&(O.x+=o.L-x.x0,O.vx<0&&(S(O.vx),O.vx=-O.vx*.45,O.vr=-O.vr*.6)),x.x1>o.R&&(O.x-=x.x1-o.R,O.vx>0&&(S(O.vx),O.vx=-O.vx*.45,O.vr=-O.vr*.6)),x.y0<o.T&&(O.y+=o.T-x.y0,O.vy<0&&(S(O.vy),O.vy=-O.vy*.45));let B=!1;x.y1>o.F&&(O.y-=x.y1-o.F,B=!0,O.vy>0&&(S(O.vy),O.vy=-O.vy*.45,O.vx*=.85,O.vr*=.6,Math.abs(O.vy)*H<160&&(O.vy=0)),O.rot*=.82),O.y=Math.min(0,O.y),B&&Math.abs(O.vy)<1&&(O.settleT+=C),A.setState("body.x",O.x,O.vx),A.setState("body.y",O.y,O.vy),d.set({"body.x":O.x,"body.y":O.y,"body.rot":O.rot}),O.settleT>.25&&Math.abs(O.vx)*H<120&&(O.on=!1,d.clear(),V7(),O.shaken?C0(n(2.5,4)):O.hard>=2?k("Hurt",1.2):k(f.V>.2?"Happy":"Normal",1))}function V7(){A.spring("body.x",{k:60,c:14}),A.spring("body.y",{k:60,c:14}),z(2.2,()=>{A.spring("body.x",null),A.spring("body.y",null)},"home"),A.lookAt(null)}function C0(C){k("Dead",C),e1("star",{count:3,orbit:{cx:60,cy:-6,r:22,ry:.27,speed:4.5},life:C},!0),d5("dizzy",C,(H,e)=>{W1.add({"body.rot":4*Math.sin(H*3.8),"body.x":1.5*Math.sin(H*3.8+1.57)}),H>C-.5&&W1.add({"body.rot":8*Math.sin(H*44)*(1-e)*4})})}let g3=A.layer("tilt",{priority:56}),y={t:0,vote:.3,gx:0,gy:-9.81,tilt:0,off:0,v:0,levelT:0,pinnedT:0,revs:{x:[],y:[]},dir:{x:0,y:0},shaking:!1,strongAt:-9,kickAt:-9,freeT:0},L9=9.81;function L7(){return(+(screen.orientation?screen.orientation.angle:window.orientation)||0)*Math.PI/180}function e7(C,H){let e=L7(),o=Math.cos(e),x=Math.sin(e),S=y.vote>=0?1:-1;return[(C*o-H*x)*S,-(C*x+H*o)*S]}function M7(C){t7++;let H=C.accelerationIncludingGravity;if(!H||H.x==null||H.y==null)return;let e=performance.now()/1e3,o=r(e-(y.t||e-.016),.005,.1);y.t=e;let x=L7(),S=H.x*Math.sin(x)+H.y*Math.cos(x);if(Math.abs(S)>6){let m2=y.vote>=0;y.vote=r(y.vote+Math.sign(S)*o,-1,1),m2!==y.vote>=0&&(y.gx=-y.gx,y.gy=-y.gy)}let B=C.acceleration,F=!!B&&B.x!=null&&B.y!=null,[c1,L1]=e7(H.x-(F?B.x:0),H.y-(F?B.y:0)),h1=1-Math.exp(-o/.2);y.gx+=(c1-y.gx)*h1,y.gy+=(L1-y.gy)*h1,y.tilt=r(-y.gx/L9,-1,1);let[n1,Y1]=F?e7(B.x,B.y):[c1-y.gx,L1-y.gy],Z2=Math.hypot(H.x,H.y,H.z||0);if(y.freeT=Z2<2.5?y.freeT+o:0,y.freeT>.12&&!N.on&&(B1("sudden"),k("Scared",1.2),y.freeT=-1),N.on)return;for(let[m2,B2]of[["x",n1],["y",Y1]]){if(Math.abs(B2)<14)continue;let r1=Math.sign(B2);for(r1!==y.dir[m2]&&(y.dir[m2]&&y.revs[m2].push(a),y.dir[m2]=r1);y.revs[m2].length&&a-y.revs[m2][0]>1;)y.revs[m2].shift()}let A2=Math.hypot(n1,Y1);A2>14&&(y.strongAt=a),!y.shaking&&Math.max(y.revs.x.length,y.revs.y.length)>=4&&(y.shaking=!0,B1("sudden"),O.shaken=!0),y.shaking&&k("Dead",99),A2>13&&a-y.kickAt>.15&&(y.kickAt=a,e9(-n1/A2,-Y1/A2,A2))}function e9(C,H,e){B1("sudden");let o=r((e-8)*45,0,1300),x=!O.on;if(w||x&&H>.6){A.impulse({sy:-Math.min(o/900,1)*3*u,sx:Math.min(o/900,1)*1.5*u,x:C*o*.2*u}),y.shaking||k("Alert",.6);return}if(O.on){O.vx+=C*o*.6,O.vy+=H*o*.6,O.vr+=C*o*.5,O.settleT=0;return}if(o<220){A.impulse({x:C*o*.4,y:Math.min(0,H)*o*.4}),y.shaking||k("Alert",.6);return}let S=(A.get("body.x")||0)+y.off;y.off=0,y.v=0,g3.clear(),Object.assign(O,{on:!0,x:S,y:A.get("body.y")||0,vx:C*o,vy:Math.min(H,-.2)*o,rot:A.get("body.rot")||0,vr:C*o*.9,impacts:0,hard:0,shaken:y.shaking,settleT:0}),d1({V:.03,A:.3,C:.1}),I1("throw",r(o/1300,.2,1)),y.shaking||k(o>900?"Scared":f.V>.3?"Grinning":"Alert",99)}function M9(C){if(y.shaking&&a-y.strongAt>.6&&(y.shaking=!1,y.revs.x.length=0,y.revs.y.length=0,d1({V:-.25,A:.4,E:-.05,F:-.05,I:.35}),I1("shake",.8),O.on||(O.shaken=!1,C0(n(2.5,4)))),N.on||O.on||!y.t){y.off=0,y.v=0,g3.clear();return}let H=y.tilt,e=Math.abs(H);e>.26?(Math.abs(y.v)<5&&(B1(),w5(60+y.off+Math.sign(H)*200,100,.8)),y.v+=(H-Math.sign(H)*.2)*900*u*C,y.levelT=0):(y.v*=Math.exp(-C*6),y.levelT=e<.12?y.levelT+C:0,y.levelT>1.5&&(y.v=i(y.v,-y.off*1.4,1-Math.exp(-C*3)))),y.v*=Math.exp(-C*.8),y.off+=y.v*C;let o=X3(),x=Math.min(0,o.L),S=Math.max(0,o.R-120);if(y.off<x||y.off>S){if(y.off=r(y.off,x,S),Math.abs(y.v)>70){let F=Math.min(Math.abs(y.v)/400,1);A.impulse({sx:-1.5*F*u,rot:-Math.sign(y.v)*60*F*u}),k(Math.abs(y.v)>300?"Hurt":"Alert",.7)}y.v=0}y.pinnedT=e>.45&&y.v===0?y.pinnedT+C:0,Math.abs(y.v)>40&&!y.shaking?k(f.V>.45?"Grinning":"Scared",.4):y.pinnedT>1.5&&!y.shaking&&k("Sweating",.5);let B=Math.asin(r(H,-1,1))*180/Math.PI;g3.clear(),(y.off||Math.abs(B)>2)&&g3.add({"body.x":y.off,"body.rot":r(-B*.3,-10,10)*u})}let H0=window.DeviceMotionEvent,r7=!!H0&&typeof H0.requestPermission=="function",p5=r7?"unknown":"granted",t7=0;function y3(){!r7||y.t||p5==="asking"||p5==="granted"||p5==="denied"||(p5="asking",H0.requestPermission().then(C=>{p5=C==="granted"?"granted":"denied"}).catch(()=>{p5="error"}))}function J(C,H,e,o,x){let S="n_"+H;if(C[S]==null){C[S]=a+n(e,o);return}a>=C[S]&&(x(),C[S]=a+n(e,o))}function S1(C,H){let e=C[H+"T"];return e==null?-1:a-e}let i7={Normal(C){U.add({"body.rot":1*Math.sin(a*.75+j3[0]),"mouth.s":.04*Math.sin(a*1.2)}),J(C,"sq",8,15,()=>{C.sqT=a});let H=S1(C,"sq");H>=0&&H<.6&&U.add({"eyeL.bot":.15*g(H/.6),"eyeR.bot":.15*g(H/.6)})},Smiling(C){q.blush=Math.max(q.blush,.75),J(C,"sq",4,8,()=>{C.sqT=a});let H=S1(C,"sq");H>=0&&H<.15&&U.add({"eyeL.bot":.12,"eyeR.bot":.12}),U.add({"body.y":-1.2*(.5+.5*Math.sin(a*2.8)),"body.rot":r9(2)})},Happy(C){J(C,"hop",2.5,4.5,()=>n5(.7)),J(C,"sp",3,6,()=>e1("sparkle",{x:Z([8,112]),y:36,life:.45,spread:0,color:A.bodyColor})),U.add({"mouth.bH":1.5*Math.sin(a*2)})},Grinning(C){J(C,"g",3,6,()=>{C.gT=a,C.gD=n(.4,.7)});let H=S1(C,"g");H>=0&&H<C.gD&&(w||Q1.add({"body.y":.8*Math.sin(a*2*Math.PI*8)}),U.add({"eyeL.bot":.25,"eyeR.bot":.25,"mouth.tR":1,"mouth.bR":1,"mouth.tA":1,"mouth.bA":1}),q.blush=Math.max(q.blush,1))},Grateful(C){J(C,"bow",5,8,()=>{C.bowT=a});let H=S1(C,"bow");if(H>=0&&H<1.1){let e=g(H/1.1);U.add({"body.sy":-.04*e,"body.y":1.5*e,"face.y":1*e})}J(C,"h",4,7,()=>e1("heart",{x:60,y:-4,life:1.8}))},Loving(C){q.blush=Math.max(q.blush,1);let H=T1.on?.52:C.per||(C.per=n(.7,.85)),e=a%H/H,o=e<.13?.18*Math.sin(e/.13*Math.PI):e>.29&&e<.42?.12*Math.sin((e-.29)/.13*Math.PI):0;Q1.add({"eyeL.s":o*u,"eyeR.s":o*u}),U.add({"body.rot":2*Math.sin(a*2.5)}),J(C,"h",.9,1.6,()=>e1("heart",{x:Z([6,114]),y:40,vx:0,vy:-20,life:1.6,spread:6}))},UwU(C){q.blush=Math.max(q.blush,1),J(C,"side",4,7,()=>{C.side=-(C.side||1)}),U.add({"body.rot":6*(C.side||1)}),J(C,"mlem",3,5,()=>{C.mlemT=a});let H=S1(C,"mlem");H>=0&&H<1&&U.add({"mouth.rot":5*Math.sin(H*2*Math.PI*2),"mouth.bH":1.5*Math.sin(H*12.6)})},Winking(C,H){J(C,"w",4,7,()=>{C.wT=a,e1("sparkle",{x:104,y:56,life:.4,color:A.bodyColor})});let e=S1(C,"w");if(e>=0&&e<.32){let o=e<.08?e/.08:1-(e-.08)/.24;U.add({"eyeR.top":.5*t(o),"body.rot":3*t(o)}),H&&U.add({"mouth.rot":-3*t(o)})}U.add({"body.rot":H?3:4})},WinkingSmile(C){i7.Winking(C,!0)},Cheeky(C){J(C,"tilt",2,4,()=>{C.tilt=-(C.tilt||1)}),U.add({"body.rot":3*(C.tilt||1)}),J(C,"wig",1.6,3,()=>{C.wigT=a});let H=S1(C,"wig");H>=0&&H<.8&&U.add({"mouth.tgX":2*Math.sin(H*2*Math.PI*3)}),J(C,"blep",6,10,()=>{C.blepT=a});let e=S1(C,"blep");e>=0&&e<.24&&U.set({"mouth.tongue":e<.12?0:1.25})},Silly(C){U.add({"body.rot":2.5*Math.sin(a*6.3)}),J(C,"swap",5,9,()=>{C.swap=!C.swap});let H=Math.sin(a*7.5);C.swap?U.add({"eyeL.y":-6+2*H,"eyeR.y":6-2*H}):U.add({"eyeR.y":2*H,"eyeL.y":-2*H}),J(C,"wig",1.2,2.4,()=>{C.wigT=a});let e=S1(C,"wig");e>=0&&e<.8&&U.add({"mouth.tgX":2*Math.sin(e*2*Math.PI*4.5)})},DeadAss(C){U.add({"mouth.tgX":1*Math.sin(a*1.9)}),J(C,"slump",6,10,()=>{C.slumpT=a,A.blink({close:150,hold:380,open:250})});let H=S1(C,"slump");H>=0&&H<1.4&&U.add({"body.sy":-.02*g(H/1.4)}),J(C,"sigh",10,16,()=>{C.sighT=a,z(.7,()=>e1("puff",{x:84,y:88,vy:-6,vx:10,life:.9,s0:.3,s1:.8}))});let e=S1(C,"sigh");e>=0&&e<1.6&&U.add({"body.sy":e<.7?.03*m(e/.7):.03-.06*m((e-.7)/.9)*(1-m((e-1.2)/.4))})},Devious(C){J(C,"slide",1.2,2.2,()=>{C.dir=C.dir===1?-1:1}),U.add({"eyeL.x":3*(C.dir||1),"eyeR.x":3*(C.dir||1)}),J(C,"heh",4,7,()=>{C.hehT=a});let H=S1(C,"heh");H>=0&&H<.9&&(U.add({"mouth.s":.1*g(H/.9),"eyeL.top":.12,"eyeR.top":.12}),!w&&H>.4&&Q1.add({"body.y":-1*Math.abs(Math.sin((H-.4)*Math.PI*6))}))},Alert(){U.add({"mouth.s":.06*Math.sin(a*5)})},Scared(C){w||Q1.add({"body.x":.6*Math.sin(a*113)*Math.sin(a*7.1)}),J(C,"look",2,3,()=>{C.lookT=a,C.lookDir=Math.random()<.5?-1:1});let H=S1(C,"look");H>=0&&H<.6&&U.add({"eyeL.x":4*C.lookDir,"eyeR.x":4*C.lookDir}),U.add({"body.L":.02*Math.sin(a*6)}),a-y1>2&&J(C,"drop",2.5,4,()=>e1("tear",{x:108,y:60,vy:6,gravity:40,life:1.2}))},Angry(C){w||Q1.add({"body.x":.4*Math.sin(a*75)}),U.add({"body.L":-.03*(.5+.5*Math.sin(a*3.1))}),q.vein=1,J(C,"huff",3,5,()=>A.impulse({sy:-2.2*u})),J(C,"steam",1.4,2.4,()=>{e1("puff",{x:30,y:34,vx:-10,vy:-18,spread:0}),e1("puff",{x:90,y:34,vx:10,vy:-18,spread:0})}),c.inside&&!N.on&&!l.system&&A.lookAt(c.wx,c.wy,{lean:c.lean})},Hurt(C){J(C,"w",1,2,()=>{C.wT=a});let H=S1(C,"w");H>=0&&H<.3&&(U.add({"eyeL.s":-.1,"eyeR.s":-.1}),w||Q1.add({"body.x":.5*Math.sin(a*88)*(1-H/.3)})),a-y1>1&&(q.bandage=1),J(C,"tear",1.5,3,()=>e1("tear",{x:Z([33,87]),y:76}))},Dead(C){U.add({"body.rot":4*Math.sin(a*3.8),"body.x":1.5*Math.cos(a*3.8)}),J(C,"tw",3,6,()=>{C.twT=a,C.twE=Math.random()<.5?"eyeL.s":"eyeR.s"});let H=S1(C,"tw");H>=0&&H<.08&&U.add({[C.twE]:.15}),(!C.stars||a>C.stars)&&(e1("star",{count:3,orbit:{cx:60,cy:-6,r:22,ry:.27,speed:4.5},life:2.6},!0),C.stars=a+2.5)},Sad(C){J(C,"sigh",9,13,()=>{C.sighT=a});let H=S1(C,"sigh");H>=0&&H<2.3&&U.add({"body.sy":H<.9?.025*m(H/.9):.025-.055*m((H-.9)/1.4)*(1-m((H-1.9)/.4)),"eyeL.top":H>.9?.1:0,"eyeR.top":H>.9?.1:0}),J(C,"tear",6,10,()=>e1("tear",{x:Z([30,90]),y:74,vy:2,gravity:30,life:1.6})),c.inside&&!N.on&&!l.system&&A.lookAt(60+(60-c.wx),160,{lean:.3*(c.lean||0)}),q.cloud=a-y1>20?1:0},Problem(C){J(C,"tilt",1.5,2.5,()=>{C.tilt=-(C.tilt||1)}),U.add({"body.rot":6*(C.tilt||1)}),J(C,"scr",4,7,()=>{C.scrT=a});let H=S1(C,"scr");H>=0&&H<.3&&!w&&Q1.add({"body.rot":2*Math.sin(a*63)}),J(C,"up",2,4,()=>{C.upT=a});let e=S1(C,"up");e>=0&&e<.9&&U.add({"eyeL.x":3,"eyeR.x":3,"eyeL.y":-3,"eyeR.y":-3})},NoInternet(C){J(C,"up",2,4,()=>{C.upT=a});let H=S1(C,"up");H>=0&&H<.8&&U.add({"eyeL.x":3.5,"eyeR.x":3.5,"eyeL.y":-3,"eyeR.y":-3}),J(C,"reach",6,9,()=>{C.reachT=a});let e=S1(C,"reach");e>=0&&e<.9&&U.add({"body.sy":.06*g(e/.9),"body.rot":2*g(e/.9)}),C.cyc==null&&(C.cyc=Math.floor(a/1.9));let o=Math.floor(a/1.9);o!==C.cyc&&(C.cyc=o,Math.random()<.6&&A.blink({double:!0}))},Pleading(C){w||Q1.add({"eyeL.s":.03*Math.sin(a*37.7),"eyeR.s":.03*Math.sin(a*37.7+.6)}),J(C,"pp",3,5,()=>{C.ppT=a});let H=S1(C,"pp");H>=0&&H<.5&&U.add({"body.y":-1.5*Math.abs(Math.sin(H*Math.PI*4))})},Sweating(C){J(C,"drop",5,8,()=>e1("tear",{x:92,y:40,vy:8,vx:4,gravity:60,life:1.1})),J(C,"laugh",2.5,4.5,()=>{C.lT=a});let H=S1(C,"laugh");H>=0&&H<.5&&!w&&Q1.add({"body.y":.4*Math.sin(a*56)})},WTF(C){U.add({"body.rot":-.6*Math.sin(a*.6)}),J(C,"dt",6,10,()=>{C.dtT=a});let H=S1(C,"dt");H>=0&&H<.9&&(H<.2&&U.set({"eyeL.top":0,"eyeR.top":0}),U.add({"body.rot":3*Math.sin(H*Math.PI*4)*(H>.2?1:0)})),J(C,"dots",7,11,()=>{C.dotsT=a});let e=S1(C,"dots");q.dots=e>=0&&e<2.6?1:0},Focusing(C){let H=a%3.2/3.2,e=H<.25?m(H/.25):H<.62?1:H<.85?1-m((H-.62)/.23):0;U.set({"acc.bubbles":e}),U.add({"eyeL.x":3,"eyeR.x":3,"eyeL.y":-2.5,"eyeR.y":-2.5,"body.rot":1.5*Math.sin(a*1.57),"mouth.tgX":1.5*Math.sin(a*9.4)}),J(C,"lb",5,8,()=>A.blink({close:110,hold:400,open:180}))},Loading(C){let H=B=>{let F=(a-B*.12)%.9/.9;return F<.45?Math.sin(F/.45*Math.PI):0},e=H(0),o=H(1),x=H(2);U.add({"eyeL.y":-5*e*u,"eyeL.s":.15*e,"dot.dy":-5*o*u,"dot.s":.15*o,"eyeR.y":-5*x*u,"eyeR.s":.15*x}),J(C,"bl",4,7,()=>{C.blT=a});let S=S1(C,"bl");S>=0&&S<.18&&U.add({"eyeL.open":-.8,"eyeR.open":-.8,"dot.s":-.7})},Initializing(){q.scan=1,U.add({"body.L":.03*Math.sin(a*5)})},Sleeping(C){let e=a%4.2/4.2,x=e<.43?m(e/.43):1-m((e-.43)/.57);U.add({"mouth.s":-.3+.5*x,"body.sy":.02*x}),J(C,"dream",8,20,()=>{C.dreamT=a,C.dreamK=Math.random()<.12?"bubble":Z(["flutter","smile","mumble","giggle"]),C.dreamK==="bubble"&&(b2=Z(Object.keys(K5)))});let S=S1(C,"dream");if(S>=0){let B=C.dreamK;B==="flutter"&&S<.36&&U.add({"eyeL.top":-.18*Math.abs(Math.sin(S*Math.PI/.12)),"eyeR.top":-.18*Math.abs(Math.sin(S*Math.PI/.12))}),B==="smile"&&S<.6&&U.set({"mouth.tH":10,"mouth.bH":14,"mouth.tR":12,"mouth.bR":14,"mouth.tA":12,"mouth.bA":14}),B==="mumble"&&S<.8&&U.add({"mouth.s":.2*Math.sin(S*Math.PI*6),"mouth.rot":6*Math.sin(S*9)}),B==="giggle"&&S<.5&&U.add({"body.y":-1.5*Math.abs(Math.sin(S*Math.PI*4))}),q.dream=B==="bubble"&&S<4.5?1:0}}};function r9(C){return c.inside?r((c.wx-60-(A.get("body.x")||0))/80,-1,1)*C*(c.lean||0)*A.gazeLean.habituation:0}let o7={lookAround:{dur:[2,3.5],cd:6,w:()=>10*(1+f.C)*a7("look"),run(C,H,e){(!e.n||C>e.n)&&(e.n=C+n(.4,.9),e.p=[60+n(-1,1)*140,60+n(-1,1)*90]),A.lookAt(e.p[0],e.p[1])},end(){A.lookAt(null)}},glanceAtCursor:{dur:[.8,1.5],cd:4,w:()=>c.inside?8*(1+f.F):0,run(C,H,e){A.lookAt(c.wx,c.wy,{lean:c.lean}),!e.b&&C>.3&&(e.b=1,Math.random()<.15&&A.blink({close:120,hold:500,open:200}))},end(){A.lookAt(null)}},lookUp:{dur:[1.6,2.6],cd:25,w:()=>(P5()!=="clear"?3:1)*(1+f.C),run(){let C=o0();A.lookAt(C[0],C[1],{lean:.5})},end(){A.lookAt(null)}},peekRoof:{dur:[1.5,1.5],cd:20,w:()=>3*(1+f.C),run(C,H){let e=g(H);A.lookAt(60,-300),v1.add({"body.sy":.03*e,"body.rot":2*e})},end(){A.lookAt(null)}},yawn:{dur:[2.2,2.2],cd:25,w:()=>2*(f.E<.4?4:1)*a7("yawn")*(G1()?1.5:1),run(C){let H=C<.9?i(6,17,m(C/.9)):C<1.3?17:i(17,6,m((C-1.3)/.5)),e=C<1.8?m(C/.3):1-m((C-1.8)/.4);v1.set(p1(H,88),e),v1.add({"eyeL.top":.3*e,"eyeR.top":.3*e,"eyeL.bot":.3*e,"eyeR.bot":.3*e,"body.sy":.06*e*u})},end(){A.blink({close:140,hold:300,open:240})}},stretch:{dur:[1.6,1.6],cd:30,w:()=>2,run(C){C<.6?v1.add({"body.sy":.1*m(C/.6)*u,"body.sx":-.04*m(C/.6)}):C>1.2&&!w&&o2.add({"body.x":.6*Math.sin(C*90)})},start(){z(.62,()=>A.impulse({sy:-2*u}))}},hum:{dur:[3,5],cd:18,w:()=>f.V>.3?4*(1+f.V):0,run(C,H,e){v1.add({"mouth.s":.06*Math.sin(C*15.7),"body.rot":3*Math.sin(C*6.28)*g(H)}),(!e.n||C>e.n)&&(e.n=C+n(.9,1.5),e1("note",{x:114,y:72,vx:12,vy:-14}))}},whistle:{dur:[2.5,2.5],cd:25,w:()=>f.V>.2?2:0,run(C,H,e){let o=g(H)>.2?1:g(H)*5;v1.set(p1(5,86),o),v1.add({"body.sx":.02*o}),(!e.n||C>e.n)&&(e.n=C+1.1,e1("note",{x:112,y:76,vx:14,vy:-12}))}},sneeze:{dur:[1.8,1.8],cd:60,w:()=>.6,run(C,H,e){if(C<.9){let o=C<.3?.5:1;v1.add({"eyeL.top":.25*o,"eyeR.top":.25*o,"eyeL.bot":.25*o,"eyeR.bot":.25*o,"body.sy":.06*m(C/.9)*u}),v1.set(p1(4+4*o,88))}else e.c||(e.c=1,A.impulse({sy:-4*u,y:60*u}),e1("dot",{x:60,y:92,count:3,vy:10,spread:30,gravity:80,life:.7,color:W}),R1(a1("achoo"),{short:!0})),v1.add({"body.rot":6*Math.sin((C-.9)*22)*(1-(C-.9)/.9)*u})}},shiver:{dur:[1.2,1.2],cd:40,w:()=>.8*(G1()&&f.E<.3?3:1)*(P5()==="wind"||P5()==="snow"?2.5:1),run(){w||o2.add({"body.x":.7*Math.sin(a*88)}),v1.add({"body.sy":-.03,"eyeL.top":.2,"eyeR.top":.2,"eyeL.bot":.2,"eyeR.bot":.2})}},daydream:{dur:[4,6],cd:30,w:()=>f.V>=0?3:0,start(){b2=Z(Object.keys(K5))},run(C,H){let e=g(H)>.15?1:g(H)/.15;A.lookAt(140,-120),v1.add({"eyeL.bot":.35*e,"eyeR.bot":.35*e}),v1.set({"acc.bubbles":t(C/.7)*(1-m((H-.85)/.15))}),q.dream=H>.15&&H<.9?1:0},end(){A.lookAt(null),q.dream=0}},peekaboo:{dur:[2,2],cd:45,w:()=>c.inside&&f.F>.5?2:0,run(C,H,e){C<1?v1.add({"eyeL.bot":.5,"eyeR.bot":.5,"eyeL.y":4,"eyeR.y":4,"body.sy":-.05}):e.p||(e.p=1,n5(.8),A.lookAt(c.wx,c.wy,{lean:c.lean}),a5())},end(){A.lookAt(null)}},tinyDance:{dur:[3,4],cd:40,w:()=>f.E>.6&&f.V>.5?1.5:0,run(C,H,e){let o=Math.floor(C*2);v1.add({"body.rot":7*(o%2?1:-1)*u,"eyeL.bot":.5,"eyeR.bot":.5,"eyeL.y":4,"eyeR.y":4}),e.b!==o&&(e.b=o,A.impulse({y:-70*u}))}},suspicious:{dur:[1.2,1.2],cd:20,w:()=>f.I>.2||f.C>.6?1.5:0,run(C,H){let e=g(H)>.2?1:g(H)*5;c.inside&&A.lookAt(c.wx,c.wy,{lean:c.lean}),v1.add({"eyeR.top":.35*e,"body.rot":-2*e})},end(){A.lookAt(null)}},headBob:{dur:[2,4],cd:15,w:()=>f.E>.4?3:0,run(C){v1.add({"face.y":1.2*Math.sin(C*9.4),"body.rot":1.5*Math.sin(C*9.4)})}},sigh:{dur:[1.6,1.6],cd:14,w:()=>Y-C5>20?4:0,run(C){v1.add({"body.sy":C<.7?.03*m(C/.7):.03-.06*m((C-.7)/.9)})},start(){z(.7,()=>e1("puff",{x:84,y:88,vx:10,vy:-6,life:.9,s0:.3,s1:.8}))}}},t9=new Set(["Sleeping","Dead","Hurt","Initializing","Loading","Angry","Scared"]);function a7(C){return Y-C5<20?1:C==="look"?2:C==="yawn"?3:1}let u1={act:null,name:null,t0:0,dur:0,st:{},nextAt:2,cool:{}};function O3(C){let H=o7[C];return H?(H5(!0),u1.act=H,u1.name=C,u1.t0=a,u1.dur=n(H.dur[0],H.dur[1]),u1.st={},u1.cool[C]=Y+H.cd,H.start&&H.start(u1.st),!0):!1}function H5(C){if(!u1.act)return;let H=u1.act;u1.act=null,u1.name=null,v1.clear(),o2.clear(),H.end&&H.end(u1.st,C),u1.nextAt=Y+n(1.5,4)}function i9(){if(v1.clear(),o2.clear(),u1.act){let C=a-u1.t0;C>=u1.dur||l.system||l.acute||N.on||O.on||s.on?H5(C<u1.dur):u1.act.run(C,C/u1.dur,u1.st)}}function o9(){if(!D||u1.act||Y<u1.nextAt||l.system||l.acute||N.on||O.on||s.on||T.phase||f.asleep||P1.on||t9.has(G))return;let C=[],H=0;for(let[o,x]of Object.entries(o7)){if((u1.cool[o]||0)>Y)continue;let S=x.w();S>0&&(C.push([o,S]),H+=S)}if(!H){u1.nextAt=Y+2;return}let e=Math.random()*H;for(let[o,x]of C)if(e-=x,e<=0){O3(o);return}}let P1={on:!1,t0:0,nodT:0,forced:!1,jerked:!1};function a9(){if(!D||f.asleep||l.system||T.phase||s.on||N.on||O.on||D2)return;let C=(G1()?.5:1)*(f.E<.2?.6:1),H=Y-C5;!P1.on&&H>45*C&&!l.acute&&(P1.on=!0,P1.t0=Y,P1.nodT=Y+1,H5(!0)),P1.on&&(H>60*C||P1.forced&&Y-P1.t0>6)&&n9(!0)}function A9(){if(!P1.on)return;let C=Y-P1.t0,H=.25+.15*(.5+.5*Math.sin(a*1.3));H2.add({"eyeL.top":H,"eyeR.top":H});let e=(Y-P1.t0)%4/4;e<.4&&H2.add({"body.sy":-.03*m(e/.4),"body.y":1.5*m(e/.4)}),e>.4&&e<.45&&H2.add({"eyeL.top":-H,"eyeR.top":-H}),C>0&&e>.4&&!P1.jerked&&(P1.jerked=!0,A.impulse({y:-40*u})),e<.4&&(P1.jerked=!1)}function A7(){P1.on=!1,P1.forced=!1,H2.clear()}let n7=0;function n9(C){P1.on=!1,P1.forced=!1,H2.clear(),d5("fallAsleep",3.2,H=>{let e=[.2,.35,.25,.45,.4,.5],o=Math.min(e.length-1,Math.floor(H/.45));if(W1.add({"eyeL.top":e[o],"eyeR.top":e[o],"body.sy":-.03*m(H/3)}),H>1&&H<2.4){let x=H-1,S=x<.6?i(6,15,m(x/.6)):i(15,8,m((x-.6)/.8));W1.set(p1(S,88))}},(H,e)=>{e||(f.asleep=!0,n7=Y+n(100,160)*(G1()?2.5:1),C&&I1("ignore",.5))}),k("Normal",3.2)}function V5(C,H){let e=f.asleep;if(f.asleep=!1,C5=Y,e&&!H&&I1("wake",C==="startle"?.8:.4),C==="startle"){c2("Alert",{startle:!0}),k("Alert",1.1),d1({A:.3});return}k("Smiling",2.6),d5("wakeGentle",2.6,o=>{if(o<.6)W1.add({"body.sy":.08*m(o/.6)*u});else if(o<1.4){let x=(o-.6)/.8;W1.set(p1(i(6,14,g(x)),88),g(x))}W1.add({"eyeL.bot":.3*(1-m((o-2)/.6)),"eyeR.bot":.3*(1-m((o-2)/.6))})})}let s={on:!1,kind:"line",vis:[],t0:0,total:0,text:"",shownChars:-1,idx:-1,done:null,short:!1,nextBob:0,nextLook:0,f:1};function d7(C){let H=C.toLowerCase(),e=[],o=E1==="fr"?{eau:[.8,.75,1.25],ou:[.4,.65,1.25],au:[.8,.75,1.25],eu:[.6,1,1.25],on:[.8,.75,1.25],an:[.55,.95,1.25],en:[.55,.95,1.25],in:[.55,.95,1.25],ch:[.35,.95,.7],oi:[.75,.85,1.25],ai:[.6,1,1.25]}:{oo:[.4,.65,1.25],ee:[.35,1.15,1.25],ea:[.4,1.1,1.25],ou:[.6,.8,1.25],ow:[.7,.75,1.25],oa:[.75,.75,1.25],ai:[.6,1,1.25],ay:[.6,1,1.25],th:[.25,1,.7],sh:[.35,.85,.7],ch:[.35,.9,.7],ng:[.3,1,.7]},x=0;for(;x<H.length;){let F=H[x],c1=1,L1=.25,h1=1,n1=80*.7,Y1=null,Z2=H.substr(x,3),A2=H.substr(x,2);o[Z2]?(c1=3,[L1,h1]=o[Z2],n1=80*o[Z2][2]):o[A2]?(c1=2,[L1,h1]=o[A2],n1=80*o[A2][2]):"aàâ".includes(F)?(L1=1,n1=100):"eéèêë".includes(F)?(L1=.6,n1=100):"iîïy".includes(F)?(L1=.35,h1=1.15,n1=100):"oôö".includes(F)?(L1=.8,h1=.75,n1=100):"uùûü".includes(F)?(L1=.4,h1=.65,n1=100):"mbp".includes(F)?(L1=0,h1=.95,n1=60):"fv".includes(F)?L1=.15:"lndtsz".includes(F)?L1=.3:"kgrjcqx".includes(F)?(L1=.35,h1=.95):F===" "||F===`
`?(L1=.1,n1=40):",;:".includes(F)?(L1=0,n1=180):".!?…".includes(F)?(L1=0,n1=350,Y1=F):/[0-9]/.test(F)?(L1=.5,n1=90):/[a-zà-ÿ]/.test(F)||(L1=.1,n1=30),L1=t(L1*n(.9,1.1)),e.push({len:c1,open:L1,wf:h1,d:n1/1e3,kind:Y1}),x+=c1}let S=0,B=0;for(let F of e)F.t=S,F.ci=B,S+=F.d,B+=F.len;return e}let p7={Happy:1,Grinning:1,Loving:1,Grateful:.9,Winking:.9,WinkingSmile:.8,Smiling:.8,UwU:.7,Cheeky:.6,Silly:.6,Devious:.6,Normal:.5,Sweating:.3,Loading:.3,Initializing:.3,Alert:0,Focusing:0,Dead:0,Sleeping:0,WTF:-.1,DeadAss:-.1,Problem:-.5,NoInternet:-.6,Pleading:-.7,Scared:-.7,Angry:-.8,Hurt:-.8,Sad:-.9},V0=C=>String(C||"").replace(/\s+/g," ").trim();function l7(C){t1.hidden=!1,t1.classList.remove("out"),t1.classList.toggle("short",C)}function b3(C,H){let e=p7[G]!=null?p7[G]:.4,o=1+C*7,x=14*H*(1+.12*e),S=86-1.5*e;x1.set(j({tY:S,tR:x,tA:x,tH:-o+3.5*e,tD:0,bY:S,bR:x,bA:x,bH:o+3.5*e,bD:0,tongue:0,s:1,rot:0,talk:0}))}function R1(C,H){if(H=H||{},C=V0(C),!C||s.on&&s.kind==="stream"&&H.short)return;let e=d7(C),o=e.length?e[e.length-1].t+e[e.length-1].d:.5,x=Math.max(.8,Math.min(5,C.length/38)),S=Math.min(1,x/o);if(S<1)for(let B of e)B.t*=S,B.d*=S;Object.assign(s,{on:!0,kind:"line",f:S,vis:e,t0:a,total:e.length?e[e.length-1].t+e[e.length-1].d:.5,text:C,shownChars:-1,idx:-1,done:H.done||null,short:!!H.short,nextBob:a+.3,nextLook:a}),l7(s.short),e2.textContent="",M.srSpeech.textContent=C,A.spring("mouth",{k:700,c:40}),A.setState("mouth.tongue",Math.min(P2("mouth.tongue",0),.2),0),V1("bubble"),H5(!0)}function j5(){s.on=!1,x1.clear(),s.playback&&(s.playback=null),e2.textContent=s.text,s.text?Y5():t1.hidden=!0,A.spring("mouth",null),A.blink({close:80,hold:40,open:140});let C=s.short?1.4:Math.min(9,2.5+.06*s.text.length);if(s.text&&z(C,()=>{t1.classList.add("out"),z(.22,()=>{s.on||(t1.hidden=!0)},"bubble")},"bubble"),s.done){let H=s.done;s.done=null,H()}}function d9(){let C=a-s.t0;if(C>=s.total){j5();return}let H=s.idx<0?0:s.idx;for(;H+1<s.vis.length&&s.vis[H+1].t<=C;)H++;let e=s.vis[H];H!==s.idx&&(s.idx=H,m7(e));let o=e.ci+e.len;o!==s.shownChars&&(s.shownChars=o,e2.textContent=s.text.slice(0,o),Y5());let x=e.open,S=e.wf;if(s.f<.8){let B=s7(H,C);x=B[0],S=B[1]}b3(x,S)}function m7(C){C.kind?(A.blink({close:70,hold:40,open:120}),C.kind==="!"&&A.impulse({y:-60*u}),C.kind==="?"&&A.impulse({rot:30*u})):a>s.nextBob&&C.open>.5&&(A.impulse({rot:(Math.random()<.5?-1:1)*14*u}),s.nextBob=a+n(.25,.45))}function s7(C,H){let e=s.vis[C],o=0,x=0,S=0;for(let F=Math.max(0,C-2);F<=Math.min(s.vis.length-1,C+2);F++)o=Math.max(o,s.vis[F].open),x+=s.vis[F].wf,S++;return[!!e.kind||e.open===0&&e.d>.05?0:o*(.5+.5*Math.abs(Math.sin(H*Math.PI*7.5))),S?x/S:1]}let p9=C=>{let H=s.vis,e=0,o=H.length-1;for(;e<o;){let x=e+o+1>>1;H[x].ci<=C?e=x:o=x-1}return e};function l9(C){V1("bubble"),Object.assign(s,{on:!0,kind:"stream",text:"",vis:[],rev:0,budget:0,pauseUntil:0,mouth:0,mbudget:0,mpauseUntil:0,replay:!1,final:!1,mode:C.expectAudio?"silent":"flap",playback:null,holdUntil:a+(C.hold||0),rate:38,shownChars:-1,idx:-1,done:null,short:!1,nextBob:a+.3,nextLook:a,waitAudioUntil:1/0,lastLevel:0,quietSince:a,blinked:!0,t0:a}),e2.textContent="",t1.hidden=!0,A.spring("mouth",{k:700,c:40}),A.setState("mouth.tongue",Math.min(P2("mouth.tongue",0),.2),0),H5(!0)}function k3(C){s.text=C,s.vis=d7(C),s.rev>C.length&&(s.rev=C.length)}function m9(C){if(!C)return;let H=s.text+C;s.text||(H=H.replace(/^\s+/,"")),k3(H.replace(/\s+/g," "))}function s9(C,H){let e=V0(C),o=V0(s.text);if(e&&e!==o)if(!o)k3(e);else if(e.startsWith(o))k3(e);else{let x=0;for(;x<Math.min(e.length,o.length)&&e[x]===o[x];)x++;s.rev=Math.min(s.rev,x),k3(e)}s.final=!0,s.done=H||null,s.mode==="silent"&&(s.waitAudioUntil=a+8),M.srSpeech.textContent=s.text}function v9(){let C=s.text;if(a>=s.holdUntil&&a>=s.pauseUntil&&s.rev<C.length)for(s.budget+=M2*s.rate;s.budget>=1&&s.rev<C.length;){s.budget-=1;let H=C[s.rev];s.rev++;let e=C[s.rev];if(".!?…".includes(H)&&(e===void 0||e===" ")){s.pauseUntil=a+.22,s.budget=0;break}if(",;:".includes(H)){s.pauseUntil=a+.08,s.budget=0;break}}if(s.rev!==s.shownChars&&(s.shownChars=s.rev,s.rev>0&&(t1.hidden&&l7(!1),e2.textContent=C.slice(0,s.rev),Y5())),s.mode==="flap"){let H=s.replay?s.mouth:s.rev;if(s.replay&&a>=s.mpauseUntil&&s.mouth<C.length)for(s.mbudget+=M2*38;s.mbudget>=1&&s.mouth<C.length;){s.mbudget-=1;let o=C[s.mouth++];if(".!?…".includes(o)){s.mpauseUntil=a+.22,s.mbudget=0;break}}let e=H>=C.length||a<s.holdUntil;if(C.length&&!e){let o=p9(Math.max(0,H-1));o!==s.idx&&(s.idx=o,m7(s.vis[o]));let x=a<(s.replay?s.mpauseUntil:s.pauseUntil),[S,B]=s7(o,a-s.t0);b3(x?0:S,B)}else x1.clear()}else if(s.mode==="audio"){let H=s.playback,e=H?H.level():0;e>.55&&s.lastLevel<=.55&&a>s.nextBob&&(A.impulse({rot:(Math.random()<.5?-1:1)*14*u}),s.nextBob=a+n(.25,.45)),e>.08?(s.quietSince=a,s.blinked=!1):!s.blinked&&a-s.quietSince>.4&&(s.blinked=!0,A.blink({close:70,hold:40,open:120})),s.lastLevel=e,b3(e,.9+.2*e)}else x1.clear();if(s.final&&s.rev>=C.length&&s.mode!=="audio"&&(!C||s.mode==="flap"&&(!s.replay||s.mouth>=C.length)&&a>=s.pauseUntil||s.mode==="silent"&&a>s.waitAudioUntil))return j5()}function x9(){x1.clear(),s.on&&(s.kind==="line"?d9():v9(),s.on&&a>=s.nextLook&&!N.on&&(s.nextLook=a+n(1,2),c.inside||A.lookAt(60+n(-8,8),140+n(-6,6))))}function Y5(){if(t1.hidden)return;let C=t1.offsetWidth,H=t1.offsetHeight,e=A.houseToWorld(88,12),o=A.houseToWorld(32,12),[x,S]=t5(e[0],e[1]),B=!1;if(x+6+C>M1.pxW-10){let F=t5(o[0],o[1]);F[0]-6-C>10?(x=F[0]-6-C,S=F[1],B=!0):x=r(M1.pxW/2-C/2,10,M1.pxW-C-10)}else x=x+6;S=r(S-H-8,8,M1.pxH-H-8),t1.classList.toggle("flip",B),t1.style.transform="translate("+x.toFixed(1)+"px,"+S.toFixed(1)+"px)"}let T={phase:null,t0:0,voice:!1,level:0,nod:0,source:"panel",typingAt:-9,offline:!1,satState:"idle"},v7=!1;function w3(C=0){V1("conv");let H=()=>{T.phase=null,T.voice=!1,q.rings=0,h5=1,l.system&&l.system.tag!=="offline"&&(l.system=T.offline?{id:"NoInternet",tag:"offline"}:null),A.lookAt(null)};C>0?z(C,H,"conv"):H()}function u9(){t1.hidden||(V1("bubble"),t1.classList.add("out"),z(.22,()=>{s.on||(t1.hidden=!0)},"bubble"))}function L0(){s.on&&(s.on=!1,s.done=null,x1.clear(),A.spring("mouth",null)),u9()}function x7(C){V1("conv"),L0(),B1("sudden"),H5(!0),q1.on=!1,T.phase="listen",T.t0=a,T.voice=!1,T.level=0,T.source=C.source||"panel",C.wake?(l.system={id:"Alert",tag:"pipe"},A.impulse({y:-90*u}),a5(),z(.6,()=>{T.phase==="listen"&&(l.system={id:"Focusing",tag:"listen"})},"conv")):l.system={id:"Focusing",tag:"listen"}}function e0(){T.phase!=="wait"&&(q.rings=0,h5=1,T.phase="wait",T.t0=a,H5(!0))}function c9(){V1("conv"),q1.fired.clear(),q1.on=!1,L0(),B1("sudden"),A.squash(.03,150),A.blink(),d1({V:.05,A:.1,F:.01,C:.15}),T.phase=null,e0()}function M0(C,H,e){V1("conv"),T.phase="talk",T.voice=!1,q.rings=0,l.system={id:C&&I.includes(C)?C:"Normal",tag:"chat"},l9({expectAudio:H,hold:e})}let Z9={Loving:.2,Grateful:.2,Happy:.15,Grinning:.15,Smiling:.1,Sad:-.2,Angry:-.15,Hurt:-.2,Scared:-.1};function r0(C){let H=I.includes(C.emotion)?C.emotion:"Normal";s.on&&s.kind==="stream"&&T.phase==="talk"?l.system={id:H,tag:"chat"}:M0(H,!!C.expectAudio,C.expectAudio?1.2:.25),d1({V:Z9[H]||0}),(H==="Loving"||H==="Grateful")&&d1({F:.03,I:-.2}),C.success&&e1("sparkle",{count:6,x:60,y:30,spread:110,life:.6,color:A.bodyColor},!0),s9(C.text,()=>{C.done?.(),w3(4)})}function S9(C){(!s.on||s.kind!=="stream")&&(M0(l.system?.id,!0,0),s.final=!0),s.mode="audio",s.playback=C,s.holdUntil=0;let H=s.text.length-s.rev,e=C.duration();s.rate=H>0?Number.isFinite(e)&&e>.6?r(H/(e-.3),10,38):16:38}function h9(){!s.on||s.kind!=="stream"||(s.playback=null,s.rev=s.text.length,s.final=!0,j5())}function f9(){!s.on||s.kind!=="stream"||(s.playback=null,s.mode="flap",s.holdUntil=0,s.rate=38,s.rev>0&&(s.replay=!0,s.mouth=0,s.mbudget=0))}function g9(C,H,e){s.on&&s.kind==="stream"&&T.phase==="talk"?H&&I.includes(H)&&(l.system={id:H,tag:"chat"}):M0(H,!!e,0),m9(C)}function y9(C){L0(),V1("conv"),T.phase="error",q.rings=0,l.system={id:C.offline?"NoInternet":"Problem",tag:"pipe"},C.offline&&void 0,z(.2,()=>R1(C.text||(C.offline?a1("oopsNet"):a1("notUnderstood")),{short:!0}),"conv-say"),w3(C.offline?3:2.2)}function O9(C=0){s.on&&s.kind==="stream"||w3(C)}function b9(C){C!==T.offline&&(T.offline=C,C?T.phase||(l.system={id:"NoInternet",tag:"offline"}):(l.system&&l.system.tag==="offline"&&(l.system=null),k("Grinning",1.6),k9()))}function k9(){let C=0,H=()=>{A.accessory("wifi",C%2?null:1),C++,C<6?z(.18,H):A.accessory("wifi",null)};H()}function D6(){}let b5=null;function t0(){V1("sat-pending");let C=b5;b5=null,C&&r0({text:C.text,emotion:C.emotion,expectAudio:!1})}function w9(C){let H=T.satState;T.satState=C,C!==H&&(C==="listening"?(b5=null,x7({wake:!0,source:"satellite"})):C==="processing"?(T.phase!=="talk"&&e0(),T.source="satellite"):C==="responding"?(T.source="satellite",b5?t0():s.on&&s.kind==="stream"||(T.phase="murmur",T.t0=a,l.system={id:l.system&&l.system.tag==="chat"?l.system.id:"Normal",tag:"chat"})):C==="idle"&&(b5?t0():(T.phase==="murmur"||T.phase==="listen"||T.phase==="wait")&&w3(T.phase==="murmur"?.6:0)))}function P9(C,H,e){if(I.includes(C)){if(e&&(T.phase==="murmur"||T.satState==="responding")){r0({text:H||"",emotion:C,expectAudio:!1});return}if(e&&(T.phase==="wait"||T.phase==="listen"||T.satState==="processing"||T.satState==="listening")){b5={emotion:C,text:H||""},l.system={id:C,tag:"chat"},T.phase="hold",V1("sat-pending"),z(2.5,t0,"sat-pending");return}T.phase||(B1("sudden"),k(C,3),H&&z(.25,()=>R1(H)))}}function B9(){u2.clear();let C=v7&&a-T.typingAt<2&&!!M.input()?.value;if(T.phase==="listen"){q.rings=1,h5=T.voice?1.9:1;let H=T.level;u2.set({"acc.bubbles":0}).add({"eyeL.s":.06+.06*H,"eyeR.s":.06+.06*H,"body.sy":.02+.03*H,"eyeL.y":-1,"eyeR.y":-1}),u2.set(Object.assign(P(86,10),{"mouth.s":1})),(!T.nod||a>T.nod)&&(T.nod=a+(T.voice?n(.45,.8):n(.8,1.4)),A.impulse({rot:12*u,y:20*u})),T.level*=.9;return}if(q.rings=0,T.phase==="wait"){let H=a-T.t0,e="Focusing";H<.6?(u2.set({"acc.bubbles":0}),A.lookAt(60,240)):H<2.5?e="Loading":H<8?e=Math.floor((H-2.5)/3)%2?"Focusing":"Loading":e="Sweating",l.system={id:e,tag:"chat"},H>.6&&H<.7&&A.lookAt(null);return}if(T.phase==="murmur"){let H=a-T.t0,e=.25+.5*Math.abs(Math.sin(H*Math.PI*3.1))*(.6+.4*Math.sin(H*1.7));s.on||b3(e,1);return}if(!T.phase)if(C||q1.on&&a<q1.until){q1.on&&a<q1.until?(l.system={id:q1.id,tag:"typing"},q1.fn&&q1.fn(a-q1.t0)):(q1.on=!1,l.system={id:"Focusing",tag:"typing"},u2.set({"acc.bubbles":0}).add({"eyeL.s":.05,"eyeR.s":.05}));let H=_9();if(H){let[e,o]=y2(H[0],H[1]);A.lookAt(e,o,{lean:.25})}B1("gentle")}else l.system&&l.system.tag==="typing"&&(l.system=T.offline?{id:"NoInternet",tag:"offline"}:null,A.lookAt(null),M.input()?.value&&k("Normal",1.2))}let q1={on:!1,id:null,t0:0,until:0,fn:null,fired:new Set},u7=C=>{let H=C<.9?i(6,16,m(C/.9)):C<1.3?16:i(16,6,m((C-1.3)/.6)),e=C<1.9?m(C/.3):1-m((C-1.9)/.3);u2.set(p1(H,88),e),u2.add({"eyeL.top":.3*e,"eyeR.top":.3*e,"eyeL.bot":.3*e,"eyeR.bot":.3*e,"body.sy":.05*e*u})},T9=[["merci",/\b(thanks|thank you|thx)\b/i,"Grateful",1.8,()=>e1("heart",{x:60,y:-4})],["love",/(love you|luv you|adore you|\bxoxo\b)/i,"Loving",2.2,()=>e1("heart",{count:3,x:60,y:0,spread:70})],["vexe",/\b(stupid|dumb|idiot|mean|ugly|useless)\b/i,"Sad",1.8,()=>d1({V:-.1,I:.05})],["dodo",/\b(sleep|sleepy|bedtime|tired|nap)\b/i,"Normal",2.2,null,u7],["lumiere",/\b(light|lights|lamp|turn on)\b/i,"Grinning",2.4,()=>{S5=a+3.2}],["salut",/\b(hello|hi|hey)\b/i,"Happy",1.4,()=>n5(.6)],["wifi",/(wi-?fi|internet|network)/i,"NoInternet",1.6,null]],R9=[["merci",/\bmerci\b/i,"Grateful",1.8,()=>e1("heart",{x:60,y:-4})],["love",/(t['’]aime|t['’]adore|je t['’]kiffe|bisou)/i,"Loving",2.2,()=>e1("heart",{count:3,x:60,y:0,spread:70})],["vexe",/\b(nul|nulle|bête|bete|idiot|idiote|méchant|méchante|moche)\b/i,"Sad",1.8,()=>d1({V:-.1,I:.05})],["dodo",/\b(dodo|dormir|sommeil|fatigu[ée]e?|sieste)\b/i,"Normal",2.2,null,u7],["lumiere",/(lumi[eè]re|lampe|allume|éclaire|eclaire)/i,"Grinning",2.4,()=>{S5=a+3.2}],["salut",/\b(bonjour|salut|coucou|hello)\b/i,"Happy",1.4,()=>n5(.6)],["wifi",/(wi-?fi|internet|réseau)/i,"NoInternet",1.6,null]];function F9(C){for(let[H,e,o,x,S,B]of E1==="fr"?R9:T9)if(!(q1.fired.has(H)||!e.test(C))){q1.fired.add(H),Object.assign(q1,{on:!0,id:o,t0:a,until:a+x,fn:B||null}),S&&S();return}}let X5=null;function _9(){let C=M.input();if(!C)return null;X5||(X5=document.createElement("canvas").getContext("2d"));let H=C.getBoundingClientRect(),e=getComputedStyle(C);if(!X5)return[H.left+H.width/2,H.top+H.height/2];X5.font=e.fontWeight+" "+e.fontSize+" "+e.fontFamily;let o=C.selectionStart==null?C.value.length:C.selectionStart,x=X5.measureText(C.value.slice(0,o)).width,S=H.left+parseFloat(e.paddingLeft)+x-C.scrollLeft;return[r(S,H.left,H.right),H.top+H.height/2]}function E9(C){l.system={id:"Initializing",tag:"boot"};let H=A.layer("boot",{priority:36});d5("boot",2.5,e=>{if(q.scan=e<1.6?1:0,e>=.3&&e<1.6){let o=e<.75?.1:1;H.set({"eyeL.s":1,"eyeR.s":1,"eyeL.open":o,"eyeR.open":o}),e>.95&&e<1.15?A.lookAt(-200,60):e>1.15&&e<1.35?A.lookAt(320,60):A.lookAt(null),e>1.4&&!H.blinked&&(H.blinked=!0,A.blink({double:!0}))}e>=1.6&&l.system&&l.system.id==="Initializing"&&(H.clear(),l.system={id:"Normal",tag:"boot"}),e>2.2&&!H.hopped&&(H.hopped=!0,n5(.6))},()=>{H.clear(),q.scan=0,l.system&&l.system.tag==="boot"&&(l.system=null),A.lookAt(null),C&&C()})}function c7(C,H){let e=a,o=c.samples[c.samples.length-1];if(o){let x=Math.max(.001,e-o.t),S=(C-o.x)/x,B=(H-o.y)/x;c.vx=i(c.vx,S,.5),c.vy=i(c.vy,B,.5),c.speed=Math.hypot(c.vx,c.vy)}for(c.samples.push({x:C,y:H,t:e});c.samples.length>60||c.samples.length&&e-c.samples[0].t>1.6;)c.samples.shift()}function Z7(C){c.type=C.pointerType||"mouse",c.cx=C.clientX,c.cy=C.clientY;let[H,e]=y2(C.clientX,C.clientY);c.wx=H,c.wy=e,c.lean=Q5(C.clientX,C.clientY),c7(C.clientX,C.clientY),c.lastMove=a,c.mvx=c.vx,c.mvy=c.vy,c.inside||D9(),c.inside=!0,c.leftAt=null;let o=Z3(H,e,6);if(c.hoverHouse=o.hit,R.classList.toggle("over",o.hit&&c.type==="mouse"),c.press)return N9(C,o);if(c.type!=="mouse")return;let x=Math.hypot(H-(60+(A.get("body.x")||0)),e-(66+(A.get("body.y")||0)));c.speed>1500&&x<80&&!N.on&&!O.on&&a-(c.flybyAt||-9)>3&&(c.flybyAt=a,k("Alert",.5),A.impulse({y:-80*u}),B1("sudden"),d1({A:.15})),o.hit&&o.region==="roof"&&c.speed>60&&c.speed<700&&(O5(1.5,60)>=3||q0(1.2)>250)?S3(H):o.hit&&(o.region==="face"||o.region==="eye")&&O5(.7,400)>=5&&h3(H),o.hit&&!c.wasOver&&d1({V:.05,A:.15,C:.2}),c.wasOver=o.hit,a-(c.lastInputPing||0)>.3&&(c.lastInputPing=a,B1(o.hit?"hover":null))}function D9(){l.miss?(l.miss=!1,k("Alert",.3),z(.3,()=>k("Happy",1.2))):c.leftAt!=null&&a-c.leftAt>3&&(k("Alert",.3),z(.3,()=>k("Happy",1)))}function i0(){if(c.press||N.on)return;if(c.inside=!1,c.leftAt=a,c.hoverHouse=!1,c.type!=="mouse"){A.lookAt(null);return}let C=c.wx,H=c.wy;z(.4,()=>{c.inside||A.lookAt(C+(C-60)*2,H+(H-60))},"leave"),z(1.2,()=>{c.inside||(A.lookAt(null),D&&!l.system&&O3("lookAround"))},"leave")}let J5={dir:1,next:0};function I9(){c.inside||c.leftAt==null||c.type!=="mouse"||!D||l.system||l.acute||f.asleep||N.on||O.on||a-c.leftAt<3||l.miss||(a>J5.next&&(J5.dir=-J5.dir,J5.next=a+n(1.5,2.5)),H2.add({"body.rot":6*J5.dir*u}))}function S7(C){if(C.button!=null&&C.button>0)return;k1();let[H,e]=y2(C.clientX,C.clientY);c.wx=H,c.wy=e,c.type=C.pointerType||"mouse",c.samples.length=0,c7(C.clientX,C.clientY);let o=Z3(H,e,c.type==="touch"?8:3);if(!o.hit){A.lookAt(H,e),B1("sudden"),d1({C:.15}),V1("look"),z(1.2,()=>{c.press||A.lookAt(null)},"look");return}C.preventDefault();try{R.setPointerCapture(C.pointerId)}catch{}c.press={id:C.pointerId,t0:a,cx0:C.clientX,cy0:C.clientY,wx0:H,wy0:e,region:o.region,info:o,mode:null,moved:0},z(.55,()=>{let x=c.press;x&&!x.mode&&x.moved<6&&(x.mode="hug",K4())},"press")}function N9(C,H){let e=c.press,o=Math.hypot(C.clientX-e.cx0,C.clientY-e.cy0);if(e.moved=Math.max(e.moved,o),e.mode==="drag"){f3(c.wx,c.wy,c.vx,c.vy);return}if(e.mode==="pet"){(H.hit||Math.abs(C.clientY-e.cy0)<40)&&S3(c.wx),Math.abs(C.clientY-e.cy0)>60&&(e.mode="drag",J3(e.wx0,e.wy0),f3(c.wx,c.wy,c.vx,c.vy));return}if(e.mode==="tickle"){h3(c.wx);return}if(e.mode==="hug")return;let x=c.type==="touch"?14:6;if(c.type!=="mouse"){let S=C.clientX-e.cx0,B=C.clientY-e.cy0,F=a-e.t0,c1=q0(a-e.t0+.05),L1=o>60&&c1<o*1.15;if(e.region==="roof"&&F<.2&&Math.abs(S)>6&&Math.abs(S)>Math.abs(B)*1.3){e.mode="pet",V1("press"),S3(c.wx);return}if(e.region==="roof"&&!(F>=.2||L1||Math.abs(B)>28))return;if(e.region!=="roof"&&(e.region==="face"||e.region==="eye")&&O5(.7,300)>=3&&o<40){e.mode="tickle",V1("press"),h3(c.wx);return}o>x&&!(o<24&&O5(.5,200)>=2)&&(e.mode="drag",V1("press"),J3(e.wx0,e.wy0),f3(c.wx,c.wy,c.vx,c.vy));return}if(e.region==="roof"&&O5(1.5,40)>=2&&Math.abs(C.clientY-e.cy0)<30){e.mode="pet",V1("press"),S3(c.wx);return}if((e.region==="face"||e.region==="eye")&&O5(.7,300)>=4&&o<40){e.mode="tickle",V1("press"),h3(c.wx);return}o>(e.region==="roof"?Math.max(x,22):x)&&(e.mode="drag",V1("press"),J3(e.wx0,e.wy0),f3(c.wx,c.wy,c.vx,c.vy))}let C3={t:-9,x:0,y:0};function h7(C){let H=c.press;if(H){c.press=null,V1("press");try{R.releasePointerCapture(C.pointerId)}catch{}if(H.mode==="drag"){a-c.lastMove>.12&&(N.vx=0,N.vy=0),H7();return}if(H.mode==="hug"){Y0();return}if(!(H.mode==="pet"||H.mode==="tickle")){if(a-H.t0<.35&&H.moved<8){if(a-C3.t<.3&&Math.hypot(C.clientX-C3.x,C.clientY-C3.y)<30){C3.t=-9,z4();return}C3={t:a,x:C.clientX,y:C.clientY},j0(H.info)}c.type!=="mouse"&&(c.inside=!1,A.lookAt(null))}}}function f7(){if(c.press){let C=c.press;c.press=null,C.mode==="drag"&&H7(),C.mode==="hug"&&Y0()}}let k5={ticks:[]};function g7(C){let[H,e]=y2(C.clientX,C.clientY);if(Z3(H,e,6).hit){for(C.preventDefault(),B1("sudden"),k5.ticks.push(a);k5.ticks.length&&a-k5.ticks[0]>1.5;)k5.ticks.shift();A.lookAt(60+(A.get("body.x")||0),66+(C.deltaY>0?300:-300)),V1("wheel"),z(.5,()=>A.lookAt(null),"wheel"),k5.ticks.length>12&&(k5.ticks.length=0,I1("shake",.3),k("Dead",1.2),e1("star",{count:3,orbit:{cx:60,cy:-6,r:22,ry:.27,speed:4.5},life:1.2},!0))}}function y7(C){if(C.target!==R)return;(C.key===" "||C.key==="Enter")&&(C.preventDefault(),j0({hx:n(30,90),hy:90,region:"face"}));let H={ArrowLeft:[-300,66],ArrowRight:[420,66],ArrowUp:[60,-300],ArrowDown:[60,400]};H[C.key]&&(C.preventDefault(),A.lookAt(H[C.key][0],H[C.key][1]),B1("gentle"),V1("look"),z(1.2,()=>A.lookAt(null),"look"))}function O7(C){let H=C.touches[0];if(!H)return;k1();let[e,o]=y2(H.clientX,H.clientY);Z3(e,o,8).hit&&C.preventDefault()}function b7(C){c.press&&C.preventDefault()}let k7=C=>C.preventDefault(),w7=C=>{C.relatedTarget||i0()},F1={contactSince:null,awayUntil:0,glanceUntil:0,gx:0,gy:0};function w5(C,H,e,o=.15){F1.glanceUntil=a+(e||.4),F1.gx=C,F1.gy=H,F1.lean=o,A.lookAt(C,H,{lean:o})}function W9(){if(a<F1.glanceUntil){A.lookAt(F1.gx,F1.gy,{lean:F1.lean??.15});return}if(F1.glanceUntil&&a-F1.glanceUntil<.05&&(F1.glanceUntil=0,A.lookAt(null)),!(N.on||O.on||u1.act&&["lookAround","glanceAtCursor","peekRoof","daydream","suspicious","peekaboo","lookUp"].includes(u1.name))&&!(T.phase==="wait"||l.system&&l.system.tag==="typing")&&!(f.asleep||G==="Sleeping"||G==="Dead"||G==="Initializing"||G==="Angry"||G==="Sad")){if(O1.name==="sulk"){A.lookAt(-300,80);return}if(!(!c.inside||c.type!=="mouse")){if(a<F1.awayUntil){A.lookAt(null);return}if(F1.contactSince==null&&(F1.contactSince=a),a-F1.contactSince>n(1.5,3)&&c.speed<40&&Math.random()<.3){F1.awayUntil=a+n(.6,1.2),F1.contactSince=null;return}c.speed>40&&(F1.contactSince=a),A.lookAt(c.wx,c.wy,{lean:c.lean})}}}function o0(){return[60+(A.get("body.x")||0)+30,M1.y0+6]}function P5(C=n2){switch(C){case"rainy":case"pouring":case"hail":return"rain";case"lightning":case"lightning-rainy":return"storm";case"snowy":case"snowy-rainy":return"snow";case"sunny":return"sun";case"fog":return"fog";case"windy":case"windy-variant":return"wind";case"cloudy":case"partlycloudy":return"cloud";default:return"clear"}}function P7(C){let H=o0();w5(H[0],H[1],C,.5)}function U9(){let C=P5();g2.V=C==="sun"&&(C1==="day"||C1==="dawn")?.12:0,g2.A=C==="storm"||C==="snow"?.05:0,g2.E=0,A1()}let B7=-9;function $9(C,H,e){let o=C1,x=P5(n2);if(C1=C,n2=H,U9(),J1||(i1.E=t(i1.E)),e||!n0)return;let S=P5(H);o!==C&&C==="dawn"&&f.asleep&&D&&z(n(4,12),()=>{f.asleep&&V5("gentle",!0)}),!(S===x||f.asleep||l.system)&&(S==="rain"?(a0("rain",3.4),z(.9,()=>{Math.random()<.6&&R1(Z(a1("rain")),{short:!0})})):S==="snow"?(a0("snow",2.6),z(.5,()=>{n5(.8),e1("sparkle",{count:3,x:60,y:10,spread:80,life:.6,color:A.bodyColor}),R1(Z(a1("snow")),{short:!0})}),d1({A:.15})):S==="storm"||(S==="sun"&&(C==="day"||C==="dawn")?(a0("sun",2.8),z(.5,()=>{S5=a+1.6,(x==="rain"||x==="storm")&&R1(Z(a1("sun")),{short:!0})})):(S==="fog"||S==="wind")&&(P7(1.2),S==="wind"&&D&&z(.8,()=>O3("shiver")))))}let a2={kind:null,t0:0,dur:0,from:[60,66]};function a0(C,H){Object.assign(a2,{kind:C,t0:a,dur:H,from:[60+(A.get("body.x")||0),66+(A.get("body.y")||0)]})}function G9(){if(p.clear(),!a2.kind)return;let C=a-a2.t0;if(C>=a2.dur||l.system||f.asleep||N.on||O.on){a2.kind=null;return}let H=m(C/.6)*(1-m((C-(a2.dur-.7))/.7)),e=o0();if(a2.kind==="rain"){if(p.add({"eyeL.top":.32*H,"eyeR.top":.32*H,"body.sy":-.02*H,"mouth.s":-.08*H,"mouth.bH":-3*H}),C<a2.dur-.6){let o=m((C-.15)/1.5);w5(i(a2.from[0],e[0],o),i(a2.from[1],e[1],o),.1,.35)}}else a2.kind==="snow"?(p.add({"eyeL.shine":H,"eyeR.shine":H,"eyeL.s":.12*H,"eyeR.s":.12*H,"body.sy":.02*H}),C<1.2&&w5(e[0],e[1],.1,.6)):a2.kind==="sun"&&(p.add({"eyeL.bot":.15*H,"eyeR.bot":.15*H,"mouth.bH":2.5*H,"mouth.s":.06*H}),C<1.1&&w5(e[0],e[1],.1,.5))}function Q9(){if(!(!n0||a-B7<4)){if(B7=a,f.asleep){Math.random()<.3&&(B1("sudden"),R1(Z(a1("thunder")),{short:!0}));return}l.system||(k("Alert",.9),A.impulse({y:-120*u,sy:2*u}),A.layer("thunder",{priority:34}).set({"eyeL.s":1.2,"eyeR.s":1.2}).ttl(450),a5(),d1({A:.15}),z(.9,()=>P7(1)))}}let P3=null;function T7(){if(document.hidden){P3=Date.now(),v2(),E7();return}if(A0&&_7(),P3==null)return;let C=(Date.now()-P3)/1e3;P3=null,C>300&&d1({V:-.1}),!T.phase&&(C<30?k("Alert",.4):C<300?(f.asleep&&V5("gentle"),k("Happy",1.5),z(.3,()=>R1(a1("back"),{short:!0}))):(f.asleep=!0,z(.6,()=>{V5("gentle",!0),I1("greet",.5),z(2.6,()=>{f.F>.6?(k("Pleading",.9),z(.9,()=>{k("Loving",2),R1(a1("missed"),{short:!0})})):k("Happy",1.4)})})),C5=Y)}function z9(){let C=Date.now(),H=$1.lastSeen?(C-$1.lastSeen)/1e3:null;$1.visits=($1.visits||0)+1,$1.firstSeen||($1.firstSeen=C);let e=G1();H==null?(c2("Initializing",{noBlink:!0}),E9(()=>{k("Alert",.8),z(.8,()=>{R1(a1("hello")),k("Happy",2.4)})}),I1("greet",.6)):e&&H>600?(f.asleep=!0,c2("Sleeping",{noBlink:!0}),z(1.2,()=>{V5("gentle",!0),z(2.4,()=>R1(a1("late"),{short:!0}))}),I1("greet",.3)):H<600?(k("Happy",1.2),A.blink()):H<86400?(k("Happy",2),z(.5,()=>R1(K2?q3("reName",K2):a1("re"),{short:!0})),I1("greet",.5)):f.F>.5?(k("Loving",2.4),z(.4,()=>{e1("heart",{count:3,x:60,y:0,spread:70}),R1(a1("missed"),{short:!0})}),I1("greet",.8)):(k("Pleading",1),z(1,()=>{k("Smiling",2),R1(a1("shyHi"),{short:!0})}),I1("greet",.6)),$1.visits%10===0&&z(2.5,()=>{O3("tinyDance");for(let o=0;o<24;o++)A.emit("dot",{x:n(0,120),y:-10,vx:n(-30,30),vy:n(-60,-20),gravity:120,life:1.2,color:o%2?W:A.bodyColor,s0:.9,s1:.6})}),v2()}let B5=0,H3=0,R7=0,A0=!1,n0=!1;function F7(C){B5=requestAnimationFrame(F7),H3||(H3=C);let H=Math.min(.05,(C-H3)/1e3);if(H3=C,M2=H,a+=H,Y+=H,a-c.lastMove>.12)c.speed=0,c.vx=0,c.vy=0;else if(a-c.lastMove>.04){let x=Math.exp(-H/.03);c.vx*=x,c.vy*=x,c.speed*=x}s3(),$5(H),H2.clear(),B9(),U4(),D&&(o9(),a9()),f.asleep&&D&&Y>n7&&!l.system&&!G1()&&V5("gentle",!0),A9(),i9(),G4(H),q4(),j4(H),Y4(H),X4(),H9(),V9(H),M9(H),G9(),W9(),I9(),D&&c.type==="mouse"&&!c.inside&&c.leftAt!=null&&a-c.leftAt>20&&f.F>.5&&!l.miss&&!T.phase&&(l.miss=!0),G1()&&!f.asleep&&!l.system&&!l.acute&&!P1.on&&Y-C5>8&&H2.add({"eyeL.top":.1,"eyeR.top":.1}),q.glow=a<S5?1:0,q.vein=0,q.cloud=0,q.dots=q.dots&&G==="WTF"?q.dots:0,q.scan=O1.name==="boot"?q.scan:0,!T1.on&&!D2&&!U1.on&&!w1.on&&(q.blush=0),U1.on&&(q.blush=1);let e=y5();e!==G&&c2(e,{startle:l.acute&&l.acute.id==="Alert"&&G==="Sleeping"}),U.clear(),Q1.clear(),G!=="Dead"&&G!=="Hurt"&&(q.bandage=O.hard>=2&&a-y1<4?q.bandage:0);let o=i7[G];o&&o(D1),G==="Initializing"&&(q.scan=1),x9(),N4(),C9(),A.step(H),u3(H),(s.on||!t1.hidden)&&Y5(),a-R7>30&&(R7=a,v2())}function _7(){B5||document.hidden||(H3=0,B5=requestAnimationFrame(F7))}function E7(){B5&&cancelAnimationFrame(B5),B5=0}let B3={passive:!0};R.addEventListener("pointerdown",S7),R.addEventListener("keydown",y7),R.addEventListener("wheel",g7,{passive:!1}),R.addEventListener("touchstart",O7,{passive:!1}),R.addEventListener("touchmove",b7,{passive:!1}),R.addEventListener("contextmenu",k7),document.addEventListener("pointermove",Z7,B3),document.addEventListener("pointerup",h7),document.addEventListener("pointercancel",f7),document.documentElement.addEventListener("pointerleave",i0),document.addEventListener("mouseout",w7),document.addEventListener("visibilitychange",T7),window.addEventListener("scroll",k1,B3),window.addEventListener("devicemotion",M7,B3),R.addEventListener("touchend",y3,B3),R.addEventListener("click",y3),z5(),q2(),A.step(.016);let D7={start(){A0=!0,n0=!0,_7()},stop(){A0=!1,E7(),v2()},destroy(){D7.stop(),R.removeEventListener("pointerdown",S7),R.removeEventListener("keydown",y7),R.removeEventListener("wheel",g7),R.removeEventListener("touchstart",O7),R.removeEventListener("touchmove",b7),R.removeEventListener("contextmenu",k7),document.removeEventListener("pointermove",Z7),document.removeEventListener("pointerup",h7),document.removeEventListener("pointercancel",f7),document.documentElement.removeEventListener("pointerleave",i0),document.removeEventListener("mouseout",w7),document.removeEventListener("visibilitychange",T7),window.removeEventListener("scroll",k1),window.removeEventListener("devicemotion",M7),R.removeEventListener("touchend",y3),R.removeEventListener("click",y3)},layout(){q2(),z5(),t1.hidden||Y5()},setLang(C){C!==E1&&(E1=C,f2=h2[C])},setUserName(C){K2=C},setAutonomous(C){D=C,C?C5=Y:(H5(!0),A7(),l.flavor=null,(f.asleep||O1.name==="fallAsleep")&&(d5(null),V5("gentle",!0)))},setMood:v3,setAmbience:$9,lightning:Q9,greet:z9,typing(C,H=!0){T.typingAt=a,C?!T.phase&&H&&F9(C):q1.fired.clear()},inputFocus(C){if(v7=C,C){let H=M.input();if(H){let e=H.getBoundingClientRect(),[o,x]=y2(e.left+40,e.top+e.height/2);w5(o,x,.4)}}},userSent:c9,listen:x7,voice(C){T.voice=C,C&&T.phase==="listen"&&(A.impulse({y:-40*u}),A.blink({close:60,hold:30,open:100})),!C&&T.phase==="listen"&&A.impulse({rot:10*u,y:30*u})},voiceLevel(C){T.level=Math.max(T.level,t((C-.01)*8))},think:e0,streamText:g9,reply:r0,speak:S9,speechEnded:h9,speechFailed:f9,fail:y9,endConversation:O9,setOffline:b9,satellite:w9,react:P9,get expression(){return G},get conversing(){return!!T.phase},get talking(){return s.on},anchorPx(){let C=A.houseToWorld(60,0);return t5(C[0],C[1])},houseToPx(C,H){let e=A.houseToWorld(C,H);return t5(e[0],e[1])},debug(){return{expression:G,source:l.source,phase:T.phase,talk:s.on?{kind:s.kind,mode:s.mode,text:s.text,rev:s.rev}:null,motion:{secure:window.isSecureContext,permission:p5,events:t7,sign:y.vote>=0?1:-1,tilt:+y.tilt.toFixed(2),off:Math.round(y.off),shaking:y.shaking,flying:O.on},mood:{...f},backend:J1,delta:{...d2},weather:n2,dayPhase:C1,weatherFx:a2.kind,glance:a<F1.glanceUntil?{x:F1.gx,y:F1.gy,top:M1.y0,height:M1.h}:null,bodyColor:A.bodyColor,asleep:f.asleep,act:u1.name,reaction:O1.name,auto:D}}};return D7}var B6=`
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
`,T6=M=>{switch(M){case"NotAllowedError":case"SecurityError":return"permission_denied";case"NotFoundError":case"OverconstrainedError":return"not_found";case"NotReadableError":return"in_use";default:return"unknown"}},W5=class M{constructor(V){this._onChunk=V;this._active=!1;this.sampleRate=16e3}static get isSupported(){return window.isSecureContext&&"AudioContext"in window&&"AudioWorkletNode"in window&&!!navigator.mediaDevices?.getUserMedia}get active(){return this._active}async start(){if(!M.isSupported)return"not_supported";if(this._context&&this._stream&&this._node){this._stream.getTracks().forEach(L=>L.enabled=!0),await this._context.resume(),this._active=!0;return}let V;try{let L=new AudioContext;this._context=L,this._stream=await navigator.mediaDevices.getUserMedia({audio:{channelCount:1,echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}}),V=URL.createObjectURL(new Blob([B6],{type:"application/javascript"})),await L.audioWorklet.addModule(V),this._source=L.createMediaStreamSource(this._stream),this._node=new AudioWorkletNode(L,"casita-recorder"),this._node.port.onmessage=r=>{this._active&&this._onChunk(r.data.pcm,r.data.rms)},this._source.connect(this._node),this._active=!0;return}catch(L){return this.close(),T6(L instanceof DOMException?L.name:void 0)}finally{V&&URL.revokeObjectURL(V)}}async stop(){this._active=!1,this._stream?.getTracks().forEach(V=>V.enabled=!1);try{await this._context?.suspend()}catch{}}close(){this._active=!1,this._stream?.getTracks().forEach(V=>V.stop()),this._node&&(this._node.port.onmessage=null),this._source?.disconnect(),this._context?.close().catch(()=>{}),this._stream=void 0,this._source=void 0,this._node=void 0,this._context=void 0}};var z3=M=>M.callWS({type:"assist_pipeline/pipeline/list"}),U0=(M,V,L)=>M.connection.subscribeMessage(V,{...L,type:"assist_pipeline/run"}),m3="conversation.casita",y4=(M,V)=>M.callWS({type:"assist_pipeline/pipeline/create",...V}),O4=(M,V,L)=>M.callWS({type:"assist_pipeline/pipeline/update",pipeline_id:V.id,name:V.name,language:V.language,conversation_engine:V.conversation_engine,conversation_language:V.conversation_language,stt_engine:V.stt_engine??null,stt_language:V.stt_language??null,tts_engine:V.tts_engine??null,tts_language:V.tts_language??null,tts_voice:V.tts_voice??null,wake_word_entity:V.wake_word_entity??null,wake_word_id:V.wake_word_id??null,prefer_local_intents:!!V.prefer_local_intents,...L}),b4=M=>M.callWS({type:"conversation/agent/list"}),k4=(M,V)=>/connection|network|unreachable|disconnect|cloud|timeout|stream-failed|socket|lost/i.test(`${M??""} ${V??""}`),w4=/^\s*\[\s*emotion\s*:\s*([A-Za-z]+)\s*\]\s*/i,g4="[emotion:",Q3=class{constructor(){this._buf="";this._open=!0}newMessage(){this._open=!0,this._buf=""}push(V){if(!this._open)return V;this._buf+=V;let L=this._buf.match(w4);if(L){p3(L[1])&&(this.emotion=L[1]);let n=this._buf.slice(L[0].length);return this._open=!1,this._buf="",n}let r=this._buf.toLowerCase().replace(/\s+/g,"");if(r.length===0||g4.startsWith(r)||r.startsWith(g4)&&!r.includes("]")&&r.length<40)return"";this._open=!1;let i=this._buf;return this._buf="",i}flush(){let V=this._buf;return this._buf="",this._open=!1,V}},P4=M=>{let V=M.match(w4);return V?{text:M.slice(V[0].length),emotion:p3(V[1])?V[1]:void 0}:{text:M}};var $0,B4=()=>{if(!$0)try{$0=new AudioContext}catch{return}return $0},G0=()=>{let M=B4();M&&M.state==="suspended"&&M.resume().catch(()=>{})},T4=(M,V={})=>{let L=new Audio;L.preload="auto";let r,t,i,n=0,Z=!1,m=!1,g=!1,w=B4();if(w)try{i=w.createMediaElementSource(L),r=w.createAnalyser(),r.fftSize=1024,r.smoothingTimeConstant=.1,t=new Float32Array(r.fftSize),i.connect(r),r.connect(w.destination)}catch{r=void 0}let u=I=>{if(!g){g=!0,m=!1;try{L.pause(),L.removeAttribute("src"),L.load()}catch{}try{i?.disconnect(),r?.disconnect()}catch{}I!==void 0?V.onError?.(I):V.onEnd?.()}},W={level(){if(!r||!t||!m)return 0;r.getFloatTimeDomainData(t);let I=0;for(let t1=0;t1<t.length;t1++)I+=t[t1]*t[t1];let R=Math.sqrt(I/t.length);R>.004&&(Z=!0);let Z1=Math.max(0,R-.01)*5,A=Math.min(1,Z1/(.35+Z1)*1.35);return n+=(A-n)*(A>n?.6:.25),n},get heard(){return Z},get playing(){return m},duration(){return L.duration},stop(){u()}};return L.addEventListener("playing",()=>{g||m||(m=!0,V.onStart?.(W))}),L.addEventListener("ended",()=>u()),L.addEventListener("error",()=>u(L.error??new Error("audio error"))),L.src=M,w&&w.state==="suspended"&&w.resume().catch(()=>{}),L.play().catch(I=>u(I??new Error("play rejected"))),W};var R6=900,K3=class{constructor(V,L){this._host=V;this._deps=L;this.listening=!1;this.busy=!1;this.conversationId=null;this._n=0;V.addController(this)}hostDisconnected(){this.cancel(),this._recorder?.close(),this._recorder=void 0}get micSupported(){return W5.isSupported}cancel(){let V=this._run;this._run=void 0,V&&!V.ended&&(V.ended=!0,Promise.resolve(V.unsub?.()).catch(()=>{})),this._stopListening(),this._stopAudio(),this._setBusy(!1)}async sendText(V){V=V.trim();let L=this._deps.hass();if(!V||!L)return;G0(),this.cancel(),this._deps.life()?.userSent();let r=this._deps.pipeline(),t=this._newRun(!1,r);try{t.unsub=await U0(L,i=>this._onEvent(t,i),{start_stage:"intent",end_stage:t.expectAudio?"tts":"intent",input:{text:V},pipeline:r?.id,conversation_id:this.conversationId}),t.ended&&Promise.resolve(t.unsub()).catch(()=>{})}catch(i){this._failRun(t,String(i?.code??"connection"),i?.message)}}toggleMic(){this.listening?this._finishSpeaking():this.startListening()}async startListening(){let V=this._deps.hass();if(!V)return;if(G0(),this.cancel(),!W5.isSupported){this._deps.note(this._deps.strings().micUnsupported);return}let L=this._deps.pipeline(),r=this._newRun(!0,L);this._recorder||(this._recorder=new W5((i,n)=>{this._deps.life()?.voiceLevel(n),this._audioBuffer?this._audioBuffer.push(i):this._sendAudioChunk(i)})),this._handlerId=void 0,this._audioBuffer=[];let t=await this._recorder.start();if(r===this._run){if(t){this._audioBuffer=void 0,this._run=void 0,this._setBusy(!1),this._deps.note(this._micError(t));return}this.listening=!0,this._host.requestUpdate(),this._deps.life()?.listen({wake:!0,source:"panel"});try{r.unsub=await U0(V,i=>this._onEvent(r,i),{start_stage:"stt",end_stage:r.expectAudio?"tts":"intent",input:{sample_rate:this._recorder.sampleRate},pipeline:L?.id,conversation_id:this.conversationId}),r.ended&&Promise.resolve(r.unsub()).catch(()=>{})}catch(i){this._stopListening(),this._failRun(r,String(i?.code??"connection"),i?.message)}}}_micError(V){let L=this._deps.strings();switch(V){case"not_supported":return L.micUnsupported;case"permission_denied":return L.micDenied;case"not_found":return L.micNotFound;case"in_use":return L.micInUse;default:return L.micError}}_finishSpeaking(){this._stopListening()}_stopListening(){if(this._recorder?.stop(),this._handlerId!=null){if(this._audioBuffer)for(let V of this._audioBuffer)this._sendAudioChunk(V);this._sendAudioChunk(new Int16Array),this._handlerId=void 0}this._audioBuffer=void 0,this.listening&&(this.listening=!1,this._host.requestUpdate())}_sendAudioChunk(V){let L=this._deps.hass()?.connection.socket;if(this._handlerId==null||!L)return;L.binaryType="arraybuffer";let r=new Uint8Array(1+V.length*2);r[0]=this._handlerId,r.set(new Uint8Array(V.buffer,V.byteOffset,V.byteLength),1),L.send(r)}onCasitaEmotion(V){let L=this._run;if(!L||!L.intentStarted||L.emotionEvent||L.ended&&!L.waiters.length)return!1;let r=Date.now()-L.intentStarted<12e4,t=L.pipeline?.conversation_engine;return V.agent_id&&t&&V.agent_id!==t||!(V.conversation_id?V.conversation_id===L.convId:!V.device_id&&r)?!1:(L.emotionEvent=V,L.waiters.splice(0).forEach(Z=>Z(V)),!0)}_waitEmotion(V){return V.emotionEvent?Promise.resolve(V.emotionEvent):new Promise(L=>{let r=setTimeout(()=>{V.waiters=V.waiters.filter(i=>i!==t),L(void 0)},R6),t=i=>{clearTimeout(r),L(i)};V.waiters.push(t)})}_newRun(V,L){let r={n:++this._n,voice:V,pipeline:L,expectAudio:!!L?.tts_engine,audioStarted:!1,stripper:new Q3,streamed:!1,replied:!1,ended:!1,continueConversation:!1,waiters:[],intentStarted:0,casita:!1};return r.casita=this._isCasita(r),this._run=r,this._setBusy(!0),r}_isCasita(V){let L=V.pipeline?.conversation_engine,r=this._deps.info();return!!L&&(L===m3||!!r?.entries.some(t=>t.conversation_entity===L))}_onEvent(V,L){if(V!==this._run||V.ended)return;let r=this._deps.life();switch(L.type){case"run-start":this._handlerId=L.data.runner_data?.stt_binary_handler_id??void 0,L.data.tts_output?.url&&(V.ttsUrl=L.data.tts_output.url),L.data.conversation_id&&(V.convId=L.data.conversation_id);break;case"wake_word-end":r?.listen({wake:!0,source:"panel"});break;case"stt-start":if(this._audioBuffer){for(let t of this._audioBuffer)this._sendAudioChunk(t);this._audioBuffer=void 0}break;case"stt-vad-start":r?.voice(!0);break;case"stt-vad-end":r?.voice(!1);break;case"stt-end":{this._handlerId=void 0,this._stopListening();let t=L.data.stt_output?.text?.trim();t&&this._deps.note(`« ${t} »`),r?.think();break}case"intent-start":V.intentStarted=Date.now(),L.data.conversation_id&&(V.convId=L.data.conversation_id),r?.think();break;case"intent-progress":{L.data.tts_start_streaming&&V.ttsUrl&&V.expectAudio&&this._startAudio(V,V.ttsUrl);let t=L.data.chat_log_delta;if(!t)break;if(t.role&&(V.role=t.role,t.role==="assistant"&&V.stripper.newMessage()),V.role==="assistant"&&t.content){let i=V.stripper.push(t.content);i&&(V.streamed=!0,r?.streamText(i,V.casita?V.stripper.emotion:void 0,V.expectAudio))}break}case"intent-end":this._onIntentEnd(V,L.data.intent_output,!!L.data.processed_locally),V.expectAudio||this._endRun(V);break;case"tts-start":break;case"tts-end":!V.audioStarted&&L.data.tts_output?.url&&this._startAudio(V,L.data.tts_output.url);break;case"run-end":this._endRun(V);break;case"error":this._failRun(V,L.data.code,L.data.message);break}}async _onIntentEnd(V,L,r){let t=this._deps.life();V.replied=!0,L?.conversation_id&&(this.conversationId=L.conversation_id,V.convId=V.convId??L.conversation_id),V.continueConversation=!!L?.continue_conversation;let i=L?.response?.speech?.plain?.speech??"",n=V.stripper.flush();n&&!i&&t?.streamText(n,V.casita?V.stripper.emotion:void 0,V.expectAudio);let{text:Z,emotion:m}=P4(i),g="Normal";if(V.casita&&!r){let u=await this._waitEmotion(V);if(V!==this._run)return;g=(u&&p3(u.emotion)?u.emotion:void 0)??V.stripper.emotion??m??"Normal"}let w=V.expectAudio&&!!Z;t?.reply({text:Z,emotion:g,expectAudio:w,success:V.casita&&!r&&L?.response?.response_type==="action_done",done:()=>{(!V.expectAudio||!Z)&&this._maybeContinue(V)}})}_startAudio(V,L){let r=this._deps.hass();if(!r||V.audioStarted)return;V.audioStarted=!0,this._stopAudio();let t=this._deps.life();this._playback=T4(r.hassUrl(L),{onStart:i=>{V!==this._run&&this._run||(t?.speak(i),clearTimeout(this._heardTimer),this._heardTimer=setTimeout(()=>{i.playing&&!i.heard&&t?.speechFailed()},900))},onEnd:()=>{clearTimeout(this._heardTimer),this._playback=void 0,t?.speechEnded(),this._maybeContinue(V)},onError:()=>{clearTimeout(this._heardTimer),this._playback=void 0,t?.speechFailed()}})}_stopAudio(){clearTimeout(this._heardTimer);let V=this._playback;this._playback=void 0,V?.stop()}_maybeContinue(V){!V.continueConversation||V.n!==this._n||(V.continueConversation=!1,V.voice&&setTimeout(()=>this.startListening(),350))}_endRun(V){V.ended||(V.ended=!0,Promise.resolve(V.unsub?.()).catch(()=>{}),V===this._run&&(this._stopListening(),this._setBusy(!1),V.replied||this._deps.life()?.endConversation()))}_failRun(V,L,r){if(V!==this._run)return;let t=this._deps.strings();this._stopListening(),this._stopAudio(),V.ended=!0,Promise.resolve(V.unsub?.()).catch(()=>{}),this._run=void 0,this._setBusy(!1);let i=k4(L,r)||this._deps.hass()?.connected===!1,n=L==="stt-no-text-recognized"?t.notUnderstood:i?t.oopsNet:t.oops;this._deps.life()?.fail({offline:i,text:n})}_setBusy(V){this.busy!==V&&(this.busy=V,this._host.requestUpdate())}};var F4={},_4="casita",E4="casita.settings",R4=M=>{let V={};if(!M||typeof M!="object"||Array.isArray(M))return V;let L=M;return typeof L.pipeline_id=="string"&&L.pipeline_id&&(V.pipeline_id=L.pipeline_id),V},F6=()=>{try{return JSON.parse(localStorage.getItem(E4)||"null")}catch{return null}},_6=M=>{try{localStorage.setItem(E4,JSON.stringify(M))}catch{}},D4=async M=>{try{let V=await M.callWS({type:"frontend/get_user_data",key:_4});if(V&&V.value!=null)return R4(V.value)}catch{}return R4(F6())},Q0=async(M,V)=>{_6(V);try{await M.callWS({type:"frontend/set_user_data",key:_4,value:V})}catch{}};var E6=()=>!!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,I4=M=>{if(!M){let L=new Date().getHours();return L>=6&&L<9?"dawn":L>=9&&L<18?"day":L>=18&&L<21?"dusk":"night"}let V=Number(M.attributes.elevation);return Number.isFinite(V)?V>8?"day":V<-6?"night":M.attributes.rising?"dawn":"dusk":M.state==="above_horizon"?"day":"night"},s1=class extends V2{constructor(){super(...arguments);this.narrow=!1;this._settings={...F4};this._hudOpen=!1;this._settingsOpen=!1;this._expression="Normal";this._phase=I4(void 0);this._condition=null;this._creating=!1;this._fixing=!1;this._lang="en";this._rm=E6();this._conv=new K3(this,{hass:()=>this.hass,life:()=>this._life,pipeline:()=>this._pipeline,info:()=>this._info,strings:()=>h2[this._lang],note:L=>this._showNote(L)});this._throttle=new $3((L,r)=>this._interact(L,r));this._seen={states:{}};this._recentEmotions=[];this._ready=!1;this._faceReady=!1;this._onVisible=()=>{!document.hidden&&this._ready&&this._refreshPipelines()};this._onKeyDown=L=>{L.key==="Escape"&&this._hudOpen&&!this._settingsOpen&&(L.stopPropagation(),this._hudOpen=!1,this._moodBtn?.focus())};this._ambienceInitial=!0}connectedCallback(){super.connectedCallback(),this._ready&&(this._life?.start(),this._subscribeEvents(),this._observe(),this._refreshPipelines(),this._scheduleStorm()),document.addEventListener("visibilitychange",this._onVisible)}disconnectedCallback(){super.disconnectedCallback(),this._life?.stop(),this._resize?.disconnect(),this._resize=void 0,this._unsubscribeEvents(),clearTimeout(this._noteTimer),clearTimeout(this._stormTimer),this._stormTimer=void 0,document.removeEventListener("visibilitychange",this._onVisible)}async _refreshPipelines(){if(this.hass)try{this._pipelines=await z3(this.hass),this._processHass(!1)}catch{}}willUpdate(L){if(L.has("hass")&&this.hass){let r=h4(this.hass.locale?.language??this.hass.language);r!==this._lang&&(this._lang=r,this._life?.setLang(r)),this.toggleAttribute("dark",!!this.hass.themes?.darkMode),this._ready?this._processHass(!1):this._faceReady&&queueMicrotask(()=>this._init())}}async firstUpdated(){await this._faceEl.updateComplete,this._faceReady=!0,this._init()}_init(){let L=this._faceEl?.face;this._ready||!this._faceReady||!L||!this.hass||(this._life=f4({stage:this._room,svg:this._faceEl.svg,face:L,bubble:this._bubble,bubbleText:this._bubbleText,srSpeech:this._srSpeech,input:()=>this._input,onInteract:(r,t)=>this._throttle.report(r,t),onExpression:r=>{this._expression=r}},{lang:this._lang,reducedMotion:this._rm,autonomous:!0,userName:this.hass.user?.name?.split(" ")[0]}),this._ready=!0,this._observe(),this._processHass(!0),this._life.greet(),this._life.start(),this._subscribeEvents(),this._load())}updated(L){let r=L;if(r.has("_condition")||r.has("_phase")){let t=l3(r.has("_condition")?r.get("_condition"):this._condition,r.has("_phase")?r.get("_phase"):this._phase);l3(this._condition,this._phase)==="storm"&&t!=="storm"&&!this._ambienceInitial&&this.strike(),this._scheduleStorm()}this._ambienceInitial=!1,L.has("hass")&&L.get("hass")?.themes?.darkMode!==this.hass?.themes?.darkMode&&requestAnimationFrame(()=>this._life?.layout())}_observe(){this._resize||!this._room||(this._resize=new ResizeObserver(()=>this._life?.layout()),this._resize.observe(this._room))}async _load(){let L=this.hass,[r,t,i]=await Promise.allSettled([u4(L),D4(L),z3(L)]);t.status==="fulfilled"&&(this._settings=t.value),i.status==="fulfilled"&&(this._pipelines=i.value),r.status==="fulfilled"&&(this._info=r.value),this._processHass(!0)}get _casitaPipelines(){return(this._pipelines?.pipelines??[]).filter(L=>L.conversation_engine===m3||!!G3(this._info,L.conversation_engine))}get _defaultPipeline(){let L=this._pipelines;if(!L)return;let r=L.pipelines.find(i=>i.id===L.preferred_pipeline),t=this._casitaPipelines;return(r&&t.includes(r)?r:t[0])??r??L.pipelines[0]}get _pipeline(){return this._pipelines?.pipelines.find(L=>L.id===this._settings.pipeline_id)??this._defaultPipeline}get _empty(){return!!this._pipelines&&!this._casitaPipelines.length}get _entry(){return c4(this._info,this._pipeline?.conversation_engine)}get _casitaPipeline(){let L=this._pipeline?.conversation_engine;return!!L&&(L===m3||!!G3(this._info,L))}get _localWarning(){return this._casitaPipeline&&!!this._pipeline?.prefer_local_intents}get _weatherEntity(){let L=this._entry?.weather_entity;if(L)return L;let r=Object.keys(this.hass?.states??{}).filter(t=>t.startsWith("weather."));return r.length===1?r[0]:void 0}get _satellites(){let L=this.hass,r=this._entry,t=this._pipelines;if(!L?.entities||!r?.conversation_entity||!t)return[];if(this._satCache?.entities!==L.entities){let n=new Map;for(let m of Object.values(L.entities))m.device_id&&m.entity_id.startsWith("select.")&&(m.translation_key==="pipeline"||m.translation_key==="pipeline_n"&&!n.has(m.device_id))&&n.set(m.device_id,m.entity_id);let Z=[];for(let m of Object.values(L.entities)){let g=m.device_id&&m.entity_id.startsWith("assist_satellite.")?n.get(m.device_id):void 0;g&&Z.push([m.entity_id,m.device_id,g])}this._satCache={entities:L.entities,pairs:Z}}let i=t.pipelines.find(n=>n.id===t.preferred_pipeline);return this._satCache.pairs.filter(([,,n])=>{let Z=L.states[n]?.state;return(Z==="preferred"?i:t.pipelines.find(g=>g.name===Z))?.conversation_engine===r.conversation_entity}).map(([n,Z])=>[n,Z])}_changed(L){if(!L)return!1;let r=this.hass.states[L];return this._seen.states[L]===r?!1:(this._seen.states[L]=r,r)}_processHass(L){let r=this._life,t=this.hass;if(!r||!t)return;L&&(this._seen.states={});let i=t.connected!==!1;this._seen.connected!==i&&(this._seen.connected=i,r.setOffline(!i));let n=this._info,Z=this._entry,m=Z?.entry_id!==this._seen.entry;this._seen.entry=Z?.entry_id;let g=!1;if(Z){for(let I of N5){let R=Z.mood_entities[I];R&&this._changed(R)!==!1&&(g=!0)}(g||L||m)&&r.setMood(S4(t,Z))}else(L||m)&&r.setMood(void 0);let w=this._changed("sun.sun"),u=this._weatherEntity,W=this._changed(u);if(L||w!==!1||W!==!1||!u&&this._condition!==null){let I=I4(t.states["sun.sun"]),R=u?t.states[u]?.state??null:null,Z1=R==="unavailable"||R==="unknown"?null:R;(L||I!==this._phase||Z1!==this._condition)&&(L&&(this._ambienceInitial=!0),this._phase=I,this._condition=Z1,r.setAmbience(I,Z1,L))}for(let[I]of this._satellites){let R=this._changed(I);R&&!L&&r.satellite(R.state)}for(let I of n?.entries??[]){let R=this._changed(I.emotion_entity);if(!R)continue;let Z1=R.attributes,A={emotion:R.state,text:Z1.text,conversation_id:Z1.conversation_id,device_id:Z1.device_id,agent_id:Z1.agent_id||I.conversation_entity,source:Z1.source,updated:Z1.updated};L?this._remember(A):this._onEmotion(A)}}_emotionKey(L){return`${L.agent_id??""}|${L.updated??""}|${L.emotion}|${L.conversation_id??""}`}_remember(L){let r=this._emotionKey(L);return this._recentEmotions.includes(r)?!1:(this._recentEmotions.push(r),this._recentEmotions.length>12&&this._recentEmotions.shift(),!0)}_onEmotion(L){if(!L?.emotion||!this._remember(L)||this._conv.onCasitaEmotion(L))return;let r=this._entry;if(L.agent_id&&r&&L.agent_id!==r.conversation_entity)return;let t=!!L.device_id&&this._satellites.some(([,i])=>i===L.device_id);this._life?.react(L.emotion,L.text||void 0,t)}_subscribeEvents(){this._unsubEvents||!this.hass?.user?.is_admin||(this._unsubEvents=this.hass.connection.subscribeEvents(L=>this._onEmotion(L.data),"casita_emotion").catch(()=>{}))}_unsubscribeEvents(){let L=this._unsubEvents;this._unsubEvents=void 0,L?.then(r=>r?.()).catch(()=>{})}_interact(L,r){let t=this._entry;!this.hass||!t||this.hass.callService("casita","interact",{kind:L,intensity:r,entry_id:t.entry_id}).catch(()=>{})}_showNote(L){clearTimeout(this._noteTimer),this._note=L,L&&(this._noteTimer=setTimeout(()=>this._note=void 0,5e3))}_submit(L){L.preventDefault();let r=this._input.value;r.trim()&&(this._input.value="",this._life?.typing(""),!this._pipelines?.pipelines.length&&this._pipelines&&this._showNote(h2[this._lang].noPipeline),this._conv.sendText(r))}_onInput(){this._life?.typing(this._input.value,this._casitaPipeline)}_toggleMic(){this._conv.toggleMic()}_toggleHud(){this._hudOpen=!this._hudOpen}_openSettings(){this._settingsOpen=!0,this._refreshPipelines()}_settingsChanged(L){let r=this._weatherEntity,t=this._satellites.map(([i])=>i);this._settings=L.detail.settings,this._fixError=void 0,Q0(this.hass,this._settings);for(let i of[r,this._weatherEntity,...t])i&&delete this._seen.states[i];this._processHass(!1)}_scheduleStorm(){clearTimeout(this._stormTimer),this._stormTimer=void 0,!(!this.isConnected||l3(this._condition,this._phase)!=="storm")&&(this._stormTimer=setTimeout(()=>{document.hidden||this.strike(),this._scheduleStorm()},6e3+Math.random()*9e3))}strike(){let L=this.renderRoot.querySelector(".flash");L&&(L.classList.remove("on"),L.offsetWidth,L.classList.add("on")),setTimeout(()=>this._life?.lightning(),160)}_openAssistants(L){L.preventDefault(),history.pushState(null,"","/config/voice-assistants/assistants"),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1},bubbles:!0,composed:!0}))}async _createAssistant(){let L=this.hass,r=h2[this._lang],t=this._entry;if(!(!L||this._creating)){if(this._createError=void 0,!t?.conversation_entity){this._createError=r.createFailed;return}this._creating=!0;try{let i=this._pipelines??await z3(L),n=i.pipelines.find(W=>W.id===i.preferred_pipeline),Z=L.config?.language||L.language||"en",m=Z;try{let{agents:W}=await b4(L);W.find(I=>I.id===t.conversation_entity)?.supported_languages==="*"&&(m="*")}catch{}let g=new Set(i.pipelines.map(W=>W.name)),w="Casita";for(let W=2;g.has(w);W++)w=`Casita ${W}`;let u=await y4(L,{name:w,language:n?.language??Z,conversation_engine:t.conversation_entity,conversation_language:m,prefer_local_intents:!1,stt_engine:n?.stt_engine??null,stt_language:n?.stt_language??null,tts_engine:n?.tts_engine??null,tts_language:n?.tts_language??null,tts_voice:n?.tts_voice??null,wake_word_entity:n?.wake_word_entity??null,wake_word_id:n?.wake_word_id??null});this._settings={pipeline_id:u.id},Q0(L,this._settings),this._pipelines={...i,pipelines:[...i.pipelines.filter(W=>W.id!==u.id),u]},this._processHass(!1),this._life?.react("Happy",r.assistantReady),this._refreshPipelines()}catch(i){this._createError=i?.message?`${r.createFailed} ${i.message}`:r.createFailed}finally{this._creating=!1}}}async _fixLocal(){let L=this.hass,r=this._pipeline,t=h2[this._lang];if(!(!L||!r||this._fixing)){this._fixing=!0,this._fixError=void 0;try{await O4(L,r,{prefer_local_intents:!1});let i=this._pipelines;i&&(this._pipelines={...i,pipelines:i.pipelines.map(n=>n.id===r.id?{...n,prefer_local_intents:!1}:n)}),await this._refreshPipelines()}catch(i){this._fixError=i?.message?`${t.fixFailed} ${i.message}`:t.fixFailed}finally{this._fixing=!1}}}_renderLocalWarning(){let L=h2[this._lang],r=!!this.hass?.user?.is_admin;return l1`<div class="empty local" role="note">
      <p class="empty-text" id="local-text">${L.localWarning}</p>
      ${r?l1`<div class="empty-actions">
            <button type="button" class="empty-btn" aria-describedby="local-text" ?disabled=${this._fixing} @click=${this._fixLocal}>
              ${this._fixing?L.fixing:L.fixLocal}
            </button>
          </div>`:l1`<p class="empty-note">${L.askAdminFix}</p>`}
      ${this._fixError?l1`<p class="empty-error" role="alert">${this._fixError}</p>`:f1}
    </div>`}_renderEmpty(){let L=h2[this._lang],r=!!this.hass?.user?.is_admin;return l1`<div class="empty" role="note">
      <p class="empty-text">${L.emptyTalk}</p>
      ${this._pipeline?l1`<p class="empty-note">${L.notCasita}</p>`:f1}
      ${r?l1`<div class="empty-actions">
            <button type="button" class="empty-btn" ?disabled=${this._creating} @click=${this._createAssistant}>
              ${this._creating?L.creating:L.createAssistant}
            </button>
            <a class="empty-link" href="/config/voice-assistants/assistants" @click=${this._openAssistants}>${L.openAssistants}</a>
          </div>`:l1`<p class="empty-note">${L.askAdmin}</p>`}
      ${this._createError?l1`<p class="empty-error" role="alert">${this._createError}</p>`:f1}
    </div>`}render(){let L=h2[this._lang],r=l3(this._condition,this._phase),t=this._conv.listening;return l1`
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
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d=${E0}></path></svg>
        </button>
        <button class="icon-btn" type="button" aria-label=${L.settings} title=${L.settings} aria-haspopup="dialog" @click=${this._openSettings}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d=${_0}></path></svg>
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
        ${this._hudOpen?l1`<casita-mood-hud
              id="hud"
              class="hud"
              .hass=${this.hass}
              .entry=${this._entry}
              .strings=${L}
              .heading=${(this._info?.entries.length??0)>1&&this._entry?Z4(this._entry,this._info.entries,this.hass):""}
              ?narrow=${this.narrow}
            ></casita-mood-hud>`:f1}
        <p id="room-help" class="sr-only">${L.stageHelp}</p>
        <div id="sr-speech" class="sr-only" aria-live="polite"></div>
        <div class="bottom">
          ${this._empty?this._renderEmpty():this._localWarning?this._renderLocalWarning():f1}
          ${this._note?l1`<p class="note" role="status">${this._note}</p>`:f1}
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
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d=${t?W0:I0}></path></svg>
            </button>
            <button type="submit" class="round send" aria-label=${L.send} title=${L.send}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d=${N0}></path></svg>
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
        .warningAction=${this.hass?.user?.is_admin?this._fixing?L.fixing:L.fixLocal:void 0}
        .warningNote=${this.hass?.user?.is_admin?void 0:L.askAdminFix}
        .warningError=${this._fixError}
        .warningBusy=${this._fixing}
        @warning-action=${this._fixLocal}
        .note=${this._pipeline&&!this._casitaPipeline?L.notCasita:void 0}
        .defaultId=${this._defaultPipeline?.id}
        .open=${this._settingsOpen}
        @settings-changed=${this._settingsChanged}
        @closed=${()=>this._settingsOpen=!1}
      ></casita-settings-dialog>
    `}};s1.styles=I2`
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
  `,K([o1({attribute:!1})],s1.prototype,"hass",2),K([o1({type:Boolean,reflect:!0})],s1.prototype,"narrow",2),K([o1({attribute:!1})],s1.prototype,"route",2),K([o1({attribute:!1})],s1.prototype,"panel",2),K([L2()],s1.prototype,"_info",2),K([L2()],s1.prototype,"_settings",2),K([L2()],s1.prototype,"_pipelines",2),K([L2()],s1.prototype,"_hudOpen",2),K([L2()],s1.prototype,"_settingsOpen",2),K([L2()],s1.prototype,"_note",2),K([L2()],s1.prototype,"_expression",2),K([L2()],s1.prototype,"_phase",2),K([L2()],s1.prototype,"_condition",2),K([L2()],s1.prototype,"_creating",2),K([L2()],s1.prototype,"_createError",2),K([L2()],s1.prototype,"_fixing",2),K([L2()],s1.prototype,"_fixError",2),K([s2(".room",!0)],s1.prototype,"_room",2),K([s2("casita-face",!0)],s1.prototype,"_faceEl",2),K([s2(".bubble",!0)],s1.prototype,"_bubble",2),K([s2(".bubble-text",!0)],s1.prototype,"_bubbleText",2),K([s2("#sr-speech",!0)],s1.prototype,"_srSpeech",2),K([s2("#chat-input",!0)],s1.prototype,"_input",2),K([s2("#mood-btn",!0)],s1.prototype,"_moodBtn",2);e5("casita-panel",s1);export{s1 as CasitaPanel,I4 as phaseFrom};
