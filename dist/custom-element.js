const d='<?xml version="1.0" encoding="UTF-8"?>',m="http://www.w3.org/1999/XSL/Transform",r=(t,e="")=>{const n=document.createElement(t);return e&&(n.innerText=e),n};function p(t){return new DOMParser().parseFromString(d+t,"application/xml")}function h(t){const e=new XMLSerializer().serializeToString(t);return e.substring(e.indexOf(">")+1,e.lastIndexOf("<"))}function x(t){const e=document.createElementNS(m,"value-of");e.setAttribute("select",`//*[@slot="${t.name}"]`),t.parentNode.replaceChild(e,t)}function i(t,e,n,l){const a=((s,u,c)=>(u.append(c=r(s)),c))(e,t);[...n].forEach(s=>a.append(l(s)))}function f(t){return t.slot||(t.setAttribute||(t=r("span",t.textContent.replaceAll(`
`,""))),t.setAttribute("slot","")),t}export class CustomElement extends HTMLElement{constructor(){super(),[...this.getElementsByTagName("slot")].forEach(x);const e=new XSLTProcessor;e.importStylesheet(this.xslt);const n=this.getAttribute("tag"),l=this;n&&window.customElements.define(n,class extends HTMLElement{constructor(){super();const o=r("div");i(o,"payload",this.childNodes,f),i(o,"attributes",this.attributes,s=>r(s.nodeName,s.value)),i(o,"dataset",Object.keys(this.dataset),s=>r(s,this.dataset[s])),this.xml=o;const a=e.transformToFragment(o,document);this.innerHTML="",[...a.childNodes].forEach(s=>this.appendChild(s))}get dce(){return l}})}get dce(){return this}get xslt(){return p(`<xsl:stylesheet version="1.0"
    xmlns:xsl="${m}">
  <xsl:output method="html" />

  <xsl:template match="/">
    <xsl:apply-templates select="//attributes"/>
  </xsl:template>
  <xsl:template match="attributes">
    ${h(this)}
  </xsl:template>

</xsl:stylesheet>`)}}window.customElements.define("custom-element",CustomElement);export default CustomElement;
//# sourceMappingURL=custom-element.js.map
