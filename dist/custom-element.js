const d='<?xml version="1.0" encoding="UTF-8"?>',m="http://www.w3.org/1999/XSL/Transform",l=(t,e="")=>{const n=document.createElement(t);return e&&(n.innerText=e),n};function p(t){return new DOMParser().parseFromString(d+t,"application/xml")}function h(t){const e=new XMLSerializer().serializeToString(t);return e.substring(e.indexOf(">")+1,e.lastIndexOf("<"))}function x(t){const e=document.createElementNS(m,"value-of");e.setAttribute("select",`//*[@slot="${t.name}"]`),t.parentNode.replaceChild(e,t)}function a(t,e,n,o){const s=((r,u,c)=>(u.append(c=l(r)),c))(e,t);[...n].forEach(r=>s.append(o(r)))}function f(t){return t.slot||(t.setAttribute||(t=l("span",t.textContent.replaceAll(`
`,""))),t.setAttribute("slot","")),t}export class CustomElement extends HTMLElement{constructor(){super(),[...this.getElementsByTagName("slot")].forEach(x);const e=new XSLTProcessor;e.importStylesheet(p(`<xsl:stylesheet version="1.0"
    xmlns:xsl="${m}">
  <xsl:output method="html" />

  <xsl:template match="/">
    <xsl:apply-templates select="//attributes"/>
  </xsl:template>
  <xsl:template match="attributes">
    ${h(this)}
  </xsl:template>

</xsl:stylesheet>`));const n=this.getAttribute("tag");n&&window.customElements.define(n,class extends HTMLElement{constructor(){super();const o=l("div");a(o,"payload",this.childNodes,f),a(o,"attributes",this.attributes,s=>l(s.nodeName,s.value)),a(o,"dataset",Object.keys(this.dataset),s=>l(s,this.dataset[s]));const i=e.transformToFragment(o,document);this.innerHTML="",[...i.childNodes].forEach(s=>this.appendChild(s))}})}}window.customElements.define("custom-element",CustomElement);export default CustomElement;
//# sourceMappingURL=custom-element.js.map
