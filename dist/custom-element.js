const L='<?xml version="1.0" encoding="UTF-8"?>',j="http://www.w3.org/1999/XSL/Transform",b="urn:schemas-epa-wg:dce",f=(e,t)=>e.getAttribute(t),h=(e,t="")=>(n=>(n.innerText=t||"",n))(document.createElement(e)),A=(e,t,n="")=>(l=>(l.innerText=n||"",l))(document.createElementNS(e,t));function E(e){return new DOMParser().parseFromString(L+e,"application/xml")}function v(e){return new XMLSerializer().serializeToString(e)}function x(e,t,n,l){const r=((u,d,o)=>(d.append(o=A(b,u)),o))(t,e);return[...n].forEach(u=>r.append(l(u))),r}function R(e){return e.slot||(e.setAttribute||(e=h("span",e.textContent.replaceAll(`
`,""))),e.setAttribute("slot","")),e}export function Json2Xml(e,t){if(typeof e=="string")return e;const n=typeof t!="string";if(e instanceof Array)return n&&(t="array"),"<"+t+">"+e.map(function(r){return Json2Xml(r,t)}).join()+"</"+t+">";n&&(t="r"),t=t.replace(/[^a-z0-9\-]/gi,"_");var l={},s=["<"+t+" "];for(let r in e)typeof e[r]=="object"?l[r]=e[r]:s.push(r.replace(/[^a-z0-9\-]/gi,"_")+'="'+e[r].toString().replace(/&/gi,"&#38;")+'"');if(l){s.push(">");for(let r in l)s.push(Json2Xml(l[r],r));s.push("</"+t+">")}else s.push("/>");return s.join(`
`)}export function createXsltFromDom(e,t="xsl:stylesheet"){if(e.tagName===t||e.documentElement?.tagName===t)return e;const n=E(`<xsl:stylesheet version="1.0"
    xmlns:xsl="${j}"
    >
    <xsl:output method="html" />

    <xsl:template match="/">
        <xsl:for-each select="//attributes">
            <xsl:call-template name="attributes"/>	
        </xsl:for-each>
    </xsl:template>
    <xsl:template name="slot" >
        <xsl:param name="slotname" />
        <xsl:param name="defaultvalue" />
        <xsl:choose>
            <xsl:when test="//payload/*[@slot=$slotname]">
                <xsl:copy-of select="//payload/*[@slot=$slotname]"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:copy-of select="$defaultvalue"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template name="attributes"></xsl:template>
    <xsl:variable name="slottemplate">
        <xsl:call-template name="slot" >
            <xsl:with-param name="slotname" select="''"/>
            <xsl:with-param name="defaultvalue"/>
        </xsl:call-template>
    </xsl:variable>
</xsl:stylesheet>`),l=n.documentElement.lastElementChild.previousElementSibling,s=o=>o.documentElement||o.firstElementChild?.content||o.content||o.body||o,r=s(e),u=r?.childNodes||[];if(r instanceof CustomElement||r.nodeType===11)for(let o of u)l.append(n.importNode(o,!0));else l.append(n.importNode(r,!0));const d=o=>{const i=n.firstElementChild.lastElementChild.lastElementChild.cloneNode(!0);i.firstElementChild.setAttribute("select",`'${o.name}'`);for(let p of o.childNodes)i.lastElementChild.append(p);return i};for(const o of l.querySelectorAll("slot"))o.parentNode.replaceChild(d(o),o);return n}export async function xhrTemplate(e){return await new Promise((n,l)=>{const s=new XMLHttpRequest;s.open("GET",e),s.responseType="document",s.onload=()=>{s.readyState===s.DONE&&s.status===200&&n(s.responseXML||h("div",s.responseText)),l(s.statusText)},s.addEventListener("error",r=>l(r)),s.send()})}export function deepEqual(e,t,n=!1){if(e===t)return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null||Object.keys(e).length!==Object.keys(t).length)return n;for(let l in e)if(!(l in t)||!deepEqual(e[l],t[l]))return n;return!0}export function injectSlice(e,t,n){const s=typeof n=="string"?h(t,n):document.adoptNode(E(Json2Xml(n,t)).documentElement);[...e.children].filter(r=>r.localName===t).map(r=>r.remove()),s.data=n,e.append(s)}function D(e,t,n){if(e.querySelectorAll)for(let l of e.querySelectorAll(t))n(l)}const C=(e,t)=>(n=>e===n?null:n&&(n.querySelector(t)||C(n,t)))(e.getRootNode()),q=async(e,t)=>{if(!e||!e.trim())return[t];if(e.startsWith("#"))return(n=>{if(!n)return[];const l=n.querySelectorAll(e);if(l.length)return[...l];const s=n.getRootNode();return s===n?[]:C(s)})(t.parentElement);try{const n=await xhrTemplate(e),l=new URL(e,location).hash;if(l){const s=n.querySelectorAll(l);return s.length?[...s]:[t]}return[n]}catch{return[t]}};export class CustomElement extends HTMLElement{async connectedCallback(){const t=await q(f(this,"src"),this),n=t.map(o=>createXsltFromDom(o)),l=n.map((o,i)=>(i=new XSLTProcessor,i.importStylesheet(o),i));Object.defineProperty(this,"xsltString",{get:()=>l.map(o=>v(o)).join(`
`)});const s=f(this,"tag"),r=this,u=[...this.templateNode.querySelectorAll("[slice]")].map(o=>f(o,"slice"));class d extends HTMLElement{connectedCallback(){const i=A(b,"datadom");x(i,"payload",this.childNodes,R),x(i,"attributes",this.attributes,a=>h(a.nodeName,a.value)),x(i,"dataset",Object.keys(this.dataset),a=>h(a,this.dataset[a]));const p=x(i,"slice",u,a=>h(a,""));this.xml=i;const g={},S=[],w=()=>{const a={};for(let m;m=S.pop();){const c=f(m.target,"slice");a[c]||(injectSlice(p,c,m.detail),a[c]=m)}Object.keys(a).length!==0&&N()};let y;this.onSlice=a=>{a.stopPropagation?.();const m=f(a.target,"slice");deepEqual(a.detail,[...p.children].find(c=>c.localName===m)?.data)||(S.push(a),y||(y=setTimeout(()=>{w(),y=0},10)))};const N=()=>{const a=l.map(m=>m.transformToFragment(i,document));this.innerHTML="",a.map(m=>{[...m.childNodes].forEach(c=>this.append(c)),D(this,"[slice]",c=>{if(typeof c.sliceInit=="function"){const T=f(c,"slice");g[T]=c.sliceInit(g[T])}})})};N(),w()}get dce(){return r}}if(s)window.customElements.define(s,d);else{const o="dce-"+crypto.randomUUID();window.customElements.define(o,d);const i=document.createElement(o);this.getAttributeNames().forEach(p=>i.setAttribute(p,this.getAttribute(p))),i.append(...this.childNodes),this.append(i)}}get templateNode(){return this.firstElementChild?.tagName==="TEMPLATE"?this.firstElementChild.content:this}get dce(){return this}get xslt(){return E(this.xsltString)}}window.customElements.define("custom-element",CustomElement);export default CustomElement;
//# sourceMappingURL=custom-element.js.map
