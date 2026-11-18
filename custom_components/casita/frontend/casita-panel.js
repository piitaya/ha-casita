/* Casita panel for Home Assistant. Lit (BSD-3-Clause, Google LLC) bundled. */
var h6=Object.defineProperty;var f6=Object.getOwnPropertyDescriptor;var Y=(M,V,L,r)=>{for(var t=r>1?void 0:r?f6(V,L):V,o=M.length-1,n;o>=0;o--)(n=M[o])&&(t=(r?n(V,L,t):n(t))||t);return r&&t&&h6(V,L,t),t};var J3=globalThis,C0=J3.ShadowRoot&&(J3.ShadyCSS===void 0||J3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,R0=Symbol(),n4=new WeakMap,c3=class{constructor(V,L,r){if(this._$cssResult$=!0,r!==R0)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=V,this.t=L}get styleSheet(){let V=this.o,L=this.t;if(C0&&V===void 0){let r=L!==void 0&&L.length===1;r&&(V=n4.get(L)),V===void 0&&((this.o=V=new CSSStyleSheet).replaceSync(this.cssText),r&&n4.set(L,V))}return V}toString(){return this.cssText}},d4=M=>new c3(typeof M=="string"?M:M+"",void 0,R0),q2=(M,...V)=>{let L=M.length===1?M[0]:V.reduce((r,t,o)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(t)+M[o+1],M[0]);return new c3(L,M,R0)},p4=(M,V)=>{if(C0)M.adoptedStyleSheets=V.map(L=>L instanceof CSSStyleSheet?L:L.styleSheet);else for(let L of V){let r=document.createElement("style"),t=J3.litNonce;t!==void 0&&r.setAttribute("nonce",t),r.textContent=L.cssText,M.appendChild(r)}},F0=C0?M=>M:M=>M instanceof CSSStyleSheet?(V=>{let L="";for(let r of V.cssRules)L+=r.cssText;return d4(L)})(M):M;var{is:g6,defineProperty:y6,getOwnPropertyDescriptor:b6,getOwnPropertyNames:O6,getOwnPropertySymbols:k6,getPrototypeOf:w6}=Object,H0=globalThis,l4=H0.trustedTypes,P6=l4?l4.emptyScript:"",T6=H0.reactiveElementPolyfillSupport,Z3=(M,V)=>M,S3={toAttribute(M,V){switch(V){case Boolean:M=M?P6:null;break;case Object:case Array:M=M==null?M:JSON.stringify(M)}return M},fromAttribute(M,V){let L=M;switch(V){case Boolean:L=M!==null;break;case Number:L=M===null?null:Number(M);break;case Object:case Array:try{L=JSON.parse(M)}catch{L=null}}return L}},V0=(M,V)=>!g6(M,V),m4={attribute:!0,type:String,converter:S3,reflect:!1,useDefault:!1,hasChanged:V0};Symbol.metadata??=Symbol("metadata"),H0.litPropertyMetadata??=new WeakMap;var Y2=class extends HTMLElement{static addInitializer(V){this._$Ei(),(this.l??=[]).push(V)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(V,L=m4){if(L.state&&(L.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(V)&&((L=Object.create(L)).wrapped=!0),this.elementProperties.set(V,L),!L.noAccessor){let r=Symbol(),t=this.getPropertyDescriptor(V,r,L);t!==void 0&&y6(this.prototype,V,t)}}static getPropertyDescriptor(V,L,r){let{get:t,set:o}=b6(this.prototype,V)??{get(){return this[L]},set(n){this[L]=n}};return{get:t,set(n){let Z=t?.call(this);o?.call(this,n),this.requestUpdate(V,Z,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(V){return this.elementProperties.get(V)??m4}static _$Ei(){if(this.hasOwnProperty(Z3("elementProperties")))return;let V=w6(this);V.finalize(),V.l!==void 0&&(this.l=[...V.l]),this.elementProperties=new Map(V.elementProperties)}static finalize(){if(this.hasOwnProperty(Z3("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Z3("properties"))){let L=this.properties,r=[...O6(L),...k6(L)];for(let t of r)this.createProperty(t,L[t])}let V=this[Symbol.metadata];if(V!==null){let L=litPropertyMetadata.get(V);if(L!==void 0)for(let[r,t]of L)this.elementProperties.set(r,t)}this._$Eh=new Map;for(let[L,r]of this.elementProperties){let t=this._$Eu(L,r);t!==void 0&&this._$Eh.set(t,L)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(V){let L=[];if(Array.isArray(V)){let r=new Set(V.flat(1/0).reverse());for(let t of r)L.unshift(F0(t))}else V!==void 0&&L.push(F0(V));return L}static _$Eu(V,L){let r=L.attribute;return r===!1?void 0:typeof r=="string"?r:typeof V=="string"?V.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(V=>this.enableUpdating=V),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(V=>V(this))}addController(V){(this._$EO??=new Set).add(V),this.renderRoot!==void 0&&this.isConnected&&V.hostConnected?.()}removeController(V){this._$EO?.delete(V)}_$E_(){let V=new Map,L=this.constructor.elementProperties;for(let r of L.keys())this.hasOwnProperty(r)&&(V.set(r,this[r]),delete this[r]);V.size>0&&(this._$Ep=V)}createRenderRoot(){let V=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return p4(V,this.constructor.elementStyles),V}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(V=>V.hostConnected?.())}enableUpdating(V){}disconnectedCallback(){this._$EO?.forEach(V=>V.hostDisconnected?.())}attributeChangedCallback(V,L,r){this._$AK(V,r)}_$ET(V,L){let r=this.constructor.elementProperties.get(V),t=this.constructor._$Eu(V,r);if(t!==void 0&&r.reflect===!0){let o=(r.converter?.toAttribute!==void 0?r.converter:S3).toAttribute(L,r.type);this._$Em=V,o==null?this.removeAttribute(t):this.setAttribute(t,o),this._$Em=null}}_$AK(V,L){let r=this.constructor,t=r._$Eh.get(V);if(t!==void 0&&this._$Em!==t){let o=r.getPropertyOptions(t),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:S3;this._$Em=t;let Z=n.fromAttribute(L,o.type);this[t]=Z??this._$Ej?.get(t)??Z,this._$Em=null}}requestUpdate(V,L,r,t=!1,o){if(V!==void 0){let n=this.constructor;if(t===!1&&(o=this[V]),r??=n.getPropertyOptions(V),!((r.hasChanged??V0)(o,L)||r.useDefault&&r.reflect&&o===this._$Ej?.get(V)&&!this.hasAttribute(n._$Eu(V,r))))return;this.C(V,L,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(V,L,{useDefault:r,reflect:t,wrapped:o},n){r&&!(this._$Ej??=new Map).has(V)&&(this._$Ej.set(V,n??L??this[V]),o!==!0||n!==void 0)||(this._$AL.has(V)||(this.hasUpdated||r||(L=void 0),this._$AL.set(V,L)),t===!0&&this._$Em!==V&&(this._$Eq??=new Set).add(V))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(L){Promise.reject(L)}let V=this.scheduleUpdate();return V!=null&&await V,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[t,o]of this._$Ep)this[t]=o;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[t,o]of r){let{wrapped:n}=o,Z=this[t];n!==!0||this._$AL.has(t)||Z===void 0||this.C(t,void 0,o,Z)}}let V=!1,L=this._$AL;try{V=this.shouldUpdate(L),V?(this.willUpdate(L),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(L)):this._$EM()}catch(r){throw V=!1,this._$EM(),r}V&&this._$AE(L)}willUpdate(V){}_$AE(V){this._$EO?.forEach(L=>L.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(V)),this.updated(V)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(V){return!0}update(V){this._$Eq&&=this._$Eq.forEach(L=>this._$ET(L,this[L])),this._$EM()}updated(V){}firstUpdated(V){}};Y2.elementStyles=[],Y2.shadowRootOptions={mode:"open"},Y2[Z3("elementProperties")]=new Map,Y2[Z3("finalized")]=new Map,T6?.({ReactiveElement:Y2}),(H0.reactiveElementVersions??=[]).push("2.1.2");var U0=globalThis,s4=M=>M,L0=U0.trustedTypes,x4=L0?L0.createPolicy("lit-html",{createHTML:M=>M}):void 0,h4="$lit$",m5=`lit$${Math.random().toFixed(9).slice(2)}$`,f4="?"+m5,B6=`<${f4}>`,w5=document,f3=()=>w5.createComment(""),g3=M=>M===null||typeof M!="object"&&typeof M!="function",$0=Array.isArray,R6=M=>$0(M)||typeof M?.[Symbol.iterator]=="function",_0=`[ 	
\f\r]`,h3=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v4=/-->/g,u4=/>/g,O5=RegExp(`>|${_0}(?:([^\\s"'>=/]+)(${_0}*=${_0}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),c4=/'/g,Z4=/"/g,g4=/^(?:script|style|textarea|title)$/i,G0=M=>(V,...L)=>({_$litType$:M,strings:V,values:L}),c1=G0(1),u8=G0(2),c8=G0(3),P5=Symbol.for("lit-noChange"),w1=Symbol.for("lit-nothing"),S4=new WeakMap,k5=w5.createTreeWalker(w5,129);function y4(M,V){if(!$0(M)||!M.hasOwnProperty("raw"))throw Error("invalid template strings array");return x4!==void 0?x4.createHTML(V):V}var F6=(M,V)=>{let L=M.length-1,r=[],t,o=V===2?"<svg>":V===3?"<math>":"",n=h3;for(let Z=0;Z<L;Z++){let m=M[Z],y,P,S=-1,$=0;for(;$<m.length&&(n.lastIndex=$,P=n.exec(m),P!==null);)$=n.lastIndex,n===h3?P[1]==="!--"?n=v4:P[1]!==void 0?n=u4:P[2]!==void 0?(g4.test(P[2])&&(t=RegExp("</"+P[2],"g")),n=O5):P[3]!==void 0&&(n=O5):n===O5?P[0]===">"?(n=t??h3,S=-1):P[1]===void 0?S=-2:(S=n.lastIndex-P[2].length,y=P[1],n=P[3]===void 0?O5:P[3]==='"'?Z4:c4):n===Z4||n===c4?n=O5:n===v4||n===u4?n=h3:(n=O5,t=void 0);let W=n===O5&&M[Z+1].startsWith("/>")?" ":"";o+=n===h3?m+B6:S>=0?(r.push(y),m.slice(0,S)+h4+m.slice(S)+m5+W):m+m5+(S===-2?Z:W)}return[y4(M,o+(M[L]||"<?>")+(V===2?"</svg>":V===3?"</math>":"")),r]},y3=class M{constructor({strings:V,_$litType$:L},r){let t;this.parts=[];let o=0,n=0,Z=V.length-1,m=this.parts,[y,P]=F6(V,L);if(this.el=M.createElement(y,r),k5.currentNode=this.el.content,L===2||L===3){let S=this.el.content.firstChild;S.replaceWith(...S.childNodes)}for(;(t=k5.nextNode())!==null&&m.length<Z;){if(t.nodeType===1){if(t.hasAttributes())for(let S of t.getAttributeNames())if(S.endsWith(h4)){let $=P[n++],W=t.getAttribute(S).split(m5),F=/([.?@])?(.*)/.exec($);m.push({type:1,index:o,name:F[2],strings:W,ctor:F[1]==="."?D0:F[1]==="?"?I0:F[1]==="@"?N0:j5}),t.removeAttribute(S)}else S.startsWith(m5)&&(m.push({type:6,index:o}),t.removeAttribute(S));if(g4.test(t.tagName)){let S=t.textContent.split(m5),$=S.length-1;if($>0){t.textContent=L0?L0.emptyScript:"";for(let W=0;W<$;W++)t.append(S[W],f3()),k5.nextNode(),m.push({type:2,index:++o});t.append(S[$],f3())}}}else if(t.nodeType===8)if(t.data===f4)m.push({type:2,index:o});else{let S=-1;for(;(S=t.data.indexOf(m5,S+1))!==-1;)m.push({type:7,index:o}),S+=m5.length-1}o++}}static createElement(V,L){let r=w5.createElement("template");return r.innerHTML=V,r}};function K5(M,V,L=M,r){if(V===P5)return V;let t=r!==void 0?L._$Co?.[r]:L._$Cl,o=g3(V)?void 0:V._$litDirective$;return t?.constructor!==o&&(t?._$AO?.(!1),o===void 0?t=void 0:(t=new o(M),t._$AT(M,L,r)),r!==void 0?(L._$Co??=[])[r]=t:L._$Cl=t),t!==void 0&&(V=K5(M,t._$AS(M,V.values),t,r)),V}var E0=class{constructor(V,L){this._$AV=[],this._$AN=void 0,this._$AD=V,this._$AM=L}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(V){let{el:{content:L},parts:r}=this._$AD,t=(V?.creationScope??w5).importNode(L,!0);k5.currentNode=t;let o=k5.nextNode(),n=0,Z=0,m=r[0];for(;m!==void 0;){if(n===m.index){let y;m.type===2?y=new b3(o,o.nextSibling,this,V):m.type===1?y=new m.ctor(o,m.name,m.strings,this,V):m.type===6&&(y=new W0(o,this,V)),this._$AV.push(y),m=r[++Z]}n!==m?.index&&(o=k5.nextNode(),n++)}return k5.currentNode=w5,t}p(V){let L=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(V,r,L),L+=r.strings.length-2):r._$AI(V[L])),L++}},b3=class M{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(V,L,r,t){this.type=2,this._$AH=w1,this._$AN=void 0,this._$AA=V,this._$AB=L,this._$AM=r,this.options=t,this._$Cv=t?.isConnected??!0}get parentNode(){let V=this._$AA.parentNode,L=this._$AM;return L!==void 0&&V?.nodeType===11&&(V=L.parentNode),V}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(V,L=this){V=K5(this,V,L),g3(V)?V===w1||V==null||V===""?(this._$AH!==w1&&this._$AR(),this._$AH=w1):V!==this._$AH&&V!==P5&&this._(V):V._$litType$!==void 0?this.$(V):V.nodeType!==void 0?this.T(V):R6(V)?this.k(V):this._(V)}O(V){return this._$AA.parentNode.insertBefore(V,this._$AB)}T(V){this._$AH!==V&&(this._$AR(),this._$AH=this.O(V))}_(V){this._$AH!==w1&&g3(this._$AH)?this._$AA.nextSibling.data=V:this.T(w5.createTextNode(V)),this._$AH=V}$(V){let{values:L,_$litType$:r}=V,t=typeof r=="number"?this._$AC(V):(r.el===void 0&&(r.el=y3.createElement(y4(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===t)this._$AH.p(L);else{let o=new E0(t,this),n=o.u(this.options);o.p(L),this.T(n),this._$AH=o}}_$AC(V){let L=S4.get(V.strings);return L===void 0&&S4.set(V.strings,L=new y3(V)),L}k(V){$0(this._$AH)||(this._$AH=[],this._$AR());let L=this._$AH,r,t=0;for(let o of V)t===L.length?L.push(r=new M(this.O(f3()),this.O(f3()),this,this.options)):r=L[t],r._$AI(o),t++;t<L.length&&(this._$AR(r&&r._$AB.nextSibling,t),L.length=t)}_$AR(V=this._$AA.nextSibling,L){for(this._$AP?.(!1,!0,L);V!==this._$AB;){let r=s4(V).nextSibling;s4(V).remove(),V=r}}setConnected(V){this._$AM===void 0&&(this._$Cv=V,this._$AP?.(V))}},j5=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(V,L,r,t,o){this.type=1,this._$AH=w1,this._$AN=void 0,this.element=V,this.name=L,this._$AM=t,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=w1}_$AI(V,L=this,r,t){let o=this.strings,n=!1;if(o===void 0)V=K5(this,V,L,0),n=!g3(V)||V!==this._$AH&&V!==P5,n&&(this._$AH=V);else{let Z=V,m,y;for(V=o[0],m=0;m<o.length-1;m++)y=K5(this,Z[r+m],L,m),y===P5&&(y=this._$AH[m]),n||=!g3(y)||y!==this._$AH[m],y===w1?V=w1:V!==w1&&(V+=(y??"")+o[m+1]),this._$AH[m]=y}n&&!t&&this.j(V)}j(V){V===w1?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,V??"")}},D0=class extends j5{constructor(){super(...arguments),this.type=3}j(V){this.element[this.name]=V===w1?void 0:V}},I0=class extends j5{constructor(){super(...arguments),this.type=4}j(V){this.element.toggleAttribute(this.name,!!V&&V!==w1)}},N0=class extends j5{constructor(V,L,r,t,o){super(V,L,r,t,o),this.type=5}_$AI(V,L=this){if((V=K5(this,V,L,0)??w1)===P5)return;let r=this._$AH,t=V===w1&&r!==w1||V.capture!==r.capture||V.once!==r.once||V.passive!==r.passive,o=V!==w1&&(r===w1||t);t&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,V),this._$AH=V}handleEvent(V){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,V):this._$AH.handleEvent(V)}},W0=class{constructor(V,L,r){this.element=V,this.type=6,this._$AN=void 0,this._$AM=L,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(V){K5(this,V)}};var _6=U0.litHtmlPolyfillSupport;_6?.(y3,b3),(U0.litHtmlVersions??=[]).push("3.3.3");var b4=(M,V,L)=>{let r=L?.renderBefore??V,t=r._$litPart$;if(t===void 0){let o=L?.renderBefore??null;r._$litPart$=t=new b3(V.insertBefore(f3(),o),o,void 0,L??{})}return t._$AI(M),t};var z0=globalThis,l2=class extends Y2{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let V=super.createRenderRoot();return this.renderOptions.renderBefore??=V.firstChild,V}update(V){let L=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(V),this._$Do=b4(L,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return P5}};l2._$litElement$=!0,l2.finalized=!0,z0.litElementHydrateSupport?.({LitElement:l2});var E6=z0.litElementPolyfillSupport;E6?.({LitElement:l2});(z0.litElementVersions??=[]).push("4.2.2");var D6={attribute:!0,type:String,converter:S3,reflect:!1,hasChanged:V0},I6=(M=D6,V,L)=>{let{kind:r,metadata:t}=L,o=globalThis.litPropertyMetadata.get(t);if(o===void 0&&globalThis.litPropertyMetadata.set(t,o=new Map),r==="setter"&&((M=Object.create(M)).wrapped=!0),o.set(L.name,M),r==="accessor"){let{name:n}=L;return{set(Z){let m=V.get.call(this);V.set.call(this,Z),this.requestUpdate(n,m,M,!0,Z)},init(Z){return Z!==void 0&&this.C(n,void 0,M,Z),Z}}}if(r==="setter"){let{name:n}=L;return function(Z){let m=this[n];V.call(this,Z),this.requestUpdate(n,m,M,!0,Z)}}throw Error("Unsupported decorator location: "+r)};function s1(M){return(V,L)=>typeof L=="object"?I6(M,V,L):((r,t,o)=>{let n=t.hasOwnProperty(o);return t.constructor.createProperty(o,r),n?Object.getOwnPropertyDescriptor(t,o):void 0})(M,V,L)}function m2(M){return s1({...M,state:!0,attribute:!1})}var T5=(M,V,L)=>(L.configurable=!0,L.enumerable=!0,Reflect.decorate&&typeof V!="object"&&Object.defineProperty(M,V,L),L);function O2(M,V){return(L,r,t)=>{let o=n=>n.renderRoot?.querySelector(M)??null;if(V){let{get:n,set:Z}=typeof r=="object"?L:t??(()=>{let m=Symbol();return{get(){return this[m]},set(y){this[m]=y}}})();return T5(L,r,{get(){let m=n.call(this);return m===void 0&&(m=o(this),(m!==null||this.hasUpdated)&&Z.call(this,m)),m}})}return T5(L,r,{get(){return o(this)}})}}var s5=(M,V)=>{customElements.get(M)||customElements.define(M,V)};var N6="http://www.w3.org/2000/svg",_4="M120,109.38c0,4.12-3.38,7.5-7.5,7.5H7.5c-4.12,0-7.5-3.38-7.5-7.5v-45c0-4.12,2.39-9.89,5.3-12.8L54.7,2.19c2.92-2.92,7.69-2.92,10.61,0l49.39,49.39c2.92,2.92,5.3,8.68,5.3,12.8v45Z",X5="#f2f4f9",L7={blue:"#18bcf2",red:"#ed1c24",orange:"#f7931e",gray:"#999999"},X2=60,q5=116.88,W6=8,M2=120,O4=90,e0=40,G2=Math.PI*2,U6="M108.97,24.83h-5.52c0-4.56-3.71-8.28-8.28-8.28v-5.52c7.61,0,13.79,6.19,13.79,13.79Z",$6="M120,24.83h-5.52c0-10.65-8.66-19.31-19.31-19.31V0c13.69,0,24.83,11.14,24.83,24.83Z",G6="M111.91,12.57c0,2.03-.66,3.7-1.99,5.03-.69.69-1.37,1.31-2.05,1.87-.85.69-1.46,1.25-1.81,1.68s-.56.9-.62,1.4v.69h-4.52v-.91c.02-.48.09-.93.22-1.35s.27-.78.44-1.09.42-.64.74-1,.63-.66.92-.92.68-.6,1.19-1.02c.73-.6,1.29-1.09,1.67-1.47s.68-.8.91-1.23.34-.9.34-1.4c0-.86-.3-1.59-.89-2.18s-1.37-.89-2.34-.89c-1.04,0-1.9.33-2.58,1s-1.03,1.48-1.03,2.45h-4.58c0-2.25.78-4.14,2.34-5.67s3.5-2.29,5.82-2.29c1.44,0,2.75.29,3.93.88s2.13,1.44,2.84,2.56c.71,1.12,1.06,2.41,1.06,3.86ZM106.06,26.89c0,.71-.25,1.3-.76,1.78s-1.16.72-1.95.72-1.4-.24-1.91-.73-.77-1.07-.77-1.77.26-1.3.77-1.79,1.15-.74,1.91-.74,1.4.25,1.93.74.79,1.09.79,1.79Z",z6="M93.5,21.29l9.04-9.55h-9.04v-4.91h16v4.95l-9.27,9.51h9.27v4.95h-16v-4.95Z",k4=[[91.66,28.34,3.66],[100.8,19.2,5.49],[112.69,7.31,7.31]],Q0=[92,90.885,6],w4=[[104,91.885,6],[16,100.885,6]],J0={heart:"M0,-9.77c-3.12,-3.12 -8.19,-3.12 -11.31,0c-3.12,3.12 -3.12,8.19 0,11.31L0,12.86L11.31,1.54c3.12,-3.12 3.12,-8.19 0,-11.31c-3.12,-3.12 -8.19,-3.12 -11.31,0Z",z:"M-8,4.76l9.04,-9.55h-9.04v-4.91h16v4.95l-9.27,9.51h9.27v4.95h-16v-4.95Z",sparkle:"M0,-7C1,-1.4 1.4,-1 7,0C1.4,1 1,1.4 0,7C-1,1.4 -1.4,1 -7,0C-1.4,-1 -1,-1.4 0,-7Z",star:(()=>{let M="";for(let V=0;V<10;V++){let L=-Math.PI/2+V*Math.PI/5,r=V%2?2.6:6.4;M+=(V?"L":"M")+(r*Math.cos(L)).toFixed(2)+","+(r*Math.sin(L)).toFixed(2)}return M+"Z"})(),steam:"M-4,0a4,4 0 1,0 8,0a4,4 0 1,0 -8,0Z",tear:"M0,-8.49L4.24,-4.24A6,6 0 1,1 -4.24,-4.24Z",note:"M0,-9C2,-7 6,-6.5 5,-2C4.5,-4.5 2.5,-5 1.6,-5L1.6,5.2C1.6,7.6 -1.2,9 -3.6,8.6C-6.2,8.2 -6.6,5.6 -4.4,4.2C-2.8,3.2 -1,3.2 0,3.8Z",dot:"M-2.5,0a2.5,2.5 0 1,0 5,0a2.5,2.5 0 1,0 -5,0Z",puff:"M-7.5,3.2a3.6,3.6 0 0,1 0.6,-6.4a4.6,4.6 0 0,1 8.4,-2.6a4,4 0 0,1 6.6,3.4a3.2,3.2 0 0,1 -0.8,5.6Z"},C5=(M,V,L)=>M<V?V:M>L?L:M,G1=M=>C5(M,0,1),B2=(M,V,L)=>M+(V-M)*L,q1=(M,V)=>M+Math.random()*(V-M),x5=M=>(M=G1(M),M*M*(3-2*M)),q=M=>Math.abs(M)<.005?"0":(Math.round(M*100)/100).toString(),M0=M=>M-Math.floor(M);function Q6(M){M=String(M).replace("#",""),M.length===3&&(M=M.split("").map(L=>L+L).join(""));let V=parseInt(M,16);return[V>>16&255,V>>8&255,V&255]}var K0=M=>(M/=255,M<=.04045?M/12.92:Math.pow((M+.055)/1.055,2.4)),j0=M=>(M=C5(M,0,1),M=M<=.0031308?12.92*M:1.055*Math.pow(M,1/2.4)-.055,C5(Math.round(M*255),0,255));function K6(M){let V=K0(M[0]),L=K0(M[1]),r=K0(M[2]),t=Math.cbrt(.4122214708*V+.5363325363*L+.0514459929*r),o=Math.cbrt(.2119034982*V+.6806995451*L+.1073969566*r),n=Math.cbrt(.0883024619*V+.2817188376*L+.6299787005*r);return[.2104542553*t+.793617785*o-.0040720468*n,1.9779984951*t-2.428592205*o+.4505937099*n,.0259040371*t+.7827717662*o-.808675766*n]}function C7(M,V,L){let r=M+.3963377774*V+.2158037573*L,t=M-.1055613458*V-.0638541728*L,o=M-.0894841775*V-1.291485548*L,n=r*r*r,Z=t*t*t,m=o*o*o;return[j0(4.0767416621*n-3.3077115913*Z+.2309699292*m),j0(-1.2684380046*n+2.6097574011*Z-.3413193965*m),j0(-.0041960863*n-.7034186147*Z+1.707614701*m)]}var i0=M=>K6(Q6(M)),q0=i0(X5);function P4(M){return M&&typeof M=="object"&&!Array.isArray(M)}function J2(...M){let V={};for(let L of M)if(P4(L))for(let r of Object.keys(L))V[r]=P4(L[r])?J2(V[r],L[r]):L[r];return V}var w3=new Float64Array(M2),P3=new Float64Array(M2);for(let M=0;M<M2;M++)w3[M]=Math.cos(G2*M/M2),P3[M]=Math.sin(G2*M/M2);function T4(M,V,L,r,t,o,n){let Z=M-t,m=V-o,y=Z*L+m*r,P=Z*Z+m*m-n*n,S=y*y-P;return S<0?0:-y+Math.sqrt(S)}var r0=[-4,-1.88],H7=new Float64Array(M2),E4=new Float64Array(M2),D4=new Float64Array(M2);(function(){let[M,V]=r0,L=8*Math.SQRT2,r=-4,t=1.665;for(let Z=0;Z<M2;Z++){let m=w3[Z],y=P3[Z],P=Math.max(T4(M,V,m,y,-9.655,-3.995,8),T4(M,V,m,y,1.655,-3.995,8)),S=1/0;for(let $ of[-1,1])for(let W of[-1,1]){let F=$*m+W*y;F>1e-9&&(S=Math.min(S,(L+$*r+W*t-($*M+W*V))/F))}S!==1/0&&(P=Math.max(P,S)),H7[Z]=P}for(let Z=0;Z<M2;Z++)E4[Z]=H7[((M2/2-Z)%M2+M2)%M2];let o=12*Math.SQRT2,n=3;for(let Z=0;Z<M2;Z++){let m=0;for(let y of[Math.PI/4,-Math.PI/4]){let P=w3[Z]*Math.cos(y)+P3[Z]*Math.sin(y),S=-w3[Z]*Math.sin(y)+P3[Z]*Math.cos(y);m=Math.max(m,Math.min(Math.abs(P)>1e-9?o/Math.abs(P):1/0,Math.abs(S)>1e-9?n/Math.abs(S):1/0))}D4[Z]=m}})();function B4(M,V,L,r,t){let o=[],n=M.length;if(n<6)return o;let Z=M[n-2],m=M[n-1],y=(Z-V)*r+(m-L)*t;for(let P=0;P<n;P+=2){let S=M[P],$=M[P+1],W=(S-V)*r+($-L)*t;if(W>=0){if(y<0){let F=y/(y-W);o.push(Z+(S-Z)*F,m+($-m)*F)}o.push(S,$)}else if(y>=0){let F=y/(y-W);o.push(Z+(S-Z)*F,m+($-m)*F)}Z=S,m=$,y=W}return o}function Y0(M){if(!M||M.length<6)return"";let V="M"+q(M[0])+","+q(M[1]);for(let L=2;L<M.length;L+=2)V+="L"+q(M[L])+","+q(M[L+1]);return V+"Z"}function j6(M,V){let L=M.s;if(!(L>.01))return null;let r=W6*L,t=G1(M.heart),o=G1(M.cross),n=V<0?H7:E4,Z=M.x+(V<0?r0[0]:-r0[0])*L,m=M.y+r0[1]*L,y=M.x,P=M.y+.5*L,S=new Array(M2*2);for(let A=0;A<M2;A++){let d1=w3[A],s2=P3[A],z1=M.x+r*d1,F2=M.y+r*s2;if(t>0){let x1=n[A]*L;z1=B2(z1,Z+x1*d1,t),F2=B2(F2,m+x1*s2,t)}if(o>0){let x1=D4[A]*L;z1=B2(z1,y+x1*d1,o),F2=B2(F2,P+x1*s2,o)}S[2*A]=z1,S[2*A+1]=F2}let $=1-Math.max(t,o),W=G1(M.top)*$,F=G1(M.bot)*$;if(W+F>1){let A=1/(W+F);W*=A,F*=A}if(W>.001||Math.abs(M.ang*$)>.05){let A=(V<0?M.ang:-M.ang)*$*Math.PI/180;S=B4(S,M.x,M.y-r+2*r*W,-Math.sin(A),Math.cos(A))}F>.001&&(S=B4(S,M.x,M.y+r-2*r*F,0,-1));let y1=Math.max(.1,M.open);if(Math.abs(y1-1)>1e-4)for(let A=1;A<S.length;A+=2)S[A]=M.y+(S[A]-M.y)*y1;return S}function X0(M,V,L,r){if(L<=1e-6||r<=1e-6)return 0;let t=Math.abs(M-V);if(t>L)return 0;let o=Math.min(r,L),n=L-o;if(t<=n)return r;let Z=t-n;return r-o+Math.sqrt(Math.max(0,o*o-Z*Z))}function J5(M,V,L,r,t,o,n,Z,m){r=Math.max(0,r),t=Math.max(0,t),n=Math.max(0,n);let y=Math.abs(o),P=o<0?-1:1;for(let S=0;S<Z;S++){let $=m?Z-1-S:S,W=V-r*Math.cos(Math.PI*$/(Z-1)),F=n>1e-4?Math.max(X0(W,V-n,t,y),X0(W,V+n,t,y)):X0(W,V,t,y);M.push(W,L+P*F)}}function q6(M){return[M.x,(M.tY+M.bY)/2+(Math.max(M.tH,M.bH,0)+Math.min(M.tH,M.bH,0))/2]}function I4(M,V){let[L,r]=q6(V),t=V.s,o=V.rot*Math.PI/180,n=Math.cos(o),Z=Math.sin(o);if(Math.abs(t-1)<1e-4&&Math.abs(o)<1e-5)return M;for(let m=0;m<M.length;m+=2){let y=(M[m]-L)*t,P=(M[m+1]-r)*t;M[m]=L+y*n-P*Z,M[m+1]=r+y*Z+P*n}return M}function Y6(M){if(!(M.s>.01))return null;let V=C5(M.talk,0,1.6),L=M.tH-5*V,r=M.bH+9*V,t=V>0?Math.max(M.bR,M.tR*V+M.bR*(1-V)):M.bR,o=[];return J5(o,M.x,M.tY,M.tR,M.tA,L,M.tD,O4,!1),J5(o,M.x,M.bY,t,Math.max(M.bA,V>0?B2(M.bA,M.tA,G1(V)):0),r,M.bD,O4,!0),I4(o,M)}function X6(M){let V=M.tongue;if(!(V>.01)||!(M.s>.01))return null;let L=12*V,r=Math.abs(M.tgH)*V,t=M.tgH<0,o=M.tgY+(t?0:6*C5(M.talk,0,1.6)),n=[];return t?(J5(n,M.tgX,o,L,L,-r,0,e0,!1),J5(n,M.tgX,o+1.2,L,L,0,0,e0,!0)):(J5(n,M.tgX,o-1.2,L,L,0,0,e0,!1),J5(n,M.tgX,o,L,L,r,0,e0,!0)),I4(n,M)}function R4(M,V,L){if(!(L>.05))return"";let r=L*Math.SQRT1_2;return"M"+q(M)+","+q(V-L*Math.SQRT2)+"L"+q(M+r)+","+q(V-r)+"A"+q(L)+","+q(L)+" 0 1 1 "+q(M-r)+","+q(V-r)+"Z"}var J6=["x","y","s","top","bot","ang","heart","cross","shine","open"],N4=["x","s","rot","tY","tR","tA","tH","tD","bY","bR","bA","bH","bD","tongue","tgX","tgY","tgH","talk"],W4=["bubbles","wifi","question","z","tear","sweat"],z2=[];["x","y","rot","sx","sy","skew"].forEach(M=>z2.push(["body."+M,"body"]));["L","A","B"].forEach(M=>z2.push(["body."+M,"color"]));["x","y"].forEach(M=>z2.push(["face."+M,"face"]));for(let M of["eyeL","eyeR"])J6.forEach(V=>z2.push([M+"."+V,V==="x"||V==="y"?"eyePos":V==="top"||V==="bot"||V==="ang"?"lids":"eyes"]));z2.push(["dot.s","eyes"]);z2.push(["dot.dy","eyePos"]);N4.forEach(M=>z2.push(["mouth."+M,M==="talk"?"talk":"mouth"]));W4.forEach(M=>z2.push(["acc."+M,"acc"]));var C3=z2.map(M=>M[0]),F4=z2.map(M=>M[1]),_={};C3.forEach((M,V)=>{_[M]=V});var $2=C3.length,V7={snappy:[420,30],soft:[150,21],bouncy:[300,13],heavy:[70,12],crisp:[700,52]},C8={body:[200,17],color:[90,19],face:[190,24],eyes:[480,34],lids:[520,44],eyePos:[650,46],mouth:[360,29],talk:[1300,66],acc:[230,15]},H8=["body","eyes","mouth","acc"],V8={body:0,color:0,face:0,eyes:60,lids:60,eyePos:60,mouth:110,talk:110,acc:170},Z1={smile:(M=80.88)=>({tY:M,tR:13,tA:13,tH:13,tD:0,bY:M,bR:19,bA:19,bH:19,bD:0}),frown:(M=96.88)=>({tY:M,tR:19,tA:19,tH:-19,tD:0,bY:M,bR:13,bA:13,bH:-13,bD:0}),openD:(M=80.88)=>({tY:M,tR:20,tA:20,tH:0,tD:0,bY:M,bR:20,bA:20,bH:20,bD:0}),openFrown:(M=94.88)=>({tY:M,tR:20,tA:20,tH:-20,tD:0,bY:M,bR:20,bA:20,bH:0,bD:0}),O:(M,V)=>({tY:V,tR:M,tA:M,tH:-M,tD:0,bY:V,bR:M,bA:M,bH:M,bD:0}),line:M=>({tY:M-3,tR:20,tA:20,tH:0,tD:0,bY:M+3,bR:20,bA:20,bH:0,bD:0}),grin:()=>({tY:89.88,tR:35,tA:35,tH:-8,tD:0,bY:89.88,bR:35,bA:35,bH:8,bD:0}),uwu:()=>({tY:80.88,tR:19,tA:5,tH:5,tD:8,bY:80.88,bR:19,bA:11,bH:11,bD:8}),none:()=>Object.assign(Z1.smile(),{s:0})},O3=(M,V=12)=>({tongue:1,tgX:68,tgY:M,tgH:V}),t0={breath:{rate:.23,amp:.012},blink:{on:!0,min:2200,max:5600,double:.18,close:95,hold:45,open:150},saccade:{on:!0,min:650,max:2600,range:2.4,micro:.18},sway:{amp:.55,rate:.28},gaze:{eye:4.2,face:1.6,rot:4,skew:-1.2,bx:2}},k3={blink:{on:!1},saccade:{on:!1}},H5={Normal:{label:"Content",mouth:Z1.smile()},Alert:{label:"Alerte",mouth:Z1.O(15,87.88),spring:"snappy",life:{blink:{min:3200,max:7e3},saccade:{min:350,max:1200,range:3.2},breath:{rate:.45,amp:.016}}},Angry:{label:"En colère",color:"red",eyes:{top:.5},mouth:Z1.openFrown(94.88),spring:"snappy",life:{breath:{rate:.5,amp:.02},saccade:{range:1,min:1500,max:4e3},blink:{min:4e3,max:8e3},sway:{amp:.25}}},Scared:{label:"Effrayé",color:"red",mouth:Z1.openFrown(94.88),spring:"snappy",life:{breath:{rate:.7,amp:.018},saccade:{min:250,max:900,range:3.4},sway:{amp:.9,rate:1.4}}},Cheeky:{label:"Taquin",mouth:Object.assign(Z1.line(83.88),O3(86.88)),spring:"bouncy"},DeadAss:{label:"Blasé",eyeR:{top:.5},mouth:Object.assign(Z1.line(83.88),O3(86.88)),life:{saccade:{range:1.2,min:2e3,max:5e3},breath:{rate:.16}}},Dead:{label:"K.O.",color:"red",eyes:{cross:1},mouth:Object.assign(Z1.line(87.88),O3(90.88)),life:J2(k3,{breath:{rate:.12,amp:.006},sway:{amp:.2}})},Devious:{label:"Malicieux",eyes:{top:.5},mouth:Z1.smile(),life:{saccade:{range:1.8,min:900,max:2400}}},Focusing:{label:"Concentré",mouth:Object.assign(Z1.line(91.88),O3(88.88,-12)),acc:{bubbles:1},life:{saccade:{range:1.2,min:1400,max:3600},blink:{min:3500,max:7e3}}},Grateful:{label:"Reconnaissant",eyes:{bot:.5,y:69.88},mouth:Z1.openD(76.88),spring:"soft"},Grinning:{label:"Rayonnant",mouth:Z1.grin(),spring:"bouncy",life:{breath:{rate:.3,amp:.016}}},Happy:{label:"Heureux",mouth:Z1.openD(80.88),spring:"bouncy",life:{breath:{rate:.3,amp:.016}}},Hurt:{label:"Blessé",color:"red",eyes:{cross:1},mouth:Z1.openFrown(98.88),spring:"snappy",life:J2(k3,{breath:{rate:.6,amp:.014},sway:{amp:.6,rate:1.1}})},Initializing:{label:"Démarrage",eyes:{s:0},mouth:Z1.none(),life:k3},Loading:{label:"Chargement",dot:1,mouth:Z1.none(),life:k3},Loving:{label:"Amoureux",eyes:{heart:1},mouth:Z1.openD(80.88),spring:"bouncy",life:{blink:{min:2600,max:5e3,double:.35},saccade:{range:1.4},breath:{rate:.2,amp:.016}}},NoInternet:{label:"Hors ligne",color:"orange",mouth:Z1.frown(),acc:{wifi:1}},Pleading:{label:"Suppliant",color:"orange",eyes:{s:1.5},mouth:Z1.frown(),acc:{tear:1},spring:"soft",life:{blink:{min:1800,max:3600,double:.5,close:130,open:220},saccade:{range:1}}},Problem:{label:"Problème",color:"orange",mouth:Z1.frown(),acc:{question:1}},Sad:{label:"Triste",color:"orange",mouth:Z1.frown(),spring:"heavy",life:{breath:{rate:.17,amp:.01},saccade:{range:1.6,min:1500,max:4e3},blink:{close:140,open:240}}},Silly:{label:"Farceur",eyeR:{y:59.88},mouth:Object.assign(Z1.line(83.88),O3(86.88)),spring:"bouncy"},Sleeping:{label:"Endormi",color:"gray",eyes:{top:.5},mouth:Z1.O(10,86.88),acc:{z:1},spring:"heavy",life:J2(k3,{breath:{rate:.13,amp:.03},sway:{amp:.3,rate:.15}})},Smiling:{label:"Souriant",eyes:{bot:.5,y:69.88},mouth:Z1.smile(),spring:"soft"},Sweating:{label:"En sueur",mouth:Z1.openD(80.88),acc:{sweat:1},life:{breath:{rate:.55,amp:.016},saccade:{min:400,max:1400,range:3}}},UwU:{label:"UwU",mouth:Z1.uwu(),spring:"bouncy"},WTF:{label:"WTF",color:"orange",eyes:{top:.5},mouth:Z1.line(87.88),life:{saccade:{range:.8,min:2500,max:6e3}}},Winking:{label:"Clin d'œil",eyeR:{top:.5},mouth:Z1.openD(80.88),spring:"bouncy"},WinkingSmile:{label:"Clin d'œil souriant",eyeR:{top:.5},mouth:Z1.smile(),spring:"bouncy"}};function U4(){let M={};Object.assign(M,{"body.x":0,"body.y":0,"body.rot":0,"body.sx":1,"body.sy":1,"body.skew":0,"face.x":0,"face.y":0,"dot.s":0,"dot.dy":0});for(let[V,L]of[["eyeL",33],["eyeR",87]])Object.assign(M,{[V+".x"]:L,[V+".y"]:65.88,[V+".s"]:1,[V+".top"]:0,[V+".bot"]:0,[V+".ang"]:0,[V+".heart"]:0,[V+".cross"]:0,[V+".shine"]:0,[V+".open"]:1});Object.assign(M,{"mouth.x":60,"mouth.s":1,"mouth.rot":0,"mouth.tongue":0,"mouth.talk":0});for(let V of W4)M["acc."+V]=0;return M}var Y5={};for(let M of Object.keys(H5)){let V=H5[M],L=U4(),[r,t,o]=i0(L7[V.color||"blue"]);L["body.L"]=r,L["body.A"]=t,L["body.B"]=o;for(let n of["eyeL","eyeR"]){let Z=Object.assign({},V.eyes||{},V[n]||{});for(let m of Object.keys(Z))L[n+"."+m]=Z[m]}V.dot&&(L["dot.s"]=V.dot);for(let n of Object.keys(V.mouth||{}))L["mouth."+n]=V.mouth[n];for(let n of Object.keys(V.acc||{}))L["acc."+n]=V.acc[n];Y5[M]=L}var L8=Object.keys(H5).map(M=>({id:M,label:H5[M].label,color:L7[H5[M].color||"blue"]}));function e8(M,V){let L=Object.assign({expression:"Normal",life:!0,autoplay:!0,viewBox:"-50 -60 220 230",reducedMotion:null,floor:null,palette:null},V||{}),r=Object.assign({spark:"#ffd23f",star:"#ffd23f",steam:"#c9d3df",puff:"#ffffff",puffEdge:"#b9c6d2",shine:"#ffffff"},L.palette||{}),t=(L.reducedMotion!=null?L.reducedMotion:globalThis.matchMedia&&globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches)?.4:1;for(;M.firstChild;)M.removeChild(M.firstChild);M.setAttribute("viewBox",L.viewBox),M.getAttribute("role")||M.setAttribute("role","img");let o=(d,u,p)=>{let f=document.createElementNS(N6,d);for(let k in u)f.setAttribute(k,u[k]);return p&&p.appendChild(f),f},n=o("g",{class:"casita"},M),Z=o("g",{class:"casita-body"},n),m=o("path",{d:_4,class:"casita-house"},Z),y=o("g",{class:"casita-face",fill:X5},Z),P=[o("path",{},y),o("path",{},y)],S=[0,1,2,3].map(()=>o("circle",{r:0},y)),$=o("circle",{cx:60,cy:65.88,r:0},y),W=o("path",{},y),F=o("path",{},y),y1=o("path",{},y),A=o("g",{class:"casita-acc"},Z),d1=w4.map(()=>o("path",{fill:X5},A)),s2=k4.map(([d,u])=>o("circle",{cx:d,cy:u,r:0},A)),z1=o("g",{},A),F2=o("circle",{cx:95.17,cy:24.83,r:2.76},z1),x1=o("path",{d:U6},z1),p0=o("path",{d:$6},z1),e5=o("path",{d:G6},A),l0=[0,1,2].map(()=>o("path",{d:z6},A)),a=o("g",{class:"casita-particles"},n),C1=new Float64Array($2),x2=new Float64Array($2),F1=new Float64Array($2),K=new Float64Array($2),t1=new Float64Array($2),F3=new Float64Array($2),L3=new Float64Array($2),J1={},k2=null,r1=0,f2=!1,C2=!!L.life,B5=!1,v2=[],u2={},P1=J2(t0),p1=new Map,g2=[],_2={},g=null,a2=null,v1={ax:0,ay:0,since:0,hold:1700,fade:1e3,peak:1,lastReset:-1e9,k:1,init:!1},l1=Array.from({length:8},()=>q1(0,G2)),e3=q1(0,G2),_3=0,R5=q1(800,2500),M3=400,i1=0,c2={x:0,y:0},A2={x:0,y:0},_1=[null,null],M5=[],u5=new Set,E2=Object.assign(U4(),{"mouth.tgX":68,"mouth.tgY":86.88,"mouth.tgH":12});Object.assign(E2,Y5[L.expression]||Y5.Normal),C3.forEach((d,u)=>{K[u]=E2[d]!=null?E2[d]:0,C1[u]=K[u]}),r3(null);function r3(d){for(let u=0;u<$2;u++){let p=F4[u],f=C8[p];d&&V7[d]&&H8.includes(p)&&(f=V7[d]);let k=J1[C3[u]]||J1[p];k&&(f=[k.k!=null?k.k:f[0],k.c!=null?k.c:f[1]]),F3[u]=f[0],L3[u]=f[1]}}let o1=null;function c5(d,...u){(_2[d]||[]).slice().forEach(p=>{try{p(...u)}catch(f){console.error(f)}})}function E3(d){let u=_[d];return u==null&&!u5.has(d)&&(u5.add(d),console.warn("[Casita] unknown param",d)),u}function r5(d,u){u=u||{};let p=Y5[d];if(!p)return console.warn("[Casita] unknown expression",d),f1;let f=k2;k2=d,P1=J2(t0,H5[d].life,u2,u.life),o1=u.spring||H5[d].spring||null,r3(o1);let k=u.stagger!==!1&&!u.instant&&f!=null,z=u.staggerScale!=null?u.staggerScale:1;v2=[];let H1={};for(let X of Object.keys(p)){let u1=_[X];if(u1==null)continue;if(u.instant){K[u1]=p[X],C1[u1]=p[X],x2[u1]=0;continue}let T=k?V8[F4[u1]]*z:0;if(T<=0){K[u1]=p[X];continue}(H1[T]=H1[T]||[]).push([u1,p[X]])}for(let X of Object.keys(H1))v2.push({at:r1+Number(X),items:H1[X]});return f!==d&&c5("expression",d,f),f2&&i5(N2()),f1}function y2(){g2=[...p1.values()].sort((d,u)=>d.priority-u.priority)}function t5(d,u){u=u||{};let p=p1.get(d);if(!p)p={name:d,priority:u.priority||0,post:!!u.post,w:1,fade:null,setV:new Map,addV:new Map,expires:0},p.api={set(f,k){for(let z in f){let H1=E3(z);H1!=null&&p.setV.set(H1,f[z])}return k!=null&&(p.w=k),p.api},add(f,k){for(let z in f){let H1=E3(z);H1!=null&&p.addV.set(H1,f[z])}return k!=null&&(p.w=k),p.api},unset(...f){for(let k of f){let z=_[k];p.setV.delete(z),p.addV.delete(z)}return p.api},clear(){return p.setV.clear(),p.addV.clear(),p.expires=0,p.api},weight(f,k){return k?p.fade={from:p.w,to:f,t0:r1,dur:k}:(p.w=f,p.fade=null),p.api},ttl(f){return p.expires=r1+f,p.api},remove(){p1.delete(d),y2()},get weightValue(){return p.w}},p1.set(d,p),y2();else{let f=!1;u.priority!=null&&u.priority!==p.priority&&(p.priority=u.priority,f=!0),u.post!=null&&(p.post=!!u.post),f&&y2()}return p.api}function D2(d,u){for(let p of g2){if(p.post!==u||p.w<=0)continue;let f=p.w;p.setV.forEach((k,z)=>{d[z]=f>=1?k:B2(d[z],k,f)}),p.addV.forEach((k,z)=>{d[z]+=k*f})}}let F5=(d,u)=>.55*Math.sin(d+l1[u])+.3*Math.sin(d*2.13+l1[u+1])+.15*Math.sin(d*4.37+l1[u+2]);function Q2(d,u){u=u||{};let p=P1.blink,f={t0:r1,close:u.close||p.close,hold:u.hold!=null?u.hold:p.hold,open:u.open||p.open};return d!=="R"&&(_1[0]=Object.assign({},f)),d!=="L"&&(_1[1]=Object.assign({},f)),f.close+f.hold+f.open}function t3(d){if(!d)return 1;let u=r1-d.t0;if(u<0)return 1;if(u<d.close){let z=u/d.close;return 1-z*z}if(u<d.close+d.hold)return 0;let p=(u-d.close-d.hold)/d.open;if(p>=1)return 1;let f=1.3;return 1+(f+1)*Math.pow(p-1,3)+f*Math.pow(p-1,2)}function b2(){let d=0,u=0;if(g){let p=X2+C1[_["body.x"]],f=70+C1[_["body.y"]],k=g[0]-p,z=g[1]-f,H1=Math.hypot(k,z);if(H1>.001){let X=H1/(H1+38);d=k/H1*X*P1.gaze.eye,u=z/H1*X*P1.gaze.eye*.75}}else C2&&P1.saccade.on&&(d=c2.x,u=c2.y);return C2&&(P1.saccade.on||g)&&(d+=A2.x,u+=A2.y),[d*(g?1:t),u*(g?1:t)]}let Z5=[],D=[];function i3(d,u){let p=J0[d]||J0.dot,f=D.pop();f||(f=o("path",{},a)),f.setAttribute("d",p),f.style.display="";let k=Object.assign({kind:d,el:f,age:0,life:1.6,x:60,y:20,vx:0,vy:-16,ax:0,gravity:0,drag:0,rot:0,vrot:0,s0:.4,s1:.6,color:null,sway:0,swayF:3,swayPh:q1(0,G2),fadeIn:.12,fadeOut:.35,orbit:null,opacity:1},u),z=k.color&&r[k.color]?r[k.color]:k.color;f.setAttribute("fill",z||w2);let H1=k.stroke&&r[k.stroke]?r[k.stroke]:k.stroke;return H1?(f.setAttribute("stroke",H1),f.setAttribute("stroke-width",k.strokeWidth||1),f.setAttribute("vector-effect","non-scaling-stroke")):(f.removeAttribute("stroke"),f.removeAttribute("vector-effect")),Z5.push(k),k}let j={heart:{x:60,y:30,vy:-22,life:1.9,s0:.22,s1:.42,sway:4,spread:18},z:{x:100,y:18,vx:7,vy:-14,life:2.6,s0:.25,s1:.55,sway:2.5,spread:4},sparkle:{x:60,y:50,vy:-6,life:.9,s0:.2,s1:.65,vrot:120,spread:50,color:"spark"},star:{x:60,y:30,life:2.2,s0:.75,s1:.75,vrot:160,color:"star"},steam:{x:60,y:4,vy:-18,life:1.2,s0:.5,s1:1.4,sway:3,spread:70,color:"steam",fadeOut:.6},puff:{x:60,y:4,vy:-16,life:1.1,s0:.55,s1:1.25,sway:2.5,spread:70,color:"puff",stroke:"puffEdge",strokeWidth:1.2,fadeOut:.55},tear:{x:33,y:72,vy:4,gravity:90,life:1.1,s0:.45,s1:.4,color:X5,fadeOut:.3},note:{x:78,y:70,vx:10,vy:-16,life:1.8,s0:.45,s1:.6,sway:3,spread:10},dot:{x:60,y:40,vy:-10,life:1,s0:.6,s1:.2}};function _5(d,u){u=u||{};let p=Object.assign({},j[d]||{},u),f=Math.max(1,Math.round((u.count||1)*(t<1?.5:1))),k=p.spread||0,z=[];for(let H1=0;H1<f;H1++){let X=Object.assign({},p),u1=p.x+(k?q1(-k/2,k/2):0),T=p.y+(k?q1(-k/6,k/6):0),l=p.space==="world"?[u1,T]:I5(u1,T);if(X.x=l[0],X.y=l[1],X.vx=(p.vx||0)+(k?q1(-4,4):0),X.vy=(p.vy||0)*(f>1?q1(.8,1.2):1),X.life=p.life*(f>1?q1(.85,1.15):1),p.orbit&&(X.orbit=Object.assign({cx:60,cy:18,r:34,ry:.35,speed:3.2,phase:H1*G2/f},p.orbit)),X.orbit&&p.space!=="world"){let N=I5(X.orbit.cx,X.orbit.cy);X.orbit.cx=N[0],X.orbit.cy=N[1]}delete X.count,delete X.spread,delete X.space,z.push(i3(d,X))}return z}function E5(d){for(let u=Z5.length-1;u>=0;u--){let p=Z5[u];p.age+=d;let f=p.age/p.life;if(f>=1){p.el.style.display="none",D.push(p.el),Z5.splice(u,1);continue}let k,z;if(p.orbit){let T=p.orbit.phase+p.orbit.speed*p.age;k=p.orbit.cx+p.orbit.r*Math.cos(T),z=p.orbit.cy+p.orbit.r*p.orbit.ry*Math.sin(T)}else p.vx+=p.ax*d,p.vy+=p.gravity*d,p.drag&&(p.vx*=1-p.drag*d,p.vy*=1-p.drag*d),p.x+=p.vx*d,p.y+=p.vy*d,k=p.x+p.sway*Math.sin(p.age*p.swayF+p.swayPh),z=p.y;p.rot+=p.vrot*d;let H1=f<.15?1+.25*Math.sin(f/.15*Math.PI):1,X=B2(p.s0,p.s1,x5(f))*H1,u1=G1(f/Math.max(.001,p.fadeIn))*(1-x5((f-(1-p.fadeOut))/Math.max(.001,p.fadeOut)))*p.opacity;p.el.setAttribute("transform","translate("+q(k)+" "+q(z)+") rotate("+q(p.rot)+") scale("+q(X)+")"),p.el.setAttribute("opacity",q(u1))}}function D5(d){return{x:d[_["body.x"]],y:d[_["body.y"]],rot:d[_["body.rot"]],sx:d[_["body.sx"]],sy:d[_["body.sy"]],skew:d[_["body.skew"]]}}let I2=C1;function I5(d,u){let p=D5(I2),f=(d-X2)*p.sx,k=(u-q5)*p.sy;f=f+k*Math.tan(p.skew*Math.PI/180);let z=p.rot*Math.PI/180,H1=Math.cos(z),X=Math.sin(z);return[X2+p.x+f*H1-k*X,q5+p.y+f*X+k*H1]}function S5(d,u){let p=D5(I2),f=d-X2-p.x,k=u-q5-p.y,z=-p.rot*Math.PI/180,H1=Math.cos(z),X=Math.sin(z),u1=f*H1-k*X,T=f*X+k*H1;return f=u1-T*Math.tan(p.skew*Math.PI/180),k=T,[X2+f/(p.sx||1e-6),q5+k/(p.sy||1e-6)]}function D3(d){if(B5)return;if(d=C5(d||0,0,1/20),r1+=d*1e3,f2){i5(N2()),c5("frame",d,r1);return}v2.length&&(v2=v2.filter(T=>{if(r1>=T.at){for(let[l,N]of T.items)K[l]=N;return!1}return!0}));for(let T of g2){if(T.fade){let l=G1((r1-T.fade.t0)/T.fade.dur);T.w=B2(T.fade.from,T.fade.to,x5(l)),l>=1&&(T.fade=null)}T.expires&&r1>=T.expires&&(T.setV.clear(),T.addV.clear(),T.expires=0)}if(C2){let T=P1.saccade;if(T.on&&!g&&r1>=M3){let N=c2.x;if(Math.random()<.35)c2.x=0,c2.y=0;else{let U=q1(0,G2),T1=q1(.35,1)*T.range;c2.x=Math.cos(U)*T1,c2.y=Math.sin(U)*T1*.6}M3=r1+q1(T.min,T.max),P1.blink.on&&Math.abs(c2.x-N)>T.range*.9&&Math.random()<.25&&Q2("both")}if(r1>=i1){let N=(T.micro||0)*1;A2.x=q1(-N,N),A2.y=q1(-N,N)*.7,i1=r1+q1(140,420)}let l=P1.blink;if(l.on&&r1>=R5){let N=Q2("both");Math.random()<l.double&&M5.push(r1+N+q1(50,110)),R5=r1+q1(l.min,l.max)}M5.length&&r1>=M5[0]&&(M5.shift(),Q2("both",{close:P1.blink.close*.8,open:P1.blink.open*.8}))}F1.set(K),D2(F1,!1);let[u,p]=b2(),f=1;if(g)if(a2!=null)f=a2;else{let T=Math.hypot(g[0]-X2-C1[_["body.x"]],g[1]-70-C1[_["body.y"]]);f=G1(1-(T-90)/170)}{g&&(v1.lastTargetAt=r1);let T=!g&&r1-(v1.lastTargetAt||-1e9)<1e3,l=T?v1.ax:g?g[0]:u*10,N=T?v1.ay:g?g[1]:p*10;(!v1.init||Math.hypot(l-v1.ax,N-v1.ay)>15)&&(v1.peak=r1-v1.lastReset>3e3?1:.85,v1.ax=l,v1.ay=N,v1.since=r1,v1.lastReset=r1,v1.init=!0,v1.hold=q1(1500,2e3),v1.fade=q1(800,1200));let U=r1-v1.since;v1.k=U<v1.hold?v1.peak:v1.peak*(1-x5((U-v1.hold)/v1.fade))}let k=f*v1.k;if(u||p){let T=P1.gaze,l=g?C5((g[0]-X2-C1[_["body.x"]])/70,-1,1):u/(T.eye||1);F1[_["eyeL.x"]]+=u,F1[_["eyeR.x"]]+=u,F1[_["eyeL.y"]]+=p,F1[_["eyeR.y"]]+=p;let N=(T.face||0)/(T.eye||1)*(.4+.6*f);F1[_["face.x"]]+=u*N,F1[_["face.y"]]+=p*N,F1[_["body.rot"]]+=l*(T.rot||0)*t*k,F1[_["body.skew"]]+=l*(T.skew||0)*t*k,F1[_["body.x"]]+=l*(T.bx||0)*t*k}let z=Math.max(1,Math.ceil(d/(1/240))),H1=d/z;for(let T=0;T<z;T++)for(let l=0;l<$2;l++){let N=F3[l]*(F1[l]-C1[l])-L3[l]*x2[l];x2[l]+=N*H1,C1[l]+=x2[l]*H1}for(let T=0;T<$2;T++)Number.isFinite(C1[T])||(C1[T]=F1[T],x2[T]=0);if(t1.set(C1),D2(t1,!0),C2){let T=r1/1e3;e3+=d*G2*P1.breath.rate*(1+.18*F5(T*.7,0));let l=Math.sin(e3+.25*Math.sin(e3))*P1.breath.amp*t;t1[_["body.sy"]]*=1+l,t1[_["body.sx"]]*=1-l*.55;let N=P1.sway.amp*t*F5(T*G2*P1.sway.rate*.35,3);t1[_["body.rot"]]+=N*.3,t1[_["body.skew"]]-=N*1.4,t1[_["body.y"]]+=.35*t*F5(T*G2*P1.sway.rate*.27,5),_3+=d}t1[_["body.sy"]]=C5(t1[_["body.sy"]],.86,1.12),t1[_["body.sx"]]=C5(t1[_["body.sx"]],.94,1.08),L.floor!=null&&t1[_["body.y"]]>L.floor&&(t1[_["body.y"]]=L.floor);let X=t3(_1[0]),u1=t3(_1[1]);t1[_["eyeL.open"]]*=X,t1[_["eyeR.open"]]*=u1,_1[0]&&r1-_1[0].t0>_1[0].close+_1[0].hold+_1[0].open&&(_1[0]=null),_1[1]&&r1-_1[1].t0>_1[1].close+_1[1].hold+_1[1].open&&(_1[1]=null),I2=t1,i5(t1),E5(d),c5("frame",d,r1)}function N2(){let d=Y5[k2],u=new Float64Array(K);for(let p of Object.keys(d))u[_[p]]=d[p];return I2=u,u}let w2=X5;function I3(d,u){return{x:d[_[u+".x"]],y:d[_[u+".y"]],s:d[_[u+".s"]],top:d[_[u+".top"]],bot:d[_[u+".bot"]],ang:d[_[u+".ang"]],heart:d[_[u+".heart"]],cross:d[_[u+".cross"]],shine:d[_[u+".shine"]],open:d[_[u+".open"]]}}function A1(d){let u={};for(let p of N4)u[p]=d[_["mouth."+p]];return u}function i5(d){let u=C2&&!f2,[p,f,k]=C7(d[_["body.L"]],d[_["body.A"]],d[_["body.B"]]);w2="rgb("+p+","+f+","+k+")",m.setAttribute("fill",w2);let z=D5(d);Z.setAttribute("transform","translate("+q(z.x+X2)+" "+q(z.y+q5)+") rotate("+q(z.rot)+") skewX("+q(z.skew)+") scale("+Math.round(z.sx*1e4)/1e4+" "+Math.round(z.sy*1e4)/1e4+") translate("+-X2+" "+-q5+")"),y.setAttribute("transform","translate("+q(d[_["face.x"]])+" "+q(d[_["face.y"]])+")");let H1=[I3(d,"eyeL"),I3(d,"eyeR")];for(let T=0;T<2;T++){let l=H1[T];P[T].setAttribute("d",Y0(j6(l,T?1:-1)));let N=G1(l.shine)*Math.max(0,l.s)*G1(l.open)*(1-G1(l.heart))*(1-G1(l.cross));if(N>.01){let Q1=.34*N,w=[d[_["body.L"]],d[_["body.A"]],d[_["body.B"]]],[N5,T2,h5]=C7(B2(q0[0],w[0],Q1),B2(q0[1],w[1],Q1),B2(q0[2],w[2],Q1));P[T].setAttribute("fill","rgb("+N5+","+T2+","+h5+")")}else P[T].hasAttribute("fill")&&P[T].removeAttribute("fill");let U=S[2*T],T1=S[2*T+1];U.setAttribute("cx",q(l.x+2.7*l.s)),U.setAttribute("cy",q(l.y-2.7*l.s*G1(l.open))),U.setAttribute("r",q(2.3*N)),T1.setAttribute("cx",q(l.x-2.5*l.s)),T1.setAttribute("cy",q(l.y+2.4*l.s*G1(l.open))),T1.setAttribute("r",q(1.15*N)),U.setAttribute("fill",r.shine),T1.setAttribute("fill",r.shine)}let X=d[_["dot.s"]];$.setAttribute("cx",q(60+(H1[0].x-33+(H1[1].x-87))/2)),$.setAttribute("cy",q(65.88+(H1[0].y-65.88+(H1[1].y-65.88))/2+d[_["dot.dy"]])),$.setAttribute("r",q(Math.max(0,8*X)));let u1=A1(d);W.setAttribute("d",Y0(Y6(u1))),F.setAttribute("d",Y0(X6(u1))),G(d,u)}function G(d,u){let p=_3,f=l=>d[_["acc."+l]],k=f("bubbles");for(let l=0;l<3;l++){let[N,U,T1]=k4[l],Q1=Math.max(0,(k-l*.25)/(1-l*.25)),w=0;u&&Q1>0&&(Q1*=1+.08*t*Math.sin(p*2.4-l*1.1),w=-1.2*t*Math.sin(p*1.5-l*.8)),s2[l].setAttribute("r",q(T1*Q1)),s2[l].setAttribute("cy",q(U+w)),s2[l].setAttribute("fill",w2)}let z=f("wifi");if(z>.005){z1.style.display="",z1.setAttribute("transform","translate(95.17 24.83) scale("+q(Math.max(0,z))+") translate(-95.17 -24.83)"),z1.setAttribute("fill",w2);let l=1,N=1;if(u){let U=M0(p/1.9);l=U>=.2&&U<.75?1:.2,N=U>=.4&&U<.75?1:.2}x1.setAttribute("opacity",q(l)),p0.setAttribute("opacity",q(N)),F2.setAttribute("opacity","1"),z1.setAttribute("opacity",q(G1(z*1.5)))}else z1.style.display="none";let H1=f("question");if(H1>.005){e5.style.display="";let l=u?9*t*Math.sin(p*2.2):0,N=u?-1.4*t*Math.abs(Math.sin(p*2.2)):0;e5.setAttribute("transform","translate(104.5 "+q(29.4+N)+") rotate("+q(l)+") scale("+q(Math.max(0,H1))+") translate(-104.5 -29.4)"),e5.setAttribute("fill",w2)}else e5.style.display="none";let X=f("z");for(let l=0;l<3;l++){let N=l0[l];if(X<=.005||l>0&&!u){N.style.display="none";continue}if(N.style.display="",N.setAttribute("fill",w2),l===0){let U=u?-1.2*t*Math.sin(p*1.4):0,T1=u?4*t*Math.sin(p*.9):0;N.setAttribute("transform","translate(101.5 "+q(16.5+U)+") rotate("+q(T1)+") scale("+q(Math.max(0,X))+") translate(-101.5 -16.5)"),N.setAttribute("opacity",q(G1(X*1.5)))}else{let U=M0(p/3+l*.5),T1=101.5+8+U*14+2*Math.sin(U*7+l),Q1=16.5-6-U*26,w=X*(.32+.3*U);N.setAttribute("transform","translate("+q(T1)+" "+q(Q1)+") rotate("+q(-8+16*U)+") scale("+q(w)+") translate(-101.5 -16.5)"),N.setAttribute("opacity",q(G1(U/.2)*G1((1-U)/.4)*G1(X)))}}let u1=f("tear");if(u1>.005){let l=u1,N=0,U=1,T1=1;if(u){let Q1=M0(p/4.2);if(Q1<.25)l*=.45+.55*x5(Q1/.25);else if(Q1>.68){let w=(Q1-.68)/.32;N=16*w*w,U=1-x5((w-.4)/.6)}T1=1+.05*Math.sin(p*9)}y1.setAttribute("d",R4(Q0[0],Q0[1]+N,Q0[2]*l*T1)),y1.setAttribute("opacity",q(U))}else y1.setAttribute("d","");let T=f("sweat");for(let l=0;l<2;l++){let[N,U,T1]=w4[l];if(T<=.005){d1[l].setAttribute("d","");continue}let Q1=T,w=0,N5=1;if(u){let T2=M0(p/(2.4+l*.5)+l*.37);if(T2<.2)Q1*=.5+.5*x5(T2/.2);else if(T2>.55){let h5=(T2-.55)/.45;w=9*h5*h5,N5=1-x5((h5-.5)/.5)}}d1[l].setAttribute("d",R4(N,U+w,T1*Q1)),d1[l].setAttribute("opacity",q(N5))}}let H2=0,h1=0,Z2=!1;function Y1(d){H2=globalThis.requestAnimationFrame(Y1),h1||(h1=d);let u=(d-h1)/1e3;h1=d,D3(u)}function K2(){Z2||B5||(Z2=!0,h1=0,H2=globalThis.requestAnimationFrame(Y1))}function n2(){Z2=!1,H2&&globalThis.cancelAnimationFrame(H2),H2=0}function P2(){document.hidden?Z2&&(n2(),Z2="paused"):Z2==="paused"&&(Z2=!1,K2())}L.autoplay&&(document.addEventListener("visibilitychange",P2),K2());let f1={el:{svg:M,world:n,body:Z,house:m,face:y,eyes:P,mouth:W,tongue:F,particles:a},get expression(){return k2},get frozen(){return f2},get lifeOn(){return C2},get clock(){return r1},setExpression:r5,layer:t5,lookAt(d,u,p){return g=d==null?null:[d,u],a2=p&&p.lean!=null?G1(p.lean):null,f1},get gazeLean(){return{habituation:v1.k,explicit:a2}},get looking(){return g?g.slice():null},blink(d){return d=d||{},Q2(d.eye||"both",d),d.double&&M5.push(r1+(d.close||P1.blink.close)+(d.hold||P1.blink.hold)+(d.open||P1.blink.open)+70),f1},wink(d){return Q2(d==="L"?"L":"R",{close:90,hold:220,open:200}),f1},impulse(d){d=d||{};let u={x:"body.x",y:"body.y",rot:"body.rot",sx:"body.sx",sy:"body.sy",skew:"body.skew",fx:"face.x",fy:"face.y"};for(let p in d){let f=u[p]||p,k=_[f];k!=null&&(x2[k]+=d[p])}return f1},squash(d,u){return t5("_squash",{priority:50}).add({"body.sy":-d,"body.sx":d*.6}).ttl(u||90),f1},life(d){return C2=d==null?!C2:!!d,C2||(c2.x=c2.y=A2.x=A2.y=0),f1},setLife(d){return u2=J2(u2,d),P1=J2(t0,H5[k2].life,u2),f1},get lifeProfile(){return J2(P1)},freeze(d){if(f2=d==null?!f2:!!d,f2)Z5.splice(0).forEach(u=>{u.el.style.display="none",D.push(u.el)}),i5(N2());else{let u=N2();C1.set(u),x2.fill(0),K.set(u),v2=[]}return f1},accessory(d,u){let p=t5("_acc",{priority:90});return u==null?p.unset("acc."+d):p.set({["acc."+d]:u===!0?1:u===!1?0:u}),f1},emit:_5,tint(d,u){let p=t5("_tint",{priority:80});if(d==null)return p.clear(),f1;let[f,k,z]=i0(d);return p.set({"body.L":f,"body.A":k,"body.B":z},u??1),f1},setPalette(d){return Object.assign(r,d||{}),f1},setState(d,u,p){let f=_[d];return f!=null&&(C1[f]=u,p!=null&&(x2[f]=p)),f1},spring(d,u){return J1[d]=u,r3(o1),f1},get(d){return I2[_[d]]},target(d){return F1[_[d]]},velocity(d){return x2[_[d]]},get params(){return C3.slice()},get bodyColor(){return w2},houseToWorld:I5,worldToHouse:S5,clientToSvg(d,u){let p=M.getScreenCTM();if(!p)return[0,0];let f=M.createSVGPoint();f.x=d,f.y=u;let k=f.matrixTransform(p.inverse());return[k.x,k.y]},on(d,u){return(_2[d]=_2[d]||[]).push(u),f1},off(d,u){return _2[d]=(_2[d]||[]).filter(p=>p!==u),f1},step(d){return D3(d),f1},start:K2,stop:n2,destroy(){for(B5=!0,n2(),document.removeEventListener("visibilitychange",P2);M.firstChild;)M.removeChild(M.firstChild)}};return k2=null,r5(Y5[L.expression]?L.expression:"Normal",{instant:!0}),i5(C1),f1}var v5={hexToOklab:i0,oklabToRgb:C7,create:e8,EXPRESSIONS:L8,POSES:H5,COLORS:L7,FACE:X5,HOUSE_D:_4,SHAPES:Object.keys(J0),PARAMS:C3.slice(),PRESETS:Object.keys(V7),LIFE_DEFAULT:t0};var V5=class extends l2{constructor(){super(...arguments);this.expression="Normal";this.controlled=!1;this.reducedMotion=!1;this.label="Casita"}get face(){return this._face}firstUpdated(){this._create()}connectedCallback(){super.connectedCallback(),this.hasUpdated&&!this._face&&this._create()}disconnectedCallback(){super.disconnectedCallback(),this._face?.destroy(),this._face=void 0}updated(L){L.has("expression")&&this._face&&!this.controlled&&this._face.expression!==this.expression&&this._face.setExpression(this.expression)}_create(){this._face=v5.create(this.svg,{expression:this.expression,life:!0,autoplay:!this.controlled,reducedMotion:this.reducedMotion,floor:0}),this.dispatchEvent(new CustomEvent("face-ready",{detail:{face:this._face}}))}render(){return c1`<svg role="img" aria-label=${this.label} part="svg"></svg>`}};V5.styles=q2`
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
  `,Y([s1()],V5.prototype,"expression",2),Y([s1({type:Boolean})],V5.prototype,"controlled",2),Y([s1({type:Boolean,attribute:"reduced-motion"})],V5.prototype,"reducedMotion",2),Y([s1()],V5.prototype,"label",2),Y([O2("svg",!0)],V5.prototype,"svg",2);s5("casita-face",V5);var H3=["joy","excitement","energy","affection","irritation","curiosity"],M8=["Normal","Alert","Angry","Scared","Cheeky","DeadAss","Dead","Devious","Focusing","Grateful","Grinning","Happy","Hurt","Initializing","Loading","Loving","NoInternet","Pleading","Problem","Sad","Silly","Sleeping","Smiling","Sweating","UwU","WTF","Winking","WinkingSmile"],T3=M=>typeof M=="string"&&M8.includes(M),G4=async M=>{let V=await M.callWS({type:"casita/info"});return V&&Array.isArray(V.entries)?{version:V.version,entries:V.entries.filter(L=>L&&L.entry_id)}:V&&V.entry_id?{version:V.version,entries:[{title:"Casita",...V}]}:{version:V?.version,entries:[]}},a0=(M,V)=>V?M?.entries.find(L=>L.conversation_entity===V):void 0,z4=(M,V)=>a0(M,V)??M?.entries[0],Q4=(M,V,L)=>{let r=M.title||"Casita";if(V.filter(o=>(o.title||"Casita")===r).length<2)return r;let t=M.llm_agent?L?.states[M.llm_agent]?.attributes.friendly_name||M.llm_agent:void 0;return`${r} (${t??M.conversation_entity??M.entry_id})`};var K4=(M,V)=>{if(!V)return;let L={},r=0;for(let t of H3){let o=V.mood_entities[t],n=o?M.states[o]:void 0,Z=n?parseFloat(n.state):NaN;Number.isFinite(Z)&&(L[t]=Z,r++)}return r?L:void 0},o0=class{constructor(V,L=2e3){this._send=V;this._windowMs=L;this._last=new Map;this._pending=new Map;this._timers=new Map}report(V,L=.5){let r=Date.now(),t=this._last.get(V)??-1/0,o=Math.max(0,Math.min(1,L));if(r-t>=this._windowMs&&!this._timers.has(V)){this._last.set(V,r),this._send(V,$4(o));return}if(this._pending.set(V,Math.min(1,(this._pending.get(V)??0)+o)),!this._timers.has(V)){let n=Math.max(0,t+this._windowMs-r);this._timers.set(V,setTimeout(()=>{this._timers.delete(V);let Z=this._pending.get(V)??0;this._pending.delete(V),Z>0&&(this._last.set(V,Date.now()),this._send(V,$4(Z)))},n))}}dispose(){this._timers.forEach(V=>clearTimeout(V)),this._timers.clear(),this._pending.clear()}},$4=M=>Math.round(M*100)/100;var L5=class extends l2{constructor(){super(...arguments);this.heading="";this.narrow=!1;this._prev=new Map;this._lit=new Map}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._litTimer),this._prev.clear(),this._lit.clear()}willUpdate(L){if(!L.has("hass")&&!L.has("entry"))return;let r=L.has("entry"),t=Date.now();for(let o of H3){let n=this._value(o),Z=this._prev.get(o);n!==void 0&&(!r&&Z!==void 0&&Math.abs(n-Z)>=.005&&this._lit.set(o,t),this._prev.set(o,n))}r&&this._lit.clear(),[...this._lit.values()].some(o=>t-o<1e3)&&(clearTimeout(this._litTimer),this._litTimer=setTimeout(()=>this.requestUpdate(),1e3))}_value(L){let r=this.entry?.mood_entities[L],t=r?this.hass?.states[r]:void 0,o=t?parseFloat(t.state):NaN;return Number.isFinite(o)?o:void 0}render(){let L=this.strings,r=H3.map(o=>[o,this._value(o)]),t=r.some(([,o])=>o!==void 0);return c1`
      <div class="hud" role="group" aria-label=${this.heading?`${L.mood} — ${this.heading}`:L.mood}>
        ${this.heading?c1`<p class="heading">${this.heading}</p>`:""}
        ${t?r.map(([o,n])=>{let Z=o==="joy",m=n??0,y=Z?Math.abs(m)*50:Math.max(0,Math.min(1,m))*100,P=Z?m<0?50-y:50:0,S=n===void 0?"—":Z?`${m>=0?"+":"−"}${Math.abs(m).toFixed(2)}`:m.toFixed(2),$=this.entry?.mood_entities[o],W=Date.now()-(this._lit.get(o)??0)<1e3;return c1`<div class="row ${Z?"div":""} ${W?"lit":""} m-${o}" title=${$??""}>
                <span class="name">${L.moodNames[o]}</span>
                <span class="bar" role="meter" aria-label=${L.moodNames[o]} aria-valuemin=${Z?-1:0} aria-valuemax="1" aria-valuenow=${m.toFixed(2)}
                  ><i style="left:${P}%;width:${y}%"></i
                ></span>
                <span class="val">${S}</span>
              </div>`}):c1`<p class="empty">${L.moodUnavailable}</p>`}
      </div>
    `}};L5.styles=q2`
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
  `,Y([s1({attribute:!1})],L5.prototype,"hass",2),Y([s1({attribute:!1})],L5.prototype,"entry",2),Y([s1()],L5.prototype,"heading",2),Y([s1({attribute:!1})],L5.prototype,"strings",2),Y([s1({type:Boolean,reflect:!0})],L5.prototype,"narrow",2);s5("casita-mood-hud",L5);var e7="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";var M7="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z";var r7="M7.5,4A5.5,5.5 0 0,0 2,9.5C2,10 2.09,10.5 2.22,11H6.3L7.57,7.63C7.87,6.83 9.05,6.75 9.43,7.63L11.5,13L12.09,11.58C12.22,11.25 12.57,11 13,11H21.78C21.91,10.5 22,10 22,9.5A5.5,5.5 0 0,0 16.5,4C14.64,4 13,4.93 12,6.34C11,4.93 9.36,4 7.5,4V4M3,12.5A1,1 0 0,0 2,13.5A1,1 0 0,0 3,14.5H5.44L11,20C12,20.9 12,20.9 13,20L18.56,14.5H21A1,1 0 0,0 22,13.5A1,1 0 0,0 21,12.5H13.4L12.47,14.8C12.07,15.81 10.92,15.67 10.55,14.83L8.5,9.5L7.54,11.83C7.39,12.21 7.05,12.5 6.6,12.5H3Z";var t7="M7,10L12,15L17,10H7Z";var i7="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z";var o7="M2,21L23,12L2,3V10L17,12L2,14V21Z";var a7="M18,18H6V6H18V18Z";var r2=class extends l2{constructor(){super(...arguments);this.warningBusy=!1;this.open=!1;this._onClose=()=>{this.dispatchEvent(new CustomEvent("closed"))};this._backdrop=L=>{L.target===this._dialog&&this._close()}}updated(L){let r=this._dialog;!L.has("open")||!r||(this.open&&!r.open?(r.showModal(),r.querySelector("select")?.focus()):!this.open&&r.open&&r.close())}_change(L){let r=L.target.value,t=r?{pipeline_id:r}:{};this.dispatchEvent(new CustomEvent("settings-changed",{detail:{settings:t}}))}_close(){this._dialog?.close()}render(){let L=this.strings;if(!L||!this.hass)return c1`<dialog></dialog>`;let r=this.pipelines?.pipelines??[],t=this.pipelines?.preferred_pipeline,o=r.find(m=>m.id===(this.defaultId??t)),n=o?`${o.name} (${o.id===t?L.preferred:L.byDefault})`:`Assist (${L.preferred})`,Z=this.settings?.pipeline_id;return c1`
      <dialog aria-labelledby="title" @close=${this._onClose} @click=${this._backdrop}>
        <div class="head">
          <h2 id="title">${L.settingsTitle}</h2>
          <button class="icon" type="button" aria-label=${L.close} @click=${this._close}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d=${e7}></path></svg>
          </button>
        </div>
        <div class="body">
          <div class="field">
            <div class="select">
              <label for="pipeline">${L.pipeline}</label>
              <select id="pipeline" aria-describedby="pipeline-help" .value=${Z??""} @change=${this._change}>
                <option value="" ?selected=${!Z}>${n}</option>
                ${r.map(m=>c1`<option value=${m.id} ?selected=${Z===m.id}>${m.name}</option>`)}
              </select>
              <svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d=${t7}></path></svg>
            </div>
            <span class="help" id="pipeline-help">${L.pipelineHelp}</span>
            ${this.warning?c1`<div class="warning" role="note">
                  <span id="warning-text">${this.warning}</span>
                  ${this.warningAction?c1`<button
                        type="button"
                        class="fix"
                        aria-describedby="warning-text"
                        ?disabled=${this.warningBusy}
                        @click=${()=>this.dispatchEvent(new CustomEvent("warning-action"))}
                      >
                        ${this.warningAction}
                      </button>`:""}
                  ${this.warningNote?c1`<span class="warning-note">${this.warningNote}</span>`:""}
                  ${this.warningError?c1`<span class="warning-error" role="alert">${this.warningError}</span>`:""}
                </div>`:""}
            ${this.note?c1`<span class="note" role="note">${this.note}</span>`:""}
          </div>
          <p class="foot">${L.savedUser}</p>
        </div>
      </dialog>
    `}};r2.styles=q2`
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
  `,Y([s1({attribute:!1})],r2.prototype,"hass",2),Y([s1({attribute:!1})],r2.prototype,"strings",2),Y([s1({attribute:!1})],r2.prototype,"settings",2),Y([s1({attribute:!1})],r2.prototype,"pipelines",2),Y([s1()],r2.prototype,"warning",2),Y([s1()],r2.prototype,"warningAction",2),Y([s1()],r2.prototype,"warningNote",2),Y([s1()],r2.prototype,"warningError",2),Y([s1({type:Boolean})],r2.prototype,"warningBusy",2),Y([s1()],r2.prototype,"note",2),Y([s1()],r2.prototype,"defaultId",2),Y([s1({type:Boolean})],r2.prototype,"open",2),Y([O2("dialog")],r2.prototype,"_dialog",2);s5("casita-settings-dialog",r2);var B3=(M,V)=>{switch(M){case"sunny":return V==="night"?"clear":"sun";case"clear-night":return"clear";case"partlycloudy":return"partly";case"cloudy":case"exceptional":return"cloud";case"rainy":return"rain";case"pouring":return"pour";case"lightning":case"lightning-rainy":return"storm";case"snowy":return"snow";case"snowy-rainy":return"sleet";case"hail":return"hail";case"fog":return"fog";case"windy":case"windy-variant":return"wind";default:return"clear"}};var j4=M=>/^fr\b/i.test(M??"")?"fr":"en",r8={title:"Casita",mood:"Humeur",moodShow:"Afficher l’humeur",moodHide:"Masquer l’humeur",settings:"Réglages",close:"Fermer",chatLabel:"Parle à Casita",chatPh:"Parle à Casita…",send:"Envoyer",micStart:"Parler à Casita au micro",micStop:"Arrêter l’écoute",stageLabel:"Casita, dans sa pièce",stageHelp:"Espace ou Entrée pour le piquer, flèches pour le faire regarder ailleurs.",exprAria:"Casita, expression : ",settingsTitle:"Réglages de Casita",pipeline:"Assistant",pipelineHelp:"L’assistant utilisé quand tu parles à Casita ici.",preferred:"préféré",notCasita:"Cet assistant n’utilise pas Casita : il parlera sans personnalité ni émotions.",byDefault:"par défaut",emptyTalk:"Pour me parler, crée un assistant qui m’utilise comme agent de conversation.",createAssistant:"Créer l’assistant Casita",creating:"Création…",openAssistants:"Régler dans les assistants",askAdmin:"Demande à un administrateur de créer un assistant Casita.",createFailed:"Impossible de créer l’assistant.",assistantReady:"Merci ! On peut parler maintenant.",localWarning:"Avec cet assistant, les commandes simples (« allume la lumière ») ne passent pas par Casita : il n’y réagit pas.",fixLocal:"Corriger",fixing:"Correction…",askAdminFix:"Demande à un administrateur de corriger cet assistant.",fixFailed:"Impossible de corriger l’assistant.",none:"Aucun",savedUser:"Enregistré pour ton utilisateur.",moodNames:{joy:"Joie",excitement:"Excitation",energy:"Énergie",affection:"Affection",irritation:"Agacement",curiosity:"Curiosité"},moodUnavailable:"Capteurs d’humeur indisponibles : Casita utilise son humeur locale.",micUnsupported:"Le micro demande une connexion sécurisée (HTTPS).",micDenied:"Accès au micro refusé.",micNotFound:"Aucun micro trouvé.",micInUse:"Le micro est déjà utilisé.",micError:"Le micro ne répond pas.",noPipeline:"Aucun assistant vocal configuré.",noTts:"Cet assistant n’a pas de synthèse vocale : Casita répond par écrit.",ouch:"Aïe !",hey:"Hé…",stop:"Arrête !",hmph:"Pfff.",more:"Encore ?",tooMuch:"Trop !",achoo:"Atchoum !",back:"Te revoilà !",missed:"Tu m’as manqué !",hello:"Salut ! Moi c’est Casita.",late:"Il est tard…",re:"Re !",reName:"Re, {n} !",shyHi:"Oh… coucou.",notUnderstood:"Je n’ai pas compris.",oops:"Oups, ça n’a pas marché.",oopsNet:"Oups, je n’arrive pas à joindre la maison.",hugLines:["Encore un peu…","Mmmh.","Je t’aime bien, toi."],rain:["Oh, il pleut…","Il pleut."],snow:["De la neige !","Il neige !"],thunder:["Ouh !","Eek !"],sun:["Il fait beau !"],goodMorning:"Bonjour !",labels:{Normal:"Content",Alert:"En alerte",Angry:"Fâché",Scared:"Apeuré",Cheeky:"Coquin",DeadAss:"Blasé",Dead:"K.O.",Devious:"Espiègle",Focusing:"Concentré",Grateful:"Reconnaissant",Grinning:"Rayonnant",Happy:"Heureux",Hurt:"Blessé",Initializing:"Démarrage",Loading:"Réfléchit",Loving:"Amoureux",NoInternet:"Hors ligne",Pleading:"Suppliant",Problem:"Perplexe",Sad:"Triste",Silly:"Rigolo",Sleeping:"Endormi",Smiling:"Souriant",Sweating:"Gêné",UwU:"UwU",WTF:"Interloqué",Winking:"Clin d’œil",WinkingSmile:"Clin d’œil souriant"}},t8={title:"Casita",mood:"Mood",moodShow:"Show mood",moodHide:"Hide mood",settings:"Settings",close:"Close",chatLabel:"Talk to Casita",chatPh:"Talk to Casita…",send:"Send",micStart:"Talk to Casita with the microphone",micStop:"Stop listening",stageLabel:"Casita, in his room",stageHelp:"Space or Enter to poke him, arrow keys to make him look around.",exprAria:"Casita, expression: ",settingsTitle:"Casita settings",pipeline:"Assistant",pipelineHelp:"The assistant used when you talk to Casita here.",preferred:"preferred",notCasita:"This assistant doesn’t use Casita: he’ll talk without personality or emotions.",byDefault:"default",emptyTalk:"To talk with me, create an assistant that uses me as its conversation agent.",createAssistant:"Create Casita assistant",creating:"Creating…",openAssistants:"Set up in assistants",askAdmin:"Ask an administrator to create a Casita assistant.",createFailed:"Couldn’t create the assistant.",assistantReady:"Thanks! We can talk now.",localWarning:'With this assistant, simple commands ("turn on the light") skip Casita: he won’t react to them.',fixLocal:"Fix",fixing:"Fixing…",askAdminFix:"Ask an administrator to fix this assistant.",fixFailed:"Couldn’t fix the assistant.",none:"None",savedUser:"Saved for your user.",moodNames:{joy:"Joy",excitement:"Excitement",energy:"Energy",affection:"Affection",irritation:"Irritation",curiosity:"Curiosity"},moodUnavailable:"Mood sensors unavailable: Casita uses his local mood.",micUnsupported:"The microphone needs a secure connection (HTTPS).",micDenied:"Microphone access denied.",micNotFound:"No microphone found.",micInUse:"The microphone is already in use.",micError:"The microphone does not respond.",noPipeline:"No voice assistant set up.",noTts:"This assistant has no text-to-speech: Casita answers in writing.",ouch:"Ouch!",hey:"Hey…",stop:"Stop it!",hmph:"Hmph.",more:"More?",tooMuch:"Too much!",achoo:"Achoo!",back:"You’re back!",missed:"I missed you!",hello:"Hi! I’m Casita.",late:"It’s late…",re:"Hey again!",reName:"Hey again, {n}!",shyHi:"Oh… hi.",notUnderstood:"I didn’t get that.",oops:"Oops, that didn’t work.",oopsNet:"Oops, I can’t reach the house.",hugLines:["A little longer…","Mmmh.","I like you."],rain:["Oh, it’s raining…","Rain."],snow:["Snow!","It’s snowing!"],thunder:["Eek!","Whoa!"],sun:["Sunshine!"],goodMorning:"Good morning!",labels:{Normal:"Content",Alert:"Alert",Angry:"Angry",Scared:"Scared",Cheeky:"Cheeky",DeadAss:"Deadpan",Dead:"K.O.",Devious:"Devious",Focusing:"Focused",Grateful:"Grateful",Grinning:"Grinning",Happy:"Happy",Hurt:"Hurt",Initializing:"Starting up",Loading:"Thinking",Loving:"In love",NoInternet:"Offline",Pleading:"Pleading",Problem:"Puzzled",Sad:"Sad",Silly:"Silly",Sleeping:"Asleep",Smiling:"Smiling",Sweating:"Sweating",UwU:"UwU",WTF:"WTF",Winking:"Winking",WinkingSmile:"Wink & smile"}},R2={fr:r8,en:t8};function q4(M,V){let L="http://www.w3.org/2000/svg",r=(C,H,e)=>C<H?H:C>e?e:C,t=C=>r(C,0,1),o=(C,H,e)=>C+(H-C)*e,n=(C,H)=>C+Math.random()*(H-C),Z=C=>C[Math.floor(Math.random()*C.length)],m=C=>(C=t(C),C*C*(3-2*C)),y=C=>C<=0||C>=1?0:Math.sin(Math.PI*C),P=V.reducedMotion,S=P?.35:1,$=v5.FACE,W=v5.EXPRESSIONS.map(C=>C.id),{stage:F,svg:y1,face:A,bubble:d1,bubbleText:s2}=M,z1=V.lang,F2=R2[z1],x1=C=>F2[C],p0=(C,H)=>String(x1(C)).replace("{n}",H),e5=V.userName,l0=Array.from({length:16},()=>n(0,6.283)),a=0,C1=0,x2=0,F1=[];function K(C,H,e){F1.push({at:a+C,fn:H,tag:e||null})}function t1(C){for(let H=F1.length-1;H>=0;H--)F1[H].tag===C&&F1.splice(H,1)}function F3(){for(let C=0;C<F1.length;C++)if(a>=F1[C].at){let H=F1.splice(C,1)[0];C--;try{H.fn()}catch(e){console.error(e)}}}let L3="casita.v1",J1=(()=>{let C=null;try{C=JSON.parse(localStorage.getItem(L3)||"null")}catch{C=null}return(!C||typeof C!="object")&&(C={}),Object.assign({visits:0,firstSeen:null,lastSeen:null,affection:.3,pokesTotal:0,petsSeconds:0},C)})();function k2(){J1.lastSeen=Date.now(),J1.affection=g.F;try{localStorage.setItem(L3,JSON.stringify(J1))}catch{}}let r1=(()=>{let C=new Date().getHours();return C>=6&&C<9?"dawn":C>=9&&C<18?"day":C>=18&&C<21?"dusk":"night"})(),f2=null,C2=()=>r1==="night";function B5(){return r1==="dawn"?.8:r1==="day"?.7:r1==="dusk"?.5:.25}let v2=["V","A","E","F","I","C"],u2={V:[-1,1],A:[0,1],E:[0,1],F:[0,1],I:[0,1],C:[0,1]},P1={V:"joy",A:"excitement",E:"energy",F:"affection",I:"irritation",C:"curiosity"},p1={V:.25,A:.35,E:B5(),F:t(J1.affection),I:0,C:.3};p1.V=.25+.1*p1.F;let g2={V:0,A:0,E:0,F:0,I:0,C:0},_2={V:0,A:0,E:0,F:0,I:0,C:0},g={...p1,asleep:!1},a2=!1;function v1(){for(let C of v2)g[C]=r(p1[C]+g2[C]+_2[C],u2[C][0],u2[C][1])}function l1(C){for(let H of v2){let e=C[H];e&&(a2?g2[H]=r(g2[H]+e,u2[H][0]-p1[H],u2[H][1]-p1[H]):p1[H]=r(p1[H]+e,u2[H][0],u2[H][1]))}v1()}function e3(C){if(a2){let H=Math.exp(-C/6);for(let e of v2)g2[e]*=H}else{let H=(e,i,v)=>e+(i-e)*(1-Math.exp(-C/v));p1.V=H(p1.V,.25+.1*p1.F,40),p1.A=H(p1.A,.35,12),p1.E=H(p1.E,B5(),120),g.asleep&&(p1.E=t(p1.E+.02*C)),p1.I=H(p1.I,0,8),p1.C=H(p1.C,.3,15)}v1()}function _3(C){if(!C){if(a2)for(let H of v2)p1[H]=g[H],g2[H]=0;a2=!1;return}for(let H of v2){let e=C[P1[H]];if(e==null||!Number.isFinite(e))continue;let i=r(e,u2[H][0],u2[H][1]);a2&&Math.abs(i-p1[H])>.005&&(g2[H]*=.3),p1[H]=i}if(!a2)for(let H of v2)g2[H]=0;a2=!0,v1()}function R5(C){if(!P||!C)return C;let H={};for(let e in C)H[e]=e.startsWith("body.")&&e!=="body.L"&&e!=="body.A"&&e!=="body.B"||e==="face.x"||e==="face.y"?C[e]*S:C[e];return H}{let C=A.impulse;A.impulse=H=>C(R5(H))}let M3=v5.hexToOklab(v5.COLORS.blue);A.spring("dot.s",{k:900,c:60});let i1={s:2,x0:-60,y0:-80,w:240,h:230,pxW:480,pxH:460},c2=.76,A2={left:0,top:0,right:0,bottom:0};function _1(){let C=y1.getBoundingClientRect();A2={left:C.left,top:C.top,right:C.right,bottom:C.bottom}}function M5(){let C=F.getBoundingClientRect(),H=Math.max(200,C.width),e=Math.max(240,C.height),i=r(Math.min(H*.5,e*.42),120,340),v=i/120,h=H/v,O=e/v;i1.s=v,i1.w=h,i1.h=O,i1.pxW=H,i1.pxH=e,i1.x0=60-h/2,i1.y0=116.88-c2*O,y1.setAttribute("viewBox",[i1.x0,i1.y0,h,O].map(b=>b.toFixed(2)).join(" ")),F.style.setProperty("--floor-y",(c2*100).toFixed(1)+"%"),F.style.setProperty("--house-w",i.toFixed(1)+"px"),_1()}let u5=(C,H)=>[(C-i1.x0)*i1.s,(H-i1.y0)*i1.s];function E2(C,H){return[i1.x0+(C-A2.left)/i1.s,i1.y0+(H-A2.top)/i1.s]}function r3(C,H){let e=Math.max(0,A2.left-C,C-A2.right,A2.top-H,H-A2.bottom);return e>0?t(1-e/120)*.7:1}let o1=(C,H,e)=>{let i=document.createElementNS(L,C);for(let v in H)i.setAttribute(v,String(H[v]));return e&&e.appendChild(i),i},c5=o1("defs",{});y1.insertBefore(c5,y1.firstChild);let E3=o1("clipPath",{id:"casita-house-clip"},c5);o1("path",{d:v5.HOUSE_D},E3);let r5=o1("ellipse",{cx:60,cy:117.6,rx:54,ry:4.6,class:"casita-shadow"});y1.insertBefore(r5,A.el.world);let y2=o1("g",{class:"casita-extras"},A.el.body),t5=o1("radialGradient",{id:"casita-glow-grad"},c5);o1("stop",{offset:"0",style:"stop-color: var(--glow); stop-opacity: .75"},t5),o1("stop",{offset:"0.55",style:"stop-color: var(--glow); stop-opacity: .28"},t5),o1("stop",{offset:"1",style:"stop-color: var(--glow); stop-opacity: 0"},t5);let D2=o1("ellipse",{cx:60,cy:64,rx:0,ry:0,fill:"url(#casita-glow-grad)"});A.el.world.insertBefore(D2,A.el.body);let F5=o1("g",{class:"casita-extras-face"});A.el.face.insertBefore(F5,A.el.face.firstChild);let Q2={cloud:"#9fb0c0"};function t3(){let C=getComputedStyle(F),H=(e,i)=>C.getPropertyValue(e).trim()||i;Q2={cloud:H("--cloud","#9fb0c0")},A.setPalette({spark:H("--spark","#ffd23f"),star:H("--star-fx","#ffd23f"),steam:H("--steam","#8fa3b5"),puff:H("--puff","#ffffff"),puffEdge:H("--puff-edge","#b9c6d2"),shine:H("--shine","#ffffff")})}let b2=(C,H)=>({x:0,v:0,t:0,k:C||260,c:H||18});function Z5(C,H){let e=C.k*(C.t-C.x)-C.c*C.v;return C.v+=e*H,C.x+=C.v*H,C.x}let D={blush:{g:o1("g",{opacity:0},F5),sp:b2(80,16)},bang:{g:o1("g",{},y2),sp:b2(320,14)},vein:{g:o1("g",{},y2),sp:b2(260,16)},dots:{g:o1("g",{},y2),sp:b2(200,20)},bandage:{g:o1("g",{},y2),sp:b2(300,15)},cloud:{g:o1("g",{},y2),sp:b2(60,14)},dream:{g:o1("g",{},y2),sp:b2(160,14)},rings:{g:o1("g",{},y2),sp:b2(120,18)},scan:{g:o1("g",{"clip-path":"url(#casita-house-clip)"},y2),sp:b2(120,22)},glow:{g:D2,sp:b2(40,12)}};o1("ellipse",{cx:22,cy:80,rx:6,ry:3.2,style:"fill: var(--blush)"},D.blush.g),o1("ellipse",{cx:98,cy:80,rx:6,ry:3.2,style:"fill: var(--blush)"},D.blush.g),D.bangEls=[o1("rect",{x:-2.6,y:-16,width:5.2,height:12,rx:2.6},D.bang.g),o1("circle",{cx:0,cy:1,r:2.8},D.bang.g)],o1("path",{d:"M-7,-2.5Q-2.5,-2.5 -2.5,-7M2.5,-7Q2.5,-2.5 7,-2.5M7,2.5Q2.5,2.5 2.5,7M-2.5,7Q-2.5,2.5 -7,2.5",fill:"none",stroke:$,"stroke-width":2.4,"stroke-linecap":"round"},D.vein.g),D.dotEls=[0,1,2].map(C=>o1("circle",{cx:48+C*12,cy:-10,r:0},D.dots.g));for(let C of[45,-45])o1("rect",{x:-9,y:-3,width:18,height:6,rx:3,fill:$,transform:"rotate("+C+")"},D.bandage.g);D.cloudBody=o1("path",{d:"M-16,4a7,7 0 0,1 2,-13.6a9,9 0 0,1 17,-2.6a7,7 0 0,1 12,6.2a5.6,5.6 0 0,1 -1,10Z"},D.cloud.g),D.rain=[0,1,2].map(C=>o1("rect",{x:-9+C*9,y:8,width:2,height:5,rx:1},D.cloud.g)),D.dreamEls={a:o1("circle",{cx:96,cy:8,r:2.6},D.dream.g),b:o1("circle",{cx:103,cy:-2,r:4.2},D.dream.g),c:o1("circle",{cx:116,cy:-22,r:15},D.dream.g),icon:o1("path",{fill:$,d:""},D.dream.g)};let i3={heart:"M116,-15.5l-6.4,-6.4a4,4 0 0,1 6.4,-4.9a4,4 0 0,1 6.4,4.9Z",sun:"M116,-26.5a4.5,4.5 0 1,0 0.01,0ZM116,-34v3M116,-13v3M104,-22h3M125,-22h3M107.5,-30.5l2,2M122.5,-15.5l2,2M107.5,-13.5l2,-2M122.5,-28.5l2,-2",bulb:"M116,-31a6.5,6.5 0 0,1 4,11.6v2.4h-8v-2.4a6.5,6.5 0 0,1 4,-11.6ZM112.5,-15h7v2.4h-7Z",house:"M107.5,-14v-8.5l8.5,-8l8.5,8v8.5Z"};D.ringEls=[0,1].map(()=>o1("path",{d:"M-10,-4A12,12 0 0,1 10,-4",fill:"none","stroke-width":2.4,"stroke-linecap":"round"},D.rings.g)),D.scanEl=o1("rect",{x:0,y:0,width:120,height:10,fill:$,opacity:.12},D.scan.g);let j={blush:0,bang:0,vein:0,dots:0,bandage:0,cloud:0,dream:0,rings:0,scan:0,glow:0},_5=0,E5=1,D5=-9,I2="heart",I5=0;function S5(){D5=a,D.bang.sp.x=0,D.bang.sp.v=0}function D3(C){let H=A.bodyColor;for(let a1 of Object.keys(j))D[a1].sp.t=j[a1];let e=a-D5<1.2;D.bang.sp.t=e?1:0;for(let a1 of Object.keys(j))Z5(D[a1].sp,Math.min(C,1/30));let i=a1=>Math.max(0,D[a1].sp.x);D.blush.g.setAttribute("opacity",(t(i("blush"))*(.42+.08*Math.sin(a*1.9))).toFixed(3));let v=i("bang");D.bang.g.setAttribute("transform","translate(108 "+(-14-1.5*Math.sin(a*5)).toFixed(2)+") rotate(12) scale("+v.toFixed(3)+")"),D.bangEls.forEach(a1=>a1.setAttribute("fill",H)),D.bang.g.style.display=v<.01?"none":"";let h=i("vein");D.vein.g.setAttribute("transform","translate(84 44) scale("+(h*(1+.18*(.5+.5*Math.sin(a*9.4)))).toFixed(3)+")"),D.vein.g.style.display=h<.01?"none":"";let O=i("dots");D.dotEls.forEach((a1,k1)=>{let n1=t(a%2.4/.4-k1);a1.setAttribute("r",(3*O*m(n1)).toFixed(2)),a1.setAttribute("fill",H)});let b=i("bandage");D.bandage.g.setAttribute("transform","translate(76 26) rotate(-8) scale("+b.toFixed(3)+")"),D.bandage.g.style.display=b<.01?"none":"";let M1=i("cloud");D.cloud.g.setAttribute("transform","translate("+(60+3*Math.sin(a*.6)).toFixed(2)+" -26) scale("+M1.toFixed(3)+")"),D.cloud.g.style.display=M1<.01?"none":"",D.cloudBody.setAttribute("fill",Q2.cloud),D.rain.forEach((a1,k1)=>{let n1=(a*1.3+k1*.37)%1;a1.setAttribute("y",(8+n1*14).toFixed(2)),a1.setAttribute("opacity",(1-n1).toFixed(2)),a1.setAttribute("fill",Q2.cloud)});let Q=i("dream");if(D.dream.g.style.display=Q<.01?"none":"",Q>=.01){D.dream.g.setAttribute("opacity",t(Q).toFixed(3));let a1=1.2*Math.sin(a*1.7);D.dreamEls.a.setAttribute("r",(2.6*t(Q*3)).toFixed(2)),D.dreamEls.b.setAttribute("r",(4.2*t(Q*3-1)).toFixed(2)),D.dreamEls.c.setAttribute("r",(15*t(Q*3-2)).toFixed(2)),D.dreamEls.c.setAttribute("cy",(-22+a1).toFixed(2));for(let k1 of["a","b","c"])D.dreamEls[k1].setAttribute("fill",H);D.dreamEls.icon.setAttribute("d",i3[I2]),D.dreamEls.icon.setAttribute("transform","translate(0 "+a1.toFixed(2)+")"),D.dreamEls.icon.setAttribute("opacity",t(Q*3-2).toFixed(2)),D.dreamEls.icon.setAttribute("stroke",I2==="sun"?$:"none"),D.dreamEls.icon.setAttribute("stroke-width","2")}let J=i("rings");D.rings.g.style.display=J<.01?"none":"",J>=.01&&(I5+=C*E5,D.ringEls.forEach((a1,k1)=>{let n1=(I5/.8+k1*.5)%1,K1=1+.9*n1,L2=k1?1:-1;a1.setAttribute("transform","translate("+(60+L2*30)+" "+(22-8*n1)+") rotate("+L2*38+") scale("+K1.toFixed(3)+")"),a1.setAttribute("stroke",H),a1.setAttribute("opacity",(J*(1-n1)).toFixed(3))}));let V1=i("scan");if(D.scan.g.style.display=V1<.01?"none":"",V1>=.01){let a1=a/1.6%1;D.scanEl.setAttribute("y",(-10+a1*130).toFixed(2)),D.scanEl.setAttribute("opacity",(.14*V1).toFixed(3))}let O1=i("glow");if(D2.style.display=O1<.01?"none":"",O1>=.01){let a1=A.get("body.x")||0,k1=A.get("body.y")||0,n1=1+.04*Math.sin(a*7)*Math.sin(a*2.3);D2.setAttribute("cx",(60+a1).toFixed(2)),D2.setAttribute("cy",(64+k1).toFixed(2)),D2.setAttribute("rx",(110*O1*n1).toFixed(2)),D2.setAttribute("ry",(100*O1*n1).toFixed(2))}let R1=A.get("body.x")||0,o2=A.get("body.y")||0,V2=1/(1+Math.max(0,-o2)/55);r5.setAttribute("cx",(60+R1).toFixed(2)),r5.setAttribute("rx",(54*V2*(A.get("body.sx")||1)).toFixed(2)),r5.setAttribute("ry",(4.6*V2).toFixed(2)),r5.setAttribute("opacity",(.9*V2).toFixed(3))}let N2=[],w2=-9,I3={heart:1.9,z:2.6,sparkle:.9,star:2.2,steam:1.2,puff:1.1,tear:1.1,note:1.8,dot:1};function A1(C,H,e){H=H||{};for(let h=N2.length-1;h>=0;h--)N2[h]<=a&&N2.splice(h,1);let i=H.count||1;if(!e&&N2.length+i>7)return!1;if(P&&!e){if(a-w2<.5)return!1;w2=a}A.emit(C,H);let v=H.life||I3[C]||2;for(let h=0;h<i;h++)N2.push(a+v*1.15);return!0}let i5=A.layer("posture",{priority:5}),G=A.layer("sig",{priority:10}),H2=A.layer("sigp",{priority:10,post:!0}),h1=A.layer("act",{priority:20}),Z2=A.layer("actp",{priority:20,post:!0}),Y1=A.layer("react",{priority:30}),K2=A.layer("reactp",{priority:30,post:!0}),n2=A.layer("mood",{priority:32}),P2=A.layer("sys",{priority:35}),f1=A.layer("talk",{priority:40}),d=A.layer("drag",{priority:60});for(let C of[G,H2,h1,Z2,Y1,K2,n2,P2]){let H=C.add;C.add=(e,i)=>H(R5(e),i)}let u=A.layer("dragp",{priority:60,post:!0}),p=A.layer("weather",{priority:31});{let C=p.add;p.add=(H,e)=>C(R5(H),e)}let f={Happy:{"body.sy":.02},Grinning:{"body.sy":.02},Grateful:{"body.y":.5},DeadAss:{"body.sy":-.02},Devious:{"eyeL.ang":8,"eyeR.ang":8,"body.L":-.035},Alert:{"body.sy":.04,"eyeL.s":.1,"eyeR.s":.1},Scared:{"body.sy":-.05,"body.y":2,"eyeL.s":-.12,"eyeR.s":-.12},Angry:{"body.sy":.04,"eyeL.ang":12,"eyeR.ang":12},Hurt:{"body.sy":-.03,"body.rot":-4},Sad:{"body.sy":-.03,"body.y":1.5,"eyeL.y":2.5,"eyeR.y":2.5,"eyeL.top":.16,"eyeR.top":.16,"eyeL.ang":-12,"eyeR.ang":-12},NoInternet:{"body.rot":3},Pleading:{"body.rot":-5,"eyeL.shine":1,"eyeR.shine":1},Focusing:{"eyeL.ang":-6,"eyeR.ang":-6},Sleeping:{"body.sy":-.03,"body.y":1},Initializing:{"body.A":-.4*M3[1],"body.B":-.4*M3[2]}},k={Loving:"heart",Dead:"cross",Hurt:"cross",Initializing:"none",Angry:"half",Sleeping:"half",WTF:"half",Devious:"half",Smiling:"low",Grateful:"low",DeadAss:"wink",Winking:"wink",WinkingSmile:"wink",Pleading:"big"},z=C=>k[C]||"circle";function H1(C){let H=4/C;A.spring("color",{k:H*H,c:2*H})}let X=C=>{let H={};for(let e in C)H["mouth."+e]=C[e];return H},u1=(C,H)=>X({tY:H,tR:C,tA:C,tH:-C,tD:0,bY:H,bR:C,bA:C,bH:C,bD:0,tongue:0,s:1,rot:0}),T=(C,H)=>X({tY:C-3,tR:H,tA:H,tH:0,tD:0,bY:C+3,bR:H,bA:H,bH:0,bD:0,tongue:0}),l={system:null,acute:null,flavor:null,auto:"Normal",autoAt:-99,flavorCool:0,lastFlavor:null,miss:!1,source:"auto"},N=V.autonomous,U="Normal",T1=0,Q1={};function w(C,H,e){l.acute=Object.assign({id:C,until:a+H},e||{})}function N5(){return l.system?(l.source=l.system.tag,l.system.id):l.acute&&a<l.acute.until?(l.source="react",l.acute.id):(l.acute=null,l.source="mood",g.asleep?"Sleeping":l.flavor&&C1<l.flavor.until?l.flavor.id:(l.flavor=null,l.miss?"Sad":l.auto))}function T2(C,H){H=H||{};let e=U;if(e===C)return;H1(C==="Sleeping"?1.5:C==="Sad"||e==="Sad"?.6:C==="Angry"||C==="Hurt"||C==="Scared"?.12:e==="Sleeping"?.8:.3),z(e)!==z(C)&&!H.noBlink&&A.blink({close:80,hold:70,open:140}),A.setExpression(C,{spring:H.spring}),e==="Loading"&&(A.setState("dot.s",0,0),A.layer("dotOff",{priority:98}).set({"dot.s":0}).ttl(250)),U=C,T1=a,Q1={},i5.clear(),f[C]&&i5.add(f[C]),h5(C,e,H),M.onExpression?.(C)}function h5(C,H,e){H==="Sleeping"&&C!=="Sleeping"&&!e.quiet&&e.startle&&(A.impulse({y:-200*S,sy:3}),S5(),A.blink({double:!0})),C==="Angry"&&(A.impulse({sy:2.4*S,sx:1.2*S}),A.layer("flush",{priority:33}).set({"body.L":-.06}).weight(1).weight(0,420),A1("puff",{count:2,x:60,y:6})),C==="Sad"&&A.impulse({sy:-1.6*S,y:30*S}),(C==="Happy"||C==="Grinning"||C==="Loving")&&!e.noHop&&f5(.9),C==="Loving"&&A1("heart",{count:3,x:60,y:2,spread:60}),C==="Dead"&&A.impulse({sy:-3.5*S,rot:60*S}),C==="Alert"&&(A.impulse({y:-110*S,sy:1.8*S}),S5()),(C==="Winking"||C==="WinkingSmile")&&A1("sparkle",{x:104,y:56,life:.5,color:A.bodyColor})}let l7=A.layer("hop",{priority:55,post:!0}),o5={on:!1,t0:0,H:6};function f5(C){C=(C||1)*S,!(o5.on&&a-o5.t0<.5)&&Object.assign(o5,{on:!0,t0:a,H:6*C+1.5})}function n9(){if(l7.clear(),!o5.on)return;let C=a-o5.t0,H=.12,e=.17+.03*o5.H,i=.18,v=0,h=0;if(C<H)h=-.06*m(C/H);else if(C<H+e){let O=(C-H)/e;v=-o5.H*4*O*(1-O),h=O<.5?.06*(1-O*2):.03*(O-.5)*2}else if(C<H+e+i){let O=(C-H-e)/i;h=-.07*Math.sin(Math.PI*Math.min(1,O*1.6))*(1-O)}else{o5.on=!1,A.impulse({sy:1.2});return}l7.add({"body.y":v,"body.sy":h*S,"body.sx":-h*.5*S})}let m7=-9;function d9(){let C=l.auto,H=e=>C===e?.08:0;return g.I>.75-H("Angry")?"Angry":g.I>.45-H("WTF")-H("DeadAss")?g.E<.4?"DeadAss":"WTF":g.A>.85-H("Scared")&&g.V<-.2+H("Scared")?"Scared":g.V>.7-H("Loving")&&g.F>.6-H("Loving")?"Loving":g.V>.6-H("Grinning")-H("Happy")&&g.A>.6-H("Grinning")-H("Happy")?C==="Happy"||C==="Grinning"?C:Math.random()<.5?"Grinning":"Happy":g.V>.4-H("Happy")-H("Smiling")?g.A>.45?"Happy":"Smiling":g.V<-.4+H("Sad")?"Sad":g.V<-.15+H("Problem")&&g.C>.5-H("Problem")?"Problem":"Normal"}function p9(){if(C1-m7<.7)return;m7=C1;let C=d9();if(C!==l.auto&&C1-l.autoAt>=2.5&&(l.auto=C,l.autoAt=C1),N&&!l.flavor&&C1>l.flavorCool&&(l.auto==="Normal"||l.auto==="Smiling"||l.auto==="Happy")&&g.V>.3&&!g.asleep&&Math.random()<.12){let H=["Cheeky","Silly","UwU","WinkingSmile"].concat(g.I>.1?["Devious"]:[]).filter(i=>i!==l.lastFlavor),e=Z(H);l.flavor={id:e,until:C1+n(4,7)},l.lastFlavor=e,l.flavorCool=l.flavor.until+8}}let c={inside:!1,type:"mouse",cx:0,cy:0,wx:60,wy:60,vx:0,vy:0,speed:0,samples:[],press:null,lastMove:-9,leftAt:null,hoverHouse:!1,lean:1},a5=0;function E1(C){if(!(N1.forced&&!C)){if(a5=C1,N1.on&&F7(),B1.name==="fallAsleep"&&(C||!N1.forced)){g5(null),p5(C==="sudden"?"startle":"gentle");return}g.asleep&&C&&p5(C==="sudden"?"startle":"gentle")}}function l9(C,H,e){if(e=e||0,C<-e||C>120+e||H>116.88+e||H<-e)return!1;if(H>=52)return!0;let i=Math.abs(C-60)-2;return H>=i-e*1.4}function N3(C,H,e){let[i,v]=A.worldToHouse(C,H),h=l9(i,v,e||0),O=null;return h&&(Math.hypot(i-33,v-65.88)<9.5||Math.hypot(i-87,v-65.88)<9.5?O="eye":O=v<52?"roof":"face"),{hit:h,hx:i,hy:v,region:O}}function W5(C,H,e){let i=c.samples,v=a-C,h=0,O=0;for(let b=1;b<i.length;b++){if(i[b].t<v)continue;let M1=e==="y"?i[b].y-i[b-1].y:i[b].x-i[b-1].x,Q=Math.max(.001,i[b].t-i[b-1].t);if(Math.abs(M1)<2||Math.abs(M1)/Q<H)continue;let J=Math.sign(M1);O&&J!==O&&h++,O=J}return h}function s7(C){let H=c.samples,e=a-C,i=0;for(let v=1;v<H.length;v++)H[v].t>=e&&(i+=Math.hypot(H[v].x-H[v-1].x,H[v].y-H[v-1].y));return i}let B1={name:null,t0:0,dur:0,run:null,end:null,st:{}};function g5(C,H,e,i){if(B1.end&&B1.name)try{B1.end(B1.st,!0)}catch(v){console.error(v)}if(Y1.clear(),K2.clear(),!C){Object.assign(B1,{name:null,run:null,end:null,st:{}});return}Object.assign(B1,{name:C,t0:a,dur:H,run:e,end:i,st:{}})}function m9(C){if(Y1.clear(),K2.clear(),!B1.name)return;let H=a-B1.t0;if(H>=B1.dur){let e=B1.end,i=B1.st;B1.name=null,B1.run=null,B1.end=null,e&&e(i,!1);return}B1.run&&B1.run(H,H/B1.dur,B1.st,C)}let D1=(C,H)=>{try{M.onInteract(C,t(H))}catch{}},W2=[];function x7(C){E1("sudden");let H=C&&C.hx!=null?C.hx<60?1:-1:Math.random()<.5?1:-1;A.impulse({rot:H*150*S,sy:-2.8*S,sx:1.4*S}),A.squash(.08*S,90),A.blink({close:50,hold:60,open:120}),J1.pokesTotal++;for(let v=W2.length-1;v>=0;v--)a-W2[v]>4&&W2.splice(v,1);let e=!W2.length||a-W2[W2.length-1]>1.5;if(W2.push(a),l1(e?{V:.03,A:.2,I:.08,C:.1}:{V:-.05,A:.15,I:.18}),D1("poke",C&&C.region==="eye"?.5:e?.25:.35),C&&C.region==="eye"){l1({I:.1}),w("Hurt",.7),U1(x1("ouch"),{short:!0});return}C&&C.region==="roof"&&A1("star",{x:C.hx,y:C.hy-8,life:.7,s0:.6,s1:.2,vy:-20},!0);let i=W2.length;i===1?w("Alert",.9):i===2?w(Math.random()<.5?"Cheeky":"Silly",1.5):i<=4?(w("WTF",1.5),i===4&&U1(x1("hey"),{short:!0})):i<=7?(w("Angry",2.5),i===5&&U1(x1("stop"),{short:!0}),A1("puff",{count:2,x:60,y:4})):s9()}function s9(){w("WTF",3.4),U1(x1("hmph"),{short:!0}),g5("sulk",3.4,C=>{let H=m(C/.4)*(1-m((C-2.9)/.5));Y1.add({"body.rot":-8*H,"eyeL.top":.5*H,"eyeR.top":.5*H,"face.x":-4*H}),C>2.6&&C<3.1&&Y1.add({"eyeR.top":-.4})},()=>{W2.length=0})}function x9(){E1("sudden"),W2.pop(),D1("poke",.1),Math.random()<.7?(w("Winking",1.1),K(.15,()=>A.wink("R"))):w("Devious",1.1)}let j2=null;function v9(){E1("gentle"),j2={t0:a},w("Smiling",30),j.blush=1}function u9(){if(!j2)return;let C=m((a-j2.t0)/1);Y1.add({"body.sy":-.12*C*S,"body.sx":.06*C*S}),l1({V:.002,F:7e-4,I:-.002})}function v7(){if(!j2)return;let C=a-j2.t0;j2=null,j.blush=0,A.impulse({sy:3.2*S}),l1({V:.15,F:.04,I:-.1}),D1("hug",r(C/3,.3,1)),g.F>.4?(w("Loving",2),A1("heart",{count:3,x:60,y:0,spread:70})):g.F<.2?w("Sweating",1.5):w("Happy",1.4),C>2&&U1(Z(x1("hugLines")),{short:!0})}let W1={on:!1,t0:0,last:-9,px:0,total:0,heartAt:0,reportAt:0};function W3(C){W1.on||(W1.on=!0,W1.t0=a,W1.heartAt=a+1.5,W1.reportAt=a+.5,E1("gentle")),W1.last=a,W1.px=C}function c9(C){if(!W1.on)return;if(a-W1.last>1){W1.on=!1,j.blush=0,g.F>.5&&a-W1.t0>1.5&&(w("Pleading",.8),U1(x1("more"),{short:!0}),K(.8,()=>w("Happy",1.2)));return}let H=a-W1.t0;W1.total+=C,J1.petsSeconds+=C,l1({V:.12*C,A:-.05*C,F:.05*C,I:-.15*C}),a>=W1.reportAt&&(W1.reportAt=a+.5,D1("pet",.15)),j.blush=t(H/.8);let e=m(H/.5),i=r((W1.px-(60+(A.get("body.x")||0)))/40,-1,1)*5;Y1.add({"eyeL.bot":.5*e,"eyeR.bot":.5*e,"eyeL.y":4*e,"eyeR.y":4*e,"body.rot":i}),P||K2.add({"body.x":.25*Math.sin(a*2*Math.PI*24),"body.sy":.012*Math.sin(a*2.4)}),w(H>4?"Loving":"Smiling",1.2),H>1.5&&a>=W1.heartAt&&(A1("heart",{x:n(30,90),y:-2,count:1}),W1.heartAt=a+.8)}let I1={on:!1,t0:0,last:-9,px:60,over:!1,refract:0,reportAt:0};function U3(C){a<I1.refract||(I1.on||(I1.on=!0,I1.t0=a,I1.over=!1,I1.reportAt=a+.5,E1("sudden")),I1.last=a,I1.px=C)}function Z9(C){if(!I1.on)return;if(a-I1.last>.6){I1.on=!1,I1.over||w("Happy",1.2);return}let H=a-I1.t0;if(l1({V:.15*C,A:.2*C,E:-.03*C,F:.01*C,I:-.05*C}),a>=I1.reportAt&&(I1.reportAt=a+.5,D1("tickle",.2)),H>6&&!I1.over){I1.over=!0,I1.on=!1,I1.refract=a+4,D1("tickle",.6),w("Dead",2.6),U1(x1("tooMuch"),{short:!0}),K(2.6,()=>w("Happy",1.4));return}w("Grinning",.8);let e=r((60+(A.get("body.x")||0)-I1.px)/30,-1,1)*6;Y1.add({"eyeL.bot":.45,"eyeR.bot":.45,"eyeL.y":3,"eyeR.y":3,"body.rot":e}),P||K2.add({"body.y":1.2*Math.sin(a*2*Math.PI*8),"body.rot":1.2*Math.sin(a*2*Math.PI*6.5)}),j.blush=1,H>3&&Math.random()<C*1.2&&A1("tear",{x:Z([22,98]),y:70,count:1})}let X1={since:null,on:!1,t0:0,until:0,cool:0,id:null};function u7(){return!c.inside||c.press||!c.hoverHouse||c.type!=="mouse"||W1.on||I1.on||j2||I.on||y5()||B1.name||l.acute&&l.acute.tag!=="shy"||l.system||g.I>.3||g.asleep||U==="Angry"||U==="Sleeping"}function S9(){if(X1.on){if(a>X1.until||u7()||c.speed>400){X1.on=!1,X1.cool=a+14,l.acute&&l.acute.tag==="shy"&&(l.acute=null);return}let C=a-X1.t0;j.blush=1,n2.add({"eyeL.bot":.35,"eyeR.bot":.35,"eyeL.y":2.5,"eyeR.y":2.5,"body.rot":C<.6?-2:1});return}if(u7()||c.speed>150||a<X1.cool){X1.since=null;return}X1.since==null&&(X1.since=a),a-X1.since>.8&&(X1.on=!0,X1.t0=a,X1.until=a+2.6,X1.since=null,X1.id=g.F>.6?"Loving":g.F<.3?"Sweating":"Smiling",w(X1.id,2.6,{tag:"shy"}),E1("gentle"))}let I={on:!1,bx0:0,by0:0,wx0:0,wy0:0,vx:0,vy:0,revs:[],shaken:!1,lastDir:0,t0:0,tx:null,ty:null},R={on:!1,x:0,y:0,vx:0,vy:0,rot:0,vr:0,impacts:0,hard:0,shaken:!1,settleT:0},U5=[[0,116.88],[0,64],[5.3,51.6],[54.7,2.2],[60,0],[65.3,2.2],[114.7,51.6],[120,64],[120,116.88]];function m0(C,H,e,i,v,h){let O=e*Math.PI/180,b=Math.cos(O),M1=Math.sin(O),Q=Math.tan((h||0)*Math.PI/180),J=1/0,V1=-1/0,O1=1/0,R1=-1/0;for(let[o2,h2]of U5){let V2=(o2-60)*i,a1=(h2-116.88)*v;V2+=a1*Q;let k1=60+C+V2*b-a1*M1,n1=116.88+H+V2*M1+a1*b;k1<J&&(J=k1),k1>V1&&(V1=k1),n1<O1&&(O1=n1),n1>R1&&(R1=n1)}return{x0:J,x1:V1,y0:O1,y1:R1}}function s0(){return{L:i1.x0+4,R:i1.x0+i1.w-4,T:i1.y0+5,F:116.88}}function c7(C){let H=s0(),e=0,i=0;return C.x0<H.L?e=H.L-C.x0:C.x1>H.R&&(e=H.R-C.x1),C.y0<H.T?i=H.T-C.y0:C.y1>H.F&&(i=H.F-C.y1),[e,i]}let U2=(C,H)=>{let e=A.get(C);return e??H},Z7=A.layer("clampp",{priority:99,post:!0}),o3=[0,0];function h9(){let C=U2("body.x",0)-o3[0],H=U2("body.y",0)-o3[1],[e,i]=c7(m0(C,H,U2("body.rot",0),U2("body.sx",1),U2("body.sy",1),U2("body.skew",0)));o3=[e,i],Z7.clear(),(e||i)&&Z7.add({"body.x":o3[0],"body.y":o3[1]})}function x0(C,H){E1("sudden"),R.on=!1,s.live&&w7(),Object.assign(I,{on:!0,bx0:A.get("body.x")||0,by0:A.get("body.y")||0,wx0:C,wy0:H,vx:0,vy:0,revs:[],shaken:!1,lastDir:0,t0:a,tx:null,ty:null}),A.spring("body.x",{k:260,c:22}),A.spring("body.y",{k:260,c:22}),F.classList.add("grabbing"),w("Alert",99),l1({A:.2,C:.1})}function $3(C,H,e,i){let v=I.bx0+(C-I.wx0),h=Math.min(0,I.by0+(H-I.wy0)),O=r(e/80,-15,15)*S,b=1+r(Math.abs(i)/2e3,0,.12)*S,[M1,Q]=c7(m0(v,h,O,1,b,0));v+=M1,h+=Q,I.tx=v,I.ty=h,I.vx=e,I.vy=i;let J=Math.hypot(e,i),V1=Math.sign(e);for(Math.abs(e)>900&&V1&&V1!==I.lastDir&&(I.lastDir&&I.revs.push(a),I.lastDir=V1);I.revs.length&&a-I.revs[0]>.9;)I.revs.shift();I.revs.length>=4&&(I.shaken=!0),I.shaken?w("Dead",99):J>1800?w("Scared",99):J>300&&g.V>.3?w("Grinning",99):a-I.t0>.4&&w("Alert",99),J>1800&&l1({A:.01})}function f9(){if(!I.on)return;d.set({"body.x":I.tx!=null?I.tx:I.bx0,"body.y":I.ty!=null?I.ty:I.by0,"body.rot":r(I.vx/80,-15,15)}),u.add({"body.sy":r(Math.abs(I.vy)/2e3,0,.12)*S,"body.sx":-r(Math.abs(I.vy)/4e3,0,.06)*S});let C=r(I.vx/500,-1,1),H=r(I.vy/500,-1,1);A.lookAt(60+(A.get("body.x")||0)+C*80,66+(A.get("body.y")||0)+H*80)}function S7(){if(!I.on)return;I.on=!1,F.classList.remove("grabbing");let C=i1.s,H=r(I.vx,-3e3,3e3)/C,e=r(I.vy,-3e3,3e3)/C,i=I.shaken;if(i&&(l1({V:-.25,A:.4,E:-.05,F:-.05,I:.35}),D1("shake",.8)),s.live){k7(H,e,H*.006),Object.assign(s,{shaken:i,lively:!0,thrownAt:a}),!i&&Math.hypot(H,e)>60/C&&(l1({V:.05,A:.3,E:-.02,C:.1}),D1("throw",r(Math.hypot(I.vx,I.vy)/3e3,.2,1))),w(i?"Dead":"Alert",i?99:.3);return}if(P||Math.hypot(H,e)<60/C){d.clear(),v0(),i?G3(n(2.5,4)):w(g.V>.3?"Happy":"Normal",.8);return}d.clear(),Object.assign(R,{on:!0,x:A.get("body.x")||0,y:A.get("body.y")||0,vx:H,vy:e,rot:A.get("body.rot")||0,vr:H*.9,impacts:0,hard:0,shaken:i,settleT:0}),l1({V:.05,A:.3,E:-.02,C:.1}),i||D1("throw",r(Math.hypot(I.vx,I.vy)/3e3,.2,1)),w(Math.hypot(I.vx,I.vy)>1800?"Scared":g.V>.3?"Grinning":"Alert",99)}function g9(C){if(!R.on)return;let H=i1.s,e=2600/H,i=s0();R.vy+=e*C,R.x+=R.vx*C,R.y+=R.vy*C,R.vr*=Math.exp(-C*1.2),R.rot+=R.vr*C,R.rot=r(R.rot,-25*S,25*S);let v=m0(R.x,R.y,R.rot,U2("body.sx",1),U2("body.sy",1),0),h=b=>{let M1=Math.abs(b)*H;M1>300&&(R.impacts++,A.impulse({sy:-Math.min(M1/4e3,.14)*30*S,sx:Math.min(M1/4e3,.14)*15*S}),M1>1400?(R.hard++,R.hard>=2&&(w("Hurt",1),l1({V:-.25,A:.4,I:.35}),R.hard===2&&D1("shake",.5),j.bandage=1,K(4,()=>{j.bandage=0}))):M1>700&&w("Alert",.6))};v.x0<i.L&&(R.x+=i.L-v.x0,R.vx<0&&(h(R.vx),R.vx=-R.vx*.45,R.vr=-R.vr*.6)),v.x1>i.R&&(R.x-=v.x1-i.R,R.vx>0&&(h(R.vx),R.vx=-R.vx*.45,R.vr=-R.vr*.6)),v.y0<i.T&&(R.y+=i.T-v.y0,R.vy<0&&(h(R.vy),R.vy=-R.vy*.45));let O=!1;v.y1>i.F&&(R.y-=v.y1-i.F,O=!0,R.vy>0&&(h(R.vy),R.vy=-R.vy*.45,R.vx*=.85,R.vr*=.6,Math.abs(R.vy)*H<160&&(R.vy=0)),R.rot*=.82),R.y=Math.min(0,R.y),O&&Math.abs(R.vy)<1&&(R.settleT+=C),A.setState("body.x",R.x,R.vx),A.setState("body.y",R.y,R.vy),d.set({"body.x":R.x,"body.y":R.y,"body.rot":R.rot}),R.settleT>.25&&Math.abs(R.vx)*H<120&&(R.on=!1,d.clear(),v0(),R.shaken?G3(n(2.5,4)):R.hard>=2?w("Hurt",1.2):w(g.V>.2?"Happy":"Normal",1))}function v0(){A.spring("body.x",{k:60,c:14}),A.spring("body.y",{k:60,c:14}),K(2.2,()=>{A.spring("body.x",null),A.spring("body.y",null)},"home"),A.lookAt(null)}function G3(C){w("Dead",C),A1("star",{count:3,orbit:{cx:60,cy:-6,r:22,ry:.27,speed:4.5},life:C},!0),g5("dizzy",C,(H,e)=>{Y1.add({"body.rot":4*Math.sin(H*3.8),"body.x":1.5*Math.sin(H*3.8+1.57)}),H>C-.5&&Y1.add({"body.rot":8*Math.sin(H*44)*(1-e)*4})})}let u0=9.81,A5=1800,E={t:0,vote:.3,gx:0,gy:-u0,ax:0,ay:u0,az:0,revs:{x:[],y:[]},dir:{x:0,y:0},shaking:!1,strongAt:-9,freeT:0},h7=navigator.userAgent||"",y9=/iPad|iPhone|iPod/.test(h7)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1,f7=()=>y9?-1:/Android/.test(h7)||E.vote>=0?1:-1;function g7(){return(+(screen.orientation?screen.orientation.angle:window.orientation)||0)*Math.PI/180}function c0(C,H){let e=g7(),i=Math.cos(e),v=Math.sin(e),h=f7();return[(C*i-H*v)*h,-(C*v+H*i)*h]}let y7=0;function b7(C){y7++;let H=C.accelerationIncludingGravity;if(!H||H.x==null||H.y==null)return;let e=performance.now()/1e3,i=r(e-(E.t||e-.016),.005,.1);E.t=e;let v=H.z||0,h=g7(),O=H.x*Math.sin(h)+H.y*Math.cos(h)+v;if(Math.abs(O)>6){let n1=E.vote>=0;E.vote=r(E.vote+Math.sign(O)*i,-1,1),n1!==E.vote>=0&&(E.gx=-E.gx,E.gy=-E.gy)}let[b,M1]=c0(H.x,H.y),Q=1-Math.exp(-i/.025);E.ax+=(-b-E.ax)*Q,E.ay+=(-M1-E.ay)*Q,E.az+=(Math.abs(v)-E.az)*Q;let J=C.acceleration,V1=!!J&&J.x!=null&&J.y!=null,[O1,R1]=V1?c0(H.x-J.x,H.y-J.y):[b,M1],o2=1-Math.exp(-i/.2);E.gx+=(O1-E.gx)*o2,E.gy+=(R1-E.gy)*o2;let[h2,V2]=V1?c0(J.x,J.y):[b-E.gx,M1-E.gy],a1=Math.hypot(H.x,H.y,v);if(E.freeT=a1<2.5?E.freeT+i:0,E.freeT>.12&&!I.on&&(E1("sudden"),w("Scared",1.2),E.freeT=-1),I.on)return;for(let[n1,K1]of[["x",h2],["y",V2]]){if(Math.abs(K1)<14)continue;let L2=Math.sign(K1);for(L2!==E.dir[n1]&&(E.dir[n1]&&E.revs[n1].push(a),E.dir[n1]=L2);E.revs[n1].length&&a-E.revs[n1][0]>1;)E.revs[n1].shift()}let k1=Math.hypot(h2,V2);k1>14&&(E.strongAt=a),k1>9&&E1("sudden"),!E.shaking&&Math.max(E.revs.x.length,E.revs.y.length)>=4&&(E.shaking=!0,E1("sudden")),E.shaking&&w("Dead",99)}let a3=A.layer("phys",{priority:57,post:!0}),i2=(()=>{let C=0,H=0,e=0;for(let O=0;O<U5.length;O++){let[b,M1]=U5[O],[Q,J]=U5[(O+1)%U5.length],V1=b*J-Q*M1;C+=V1,H+=(b+Q)*V1,e+=(M1+J)*V1}H/=3*C,e/=3*C;let i=U5.map(([O,b])=>[O-H,b-e]),v=0,h=0;for(let O=0;O<i.length;O++){let[b,M1]=i[O],[Q,J]=i[(O+1)%i.length],V1=Math.abs(b*J-Q*M1);v+=V1*(b*b+b*Q+Q*Q+M1*M1+M1*J+J*J),h+=V1}return{pts:i,cx:H,cy:e,hc:116.88-e,I:v/(6*h)}})(),O7=.3,b9=.15,O9=.35,s={live:!1,sleep:!0,x:i2.cx,y:i2.cy,th:0,vx:0,vy:0,w:0,touch:0,airT:0,restT:0,levelT:0,sa:[0,A5],box:"",err:0,side:0,hard:0,hardAt:-9,hitAt:-9,thrownAt:-9,hopAt:-9,walking:!1,lively:!1,shaken:!1,upT:0},A3=C=>C-2*Math.PI*Math.round(C/(2*Math.PI)),k9=()=>E.shaking||U==="Dead"||U==="Hurt"||g.asleep||U==="Sleeping",y5=()=>R.on||s.live&&!s.sleep&&(s.airT>.1||Math.hypot(s.vx,s.vy)>60);function w9(){let C=Math.sin(s.th),H=Math.cos(s.th);return[s.x-C*i2.hc-60,s.y+H*i2.hc-116.88,s.th*180/Math.PI]}function k7(C,H,e){let i=A.get("body.x")||0,v=A.get("body.y")||0,h=(A.get("body.rot")||0)*Math.PI/180;Object.assign(s,{th:h,x:60+i+Math.sin(h)*i2.hc,y:116.88+v-Math.cos(h)*i2.hc,vx:C,vy:H,w:e,sleep:!1,restT:0,airT:0});for(let O of["body.x","body.y","body.rot"])A.setState(O,0,0);A.spring("body.x",null),A.spring("body.y",null),t1("home"),d.clear(),A.lookAt(null)}function w7(){A.setState("body.x",A.get("body.x")||0,s.vx),A.setState("body.y",A.get("body.y")||0,s.vy),A.setState("body.rot",A.get("body.rot")||0,0),Object.assign(s,{x:i2.cx,y:i2.cy,th:0,vx:0,vy:0,w:0,sleep:!0,touch:0,airT:0,restT:0}),a3.clear()}function P9(C,H,e){let i=C*i1.s;if(i<260||a-s.hitAt<.08)return;s.hitAt=a;let v=Math.sin(s.th),h=Math.cos(s.th),O=Math.min(i/4e3,.14);Math.abs(-H*v+e*h)>Math.abs(H*h+e*v)?A.impulse({sy:-O*30,sx:O*15}):A.impulse({sx:-O*22,sy:O*12}),i>1400?(E1("sudden"),a-s.hardAt>6&&(s.hard=0),s.hardAt=a,s.hard++,s.hard>=2&&(E.shaking||w("Hurt",1.2),l1({V:-.25,A:.4,I:.35}),s.hard===2&&D1("shake",.5),j.bandage=1,K(4,()=>{j.bandage=0}))):i>700&&!E.shaking&&!g.asleep&&w("Alert",.6)}let n5=[];function T9(C,H,e,i,v,h,O,b){s.vx+=H*C,s.vy+=e*C,v&&(s.w+=(v*A3(O-s.th)-h*s.w)*C);let M1=Math.exp(-C*.25);if(s.vx*=M1,s.vy*=M1,s.w*=Math.exp(-C*.8),i>0){let m1=Math.hypot(s.vx,s.vy),L1=b9*i*C;m1<=L1?s.vx=s.vy=0:(s.vx-=s.vx/m1*L1,s.vy-=s.vy/m1*L1);let j1=L1*.018;s.w=Math.abs(s.w)<=j1?0:s.w-Math.sign(s.w)*j1}let Q=Math.sin(s.th),J=Math.cos(s.th),V1=.4;n5.length=0;for(let[m1,L1]of i2.pts){let j1=m1*J-L1*Q,d2=m1*Q+L1*J,e2=s.x+j1,l5=s.y+d2;e2<b.L+V1&&n5.push({rx:j1,ry:d2,nx:1,ny:0}),e2>b.R-V1&&n5.push({rx:j1,ry:d2,nx:-1,ny:0}),l5<b.T+V1&&n5.push({rx:j1,ry:d2,nx:0,ny:1}),l5>b.F-V1&&n5.push({rx:j1,ry:d2,nx:0,ny:-1})}let O1=0,R1=0,o2=0;for(let m1 of n5){let L1=(s.vx-s.w*m1.ry)*m1.nx+(s.vy+s.w*m1.rx)*m1.ny;m1.jn=0,m1.jt=0,m1.bias=L1<-70?-O9*L1:0,-L1>O1&&(O1=-L1,R1=m1.nx,o2=m1.ny)}for(let m1=0;m1<10;m1++)for(let L1 of n5){let j1=L1.rx*L1.ny-L1.ry*L1.nx,d2=(s.vx-s.w*L1.ry)*L1.nx+(s.vy+s.w*L1.rx)*L1.ny,e2=Math.max(0,L1.jn+(L1.bias-d2)/(1+j1*j1/i2.I)),l5=e2-L1.jn;L1.jn=e2,s.vx+=l5*L1.nx,s.vy+=l5*L1.ny,s.w+=l5*j1/i2.I;let p2=-L1.ny,v3=L1.nx,u3=L1.rx*v3-L1.ry*p2,S6=(s.vx-s.w*L1.ry)*p2+(s.vy+s.w*L1.rx)*v3,A4=r(L1.jt-S6/(1+u3*u3/i2.I),-O7*L1.jn,O7*L1.jn),B0=A4-L1.jt;L1.jt=A4,s.vx+=B0*p2,s.vy+=B0*v3,s.w+=B0*u3/i2.I}let h2=0;for(let m1 of n5)m1.jn>0&&(h2|=m1.nx>0?1:m1.nx<0?2:m1.ny>0?4:8);s.touch|=h2,O1>0&&P9(O1,R1,o2),s.x+=s.vx*C,s.y+=s.vy*C,s.th+=s.w*C;let V2=Math.sin(s.th),a1=Math.cos(s.th),k1=1/0,n1=-1/0,K1=1/0,L2=-1/0;for(let[m1,L1]of i2.pts){let j1=s.x+m1*a1-L1*V2,d2=s.y+m1*V2+L1*a1;j1<k1&&(k1=j1),j1>n1&&(n1=j1),d2<K1&&(K1=d2),d2>L2&&(L2=d2)}k1<b.L?s.x+=b.L-k1:n1>b.R&&(s.x-=n1-b.R),L2>b.F?s.y-=L2-b.F:K1<b.T&&(s.y+=b.T-K1)}function B9(C){E.shaking&&a-E.strongAt>.6&&(E.shaking=!1,E.revs.x.length=0,E.revs.y.length=0,l1({V:-.25,A:.4,E:-.05,F:-.05,I:.35}),D1("shake",.8),s.shaken=!1,G3(n(2.5,4)));let H=!P&&!!E.t&&performance.now()/1e3-E.t<1;if(H!==s.live&&(s.live=H,H?I.on||(R.on=!1,k7(0,0,0)):I.on||(w7(),v0())),!H)return;if(I.on){s.sleep=!0,a3.clear();return}let e=A5/u0,i=E.ax*e,v=E.ay*e,h=Math.hypot(i,v);h>5*A5&&(i*=5*A5/h,v*=5*A5/h);let O=E.az*e,b=s0(),M1=[b.L,b.R,b.T,b.F].map(K1=>K1.toFixed(1)).join(),Q=Math.hypot(E.ax,E.ay+.8)||1,J=Math.atan2(-E.ax/Q,(E.ay+.8)/Q);Math.abs(A3(J-s.side))>.9&&(s.side=Math.round(J/(Math.PI/2))*(Math.PI/2));let V1=s.side,O1=A3(V1-s.th);s.err=A3(J-s.th);let R1=k9(),o2=s.side===0&&Math.abs(J)<.21&&E.ay>5;s.levelT=o2&&Math.abs(O1)<.2?s.levelT+C:0;let h2=60-s.x,V2=!R1&&!B.phase&&s.levelT>1.5&&Math.abs(h2)>.5&&!!(s.touch&8);if(s.sleep){let K1=Math.hypot(i-s.sa[0],v-s.sa[1]);(K1>.1*A5||M1!==s.box||V2||!R1&&Math.abs(O1)>.3)&&(s.sleep=!1,s.restT=0,K1>.1*A5&&E1())}if(!s.sleep){let K1=!!s.touch,L2=0,m1=0;if(R1||(K1&&(s.upT>.15||Math.abs(O1)<.5)?(L2=70,m1=14):K1||(L2=26,m1=6)),s.upT=K1&&!R1&&Math.abs(O1)>.5?s.upT+C:0,s.upT>.5&&a-s.hopAt>1.2){s.hopAt=a;let p2=s.touch,v3=(p2&1?1:0)-(p2&2?1:0),u3=(p2&4?1:0)-(p2&8?1:0);s.vx+=v3*200-E.ax/Q*260,s.vy+=u3*200-(E.ay+.8)/Q*260,s.w+=Math.sign(O1)*5}let L1=Math.max(1,Math.ceil(C/(1/120))),j1=C/L1,d2=s.touch;s.touch=0;for(let p2=0;p2<L1;p2++)T9(j1,i,v,O,L2,m1,V1,b);let e2=Math.hypot(s.vx,s.vy);if(s.airT=s.touch?0:s.airT+C,!s.touch&&d2&&e2*i1.s>500&&a-s.thrownAt>2&&(s.thrownAt=a,l1({V:.03,A:.3,C:.1}),E.shaking||D1("throw",r(e2*i1.s/3e3,.2,1))),e2*i1.s>250&&(s.lively=!0),R1||(s.airT>.12&&e2*i1.s>300?w(e2*i1.s>1700?"Scared":g.V>.3?"Grinning":"Alert",.35):e2>50&&w(g.V>.45?"Grinning":"Alert",.35),e2>50&&A.lookAt(s.x+s.vx/e2*120,s.y+s.vy/e2*120)),s.walking=V2&&e2<30,s.walking){let p2=r(h2*2.5,-80,80)*C;s.x=Math.abs(p2)>=Math.abs(h2)||Math.abs(h2)<1?60:s.x+p2}let l5=e2<4&&Math.abs(s.w)<.06&&(R1||Math.abs(O1)<.3)&&!V2;s.restT=l5?s.restT+C:0,s.restT>.3&&(s.sleep=!0,s.vx=s.vy=s.w=0,s.th=A3(s.th),s.sa=[i,v],s.box=M1,A.lookAt(null),s.shaken?(s.shaken=s.lively=!1,G3(n(2.5,4))):s.lively&&(s.lively=!1,R1||w(s.hard>=2&&a-s.hardAt<3?"Hurt":g.V>.2?"Happy":"Normal",1)))}let[a1,k1,n1]=w9();if(a3.clear(),a3.add({"body.x":a1,"body.y":k1,"body.rot":n1+(s.walking?3*Math.sin(a*14):0)}),s.touch&&!R1){let K1=r(-O1*180/Math.PI*.3,-7,7),L2=r(((-Math.sin(s.th)*i+Math.cos(s.th)*v)/A5-1)*.05,-.04,.08);a3.add({"body.skew":K1,"body.sy":-L2,"body.sx":L2*.6})}}let Z0=window.DeviceMotionEvent,P7=!!Z0&&typeof Z0.requestPermission=="function",b5=P7?"unknown":"granted";function z3(){!P7||E.t||b5==="asking"||b5==="granted"||b5==="denied"||(b5="asking",Z0.requestPermission().then(C=>{b5=C==="granted"?"granted":"denied"}).catch(()=>{b5="error"}))}function e1(C,H,e,i,v){let h="n_"+H;if(C[h]==null){C[h]=a+n(e,i);return}a>=C[h]&&(v(),C[h]=a+n(e,i))}function b1(C,H){let e=C[H+"T"];return e==null?-1:a-e}let T7={Normal(C){G.add({"body.rot":1*Math.sin(a*.75+l0[0]),"mouth.s":.04*Math.sin(a*1.2)}),e1(C,"sq",8,15,()=>{C.sqT=a});let H=b1(C,"sq");H>=0&&H<.6&&G.add({"eyeL.bot":.15*y(H/.6),"eyeR.bot":.15*y(H/.6)})},Smiling(C){j.blush=Math.max(j.blush,.75),e1(C,"sq",4,8,()=>{C.sqT=a});let H=b1(C,"sq");H>=0&&H<.15&&G.add({"eyeL.bot":.12,"eyeR.bot":.12}),G.add({"body.y":-1.2*(.5+.5*Math.sin(a*2.8)),"body.rot":R9(2)})},Happy(C){e1(C,"hop",2.5,4.5,()=>f5(.7)),e1(C,"sp",3,6,()=>A1("sparkle",{x:Z([8,112]),y:36,life:.45,spread:0,color:A.bodyColor})),G.add({"mouth.bH":1.5*Math.sin(a*2)})},Grinning(C){e1(C,"g",3,6,()=>{C.gT=a,C.gD=n(.4,.7)});let H=b1(C,"g");H>=0&&H<C.gD&&(P||H2.add({"body.y":.8*Math.sin(a*2*Math.PI*8)}),G.add({"eyeL.bot":.25,"eyeR.bot":.25,"mouth.tR":1,"mouth.bR":1,"mouth.tA":1,"mouth.bA":1}),j.blush=Math.max(j.blush,1))},Grateful(C){e1(C,"bow",5,8,()=>{C.bowT=a});let H=b1(C,"bow");if(H>=0&&H<1.1){let e=y(H/1.1);G.add({"body.sy":-.04*e,"body.y":1.5*e,"face.y":1*e})}e1(C,"h",4,7,()=>A1("heart",{x:60,y:-4,life:1.8}))},Loving(C){j.blush=Math.max(j.blush,1);let H=W1.on?.52:C.per||(C.per=n(.7,.85)),e=a%H/H,i=e<.13?.18*Math.sin(e/.13*Math.PI):e>.29&&e<.42?.12*Math.sin((e-.29)/.13*Math.PI):0;H2.add({"eyeL.s":i*S,"eyeR.s":i*S}),G.add({"body.rot":2*Math.sin(a*2.5)}),e1(C,"h",.9,1.6,()=>A1("heart",{x:Z([6,114]),y:40,vx:0,vy:-20,life:1.6,spread:6}))},UwU(C){j.blush=Math.max(j.blush,1),e1(C,"side",4,7,()=>{C.side=-(C.side||1)}),G.add({"body.rot":6*(C.side||1)}),e1(C,"mlem",3,5,()=>{C.mlemT=a});let H=b1(C,"mlem");H>=0&&H<1&&G.add({"mouth.rot":5*Math.sin(H*2*Math.PI*2),"mouth.bH":1.5*Math.sin(H*12.6)})},Winking(C,H){e1(C,"w",4,7,()=>{C.wT=a,A1("sparkle",{x:104,y:56,life:.4,color:A.bodyColor})});let e=b1(C,"w");if(e>=0&&e<.32){let i=e<.08?e/.08:1-(e-.08)/.24;G.add({"eyeR.top":.5*t(i),"body.rot":3*t(i)}),H&&G.add({"mouth.rot":-3*t(i)})}G.add({"body.rot":H?3:4})},WinkingSmile(C){T7.Winking(C,!0)},Cheeky(C){e1(C,"tilt",2,4,()=>{C.tilt=-(C.tilt||1)}),G.add({"body.rot":3*(C.tilt||1)}),e1(C,"wig",1.6,3,()=>{C.wigT=a});let H=b1(C,"wig");H>=0&&H<.8&&G.add({"mouth.tgX":2*Math.sin(H*2*Math.PI*3)}),e1(C,"blep",6,10,()=>{C.blepT=a});let e=b1(C,"blep");e>=0&&e<.24&&G.set({"mouth.tongue":e<.12?0:1.25})},Silly(C){G.add({"body.rot":2.5*Math.sin(a*6.3)}),e1(C,"swap",5,9,()=>{C.swap=!C.swap});let H=Math.sin(a*7.5);C.swap?G.add({"eyeL.y":-6+2*H,"eyeR.y":6-2*H}):G.add({"eyeR.y":2*H,"eyeL.y":-2*H}),e1(C,"wig",1.2,2.4,()=>{C.wigT=a});let e=b1(C,"wig");e>=0&&e<.8&&G.add({"mouth.tgX":2*Math.sin(e*2*Math.PI*4.5)})},DeadAss(C){G.add({"mouth.tgX":1*Math.sin(a*1.9)}),e1(C,"slump",6,10,()=>{C.slumpT=a,A.blink({close:150,hold:380,open:250})});let H=b1(C,"slump");H>=0&&H<1.4&&G.add({"body.sy":-.02*y(H/1.4)}),e1(C,"sigh",10,16,()=>{C.sighT=a,K(.7,()=>A1("puff",{x:84,y:88,vy:-6,vx:10,life:.9,s0:.3,s1:.8}))});let e=b1(C,"sigh");e>=0&&e<1.6&&G.add({"body.sy":e<.7?.03*m(e/.7):.03-.06*m((e-.7)/.9)*(1-m((e-1.2)/.4))})},Devious(C){e1(C,"slide",1.2,2.2,()=>{C.dir=C.dir===1?-1:1}),G.add({"eyeL.x":3*(C.dir||1),"eyeR.x":3*(C.dir||1)}),e1(C,"heh",4,7,()=>{C.hehT=a});let H=b1(C,"heh");H>=0&&H<.9&&(G.add({"mouth.s":.1*y(H/.9),"eyeL.top":.12,"eyeR.top":.12}),!P&&H>.4&&H2.add({"body.y":-1*Math.abs(Math.sin((H-.4)*Math.PI*6))}))},Alert(){G.add({"mouth.s":.06*Math.sin(a*5)})},Scared(C){P||H2.add({"body.x":.6*Math.sin(a*113)*Math.sin(a*7.1)}),e1(C,"look",2,3,()=>{C.lookT=a,C.lookDir=Math.random()<.5?-1:1});let H=b1(C,"look");H>=0&&H<.6&&G.add({"eyeL.x":4*C.lookDir,"eyeR.x":4*C.lookDir}),G.add({"body.L":.02*Math.sin(a*6)}),a-T1>2&&e1(C,"drop",2.5,4,()=>A1("tear",{x:108,y:60,vy:6,gravity:40,life:1.2}))},Angry(C){P||H2.add({"body.x":.4*Math.sin(a*75)}),G.add({"body.L":-.03*(.5+.5*Math.sin(a*3.1))}),j.vein=1,e1(C,"huff",3,5,()=>A.impulse({sy:-2.2*S})),e1(C,"steam",1.4,2.4,()=>{A1("puff",{x:30,y:34,vx:-10,vy:-18,spread:0}),A1("puff",{x:90,y:34,vx:10,vy:-18,spread:0})}),c.inside&&!I.on&&!l.system&&A.lookAt(c.wx,c.wy,{lean:c.lean})},Hurt(C){e1(C,"w",1,2,()=>{C.wT=a});let H=b1(C,"w");H>=0&&H<.3&&(G.add({"eyeL.s":-.1,"eyeR.s":-.1}),P||H2.add({"body.x":.5*Math.sin(a*88)*(1-H/.3)})),a-T1>1&&(j.bandage=1),e1(C,"tear",1.5,3,()=>A1("tear",{x:Z([33,87]),y:76}))},Dead(C){G.add({"body.rot":4*Math.sin(a*3.8),"body.x":1.5*Math.cos(a*3.8)}),e1(C,"tw",3,6,()=>{C.twT=a,C.twE=Math.random()<.5?"eyeL.s":"eyeR.s"});let H=b1(C,"tw");H>=0&&H<.08&&G.add({[C.twE]:.15}),(!C.stars||a>C.stars)&&(A1("star",{count:3,orbit:{cx:60,cy:-6,r:22,ry:.27,speed:4.5},life:2.6},!0),C.stars=a+2.5)},Sad(C){e1(C,"sigh",9,13,()=>{C.sighT=a});let H=b1(C,"sigh");H>=0&&H<2.3&&G.add({"body.sy":H<.9?.025*m(H/.9):.025-.055*m((H-.9)/1.4)*(1-m((H-1.9)/.4)),"eyeL.top":H>.9?.1:0,"eyeR.top":H>.9?.1:0}),e1(C,"tear",6,10,()=>A1("tear",{x:Z([30,90]),y:74,vy:2,gravity:30,life:1.6})),c.inside&&!I.on&&!l.system&&A.lookAt(60+(60-c.wx),160,{lean:.3*(c.lean||0)}),j.cloud=a-T1>20?1:0},Problem(C){e1(C,"tilt",1.5,2.5,()=>{C.tilt=-(C.tilt||1)}),G.add({"body.rot":6*(C.tilt||1)}),e1(C,"scr",4,7,()=>{C.scrT=a});let H=b1(C,"scr");H>=0&&H<.3&&!P&&H2.add({"body.rot":2*Math.sin(a*63)}),e1(C,"up",2,4,()=>{C.upT=a});let e=b1(C,"up");e>=0&&e<.9&&G.add({"eyeL.x":3,"eyeR.x":3,"eyeL.y":-3,"eyeR.y":-3})},NoInternet(C){e1(C,"up",2,4,()=>{C.upT=a});let H=b1(C,"up");H>=0&&H<.8&&G.add({"eyeL.x":3.5,"eyeR.x":3.5,"eyeL.y":-3,"eyeR.y":-3}),e1(C,"reach",6,9,()=>{C.reachT=a});let e=b1(C,"reach");e>=0&&e<.9&&G.add({"body.sy":.06*y(e/.9),"body.rot":2*y(e/.9)}),C.cyc==null&&(C.cyc=Math.floor(a/1.9));let i=Math.floor(a/1.9);i!==C.cyc&&(C.cyc=i,Math.random()<.6&&A.blink({double:!0}))},Pleading(C){P||H2.add({"eyeL.s":.03*Math.sin(a*37.7),"eyeR.s":.03*Math.sin(a*37.7+.6)}),e1(C,"pp",3,5,()=>{C.ppT=a});let H=b1(C,"pp");H>=0&&H<.5&&G.add({"body.y":-1.5*Math.abs(Math.sin(H*Math.PI*4))})},Sweating(C){e1(C,"drop",5,8,()=>A1("tear",{x:92,y:40,vy:8,vx:4,gravity:60,life:1.1})),e1(C,"laugh",2.5,4.5,()=>{C.lT=a});let H=b1(C,"laugh");H>=0&&H<.5&&!P&&H2.add({"body.y":.4*Math.sin(a*56)})},WTF(C){G.add({"body.rot":-.6*Math.sin(a*.6)}),e1(C,"dt",6,10,()=>{C.dtT=a});let H=b1(C,"dt");H>=0&&H<.9&&(H<.2&&G.set({"eyeL.top":0,"eyeR.top":0}),G.add({"body.rot":3*Math.sin(H*Math.PI*4)*(H>.2?1:0)})),e1(C,"dots",7,11,()=>{C.dotsT=a});let e=b1(C,"dots");j.dots=e>=0&&e<2.6?1:0},Focusing(C){let H=a%3.2/3.2,e=H<.25?m(H/.25):H<.62?1:H<.85?1-m((H-.62)/.23):0;G.set({"acc.bubbles":e}),G.add({"eyeL.x":3,"eyeR.x":3,"eyeL.y":-2.5,"eyeR.y":-2.5,"body.rot":1.5*Math.sin(a*1.57),"mouth.tgX":1.5*Math.sin(a*9.4)}),e1(C,"lb",5,8,()=>A.blink({close:110,hold:400,open:180}))},Loading(C){let H=O=>{let b=(a-O*.12)%.9/.9;return b<.45?Math.sin(b/.45*Math.PI):0},e=H(0),i=H(1),v=H(2);G.add({"eyeL.y":-5*e*S,"eyeL.s":.15*e,"dot.dy":-5*i*S,"dot.s":.15*i,"eyeR.y":-5*v*S,"eyeR.s":.15*v}),e1(C,"bl",4,7,()=>{C.blT=a});let h=b1(C,"bl");h>=0&&h<.18&&G.add({"eyeL.open":-.8,"eyeR.open":-.8,"dot.s":-.7})},Initializing(){j.scan=1,G.add({"body.L":.03*Math.sin(a*5)})},Sleeping(C){let e=a%4.2/4.2,v=e<.43?m(e/.43):1-m((e-.43)/.57);G.add({"mouth.s":-.3+.5*v,"body.sy":.02*v}),e1(C,"dream",8,20,()=>{C.dreamT=a,C.dreamK=Math.random()<.12?"bubble":Z(["flutter","smile","mumble","giggle"]),C.dreamK==="bubble"&&(I2=Z(Object.keys(i3)))});let h=b1(C,"dream");if(h>=0){let O=C.dreamK;O==="flutter"&&h<.36&&G.add({"eyeL.top":-.18*Math.abs(Math.sin(h*Math.PI/.12)),"eyeR.top":-.18*Math.abs(Math.sin(h*Math.PI/.12))}),O==="smile"&&h<.6&&G.set({"mouth.tH":10,"mouth.bH":14,"mouth.tR":12,"mouth.bR":14,"mouth.tA":12,"mouth.bA":14}),O==="mumble"&&h<.8&&G.add({"mouth.s":.2*Math.sin(h*Math.PI*6),"mouth.rot":6*Math.sin(h*9)}),O==="giggle"&&h<.5&&G.add({"body.y":-1.5*Math.abs(Math.sin(h*Math.PI*4))}),j.dream=O==="bubble"&&h<4.5?1:0}}};function R9(C){return c.inside?r((c.wx-60-(A.get("body.x")||0))/80,-1,1)*C*(c.lean||0)*A.gazeLean.habituation:0}let B7={lookAround:{dur:[2,3.5],cd:6,w:()=>10*(1+g.C)*R7("look"),run(C,H,e){(!e.n||C>e.n)&&(e.n=C+n(.4,.9),e.p=[60+n(-1,1)*140,60+n(-1,1)*90]),A.lookAt(e.p[0],e.p[1])},end(){A.lookAt(null)}},glanceAtCursor:{dur:[.8,1.5],cd:4,w:()=>c.inside?8*(1+g.F):0,run(C,H,e){A.lookAt(c.wx,c.wy,{lean:c.lean}),!e.b&&C>.3&&(e.b=1,Math.random()<.15&&A.blink({close:120,hold:500,open:200}))},end(){A.lookAt(null)}},lookUp:{dur:[1.6,2.6],cd:25,w:()=>(z5()!=="clear"?3:1)*(1+g.C),run(){let C=k0();A.lookAt(C[0],C[1],{lean:.5})},end(){A.lookAt(null)}},peekRoof:{dur:[1.5,1.5],cd:20,w:()=>3*(1+g.C),run(C,H){let e=y(H);A.lookAt(60,-300),h1.add({"body.sy":.03*e,"body.rot":2*e})},end(){A.lookAt(null)}},yawn:{dur:[2.2,2.2],cd:25,w:()=>2*(g.E<.4?4:1)*R7("yawn")*(C2()?1.5:1),run(C){let H=C<.9?o(6,17,m(C/.9)):C<1.3?17:o(17,6,m((C-1.3)/.5)),e=C<1.8?m(C/.3):1-m((C-1.8)/.4);h1.set(u1(H,88),e),h1.add({"eyeL.top":.3*e,"eyeR.top":.3*e,"eyeL.bot":.3*e,"eyeR.bot":.3*e,"body.sy":.06*e*S})},end(){A.blink({close:140,hold:300,open:240})}},stretch:{dur:[1.6,1.6],cd:30,w:()=>2,run(C){C<.6?h1.add({"body.sy":.1*m(C/.6)*S,"body.sx":-.04*m(C/.6)}):C>1.2&&!P&&Z2.add({"body.x":.6*Math.sin(C*90)})},start(){K(.62,()=>A.impulse({sy:-2*S}))}},hum:{dur:[3,5],cd:18,w:()=>g.V>.3?4*(1+g.V):0,run(C,H,e){h1.add({"mouth.s":.06*Math.sin(C*15.7),"body.rot":3*Math.sin(C*6.28)*y(H)}),(!e.n||C>e.n)&&(e.n=C+n(.9,1.5),A1("note",{x:114,y:72,vx:12,vy:-14}))}},whistle:{dur:[2.5,2.5],cd:25,w:()=>g.V>.2?2:0,run(C,H,e){let i=y(H)>.2?1:y(H)*5;h1.set(u1(5,86),i),h1.add({"body.sx":.02*i}),(!e.n||C>e.n)&&(e.n=C+1.1,A1("note",{x:112,y:76,vx:14,vy:-12}))}},sneeze:{dur:[1.8,1.8],cd:60,w:()=>.6,run(C,H,e){if(C<.9){let i=C<.3?.5:1;h1.add({"eyeL.top":.25*i,"eyeR.top":.25*i,"eyeL.bot":.25*i,"eyeR.bot":.25*i,"body.sy":.06*m(C/.9)*S}),h1.set(u1(4+4*i,88))}else e.c||(e.c=1,A.impulse({sy:-4*S,y:60*S}),A1("dot",{x:60,y:92,count:3,vy:10,spread:30,gravity:80,life:.7,color:$}),U1(x1("achoo"),{short:!0})),h1.add({"body.rot":6*Math.sin((C-.9)*22)*(1-(C-.9)/.9)*S})}},shiver:{dur:[1.2,1.2],cd:40,w:()=>.8*(C2()&&g.E<.3?3:1)*(z5()==="wind"||z5()==="snow"?2.5:1),run(){P||Z2.add({"body.x":.7*Math.sin(a*88)}),h1.add({"body.sy":-.03,"eyeL.top":.2,"eyeR.top":.2,"eyeL.bot":.2,"eyeR.bot":.2})}},daydream:{dur:[4,6],cd:30,w:()=>g.V>=0?3:0,start(){I2=Z(Object.keys(i3))},run(C,H){let e=y(H)>.15?1:y(H)/.15;A.lookAt(140,-120),h1.add({"eyeL.bot":.35*e,"eyeR.bot":.35*e}),h1.set({"acc.bubbles":t(C/.7)*(1-m((H-.85)/.15))}),j.dream=H>.15&&H<.9?1:0},end(){A.lookAt(null),j.dream=0}},peekaboo:{dur:[2,2],cd:45,w:()=>c.inside&&g.F>.5?2:0,run(C,H,e){C<1?h1.add({"eyeL.bot":.5,"eyeR.bot":.5,"eyeL.y":4,"eyeR.y":4,"body.sy":-.05}):e.p||(e.p=1,f5(.8),A.lookAt(c.wx,c.wy,{lean:c.lean}),S5())},end(){A.lookAt(null)}},tinyDance:{dur:[3,4],cd:40,w:()=>g.E>.6&&g.V>.5?1.5:0,run(C,H,e){let i=Math.floor(C*2);h1.add({"body.rot":7*(i%2?1:-1)*S,"eyeL.bot":.5,"eyeR.bot":.5,"eyeL.y":4,"eyeR.y":4}),e.b!==i&&(e.b=i,A.impulse({y:-70*S}))}},suspicious:{dur:[1.2,1.2],cd:20,w:()=>g.I>.2||g.C>.6?1.5:0,run(C,H){let e=y(H)>.2?1:y(H)*5;c.inside&&A.lookAt(c.wx,c.wy,{lean:c.lean}),h1.add({"eyeR.top":.35*e,"body.rot":-2*e})},end(){A.lookAt(null)}},headBob:{dur:[2,4],cd:15,w:()=>g.E>.4?3:0,run(C){h1.add({"face.y":1.2*Math.sin(C*9.4),"body.rot":1.5*Math.sin(C*9.4)})}},sigh:{dur:[1.6,1.6],cd:14,w:()=>C1-a5>20?4:0,run(C){h1.add({"body.sy":C<.7?.03*m(C/.7):.03-.06*m((C-.7)/.9)})},start(){K(.7,()=>A1("puff",{x:84,y:88,vx:10,vy:-6,life:.9,s0:.3,s1:.8}))}}},F9=new Set(["Sleeping","Dead","Hurt","Initializing","Loading","Angry","Scared"]);function R7(C){return C1-a5<20?1:C==="look"?2:C==="yawn"?3:1}let g1={act:null,name:null,t0:0,dur:0,st:{},nextAt:2,cool:{}};function Q3(C){let H=B7[C];return H?(d5(!0),g1.act=H,g1.name=C,g1.t0=a,g1.dur=n(H.dur[0],H.dur[1]),g1.st={},g1.cool[C]=C1+H.cd,H.start&&H.start(g1.st),!0):!1}function d5(C){if(!g1.act)return;let H=g1.act;g1.act=null,g1.name=null,h1.clear(),Z2.clear(),H.end&&H.end(g1.st,C),g1.nextAt=C1+n(1.5,4)}function _9(){if(h1.clear(),Z2.clear(),g1.act){let C=a-g1.t0;C>=g1.dur||l.system||l.acute||I.on||y5()||x.on?d5(C<g1.dur):g1.act.run(C,C/g1.dur,g1.st)}}function E9(){if(!N||g1.act||C1<g1.nextAt||l.system||l.acute||I.on||y5()||x.on||B.phase||g.asleep||N1.on||F9.has(U))return;let C=[],H=0;for(let[i,v]of Object.entries(B7)){if((g1.cool[i]||0)>C1)continue;let h=v.w();h>0&&(C.push([i,h]),H+=h)}if(!H){g1.nextAt=C1+2;return}let e=Math.random()*H;for(let[i,v]of C)if(e-=v,e<=0){Q3(i);return}}let N1={on:!1,t0:0,nodT:0,forced:!1,jerked:!1};function D9(){if(!N||g.asleep||l.system||B.phase||x.on||I.on||y5()||j2)return;let C=(C2()?.5:1)*(g.E<.2?.6:1),H=C1-a5;!N1.on&&H>45*C&&!l.acute&&(N1.on=!0,N1.t0=C1,N1.nodT=C1+1,d5(!0)),N1.on&&(H>60*C||N1.forced&&C1-N1.t0>6)&&N9(!0)}function I9(){if(!N1.on)return;let C=C1-N1.t0,H=.25+.15*(.5+.5*Math.sin(a*1.3));n2.add({"eyeL.top":H,"eyeR.top":H});let e=(C1-N1.t0)%4/4;e<.4&&n2.add({"body.sy":-.03*m(e/.4),"body.y":1.5*m(e/.4)}),e>.4&&e<.45&&n2.add({"eyeL.top":-H,"eyeR.top":-H}),C>0&&e>.4&&!N1.jerked&&(N1.jerked=!0,A.impulse({y:-40*S})),e<.4&&(N1.jerked=!1)}function F7(){N1.on=!1,N1.forced=!1,n2.clear()}let _7=0;function N9(C){N1.on=!1,N1.forced=!1,n2.clear(),g5("fallAsleep",3.2,H=>{let e=[.2,.35,.25,.45,.4,.5],i=Math.min(e.length-1,Math.floor(H/.45));if(Y1.add({"eyeL.top":e[i],"eyeR.top":e[i],"body.sy":-.03*m(H/3)}),H>1&&H<2.4){let v=H-1,h=v<.6?o(6,15,m(v/.6)):o(15,8,m((v-.6)/.8));Y1.set(u1(h,88))}},(H,e)=>{e||(g.asleep=!0,_7=C1+n(100,160)*(C2()?2.5:1),C&&D1("ignore",.5))}),w("Normal",3.2)}function p5(C,H){let e=g.asleep;if(g.asleep=!1,a5=C1,e&&!H&&D1("wake",C==="startle"?.8:.4),C==="startle"){T2("Alert",{startle:!0}),w("Alert",1.1),l1({A:.3});return}w("Smiling",2.6),g5("wakeGentle",2.6,i=>{if(i<.6)Y1.add({"body.sy":.08*m(i/.6)*S});else if(i<1.4){let v=(i-.6)/.8;Y1.set(u1(o(6,14,y(v)),88),y(v))}Y1.add({"eyeL.bot":.3*(1-m((i-2)/.6)),"eyeR.bot":.3*(1-m((i-2)/.6))})})}let x={on:!1,kind:"line",vis:[],t0:0,total:0,text:"",shownChars:-1,idx:-1,done:null,short:!1,nextBob:0,nextLook:0,f:1};function E7(C){let H=C.toLowerCase(),e=[],i=z1==="fr"?{eau:[.8,.75,1.25],ou:[.4,.65,1.25],au:[.8,.75,1.25],eu:[.6,1,1.25],on:[.8,.75,1.25],an:[.55,.95,1.25],en:[.55,.95,1.25],in:[.55,.95,1.25],ch:[.35,.95,.7],oi:[.75,.85,1.25],ai:[.6,1,1.25]}:{oo:[.4,.65,1.25],ee:[.35,1.15,1.25],ea:[.4,1.1,1.25],ou:[.6,.8,1.25],ow:[.7,.75,1.25],oa:[.75,.75,1.25],ai:[.6,1,1.25],ay:[.6,1,1.25],th:[.25,1,.7],sh:[.35,.85,.7],ch:[.35,.9,.7],ng:[.3,1,.7]},v=0;for(;v<H.length;){let b=H[v],M1=1,Q=.25,J=1,V1=80*.7,O1=null,R1=H.substr(v,3),o2=H.substr(v,2);i[R1]?(M1=3,[Q,J]=i[R1],V1=80*i[R1][2]):i[o2]?(M1=2,[Q,J]=i[o2],V1=80*i[o2][2]):"aàâ".includes(b)?(Q=1,V1=100):"eéèêë".includes(b)?(Q=.6,V1=100):"iîïy".includes(b)?(Q=.35,J=1.15,V1=100):"oôö".includes(b)?(Q=.8,J=.75,V1=100):"uùûü".includes(b)?(Q=.4,J=.65,V1=100):"mbp".includes(b)?(Q=0,J=.95,V1=60):"fv".includes(b)?Q=.15:"lndtsz".includes(b)?Q=.3:"kgrjcqx".includes(b)?(Q=.35,J=.95):b===" "||b===`
`?(Q=.1,V1=40):",;:".includes(b)?(Q=0,V1=180):".!?…".includes(b)?(Q=0,V1=350,O1=b):/[0-9]/.test(b)?(Q=.5,V1=90):/[a-zà-ÿ]/.test(b)||(Q=.1,V1=30),Q=t(Q*n(.9,1.1)),e.push({len:M1,open:Q,wf:J,d:V1/1e3,kind:O1}),v+=M1}let h=0,O=0;for(let b of e)b.t=h,b.ci=O,h+=b.d,O+=b.len;return e}let D7={Happy:1,Grinning:1,Loving:1,Grateful:.9,Winking:.9,WinkingSmile:.8,Smiling:.8,UwU:.7,Cheeky:.6,Silly:.6,Devious:.6,Normal:.5,Sweating:.3,Loading:.3,Initializing:.3,Alert:0,Focusing:0,Dead:0,Sleeping:0,WTF:-.1,DeadAss:-.1,Problem:-.5,NoInternet:-.6,Pleading:-.7,Scared:-.7,Angry:-.8,Hurt:-.8,Sad:-.9},S0=C=>String(C||"").replace(/\s+/g," ").trim();function I7(C){d1.hidden=!1,d1.classList.remove("out"),d1.classList.toggle("short",C)}function K3(C,H){let e=D7[U]!=null?D7[U]:.4,i=1+C*7,v=14*H*(1+.12*e),h=86-1.5*e;f1.set(X({tY:h,tR:v,tA:v,tH:-i+3.5*e,tD:0,bY:h,bR:v,bA:v,bH:i+3.5*e,bD:0,tongue:0,s:1,rot:0,talk:0}))}function U1(C,H){if(H=H||{},C=S0(C),!C||x.on&&x.kind==="stream"&&H.short)return;let e=E7(C),i=e.length?e[e.length-1].t+e[e.length-1].d:.5,v=Math.max(.8,Math.min(5,C.length/38)),h=Math.min(1,v/i);if(h<1)for(let O of e)O.t*=h,O.d*=h;Object.assign(x,{on:!0,kind:"line",f:h,vis:e,t0:a,total:e.length?e[e.length-1].t+e[e.length-1].d:.5,text:C,shownChars:-1,idx:-1,done:H.done||null,short:!!H.short,nextBob:a+.3,nextLook:a}),I7(x.short),s2.textContent="",M.srSpeech.textContent=C,A.spring("mouth",{k:700,c:40}),A.setState("mouth.tongue",Math.min(U2("mouth.tongue",0),.2),0),t1("bubble"),d5(!0)}function n3(){x.on=!1,f1.clear(),x.playback&&(x.playback=null),s2.textContent=x.text,x.text?d3():d1.hidden=!0,A.spring("mouth",null),A.blink({close:80,hold:40,open:140});let C=x.short?1.4:Math.min(9,2.5+.06*x.text.length);if(x.text&&K(C,()=>{d1.classList.add("out"),K(.22,()=>{x.on||(d1.hidden=!0)},"bubble")},"bubble"),x.done){let H=x.done;x.done=null,H()}}function W9(){let C=a-x.t0;if(C>=x.total){n3();return}let H=x.idx<0?0:x.idx;for(;H+1<x.vis.length&&x.vis[H+1].t<=C;)H++;let e=x.vis[H];H!==x.idx&&(x.idx=H,N7(e));let i=e.ci+e.len;i!==x.shownChars&&(x.shownChars=i,s2.textContent=x.text.slice(0,i),d3());let v=e.open,h=e.wf;if(x.f<.8){let O=W7(H,C);v=O[0],h=O[1]}K3(v,h)}function N7(C){C.kind?(A.blink({close:70,hold:40,open:120}),C.kind==="!"&&A.impulse({y:-60*S}),C.kind==="?"&&A.impulse({rot:30*S})):a>x.nextBob&&C.open>.5&&(A.impulse({rot:(Math.random()<.5?-1:1)*14*S}),x.nextBob=a+n(.25,.45))}function W7(C,H){let e=x.vis[C],i=0,v=0,h=0;for(let b=Math.max(0,C-2);b<=Math.min(x.vis.length-1,C+2);b++)i=Math.max(i,x.vis[b].open),v+=x.vis[b].wf,h++;return[!!e.kind||e.open===0&&e.d>.05?0:i*(.5+.5*Math.abs(Math.sin(H*Math.PI*7.5))),h?v/h:1]}let U9=C=>{let H=x.vis,e=0,i=H.length-1;for(;e<i;){let v=e+i+1>>1;H[v].ci<=C?e=v:i=v-1}return e};function $9(C){t1("bubble"),Object.assign(x,{on:!0,kind:"stream",text:"",vis:[],rev:0,budget:0,pauseUntil:0,mouth:0,mbudget:0,mpauseUntil:0,replay:!1,final:!1,mode:C.expectAudio?"silent":"flap",playback:null,holdUntil:a+(C.hold||0),rate:38,shownChars:-1,idx:-1,done:null,short:!1,nextBob:a+.3,nextLook:a,waitAudioUntil:1/0,lastLevel:0,quietSince:a,blinked:!0,t0:a}),s2.textContent="",d1.hidden=!0,A.spring("mouth",{k:700,c:40}),A.setState("mouth.tongue",Math.min(U2("mouth.tongue",0),.2),0),d5(!0)}function j3(C){x.text=C,x.vis=E7(C),x.rev>C.length&&(x.rev=C.length)}function G9(C){if(!C)return;let H=x.text+C;x.text||(H=H.replace(/^\s+/,"")),j3(H.replace(/\s+/g," "))}function z9(C,H){let e=S0(C),i=S0(x.text);if(e&&e!==i)if(!i)j3(e);else if(e.startsWith(i))j3(e);else{let v=0;for(;v<Math.min(e.length,i.length)&&e[v]===i[v];)v++;x.rev=Math.min(x.rev,v),j3(e)}x.final=!0,x.done=H||null,x.mode==="silent"&&(x.waitAudioUntil=a+8),M.srSpeech.textContent=x.text}function Q9(){let C=x.text;if(a>=x.holdUntil&&a>=x.pauseUntil&&x.rev<C.length)for(x.budget+=x2*x.rate;x.budget>=1&&x.rev<C.length;){x.budget-=1;let H=C[x.rev];x.rev++;let e=C[x.rev];if(".!?…".includes(H)&&(e===void 0||e===" ")){x.pauseUntil=a+.22,x.budget=0;break}if(",;:".includes(H)){x.pauseUntil=a+.08,x.budget=0;break}}if(x.rev!==x.shownChars&&(x.shownChars=x.rev,x.rev>0&&(d1.hidden&&I7(!1),s2.textContent=C.slice(0,x.rev),d3())),x.mode==="flap"){let H=x.replay?x.mouth:x.rev;if(x.replay&&a>=x.mpauseUntil&&x.mouth<C.length)for(x.mbudget+=x2*38;x.mbudget>=1&&x.mouth<C.length;){x.mbudget-=1;let i=C[x.mouth++];if(".!?…".includes(i)){x.mpauseUntil=a+.22,x.mbudget=0;break}}let e=H>=C.length||a<x.holdUntil;if(C.length&&!e){let i=U9(Math.max(0,H-1));i!==x.idx&&(x.idx=i,N7(x.vis[i]));let v=a<(x.replay?x.mpauseUntil:x.pauseUntil),[h,O]=W7(i,a-x.t0);K3(v?0:h,O)}else f1.clear()}else if(x.mode==="audio"){let H=x.playback,e=H?H.level():0;e>.55&&x.lastLevel<=.55&&a>x.nextBob&&(A.impulse({rot:(Math.random()<.5?-1:1)*14*S}),x.nextBob=a+n(.25,.45)),e>.08?(x.quietSince=a,x.blinked=!1):!x.blinked&&a-x.quietSince>.4&&(x.blinked=!0,A.blink({close:70,hold:40,open:120})),x.lastLevel=e,K3(e,.9+.2*e)}else f1.clear();if(x.final&&x.rev>=C.length&&x.mode!=="audio"&&(!C||x.mode==="flap"&&(!x.replay||x.mouth>=C.length)&&a>=x.pauseUntil||x.mode==="silent"&&a>x.waitAudioUntil))return n3()}function K9(){f1.clear(),x.on&&(x.kind==="line"?W9():Q9(),x.on&&a>=x.nextLook&&!I.on&&(x.nextLook=a+n(1,2),c.inside||A.lookAt(60+n(-8,8),140+n(-6,6))))}function d3(){if(d1.hidden)return;let C=d1.offsetWidth,H=d1.offsetHeight,e=A.houseToWorld(88,12),i=A.houseToWorld(32,12),[v,h]=u5(e[0],e[1]),O=!1;if(v+6+C>i1.pxW-10){let b=u5(i[0],i[1]);b[0]-6-C>10?(v=b[0]-6-C,h=b[1],O=!0):v=r(i1.pxW/2-C/2,10,i1.pxW-C-10)}else v=v+6;h=r(h-H-8,8,i1.pxH-H-8),d1.classList.toggle("flip",O),d1.style.transform="translate("+v.toFixed(1)+"px,"+h.toFixed(1)+"px)"}let B={phase:null,t0:0,voice:!1,level:0,nod:0,source:"panel",typingAt:-9,offline:!1,satState:"idle"},U7=!1;function q3(C=0){t1("conv");let H=()=>{B.phase=null,B.voice=!1,j.rings=0,E5=1,l.system&&l.system.tag!=="offline"&&(l.system=B.offline?{id:"NoInternet",tag:"offline"}:null),A.lookAt(null)};C>0?K(C,H,"conv"):H()}function j9(){d1.hidden||(t1("bubble"),d1.classList.add("out"),K(.22,()=>{x.on||(d1.hidden=!0)},"bubble"))}function h0(){x.on&&(x.on=!1,x.done=null,f1.clear(),A.spring("mouth",null)),j9()}function $7(C){t1("conv"),h0(),E1("sudden"),d5(!0),t2.on=!1,B.phase="listen",B.t0=a,B.voice=!1,B.level=0,B.source=C.source||"panel",C.wake?(l.system={id:"Alert",tag:"pipe"},A.impulse({y:-90*S}),S5(),K(.6,()=>{B.phase==="listen"&&(l.system={id:"Focusing",tag:"listen"})},"conv")):l.system={id:"Focusing",tag:"listen"}}function f0(){B.phase!=="wait"&&(j.rings=0,E5=1,B.phase="wait",B.t0=a,d5(!0))}function q9(){t1("conv"),t2.fired.clear(),t2.on=!1,h0(),E1("sudden"),A.squash(.03,150),A.blink(),l1({V:.05,A:.1,F:.01,C:.15}),B.phase=null,f0()}function g0(C,H,e){t1("conv"),B.phase="talk",B.voice=!1,j.rings=0,l.system={id:C&&W.includes(C)?C:"Normal",tag:"chat"},$9({expectAudio:H,hold:e})}let Y9={Loving:.2,Grateful:.2,Happy:.15,Grinning:.15,Smiling:.1,Sad:-.2,Angry:-.15,Hurt:-.2,Scared:-.1};function y0(C){let H=W.includes(C.emotion)?C.emotion:"Normal";x.on&&x.kind==="stream"&&B.phase==="talk"?l.system={id:H,tag:"chat"}:g0(H,!!C.expectAudio,C.expectAudio?1.2:.25),l1({V:Y9[H]||0}),(H==="Loving"||H==="Grateful")&&l1({F:.03,I:-.2}),C.success&&A1("sparkle",{count:6,x:60,y:30,spread:110,life:.6,color:A.bodyColor},!0),z9(C.text,()=>{C.done?.(),q3(4)})}function X9(C){(!x.on||x.kind!=="stream")&&(g0(l.system?.id,!0,0),x.final=!0),x.mode="audio",x.playback=C,x.holdUntil=0;let H=x.text.length-x.rev,e=C.duration();x.rate=H>0?Number.isFinite(e)&&e>.6?r(H/(e-.3),10,38):16:38}function J9(){!x.on||x.kind!=="stream"||(x.playback=null,x.rev=x.text.length,x.final=!0,n3())}function C6(){!x.on||x.kind!=="stream"||(x.playback=null,x.mode="flap",x.holdUntil=0,x.rate=38,x.rev>0&&(x.replay=!0,x.mouth=0,x.mbudget=0))}function H6(C,H,e){x.on&&x.kind==="stream"&&B.phase==="talk"?H&&W.includes(H)&&(l.system={id:H,tag:"chat"}):g0(H,!!e,0),G9(C)}function V6(C){h0(),t1("conv"),B.phase="error",j.rings=0,l.system={id:C.offline?"NoInternet":"Problem",tag:"pipe"},C.offline&&void 0,K(.2,()=>U1(C.text||(C.offline?x1("oopsNet"):x1("notUnderstood")),{short:!0}),"conv-say"),q3(C.offline?3:2.2)}function L6(C=0){x.on&&x.kind==="stream"||q3(C)}function e6(C){C!==B.offline&&(B.offline=C,C?B.phase||(l.system={id:"NoInternet",tag:"offline"}):(l.system&&l.system.tag==="offline"&&(l.system=null),w("Grinning",1.6),M6()))}function M6(){let C=0,H=()=>{A.accessory("wifi",C%2?null:1),C++,C<6?K(.18,H):A.accessory("wifi",null)};H()}function p8(){}let $5=null;function b0(){t1("sat-pending");let C=$5;$5=null,C&&y0({text:C.text,emotion:C.emotion,expectAudio:!1})}function r6(C){let H=B.satState;B.satState=C,C!==H&&(C==="listening"?($5=null,$7({wake:!0,source:"satellite"})):C==="processing"?(B.phase!=="talk"&&f0(),B.source="satellite"):C==="responding"?(B.source="satellite",$5?b0():x.on&&x.kind==="stream"||(B.phase="murmur",B.t0=a,l.system={id:l.system&&l.system.tag==="chat"?l.system.id:"Normal",tag:"chat"})):C==="idle"&&($5?b0():(B.phase==="murmur"||B.phase==="listen"||B.phase==="wait")&&q3(B.phase==="murmur"?.6:0)))}function t6(C,H,e){if(W.includes(C)){if(e&&(B.phase==="murmur"||B.satState==="responding")){y0({text:H||"",emotion:C,expectAudio:!1});return}if(e&&(B.phase==="wait"||B.phase==="listen"||B.satState==="processing"||B.satState==="listening")){$5={emotion:C,text:H||""},l.system={id:C,tag:"chat"},B.phase="hold",t1("sat-pending"),K(2.5,b0,"sat-pending");return}B.phase||(E1("sudden"),w(C,3),H&&K(.25,()=>U1(H)))}}function i6(){P2.clear();let C=U7&&a-B.typingAt<2&&!!M.input()?.value;if(B.phase==="listen"){j.rings=1,E5=B.voice?1.9:1;let H=B.level;P2.set({"acc.bubbles":0}).add({"eyeL.s":.06+.06*H,"eyeR.s":.06+.06*H,"body.sy":.02+.03*H,"eyeL.y":-1,"eyeR.y":-1}),P2.set(Object.assign(T(86,10),{"mouth.s":1})),(!B.nod||a>B.nod)&&(B.nod=a+(B.voice?n(.45,.8):n(.8,1.4)),A.impulse({rot:12*S,y:20*S})),B.level*=.9;return}if(j.rings=0,B.phase==="wait"){let H=a-B.t0,e="Focusing";H<.6?(P2.set({"acc.bubbles":0}),A.lookAt(60,240)):H<2.5?e="Loading":H<8?e=Math.floor((H-2.5)/3)%2?"Focusing":"Loading":e="Sweating",l.system={id:e,tag:"chat"},H>.6&&H<.7&&A.lookAt(null);return}if(B.phase==="murmur"){let H=a-B.t0,e=.25+.5*Math.abs(Math.sin(H*Math.PI*3.1))*(.6+.4*Math.sin(H*1.7));x.on||K3(e,1);return}if(!B.phase)if(C||t2.on&&a<t2.until){t2.on&&a<t2.until?(l.system={id:t2.id,tag:"typing"},t2.fn&&t2.fn(a-t2.t0)):(t2.on=!1,l.system={id:"Focusing",tag:"typing"},P2.set({"acc.bubbles":0}).add({"eyeL.s":.05,"eyeR.s":.05}));let H=n6();if(H){let[e,i]=E2(H[0],H[1]);A.lookAt(e,i,{lean:.25})}E1("gentle")}else l.system&&l.system.tag==="typing"&&(l.system=B.offline?{id:"NoInternet",tag:"offline"}:null,A.lookAt(null),M.input()?.value&&w("Normal",1.2))}let t2={on:!1,id:null,t0:0,until:0,fn:null,fired:new Set},G7=C=>{let H=C<.9?o(6,16,m(C/.9)):C<1.3?16:o(16,6,m((C-1.3)/.6)),e=C<1.9?m(C/.3):1-m((C-1.9)/.3);P2.set(u1(H,88),e),P2.add({"eyeL.top":.3*e,"eyeR.top":.3*e,"eyeL.bot":.3*e,"eyeR.bot":.3*e,"body.sy":.05*e*S})},o6=[["merci",/\b(thanks|thank you|thx)\b/i,"Grateful",1.8,()=>A1("heart",{x:60,y:-4})],["love",/(love you|luv you|adore you|\bxoxo\b)/i,"Loving",2.2,()=>A1("heart",{count:3,x:60,y:0,spread:70})],["vexe",/\b(stupid|dumb|idiot|mean|ugly|useless)\b/i,"Sad",1.8,()=>l1({V:-.1,I:.05})],["dodo",/\b(sleep|sleepy|bedtime|tired|nap)\b/i,"Normal",2.2,null,G7],["lumiere",/\b(light|lights|lamp|turn on)\b/i,"Grinning",2.4,()=>{_5=a+3.2}],["salut",/\b(hello|hi|hey)\b/i,"Happy",1.4,()=>f5(.6)],["wifi",/(wi-?fi|internet|network)/i,"NoInternet",1.6,null]],a6=[["merci",/\bmerci\b/i,"Grateful",1.8,()=>A1("heart",{x:60,y:-4})],["love",/(t['’]aime|t['’]adore|je t['’]kiffe|bisou)/i,"Loving",2.2,()=>A1("heart",{count:3,x:60,y:0,spread:70})],["vexe",/\b(nul|nulle|bête|bete|idiot|idiote|méchant|méchante|moche)\b/i,"Sad",1.8,()=>l1({V:-.1,I:.05})],["dodo",/\b(dodo|dormir|sommeil|fatigu[ée]e?|sieste)\b/i,"Normal",2.2,null,G7],["lumiere",/(lumi[eè]re|lampe|allume|éclaire|eclaire)/i,"Grinning",2.4,()=>{_5=a+3.2}],["salut",/\b(bonjour|salut|coucou|hello)\b/i,"Happy",1.4,()=>f5(.6)],["wifi",/(wi-?fi|internet|réseau)/i,"NoInternet",1.6,null]];function A6(C){for(let[H,e,i,v,h,O]of z1==="fr"?a6:o6)if(!(t2.fired.has(H)||!e.test(C))){t2.fired.add(H),Object.assign(t2,{on:!0,id:i,t0:a,until:a+v,fn:O||null}),h&&h();return}}let p3=null;function n6(){let C=M.input();if(!C)return null;p3||(p3=document.createElement("canvas").getContext("2d"));let H=C.getBoundingClientRect(),e=getComputedStyle(C);if(!p3)return[H.left+H.width/2,H.top+H.height/2];p3.font=e.fontWeight+" "+e.fontSize+" "+e.fontFamily;let i=C.selectionStart==null?C.value.length:C.selectionStart,v=p3.measureText(C.value.slice(0,i)).width,h=H.left+parseFloat(e.paddingLeft)+v-C.scrollLeft;return[r(h,H.left,H.right),H.top+H.height/2]}function d6(C){l.system={id:"Initializing",tag:"boot"};let H=A.layer("boot",{priority:36});g5("boot",2.5,e=>{if(j.scan=e<1.6?1:0,e>=.3&&e<1.6){let i=e<.75?.1:1;H.set({"eyeL.s":1,"eyeR.s":1,"eyeL.open":i,"eyeR.open":i}),e>.95&&e<1.15?A.lookAt(-200,60):e>1.15&&e<1.35?A.lookAt(320,60):A.lookAt(null),e>1.4&&!H.blinked&&(H.blinked=!0,A.blink({double:!0}))}e>=1.6&&l.system&&l.system.id==="Initializing"&&(H.clear(),l.system={id:"Normal",tag:"boot"}),e>2.2&&!H.hopped&&(H.hopped=!0,f5(.6))},()=>{H.clear(),j.scan=0,l.system&&l.system.tag==="boot"&&(l.system=null),A.lookAt(null),C&&C()})}function z7(C,H){let e=a,i=c.samples[c.samples.length-1];if(i){let v=Math.max(.001,e-i.t),h=(C-i.x)/v,O=(H-i.y)/v;c.vx=o(c.vx,h,.5),c.vy=o(c.vy,O,.5),c.speed=Math.hypot(c.vx,c.vy)}for(c.samples.push({x:C,y:H,t:e});c.samples.length>60||c.samples.length&&e-c.samples[0].t>1.6;)c.samples.shift()}function Q7(C){c.type=C.pointerType||"mouse",c.cx=C.clientX,c.cy=C.clientY;let[H,e]=E2(C.clientX,C.clientY);c.wx=H,c.wy=e,c.lean=r3(C.clientX,C.clientY),z7(C.clientX,C.clientY),c.lastMove=a,c.mvx=c.vx,c.mvy=c.vy,c.inside||p6(),c.inside=!0,c.leftAt=null;let i=N3(H,e,6);if(c.hoverHouse=i.hit,F.classList.toggle("over",i.hit&&c.type==="mouse"),c.press)return m6(C,i);if(c.type!=="mouse")return;let v=Math.hypot(H-(60+(A.get("body.x")||0)),e-(66+(A.get("body.y")||0)));c.speed>1500&&v<80&&!I.on&&!R.on&&a-(c.flybyAt||-9)>3&&(c.flybyAt=a,w("Alert",.5),A.impulse({y:-80*S}),E1("sudden"),l1({A:.15})),i.hit&&i.region==="roof"&&c.speed>60&&c.speed<700&&(W5(1.5,60)>=3||s7(1.2)>250)?W3(H):i.hit&&(i.region==="face"||i.region==="eye")&&W5(.7,400)>=5&&U3(H),i.hit&&!c.wasOver&&l1({V:.05,A:.15,C:.2}),c.wasOver=i.hit,a-(c.lastInputPing||0)>.3&&(c.lastInputPing=a,E1(i.hit?"hover":null))}function p6(){l.miss?(l.miss=!1,w("Alert",.3),K(.3,()=>w("Happy",1.2))):c.leftAt!=null&&a-c.leftAt>3&&(w("Alert",.3),K(.3,()=>w("Happy",1)))}function O0(){if(c.press||I.on)return;if(c.inside=!1,c.leftAt=a,c.hoverHouse=!1,c.type!=="mouse"){A.lookAt(null);return}let C=c.wx,H=c.wy;K(.4,()=>{c.inside||A.lookAt(C+(C-60)*2,H+(H-60))},"leave"),K(1.2,()=>{c.inside||(A.lookAt(null),N&&!l.system&&Q3("lookAround"))},"leave")}let l3={dir:1,next:0};function l6(){c.inside||c.leftAt==null||c.type!=="mouse"||!N||l.system||l.acute||g.asleep||I.on||y5()||a-c.leftAt<3||l.miss||(a>l3.next&&(l3.dir=-l3.dir,l3.next=a+n(1.5,2.5)),n2.add({"body.rot":6*l3.dir*S}))}function K7(C){if(C.button!=null&&C.button>0)return;_1();let[H,e]=E2(C.clientX,C.clientY);c.wx=H,c.wy=e,c.type=C.pointerType||"mouse",c.samples.length=0,z7(C.clientX,C.clientY);let i=N3(H,e,c.type==="touch"?8:3);if(!i.hit){A.lookAt(H,e),E1("sudden"),l1({C:.15}),t1("look"),K(1.2,()=>{c.press||A.lookAt(null)},"look");return}C.preventDefault();try{F.setPointerCapture(C.pointerId)}catch{}c.press={id:C.pointerId,t0:a,cx0:C.clientX,cy0:C.clientY,wx0:H,wy0:e,region:i.region,info:i,mode:null,moved:0},K(.55,()=>{let v=c.press;v&&!v.mode&&v.moved<6&&(v.mode="hug",v9())},"press")}function m6(C,H){let e=c.press,i=Math.hypot(C.clientX-e.cx0,C.clientY-e.cy0);if(e.moved=Math.max(e.moved,i),e.mode==="drag"){$3(c.wx,c.wy,c.vx,c.vy);return}if(e.mode==="pet"){(H.hit||Math.abs(C.clientY-e.cy0)<40)&&W3(c.wx),Math.abs(C.clientY-e.cy0)>60&&(e.mode="drag",x0(e.wx0,e.wy0),$3(c.wx,c.wy,c.vx,c.vy));return}if(e.mode==="tickle"){U3(c.wx);return}if(e.mode==="hug")return;let v=c.type==="touch"?14:6;if(c.type!=="mouse"){let h=C.clientX-e.cx0,O=C.clientY-e.cy0,b=a-e.t0,M1=s7(a-e.t0+.05),Q=i>60&&M1<i*1.15;if(e.region==="roof"&&b<.2&&Math.abs(h)>6&&Math.abs(h)>Math.abs(O)*1.3){e.mode="pet",t1("press"),W3(c.wx);return}if(e.region==="roof"&&!(b>=.2||Q||Math.abs(O)>28))return;if(e.region!=="roof"&&(e.region==="face"||e.region==="eye")&&W5(.7,300)>=3&&i<40){e.mode="tickle",t1("press"),U3(c.wx);return}i>v&&!(i<24&&W5(.5,200)>=2)&&(e.mode="drag",t1("press"),x0(e.wx0,e.wy0),$3(c.wx,c.wy,c.vx,c.vy));return}if(e.region==="roof"&&W5(1.5,40)>=2&&Math.abs(C.clientY-e.cy0)<30){e.mode="pet",t1("press"),W3(c.wx);return}if((e.region==="face"||e.region==="eye")&&W5(.7,300)>=4&&i<40){e.mode="tickle",t1("press"),U3(c.wx);return}i>(e.region==="roof"?Math.max(v,22):v)&&(e.mode="drag",t1("press"),x0(e.wx0,e.wy0),$3(c.wx,c.wy,c.vx,c.vy))}let m3={t:-9,x:0,y:0};function j7(C){let H=c.press;if(H){c.press=null,t1("press");try{F.releasePointerCapture(C.pointerId)}catch{}if(H.mode==="drag"){a-c.lastMove>.12&&(I.vx=0,I.vy=0),S7();return}if(H.mode==="hug"){v7();return}if(!(H.mode==="pet"||H.mode==="tickle")){if(a-H.t0<.35&&H.moved<8){if(a-m3.t<.3&&Math.hypot(C.clientX-m3.x,C.clientY-m3.y)<30){m3.t=-9,x9();return}m3={t:a,x:C.clientX,y:C.clientY},x7(H.info)}c.type!=="mouse"&&(c.inside=!1,A.lookAt(null))}}}function q7(){if(c.press){let C=c.press;c.press=null,C.mode==="drag"&&S7(),C.mode==="hug"&&v7()}}let G5={ticks:[]};function Y7(C){let[H,e]=E2(C.clientX,C.clientY);if(N3(H,e,6).hit){for(C.preventDefault(),E1("sudden"),G5.ticks.push(a);G5.ticks.length&&a-G5.ticks[0]>1.5;)G5.ticks.shift();A.lookAt(60+(A.get("body.x")||0),66+(C.deltaY>0?300:-300)),t1("wheel"),K(.5,()=>A.lookAt(null),"wheel"),G5.ticks.length>12&&(G5.ticks.length=0,D1("shake",.3),w("Dead",1.2),A1("star",{count:3,orbit:{cx:60,cy:-6,r:22,ry:.27,speed:4.5},life:1.2},!0))}}function X7(C){if(C.target!==F)return;(C.key===" "||C.key==="Enter")&&(C.preventDefault(),x7({hx:n(30,90),hy:90,region:"face"}));let H={ArrowLeft:[-300,66],ArrowRight:[420,66],ArrowUp:[60,-300],ArrowDown:[60,400]};H[C.key]&&(C.preventDefault(),A.lookAt(H[C.key][0],H[C.key][1]),E1("gentle"),t1("look"),K(1.2,()=>A.lookAt(null),"look"))}function J7(C){let H=C.touches[0];if(!H)return;_1();let[e,i]=E2(H.clientX,H.clientY);N3(e,i,8).hit&&C.preventDefault()}function C4(C){c.press&&C.preventDefault()}let H4=C=>C.preventDefault(),V4=C=>{C.relatedTarget||O0()},$1={contactSince:null,awayUntil:0,glanceUntil:0,gx:0,gy:0};function s3(C,H,e,i=.15){$1.glanceUntil=a+(e||.4),$1.gx=C,$1.gy=H,$1.lean=i,A.lookAt(C,H,{lean:i})}function s6(){if(a<$1.glanceUntil){A.lookAt($1.gx,$1.gy,{lean:$1.lean??.15});return}if($1.glanceUntil&&a-$1.glanceUntil<.05&&($1.glanceUntil=0,A.lookAt(null)),!(I.on||y5()||g1.act&&["lookAround","glanceAtCursor","peekRoof","daydream","suspicious","peekaboo","lookUp"].includes(g1.name))&&!(B.phase==="wait"||l.system&&l.system.tag==="typing")&&!(g.asleep||U==="Sleeping"||U==="Dead"||U==="Initializing"||U==="Angry"||U==="Sad")){if(B1.name==="sulk"){A.lookAt(-300,80);return}if(!(!c.inside||c.type!=="mouse")){if(a<$1.awayUntil){A.lookAt(null);return}if($1.contactSince==null&&($1.contactSince=a),a-$1.contactSince>n(1.5,3)&&c.speed<40&&Math.random()<.3){$1.awayUntil=a+n(.6,1.2),$1.contactSince=null;return}c.speed>40&&($1.contactSince=a),A.lookAt(c.wx,c.wy,{lean:c.lean})}}}function k0(){return[60+(A.get("body.x")||0)+30,i1.y0+6]}function z5(C=f2){switch(C){case"rainy":case"pouring":case"hail":return"rain";case"lightning":case"lightning-rainy":return"storm";case"snowy":case"snowy-rainy":return"snow";case"sunny":return"sun";case"fog":return"fog";case"windy":case"windy-variant":return"wind";case"cloudy":case"partlycloudy":return"cloud";default:return"clear"}}function L4(C){let H=k0();s3(H[0],H[1],C,.5)}function x6(){let C=z5();_2.V=C==="sun"&&(r1==="day"||r1==="dawn")?.12:0,_2.A=C==="storm"||C==="snow"?.05:0,_2.E=0,v1()}let e4=-9;function v6(C,H,e){let i=r1,v=z5(f2);if(r1=C,f2=H,x6(),a2||(p1.E=t(p1.E)),e||!T0)return;let h=z5(H);i!==C&&C==="dawn"&&g.asleep&&N&&K(n(4,12),()=>{g.asleep&&p5("gentle",!0)}),!(h===v||g.asleep||l.system)&&(h==="rain"?(w0("rain",3.4),K(.9,()=>{Math.random()<.6&&U1(Z(x1("rain")),{short:!0})})):h==="snow"?(w0("snow",2.6),K(.5,()=>{f5(.8),A1("sparkle",{count:3,x:60,y:10,spread:80,life:.6,color:A.bodyColor}),U1(Z(x1("snow")),{short:!0})}),l1({A:.15})):h==="storm"||(h==="sun"&&(C==="day"||C==="dawn")?(w0("sun",2.8),K(.5,()=>{_5=a+1.6,(v==="rain"||v==="storm")&&U1(Z(x1("sun")),{short:!0})})):(h==="fog"||h==="wind")&&(L4(1.2),h==="wind"&&N&&K(.8,()=>Q3("shiver")))))}let S2={kind:null,t0:0,dur:0,from:[60,66]};function w0(C,H){Object.assign(S2,{kind:C,t0:a,dur:H,from:[60+(A.get("body.x")||0),66+(A.get("body.y")||0)]})}function u6(){if(p.clear(),!S2.kind)return;let C=a-S2.t0;if(C>=S2.dur||l.system||g.asleep||I.on||y5()){S2.kind=null;return}let H=m(C/.6)*(1-m((C-(S2.dur-.7))/.7)),e=k0();if(S2.kind==="rain"){if(p.add({"eyeL.top":.32*H,"eyeR.top":.32*H,"body.sy":-.02*H,"mouth.s":-.08*H,"mouth.bH":-3*H}),C<S2.dur-.6){let i=m((C-.15)/1.5);s3(o(S2.from[0],e[0],i),o(S2.from[1],e[1],i),.1,.35)}}else S2.kind==="snow"?(p.add({"eyeL.shine":H,"eyeR.shine":H,"eyeL.s":.12*H,"eyeR.s":.12*H,"body.sy":.02*H}),C<1.2&&s3(e[0],e[1],.1,.6)):S2.kind==="sun"&&(p.add({"eyeL.bot":.15*H,"eyeR.bot":.15*H,"mouth.bH":2.5*H,"mouth.s":.06*H}),C<1.1&&s3(e[0],e[1],.1,.5))}function c6(){if(!(!T0||a-e4<4)){if(e4=a,g.asleep){Math.random()<.3&&(E1("sudden"),U1(Z(x1("thunder")),{short:!0}));return}l.system||(w("Alert",.9),A.impulse({y:-120*S,sy:2*S}),A.layer("thunder",{priority:34}).set({"eyeL.s":1.2,"eyeR.s":1.2}).ttl(450),S5(),l1({A:.15}),K(.9,()=>L4(1)))}}let Y3=null;function M4(){if(document.hidden){Y3=Date.now(),k2(),o4();return}if(P0&&i4(),Y3==null)return;let C=(Date.now()-Y3)/1e3;Y3=null,C>300&&l1({V:-.1}),!B.phase&&(C<30?w("Alert",.4):C<300?(g.asleep&&p5("gentle"),w("Happy",1.5),K(.3,()=>U1(x1("back"),{short:!0}))):(g.asleep=!0,K(.6,()=>{p5("gentle",!0),D1("greet",.5),K(2.6,()=>{g.F>.6?(w("Pleading",.9),K(.9,()=>{w("Loving",2),U1(x1("missed"),{short:!0})})):w("Happy",1.4)})})),a5=C1)}function Z6(){let C=Date.now(),H=J1.lastSeen?(C-J1.lastSeen)/1e3:null;J1.visits=(J1.visits||0)+1,J1.firstSeen||(J1.firstSeen=C);let e=C2();H==null?(T2("Initializing",{noBlink:!0}),d6(()=>{w("Alert",.8),K(.8,()=>{U1(x1("hello")),w("Happy",2.4)})}),D1("greet",.6)):e&&H>600?(g.asleep=!0,T2("Sleeping",{noBlink:!0}),K(1.2,()=>{p5("gentle",!0),K(2.4,()=>U1(x1("late"),{short:!0}))}),D1("greet",.3)):H<600?(w("Happy",1.2),A.blink()):H<86400?(w("Happy",2),K(.5,()=>U1(e5?p0("reName",e5):x1("re"),{short:!0})),D1("greet",.5)):g.F>.5?(w("Loving",2.4),K(.4,()=>{A1("heart",{count:3,x:60,y:0,spread:70}),U1(x1("missed"),{short:!0})}),D1("greet",.8)):(w("Pleading",1),K(1,()=>{w("Smiling",2),U1(x1("shyHi"),{short:!0})}),D1("greet",.6)),J1.visits%10===0&&K(2.5,()=>{Q3("tinyDance");for(let i=0;i<24;i++)A.emit("dot",{x:n(0,120),y:-10,vx:n(-30,30),vy:n(-60,-20),gravity:120,life:1.2,color:i%2?$:A.bodyColor,s0:.9,s1:.6})}),k2()}let Q5=0,x3=0,r4=0,P0=!1,T0=!1;function t4(C){Q5=requestAnimationFrame(t4),x3||(x3=C);let H=Math.min(.05,(C-x3)/1e3);if(x3=C,x2=H,a+=H,C1+=H,a-c.lastMove>.12)c.speed=0,c.vx=0,c.vy=0;else if(a-c.lastMove>.04){let v=Math.exp(-H/.03);c.vx*=v,c.vy*=v,c.speed*=v}F3(),e3(H),n2.clear(),i6(),p9(),N&&(E9(),D9()),g.asleep&&N&&C1>_7&&!l.system&&!C2()&&p5("gentle",!0),I9(),_9(),m9(H),u9(),c9(H),Z9(H),S9(),f9(),g9(H),B9(H),u6(),s6(),l6(),N&&c.type==="mouse"&&!c.inside&&c.leftAt!=null&&a-c.leftAt>20&&g.F>.5&&!l.miss&&!B.phase&&(l.miss=!0),C2()&&!g.asleep&&!l.system&&!l.acute&&!N1.on&&C1-a5>8&&n2.add({"eyeL.top":.1,"eyeR.top":.1}),j.glow=a<_5?1:0,j.vein=0,j.cloud=0,j.dots=j.dots&&U==="WTF"?j.dots:0,j.scan=B1.name==="boot"?j.scan:0,!W1.on&&!j2&&!X1.on&&!I1.on&&(j.blush=0),X1.on&&(j.blush=1);let e=N5();e!==U&&T2(e,{startle:l.acute&&l.acute.id==="Alert"&&U==="Sleeping"}),G.clear(),H2.clear(),U!=="Dead"&&U!=="Hurt"&&(j.bandage=(R.hard>=2||s.hard>=2)&&a-T1<4?j.bandage:0);let i=T7[U];i&&i(Q1),U==="Initializing"&&(j.scan=1),K9(),n9(),h9(),A.step(H),D3(H),(x.on||!d1.hidden)&&d3(),a-r4>30&&(r4=a,k2())}function i4(){Q5||document.hidden||(x3=0,Q5=requestAnimationFrame(t4))}function o4(){Q5&&cancelAnimationFrame(Q5),Q5=0}let X3={passive:!0};F.addEventListener("pointerdown",K7),F.addEventListener("keydown",X7),F.addEventListener("wheel",Y7,{passive:!1}),F.addEventListener("touchstart",J7,{passive:!1}),F.addEventListener("touchmove",C4,{passive:!1}),F.addEventListener("contextmenu",H4),document.addEventListener("pointermove",Q7,X3),document.addEventListener("pointerup",j7),document.addEventListener("pointercancel",q7),document.documentElement.addEventListener("pointerleave",O0),document.addEventListener("mouseout",V4),document.addEventListener("visibilitychange",M4),window.addEventListener("scroll",_1,X3),window.addEventListener("devicemotion",b7,X3),F.addEventListener("touchend",z3,X3),F.addEventListener("click",z3),t3(),M5(),A.step(.016);let a4={start(){P0=!0,T0=!0,i4()},stop(){P0=!1,o4(),k2()},destroy(){a4.stop(),F.removeEventListener("pointerdown",K7),F.removeEventListener("keydown",X7),F.removeEventListener("wheel",Y7),F.removeEventListener("touchstart",J7),F.removeEventListener("touchmove",C4),F.removeEventListener("contextmenu",H4),document.removeEventListener("pointermove",Q7),document.removeEventListener("pointerup",j7),document.removeEventListener("pointercancel",q7),document.documentElement.removeEventListener("pointerleave",O0),document.removeEventListener("mouseout",V4),document.removeEventListener("visibilitychange",M4),window.removeEventListener("scroll",_1),window.removeEventListener("devicemotion",b7),F.removeEventListener("touchend",z3),F.removeEventListener("click",z3)},layout(){M5(),t3(),d1.hidden||d3()},setLang(C){C!==z1&&(z1=C,F2=R2[C])},setUserName(C){e5=C},setAutonomous(C){N=C,C?a5=C1:(d5(!0),F7(),l.flavor=null,(g.asleep||B1.name==="fallAsleep")&&(g5(null),p5("gentle",!0)))},setMood:_3,setAmbience:v6,lightning:c6,greet:Z6,typing(C,H=!0){B.typingAt=a,C?!B.phase&&H&&A6(C):t2.fired.clear()},inputFocus(C){if(U7=C,C){let H=M.input();if(H){let e=H.getBoundingClientRect(),[i,v]=E2(e.left+40,e.top+e.height/2);s3(i,v,.4)}}},userSent:q9,listen:$7,voice(C){B.voice=C,C&&B.phase==="listen"&&(A.impulse({y:-40*S}),A.blink({close:60,hold:30,open:100})),!C&&B.phase==="listen"&&A.impulse({rot:10*S,y:30*S})},voiceLevel(C){B.level=Math.max(B.level,t((C-.01)*8))},think:f0,streamText:H6,reply:y0,speak:X9,speechEnded:J9,speechFailed:C6,fail:V6,endConversation:L6,setOffline:e6,satellite:r6,react:t6,get expression(){return U},get conversing(){return!!B.phase},get talking(){return x.on},anchorPx(){let C=A.houseToWorld(60,0);return u5(C[0],C[1])},houseToPx(C,H){let e=A.houseToWorld(C,H);return u5(e[0],e[1])},debug(){return{expression:U,source:l.source,phase:B.phase,talk:x.on?{kind:x.kind,mode:x.mode,text:x.text,rev:x.rev}:null,motion:{secure:window.isSecureContext,permission:b5,events:y7,sign:f7(),live:s.live,sleep:s.sleep,x:Math.round(s.x-60),y:Math.round(s.y-i2.cy),rot:Math.round(s.th*180/Math.PI),speed:Math.round(Math.hypot(s.vx,s.vy)),touch:s.touch,shaking:E.shaking},mood:{...g},backend:a2,delta:{...g2},weather:f2,dayPhase:r1,weatherFx:S2.kind,glance:a<$1.glanceUntil?{x:$1.gx,y:$1.gy,top:i1.y0,height:i1.h}:null,bodyColor:A.bodyColor,asleep:g.asleep,act:g1.name,reaction:B1.name,auto:N}}};return a4}var i8=`
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
`,o8=M=>{switch(M){case"NotAllowedError":case"SecurityError":return"permission_denied";case"NotFoundError":case"OverconstrainedError":return"not_found";case"NotReadableError":return"in_use";default:return"unknown"}},V3=class M{constructor(V){this._onChunk=V;this._active=!1;this.sampleRate=16e3}static get isSupported(){return window.isSecureContext&&"AudioContext"in window&&"AudioWorkletNode"in window&&!!navigator.mediaDevices?.getUserMedia}get active(){return this._active}async start(){if(!M.isSupported)return"not_supported";if(this._context&&this._stream&&this._node){this._stream.getTracks().forEach(L=>L.enabled=!0),await this._context.resume(),this._active=!0;return}let V;try{let L=new AudioContext;this._context=L,this._stream=await navigator.mediaDevices.getUserMedia({audio:{channelCount:1,echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}}),V=URL.createObjectURL(new Blob([i8],{type:"application/javascript"})),await L.audioWorklet.addModule(V),this._source=L.createMediaStreamSource(this._stream),this._node=new AudioWorkletNode(L,"casita-recorder"),this._node.port.onmessage=r=>{this._active&&this._onChunk(r.data.pcm,r.data.rms)},this._source.connect(this._node),this._active=!0;return}catch(L){return this.close(),o8(L instanceof DOMException?L.name:void 0)}finally{V&&URL.revokeObjectURL(V)}}async stop(){this._active=!1,this._stream?.getTracks().forEach(V=>V.enabled=!1);try{await this._context?.suspend()}catch{}}close(){this._active=!1,this._stream?.getTracks().forEach(V=>V.stop()),this._node&&(this._node.port.onmessage=null),this._source?.disconnect(),this._context?.close().catch(()=>{}),this._stream=void 0,this._source=void 0,this._node=void 0,this._context=void 0}};var n0=M=>M.callWS({type:"assist_pipeline/pipeline/list"}),A7=(M,V,L)=>M.connection.subscribeMessage(V,{...L,type:"assist_pipeline/run"}),R3="conversation.casita",X4=(M,V)=>M.callWS({type:"assist_pipeline/pipeline/create",...V}),J4=(M,V,L)=>M.callWS({type:"assist_pipeline/pipeline/update",pipeline_id:V.id,name:V.name,language:V.language,conversation_engine:V.conversation_engine,conversation_language:V.conversation_language,stt_engine:V.stt_engine??null,stt_language:V.stt_language??null,tts_engine:V.tts_engine??null,tts_language:V.tts_language??null,tts_voice:V.tts_voice??null,wake_word_entity:V.wake_word_entity??null,wake_word_id:V.wake_word_id??null,prefer_local_intents:!!V.prefer_local_intents,...L}),C9=M=>M.callWS({type:"conversation/agent/list"}),H9=(M,V)=>/connection|network|unreachable|disconnect|cloud|timeout|stream-failed|socket|lost/i.test(`${M??""} ${V??""}`),V9=/^\s*\[\s*emotion\s*:\s*([A-Za-z]+)\s*\]\s*/i,Y4="[emotion:",A0=class{constructor(){this._buf="";this._open=!0}newMessage(){this._open=!0,this._buf=""}push(V){if(!this._open)return V;this._buf+=V;let L=this._buf.match(V9);if(L){T3(L[1])&&(this.emotion=L[1]);let n=this._buf.slice(L[0].length);return this._open=!1,this._buf="",n}let r=this._buf.toLowerCase().replace(/\s+/g,"");if(r.length===0||Y4.startsWith(r)||r.startsWith(Y4)&&!r.includes("]")&&r.length<40)return"";this._open=!1;let o=this._buf;return this._buf="",o}flush(){let V=this._buf;return this._buf="",this._open=!1,V}},L9=M=>{let V=M.match(V9);return V?{text:M.slice(V[0].length),emotion:T3(V[1])?V[1]:void 0}:{text:M}};var n7,e9=()=>{if(!n7)try{n7=new AudioContext}catch{return}return n7},d7=()=>{let M=e9();M&&M.state==="suspended"&&M.resume().catch(()=>{})},M9=(M,V={})=>{let L=new Audio;L.preload="auto";let r,t,o,n=0,Z=!1,m=!1,y=!1,P=e9();if(P)try{o=P.createMediaElementSource(L),r=P.createAnalyser(),r.fftSize=1024,r.smoothingTimeConstant=.1,t=new Float32Array(r.fftSize),o.connect(r),r.connect(P.destination)}catch{r=void 0}let S=W=>{if(!y){y=!0,m=!1;try{L.pause(),L.removeAttribute("src"),L.load()}catch{}try{o?.disconnect(),r?.disconnect()}catch{}W!==void 0?V.onError?.(W):V.onEnd?.()}},$={level(){if(!r||!t||!m)return 0;r.getFloatTimeDomainData(t);let W=0;for(let d1=0;d1<t.length;d1++)W+=t[d1]*t[d1];let F=Math.sqrt(W/t.length);F>.004&&(Z=!0);let y1=Math.max(0,F-.01)*5,A=Math.min(1,y1/(.35+y1)*1.35);return n+=(A-n)*(A>n?.6:.25),n},get heard(){return Z},get playing(){return m},duration(){return L.duration},stop(){S()}};return L.addEventListener("playing",()=>{y||m||(m=!0,V.onStart?.($))}),L.addEventListener("ended",()=>S()),L.addEventListener("error",()=>S(L.error??new Error("audio error"))),L.src=M,P&&P.state==="suspended"&&P.resume().catch(()=>{}),L.play().catch(W=>S(W??new Error("play rejected"))),$};var a8=900,d0=class{constructor(V,L){this._host=V;this._deps=L;this.listening=!1;this.busy=!1;this.conversationId=null;this._n=0;V.addController(this)}hostDisconnected(){this.cancel(),this._recorder?.close(),this._recorder=void 0}get micSupported(){return V3.isSupported}cancel(){let V=this._run;this._run=void 0,V&&!V.ended&&(V.ended=!0,Promise.resolve(V.unsub?.()).catch(()=>{})),this._stopListening(),this._stopAudio(),this._setBusy(!1)}async sendText(V){V=V.trim();let L=this._deps.hass();if(!V||!L)return;d7(),this.cancel(),this._deps.life()?.userSent();let r=this._deps.pipeline(),t=this._newRun(!1,r);try{t.unsub=await A7(L,o=>this._onEvent(t,o),{start_stage:"intent",end_stage:t.expectAudio?"tts":"intent",input:{text:V},pipeline:r?.id,conversation_id:this.conversationId}),t.ended&&Promise.resolve(t.unsub()).catch(()=>{})}catch(o){this._failRun(t,String(o?.code??"connection"),o?.message)}}toggleMic(){this.listening?this._finishSpeaking():this.startListening()}async startListening(){let V=this._deps.hass();if(!V)return;if(d7(),this.cancel(),!V3.isSupported){this._deps.note(this._deps.strings().micUnsupported);return}let L=this._deps.pipeline(),r=this._newRun(!0,L);this._recorder||(this._recorder=new V3((o,n)=>{this._deps.life()?.voiceLevel(n),this._audioBuffer?this._audioBuffer.push(o):this._sendAudioChunk(o)})),this._handlerId=void 0,this._audioBuffer=[];let t=await this._recorder.start();if(r===this._run){if(t){this._audioBuffer=void 0,this._run=void 0,this._setBusy(!1),this._deps.note(this._micError(t));return}this.listening=!0,this._host.requestUpdate(),this._deps.life()?.listen({wake:!0,source:"panel"});try{r.unsub=await A7(V,o=>this._onEvent(r,o),{start_stage:"stt",end_stage:r.expectAudio?"tts":"intent",input:{sample_rate:this._recorder.sampleRate},pipeline:L?.id,conversation_id:this.conversationId}),r.ended&&Promise.resolve(r.unsub()).catch(()=>{})}catch(o){this._stopListening(),this._failRun(r,String(o?.code??"connection"),o?.message)}}}_micError(V){let L=this._deps.strings();switch(V){case"not_supported":return L.micUnsupported;case"permission_denied":return L.micDenied;case"not_found":return L.micNotFound;case"in_use":return L.micInUse;default:return L.micError}}_finishSpeaking(){this._stopListening()}_stopListening(){if(this._recorder?.stop(),this._handlerId!=null){if(this._audioBuffer)for(let V of this._audioBuffer)this._sendAudioChunk(V);this._sendAudioChunk(new Int16Array),this._handlerId=void 0}this._audioBuffer=void 0,this.listening&&(this.listening=!1,this._host.requestUpdate())}_sendAudioChunk(V){let L=this._deps.hass()?.connection.socket;if(this._handlerId==null||!L)return;L.binaryType="arraybuffer";let r=new Uint8Array(1+V.length*2);r[0]=this._handlerId,r.set(new Uint8Array(V.buffer,V.byteOffset,V.byteLength),1),L.send(r)}onCasitaEmotion(V){let L=this._run;if(!L||!L.intentStarted||L.emotionEvent||L.ended&&!L.waiters.length)return!1;let r=Date.now()-L.intentStarted<12e4,t=L.pipeline?.conversation_engine;return V.agent_id&&t&&V.agent_id!==t||!(V.conversation_id?V.conversation_id===L.convId:!V.device_id&&r)?!1:(L.emotionEvent=V,L.waiters.splice(0).forEach(Z=>Z(V)),!0)}_waitEmotion(V){return V.emotionEvent?Promise.resolve(V.emotionEvent):new Promise(L=>{let r=setTimeout(()=>{V.waiters=V.waiters.filter(o=>o!==t),L(void 0)},a8),t=o=>{clearTimeout(r),L(o)};V.waiters.push(t)})}_newRun(V,L){let r={n:++this._n,voice:V,pipeline:L,expectAudio:!!L?.tts_engine,audioStarted:!1,stripper:new A0,streamed:!1,replied:!1,ended:!1,continueConversation:!1,waiters:[],intentStarted:0,casita:!1};return r.casita=this._isCasita(r),this._run=r,this._setBusy(!0),r}_isCasita(V){let L=V.pipeline?.conversation_engine,r=this._deps.info();return!!L&&(L===R3||!!r?.entries.some(t=>t.conversation_entity===L))}_onEvent(V,L){if(V!==this._run||V.ended)return;let r=this._deps.life();switch(L.type){case"run-start":this._handlerId=L.data.runner_data?.stt_binary_handler_id??void 0,L.data.tts_output?.url&&(V.ttsUrl=L.data.tts_output.url),L.data.conversation_id&&(V.convId=L.data.conversation_id);break;case"wake_word-end":r?.listen({wake:!0,source:"panel"});break;case"stt-start":if(this._audioBuffer){for(let t of this._audioBuffer)this._sendAudioChunk(t);this._audioBuffer=void 0}break;case"stt-vad-start":r?.voice(!0);break;case"stt-vad-end":r?.voice(!1);break;case"stt-end":{this._handlerId=void 0,this._stopListening();let t=L.data.stt_output?.text?.trim();t&&this._deps.note(`« ${t} »`),r?.think();break}case"intent-start":V.intentStarted=Date.now(),L.data.conversation_id&&(V.convId=L.data.conversation_id),r?.think();break;case"intent-progress":{L.data.tts_start_streaming&&V.ttsUrl&&V.expectAudio&&this._startAudio(V,V.ttsUrl);let t=L.data.chat_log_delta;if(!t)break;if(t.role&&(V.role=t.role,t.role==="assistant"&&V.stripper.newMessage()),V.role==="assistant"&&t.content){let o=V.stripper.push(t.content);o&&(V.streamed=!0,r?.streamText(o,V.casita?V.stripper.emotion:void 0,V.expectAudio))}break}case"intent-end":this._onIntentEnd(V,L.data.intent_output,!!L.data.processed_locally),V.expectAudio||this._endRun(V);break;case"tts-start":break;case"tts-end":!V.audioStarted&&L.data.tts_output?.url&&this._startAudio(V,L.data.tts_output.url);break;case"run-end":this._endRun(V);break;case"error":this._failRun(V,L.data.code,L.data.message);break}}async _onIntentEnd(V,L,r){let t=this._deps.life();V.replied=!0,L?.conversation_id&&(this.conversationId=L.conversation_id,V.convId=V.convId??L.conversation_id),V.continueConversation=!!L?.continue_conversation;let o=L?.response?.speech?.plain?.speech??"",n=V.stripper.flush();n&&!o&&t?.streamText(n,V.casita?V.stripper.emotion:void 0,V.expectAudio);let{text:Z,emotion:m}=L9(o),y="Normal";if(V.casita&&!r){let S=await this._waitEmotion(V);if(V!==this._run)return;y=(S&&T3(S.emotion)?S.emotion:void 0)??V.stripper.emotion??m??"Normal"}let P=V.expectAudio&&!!Z;t?.reply({text:Z,emotion:y,expectAudio:P,success:V.casita&&!r&&L?.response?.response_type==="action_done",done:()=>{(!V.expectAudio||!Z)&&this._maybeContinue(V)}})}_startAudio(V,L){let r=this._deps.hass();if(!r||V.audioStarted)return;V.audioStarted=!0,this._stopAudio();let t=this._deps.life();this._playback=M9(r.hassUrl(L),{onStart:o=>{V!==this._run&&this._run||(t?.speak(o),clearTimeout(this._heardTimer),this._heardTimer=setTimeout(()=>{o.playing&&!o.heard&&t?.speechFailed()},900))},onEnd:()=>{clearTimeout(this._heardTimer),this._playback=void 0,t?.speechEnded(),this._maybeContinue(V)},onError:()=>{clearTimeout(this._heardTimer),this._playback=void 0,t?.speechFailed()}})}_stopAudio(){clearTimeout(this._heardTimer);let V=this._playback;this._playback=void 0,V?.stop()}_maybeContinue(V){!V.continueConversation||V.n!==this._n||(V.continueConversation=!1,V.voice&&setTimeout(()=>this.startListening(),350))}_endRun(V){V.ended||(V.ended=!0,Promise.resolve(V.unsub?.()).catch(()=>{}),V===this._run&&(this._stopListening(),this._setBusy(!1),V.replied||this._deps.life()?.endConversation()))}_failRun(V,L,r){if(V!==this._run)return;let t=this._deps.strings();this._stopListening(),this._stopAudio(),V.ended=!0,Promise.resolve(V.unsub?.()).catch(()=>{}),this._run=void 0,this._setBusy(!1);let o=H9(L,r)||this._deps.hass()?.connected===!1,n=L==="stt-no-text-recognized"?t.notUnderstood:o?t.oopsNet:t.oops;this._deps.life()?.fail({offline:o,text:n})}_setBusy(V){this.busy!==V&&(this.busy=V,this._host.requestUpdate())}};var t9={},i9="casita",o9="casita.settings",r9=M=>{let V={};if(!M||typeof M!="object"||Array.isArray(M))return V;let L=M;return typeof L.pipeline_id=="string"&&L.pipeline_id&&(V.pipeline_id=L.pipeline_id),V},A8=()=>{try{return JSON.parse(localStorage.getItem(o9)||"null")}catch{return null}},n8=M=>{try{localStorage.setItem(o9,JSON.stringify(M))}catch{}},a9=async M=>{try{let V=await M.callWS({type:"frontend/get_user_data",key:i9});if(V&&V.value!=null)return r9(V.value)}catch{}return r9(A8())},p7=async(M,V)=>{n8(V);try{await M.callWS({type:"frontend/set_user_data",key:i9,value:V})}catch{}};var d8=()=>!!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,A9=M=>{if(!M){let L=new Date().getHours();return L>=6&&L<9?"dawn":L>=9&&L<18?"day":L>=18&&L<21?"dusk":"night"}let V=Number(M.attributes.elevation);return Number.isFinite(V)?V>8?"day":V<-6?"night":M.attributes.rising?"dawn":"dusk":M.state==="above_horizon"?"day":"night"},S1=class extends l2{constructor(){super(...arguments);this.narrow=!1;this._settings={...t9};this._hudOpen=!1;this._settingsOpen=!1;this._expression="Normal";this._phase=A9(void 0);this._condition=null;this._creating=!1;this._fixing=!1;this._lang="en";this._rm=d8();this._conv=new d0(this,{hass:()=>this.hass,life:()=>this._life,pipeline:()=>this._pipeline,info:()=>this._info,strings:()=>R2[this._lang],note:L=>this._showNote(L)});this._throttle=new o0((L,r)=>this._interact(L,r));this._seen={states:{}};this._recentEmotions=[];this._ready=!1;this._faceReady=!1;this._onVisible=()=>{!document.hidden&&this._ready&&this._refreshPipelines()};this._onKeyDown=L=>{L.key==="Escape"&&this._hudOpen&&!this._settingsOpen&&(L.stopPropagation(),this._hudOpen=!1,this._moodBtn?.focus())};this._ambienceInitial=!0}connectedCallback(){super.connectedCallback(),this._ready&&(this._life?.start(),this._subscribeEvents(),this._observe(),this._refreshPipelines(),this._scheduleStorm()),document.addEventListener("visibilitychange",this._onVisible)}disconnectedCallback(){super.disconnectedCallback(),this._life?.stop(),this._resize?.disconnect(),this._resize=void 0,this._unsubscribeEvents(),clearTimeout(this._noteTimer),clearTimeout(this._stormTimer),this._stormTimer=void 0,document.removeEventListener("visibilitychange",this._onVisible)}async _refreshPipelines(){if(this.hass)try{this._pipelines=await n0(this.hass),this._processHass(!1)}catch{}}willUpdate(L){if(L.has("hass")&&this.hass){let r=j4(this.hass.locale?.language??this.hass.language);r!==this._lang&&(this._lang=r,this._life?.setLang(r)),this.toggleAttribute("dark",!!this.hass.themes?.darkMode),this._ready?this._processHass(!1):this._faceReady&&queueMicrotask(()=>this._init())}}async firstUpdated(){await this._faceEl.updateComplete,this._faceReady=!0,this._init()}_init(){let L=this._faceEl?.face;this._ready||!this._faceReady||!L||!this.hass||(this._life=q4({stage:this._room,svg:this._faceEl.svg,face:L,bubble:this._bubble,bubbleText:this._bubbleText,srSpeech:this._srSpeech,input:()=>this._input,onInteract:(r,t)=>this._throttle.report(r,t),onExpression:r=>{this._expression=r}},{lang:this._lang,reducedMotion:this._rm,autonomous:!0,userName:this.hass.user?.name?.split(" ")[0]}),this._ready=!0,this._observe(),this._processHass(!0),this._life.greet(),this._life.start(),this._subscribeEvents(),this._load())}updated(L){let r=L;if(r.has("_condition")||r.has("_phase")){let t=B3(r.has("_condition")?r.get("_condition"):this._condition,r.has("_phase")?r.get("_phase"):this._phase);B3(this._condition,this._phase)==="storm"&&t!=="storm"&&!this._ambienceInitial&&this.strike(),this._scheduleStorm()}this._ambienceInitial=!1,L.has("hass")&&L.get("hass")?.themes?.darkMode!==this.hass?.themes?.darkMode&&requestAnimationFrame(()=>this._life?.layout())}_observe(){this._resize||!this._room||(this._resize=new ResizeObserver(()=>this._life?.layout()),this._resize.observe(this._room))}async _load(){let L=this.hass,[r,t,o]=await Promise.allSettled([G4(L),a9(L),n0(L)]);t.status==="fulfilled"&&(this._settings=t.value),o.status==="fulfilled"&&(this._pipelines=o.value),r.status==="fulfilled"&&(this._info=r.value),this._processHass(!0)}get _casitaPipelines(){return(this._pipelines?.pipelines??[]).filter(L=>L.conversation_engine===R3||!!a0(this._info,L.conversation_engine))}get _defaultPipeline(){let L=this._pipelines;if(!L)return;let r=L.pipelines.find(o=>o.id===L.preferred_pipeline),t=this._casitaPipelines;return(r&&t.includes(r)?r:t[0])??r??L.pipelines[0]}get _pipeline(){return this._pipelines?.pipelines.find(L=>L.id===this._settings.pipeline_id)??this._defaultPipeline}get _empty(){return!!this._pipelines&&!this._casitaPipelines.length}get _entry(){return z4(this._info,this._pipeline?.conversation_engine)}get _casitaPipeline(){let L=this._pipeline?.conversation_engine;return!!L&&(L===R3||!!a0(this._info,L))}get _localWarning(){return this._casitaPipeline&&!!this._pipeline?.prefer_local_intents}get _weatherEntity(){let L=this._entry?.weather_entity;if(L)return L;let r=Object.keys(this.hass?.states??{}).filter(t=>t.startsWith("weather."));return r.length===1?r[0]:void 0}get _satellites(){let L=this.hass,r=this._entry,t=this._pipelines;if(!L?.entities||!r?.conversation_entity||!t)return[];if(this._satCache?.entities!==L.entities){let n=new Map;for(let m of Object.values(L.entities))m.device_id&&m.entity_id.startsWith("select.")&&(m.translation_key==="pipeline"||m.translation_key==="pipeline_n"&&!n.has(m.device_id))&&n.set(m.device_id,m.entity_id);let Z=[];for(let m of Object.values(L.entities)){let y=m.device_id&&m.entity_id.startsWith("assist_satellite.")?n.get(m.device_id):void 0;y&&Z.push([m.entity_id,m.device_id,y])}this._satCache={entities:L.entities,pairs:Z}}let o=t.pipelines.find(n=>n.id===t.preferred_pipeline);return this._satCache.pairs.filter(([,,n])=>{let Z=L.states[n]?.state;return(Z==="preferred"?o:t.pipelines.find(y=>y.name===Z))?.conversation_engine===r.conversation_entity}).map(([n,Z])=>[n,Z])}_changed(L){if(!L)return!1;let r=this.hass.states[L];return this._seen.states[L]===r?!1:(this._seen.states[L]=r,r)}_processHass(L){let r=this._life,t=this.hass;if(!r||!t)return;L&&(this._seen.states={});let o=t.connected!==!1;this._seen.connected!==o&&(this._seen.connected=o,r.setOffline(!o));let n=this._info,Z=this._entry,m=Z?.entry_id!==this._seen.entry;this._seen.entry=Z?.entry_id;let y=!1;if(Z){for(let W of H3){let F=Z.mood_entities[W];F&&this._changed(F)!==!1&&(y=!0)}(y||L||m)&&r.setMood(K4(t,Z))}else(L||m)&&r.setMood(void 0);let P=this._changed("sun.sun"),S=this._weatherEntity,$=this._changed(S);if(L||P!==!1||$!==!1||!S&&this._condition!==null){let W=A9(t.states["sun.sun"]),F=S?t.states[S]?.state??null:null,y1=F==="unavailable"||F==="unknown"?null:F;(L||W!==this._phase||y1!==this._condition)&&(L&&(this._ambienceInitial=!0),this._phase=W,this._condition=y1,r.setAmbience(W,y1,L))}for(let[W]of this._satellites){let F=this._changed(W);F&&!L&&r.satellite(F.state)}for(let W of n?.entries??[]){let F=this._changed(W.emotion_entity);if(!F)continue;let y1=F.attributes,A={emotion:F.state,text:y1.text,conversation_id:y1.conversation_id,device_id:y1.device_id,agent_id:y1.agent_id||W.conversation_entity,source:y1.source,updated:y1.updated};L?this._remember(A):this._onEmotion(A)}}_emotionKey(L){return`${L.agent_id??""}|${L.updated??""}|${L.emotion}|${L.conversation_id??""}`}_remember(L){let r=this._emotionKey(L);return this._recentEmotions.includes(r)?!1:(this._recentEmotions.push(r),this._recentEmotions.length>12&&this._recentEmotions.shift(),!0)}_onEmotion(L){if(!L?.emotion||!this._remember(L)||this._conv.onCasitaEmotion(L))return;let r=this._entry;if(L.agent_id&&r&&L.agent_id!==r.conversation_entity)return;let t=!!L.device_id&&this._satellites.some(([,o])=>o===L.device_id);this._life?.react(L.emotion,L.text||void 0,t)}_subscribeEvents(){this._unsubEvents||!this.hass?.user?.is_admin||(this._unsubEvents=this.hass.connection.subscribeEvents(L=>this._onEmotion(L.data),"casita_emotion").catch(()=>{}))}_unsubscribeEvents(){let L=this._unsubEvents;this._unsubEvents=void 0,L?.then(r=>r?.()).catch(()=>{})}_interact(L,r){let t=this._entry;!this.hass||!t||this.hass.callService("casita","interact",{kind:L,intensity:r,entry_id:t.entry_id}).catch(()=>{})}_showNote(L){clearTimeout(this._noteTimer),this._note=L,L&&(this._noteTimer=setTimeout(()=>this._note=void 0,5e3))}_submit(L){L.preventDefault();let r=this._input.value;r.trim()&&(this._input.value="",this._life?.typing(""),!this._pipelines?.pipelines.length&&this._pipelines&&this._showNote(R2[this._lang].noPipeline),this._conv.sendText(r))}_onInput(){this._life?.typing(this._input.value,this._casitaPipeline)}_toggleMic(){this._conv.toggleMic()}_toggleHud(){this._hudOpen=!this._hudOpen}_openSettings(){this._settingsOpen=!0,this._refreshPipelines()}_settingsChanged(L){let r=this._weatherEntity,t=this._satellites.map(([o])=>o);this._settings=L.detail.settings,this._fixError=void 0,p7(this.hass,this._settings);for(let o of[r,this._weatherEntity,...t])o&&delete this._seen.states[o];this._processHass(!1)}_scheduleStorm(){clearTimeout(this._stormTimer),this._stormTimer=void 0,!(!this.isConnected||B3(this._condition,this._phase)!=="storm")&&(this._stormTimer=setTimeout(()=>{document.hidden||this.strike(),this._scheduleStorm()},6e3+Math.random()*9e3))}strike(){let L=this.renderRoot.querySelector(".flash");L&&(L.classList.remove("on"),L.offsetWidth,L.classList.add("on")),setTimeout(()=>this._life?.lightning(),160)}_openAssistants(L){L.preventDefault(),history.pushState(null,"","/config/voice-assistants/assistants"),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1},bubbles:!0,composed:!0}))}async _createAssistant(){let L=this.hass,r=R2[this._lang],t=this._entry;if(!(!L||this._creating)){if(this._createError=void 0,!t?.conversation_entity){this._createError=r.createFailed;return}this._creating=!0;try{let o=this._pipelines??await n0(L),n=o.pipelines.find($=>$.id===o.preferred_pipeline),Z=L.config?.language||L.language||"en",m=Z;try{let{agents:$}=await C9(L);$.find(W=>W.id===t.conversation_entity)?.supported_languages==="*"&&(m="*")}catch{}let y=new Set(o.pipelines.map($=>$.name)),P="Casita";for(let $=2;y.has(P);$++)P=`Casita ${$}`;let S=await X4(L,{name:P,language:n?.language??Z,conversation_engine:t.conversation_entity,conversation_language:m,prefer_local_intents:!1,stt_engine:n?.stt_engine??null,stt_language:n?.stt_language??null,tts_engine:n?.tts_engine??null,tts_language:n?.tts_language??null,tts_voice:n?.tts_voice??null,wake_word_entity:n?.wake_word_entity??null,wake_word_id:n?.wake_word_id??null});this._settings={pipeline_id:S.id},p7(L,this._settings),this._pipelines={...o,pipelines:[...o.pipelines.filter($=>$.id!==S.id),S]},this._processHass(!1),this._life?.react("Happy",r.assistantReady),this._refreshPipelines()}catch(o){this._createError=o?.message?`${r.createFailed} ${o.message}`:r.createFailed}finally{this._creating=!1}}}async _fixLocal(){let L=this.hass,r=this._pipeline,t=R2[this._lang];if(!(!L||!r||this._fixing)){this._fixing=!0,this._fixError=void 0;try{await J4(L,r,{prefer_local_intents:!1});let o=this._pipelines;o&&(this._pipelines={...o,pipelines:o.pipelines.map(n=>n.id===r.id?{...n,prefer_local_intents:!1}:n)}),await this._refreshPipelines()}catch(o){this._fixError=o?.message?`${t.fixFailed} ${o.message}`:t.fixFailed}finally{this._fixing=!1}}}_renderLocalWarning(){let L=R2[this._lang],r=!!this.hass?.user?.is_admin;return c1`<div class="empty local" role="note">
      <p class="empty-text" id="local-text">${L.localWarning}</p>
      ${r?c1`<div class="empty-actions">
            <button type="button" class="empty-btn" aria-describedby="local-text" ?disabled=${this._fixing} @click=${this._fixLocal}>
              ${this._fixing?L.fixing:L.fixLocal}
            </button>
          </div>`:c1`<p class="empty-note">${L.askAdminFix}</p>`}
      ${this._fixError?c1`<p class="empty-error" role="alert">${this._fixError}</p>`:w1}
    </div>`}_renderEmpty(){let L=R2[this._lang],r=!!this.hass?.user?.is_admin;return c1`<div class="empty" role="note">
      <p class="empty-text">${L.emptyTalk}</p>
      ${this._pipeline?c1`<p class="empty-note">${L.notCasita}</p>`:w1}
      ${r?c1`<div class="empty-actions">
            <button type="button" class="empty-btn" ?disabled=${this._creating} @click=${this._createAssistant}>
              ${this._creating?L.creating:L.createAssistant}
            </button>
            <a class="empty-link" href="/config/voice-assistants/assistants" @click=${this._openAssistants}>${L.openAssistants}</a>
          </div>`:c1`<p class="empty-note">${L.askAdmin}</p>`}
      ${this._createError?c1`<p class="empty-error" role="alert">${this._createError}</p>`:w1}
    </div>`}render(){let L=R2[this._lang],r=B3(this._condition,this._phase),t=this._conv.listening;return c1`
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
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d=${r7}></path></svg>
        </button>
        <button class="icon-btn" type="button" aria-label=${L.settings} title=${L.settings} aria-haspopup="dialog" @click=${this._openSettings}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d=${M7}></path></svg>
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
        ${this._hudOpen?c1`<casita-mood-hud
              id="hud"
              class="hud"
              .hass=${this.hass}
              .entry=${this._entry}
              .strings=${L}
              .heading=${(this._info?.entries.length??0)>1&&this._entry?Q4(this._entry,this._info.entries,this.hass):""}
              ?narrow=${this.narrow}
            ></casita-mood-hud>`:w1}
        <p id="room-help" class="sr-only">${L.stageHelp}</p>
        <div id="sr-speech" class="sr-only" aria-live="polite"></div>
        <div class="bottom">
          ${this._empty?this._renderEmpty():this._localWarning?this._renderLocalWarning():w1}
          ${this._note?c1`<p class="note" role="status">${this._note}</p>`:w1}
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
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d=${t?a7:i7}></path></svg>
            </button>
            <button type="submit" class="round send" aria-label=${L.send} title=${L.send}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d=${o7}></path></svg>
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
    `}};S1.styles=q2`
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
  `,Y([s1({attribute:!1})],S1.prototype,"hass",2),Y([s1({type:Boolean,reflect:!0})],S1.prototype,"narrow",2),Y([s1({attribute:!1})],S1.prototype,"route",2),Y([s1({attribute:!1})],S1.prototype,"panel",2),Y([m2()],S1.prototype,"_info",2),Y([m2()],S1.prototype,"_settings",2),Y([m2()],S1.prototype,"_pipelines",2),Y([m2()],S1.prototype,"_hudOpen",2),Y([m2()],S1.prototype,"_settingsOpen",2),Y([m2()],S1.prototype,"_note",2),Y([m2()],S1.prototype,"_expression",2),Y([m2()],S1.prototype,"_phase",2),Y([m2()],S1.prototype,"_condition",2),Y([m2()],S1.prototype,"_creating",2),Y([m2()],S1.prototype,"_createError",2),Y([m2()],S1.prototype,"_fixing",2),Y([m2()],S1.prototype,"_fixError",2),Y([O2(".room",!0)],S1.prototype,"_room",2),Y([O2("casita-face",!0)],S1.prototype,"_faceEl",2),Y([O2(".bubble",!0)],S1.prototype,"_bubble",2),Y([O2(".bubble-text",!0)],S1.prototype,"_bubbleText",2),Y([O2("#sr-speech",!0)],S1.prototype,"_srSpeech",2),Y([O2("#chat-input",!0)],S1.prototype,"_input",2),Y([O2("#mood-btn",!0)],S1.prototype,"_moodBtn",2);s5("casita-panel",S1);export{S1 as CasitaPanel,A9 as phaseFrom};
