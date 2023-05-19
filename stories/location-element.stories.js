import '../src/custom-element.js';
import '../src/location-element.js';

export default
{   title: 'location-element', component: 'location-element', argTypes:
    {        title: { control: 'text', defaultValue: 'page load time' }
    ,          tag: { control: 'text', defaultValue: 'ls-test-component' }
    // location-element props
    ,        src: { control: 'text', type: { name: 'string', required: false }, defaultValue: `` }
    ,        slice: { control: 'text', type: { name: 'string', required: true }, defaultValue: `window-url` }
    ,         live: { control: 'boolean', type: { name: 'boolean', required: true }, defaultValue: false, description: 'update when window.location changes' }
    }
,   parameters: { controls: { sort: 'requiredFirst' } },
};

function Template( { title, tag, src, slice, live } )
{
    return `
        <fieldset>
            <legend>${ title }</legend>
            <h4>Change the URL by one of the methods bellow</h4>
            <div>
                <a href="#a1" target="_self">#a1</a>
                <a href="#a2" target="_self">#a2</a>

                <button id="pushstate" onclick="history.pushState( {},'', 'location.html?pushstate')"
                        >history.pushState</button>
                <button id="replacestate" onclick="history.replaceState( {},'', 'location.html?replaceState#a3')"
                        >history.replaceState</button>
            </div>
            <hr/>
            <custom-element
                tag="${ tag }"
                hidden
                >
                <template>
                    <location-element slice="${ slice }" ${live?'live':''} ${src?'src="https://my.example/?a=1&b=2#3"':''}></location-element>
                    <html:table xmlns:html="http://www.w3.org/1999/xhtml">
                        <xsl:for-each select="//slice/${slice}/@*">
                            <html:tr>
                                <html:th><xsl:value-of select="name()"/></html:th>
                                <html:td><xsl:value-of select="."/></html:td>
                            </html:tr>
                        </xsl:for-each>
                        <html:tr>
                            <html:th><u>params</u></html:th>
                            <html:th></html:th>
                        </html:tr>
                        <xsl:for-each select="//slice/${slice}/params/*">
                            <html:tr>
                                <html:th><xsl:value-of select="name()"/></html:th>
                                <html:td><xsl:value-of select="."/></html:td>
                            </html:tr>
                        </xsl:for-each>
                    </html:table>
                </template>
            </custom-element>
            <${ tag }></${ tag }>
      </fieldset>
  `;
}

export const LocationElementLoad = Template.bind( {} );
LocationElementLoad.args =
{
};

export const LocationElementLive = Template.bind( {} );
LocationElementLive.args =
{   title: 'Live update',
     live: true,
      tag: 'ls-live-component',
};

export const LocationElementSrc = Template.bind( {} );
LocationElementSrc.args =
{   title: 'SCR attribute',
     live: true,
      tag: 'location-src-component',
      src: 'https://my.example?a=1&b=2#3',
};
