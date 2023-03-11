const msw = await new Promise((resolve,reject)=>
{
    ((d, s)=>
    {   s = d.createElement('script')
        s.setAttribute('src','node_modules/msw/lib/iife/index.js');
        s.onload = ()=> resolve( window.MockServiceWorker );
        d.head.append(s)
    })(document)
});

export const    { GraphQLHandler
                , MockedRequest
                , RESTMethods
                , RequestHandler
                , RestHandler
                , SetupApi
                , SetupWorkerApi
                , cleanUrl
                , compose
                , context
                , createResponseComposition
                , defaultContext
                , defaultResponse
                , graphql
                , graphqlContext
                , handleRequest
                , matchRequestUrl
                , response
                , rest
                , restContext
                , setupWorker
                } = msw;
