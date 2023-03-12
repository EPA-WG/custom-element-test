// src/mocks/browser.js
import { setupWorker } from './msw.js'
// import { setupWorker } from '@bundled-es-modules/msw'
// import '@bundled-es-modules/msw/lib/iife/index.js';
import { handlers } from './handlers.js'

// This configures a Service Worker with the given request handlers.
// export const worker = MockServiceWorker.setupWorker(...handlers)
export const worker = setupWorker(...handlers)
await worker.start({ serviceWorker: { url: '/mockServiceWorker.js' } });
// await worker.start({ serviceWorker: { url: '/public/mockServiceWorker.js' }, options:{scope:'/'} });
