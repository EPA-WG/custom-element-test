// src/mocks/browser.js
import { setupWorker } from './msw.js'
import { handlers } from './handlers.js'

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers)
await worker.start({ serviceWorker: { url: '/mockServiceWorker.js' } });
